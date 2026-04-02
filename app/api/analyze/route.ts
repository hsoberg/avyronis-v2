import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import OpenAI from 'openai'

export const maxDuration = 60

const SYSTEM_PROMPT = `Du er en verdensklasse CRO, AEO og SEO ekspert. 
Din oppgave er å analysere innholdet fra en nettside (som jeg limer inn nedenfor som destillert tekst, overskrifter og knapper) og vurdere den basert på disse 3 pilarene.

Pilar 1: Konvertering (CRO) basert på metodikken i "Making Websites Win".
- Fjerner de "Friction" og "Customer Obstacles"?
- Svarer de på the Golden Questions (Hvem er dette for, Hva tilbyr de egentlig, Hvorfor dem fremfor andre)?
- Er "Call to Actions" krystallklare og intent-baserte (f.eks "Få et gratis prisoverslag" i stedet for "Kontakt oss")?

Pilar 2: AEO (Answer Engine Optimization)
- Er innholdet lett nok strukturert til at en AI-assistent (som deg) lett kan trekke ut fakta og anbefale dem? Må de lete etter informasjonen, eller er det "Klart og autoritativt innhold"? Mangler det tydelige FAQer?

Pilar 3: SEO (Søkemotorer)
- Har de en fornuftig overskriftshierarki (H1, H2, H3)? Er innholdet relevant for hva de faktisk selger?

**INSTRUKSJON FOR OUTPUT:**
Du SKAL utelukkende returnere et gyldig JSON-objekt og INGENTING ANNET (ingen markdown tags, kun ren JSON).
Strukturen må være akkurat slik:
{
  "top3Updates": [
    {
      "title": "Kort tittel på et problem",
      "description": "Forklaring på hvorfor dette koster dem kunder (CRO, SEO eller AEO relatert)."
    }
  ],
  "fullAudit": {
    "cro": "Din ekspertuttalelse på konverteringen (2-3 avsnitt). Bruk Making Websites Win metodikk som referanse.",
    "aeo": "Din ekspertuttalelse på AEO (1 avsnitt).",
    "seo": "Din vurdering av SEO og overskrifter (1 avsnitt).",
    "overallScore": 65
  }
}

Her er den skrapede teksten fra nettsiden:`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { url } = body

    if (!url) {
      return NextResponse.json({ error: 'Mangler URL' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        error: 'Backend mangler OPENAI_API_KEY. Sjekk at nøkkelen er lagt til i Vercel Environment Variables.'
      }, { status: 500 })
    }

    // 1. Skrap nettsiden
    let html = ""
    try {
      const parsedUrl = url.startsWith('http') ? url : `https://${url}`
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      const response = await fetch(parsedUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'nb-NO,nb;q=0.9,no;q=0.8,en;q=0.7',
        }
      })
      clearTimeout(timeout)
      if (!response.ok) {
        throw new Error(`Nettstedet returnerte ${response.status}`)
      }
      html = await response.text()
    } catch (error: any) {
      const msg = error.name === 'AbortError'
        ? 'Forespørselen tok for lang tid. Sjekk at URL-en er riktig og prøv igjen.'
        : `Klarte ikke å hente nettsiden: ${error.message}`
      return NextResponse.json({ error: msg }, { status: 400 })
    }


    // 2. Rens HTML med Cheerio
    const $ = cheerio.load(html)
    $('script, style, noscript, iframe, img, svg, header, footer, nav, aside').remove()

    const pageTitle = $('title').text().trim()
    const metaDesc = $('meta[name="description"]').attr('content') || ''
    const h1s = $('h1').map((_, el) => $(el).text().trim()).get().join(' | ')
    const h2s = $('h2').map((_, el) => $(el).text().trim()).get().join(' | ')
    const buttons = $('button, a.btn, .btn, a.button').map((_, el) => $(el).text().trim()).get().join(' | ')
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 15000)

    const siteContext = `
      URL: ${url}
      TITTEL: ${pageTitle}
      META DESC: ${metaDesc}
      H1s: ${h1s}
      H2s: ${h2s}
      CALL TO ACTIONS / BUTTONS: ${buttons}
      
      BODY TEKST:
      ${bodyText}
    `

    // 3. Spør OpenAI
    const openai = new OpenAI({ apiKey })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: siteContext }
      ],
      response_format: { type: 'json_object' },
    })

    const rawJson = completion.choices[0].message.content || ''

    let parsedData
    try {
      parsedData = JSON.parse(rawJson)
    } catch (parseError) {
      console.error("Failed to parse OpenAI output:", rawJson)
      return NextResponse.json({ error: 'AI returnerte et ugyldig format. Prøv igjen.' }, { status: 500 })
    }

    // 4. Send responsen tilbake til frontenden
    return NextResponse.json({ success: true, data: parsedData })

  } catch (error: any) {
    console.error('Audit API Error:', error)
    return NextResponse.json({ error: 'Det oppstod en ukjent feil på serveren.' }, { status: 500 })
  }
}