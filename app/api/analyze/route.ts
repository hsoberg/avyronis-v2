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
}

const CATEGORY_CONFIGS: Record<SiteCategory, CategoryConfig> = {
  saas: {
    label: 'SaaS / Digital tjeneste',
    goal: 'Sign-ups, gratis prøveperioder og demo-bookinger',
  },
  ecommerce: {
    label: 'Nettbutikk / E-handel',
    goal: 'Produktsalg, handlekurv-konverteringer og gjenkjøp',
  },
  local_business: {
    label: 'Lokal bedrift',
    goal: 'Telefonsamtaler, bookinger og besøk til fysisk sted',
  },
  portfolio: {
    label: 'Portefølje / Personlig merkevare',
    goal: 'Forespørsler om samarbeid, prosjektarbeid og tillitsbygging',
  },
  blog_media: {
    label: 'Blogg / Medieside',
    goal: 'Leserengasjement, abonnenter og gjentakende besøk',
  },
  agency_service: {
    label: 'Byrå / Tjenesteleverandør',
    goal: 'Leadgenerering, tilbudsforespørsler og nye kunder',
  },
  nonprofit: {
    label: 'Non-profit / Institusjon',
    goal: 'Donasjoner, frivillige, bevissthet og støttespillere',
  },
  info_product: {
    label: 'Infoprodukt / Kurs / Coaching',
    goal: 'Kjøp, påmelding og enrolment',
  },
  general: {
    label: 'Generell nettside',
    goal: 'Engasjement, synlighet og konvertering etter sidens egne mål',
  },
}

function detectSiteCategory(signals: string): SiteCategory {
  const s = signals.toLowerCase()
  const score: Record<SiteCategory, number> = {
    saas: 0, ecommerce: 0, local_business: 0, portfolio: 0,
    blog_media: 0, agency_service: 0, nonprofit: 0, info_product: 0, general: 0,
  }

  if (/handlekurv|legg i kurv|add to cart|checkout|nettbutikk|shop|buy now|\bkr\s*\d|\bnok\b|fri frakt|prisgaranti/.test(s)) score.ecommerce += 3
  if (/produkt|kategori|filter|sorter|lager|på lager|utsolgt/.test(s)) score.ecommerce += 2

  if (/åpningstider|opening hours|bestill bord|book a table|ring oss|call us|finn oss|find us|kart|google maps/.test(s)) score.local_business += 3
  if (/adresse|telefon|tlf|restaurant|kafé|frisør|tannlege|lege|rørlegger|elektriker|treningssenter|gym/.test(s)) score.local_business += 2

  if (/free trial|gratis prøve|prøv gratis|start free|sign up free|dashboard|\bapi\b|integrasjon|integration|abonnement|subscription/.test(s)) score.saas += 3
  if (/\bsaas\b|funksjon|feature|pricing|enterprise|onboarding|workflow|automation/.test(s)) score.saas += 2

  if (/portefølje|portfolio|mine prosjekter|mitt arbeid|case study|folio|hired|leid inn/.test(s)) score.portfolio += 3
  if (/designer|fotograf|illustratør|arkitekt|freelance|frilanser|se mitt arbeid/.test(s)) score.portfolio += 2

  if (/les mer|publisert|minutter å lese|min read|nyhetsbrev|newsletter|abonner|subscribe|redaksjon/.test(s)) score.blog_media += 3
  if (/artikkel|blogg|nyheter|innlegg|post|kategori|tags|forfatter|author/.test(s)) score.blog_media += 2

  if (/\bbyrå\b|webbyrå|nettbyrå|digitalbyrå|markedsføringsbyrå|\bagency\b|studio/.test(s)) score.agency_service += 5
  if (/vi hjelper|vi leverer|tjenester|våre tjenester|case studies|resultater/.test(s)) score.agency_service += 3
  if (/kunder|klient|partner|prosjekt|løsning|strategi|rådgivning|konsulent/.test(s)) score.agency_service += 2

  if (/donasjon|donate|frivillig|volunteer|støtt oss|non-profit|veldedighet|bidra|gi en gave/.test(s)) score.nonprofit += 3
  if (/formål|oppdrag|mission|organisasjon|members|støttespiller/.test(s)) score.nonprofit += 2

  if (/kurs|course|enroll|påmelding|coaching|ebook|webinar|masterclass|modul|pensum|curriculum/.test(s)) score.info_product += 3
  if (/deltaker|student|lær|learn|leksjon|lesson|sertifikat|certificate/.test(s)) score.info_product += 2

  const best = (Object.entries(score) as [SiteCategory, number][])
    .filter(([key]) => key !== 'general')
    .sort(([, a], [, b]) => b - a)[0]

  return best && best[1] >= 3 ? best[0] : 'general'
}

