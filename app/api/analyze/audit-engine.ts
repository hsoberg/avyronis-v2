import * as cheerio from 'cheerio'
import dns from 'node:dns/promises'
import net from 'node:net'

export type SiteCategory =
  | 'saas'
  | 'ecommerce'
  | 'local_business'
  | 'portfolio'
  | 'blog_media'
  | 'agency_service'
  | 'nonprofit'
  | 'info_product'
  | 'general'

type Severity = 'critical' | 'high' | 'medium' | 'low'
type Confidence = 'confirmed' | 'likely' | 'not_verified'

interface CategoryConfig {
  label: string
  goal: string
  schemaTypes: string[]
}

interface FetchResult {
  url: string
  finalUrl: string
  status: number
  contentType: string
  text: string
}

interface RobotRule {
  type: 'allow' | 'disallow'
  path: string
}

interface RobotGroup {
  agents: string[]
  rules: RobotRule[]
}

export interface Finding {
  category: string
  title: string
  severity: Severity
  url?: string
  evidence: string
  recommendation: string
  confidence: Confidence
}

interface PageAudit {
  url: string
  finalUrl: string
  status: number
  title: string
  metaDescription: string
  canonical: string
  lang: string
  h1s: string[]
  h2s: string[]
  h3s: string[]
  wordCount: number
  bodySample: string
  schemaTypes: string[]
  schemaErrors: string[]
  jsonLdCount: number
  microdataTypes: string[]
  hasNoindex: boolean
  robotsMeta: string
  ctaTexts: string[]
  primaryCtaTexts: string[]
  trustSignals: string[]
  faqQuestions: string[]
  authorSignals: string[]
  credentialSignals: string[]
  contactSignals: string[]
  socialLinks: string[]
  internalUrls: string[]
  internalLinkCount: number
  externalLinkCount: number
  imageCount: number
  imagesMissingAlt: number
  ogPresent: boolean
  twitterPresent: boolean
  tableCount: number
  listCount: number
  blockquoteCount: number
  statisticCount: number
  outboundCitationCount: number
  publishedDates: string[]
}

interface CrawlFailure {
  url: string
  reason: string
}

interface RobotsInfo {
  exists: boolean
  summary: string
  botAccess: Record<string, string>
  blockedAiBots: string[]
  rawPreview: string
}

interface LlmsInfo {
  exists: boolean
  length: number
  linkCount: number
  hasStructuredSections: boolean
  preview: string
}

interface ScoreArea {
  score: number
  analysis: string
}

interface GeoScore {
  score: number
  weight: number
  weightedScore: number
  label: string
  evidence: string[]
}

type LeadTemperature = 'hot' | 'warm' | 'nurture'

interface LeadQualification {
  score: number
  temperature: LeadTemperature
  reasons: string[]
  recommendedPitch: string
  urgency: string
}

interface RecommendedService {
  id: 'quick_fix_sprint' | 'seo_aeo_foundation' | 'conversion_upgrade' | 'full_website_rebuild' | 'technical_recovery'
  title: string
  summary: string
  estimatedScope: string
  primaryCta: string
  nextStep: string
  bookingHref: string
  reasons: string[]
}

export interface AuditResult {
  siteCategory: SiteCategory
  siteCategoryLabel: string
  analyzedUrl: string
  finalUrl: string
  overallScore: number
  confidence: Confidence
  auditScope: {
    requestedUrl: string
    finalUrl: string
    analyzedAt: string
    pagesAnalyzed: number
    pagesSkipped: number
    sitemapUrlsFound: number
    crawlSource: string
    robotsTxtFound: boolean
    llmsTxtFound: boolean
    safeguards: string[]
  }
  executiveSummary: {
    diagnosis: string
    biggestLeak: string
    fastestWin: string
  }
  geoAnalysis: {
    citationReadiness: number
    detailedGeoInsight: string
    crawlerAccess: Record<string, string>
    llmsTxt: LlmsInfo
    geoScorecard: Record<string, GeoScore>
    princetonMethods: Record<string, { score: number; status: string }>
  }
  scoreBreakdown: GeoScore[]
  scorecard: {
    valuePropPositioning: ScoreArea
    conversionCTA: ScoreArea
    trustDecisionSupport: ScoreArea
    seoSearchIntent: ScoreArea
    informationArchitectureClarity: ScoreArea
  }
  findings: Finding[]
  leadQualification: LeadQualification
  recommendedService: RecommendedService
  top3Updates: Array<{
    title: string
    impact: 'high' | 'medium' | 'low'
    whyItMatters: string
    recommendedFix: string
  }>
  missingSignals: string[]
  crawlPages: Array<{
    url: string
    status: number
    title: string
    h1: string
    wordCount: number
    schemaTypes: string[]
    issues: number
  }>
  crawlFailures: CrawlFailure[]
}

export class AuditInputError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.name = 'AuditInputError'
    this.status = status
  }
}

export interface AuditNarrative {
  executiveSummary?: Partial<AuditResult['executiveSummary']>
  detailedGeoInsight?: string
  scorecardAnalysis?: Partial<Record<keyof AuditResult['scorecard'], string>>
  top3Updates?: AuditResult['top3Updates']
}

const CATEGORY_CONFIGS: Record<SiteCategory, CategoryConfig> = {
  saas: {
    label: 'SaaS / Digital tjeneste',
    goal: 'Sign-ups, gratis prøveperioder og demo-bookinger',
    schemaTypes: ['SoftwareApplication', 'Organization', 'FAQPage', 'HowTo'],
  },
  ecommerce: {
    label: 'Nettbutikk / E-handel',
    goal: 'Produktsalg, handlekurv-konverteringer og gjenkjøp',
    schemaTypes: ['Product', 'Offer', 'AggregateRating', 'BreadcrumbList', 'Organization'],
  },
  local_business: {
    label: 'Lokal bedrift',
    goal: 'Telefonsamtaler, bookinger og besøk til fysisk sted',
    schemaTypes: ['LocalBusiness', 'Organization', 'GeoCoordinates', 'OpeningHoursSpecification', 'FAQPage'],
  },
  portfolio: {
    label: 'Portefølje / Personlig merkevare',
    goal: 'Forespørsler om samarbeid, prosjektarbeid og tillitsbygging',
    schemaTypes: ['Person', 'Organization', 'CreativeWork', 'BreadcrumbList'],
  },
  blog_media: {
    label: 'Blogg / Medieside',
    goal: 'Leserengasjement, abonnenter og gjentakende besøk',
    schemaTypes: ['Article', 'NewsArticle', 'Person', 'BreadcrumbList', 'Organization'],
  },
  agency_service: {
    label: 'Byrå / Tjenesteleverandør',
    goal: 'Leadgenerering, tilbudsforespørsler og nye kunder',
    schemaTypes: ['Organization', 'Service', 'Person', 'Review', 'FAQPage'],
  },
  nonprofit: {
    label: 'Non-profit / Institusjon',
    goal: 'Donasjoner, frivillige, bevissthet og støttespillere',
    schemaTypes: ['Organization', 'NGO', 'FAQPage', 'Event'],
  },
  info_product: {
    label: 'Infoprodukt / Kurs / Coaching',
    goal: 'Kjøp, påmelding og enrolment',
    schemaTypes: ['Course', 'Product', 'Person', 'FAQPage', 'Organization'],
  },
  general: {
    label: 'Generell nettside',
    goal: 'Engasjement, synlighet og konvertering etter sidens egne mål',
    schemaTypes: ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'],
  },
}

const USER_AGENT = 'AvyronisGEOAudit/1.0 (+https://avyronis.com/geo-audit)'
const MAX_PAGES = 20
const MAX_HTML_BYTES = 1_500_000
const MAX_TEXT_BYTES = 300_000
const FETCH_TIMEOUT_MS = 9000
const RESOURCE_TIMEOUT_MS = 5000
const AI_BOTS = ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Googlebot-Extended', 'CCBot', 'YouBot', 'Bingbot']
const dnsValidationCache = new Map<string, Promise<void>>()

