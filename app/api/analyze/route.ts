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

  // eCommerce: Products, cart, prices
  if (/handlekurv|legg i kurv|add to cart|checkout|nettbutikk|shop|buy now|\bkr\s*\d|\bnok\b|fri frakt|prisgaranti/.test(s)) score.ecommerce += 4
  if (/produkt|kategori|filter|sorter|lager|på lager|utsolgt|antall|størrelse|farge/.test(s)) score.ecommerce += 2

  // Local Business: Physical presence, contact, maps
  if (/åpningstider|opening hours|bestill bord|book a table|ring oss|call us|finn oss|find us|kart|google maps|veibeskrivelse|get directions/.test(s)) score.local_business += 4
  if (/adresse|telefon|tlf|restaurant|kafé|frisør|tannlege|lege|rørlegger|elektriker|treningssenter|gym|verksted|butikk|salong|klinikk|verksted|sentralt/.test(s)) score.local_business += 3
  if (/[\d]{4}\s+[a-zæøå\s]+,?\s+norge/i.test(s)) score.local_business += 2 

  // SaaS: Digital product, trials, dashboard, tech ops
  if (/free trial|gratis prøve|prøv gratis|start free|sign up free|dashboard|integrasjon|integration|abonnement|subscription|automatisering|workflow/.test(s)) score.saas += 4
  if (/\bsaas\b|funksjon|feature|pricing|enterprise|onboarding|automation|innlogging|login|registrer/.test(s)) score.saas += 2

  // Portfolio: Showcase personal work
  if (/portefølje|portfolio|mine prosjekter|mitt arbeid|case study|folio|hired|leid inn|prosjekter/.test(s)) score.portfolio += 4
  if (/designer|fotograf|illustratør|arkitekt|freelance|frilanser|se mitt arbeid/.test(s)) score.portfolio += 2

  // Blog / Media: Articles, news, reading
  if (/les mer|publisert|minutter å lese|min read|nyhetsbrev|newsletter|abonner|subscribe|redaksjon/.test(s)) score.blog_media += 4
  if (/artikkel|blogg|nyheter|innlegg|post|kategori|tags|forfatter|author|opinion|debatt/.test(s)) score.blog_media += 2

  // Agency / Service: B2B services, case studies, help
  if (/\bbyrå\b|webbyrå|nettbyrå|digitalbyrå|markedsføringsbyrå|\bagency\b|studio/.test(s)) score.agency_service += 5
  if (/vi hjelper|vi leverer|tjenester|våre tjenester|case studies|resultater|vår kompetanse/.test(s)) score.agency_service += 3
  if (/kunder|klient|partner|prosjekt|løsning|strategi|rådgivning|konsulent|rådgiver/.test(s)) score.agency_service += 2

  // Nonprofit / NGO: Missions, donations
  if (/donasjon|donate|frivillig|volunteer|støtt oss|non-profit|veldedighet|bidra|gi en gave/.test(s)) score.nonprofit += 5
  if (/formål|oppdrag|mission|organisasjon|members|støttespiller|forening|forbund/.test(s)) score.nonprofit += 2

  // Info Product / EdTech: Learning, courses
  if (/kurs|course|enroll|påmelding|coaching|ebook|webinar|masterclass|modul|pensum|curriculum/.test(s)) score.info_product += 4
  if (/deltaker|student|lær|learn|leksjon|lesson|sertifikat|certificate|utdanning/.test(s)) score.info_product += 2

  const best = (Object.entries(score) as [SiteCategory, number][])
    .filter(([key]) => key !== 'general')
    .sort(([, a], [, b]) => b - a)[0]

  return best && best[1] >= 4 ? best[0] : 'general'
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
- Finnes det tydelige, direkte svar på viktige spørsmål? (Answer-first format)
- Er tjenestene/produktene beskrevet konkret og entydig?
- Brukes de 9 Princeton GEO-metodene? (Siteringer, Statistikk, Sitater, Autoritær tone, Enkelhet, Tekniske termer, Ordmangfold, Flyt).
- Er innholdet sitérbart, strukturert og skrevet med høy semantisk klarhet?
- Finnes det tydelige entities: merkevare, tjeneste, målgruppe, sted, pris, prosess, differensiering?
- llms.txt: Finnes / Mangler (se LLMS.TXT-signalet i siteContext)
- AI-crawler tilgang: Er GPTBot, ClaudeBot, PerplexityBot, etc. eksplisitt tillatt i robots.txt?
- E-E-A-T: Finnes forfatter-info, team-beskrivelse, sertifiseringer eller credentials som øker troverdighet for AI-systemer?
- Er statistikk og påstander kontekstualisert med kilde, metodikk og tidslinje?
- Finnes Organization/Person schema med sameAs-felter for ekstern entitetskobling (Socials, Wikipedia, LinkedIn)?

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

