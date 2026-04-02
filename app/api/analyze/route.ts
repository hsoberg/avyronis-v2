import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import OpenAI from 'openai'

export const maxDuration = 60

type SiteCategory =
  | 'saas'
  | 'ecommerce'
  | 'local_business'
  | 'portfolio'
  | 'blog_media'
  | 'agency_service'
  | 'nonprofit'
  | 'info_product'
  | 'general'

interface CategoryConfig {
  label: string
  goal: string
  pillar1Name: string
  pillar1Criteria: string[]
  pillar2Name: string
  pillar2Criteria: string[]
  pillar3Name: string
  pillar3Criteria: string[]
  scoringNote: string
}

const CATEGORY_CONFIGS: Record<SiteCategory, CategoryConfig> = {
  saas: {
    label: 'SaaS / Digital tjeneste',
    goal: 'Sign-ups, gratis prøveperioder og demo-bookinger',
    pillar1Name: 'Konvertering & Vekst',
    pillar1Criteria: [
      'Er det krystallklart hva produktet gjør i én setning?',
      'Er det en tydelig gratis prøveperiode eller demo-CTA over folden?',
      'Besvarer de de viktigste innvendingene (pris, sikkerhet, integrasjoner)?',
      'Er onboarding-prosessen kommunisert?',
    ],
    pillar2Name: 'AEO (Answer Engine Optimization)',
    pillar2Criteria: [
      'Kan en AI-assistent raskt forklare hva produktet gjør, hvem det er for og hva det koster?',
      'Er det tydelige FAQer om funksjoner og prising?',
      'Er sammenligninger med konkurrenter adressert?',
    ],
    pillar3Name: 'SEO & Søkeintensjon',
    pillar3Criteria: [
      'Er det samsvar mellom søkeord og hva de faktisk selger?',
      'Er H1/H2-hierarkiet logisk og intensjonsdrevet?',
      'Er meta-beskrivelsen konverteringsorientert?',
    ],
    scoringNote: 'Score lavt hvis verdiforslaget er uklart eller CTA mangler. Score høyt hvis produktet er forklart, innvendinger besvart og CTA er tydelig.',
  },
  ecommerce: {
    label: 'Nettbutikk / E-handel',
    goal: 'Produktsalg, handlekurv-konverteringer og gjenkjøp',
    pillar1Name: 'Kjøpsopplevelse & Konvertering',
    pillar1Criteria: [
      'Er produktene enkle å finne og filtrere?',
      'Er priser, fraktkostnader og leveringstid tydelig kommunisert?',
      'Er det sosiale bevis (anmeldelser, stjerner, antall solgt)?',
      'Er handlekurv og kasse-CTA fremtredende?',
    ],
    pillar2Name: 'Produktoppdagbarhet (AEO)',
    pillar2Criteria: [
      'Kan en AI-assistent eller søkemotor finne og beskrive produktene nøyaktig?',
      'Er produktbeskrivelsene unike og informative?',
      'Er vanlige spørsmål om produkter besvart?',
    ],
    pillar3Name: 'SEO & Produktsynlighet',
    pillar3Criteria: [
      'Er produkt- og kategorisider optimalisert for søkeord med kjøpsintensjon?',
      'Er det fornuftig intern linking mellom kategorier og produkter?',
      'Er meta-titler og beskrivelser unike per side?',
    ],
    scoringNote: 'Score lavt hvis priser er skjult eller kasse er komplisert. Score høyt hvis kjøpsreisen er friksjonsfri og produktinformasjonen er komplett.',
  },
  local_business: {
    label: 'Lokal bedrift',
    goal: 'Telefonsamtaler, bookinger og besøk til fysisk sted',
    pillar1Name: 'Lokal tillit & konvertering',
    pillar1Criteria: [
      'Er NAP (navn, adresse, telefon) synlig uten å scrolle?',
      'Er det en tydelig "Ring nå" eller "Bestill time"-CTA?',
      'Er åpningstider klart kommunisert?',
      'Er det anmeldelser eller tillitssignaler fra lokale kunder?',
    ],
    pillar2Name: 'Lokal AEO',
    pillar2Criteria: [
      'Kan en stemmeassistent svare på "Når er de åpne?", "Hva er adressen?" og "Hva tilbyr de?"?',
      'Er tjenester og priser tydelig listet?',
      'Er det strukturert innhold som gjør det lett for AI å anbefale bedriften?',
    ],
    pillar3Name: 'Lokal SEO',
    pillar3Criteria: [
      'Er bedriftsnavn, sted og tjenestetype til stede i H1/H2 og meta?',
      'Er innholdet relevant for lokale søk (by, bydel, tjeneste)?',
      'Er Google Business Profile-signaler forsterket på siden?',
    ],
    scoringNote: 'Score lavt hvis kontaktinfo er vanskelig å finne. Score høyt hvis man raskt kan ringe, booke eller finne veien.',
  },
  portfolio: {
    label: 'Portefølje / Personlig merkevare',
    goal: 'Forespørsler om samarbeid, prosjektarbeid og tillitsbygging',
    pillar1Name: 'Inntrykk & Engasjement',
    pillar1Criteria: [
      'Kommuniserer arbeidet seg selv innen 5 sekunder?',
      'Er det en tydelig "Ta kontakt" eller "Ansett meg"-sti?',
      'Er det sosialt bevis (kundenavn, attester, resultater)?',
      'Er spesialiteten og nisjen umiddelbart klar?',
    ],
    pillar2Name: 'Oppdagbarhet & Autoritet (AEO)',
    pillar2Criteria: [
      'Kan en AI oppsummere hva personen gjør, spesialiteten og hvordan kontakte dem?',
      'Er det innhold som posisjonerer dem som ekspert i sin nisje?',
      'Er det FAQer om samarbeidsprosess eller tjenester?',
    ],
    pillar3Name: 'SEO & Synlighet',
    pillar3Criteria: [
      'Er ferdighets-nøkkelord og nisje til stede i overskrifter og meta?',
      'Er det innhold som kan rangere for relevante søk i bransjen?',
      'Er siden teknisk optimalisert (hastighet, mobilvisning)?',
    ],
    scoringNote: 'Score lavt hvis det er uklart hva personen gjør eller hvordan man kontakter dem. Score høyt hvis arbeidet er imponerende presentert og kontakten er enkel.',
  },
  blog_media: {
    label: 'Blogg / Medieside',
    goal: 'Leserengasjement, abonnenter og gjentakende besøk',
    pillar1Name: 'Engasjement & Leserbeholdning',
    pillar1Criteria: [
      'Er innholdet enkelt å navigere og finne?',
      'Er det tydelige CTAer for nyhetsbrev eller abonnement?',
      'Er relaterte artikler fremhevet for å beholde leseren?',
      'Er innholdsformatet optimalisert for lesbarhet?',
    ],
    pillar2Name: 'Innholdsautoritet (AEO)',
    pillar2Criteria: [
      'Er artiklene strukturert slik at AI-assistenter kan trekke ut fakta og sitere innholdet?',
      'Er det klare svar på spørsmål leserne har?',
      'Er forfatterne og ekspertisen tydelig kommunisert?',
    ],
    pillar3Name: 'SEO & Organisk vekst',
    pillar3Criteria: [
      'Er artiklene optimalisert for søkeord med informasjonsintensjon?',
      'Er overskrifthierarkiet (H1/H2/H3) logisk og søkemotorvennlig?',
      'Er intern linking brukt aktivt for å styrke kategoriautoritet?',
    ],
    scoringNote: 'Score lavt hvis det er vanskelig å abonnere eller finne relatert innhold. Score høyt hvis leseren naturlig blir lenger og abonnerer.',
  },
  agency_service: {
    label: 'Byrå / Tjenesteleverandør',
    goal: 'Leadgenerering, tilbudsforespørsler og nye kunder',
    pillar1Name: 'Konvertering & Tillitsbygging',
    pillar1Criteria: [
      'Er det klart hvilke problemer byrået løser og for hvem?',
      'Er det tydelig case-studies eller resultater med tall?',
      'Er prosessen fra første kontakt til levering kommunisert?',
      'Er CTA for kontakt eller tilbud fremtredende?',
    ],
    pillar2Name: 'AEO & Ekspertposisjonering',
    pillar2Criteria: [
      'Kan en AI beskrive hva byrået gjør, hvem de har jobbet med og hva resultatene var?',
      'Er det faglig innhold som bygger autoritet i bransjen?',
      'Besvarer siden vanlige spørsmål potensielle kunder har?',
    ],
    pillar3Name: 'SEO & Synlighet',
    pillar3Criteria: [
      'Er tjenestetypene og bransjene de betjener representert i headings og meta?',
      'Er det innhold som kan rangere for "byrå + tjeneste + sted"-søk?',
      'Er backlink-potensialet styrket gjennom case studies og faginnhold?',
    ],
    scoringNote: 'Score lavt hvis det er uklart hvem de hjelper eller hva resultatene er. Score høyt hvis case studies er overbevisende og kontaktveien er enkel.',
  },
  nonprofit: {
    label: 'Non-profit / Institusjon',
    goal: 'Donasjoner, frivillige, bevissthet og støttespillere',
    pillar1Name: 'Engasjement & Støtte',
    pillar1Criteria: [
      'Er oppdraget og formålet umiddelbart klart?',
      'Er det enkelt å donere eller melde seg som frivillig?',
      'Er det emosjonelt overbevisende innhold (historier, tall, bilder)?',
      'Er transparensen om bruk av midler kommunisert?',
    ],
    pillar2Name: 'AEO & Formidling',
    pillar2Criteria: [
      'Kan en AI raskt forklare hva organisasjonen gjør og hvordan man støtter dem?',
      'Er FAQer om donasjonsprosessen besvart?',
      'Er innvirkningen dokumentert med konkrete eksempler?',
    ],
    pillar3Name: 'SEO & Synlighet',
    pillar3Criteria: [
      'Er nøkkelord knyttet til formål og sak til stede i headings?',
      'Er innholdet optimalisert for å nå målgruppen organisk?',
      'Er siden indeksert og teknisk korrekt?',
    ],
    scoringNote: 'Score lavt hvis det er uklart hva pengene går til eller hvordan man bidrar. Score høyt hvis oppdraget er rørende formidlet og støtte er friksjonsfri.',
  },
  info_product: {
    label: 'Infoprodukt / Kurs / Coaching',
    goal: 'Kjøp, påmelding og enrolment',
    pillar1Name: 'Salg & Overbevisning',
    pillar1Criteria: [
      'Er transformasjonen (hva man oppnår) krystallklar?',
      'Er det sosial bevis fra tidligere deltakere med konkrete resultater?',
      'Er innvendinger mot kjøp adressert (pris, tid, garantier)?',
      'Er CTAen for kjøp/påmelding fremtredende og gjentatt?',
    ],
    pillar2Name: 'AEO & Autoritet',
    pillar2Criteria: [
      'Kan en AI forklare hva kurset/coachingen inneholder, hvem det er for og hva det koster?',
      'Er kursholder/coach posisjonert som troverdig ekspert?',
      'Er pensum eller innhold beskrevet detaljert?',
    ],
    pillar3Name: 'SEO & Organisk rekkevidde',
    pillar3Criteria: [
      'Er emne-nøkkelord og målgruppe til stede i headings og meta?',
      'Er det organisk innhold (blogg, gratis ressurser) som tiltrekker potensielle kjøpere?',
      'Er langsidene strukturert for søkemotorer?',
    ],
    scoringNote: 'Score lavt hvis transformasjonen er uklar eller sosialt bevis mangler. Score høyt hvis siden selger overbevisende med sterk autoritet og tydelig CTA.',
  },
  general: {
    label: 'Generell nettside',
    goal: 'Engasjement, synlighet og konvertering etter sidens egne mål',
    pillar1Name: 'Brukeropplevelse & Konvertering',
    pillar1Criteria: [
      'Er formålet med siden umiddelbart klart?',
      'Er det en tydelig CTA som matcher sidens mål?',
      'Er navigasjonen intuitiv og innholdet lett å finne?',
      'Er det tillitssignaler (kontaktinfo, om oss, anmeldelser)?',
    ],
    pillar2Name: 'AEO (Answer Engine Optimization)',
    pillar2Criteria: [
      'Kan en AI-assistent raskt forstå hva siden handler om og anbefale den?',
      'Er vanlige spørsmål besvart tydelig?',
      'Er innholdet autoritativt og lett å sitere?',
    ],
    pillar3Name: 'SEO & Synlighet',
    pillar3Criteria: [
      'Er overskriftshierarkiet (H1/H2/H3) logisk?',
      'Er innholdet relevant for hva siden faktisk tilbyr?',
      'Er meta-tittel og beskrivelse optimalisert?',
    ],
    scoringNote: 'Vurder basert på hvor godt siden kommuniserer formålet sitt og gjør det enkelt for besøkende å ta neste steg.',
  },
}