export async function collectAudit(inputUrl: string): Promise<AuditResult> {
  const requestedUrl = inputUrl.trim()
  const startUrl = await normalizeInputUrl(requestedUrl)
  const homepageFetch = await fetchPublicText(startUrl, {
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    maxBytes: MAX_HTML_BYTES,
    requireHtml: true,
    timeoutMs: FETCH_TIMEOUT_MS,
  })

  const finalUrl = new URL(homepageFetch.finalUrl)
  const origin = finalUrl.origin
  const [robotsTxtRaw, llmsTxtRaw] = await Promise.all([
    fetchOptionalText(new URL('/robots.txt', origin), MAX_TEXT_BYTES),
    fetchOptionalText(new URL('/llms.txt', origin), MAX_TEXT_BYTES),
  ])

  const robotsInfo = analyzeRobots(robotsTxtRaw)
  const llmsInfo = analyzeLlmsTxt(llmsTxtRaw)
  const homepage = analyzePage(homepageFetch.url, homepageFetch.finalUrl, homepageFetch.status, homepageFetch.text, origin)

  const sitemapUrls = await discoverSitemapUrls(finalUrl, robotsTxtRaw)
  const selectedUrls = selectCrawlUrls(finalUrl, origin, robotsTxtRaw, sitemapUrls, homepage.internalUrls)
  const pages: PageAudit[] = [homepage]
  const crawlFailures: CrawlFailure[] = []

  for (const url of selectedUrls) {
    if (canonicalUrlKey(url) === canonicalUrlKey(finalUrl.toString())) continue
    const decision = getRobotsDecision(robotsTxtRaw, USER_AGENT, new URL(url).pathname)
    if (!decision.allowed) {
      crawlFailures.push({ url, reason: `Hoppet over på grunn av robots.txt (${decision.rule ?? 'Disallow'})` })
      continue
    }

    try {
      const pageFetch = await fetchPublicText(new URL(url), {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        maxBytes: MAX_HTML_BYTES,
        requireHtml: true,
        timeoutMs: FETCH_TIMEOUT_MS,
      })
      pages.push(analyzePage(url, pageFetch.finalUrl, pageFetch.status, pageFetch.text, origin))
    } catch (error) {
      crawlFailures.push({ url, reason: humanizeError(error) })
    }

    if (pages.length >= MAX_PAGES) break
  }

  const siteCategory = detectSiteCategory(pages)
  const findings = buildFindings(siteCategory, pages, robotsInfo, llmsInfo, sitemapUrls, crawlFailures)
  const scorecard = computeBusinessScorecard(pages, sitemapUrls, crawlFailures)
  const geoScorecard = computeGeoScorecard(siteCategory, pages, robotsInfo, llmsInfo, sitemapUrls, crawlFailures)
  const scoreBreakdown = Object.values(geoScorecard)
  const overallScore = Math.round(scoreBreakdown.reduce((sum, item) => sum + item.score * item.weight, 0))
  const missingSignals = buildMissingSignals(pages, robotsInfo, llmsInfo, crawlFailures)
  const top3Updates = buildTop3Updates(findings)
  const leadQualification = buildLeadQualification(overallScore, findings, scorecard, geoScorecard, pages, crawlFailures)
  const recommendedService = buildRecommendedService(overallScore, findings, scorecard, geoScorecard, leadQualification)

  return {
    siteCategory,
    siteCategoryLabel: CATEGORY_CONFIGS[siteCategory].label,
    analyzedUrl: requestedUrl,
    finalUrl: finalUrl.toString(),
    overallScore,
    confidence: pages.length >= 3 ? 'confirmed' : 'likely',
    auditScope: {
      requestedUrl,
      finalUrl: finalUrl.toString(),
      analyzedAt: new Date().toISOString(),
      pagesAnalyzed: pages.length,
      pagesSkipped: crawlFailures.length,
      sitemapUrlsFound: sitemapUrls.length,
      crawlSource: sitemapUrls.length > 0 ? 'sitemap + prioriterte interne lenker' : 'prioriterte interne lenker fra startsiden',
      robotsTxtFound: robotsInfo.exists,
      llmsTxtFound: llmsInfo.exists,
      safeguards: [
        'Blokkerer lokale/private IP-adresser og ikke-HTTP(S)-URL-er',
        `Maks ${MAX_PAGES} HTML-sider per audit`,
        'Begrenser responsstørrelse og følger bare validerte redirects',
        'Respekterer robots.txt for crawl av undersider',
      ],
    },
    executiveSummary: buildFallbackSummary(overallScore, findings, pages),
    geoAnalysis: {
      citationReadiness: geoScorecard.aiCitability.score,
      detailedGeoInsight: buildDetailedGeoInsight(geoScorecard, findings),
      crawlerAccess: robotsInfo.botAccess,
      llmsTxt: llmsInfo,
      geoScorecard,
      princetonMethods: buildLegacyMethodScores(geoScorecard, pages),
    },
    scoreBreakdown,
    scorecard,
    findings,
    leadQualification,
    recommendedService,
    top3Updates,
    missingSignals,
    crawlPages: pages.map((page) => ({
      url: page.finalUrl,
      status: page.status,
      title: page.title || 'Tittel mangler',
      h1: page.h1s[0] || 'H1 mangler',
      wordCount: page.wordCount,
      schemaTypes: page.schemaTypes,
      issues: findings.filter((finding) => finding.url === page.finalUrl || finding.url === page.url).length,
    })),
    crawlFailures,
  }
}

export function buildNarrativePrompt(audit: AuditResult): string {
  const compactPages = audit.crawlPages.slice(0, 10).map((page) => ({
    url: page.url,
    title: page.title,
    h1: page.h1,
    words: page.wordCount,
    schema: page.schemaTypes,
    issues: page.issues,
  }))

  const compactFindings = audit.findings.slice(0, 12).map((finding) => ({
    severity: finding.severity,
    category: finding.category,
    title: finding.title,
    evidence: finding.evidence,
    recommendation: finding.recommendation,
    confidence: finding.confidence,
    url: finding.url,
  }))

  return JSON.stringify({
    instructions: [
      'Du skal skrive en norsk, kommersiell og presis rapportoppsummering basert kun på fakta under.',
      'Ikke endre score, ikke finn på eksterne mentions, AI-siteringer, trafikk, ranking eller konverteringsdata.',
      'Hvis noe ikke er verifisert, formuler det som ikke verifisert.',
      'Returner kun gyldig JSON.',
    ],
    requiredJsonShape: {
      executiveSummary: {
        diagnosis: '2-4 setninger',
        biggestLeak: '1 konkret hovedproblem',
        fastestWin: '1 konkret tiltak',
      },
      detailedGeoInsight: 'Kort forklaring av AI-readiness og GEO-svakheter',
      scorecardAnalysis: {
        valuePropPositioning: 'Kort analyse',
        conversionCTA: 'Kort analyse',
        trustDecisionSupport: 'Kort analyse',
        seoSearchIntent: 'Kort analyse',
        informationArchitectureClarity: 'Kort analyse',
      },
      top3Updates: [
        {
          title: 'Kort problemformulering',
          impact: 'high | medium | low',
          whyItMatters: 'Hvorfor det betyr noe',
          recommendedFix: 'Konkret fix',
        },
      ],
    },
    auditFacts: {
      finalUrl: audit.finalUrl,
      category: audit.siteCategoryLabel,
      overallScore: audit.overallScore,
      pagesAnalyzed: audit.auditScope.pagesAnalyzed,
      pagesSkipped: audit.auditScope.pagesSkipped,
      scoreBreakdown: audit.scoreBreakdown.map((score) => ({
        label: score.label,
        score: score.score,
        weight: score.weight,
        evidence: score.evidence,
      })),
      pages: compactPages,
      findings: compactFindings,
      missingSignals: audit.missingSignals,
      leadQualification: audit.leadQualification,
      recommendedService: audit.recommendedService,
    },
  })
}

export function applyNarrative(audit: AuditResult, narrative: AuditNarrative): AuditResult {
  return {
    ...audit,
    executiveSummary: {
      diagnosis: narrative.executiveSummary?.diagnosis || audit.executiveSummary.diagnosis,
      biggestLeak: narrative.executiveSummary?.biggestLeak || audit.executiveSummary.biggestLeak,
      fastestWin: narrative.executiveSummary?.fastestWin || audit.executiveSummary.fastestWin,
    },
    geoAnalysis: {
      ...audit.geoAnalysis,
      detailedGeoInsight: narrative.detailedGeoInsight || audit.geoAnalysis.detailedGeoInsight,
    },
    scorecard: {
      valuePropPositioning: withAnalysis(audit.scorecard.valuePropPositioning, narrative.scorecardAnalysis?.valuePropPositioning),
      conversionCTA: withAnalysis(audit.scorecard.conversionCTA, narrative.scorecardAnalysis?.conversionCTA),
      trustDecisionSupport: withAnalysis(audit.scorecard.trustDecisionSupport, narrative.scorecardAnalysis?.trustDecisionSupport),
      seoSearchIntent: withAnalysis(audit.scorecard.seoSearchIntent, narrative.scorecardAnalysis?.seoSearchIntent),
      informationArchitectureClarity: withAnalysis(
        audit.scorecard.informationArchitectureClarity,
        narrative.scorecardAnalysis?.informationArchitectureClarity
      ),
    },
    top3Updates: audit.top3Updates,
  }
}

function withAnalysis(area: ScoreArea, analysis?: string): ScoreArea {
  return {
    ...area,
    analysis: analysis || area.analysis,
  }
}

async function normalizeInputUrl(rawInput: string): Promise<URL> {
  if (!rawInput || rawInput.length > 2048) {
    throw new AuditInputError('Skriv inn en gyldig URL.')
  }

  const inputWithProtocol = /^[a-z][a-z\d+.-]*:\/\//i.test(rawInput) ? rawInput : `https://${rawInput}`
  let url: URL

  try {
    url = new URL(inputWithProtocol)
  } catch {
    throw new AuditInputError('URL-en kunne ikke leses. Prøv for eksempel https://dittdomene.no.')
  }

  url.hash = ''
  if (url.username || url.password) {
    throw new AuditInputError('URL-er med brukernavn eller passord kan ikke analyseres.')
  }

  await assertPublicHttpUrl(url)
  return url
}

async function assertPublicHttpUrl(url: URL): Promise<void> {
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new AuditInputError('Kun http- og https-URL-er kan analyseres.')
  }

  const hostname = stripIpv6Brackets(url.hostname).toLowerCase()
  if (isBlockedHostname(hostname)) {
    throw new AuditInputError('Lokale eller interne adresser kan ikke analyseres av sikkerhetsgrunner.')
  }

  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) {
      throw new AuditInputError('Private IP-adresser kan ikke analyseres av sikkerhetsgrunner.')
    }
    return
  }

  let validation = dnsValidationCache.get(hostname)
  if (!validation) {
    validation = dns.lookup(hostname, { all: true }).then((records) => {
      if (!records.length) {
        throw new AuditInputError('Domenet peker ikke til en offentlig IP-adresse.')
      }
      const privateRecord = records.find((record) => isPrivateIp(record.address))
      if (privateRecord) {
        throw new AuditInputError('Domenet peker til en lokal eller privat IP-adresse og kan ikke analyseres.')
      }
    }).catch((error) => {
      if (error instanceof AuditInputError) throw error
      throw new AuditInputError('Klarte ikke å slå opp domenet. Sjekk at URL-en er riktig.')
    })
    dnsValidationCache.set(hostname, validation)
  }
  await validation
}

