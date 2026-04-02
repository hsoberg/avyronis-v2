import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email, url, auditData } = await req.json()

    if (!email || !url || !auditData) {
      return NextResponse.json({ error: 'Mangler data' }, { status: 400 })
    }

    const top3Html = (auditData.top3Updates ?? [])
      .map((u: any, i: number) => `
        <div style="margin-bottom:16px; padding:16px; background:#f4f4f5; border-radius:8px;">
          <strong>Tiltak ${i + 1}: ${u.title}</strong>
          <p style="margin:8px 0 0;">${u.description}</p>
        </div>
      `).join('')

    const fullAudit = auditData.fullAudit ?? {}
    const categoryLabel = auditData.siteCategoryLabel ?? 'Ukjent type'

    const pillars = [fullAudit.pillar1, fullAudit.pillar2, fullAudit.pillar3].filter(Boolean)
    const pillarsHtml = pillars.map((p: any) => `
      <h4 style="margin:16px 0 4px;">${p.name}</h4>
      <p style="margin:0; color:#444;">${p.analysis}</p>
    `).join('')

    await resend.emails.send({
      from: 'Avyronis Audit <henning@avyronis.com>',
      to: 'henning@avyronis.com',
      subject: `Ny lead [${categoryLabel}]: ${url}`,
      html: `
        <h2>Ny lead fra geo-audit</h2>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Analysert URL:</strong> ${url}</p>
        <p><strong>Nettside-type:</strong> ${categoryLabel}</p>
        <p><strong>Score:</strong> ${fullAudit.overallScore ?? '–'} / 100</p>

        <h3>Topp 3 tiltak</h3>
        ${top3Html}

        <h3>Full rapport</h3>
        ${pillarsHtml}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Send lead error:', error)
    return NextResponse.json({ error: 'Kunne ikke sende e-post' }, { status: 500 })
  }
}
