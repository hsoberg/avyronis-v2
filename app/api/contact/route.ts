import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) : str
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const name = truncate(String(body.name ?? '').trim(), 200)
    const email = truncate(String(body.email ?? '').trim(), 254)
    const website = truncate(String(body.website ?? '').trim(), 500)
    const message = truncate(String(body.message ?? '').trim(), 2000)

    if (!name || !email) {
      return NextResponse.json({ error: 'Navn og e-post er påkrevd' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Ugyldig e-postadresse' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Avyronis Kontakt <henning@avyronis.com>',
      to: 'henning@avyronis.com',
      replyTo: email,
      subject: `Ny henvendelse fra ${escapeHtml(name)}`,
      html: `
        <h2>Ny henvendelse fra kontaktskjema</h2>
        <p><strong>Navn:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-post:</strong> ${escapeHtml(email)}</p>
        ${website ? `<p><strong>Nettside:</strong> ${escapeHtml(website)}</p>` : ''}
        ${message ? `<h3>Melding</h3><p style="white-space:pre-wrap;">${escapeHtml(message)}</p>` : ''}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Kunne ikke sende henvendelsen' }, { status: 500 })
  }
}