async function fetchPublicText(url: URL, options: {
  accept: string
  maxBytes: number
  requireHtml: boolean
  timeoutMs: number
}): Promise<FetchResult> {
  let current = new URL(url)

  for (let redirect = 0; redirect <= 4; redirect += 1) {
    await assertPublicHttpUrl(current)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), options.timeoutMs)

    try {
      const response = await fetch(current, {
        redirect: 'manual',
        signal: controller.signal,
        headers: {
          'User-Agent': USER_AGENT,
          Accept: options.accept,
          'Accept-Language': 'nb-NO,nb;q=0.9,no;q=0.8,en;q=0.7',
        },
      })
      clearTimeout(timeout)

      if (isRedirect(response.status)) {
        const location = response.headers.get('location')
        if (!location) throw new AuditInputError('Nettstedet sendte en redirect uten Location-header.')
        current = new URL(location, current)
        continue
      }

      if (!response.ok) {
        throw new AuditInputError(`Nettstedet returnerte HTTP ${response.status}.`)
      }

      const contentType = response.headers.get('content-type') || ''
      if (options.requireHtml && contentType && !/text\/html|application\/xhtml\+xml/i.test(contentType)) {
        throw new AuditInputError(`URL-en returnerte ikke HTML (${contentType}).`)
      }

      const text = await readLimitedText(response, options.maxBytes)
      return {
        url: url.toString(),
        finalUrl: current.toString(),
        status: response.status,
        contentType,
        text,
      }
    } catch (error: any) {
      clearTimeout(timeout)
      if (error?.name === 'AbortError') {
        throw new AuditInputError('Forespørselen tok for lang tid. Prøv en annen URL eller test senere.')
      }
      throw error
    }
  }

  throw new AuditInputError('Nettstedet har for mange redirects.')
}

async function fetchOptionalText(url: URL, maxBytes: number): Promise<string> {
  try {
    const result = await fetchPublicText(url, {
      accept: 'text/plain,application/xml,text/xml,text/html;q=0.6,*/*;q=0.3',
      maxBytes,
      requireHtml: false,
      timeoutMs: RESOURCE_TIMEOUT_MS,
    })
    return result.text
  } catch {
    return ''
  }
}

async function readLimitedText(response: Response, maxBytes: number): Promise<string> {
  const contentLength = Number(response.headers.get('content-length') || 0)
  if (contentLength > maxBytes) {
    throw new AuditInputError(`Responsen er for stor til en trygg audit (${Math.round(contentLength / 1024)} KB).`)
  }

  if (!response.body) {
    const text = await response.text()
    if (new TextEncoder().encode(text).length > maxBytes) {
      throw new AuditInputError('Responsen er for stor til en trygg audit.')
    }
    return text
  }

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let received = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (value) {
      received += value.length
      if (received > maxBytes) {
        throw new AuditInputError('Responsen er for stor til en trygg audit.')
      }
      chunks.push(value)
    }
  }

  const buffer = new Uint8Array(received)
  let offset = 0
  for (const chunk of chunks) {
    buffer.set(chunk, offset)
    offset += chunk.length
  }

  return new TextDecoder('utf-8').decode(buffer)
}

async function discoverSitemapUrls(finalUrl: URL, robotsTxt: string): Promise<string[]> {
  const sitemapCandidates = new Set<string>()
  const origin = finalUrl.origin
  sitemapCandidates.add(new URL('/sitemap.xml', origin).toString())
  sitemapCandidates.add(new URL('/sitemap_index.xml', origin).toString())

  robotsTxt.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*sitemap:\s*(.+)$/i)
    if (match?.[1]) {
      try {
        sitemapCandidates.add(new URL(match[1].trim(), origin).toString())
      } catch {}
    }
  })

  const sitemapUrls: string[] = []
  const nestedSitemaps: string[] = []

  for (const sitemapUrl of Array.from(sitemapCandidates)) {
    const text = await fetchOptionalText(new URL(sitemapUrl), MAX_TEXT_BYTES)
    if (!text) continue
    const parsed = parseSitemapXml(text)
    sitemapUrls.push(...parsed.urls)
    nestedSitemaps.push(...parsed.sitemaps)
  }

  for (const sitemapUrl of nestedSitemaps.slice(0, 6)) {
    const text = await fetchOptionalText(new URL(sitemapUrl), MAX_TEXT_BYTES)
    if (!text) continue
    sitemapUrls.push(...parseSitemapXml(text).urls)
  }

  return uniqueUrls(sitemapUrls)
    .filter((url) => isSameOriginHtmlUrl(url, origin))
    .slice(0, 250)
}

function parseSitemapXml(xml: string): { urls: string[]; sitemaps: string[] } {
  const $ = cheerio.load(xml, { xmlMode: true })
  const urls = $('url > loc').map((_, element) => $(element).text().trim()).get()
  const sitemaps = $('sitemap > loc').map((_, element) => $(element).text().trim()).get()
  return { urls, sitemaps }
}

function selectCrawlUrls(
  finalUrl: URL,
  origin: string,
  robotsTxt: string,
  sitemapUrls: string[],
  homepageUrls: string[]
): string[] {
  const all = uniqueUrls([finalUrl.toString(), ...sitemapUrls, ...homepageUrls])
    .filter((url) => isSameOriginHtmlUrl(url, origin))
    .filter((url) => getRobotsDecision(robotsTxt, USER_AGENT, new URL(url).pathname).allowed)

  return all
    .map((url) => ({ url, priority: pagePriority(url, finalUrl.toString()) }))
    .sort((a, b) => b.priority - a.priority || a.url.length - b.url.length)
    .map((item) => item.url)
    .slice(0, MAX_PAGES)
}

function analyzePage(inputUrl: string, finalUrl: string, status: number, html: string, origin: string): PageAudit {
  const $ = cheerio.load(html)
  const title = cleanText($('title').first().text())
  const metaDescription = cleanText($('meta[name="description"]').attr('content') || '')
  const canonicalRaw = $('link[rel="canonical"]').attr('href') || ''
  const canonical = canonicalRaw ? safeAbsoluteUrl(canonicalRaw, finalUrl) || canonicalRaw : ''
  const lang = cleanText($('html').attr('lang') || '')
  const robotsMeta = cleanText($('meta[name="robots"], meta[name="googlebot"]').map((_, el) => $(el).attr('content')).get().join(', '))
  const hasNoindex = /noindex/i.test(robotsMeta)
  const h1s = collectTexts($, 'h1', 8)
  const h2s = collectTexts($, 'h2', 30)
  const h3s = collectTexts($, 'h3', 30)
  const schema = extractSchema($)
  const internalUrls = collectInternalUrls($, finalUrl, origin)
  const linkCounts = countLinks($, finalUrl, origin)
  const primaryCtaTexts = collectCtas($, 'header, [class*="hero"], [id*="hero"], main section:first-of-type', 12)
  const secondaryCtaTexts = collectCtas($, 'a, button, [role="button"]', 30)
  const ctaTexts = uniqueStrings([...primaryCtaTexts, ...secondaryCtaTexts]).slice(0, 30)
  const trustSignals = collectTrustSignals($)
  const faqQuestions = collectFaqQuestions($)
  const authorSignals = collectSignals($, '[class*="author"], [rel="author"], [class*="team"], [class*="founder"], [class*="bio"], [class*="about"]', 8, 260)
  const credentialSignals = collectSignals($, '[class*="certif"], [class*="credential"], [class*="award"], [class*="badge"]', 8, 180)
  const contactSignals = collectContactSignals(html)
  const socialLinks = collectSocialLinks($)
  const publishedDates = collectPublishedDates($)
  const imageCount = $('img').length
  const imagesMissingAlt = $('img').filter((_, el) => !cleanText($(el).attr('alt') || '')).length
  const ogPresent = Boolean($('meta[property="og:title"]').attr('content') && $('meta[property="og:description"]').attr('content'))
  const twitterPresent = Boolean($('meta[name="twitter:title"]').attr('content') || $('meta[name="twitter:card"]').attr('content'))
  const tableCount = $('table').length
  const listCount = $('ul, ol').length
  const blockquoteCount = $('blockquote').length
  const outboundCitationCount = $('main a[href^="http"], article a[href^="http"], section a[href^="http"]').filter((_, el) => {
    const absolute = safeAbsoluteUrl($(el).attr('href') || '', finalUrl)
    return absolute ? new URL(absolute).origin !== origin : false
  }).length

  $('script, style, noscript, iframe, svg, header, footer, nav, aside').remove()
  const bodyText = cleanText($('body').text())
  const wordCount = countWords(bodyText)
  const statisticCount = countStatistics(bodyText)

  return {
    url: inputUrl,
    finalUrl,
    status,
    title,
    metaDescription,
    canonical,
    lang,
    h1s,
    h2s,
    h3s,
    wordCount,
    bodySample: bodyText.slice(0, 6000),
    schemaTypes: schema.types,
    schemaErrors: schema.errors,
    jsonLdCount: schema.jsonLdCount,
    microdataTypes: schema.microdataTypes,
    hasNoindex,
    robotsMeta,
    ctaTexts,
    primaryCtaTexts,
    trustSignals,
    faqQuestions,
    authorSignals,
    credentialSignals,
    contactSignals,
    socialLinks,
    internalUrls,
    internalLinkCount: linkCounts.internal,
    externalLinkCount: linkCounts.external,
    imageCount,
    imagesMissingAlt,
    ogPresent,
    twitterPresent,
    tableCount,
    listCount,
    blockquoteCount,
    statisticCount,
    outboundCitationCount,
    publishedDates,
  }
}