VEKTING AV GEO SCORE (viktig):
Bruk denne vektingen internt når du vurderer AEO/GEO-seksjonen:
- AI Citability (Sitérbarhet): 25%
- Brand Authority (Autoritet): 20%
- Content E-E-A-T: 20%
- Technical GEO (Crawler-tilgang, llms.txt): 15%
- Schema & Structured Data: 10%
- Platform Optimization: 10%

VIKTIGE REGLER:
- Ikke anta ting som ikke støttes av signalene du har mottatt.
- Hvis data mangler, si eksplisitt at det ikke kan bekreftes.
- Prioriter observasjoner som påvirker trafikk, forståelse og konvertering mest.
- Vær konkret. Unngå vage formuleringer som "kan forbedres".
- Hver anbefaling skal være forretningsrelevant.
- Ikke skriv som en hyggelig konsulent. Skriv som en skarp strateg som peker ut hva som faktisk koster dem vekst.
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
  "geoAnalysis": {
    "citationReadiness": 0, // 0-100 score på hvor klar siden er for AI-sitering
    "princetonMethods": {
      "citations": { "score": 0, "status": "Kort vurdering" },
      "statistics": { "score": 0, "status": "Kort vurdering" },
      "quotations": { "score": 0, "status": "Kort vurdering" },
      "authoritativeTone": { "score": 0, "status": "Kort vurdering" },
      "fluency": { "score": 0, "status": "Kort vurdering" }
    },
    "detailedGeoInsight": "Dypere analyse av hvordan siden presterer i AI-søk (GEO)."
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
    const origin = new URL(parsedUrl).origin

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

    // 1b. Hent robots.txt og llms.txt parallelt (GEO-signaler)
    const fetchText = async (u: string) => {
      try {
        const r = await fetch(u, { signal: AbortSignal.timeout(5000) })
        return r.ok ? await r.text() : ''
      } catch { return '' }
    }
    const [robotsTxtRaw, llmsTxtRaw] = await Promise.all([
      fetchText(`${origin}/robots.txt`),
      fetchText(`${origin}/llms.txt`),
    ])

    // Parse AI-bot tilgang fra robots.txt
    const aiBots = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'CCBot', 'Googlebot-Extended', 'YouBot', 'BraveBot', 'Bingbot', 'ChatGPT-User']
    const robotsLines = robotsTxtRaw.toLowerCase()
    function botStatus(bot: string): string {
      const b = bot.toLowerCase()
      const agentIdx = robotsLines.indexOf(`user-agent: ${b}`)
      const wildcardIdx = robotsLines.indexOf('user-agent: *')
      // Look for specific bot rule first
      if (agentIdx !== -1) {
        const segment = robotsLines.slice(agentIdx, agentIdx + 200)
        if (segment.includes('disallow: /')) return 'Blokkert'
        if (segment.includes('allow: /')) return 'Tillatt'
      }
      // Fall back to wildcard
      if (wildcardIdx !== -1) {
        const segment = robotsLines.slice(wildcardIdx, wildcardIdx + 200)
        if (segment.includes('disallow: /\n') || segment.includes('disallow: / ')) return 'Blokkert'
        return 'Tillatt (wildcard)'
      }
      return robotsTxtRaw ? 'Tillatt (ingen restriksjon)' : 'Ukjent (robots.txt ikke funnet)'
    }
    const robotsSummary = robotsTxtRaw
      ? aiBots.map(b => `${b}: ${botStatus(b)}`).join('\n')
      : 'robots.txt ikke funnet'

    const llmsTxtStatus = llmsTxtRaw
      ? `Finnes (${llmsTxtRaw.length} tegn)\nInnhold (første 300 tegn): ${llmsTxtRaw.slice(0, 300)}`
      : 'Mangler — ingen llms.txt funnet'

    // 2. Parse HTML og trekk ut strukturerte signaler
    const $ = cheerio.load(html)

    // Metadata
    const pageTitle = $('title').text().trim()
    const metaDesc = $('meta[name="description"]').attr('content') || ''
    const canonical = $('link[rel="canonical"]').attr('href') || ''
    const htmlLang = $('html').attr('lang') || ''
    const ogTitle = $('meta[property="og:title"]').attr('content') || ''
    const ogDesc = $('meta[property="og:description"]').attr('content') || ''

    // Geo Tags
    const geoRegion = $('meta[name="geo.region"]').attr('content') || ''
    const geoPlacename = $('meta[name="geo.placename"]').attr('content') || ''
    const geoPosition = $('meta[name="geo.position"]').attr('content') || ''
    const icbm = $('meta[name="ICBM"]').attr('content') || ''

    // Headings
    const h1s = $('h1').map((_, el) => $(el).text().trim()).get().filter(Boolean).join(' | ')
    const h2s = $('h2').map((_, el) => $(el).text().trim()).get().filter(Boolean).join(' | ')

    // Structured data (JSON-LD) — extract before removing scripts
    const jsonLdBlocks: string[] = []
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const raw = $(el).html() || ''
        const parsed = JSON.parse(raw)
        // Handle both @graph arrays and single schema objects
        const items: any[] = parsed['@graph'] ? parsed['@graph'] : [parsed]
        items.forEach((item: any) => {
          const type = item['@type'] || 'Unknown'
          const name = item.name || item.headline || ''
          const desc = item.description || ''
          jsonLdBlocks.push(`[${type}${name ? ': ' + name : ''}${desc ? ' — ' + desc.slice(0, 100) : ''}]`)
          // For FAQPage: also extract Q&A pairs
          if (type === 'FAQPage' && Array.isArray(item.mainEntity)) {
            item.mainEntity.slice(0, 5).forEach((qa: any) => {
              const q = qa.name || ''
              const a = qa.acceptedAnswer?.text || ''
              if (q) jsonLdBlocks.push(`FAQ: Q: ${q}${a ? ' A: ' + a.slice(0, 150) : ''}`)
            })
          }
        })
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

    $('a.btn, a.button, .btn, .button, [class*="cta"], [class*="call-to-action"]')
      .not('nav *, [role="navigation"] *, .nav *, .mobile-menu *')
      .each((_, el) => {
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

    // FAQ-like content — check headings AND accordion/button triggers
    const faqTexts: string[] = []
    const faqSeen = new Set<string>()
    $('h2, h3, h4, dt, [class*="accordion__title"], [class*="accordion__trigger"] span, button').each((_, el) => {
      const text = $(el).text().trim()
      if (text.endsWith('?') && text.length > 10 && !faqSeen.has(text)) {
        faqSeen.add(text)
        const answer = $(el).closest('[class*="accordion__item"]').find('[class*="accordion__body"]').text().replace(/\s+/g, ' ').trim().slice(0, 200)
          || $(el).next().text().replace(/\s+/g, ' ').trim().slice(0, 200)
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

    // E-E-A-T signals — author info, credentials, team, social profiles
    const eeatSignals: string[] = []
    $('[class*="author"], [rel="author"], [class*="team"], [class*="founder"], [class*="bio"], [class*="about"]').each((_, el) => {
      const text = $(el).text().replace(/\s+/g, ' ').trim()
      if (text && text.length > 5 && text.length < 300) eeatSignals.push(text)
    })
    $('[class*="certif"], [class*="credential"], [class*="award"], [class*="badge"]').each((_, el) => {
      const text = $(el).text().replace(/\s+/g, ' ').trim()
      if (text && text.length > 2 && text.length < 150) eeatSignals.push(`[Credential] ${text}`)
    })
    // Social profile links
    const socialLinks: string[] = []
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href') || ''
      if (/linkedin\.com|twitter\.com|x\.com|facebook\.com|instagram\.com|reddit\.com|youtube\.com|vimeo\.com|github\.com|wikipedia\.org/.test(href)) {
        socialLinks.push(href.replace(/^https?:\/\/(www\.)?/, '').split('/')[0] + ': ' + href)
      }
    })

    // Now remove noise elements and extract clean body text
    $('script, style, noscript, iframe, svg, header, footer, nav, aside').remove()
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 12000)

    // 3. Detekter nettside-kategori
    const signals = `${pageTitle} ${metaDesc} ${h1s} ${h2s} ${primaryCtaTexts.join(' ')} ${secondaryCtaTexts.join(' ')} ${bodyText}`
    const siteCategory = detectSiteCategory(signals)

    // JSON-LD (Schema.org types)
    const schemaTypes: string[] = []
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const text = $(el).text()
        const match = text.match(/"@type"\s*:\s*"([^"]+)"/g)
        if (match) {
          match.forEach(m => {
            const t = m.split(':')[1].replace(/[",\s]/g, '')
            if (!schemaTypes.includes(t)) schemaTypes.push(t)
          })
        }
      } catch {}
    })

    // Semantic Structure (GEO Signals)
    const tablesCount = $('table').length
    const listsCount = $('ul, ol').length
    const blockquotesCount = $('blockquote').length
    const semanticStats = `Tabeller: ${tablesCount}, Lister: ${listsCount}, Sitater: ${blockquotesCount}`

    // 4. Bygg strukturert siteContext
    const siteContext = `URL: ${parsedUrl}
DATE: ${new Date().toISOString().split('T')[0]}
CATEGORY: ${siteCategory}
TITLE: ${pageTitle || 'Ikke funnet'}
DESCRIPTION: ${metaDesc || 'Ikke funnet'}
CANONICAL: ${canonical || 'Ikke funnet'}
LANG: ${htmlLang || 'Ikke funnet'}

OG TITLE: ${ogTitle || 'Ikke funnet'}
OG DESCRIPTION: ${ogDesc || 'Ikke funnet'}

GEO TAGS:
Region: ${geoRegion || 'Ikke funnet'}
Placename: ${geoPlacename || 'Ikke funnet'}
Position: ${geoPosition || 'Ikke funnet'}
ICBM: ${icbm || 'Ikke funnet'}

SCHEMA TYPES: ${schemaTypes.length > 0 ? schemaTypes.join(', ') : 'Ingen funnet'}
SEMANTIC STRUCTURE: ${semanticStats}

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

E-E-A-T SIGNALER (forfatter, team, sertifiseringer):
${eeatSignals.slice(0, 5).join('\n') || 'Ingen E-E-A-T-signaler funnet (ingen forfatter-info, team-seksjon eller sertifiseringer)'}

SOSIALE PROFILER / EKSTERN TILSTEDEVÆRELSE:
${socialLinks.slice(0, 5).join('\n') || 'Ingen sosiale profiler funnet'}

ROBOTS.TXT — AI-CRAWLER TILGANG:
${robotsSummary}

LLMS.TXT — AI-LESBARHETSFIL:
${llmsTxtStatus}

BRØDTEKST:
${bodyText}
`.trim()

    // 5. Spør OpenAI med ny prompt
    const openai = new OpenAI({ apiKey })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0,
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

    // Compute overallScore deterministically from the 6 area scores
    const sc = parsedData.scorecard
    const areaScores = [
      sc?.valuePropPositioning?.score,
      sc?.conversionCTA?.score,
      sc?.trustDecisionSupport?.score,
      sc?.seoSearchIntent?.score,
      sc?.aeoGeoAiVisibility?.score,
      sc?.informationArchitectureClarity?.score,
    ].filter((s): s is number => typeof s === 'number')
    if (areaScores.length === 6) {
      parsedData.overallScore = Math.round(areaScores.reduce((a, b) => a + b, 0) / 6)
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