function detectSiteCategory(signals: string): SiteCategory {
  const s = signals.toLowerCase()
  const score: Record<SiteCategory, number> = {
    saas: 0, ecommerce: 0, local_business: 0, portfolio: 0,
    blog_media: 0, agency_service: 0, nonprofit: 0, info_product: 0, general: 0,
  }

  // ecommerce
  if (/handlekurv|legg i kurv|add to cart|checkout|nettbutikk|shop|buy now|\bkr\s*\d|\bnok\b|fri frakt|prisgaranti/.test(s)) score.ecommerce += 3
  if (/produkt|kategori|filter|sorter|lager|på lager|utsolgt/.test(s)) score.ecommerce += 2

  // local_business
  if (/åpningstider|opening hours|bestill bord|book a table|ring oss|call us|finn oss|find us|kart|google maps/.test(s)) score.local_business += 3
  if (/adresse|telefon|tlf|restaurant|kafé|frisør|tannlege|lege|rørlegger|elektriker|treningssenter|gym/.test(s)) score.local_business += 2

  // saas
  if (/free trial|gratis prøve|prøv gratis|start free|sign up free|dashboard|api|integrasjon|integration|abonnement|subscription/.test(s)) score.saas += 3
  if (/funksjon|feature|pricing|plan|enterprise|onboarding|workflow|automation/.test(s)) score.saas += 2

  // portfolio
  if (/portefølje|portfolio|mine prosjekter|mitt arbeid|case study|folio|hired|leid inn/.test(s)) score.portfolio += 3
  if (/designer|fotograf|illustratør|arkitekt|freelance|frilanser|se mitt arbeid/.test(s)) score.portfolio += 2

  // blog_media
  if (/les mer|publisert|minutter å lese|min read|nyhetsbrev|newsletter|abonner|subscribe|redaksjon/.test(s)) score.blog_media += 3
  if (/artikkel|blogg|nyheter|innlegg|post|kategori|tags|forfatter|author/.test(s)) score.blog_media += 2

  // agency_service
  if (/byrå|agency|studio|vi hjelper|vi leverer|tjenester|våre tjenester|case studies|resultater/.test(s)) score.agency_service += 3
  if (/kunder|klient|partner|prosjekt|løsning|strategi|rådgivning|konsulent/.test(s)) score.agency_service += 2

  // nonprofit
  if (/donasjon|donate|frivillig|volunteer|støtt oss|non-profit|veldedighet|bidra|gi en gave/.test(s)) score.nonprofit += 3
  if (/formål|oppdrag|mission|organisasjon|members|støttespiller/.test(s)) score.nonprofit += 2

  // info_product
  if (/kurs|course|enroll|påmelding|coaching|ebook|webinar|masterclass|modul|pensum|curriculum/.test(s)) score.info_product += 3
  if (/deltaker|student|lær|learn|leksjon|lesson|sertifikat|certificate/.test(s)) score.info_product += 2

  const best = (Object.entries(score) as [SiteCategory, number][])
    .filter(([key]) => key !== 'general')
    .sort(([, a], [, b]) => b - a)[0]

  return best && best[1] >= 3 ? best[0] : 'general'
}