function computeGeoScorecard(
  category: SiteCategory,
  pages: PageAudit[],
  robots: RobotsInfo,
  llms: LlmsInfo,
  sitemapUrls: string[],
  failures: CrawlFailure[]
): Record<string, GeoScore> {
  const allSchemaTypes = uniqueStrings(pages.flatMap((page) => page.schemaTypes))
  const schemaCoverage = ratio(pages.filter((page) => page.schemaTypes.length > 0).length, pages.length)
  const avgWordCount = average(pages.map((page) => page.wordCount))
  const totalFaqs = sum(pages.map((page) => page.faqQuestions.length))
  const totalTables = sum(pages.map((page) => page.tableCount))
  const totalLists = sum(pages.map((page) => page.listCount))
  const totalStats = sum(pages.map((page) => page.statisticCount))
  const totalCitations = sum(pages.map((page) => page.outboundCitationCount))
  const aiAllowedRatio = ratio(AI_BOTS.length - robots.blockedAiBots.length, AI_BOTS.length)
  const recommendedSchemaTypes = CATEGORY_CONFIGS[category].schemaTypes
  const matchedRecommendedSchema = recommendedSchemaTypes.filter((type) => allSchemaTypes.includes(type)).length
  const hasAboutOrTeam = hasUrlMatching(pages, /\/(about|om-oss|om|team|ansatte|people|founder)/i) || pages.some((page) => page.authorSignals.length > 0)
  const hasContact = hasUrlMatching(pages, /\/(contact|kontakt|booking|book)/i) || pages.some((page) => page.contactSignals.length > 0)
  const socialPlatforms = uniqueStrings(pages.flatMap((page) => page.socialLinks.map((link) => link.split(':')[0])))
  const trustSignals = sum(pages.map((page) => page.trustSignals.length))
  const credentialSignals = sum(pages.map((page) => page.credentialSignals.length))
  const noindexCount = pages.filter((page) => page.hasNoindex).length

  const aiCitabilityScore = clampScore(
    20 +
    (avgWordCount >= 700 ? 18 : avgWordCount >= 350 ? 11 : avgWordCount >= 150 ? 5 : 0) +
    Math.min(18, totalFaqs * 4) +
    Math.min(14, totalTables * 5 + totalLists * 1.5) +
    Math.min(18, totalStats * 2) +
    Math.min(14, totalCitations * 2) +
    (pages.some((page) => page.h2s.length >= 3) ? 8 : 0) +
    (pages.some((page) => page.blockquoteCount > 0) ? 4 : 0)
  )

  const brandAuthorityScore = clampScore(
    18 +
    (allSchemaTypes.some((type) => ['Organization', 'LocalBusiness', 'Person'].includes(type)) ? 20 : 0) +
    Math.min(18, trustSignals * 4) +
    Math.min(18, socialPlatforms.length * 5) +
    (hasAboutOrTeam ? 14 : 0) +
    (hasContact ? 8 : 0) +
    Math.min(8, credentialSignals * 3)
  )

  const eeatScore = clampScore(
    18 +
    (hasAboutOrTeam ? 16 : 0) +
    (hasContact ? 10 : 0) +
    Math.min(14, sum(pages.map((page) => page.authorSignals.length)) * 4) +
    Math.min(12, credentialSignals * 4) +
    Math.min(12, totalCitations * 2) +
    Math.min(10, sum(pages.map((page) => page.publishedDates.length)) * 3) +
    (avgWordCount >= 500 ? 10 : avgWordCount >= 250 ? 5 : 0)
  )

  const technicalScore = clampScore(
    22 +
    (robots.exists ? 8 : 4) +
    Math.round(aiAllowedRatio * 18) +
    (llms.exists ? 12 : 0) +
    (pages.every((page) => !page.hasNoindex) ? 10 : Math.max(0, 10 - noindexCount * 5)) +
    (pages[0]?.lang ? 5 : 0) +
    (ratio(pages.filter((page) => page.canonical).length, pages.length) >= 0.6 ? 7 : 0) +
    (failures.length === 0 ? 8 : Math.max(0, 8 - failures.length * 2)) +
    (sitemapUrls.length > 0 ? 10 : 0)
  )

  const schemaScore = clampScore(
    12 +
    Math.round(schemaCoverage * 34) +
    Math.min(26, matchedRecommendedSchema * 7) +
    (pages.every((page) => page.schemaErrors.length === 0) ? 14 : Math.max(0, 14 - sum(pages.map((page) => page.schemaErrors.length)) * 3)) +
    (allSchemaTypes.includes('BreadcrumbList') ? 7 : 0) +
    (allSchemaTypes.includes('FAQPage') ? 7 : 0)
  )

  const platformScore = clampScore(
    14 +
    Math.min(35, socialPlatforms.length * 7) +
    (pages.some((page) => page.ogPresent) ? 14 : 0) +
    (pages.some((page) => page.twitterPresent) ? 8 : 0) +
    (socialPlatforms.includes('linkedin.com') ? 10 : 0) +
    (socialPlatforms.includes('youtube.com') ? 8 : 0) +
    (socialPlatforms.includes('wikipedia.org') ? 8 : 0)
  )

  return {
    aiCitability: makeGeoScore('AI-siterbarhet', aiCitabilityScore, 0.25, [
      `${Math.round(avgWordCount)} ord i snitt per analysert side`,
      `${totalFaqs} spørsmål/FAQ-signaler`,
      `${totalStats} konkrete tall/statistikk-signaler`,
      `${totalCitations} eksterne kilde-/referanselenker i hovedinnhold`,
    ]),
    brandAuthority: makeGeoScore('Merkevareautoritet', brandAuthorityScore, 0.2, [
      `${trustSignals} trust-signaler funnet`,
      `${socialPlatforms.length} sosiale/plattform-profiler lenket fra nettstedet`,
      hasAboutOrTeam ? 'Om/team-signal funnet' : 'Om/team-signal ikke verifisert',
      hasContact ? 'Kontaktinformasjon funnet' : 'Kontaktinformasjon ikke verifisert',
    ]),
    contentEEAT: makeGeoScore('Innhold og E-E-A-T', eeatScore, 0.2, [
      `${sum(pages.map((page) => page.authorSignals.length))} forfatter/team-signaler`,
      `${credentialSignals} credential-/award-signaler`,
      `${totalCitations} eksterne referanselenker`,
      `${sum(pages.map((page) => page.publishedDates.length))} publiseringsdatoer funnet`,
    ]),
    technicalGEO: makeGeoScore('Teknisk GEO', technicalScore, 0.15, [
      robots.exists ? 'robots.txt funnet' : 'robots.txt ikke funnet',
      `${robots.blockedAiBots.length} av ${AI_BOTS.length} AI-crawlere blokkert på startsiden`,
      llms.exists ? `llms.txt funnet (${llms.length} tegn)` : 'llms.txt ikke funnet',
      `${failures.length} crawl-feil eller hoppede URL-er`,
    ]),
    schemaStructuredData: makeGeoScore('Schema og strukturerte data', schemaScore, 0.1, [
      `${Math.round(schemaCoverage * 100)}% av analyserte sider har schema`,
      allSchemaTypes.length ? `Typer funnet: ${allSchemaTypes.slice(0, 8).join(', ')}` : 'Ingen schema-typer funnet',
      `${matchedRecommendedSchema} relevante schema-typer for kategorien`,
    ]),
    platformOptimization: makeGeoScore('Plattformoptimalisering', platformScore, 0.1, [
      socialPlatforms.length ? `Profiler funnet: ${socialPlatforms.join(', ')}` : 'Ingen eksterne plattformprofiler funnet',
      pages.some((page) => page.ogPresent) ? 'Open Graph-signaler funnet' : 'Open Graph-signaler mangler',
      pages.some((page) => page.twitterPresent) ? 'Twitter/X card-signal funnet' : 'Twitter/X card-signal mangler',
    ]),
  }
}

function computeBusinessScorecard(
  pages: PageAudit[],
  sitemapUrls: string[],
  failures: CrawlFailure[]
): AuditResult['scorecard'] {
  const homepage = pages[0]
  const hasClearH1 = Boolean(homepage?.h1s[0] && homepage.h1s[0].length >= 16 && homepage.h1s[0].length <= 95)
  const hasMeta = Boolean(homepage?.metaDescription && homepage.metaDescription.length >= 70 && homepage.metaDescription.length <= 170)
  const primaryCtaCount = homepage?.primaryCtaTexts.length || 0
  const ctaCount = uniqueStrings(pages.flatMap((page) => page.ctaTexts)).length
  const trustSignalCount = sum(pages.map((page) => page.trustSignals.length))
  const contactSignalCount = sum(pages.map((page) => page.contactSignals.length))
  const schemaCoverage = ratio(pages.filter((page) => page.schemaTypes.length > 0).length, pages.length)
  const avgWordCount = average(pages.map((page) => page.wordCount))
  const pagesWithOneH1 = ratio(pages.filter((page) => page.h1s.length === 1).length, pages.length)
  const titleCoverage = ratio(pages.filter((page) => page.title).length, pages.length)
  const metaCoverage = ratio(pages.filter((page) => page.metaDescription).length, pages.length)
  const noindexCount = pages.filter((page) => page.hasNoindex).length
  const navDepth = uniqueStrings(pages.flatMap((page) => page.internalUrls)).length

  return {
    valuePropPositioning: {
      score: clampScore(25 + (hasClearH1 ? 28 : 0) + (hasMeta ? 18 : 0) + (homepage?.wordCount >= 250 ? 14 : 0) + (homepage?.h2s.length >= 2 ? 10 : 0)),
      analysis: hasClearH1
        ? 'Startsiden har et målbart H1-signal som kan forklare tilbudet raskt.'
        : 'Startsiden mangler et tydelig H1-signal med nok kontekst til å forklare tilbudet raskt.',
    },
    conversionCTA: {
      score: clampScore(20 + (primaryCtaCount > 0 ? 30 : 0) + Math.min(20, ctaCount * 4) + (contactSignalCount > 0 ? 12 : 0) + (primaryCtaCount <= 3 ? 8 : 0)),
      analysis: primaryCtaCount > 0
        ? `Fant ${primaryCtaCount} CTA-kandidat(er) i topp/hero og ${ctaCount} CTA-er totalt.`
        : 'Fant ingen tydelig CTA-kandidat i topp/hero, som kan skape friksjon for klare besøkende.',
    },
    trustDecisionSupport: {
      score: clampScore(18 + Math.min(24, trustSignalCount * 5) + Math.min(15, contactSignalCount * 5) + Math.round(schemaCoverage * 18) + (pages.some((page) => page.socialLinks.length > 0) ? 12 : 0)),
      analysis: trustSignalCount > 0
        ? `Fant ${trustSignalCount} trust-signal(er), samt ${contactSignalCount} kontakt-signal(er).`
        : 'Fant få strukturerte trust-signaler som testimonials, caser, reviews, logoer eller credentials.',
    },
    seoSearchIntent: {
      score: clampScore(18 + Math.round(titleCoverage * 18) + Math.round(metaCoverage * 14) + Math.round(pagesWithOneH1 * 16) + (avgWordCount >= 350 ? 12 : 0) + (sitemapUrls.length > 0 ? 10 : 0) - noindexCount * 12),
      analysis: `Analyserte ${pages.length} side(r). Tittel-dekning: ${Math.round(titleCoverage * 100)}%, meta description-dekning: ${Math.round(metaCoverage * 100)}%.`,
    },
    informationArchitectureClarity: {
      score: clampScore(20 + (sitemapUrls.length > 0 ? 22 : 0) + Math.min(24, navDepth * 1.2) + (pages.length >= 5 ? 12 : pages.length >= 3 ? 8 : 0) + (failures.length === 0 ? 10 : 0)),
      analysis: sitemapUrls.length > 0
        ? `Fant sitemap og analyserte ${pages.length} prioriterte sider.`
        : `Ingen sitemap ble verifisert; analysen er basert på ${pages.length} side(r) og interne lenker fra startsiden.`,
    },
  }
}

