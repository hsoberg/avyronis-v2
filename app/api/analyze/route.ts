import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import { GoogleGenerativeAI } from '@google/generative-ai'

// The methodology used for CRO analysis
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
    },
    // Nøyaktig 3 slike oppdateringer
  ],
  "fullAudit": {
    "cro": "Din ekspertuttalelse på konverteringen (2-3 avsnitt). Bruk Making Websites Win metodikk som referanse.",
    "aeo": "Din ekspertuttalelse på AEO (1 avsnitt).",
    "seo": "Din vurdering av SEO og overskrifter (1 avsnitt).",
    "overallScore": 65 // Et tall fra 1 til 100 som en totalscore
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

    // Pass on if Gemini key is missing
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'Backend mangler GEMINI_API_KEY. Sjekk at nøkkelen er lagt til i .env.local filen.' 
      }, { status: 500 })
    }

    // 1. Skrap nettsiden
    let html = ""
    try {
        // Enforce http/https
        const parsedUrl = url.startsWith('http') ? url : `https://${url}`
        const response = await fetch(parsedUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            }
        })
        if (!response.ok) {
            throw new Error(`Nettstedet returnerte ${response.status}`)
        }
        html = await response.text()
    } catch (error: any) {
        return NextResponse.json({ error: `Klarte ikke å skrape nettsiden: ${error.message}` }, { status: 400 })
    }

    // 2. Rens HTML med Cheerio
    const $ = cheerio.load(html)
    
    // Fjern scripts, styles, og nav-elementer som forstyrrer renteksten
    $('script, style, noscript, iframe, img, svg, header, footer, nav, aside').remove()
    
    // Hent Tittel og Meta
    const pageTitle = $('title').text().trim()
    const metaDesc = $('meta[name="description"]').attr('content') || ''
    
    // Trekk ut overskrifter og knapper for å gi Gemini kontekst
    const h1s = $('h1').map((_, el) => $(el).text().trim()).get().join(' | ')
    const h2s = $('h2').map((_, el) => $(el).text().trim()).get().join(' | ')
    const buttons = $('button, a.btn, .btn, a.button').map((_, el) => $(el).text().trim()).get().join(' | ')
    
    // Trekk ut alt gjenværende tekstinnhold (The Body)
    const bodyText = $('body').text().replace(/\\s+/g, ' ').trim().slice(0, 15000) // Klipp for å unngå token-limit

    // Sett sammen konteksten
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

    // 3. Spør Gemini (Google AI Studio)
    const genAI = new GoogleGenerativeAI(apiKey)
    
    // Bruker -latest for å sikre at API-versjonen treffer riktig modell, ellers fallback
    let model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" })
    const fullPrompt = `${SYSTEM_PROMPT}\n\n${siteContext}`
    
    let responseText = ""
    try {
        const result = await model.generateContent(fullPrompt)
        responseText = result.response.text()
    } catch (e: any) {
        console.warn("Fallback to gemini-pro due to:", e.message)
        model = genAI.getGenerativeModel({ model: "gemini-pro" })
        const fallbackResult = await model.generateContent(fullPrompt)
        responseText = fallbackResult.response.text()
    }

    // Gemini pakker noen ganger JSON inn i \`\`\`json ... \`\`\` markdown blocks. Vi fjerner dette.
    const rawJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim()
    
    let parsedData
    try {
        parsedData = JSON.parse(rawJson)
    } catch (parseError) {
        console.error("Failed to parse Gemini output:", rawJson)
        return NextResponse.json({ error: 'AI returnerte et ugyldig format. Prøv igjen.' }, { status: 500 })
    }

    // 4. Send den perfekte API responsen tilbake til frontenden
    return NextResponse.json({ success: true, data: parsedData })

  } catch (error: any) {
    console.error('Geo Audit API Error:', error)
    return NextResponse.json({ error: 'Det oppstod en ukjent feil på serveren.' }, { status: 500 })
  }
}
