import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const INTERNAL_COPY = 'henning@avyronis.com'

const IMPACT_LABELS: Record<string, string> = {
  high: 'Høy',
  medium: 'Middels',
  low: 'Lav',
}

const SEVERITY_LABELS: Record<string, string> = {
  critical: 'Kritisk',
  high: 'Høy',
  medium: 'Middels',
  low: 'Lav',
}

export async function POST(req: Request) {
  try {
    const { email, url, auditData, leadIntent } = await req.json()

    if (!email || !url || !auditData) {
      return NextResponse.json({ error: 'Mangler data' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Ugyldig e-postadresse' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'E-posttjenesten er ikke konfigurert.' }, { status: 500 })
    }

    const effectiveLeadIntent = normalizeLeadIntent(leadIntent, auditData)

    await resend.emails.send({
      from: 'Avyronis Audit <henning@avyronis.com>',
      to: email,
      subject: `Din nettside-audit: ${safeText(auditData.finalUrl || url)}`,
      html: buildAuditEmailHtml(email, url, auditData, effectiveLeadIntent),
    })

    await resend.emails.send({
      from: 'Avyronis Audit <henning@avyronis.com>',
      to: INTERNAL_COPY,
      subject: `Ny audit-lead [${safeText(auditData.leadQualification?.temperature ?? 'lead')}]: ${safeText(auditData.finalUrl || url)}`,
      html: buildInternalLeadHtml(email, url, auditData, effectiveLeadIntent),
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Send lead error:', error)
    return NextResponse.json({ error: 'Kunne ikke sende e-post' }, { status: 500 })
  }
}

function buildAuditEmailHtml(email: string, url: string, auditData: any, leadIntent?: string): string {
  const categoryLabel = safeText(auditData.siteCategoryLabel ?? 'Ukjent type')
  const finalUrl = safeText(auditData.finalUrl ?? url)
  const overallScore = safeText(String(auditData.overallScore ?? '–'))
  const summary = auditData.executiveSummary ?? {}
  const scope = auditData.auditScope ?? {}
  const recommendedService = auditData.recommendedService ?? null

  const scoreBreakdownHtml = (auditData.scoreBreakdown ?? [])
    .map((score: any) => `
      <tr>
        <td style="padding:10px 0; border-bottom:1px solid #eee;">${safeText(score.label ?? 'Ukjent')}</td>
        <td style="padding:10px 0; border-bottom:1px solid #eee; text-align:right;"><strong>${safeText(String(score.score ?? '–'))}/100</strong></td>
        <td style="padding:10px 0; border-bottom:1px solid #eee; text-align:right;">${Math.round(Number(score.weight ?? 0) * 100)}%</td>
      </tr>
    `).join('')

  const top3Html = (auditData.top3Updates ?? [])
    .map((update: any, index: number) => `
      <div style="margin-bottom:16px; padding:16px; background:#f8f8f8; border-left:4px solid #111; border-radius:6px;">
        <div style="font-size:12px; color:#666; margin-bottom:6px;">TILTAK ${index + 1} · Impact: ${safeText(IMPACT_LABELS[update.impact] ?? update.impact ?? '–')}</div>
        <strong style="display:block; margin-bottom:8px;">${safeText(update.title ?? 'Tiltak')}</strong>
        <p style="margin:0 0 8px; color:#444;"><em>Hvorfor:</em> ${safeText(update.whyItMatters ?? '–')}</p>
        <p style="margin:0; color:#222;"><strong>Anbefalt fix:</strong> ${safeText(update.recommendedFix ?? '–')}</p>
      </div>
    `).join('')

  const findingsHtml = (auditData.findings ?? [])
    .slice(0, 10)
    .map((finding: any) => `
      <div style="padding:14px 0; border-bottom:1px solid #eee;">
        <div style="font-size:12px; color:#777; margin-bottom:4px;">${safeText(finding.category ?? 'Funn')} · ${safeText(SEVERITY_LABELS[finding.severity] ?? finding.severity ?? '–')}</div>
        <strong>${safeText(finding.title ?? 'Funn')}</strong>
        <p style="margin:6px 0; color:#444;">${safeText(finding.evidence ?? '–')}</p>
        <p style="margin:0; color:#222;"><strong>Fix:</strong> ${safeText(finding.recommendation ?? '–')}</p>
      </div>
    `).join('')

  const missingSignalsHtml = (auditData.missingSignals ?? [])
    .map((signal: string) => `<li style="margin-bottom:8px; color:#555;">${safeText(signal)}</li>`)
    .join('')

  const crawlPagesHtml = (auditData.crawlPages ?? [])
    .slice(0, 12)
    .map((page: any) => `
      <tr>
        <td style="padding:8px 0; border-bottom:1px solid #eee;">
          <div><strong>${safeText(page.title ?? 'Tittel mangler')}</strong></div>
          <div style="font-size:12px; color:#777;">${safeText(page.url ?? '')}</div>
        </td>
        <td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">${safeText(String(page.wordCount ?? '–'))}</td>
        <td style="padding:8px 0; border-bottom:1px solid #eee; text-align:right;">${safeText((page.schemaTypes ?? []).slice(0, 3).join(', ') || 'Ingen')}</td>
      </tr>
    `).join('')

  return `
    <div style="font-family:Arial, sans-serif; max-width:720px; margin:0 auto; color:#1a1a1a; line-height:1.5;">
      <div style="border-bottom:2px solid #111; padding-bottom:16px; margin-bottom:24px;">
        <h1 style="margin:0 0 8px; font-size:28px;">GEO-audit</h1>
        <p style="margin:0; color:#555;">${finalUrl}</p>
      </div>

      <div style="background:#111; color:#fff; padding:22px; border-radius:10px; margin-bottom:24px;">
        <div style="font-size:13px; color:#bbb;">Overall GEO-score</div>
        <div style="font-size:44px; font-weight:800; line-height:1;">${overallScore}<span style="font-size:18px;">/100</span></div>
        <div style="margin-top:8px; color:#ddd;">${categoryLabel}</div>
      </div>

      <div style="background:#f5f5f5; padding:18px; border-radius:10px; margin-bottom:24px;">
        <h2 style="margin:0 0 10px; font-size:18px;">Audit-scope</h2>
        <p style="margin:0;">
          Sider analysert: <strong>${safeText(String(scope.pagesAnalyzed ?? '–'))}</strong> ·
          Sider hoppet over: <strong>${safeText(String(scope.pagesSkipped ?? '–'))}</strong> ·
          Sitemap URL-er funnet: <strong>${safeText(String(scope.sitemapUrlsFound ?? '–'))}</strong> ·
          robots.txt: <strong>${scope.robotsTxtFound ? 'Funnet' : 'Mangler'}</strong> ·
          llms.txt: <strong>${scope.llmsTxtFound ? 'Funnet' : 'Mangler'}</strong>
        </p>
      </div>

      <h2 style="font-size:20px;">Overordnet diagnose</h2>
      <p>${safeText(summary.diagnosis ?? '–')}</p>
      <p><strong>Største lekkasje:</strong> ${safeText(summary.biggestLeak ?? '–')}</p>
      <p><strong>Raskeste gevinst:</strong> ${safeText(summary.fastestWin ?? '–')}</p>

      ${recommendedService ? `
        <div style="background:#fff8e8; border:1px solid #f1c36d; padding:18px; border-radius:10px; margin:24px 0;">
          <div style="font-size:12px; color:#8a5b00; font-weight:700; text-transform:uppercase; letter-spacing:.08em;">Anbefalt neste steg</div>
          <h2 style="font-size:20px; margin:8px 0;">${safeText(recommendedService.title)}</h2>
          <p style="margin:0 0 10px;">${safeText(recommendedService.summary)}</p>
          <p style="margin:0 0 16px; color:#555;">${safeText(recommendedService.estimatedScope)}</p>
          <a href="https://avyronis.com${safeHrefPath(recommendedService.bookingHref)}" style="display:inline-block; background:#111; color:#fff; text-decoration:none; padding:12px 18px; border-radius:999px; font-weight:700;">
            Book gratis gjennomgang
          </a>
        </div>
      ` : ''}

      <h2 style="font-size:20px; margin-top:28px;">Scoregrunnlag</h2>
      <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
        <thead>
          <tr>
            <th style="text-align:left; padding-bottom:8px;">Område</th>
            <th style="text-align:right; padding-bottom:8px;">Score</th>
            <th style="text-align:right; padding-bottom:8px;">Vekt</th>
          </tr>
        </thead>
        <tbody>${scoreBreakdownHtml}</tbody>
      </table>

      <h2 style="font-size:20px;">Topp 3 prioriterte tiltak</h2>
      ${top3Html || '<p>Ingen prioriterte tiltak funnet.</p>'}

      <h2 style="font-size:20px; margin-top:28px;">Bekreftede funn</h2>
      ${findingsHtml || '<p>Ingen funn listet.</p>'}

      <h2 style="font-size:20px; margin-top:28px;">Analyserte sider</h2>
      <table style="width:100%; border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left; padding-bottom:8px;">Side</th>
            <th style="text-align:right; padding-bottom:8px;">Ord</th>
            <th style="text-align:right; padding-bottom:8px;">Schema</th>
          </tr>
        </thead>
        <tbody>${crawlPagesHtml}</tbody>
      </table>

      <h2 style="font-size:20px; margin-top:28px;">Ikke verifisert i denne auditen</h2>
      <ul style="padding-left:20px;">${missingSignalsHtml}</ul>

      <hr style="border:none; border-top:1px solid #ddd; margin:28px 0;" />
      <p style="font-size:12px; color:#777;">
        Rapporten ble bestilt av ${safeText(email)}${leadIntent ? ` med mål: ${safeText(leadIntent)}` : ''}. Den skiller mellom målbare on-site funn og signaler som krever ekstern verifisering.
      </p>
    </div>
  `
}

function buildInternalLeadHtml(email: string, url: string, auditData: any, leadIntent?: string): string {
  const finalUrl = safeText(auditData.finalUrl ?? url)
  const qualification = auditData.leadQualification ?? {}
  const service = auditData.recommendedService ?? {}
  const summary = auditData.executiveSummary ?? {}
  const scope = auditData.auditScope ?? {}
  const topFindings = (auditData.findings ?? [])
    .slice(0, 8)
    .map((finding: any) => `
      <li style="margin-bottom:10px;">
        <strong>${safeText(SEVERITY_LABELS[finding.severity] ?? finding.severity ?? '–')}: ${safeText(finding.title ?? 'Funn')}</strong>
        <br><span style="color:#555;">${safeText(finding.category ?? 'Ukjent')} · ${safeText(finding.evidence ?? '')}</span>
      </li>
    `).join('')

  const reasons = (qualification.reasons ?? [])
    .map((reason: string) => `<li>${safeText(reason)}</li>`)
    .join('')

  return `
    <div style="font-family:Arial, sans-serif; max-width:760px; margin:0 auto; color:#1a1a1a; line-height:1.5;">
      <h1 style="margin-bottom:8px;">Ny audit-lead</h1>
      <p style="margin-top:0; color:#555;">${finalUrl}</p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:22px 0;">
        <div style="background:#111; color:#fff; padding:18px; border-radius:10px;">
          <div style="font-size:12px; color:#bbb;">Lead score</div>
          <div style="font-size:36px; font-weight:800;">${safeText(String(qualification.score ?? '–'))}/100</div>
          <div>${safeText(qualification.temperature ?? 'ukjent')}</div>
        </div>
        <div style="background:#f5f5f5; padding:18px; border-radius:10px;">
          <div><strong>E-post:</strong> ${safeText(email)}</div>
          <div><strong>Intent:</strong> ${safeText(leadIntent ?? 'Ikke valgt')}</div>
          <div><strong>Audit score:</strong> ${safeText(String(auditData.overallScore ?? '–'))}/100</div>
          <div><strong>Sider analysert:</strong> ${safeText(String(scope.pagesAnalyzed ?? '–'))}</div>
        </div>
      </div>

      <div style="background:#fff8e8; border:1px solid #f1c36d; padding:18px; border-radius:10px; margin-bottom:22px;">
        <h2 style="margin:0 0 8px;">Pitch dette</h2>
        <p style="margin:0 0 8px;"><strong>${safeText(service.title ?? 'Ukjent tjeneste')}</strong></p>
        <p style="margin:0 0 8px;">${safeText(service.summary ?? '')}</p>
        <p style="margin:0;"><strong>Anbefalt pitch:</strong> ${safeText(qualification.recommendedPitch ?? '')}</p>
        <p style="margin:8px 0 0;"><strong>Oppfølging:</strong> ${safeText(qualification.urgency ?? '')}</p>
      </div>

      <h2>Hvorfor leaden er interessant</h2>
      <ul>${reasons || '<li>Ingen lead reasons registrert.</li>'}</ul>

      <h2>Diagnose</h2>
      <p>${safeText(summary.diagnosis ?? '–')}</p>
      <p><strong>Største lekkasje:</strong> ${safeText(summary.biggestLeak ?? '–')}</p>
      <p><strong>Raskeste gevinst:</strong> ${safeText(summary.fastestWin ?? '–')}</p>

      <h2>Topp funn</h2>
      <ul>${topFindings || '<li>Ingen funn listet.</li>'}</ul>

      <p style="margin-top:28px;">
        <a href="mailto:${safeAttr(email)}?subject=${encodeURIComponent(`Gjennomgang av nettsiden din (${auditData.finalUrl || url})`)}" style="display:inline-block; background:#111; color:#fff; text-decoration:none; padding:12px 18px; border-radius:999px; font-weight:700;">Svar leaden</a>
      </p>
    </div>
  `
}

function safeText(value: unknown): string {
  return escapeHtml(String(value ?? ''))
}

function normalizeLeadIntent(value: unknown, auditData: any): string {
  if (typeof value === 'string' && value.trim()) return value.trim()

  const serviceId = String(auditData?.recommendedService?.id ?? '')
  if (serviceId === 'conversion_upgrade') return 'Få flere henvendelser'
  if (serviceId === 'full_website_rebuild') return 'Vurdere ny nettside'
  if (serviceId === 'technical_recovery') return 'Forbedre mobil / hastighet'
  if (serviceId === 'seo_aeo_foundation') return 'Fikse SEO / AI-synlighet'

  return 'Fikse SEO / AI-synlighet'
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function safeHrefPath(value: unknown): string {
  const path = String(value || '/kontakt')
  return path.startsWith('/') ? escapeHtml(path) : '/kontakt'
}

function safeAttr(value: unknown): string {
  return escapeHtml(String(value ?? ''))
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