function buildFindings(
  category: SiteCategory,
  pages: PageAudit[],
  robots: RobotsInfo,
  llms: LlmsInfo,
  sitemapUrls: string[],
  failures: CrawlFailure[]
): Finding[] {
  const homepage = pages[0]
  const findings: Finding[] = []
  const allSchemaTypes = uniqueStrings(pages.flatMap((page) => page.schemaTypes))
  const recommendedSchemaTypes = CATEGORY_CONFIGS[category].schemaTypes
  const blockedImportantBots = robots.blockedAiBots.filter((bot) => ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Googlebot-Extended'].includes(bot))

  if (blockedImportantBots.length > 0) {
    findings.push({
      category: 'Teknisk GEO',
      title: 'Viktige AI-crawlere er blokkert',
      severity: blockedImportantBots.length >= 3 ? 'critical' : 'high',
      url: homepage?.finalUrl,
      evidence: `${blockedImportantBots.join(', ')} er blokkert ifølge robots.txt for startsiden.`,
      recommendation: 'Gjennomgå robots.txt og tillat relevante AI-crawlere der innholdet skal kunne forstås og siteres.',
      confidence: 'confirmed',
    })
  }

  if (!llms.exists) {
    findings.push({
      category: 'Teknisk GEO',
      title: 'llms.txt mangler',
      severity: 'medium',
      url: homepage?.finalUrl,
      evidence: 'Fant ingen /llms.txt på domenet.',
      recommendation: 'Legg til en kort llms.txt med viktigste sider, tjenestebeskrivelser, kontaktpunkter og canonical innhold for AI-systemer.',
      confidence: 'confirmed',
    })
  }

  if (sitemapUrls.length === 0) {
    findings.push({
      category: 'Informasjonsarkitektur',
      title: 'Sitemap ble ikke verifisert',
      severity: 'medium',
      url: homepage?.finalUrl,
      evidence: 'Fant ingen lesbar sitemap via robots.txt, /sitemap.xml eller /sitemap_index.xml.',
      recommendation: 'Publiser en oppdatert XML-sitemap og referer til den fra robots.txt.',
      confidence: 'confirmed',
    })
  }

  if (!homepage?.h1s.length) {
    findings.push({
      category: 'SEO og posisjonering',
      title: 'Startsiden mangler H1',
      severity: 'high',
      url: homepage?.finalUrl,
      evidence: 'Ingen H1 ble funnet på startsiden.',
      recommendation: 'Legg inn én tydelig H1 som forklarer hvem tilbudet er for og hvilket resultat det gir.',
      confidence: 'confirmed',
    })
  } else if (homepage.h1s.length > 1) {
    findings.push({
      category: 'SEO og posisjonering',
      title: 'Startsiden har flere H1-er',
      severity: 'medium',
      url: homepage.finalUrl,
      evidence: `Fant ${homepage.h1s.length} H1-elementer på startsiden.`,
      recommendation: 'Bruk én primær H1 og flytt sekundære budskap til H2/H3.',
      confidence: 'confirmed',
    })
  }

  if (!homepage?.metaDescription) {
    findings.push({
      category: 'SEO',
      title: 'Meta description mangler på startsiden',
      severity: 'medium',
      url: homepage?.finalUrl,
      evidence: 'Ingen meta description ble funnet.',
      recommendation: 'Skriv en konkret meta description på 120-160 tegn som matcher søkeintensjon og hovedtilbud.',
      confidence: 'confirmed',
    })
  }

  if (!homepage?.primaryCtaTexts.length) {
    findings.push({
      category: 'Konvertering',
      title: 'Ingen tydelig CTA i topp/hero',
      severity: 'high',
      url: homepage?.finalUrl,
      evidence: 'Fant ingen knapp eller lenke med CTA-tekst i header/hero/øverste seksjon.',
      recommendation: 'Legg inn én primær CTA over folden, med verdibasert tekst og tydelig neste steg.',
      confidence: 'confirmed',
    })
  }

  if (allSchemaTypes.length === 0) {
    findings.push({
      category: 'Schema',
      title: 'Ingen strukturerte data funnet',
      severity: 'high',
      url: homepage?.finalUrl,
      evidence: 'Fant verken JSON-LD eller microdata schema på analyserte sider.',
      recommendation: `Legg inn relevante schema-typer for ${CATEGORY_CONFIGS[category].label}: ${recommendedSchemaTypes.slice(0, 3).join(', ')}.`,
      confidence: 'confirmed',
    })
  } else {
    const missingRecommended = recommendedSchemaTypes.filter((type) => !allSchemaTypes.includes(type))
    if (missingRecommended.length >= 2) {
      findings.push({
        category: 'Schema',
        title: 'Mangler relevante schema-typer for sidetypen',
        severity: 'medium',
        url: homepage?.finalUrl,
        evidence: `Fant ${allSchemaTypes.join(', ')}, men mangler blant annet ${missingRecommended.slice(0, 3).join(', ')}.`,
        recommendation: 'Utvid JSON-LD slik at AI og søkemotorer forstår entitet, tilbud, produkter/tjenester og FAQ bedre.',
        confidence: 'confirmed',
      })
    }
  }

  pages.forEach((page) => {
    if (page.schemaErrors.length > 0) {
      findings.push({
        category: 'Schema',
        title: 'Ugyldig JSON-LD funnet',
        severity: 'medium',
        url: page.finalUrl,
        evidence: `${page.schemaErrors.length} JSON-LD-blokk(er) kunne ikke parses.`,
        recommendation: 'Valider JSON-LD i Schema Markup Validator og fiks syntaksfeil.',
        confidence: 'confirmed',
      })
    }

    if (page.hasNoindex) {
      findings.push({
        category: 'Teknisk SEO',
        title: 'Side er merket noindex',
        severity: 'critical',
        url: page.finalUrl,
        evidence: `Robots meta: ${page.robotsMeta}`,
        recommendation: 'Fjern noindex dersom siden skal kunne rangeres og brukes som AI-kilde.',
        confidence: 'confirmed',
      })
    }

    if (page.wordCount > 0 && page.wordCount < 180) {
      findings.push({
        category: 'Innhold',
        title: 'Tynt innhold på analysert side',
        severity: 'medium',
        url: page.finalUrl,
        evidence: `Siden har bare ${page.wordCount} ord i synlig hovedinnhold.`,
        recommendation: 'Legg til konkret, skannbart innhold som besvarer kjøpsspørsmål, bruksområder, prosess og proof.',
        confidence: 'confirmed',
      })
    }
  })

  const imageCount = sum(pages.map((page) => page.imageCount))
  const missingAlt = sum(pages.map((page) => page.imagesMissingAlt))
  if (imageCount > 0 && ratio(missingAlt, imageCount) > 0.35) {
    findings.push({
      category: 'Tilgjengelighet og kontekst',
      title: 'Mange bilder mangler alt-tekst',
      severity: 'low',
      url: homepage?.finalUrl,
      evidence: `${missingAlt} av ${imageCount} bilder mangler alt-tekst.`,
      recommendation: 'Gi informative bilder konkret alt-tekst som beskriver innhold og relevans.',
      confidence: 'confirmed',
    })
  }

  if (!pages.some((page) => page.faqQuestions.length > 0)) {
    findings.push({
      category: 'AI-siterbarhet',
      title: 'Lite spørsmål/svar-basert innhold',
      severity: 'medium',
      url: homepage?.finalUrl,
      evidence: 'Fant ingen tydelige FAQ-spørsmål eller overskrifter formulert som spørsmål.',
      recommendation: 'Legg inn korte Q&A-blokker som svarer på vanlige kjøpsspørsmål, innvendinger og sammenligninger.',
      confidence: 'confirmed',
    })
  }

  if (!pages.some((page) => page.trustSignals.length > 0)) {
    findings.push({
      category: 'Tillit',
      title: 'Trust-signaler er svake eller ikke strukturerte',
      severity: 'medium',
      url: homepage?.finalUrl,
      evidence: 'Fant ingen tydelige testimonial-, review-, logo-, partner- eller award-signaler i HTML.',
      recommendation: 'Synliggjør caser, kundeutsagn, resultater, logoer eller sertifiseringer nær beslutningspunkter.',
      confidence: 'likely',
    })
  }

  failures.slice(0, 5).forEach((failure) => {
    findings.push({
      category: 'Crawlbarhet',
      title: 'Side kunne ikke analyseres',
      severity: 'low',
      url: failure.url,
      evidence: failure.reason,
      recommendation: 'Sjekk at siden returnerer HTML, ikke blokkerer legitime forespørsler, og er lenket korrekt.',
      confidence: 'confirmed',
    })
  })

  return findings.sort((a, b) => severityRank(b.severity) - severityRank(a.severity))
}

function buildFallbackSummary(overallScore: number, findings: Finding[], pages: PageAudit[]): AuditResult['executiveSummary'] {
  const topFinding = findings[0]
  const fastestWin = findings.find((finding) => finding.severity !== 'critical') || topFinding
  const pageText = pages.length === 1 ? 'én side' : `${pages.length} sider`

  return {
    diagnosis: `Auditen analyserte ${pageText} og ga en målt GEO-score på ${overallScore}/100. De viktigste funnene er basert på crawlbare HTML-signaler, robots.txt, llms.txt, schema, innholdsstruktur og konverteringssignaler.`,
    biggestLeak: topFinding ? topFinding.title : 'Ingen kritiske lekkasjer ble funnet i de målbare signalene.',
    fastestWin: fastestWin ? fastestWin.recommendation : 'Fortsett å styrke schema, FAQ-innhold og tydelige CTA-er.',
  }
}

function buildDetailedGeoInsight(geoScorecard: Record<string, GeoScore>, findings: Finding[]): string {
  const weakest = Object.values(geoScorecard).sort((a, b) => a.score - b.score)[0]
  const confirmedCount = findings.filter((finding) => finding.confidence === 'confirmed').length
  return `Svakeste målte GEO-område er ${weakest.label.toLowerCase()} med ${weakest.score}/100. Rapporten bygger på ${confirmedCount} bekreftede tekniske og innholdsmessige funn, ikke på antatte ranking- eller trafikkdata.`
}

function buildLegacyMethodScores(geoScorecard: Record<string, GeoScore>, pages: PageAudit[]): Record<string, { score: number; status: string }> {
  const totalCitations = sum(pages.map((page) => page.outboundCitationCount))
  const totalStats = sum(pages.map((page) => page.statisticCount))
  const totalQuotes = sum(pages.map((page) => page.blockquoteCount))
  const avgWords = average(pages.map((page) => page.wordCount))

  return {
    citations: {
      score: clampScore(25 + Math.min(60, totalCitations * 8)),
      status: `${totalCitations} eksterne referanselenker ble funnet i analysert hovedinnhold.`,
    },
    statistics: {
      score: clampScore(25 + Math.min(60, totalStats * 5)),
      status: `${totalStats} konkrete tall/statistikk-signaler ble funnet.`,
    },
    quotations: {
      score: clampScore(25 + Math.min(60, totalQuotes * 12)),
      status: `${totalQuotes} sitat/blokkquote-signaler ble funnet.`,
    },
    authoritativeTone: {
      score: geoScorecard.contentEEAT.score,
      status: `E-E-A-T-score er ${geoScorecard.contentEEAT.score}/100 basert på on-site signaler.`,
    },
    fluency: {
      score: clampScore(avgWords >= 350 ? 74 : avgWords >= 180 ? 58 : 38),
      status: `Analysert innhold har ${Math.round(avgWords)} ord i snitt per side.`,
    },
  }
}

function buildTop3Updates(findings: Finding[]): AuditResult['top3Updates'] {
  return findings.slice(0, 3).map((finding) => ({
    title: finding.title,
    impact: finding.severity === 'critical' || finding.severity === 'high' ? 'high' : finding.severity,
    whyItMatters: finding.evidence,
    recommendedFix: finding.recommendation,
  }))
}

function buildLeadQualification(
  overallScore: number,
  findings: Finding[],
  scorecard: AuditResult['scorecard'],
  geoScorecard: Record<string, GeoScore>,
  pages: PageAudit[],
  failures: CrawlFailure[]
): LeadQualification {
  const criticalCount = findings.filter((finding) => finding.severity === 'critical').length
  const highCount = findings.filter((finding) => finding.severity === 'high').length
  const mediumCount = findings.filter((finding) => finding.severity === 'medium').length
  const hasNoHeroCta = findings.some((finding) => finding.title.includes('CTA'))
  const hasSchemaGap = findings.some((finding) => finding.category === 'Schema')
  const hasTechnicalBlocker = findings.some((finding) => ['Teknisk GEO', 'Teknisk SEO', 'Crawlbarhet'].includes(finding.category))
  const pagesAnalyzed = pages.length

  let score = 20
  if (overallScore < 45) score += 32
  else if (overallScore < 60) score += 24
  else if (overallScore < 75) score += 14
  else score += 4

  score += criticalCount * 12
  score += highCount * 7
  score += mediumCount * 3
  if (hasNoHeroCta) score += 10
  if (hasSchemaGap) score += 8
  if (hasTechnicalBlocker) score += 8
  if (scorecard.conversionCTA.score < 60) score += 8
  if (scorecard.trustDecisionSupport.score < 60) score += 6
  if (geoScorecard.technicalGEO.score < 55) score += 6
  if (failures.length > 0) score += Math.min(8, failures.length * 2)
  if (pagesAnalyzed >= 3) score += 4

  const clampedScore = clampScore(score)
  const temperature: LeadTemperature = clampedScore >= 75 ? 'hot' : clampedScore >= 50 ? 'warm' : 'nurture'
  const reasons = [
    overallScore < 75 ? `Synlighetsscore er ${overallScore}/100` : `Synlighetsscore er relativt sterk (${overallScore}/100), men kan optimaliseres`,
    criticalCount > 0 ? `${criticalCount} kritiske funn` : '',
    highCount > 0 ? `${highCount} høy-prioriterte funn` : '',
    hasNoHeroCta ? 'Tydelig CTA-problem' : '',
    hasSchemaGap ? 'Schema/strukturert data-gap' : '',
    hasTechnicalBlocker ? 'Teknisk crawlbarhet eller indexering bør sjekkes' : '',
  ].filter(Boolean)

  return {
    score: clampedScore,
    temperature,
    reasons,
    recommendedPitch: temperature === 'hot'
      ? 'Tilby en uforpliktende vurdering med mål om å fikse de viktigste problemene raskt.'
      : temperature === 'warm'
        ? 'Pitch en prioritert handlingsplan og en avgrenset forbedringssprint.'
        : 'Nurture med rapport, quick wins og tilbud om uforpliktende vurdering.',
    urgency: temperature === 'hot'
      ? 'Bør følges opp samme dag.'
      : temperature === 'warm'
        ? 'Bør følges opp innen 2-3 dager.'
        : 'Legg i nurture og følg opp hvis de engasjerer seg.',
  }
}

function buildRecommendedService(
  overallScore: number,
  findings: Finding[],
  scorecard: AuditResult['scorecard'],
  geoScorecard: Record<string, GeoScore>,
  leadQualification: LeadQualification
): RecommendedService {
  const categoryCounts = countFindingCategories(findings)
  const technicalWeight = (categoryCounts['Teknisk GEO'] || 0) + (categoryCounts['Teknisk SEO'] || 0) + (categoryCounts.Crawlbarhet || 0)
  const schemaWeight = categoryCounts.Schema || 0
  const conversionWeak = scorecard.conversionCTA.score < 65 || scorecard.trustDecisionSupport.score < 60 || categoryCounts.Konvertering > 0 || categoryCounts.Tillit > 0
  const seoWeak = scorecard.seoSearchIntent.score < 65 || scorecard.informationArchitectureClarity.score < 62
  const geoWeak = geoScorecard.aiCitability.score < 65 || geoScorecard.schemaStructuredData.score < 65 || geoScorecard.technicalGEO.score < 60
  const severeCount = findings.filter((finding) => finding.severity === 'critical' || finding.severity === 'high').length
  const reasons = findings.slice(0, 3).map((finding) => finding.title)

  if (overallScore < 42 || severeCount >= 5) {
    return {
      id: 'full_website_rebuild',
      title: 'Full nettsideforbedring',
      summary: 'Nettsiden har flere fundamentale svakheter. Her vil enkeltfiks hjelpe, men den største gevinsten ligger trolig i å forbedre struktur, budskap, mobilopplevelse og teknisk fundament samlet.',
      estimatedScope: 'Strategi, ny struktur, copy, design, teknisk SEO/AEO og lanseringsklar implementering.',
      primaryCta: 'Få vurdering av ny nettside',
      nextStep: 'Få en uforpliktende vurdering, så prioriterer vi hva som bør bygges om først.',
      bookingHref: '/kontakt',
      reasons,
    }
  }

  if (technicalWeight >= 2 || geoScorecard.technicalGEO.score < 55) {
    return {
      id: 'technical_recovery',
      title: 'Teknisk SEO- og synlighetsfiks',
      summary: 'De største problemene ser tekniske ut: crawlbarhet, indexering, robots, sitemap, schema eller maskinlesbarhet. Dette er ofte lavthengende arbeid med tydelig effekt.',
      estimatedScope: 'Teknisk audit, prioriterte fixes, schema, llms.txt, sitemap/robots og kontroll etter publisering.',
      primaryCta: 'Fiks de tekniske problemene',
      nextStep: 'Send rapporten til deg selv og få en uforpliktende vurdering av hva som blokkerer synlighet.',
      bookingHref: '/kontakt',
      reasons,
    }
  }

  if (geoWeak || schemaWeight > 0 || seoWeak) {
    return {
      id: 'seo_aeo_foundation',
      title: 'SEO, AEO og AI-readiness sprint',
      summary: 'Siden trenger et sterkere fundament for Google, AI-svar og søkeintensjon: bedre struktur, schema, svarblokker, FAQ og mer siterbart innhold.',
      estimatedScope: 'On-page SEO, AEO/GEO-struktur, schema, llms.txt, FAQ, internlenking og prioriterte innholdsforbedringer.',
      primaryCta: 'Få en synlighetsplan',
      nextStep: 'Få en uforpliktende vurdering, så viser vi hvilke sider som bør fikses først.',
      bookingHref: '/kontakt',
      reasons,
    }
  }

  if (conversionWeak) {
    return {
      id: 'conversion_upgrade',
      title: 'Konverterings- og mobilforbedring',
      summary: 'Synligheten kan være brukbar, men siden bør gjøre det lettere for besøkende å forstå verdien, stole på deg og ta kontakt.',
      estimatedScope: 'Hero/CTA, budskap, trust-signaler, mobil UX, friksjonsreduksjon og bedre kontaktflyt.',
      primaryCta: 'Få flere henvendelser',
      nextStep: 'Få en uforpliktende vurdering av de viktigste konverteringslekkasjene.',
      bookingHref: '/kontakt',
      reasons,
    }
  }

  return {
    id: 'quick_fix_sprint',
    title: 'Quick Fix Sprint',
    summary: leadQualification.temperature === 'nurture'
      ? 'Nettsiden har et greit fundament, men flere små forbedringer kan gjøre den mer forståelig for søk, AI-systemer og besøkende.'
      : 'Det finnes tydelige forbedringer som kan tas raskt uten full redesign.',
    estimatedScope: 'Meta/H1, schema, CTA-er, FAQ, alt-tekst, trust-signaler og tekniske småfiks.',
    primaryCta: 'Få quick wins fikset',
    nextStep: 'Send rapporten og book en kort prioriteringssamtale.',
    bookingHref: '/kontakt',
    reasons,
  }
}

function countFindingCategories(findings: Finding[]): Record<string, number> {
  return findings.reduce<Record<string, number>>((counts, finding) => {
    counts[finding.category] = (counts[finding.category] || 0) + 1
    return counts
  }, {})
}

function buildMissingSignals(
  pages: PageAudit[],
  robots: RobotsInfo,
  llms: LlmsInfo,
  failures: CrawlFailure[]
): string[] {
  const missing = [
    'Faktiske AI-svar, AI-siteringer og share-of-voice er ikke verifisert. Dette krever separate søk/testspørringer mot AI- og søkeplattformer.',
    'Trafikk, ranking, konverteringsrate og inntektsdata er ikke analysert uten tilgang til Search Console, analytics eller CRM.',
    'Core Web Vitals er ikke målt med feltdata i denne sanntidsauditen.',
  ]

  if (!robots.exists) missing.push('robots.txt ble ikke funnet, så detaljerte crawl-direktiver kunne ikke bekreftes.')
  if (!llms.exists) missing.push('llms.txt ble ikke funnet.')
  if (pages.length < 3) missing.push('Få sider ble analysert; rapporten har lavere sikkerhet enn en full crawl.')
  if (failures.length > 0) missing.push(`${failures.length} URL-er kunne ikke analyseres eller ble hoppet over.`)

  return missing
}

function analyzeRobots(robotsTxt: string): RobotsInfo {
  if (!robotsTxt) {
    return {
      exists: false,
      summary: 'robots.txt ikke funnet',
      botAccess: Object.fromEntries(AI_BOTS.map((bot) => [bot, 'Ukjent (robots.txt ikke funnet)'])),
      blockedAiBots: [],
      rawPreview: '',
    }
  }

  const botAccess = Object.fromEntries(AI_BOTS.map((bot) => {
    const decision = getRobotsDecision(robotsTxt, bot, '/')
    return [bot, decision.allowed ? 'Tillatt' : 'Blokkert']
  }))
  const blockedAiBots = Object.entries(botAccess)
    .filter(([, status]) => status === 'Blokkert')
    .map(([bot]) => bot)

  return {
    exists: true,
    summary: AI_BOTS.map((bot) => `${bot}: ${botAccess[bot]}`).join('\n'),
    botAccess,
    blockedAiBots,
    rawPreview: robotsTxt.slice(0, 1200),
  }
}

function analyzeLlmsTxt(llmsTxt: string): LlmsInfo {
  const linkCount = (llmsTxt.match(/https?:\/\/[^\s)]+/g) || []).length
  return {
    exists: Boolean(llmsTxt),
    length: llmsTxt.length,
    linkCount,
    hasStructuredSections: /^#\s+/m.test(llmsTxt) || /^##\s+/m.test(llmsTxt),
    preview: llmsTxt.slice(0, 600),
  }
}

