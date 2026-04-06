'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      website: (form.elements.namedItem('website') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        setErrorMsg(json.error ?? 'Noe gikk galt. Prøv igjen.')
        setStatus('error')
        return
      }

      setStatus('success')
      form.reset()
    } catch {
      setErrorMsg('Noe gikk galt. Prøv igjen.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '48px 24px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '48px' }}>✓</div>
        <h3 style={{ color: 'var(--color-white)', fontSize: '22px', fontWeight: 500, margin: 0 }}>
          Takk – jeg tar kontakt snart!
        </h3>
        <p style={{ color: 'var(--color-muted-70)', fontSize: '16px', margin: 0 }}>
          Svarer vanligvis innen noen timer.
        </p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>

      <div className="form-group">
        <label htmlFor="name">Navn</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input"
          placeholder="Ditt navn"
          required
          maxLength={200}
          disabled={status === 'loading'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-post</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          placeholder="din@epost.no"
          required
          maxLength={254}
          disabled={status === 'loading'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="website">Nettside (valgfritt)</label>
        <input
          type="url"
          id="website"
          name="website"
          className="form-input"
          placeholder="www.dinbedrift.no"
          maxLength={500}
          disabled={status === 'loading'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Hva ønsker du å oppnå? (valgfritt)</label>
        <textarea
          id="message"
          name="message"
          className="form-textarea"
          placeholder="Beskriv kort hva du ønsker å oppnå..."
          maxLength={2000}
          disabled={status === 'loading'}
        />
      </div>

      {status === 'error' && (
        <p style={{ color: '#f87171', fontSize: '14px', margin: 0 }}>{errorMsg}</p>
      )}

      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button
          type="submit"
          className="btn btn--primary"
          style={{ width: '100%', padding: '20px', fontSize: '18px', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sender...' : 'Se hva som stopper deg fra flere kunder'}
        </button>
        <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--color-muted-70)', fontFamily: 'var(--font-body)' }}>
          Tar 10–15 min. Helt uforpliktende.
        </p>
      </div>
    </form>
  )
}