function buildSystemPrompt(category: SiteCategory): string {
  const c = CATEGORY_CONFIGS[category]
  return `Du er en senior Growth Strategist, Technical SEO Lead og Conversion Optimizer i én person. Oppgaven din er å gjennomføre en skarp, kommersiell og handlingsorientert nettside-audit basert på signalene som er hentet fra nettsiden.

Målet er ikke å gi generiske råd. Målet er å avdekke hva som mest sannsynlig holder nettsiden tilbake fra:
1. å rangere organisk,
2. å bli forstått av AI-assistenter og søkemotorer,
3. å konvertere besøkende til leads, bookinger eller kjøp.

Du skal vurdere nettsiden som en forretningsressurs, ikke bare som innhold.

NETTSIDETYPE: ${c.label}
PRIMÆRT MÅL: ${c.goal}

ANALYSER SIDEN LANGS DISSE 6 OMRÅDENE:

1) VERDIFORSLAG & POSISJONERING
- Er det umiddelbart klart hva selskapet tilbyr?
- Er det tydelig hvem løsningen er for?
- Er differensieringen tydelig, eller kunne dette vært hvilken som helst konkurrent?
- Kommuniseres utfall/verdi, ikke bare features?
- Er budskapet konkret, spesifikt og troverdig?

2) KONVERTERING & CTA
- Finnes det en primær CTA, og er den tydelig?
- Finnes det for mange CTA-er som skaper friksjon?
- Matcher CTA-en brukerens intensjon og modenhetsnivå?
- Er neste steg lav-friksjon og lett å forstå?
- Finnes det støtte-CTA-er for brukere som ikke er klare til å kjøpe?
- Er CTA-språket handlingsdrevet og verdibasert?

3) TILLIT & BESLUTNINGSSTØTTE
- Finnes det sosial proof, caser, testimonials, anmeldelser eller logoer?
- Besvares viktige innvendinger?
- Er pris, prosess, levering, garanti, sikkerhet eller risiko adressert?
- Finnes det signaler som reduserer usikkerhet?
- Fremstår siden som troverdig og profesjonell?

4) SEO & SØKEINTENSJON
- Samsvarer overskrifter og innhold med hva målgruppen faktisk søker etter?
- Er H1, H2 og sidebudskap logisk strukturert?
- Er titteltag og meta description sannsynligvis sterke nok for CTR?
- Er innholdet spesifikt nok til å rangere for relevante søk?
- Finnes det tydelig topical relevance mellom tilbud, problem og målgruppe?
- Virker siden å være optimalisert for informasjons-, kommersiell- eller transaksjonell intensjon?

5) AEO / GEO / AI-SYNLIGHET
- Kan en AI-assistent enkelt forstå hva virksomheten gjør, hvem den hjelper og hvorfor den er et godt valg?
- Finnes det tydelige, direkte svar på viktige spørsmål?
- Er tjenestene/produktene beskrevet konkret og entydig?
- Er innholdet sitérbart, strukturert og skrevet med høy semantisk klarhet?
- Finnes det tydelige entities: merkevare, tjeneste, målgruppe, sted, pris, prosess, differensiering?
- Er FAQ-lignende innhold eller forklarende seksjoner sterke nok til å brukes av AI-systemer?

6) INFORMASJONSARKITEKTUR & INNHOLDSKLARHET
- Er innholdet lett å skanne?
- Er strukturen logisk, eller virker siden rotete?
- Er det sannsynlig at brukeren finner det viktigste raskt?
- Finnes det unødvendig fluff eller vag markedsføringstekst?
- Er det tydelig hierarki mellom problem, løsning, proof og CTA?

SCORINGMODELL (0–100 per område):
- 90–100: Eksepsjonelt tydelig, strategisk og konverteringssterkt
- 75–89: Solid, men med tydelige forbedringsmuligheter
- 50–74: Middels — flere svakheter hemmer effekt
- 25–49: Svakt — uklarhet eller friksjon reduserer resultater betydelig
- 0–24: Kritisk svakt — mangler fundamentale elementer

VIKTIGE REGLER:
- Ikke anta ting som ikke støttes av signalene du har mottatt.
- Hvis data mangler, si eksplisitt at det ikke kan bekreftes.
- Prioriter observasjoner som påvirker trafikk, forståelse og konvertering mest.
- Vær konkret. Unngå vage formuleringer som "kan forbedres".
- Hver anbefaling skal være forretningsrelevant.
- Ikke skriv som en hyggelig konsulent. Skriv som en skarp strateg som peker ut hva som faktisk koster dem vekst.
- overallScore skal være et enkelt heltall (gjennomsnittet av de 6 scorecard-scorene, avrundet).

RETURNER KUN GYLDIG JSON. Ingen markdown. Ingen ekstra tekst. Ingen kodeblokker.

JSON-STRUKTUR:
{
  "siteCategory": "${category}",
  "siteCategoryLabel": "${c.label}",
  "executiveSummary": {
    "diagnosis": "2-4 setninger som oppsummerer hva som er hovedproblemet på siden.",
    "biggestLeak": "Den ene største svakheten som sannsynligvis koster mest trafikk eller konvertering.",
    "fastestWin": "Det tiltaket som sannsynligvis vil gi raskest positiv effekt."
  },
  "top3Updates": [
    {
      "title": "Kort og tydelig problemformulering",
      "impact": "high",
      "whyItMatters": "Hvorfor dette påvirker vekst, SEO, AI-synlighet eller konvertering.",
      "recommendedFix": "Hva de konkret bør gjøre."
    }
  ],
  "scorecard": {
    "valuePropPositioning": { "score": 0, "analysis": "Kort analyse." },
    "conversionCTA": { "score": 0, "analysis": "Kort analyse." },
    "trustDecisionSupport": { "score": 0, "analysis": "Kort analyse." },
    "seoSearchIntent": { "score": 0, "analysis": "Kort analyse." },
    "aeoGeoAiVisibility": { "score": 0, "analysis": "Kort analyse." },
    "informationArchitectureClarity": { "score": 0, "analysis": "Kort analyse." }
  },
  "overallScore": 0,
  "priorityActions": [
    {
      "priority": 1,
      "action": "Konkret tiltak",
      "expectedOutcome": "Hva dette sannsynligvis forbedrer"
    }
  ],
  "missingSignals": [
    "Liste over ting som ikke kunne verifiseres fra signalene, men som burde vært undersøkt."
  ]
}

Her er de strukturerte signalene fra nettsiden:`
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

    // 1. Hent nettsiden
    let html = ""
    const parsedUrl = url.startsWith('http') ? url : `https://${url}`
    try {
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
      let msg = `Klarte ikke å hente nettsiden: ${error.message}`
      if (error.name === 'AbortError') {
        msg = 'Forespørselen tok for lang tid. Sjekk at URL-en er riktig og prøv igjen.'
      } else if (error.code === 'ECONNRESET' || error.message?.includes('terminated') || error.message?.includes('ECONNRESET')) {
        msg = 'Nettsiden avviste tilkoblingen. Den kan ha blokkering mot automatisk henting. Prøv en annen URL.'
      }
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    // 2. Parse HTML og trekk ut strukturerte signaler
    const $ = cheerio.load(html)

    // Metadata
    const pageTitle = $('title').text().trim()
    const metaDesc = $('meta[name="description"]').attr('content') || ''
    const canonical = $('link[rel="canonical"]').attr('href') || ''
    const htmlLang = $('html').attr('lang') || ''
    const ogTitle = $('meta[property="og:title"]').attr('content') || ''
    const ogDesc = $('meta[property="og:description"]').attr('content') || ''

    // Headings
    const h1s = $('h1').map((_, el) => $(el).text().trim()).get().filter(Boolean).join(' | ')
    const h2s = $('h2').map((_, el) => $(el).text().trim()).get().filter(Boolean).join(' | ')

    // Structured data (JSON-LD) — extract before removing scripts
    const jsonLdBlocks: string[] = []
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const raw = $(el).html() || ''
        const parsed = JSON.parse(raw)
        const type = parsed['@type'] || 'Unknown'
        const name = parsed.name || parsed.headline || ''
        const desc = parsed.description || ''
        jsonLdBlocks.push(`[${type}${name ? ': ' + name : ''}${desc ? ' — ' + desc.slice(0, 100) : ''}]`)
      } catch {}
    })
    const schemaSummary = jsonLdBlocks.length > 0 ? jsonLdBlocks.join('\n') : 'Ingen structured data funnet'

    // CTA signals — primary (header/hero area) vs secondary (rest)
    const primaryCtaTexts: string[] = []
    const secondaryCtaTexts: string[] = []

    $('header, [class*="hero"], [id*="hero"], section:first-of-type').find('a, button').each((_, el) => {
      const text = $(el).text().trim()
      if (text && text.length > 1 && text.length < 80) primaryCtaTexts.push(text)
    })

    $('a.btn, a.button, .btn, .button, [class*="cta"], [class*="call-to-action"]').each((_, el) => {
      const text = $(el).text().trim()
      if (text && text.length > 1 && text.length < 80 && !primaryCtaTexts.includes(text)) {
        secondaryCtaTexts.push(text)
      }
    })

    // Trust signals
    const trustTexts: string[] = []
    $('[class*="testimonial"], [class*="review"], [class*="rating"], [class*="logo"], [class*="partner"], [class*="trust"], [class*="award"], [class*="client"]').each((_, el) => {
      const text = $(el).text().replace(/\s+/g, ' ').trim()
      if (text && text.length > 5 && text.length < 300) trustTexts.push(text)
    })

    // Contact signals — regex on raw HTML
    const contactSignals: string[] = []
    const phoneMatches = html.match(/(\+47[\s\-]?)?[2-9]\d[\s\-]?\d{2}[\s\-]?\d{2}[\s\-]?\d{2}/g) || []
    const emailMatches = html.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g) || []
    if (phoneMatches.length > 0) contactSignals.push(`Telefon: ${Array.from(new Set(phoneMatches)).slice(0, 3).join(', ')}`)
    if (emailMatches.length > 0) contactSignals.push(`E-post: ${Array.from(new Set(emailMatches)).slice(0, 3).join(', ')}`)

    // FAQ-like content
    const faqTexts: string[] = []
    $('h2, h3, h4, dt').each((_, el) => {
      const text = $(el).text().trim()
      if (text.endsWith('?') && text.length > 10) {
        const answer = $(el).next().text().replace(/\s+/g, ' ').trim().slice(0, 200)
        faqTexts.push(`Q: ${text}${answer ? '\nA: ' + answer : ''}`)
      }
    })

    // Internal links (anchor texts, same domain)
    const domain = new URL(parsedUrl).hostname
    const internalLinkTexts: string[] = []
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href') || ''
      const text = $(el).text().trim()
      if (!text || text.length < 2 || text.length > 60) return
      const isInternal = href.startsWith('/') || href.includes(domain)
      if (isInternal) internalLinkTexts.push(text)
    })

    // Image alt texts
    const imageAlts = $('img[alt]').map((_, el) => $(el).attr('alt')).get()
      .filter((alt): alt is string => !!alt && alt.trim().length > 2)
      .slice(0, 20)

    // Now remove noise elements and extract clean body text
    $('script, style, noscript, iframe, svg, header, footer, nav, aside').remove()
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 12000)

    // 3. Detekter nettside-kategori
    const signals = `${pageTitle} ${metaDesc} ${h1s} ${h2s} ${primaryCtaTexts.join(' ')} ${secondaryCtaTexts.join(' ')} ${bodyText}`
    const siteCategory = detectSiteCategory(signals)

    // 4. Bygg strukturert siteContext
    const siteContext = `
URL: ${parsedUrl}
TITLE: ${pageTitle}
META DESCRIPTION: ${metaDesc}
CANONICAL: ${canonical || 'Ikke funnet'}
LANG: ${htmlLang || 'Ikke funnet'}
OG TITLE: ${ogTitle || 'Ikke funnet'}
OG DESCRIPTION: ${ogDesc || 'Ikke funnet'}

H1:
${h1s || 'Ingen H1 funnet'}

H2:
${h2s || 'Ingen H2 funnet'}

PRIMARY CTA CANDIDATES (header/hero-seksjon):
${primaryCtaTexts.slice(0, 10).join(' | ') || 'Ingen funnet'}

SECONDARY CTA CANDIDATES:
${Array.from(new Set(secondaryCtaTexts)).slice(0, 15).join(' | ') || 'Ingen funnet'}

TRUST SIGNALS (testimonials, anmeldelser, logoer, partnere):
${trustTexts.slice(0, 5).join('\n') || 'Ingen strukturerte trust-signaler funnet'}

CONTACT SIGNALS:
${contactSignals.join('\n') || 'Ingen kontaktsignaler funnet'}

FAQ / SPØRSMÅLSBASERT INNHOLD:
${faqTexts.slice(0, 8).join('\n\n') || 'Ingen FAQ-lignende innhold funnet'}

INTERNE LENKER (ankertekster):
${Array.from(new Set(internalLinkTexts)).slice(0, 20).join(' | ') || 'Ingen funnet'}

BILDE ALT-TEKSTER:
${imageAlts.join(' | ') || 'Ingen funnet'}

STRUCTURED DATA (JSON-LD):
${schemaSummary}

BRØDTEKST:
${bodyText}
`.trim()

    // 5. Spør OpenAI med ny prompt
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
    let msg = 'Det oppstod en ukjent feil på serveren.'
    if (error.code === 'ECONNRESET' || error.message?.includes('terminated') || error.message?.includes('ECONNRESET')) {
      msg = 'Nettsiden avviste tilkoblingen. Den kan ha blokkering mot automatisk henting. Prøv en annen URL.'
    }
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