function buildSystemPrompt(category: SiteCategory): string {
  const c = CATEGORY_CONFIGS[category]
  return `Du er en verdensklasse digital strateg som spesialiserer seg på nettside-analyse.

Nettsiden du analyserer er av typen: ${c.label}
Nettsidens primære mål er: ${c.goal}

Vurder siden basert på disse tre pilarene:

Pilar 1: ${c.pillar1Name}
${c.pillar1Criteria.map(x => `- ${x}`).join('\n')}

Pilar 2: ${c.pillar2Name}
${c.pillar2Criteria.map(x => `- ${x}`).join('\n')}

Pilar 3: ${c.pillar3Name}
${c.pillar3Criteria.map(x => `- ${x}`).join('\n')}

Scoring: ${c.scoringNote}

**INSTRUKSJON FOR OUTPUT:**
Du SKAL utelukkende returnere et gyldig JSON-objekt og INGENTING ANNET (ingen markdown tags, kun ren JSON).
Strukturen må være akkurat slik:
{
  "siteCategory": "${category}",
  "siteCategoryLabel": "${c.label}",
  "top3Updates": [
    {
      "title": "Kort tittel på et problem",
      "description": "Forklaring på hvorfor dette koster dem kunder eller synlighet."
    }
  ],
  "fullAudit": {
    "pillar1": { "name": "${c.pillar1Name}", "analysis": "Din ekspertuttalelse (2-3 avsnitt)." },
    "pillar2": { "name": "${c.pillar2Name}", "analysis": "Din ekspertuttalelse (1-2 avsnitt)." },
    "pillar3": { "name": "${c.pillar3Name}", "analysis": "Din vurdering (1-2 avsnitt)." },
    "overallScore": 65
  }
}

Her er den skrapede teksten fra nettsiden:`
}

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

    // 3. Detekter nettside-kategori
    const signals = `${pageTitle} ${metaDesc} ${h1s} ${h2s} ${buttons} ${bodyText}`
    const siteCategory = detectSiteCategory(signals)

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

    // 4. Spør OpenAI med dynamisk prompt
    const openai = new OpenAI({ apiKey })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: buildSystemPrompt(siteCategory) },
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

    return NextResponse.json({ success: true, data: parsedData })

  } catch (error: any) {
    console.error('Audit API Error:', error)
    return NextResponse.json({ error: 'Det oppstod en ukjent feil på serveren.' }, { status: 500 })
  }
}