function getRobotsDecision(robotsTxt: string, userAgent: string, path: string): { allowed: boolean; rule?: string } {
  if (!robotsTxt) return { allowed: true }
  const groups = parseRobotsTxt(robotsTxt)
  const agent = userAgent.toLowerCase()
  const matching = groups
    .map((group) => ({
      group,
      matchLength: Math.max(...group.agents.map((candidate) => agentMatches(candidate, agent) ? candidate.length : -1)),
    }))
    .filter((item) => item.matchLength >= 0)
    .sort((a, b) => b.matchLength - a.matchLength)

  if (matching.length === 0) return { allowed: true }
  const bestLength = matching[0].matchLength
  const bestGroups = matching.filter((item) => item.matchLength === bestLength).flatMap((item) => item.group.rules)
  const matchedRules = bestGroups
    .filter((rule) => rule.path && pathMatchesRobotsRule(path, rule.path))
    .sort((a, b) => b.path.length - a.path.length || (a.type === 'allow' ? -1 : 1))

  if (!matchedRules.length) return { allowed: true }
  const winner = matchedRules[0]
  return { allowed: winner.type === 'allow', rule: `${winner.type}: ${winner.path}` }
}

function parseRobotsTxt(robotsTxt: string): RobotGroup[] {
  const groups: RobotGroup[] = []
  let current: RobotGroup = { agents: [], rules: [] }

  robotsTxt.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.replace(/#.*$/, '').trim()
    if (!line) return
    const [rawKey, ...valueParts] = line.split(':')
    const key = rawKey?.trim().toLowerCase()
    const value = valueParts.join(':').trim()
    if (!key) return

    if (key === 'user-agent') {
      if (current.agents.length > 0 && current.rules.length > 0) {
        groups.push(current)
        current = { agents: [], rules: [] }
      }
      current.agents.push(value.toLowerCase())
      return
    }

    if ((key === 'allow' || key === 'disallow') && current.agents.length > 0) {
      current.rules.push({ type: key, path: value })
    }
  })

  if (current.agents.length > 0) groups.push(current)
  return groups
}

