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

    await resend.emails.send({
      from: 'Avyronis Audit <henning@avyronis.com>',
      to: 'henning@avyronis.com',
      subject: `Ny lead fra geo-audit: ${url}`,
      html: `
        <h2>Ny lead fra geo-audit</h2>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Analysert URL:</strong> ${url}</p>
        <p><strong>Score:</strong> ${fullAudit.overallScore ?? '–'} / 100</p>

        <h3>Topp 3 tiltak</h3>
        ${top3Html}

        <h3>Full rapport</h3>
        <h4>CRO</h4><p>${fullAudit.cro ?? '–'}</p>
        <h4>AEO</h4><p>${fullAudit.aeo ?? '–'}</p>
        <h4>SEO</h4><p>${fullAudit.seo ?? '–'}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Send lead error:', error)
    return NextResponse.json({ error: 'Kunne ikke sende e-post' }, { status: 500 })
  }
}
