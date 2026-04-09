import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const SCORECARD_LABELS: Record<string, string> = {
  valuePropPositioning: 'Verdiforslag & Posisjonering',
  conversionCTA: 'Konvertering & CTA',
  trustDecisionSupport: 'Tillit & Beslutningsstøtte',
  seoSearchIntent: 'SEO & Søkeintensjon',
  aeoGeoAiVisibility: 'AEO / GEO / AI-synlighet',
  informationArchitectureClarity: 'Informasjonsarkitektur & Innholdsklarhet',
}

const IMPACT_LABELS: Record<string, string> = {
  high: 'Høy',
  medium: 'Middels',
  low: 'Lav',
}

export async function POST(req: Request) {
  try {
    const { email, url, auditData } = await req.json()

    if (!email || !url || !auditData) {
      return NextResponse.json({ error: 'Mangler data' }, { status: 400 })
    }

    const categoryLabel = auditData.siteCategoryLabel ?? 'Ukjent type'
    const overallScore = auditData.overallScore ?? '–'
    const summary = auditData.executiveSummary ?? {}

    const executiveSummaryHtml = `
      <div style="background:#f4f4f5; padding:20px; border-radius:8px; margin-bottom:24px;">
        <h3 style="margin:0 0 12px;">Diagnose</h3>
        <p style="margin:0 0 16px; color:#333;">${summary.diagnosis ?? '–'}</p>
        <p style="margin:0 0 8px;"><strong>Største lekkasje:</strong> ${summary.biggestLeak ?? '–'}</p>
        <p style="margin:0;"><strong>Raskeste gevinst:</strong> ${summary.fastestWin ?? '–'}</p>
      </div>
    `

    const top3Html = (auditData.top3Updates ?? [])
      .map((u: any, i: number) => `
        <div style="margin-bottom:16px; padding:16px; background:#f9f9f9; border-left:4px solid #1a1a1a; border-radius:4px;">
          <div style="font-size:12px; color:#666; margin-bottom:4px;">TILTAK ${i + 1} — Impact: ${IMPACT_LABELS[u.impact] ?? u.impact}</div>
          <strong style="display:block; margin-bottom:8px;">${u.title}</strong>
          <p style="margin:0 0 8px; color:#444;"><em>Hvorfor det betyr noe:</em> ${u.whyItMatters ?? '–'}</p>
          <p style="margin:0; color:#222;"><strong>Anbefalt fix:</strong> ${u.recommendedFix ?? '–'}</p>
        </div>
      `).join('')

    const scorecard = auditData.scorecard ?? {}
    const scorecardHtml = Object.entries(SCORECARD_LABELS)
      .map(([key, label]) => {
        const area = scorecard[key] ?? {}
        return `
          <div style="margin-bottom:16px; padding:16px; background:#f4f4f5; border-radius:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <strong>${label}</strong>
              <span style="background:#1a1a1a; color:#fff; padding:2px 10px; border-radius:20px; font-size:14px;">${area.score ?? '–'} / 100</span>
            </div>
            <p style="margin:0; color:#444; font-size:14px;">${area.analysis ?? '–'}</p>
          </div>
        `
      }).join('')

    const priorityActionsHtml = (auditData.priorityActions ?? [])
      .map((a: any) => `
        <li style="margin-bottom:12px;">
          <strong>${a.priority}. ${a.action}</strong>
          <br/><span style="color:#555; font-size:14px;">${a.expectedOutcome}</span>
        </li>
      `).join('')

    const missingSignalsHtml = (auditData.missingSignals ?? [])
      .map((s: string) => `<li style="color:#555; font-size:14px;">${s}</li>`)
      .join('')

    await resend.emails.send({
      from: 'Avyronis Audit <henning@avyronis.com>',
      to: 'henning@avyronis.com',
      subject: `Ny lead [${categoryLabel}]: ${url}`,
      html: `
        <div style="font-family: sans-serif; max-width: 680px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="border-bottom: 2px solid #1a1a1a; padding-bottom: 12px;">Ny lead fra geo-audit</h2>
          <p><strong>E-post:</strong> ${email}</p>
          <p><strong>Analysert URL:</strong> ${url}</p>
          <p><strong>Nettside-type:</strong> ${categoryLabel}</p>
          <p><strong>Overall Score:</strong> ${overallScore} / 100</p>

          <h3>Executive Summary</h3>
          ${executiveSummaryHtml}

          <h3>Topp 3 prioriterte tiltak</h3>
          ${top3Html}

          <h3>Scorecard (6 områder)</h3>
          ${scorecardHtml}

          <h3>Prioriterte handlinger</h3>
          <ol style="padding-left: 20px;">${priorityActionsHtml}</ol>

          <h3>Manglende signaler</h3>
          <ul style="padding-left: 20px;">${missingSignalsHtml}</ul>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Send lead error:', error)
    return NextResponse.json({ error: 'Kunne ikke sende e-post' }, { status: 500 })
  }
}