function agentMatches(candidate: string, userAgent: string): boolean {
  if (candidate === '*') return true
  return userAgent.includes(candidate)
}

function pathMatchesRobotsRule(path: string, rulePath: string): boolean {
  if (!rulePath) return false
  const escaped = rulePath
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/\\\$$/, '$')
  const regex = new RegExp(`^${escaped}`)
  return regex.test(path)
}

function detectSiteCategory(pages: PageAudit[]): SiteCategory {
  const signals = pages.slice(0, 5).map((page) => [
    page.title,
    page.metaDescription,
    page.h1s.join(' '),
    page.h2s.join(' '),
    page.ctaTexts.join(' '),
    page.bodySample.slice(0, 2500),
  ].join(' ')).join(' ').toLowerCase()

  const score: Record<SiteCategory, number> = {
    saas: 0,
    ecommerce: 0,
    local_business: 0,
    portfolio: 0,
    blog_media: 0,
    agency_service: 0,
    nonprofit: 0,
    info_product: 0,
    general: 0,
  }

  if (/handlekurv|legg i kurv|add to cart|checkout|nettbutikk|shop|buy now|\bkr\s*\d|\bnok\b|fri frakt|prisgaranti/.test(signals)) score.ecommerce += 4
  if (/produkt|kategori|filter|sorter|lager|på lager|utsolgt|antall|størrelse|farge/.test(signals)) score.ecommerce += 2
  if (/åpningstider|opening hours|bestill bord|book a table|ring oss|call us|finn oss|find us|kart|google maps|veibeskrivelse|get directions/.test(signals)) score.local_business += 4
  if (/adresse|telefon|tlf|restaurant|kafé|frisør|tannlege|lege|rørlegger|elektriker|treningssenter|gym|verksted|butikk|salong|klinikk/.test(signals)) score.local_business += 3
  if (/free trial|gratis prøve|prøv gratis|start free|sign up free|dashboard|integrasjon|integration|abonnement|subscription|automatisering|workflow/.test(signals)) score.saas += 4
  if (/\bsaas\b|funksjon|feature|pricing|enterprise|onboarding|automation|innlogging|login|registrer/.test(signals)) score.saas += 2
  if (/portefølje|portfolio|mine prosjekter|mitt arbeid|case study|case studies|hired|leid inn|prosjekter/.test(signals)) score.portfolio += 4
  if (/designer|fotograf|illustratør|arkitekt|freelance|frilanser|se mitt arbeid/.test(signals)) score.portfolio += 2
  if (/les mer|publisert|minutter å lese|min read|nyhetsbrev|newsletter|abonner|subscribe|redaksjon/.test(signals)) score.blog_media += 4
  if (/artikkel|blogg|nyheter|innlegg|post|kategori|tags|forfatter|author|opinion|debatt/.test(signals)) score.blog_media += 2
  if (/\bbyrå\b|webbyrå|nettbyrå|digitalbyrå|markedsføringsbyrå|\bagency\b|studio/.test(signals)) score.agency_service += 5
  if (/vi hjelper|vi leverer|tjenester|våre tjenester|case studies|resultater|vår kompetanse/.test(signals)) score.agency_service += 3
  if (/kunder|klient|partner|prosjekt|løsning|strategi|rådgivning|konsulent|rådgiver/.test(signals)) score.agency_service += 2
  if (/donasjon|donate|frivillig|volunteer|støtt oss|non-profit|veldedighet|bidra|gi en gave/.test(signals)) score.nonprofit += 5
  if (/formål|oppdrag|mission|organisasjon|members|støttespiller|forening|forbund/.test(signals)) score.nonprofit += 2
  if (/kurs|course|enroll|påmelding|coaching|ebook|webinar|masterclass|modul|pensum|curriculum/.test(signals)) score.info_product += 4
  if (/deltaker|student|lær|learn|leksjon|lesson|sertifikat|certificate|utdanning/.test(signals)) score.info_product += 2

  const best = (Object.entries(score) as [SiteCategory, number][])
    .filter(([key]) => key !== 'general')
    .sort(([, a], [, b]) => b - a)[0]

  return best && best[1] >= 4 ? best[0] : 'general'
}

function extractSchema($: cheerio.CheerioAPI): {
  types: string[]
  errors: string[]
  jsonLdCount: number
  microdataTypes: string[]
} {
  const types: string[] = []
  const errors: string[] = []
  let jsonLdCount = 0

  $('script[type="application/ld+json"]').each((_, element) => {
    const raw = $(element).contents().text() || $(element).html() || ''
    if (!raw.trim()) return
    jsonLdCount += 1
    try {
      const parsed = JSON.parse(raw)
      collectSchemaTypes(parsed, types)
    } catch {
      errors.push('JSON-LD parse error')
    }
  })

  const microdataTypes = $('*[itemtype]').map((_, element) => {
    const itemType = $(element).attr('itemtype') || ''
    return itemType.split('/').pop() || itemType
  }).get().filter(Boolean)

  return {
    types: uniqueStrings([...types, ...microdataTypes]),
    errors,
    jsonLdCount,
    microdataTypes: uniqueStrings(microdataTypes),
  }
}

function collectSchemaTypes(value: unknown, types: string[]): void {
  if (Array.isArray(value)) {
    value.forEach((item) => collectSchemaTypes(item, types))
    return
  }

  if (!value || typeof value !== 'object') return
  const record = value as Record<string, unknown>
  const rawType = record['@type']
  if (Array.isArray(rawType)) {
    rawType.forEach((type) => {
      if (typeof type === 'string') types.push(type)
    })
  } else if (typeof rawType === 'string') {
    types.push(rawType)
  }

  Object.values(record).forEach((item) => collectSchemaTypes(item, types))
}

function collectInternalUrls($: cheerio.CheerioAPI, baseUrl: string, origin: string): string[] {
  const urls: string[] = []
  $('a[href]').each((_, element) => {
    const href = $(element).attr('href') || ''
    const absolute = normalizeCrawlUrl(href, baseUrl, origin)
    if (absolute) urls.push(absolute)
  })
  return uniqueUrls(urls).slice(0, 250)
}

function countLinks($: cheerio.CheerioAPI, baseUrl: string, origin: string): { internal: number; external: number } {
  let internal = 0
  let external = 0
  $('a[href]').each((_, element) => {
    const absolute = safeAbsoluteUrl($(element).attr('href') || '', baseUrl)
    if (!absolute || !/^https?:\/\//i.test(absolute)) return
    if (new URL(absolute).origin === origin) internal += 1
    else external += 1
  })
  return { internal, external }
}

function collectCtas($: cheerio.CheerioAPI, selector: string, limit: number): string[] {
  const actionPattern = /kontakt|contact|book|demo|start|kjøp|buy|bestill|prøv|try|registrer|sign up|send|last ned|download|få|get|learn|les mer|read more/i
  return uniqueStrings($(selector).find('a, button, [role="button"]').add(selector).map((_, element) => {
    const text = cleanText($(element).text())
    if (!text || text.length < 2 || text.length > 80) return ''
    if (!actionPattern.test(text) && !/btn|button|cta/i.test($(element).attr('class') || '')) return ''
    return text
  }).get().filter(Boolean)).slice(0, limit)
}

function collectTrustSignals($: cheerio.CheerioAPI): string[] {
  return collectSignals(
    $,
    '[class*="testimonial"], [class*="review"], [class*="rating"], [class*="logo"], [class*="partner"], [class*="trust"], [class*="award"], [class*="client"], [class*="case"]',
    12,
    280
  )
}

function collectSignals($: cheerio.CheerioAPI, selector: string, limit: number, maxLength: number): string[] {
  return uniqueStrings($(selector).map((_, element) => {
    const text = cleanText($(element).text())
    return text.length >= 4 && text.length <= maxLength ? text : ''
  }).get().filter(Boolean)).slice(0, limit)
}

function collectFaqQuestions($: cheerio.CheerioAPI): string[] {
  const questions: string[] = []
  $('h2, h3, h4, dt, summary, button, [class*="accordion"], [class*="faq"]').each((_, element) => {
    const text = cleanText($(element).text())
    if (text.endsWith('?') && text.length >= 10 && text.length <= 180) questions.push(text)
  })
  return uniqueStrings(questions).slice(0, 30)
}

function collectContactSignals(html: string): string[] {
  const signals: string[] = []
  const phoneMatches = html.match(/(\+47[\s-]?)?[2-9]\d[\s-]?\d{2}[\s-]?\d{2}[\s-]?\d{2}/g) || []
  const emailMatches = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []
  if (phoneMatches.length > 0) signals.push(`Telefon: ${uniqueStrings(phoneMatches).slice(0, 3).join(', ')}`)
  if (emailMatches.length > 0) signals.push(`E-post: ${uniqueStrings(emailMatches).slice(0, 3).join(', ')}`)
  return signals
}

function collectSocialLinks($: cheerio.CheerioAPI): string[] {
  const links: string[] = []
  $('a[href]').each((_, element) => {
    const href = $(element).attr('href') || ''
    const match = href.match(/(?:https?:\/\/)?(?:www\.)?(linkedin\.com|twitter\.com|x\.com|facebook\.com|instagram\.com|reddit\.com|youtube\.com|vimeo\.com|github\.com|wikipedia\.org|tiktok\.com)/i)
    if (match?.[1]) links.push(`${match[1].toLowerCase()}: ${href}`)
  })
  return uniqueStrings(links).slice(0, 20)
}

function collectPublishedDates($: cheerio.CheerioAPI): string[] {
  const dates = [
    ...$('meta[property="article:published_time"], meta[name="date"], meta[name="pubdate"]').map((_, element) => $(element).attr('content') || '').get(),
    ...$('time[datetime]').map((_, element) => $(element).attr('datetime') || '').get(),
  ]
  return uniqueStrings(dates.filter(Boolean)).slice(0, 12)
}

function collectTexts($: cheerio.CheerioAPI, selector: string, limit: number): string[] {
  return uniqueStrings($(selector).map((_, element) => cleanText($(element).text())).get().filter(Boolean)).slice(0, limit)
}

function normalizeCrawlUrl(rawHref: string, baseUrl: string, origin: string): string | null {
  const absolute = safeAbsoluteUrl(rawHref, baseUrl)
  if (!absolute) return null
  if (!isSameOriginHtmlUrl(absolute, origin)) return null
  const url = new URL(absolute)
  url.hash = ''
  ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'mc_cid', 'mc_eid'].forEach((param) => {
    url.searchParams.delete(param)
  })
  return canonicalUrlKey(url.toString())
}

function safeAbsoluteUrl(rawUrl: string, baseUrl: string): string | null {
  try {
    if (/^(mailto|tel|javascript|data):/i.test(rawUrl)) return null
    return new URL(rawUrl, baseUrl).toString()
  } catch {
    return null
  }
}

function isSameOriginHtmlUrl(rawUrl: string, origin: string): boolean {
  try {
    const url = new URL(rawUrl)
    if (!['http:', 'https:'].includes(url.protocol)) return false
    if (url.origin !== origin) return false
    if (/\.(pdf|jpg|jpeg|png|gif|webp|svg|avif|mp4|mp3|zip|rar|7z|doc|docx|xls|xlsx|ppt|pptx)$/i.test(url.pathname)) return false
    return true
  } catch {
    return false
  }
}

function pagePriority(rawUrl: string, homepageUrl: string): number {
  const url = new URL(rawUrl)
  const path = `${url.pathname}${url.search}`.toLowerCase()
  if (canonicalUrlKey(rawUrl) === canonicalUrlKey(homepageUrl)) return 1000
  let score = 100 - path.split('/').filter(Boolean).length * 8
  if (/pricing|pris|plans|demo|contact|kontakt|book|booking|checkout/.test(path)) score += 90
  if (/about|om-oss|team|founder|ansatte|company/.test(path)) score += 70
  if (/service|tjeneste|product|produkt|solution|løsning|case|work|portfolio/.test(path)) score += 65
  if (/faq|help|support|docs|resources|ressurs|guide|blog|article|nyhet/.test(path)) score += 45
  if (/privacy|terms|cookie|login|cart|handlekurv|tag|category|author/.test(path)) score -= 60
  return score
}

function makeGeoScore(label: string, score: number, weight: number, evidence: string[]): GeoScore {
  const rounded = clampScore(score)
  return {
    label,
    score: rounded,
    weight,
    weightedScore: Math.round(rounded * weight),
    evidence,
  }
}

function humanizeError(error: unknown): string {
  if (error instanceof AuditInputError) return error.message
  if (error instanceof Error) return error.message
  return 'Ukjent feil under henting.'
}

function isRedirect(status: number): boolean {
  return status >= 300 && status < 400
}

function isBlockedHostname(hostname: string): boolean {
  return (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.internal') ||
    hostname.endsWith('.test') ||
    hostname.endsWith('.invalid')
  )
}

function stripIpv6Brackets(hostname: string): string {
  return hostname.replace(/^\[/, '').replace(/\]$/, '')
}

function isPrivateIp(rawIp: string): boolean {
  const ip = stripIpv6Brackets(rawIp).toLowerCase()
  const maybeMappedIpv4 = ip.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/)?.[1]
  if (maybeMappedIpv4) return isPrivateIp(maybeMappedIpv4)

  if (net.isIP(ip) === 4) {
    const parts = ip.split('.').map(Number)
    const [a, b] = parts
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19)) ||
      a >= 224
    )
  }

  if (net.isIP(ip) === 6) {
    return (
      ip === '::' ||
      ip === '::1' ||
      ip.startsWith('fc') ||
      ip.startsWith('fd') ||
      ip.startsWith('fe80:') ||
      ip.startsWith('0:')
    )
  }

  return false
}

function canonicalUrlKey(rawUrl: string): string {
  const url = new URL(rawUrl)
  url.hash = ''
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1)
  }
  return url.toString()
}

function cleanText(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

function countWords(text: string): number {
  return text
    .split(/\s+/)
    .filter((word) => /[A-Za-z0-9À-ÖØ-öø-ÿ]/.test(word))
    .length
}

function countStatistics(text: string): number {
  return (text.match(/\b\d+(?:[.,]\d+)?\s?(?:%|prosent|kr|nok|usd|eur|x|ganger|million|mrd|timer|dager|uker|år|years|users|customers|kunder)\b/gi) || []).length
}

function uniqueUrls(urls: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []

  urls.forEach((url) => {
    try {
      const key = canonicalUrlKey(url)
      if (!seen.has(key)) {
        seen.add(key)
        result.push(key)
      }
    } catch {
      // Ignore malformed crawl candidates.
    }
  })

  return result
}

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => cleanText(value)).filter(Boolean)))
}

function ratio(value: number, total: number): number {
  return total > 0 ? value / total : 0
}

function average(values: number[]): number {
  return values.length ? sum(values) / values.length : 0
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0)
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)))
}

function severityRank(severity: Severity): number {
  const ranks: Record<Severity, number> = {
    low: 1,
    medium: 2,
    high: 3,
    critical: 4,
  }
  return ranks[severity]
}

function hasUrlMatching(pages: PageAudit[], pattern: RegExp): boolean {
  return pages.some((page) => pattern.test(new URL(page.finalUrl).pathname))
}
