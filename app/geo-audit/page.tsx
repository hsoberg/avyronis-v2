"use client"

import { useState } from "react"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import ScrollAnimations from "@/components/ScrollAnimations"
import Image from "next/image"

function UrlAnalyzer() {
  const [url, setUrl] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "analyzed" | "error" | "submitted">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [auditData, setAuditData] = useState<any>(null)
  const [leadEmail, setLeadEmail] = useState("")
  const [leadSending, setLeadSending] = useState(false)

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadEmail) return
    setLeadSending(true)
    try {
      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: leadEmail, url, auditData })
      })
    } catch {}
    setLeadSending(false)
    setStatus("submitted")
  }

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return
    setStatus("loading")
    setErrorMessage("")
    
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Noe gikk galt på serveren.")
      }

      setAuditData(data.data)
      setStatus("analyzed")
      
    } catch (err: any) {
      console.error(err)
      setStatus("error")
      setErrorMessage(err.message)
    }
  }

  if (status === "submitted") {
    return (
      <div className="url-analyzer__lead-form fade-up" style={{ textAlign: 'center', background: 'var(--color-bg-card)', padding: '60px', borderRadius: '32px', border: '1px solid var(--color-border-light)' }}>
        <div style={{ fontSize: '48px', marginBottom: '24px' }}>✅</div>
        <h3 className="insight-h3" style={{ marginTop: 0, fontSize: '28px' }}>Analysen er på vei!</h3>
        <p className="url-analyzer__lead-text" style={{ maxWidth: '440px', margin: '0 auto 32px', fontSize: '18px', lineHeight: 1.6 }}>
          Vi har mottatt forespørselen din og sender den fulle rapporten for <strong>{url}</strong> til <strong>{leadEmail}</strong> innen kort tid.
        </p>
        <button className="btn btn--primary" onClick={() => { setStatus("idle"); setUrl(""); setLeadEmail("") }}>
          Analyser en ny nettside
        </button>
      </div>
    )
  }

  if (status === "loading") {
    return (
      <div className="url-analyzer__loading fade-up" style={{ padding: '60px', textAlign: 'center' }}>
        <div className="url-analyzer__loader" style={{ margin: '0 auto 32px' }}></div>
        <h3 className="insight-h3" style={{ fontSize: '24px' }}>Graver i dataene...</h3>
        <p className="url-analyzer__lead-text" style={{ fontSize: '17px' }}>
          Analyserer <strong>{url}</strong> for AI-synlighet og konverteringshull.<br/>
          <span style={{ opacity: 0.6, fontSize: '14px', marginTop: '12px', display: 'block' }}>Dette tar gjerne 15-20 sekunder.</span>
        </p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="url-analyzer__lead-form fade-up" style={{ background: 'var(--color-bg-card)', padding: '60px', borderRadius: '32px', border: '1px solid rgba(255,68,68,0.2)' }}>
        <div style={{ fontSize: '48px', marginBottom: '24px' }}>❌</div>
        <h3 className="insight-h3" style={{ color: '#ff4444', marginTop: 0 }}>Analyse feilet</h3>
        <p className="url-analyzer__lead-text" style={{ maxWidth: '400px', margin: '0 auto 32px' }}>
          {errorMessage}
        </p>
        <button className="btn btn--secondary" onClick={() => setStatus("idle")}>
          Prøv en annen URL
        </button>
      </div>
    )
  }

  if (status === "analyzed" && auditData) {
    const summary = auditData.executiveSummary ?? {}

    return (
      <div className="url-analyzer-report fade-up" style={{ textAlign: 'left', background: 'var(--color-bg-card)', padding: '48px', borderRadius: '32px', border: '1px solid var(--color-border-light)', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '32px' }}>
          <div>
            <h2 className="insight-h2" style={{ margin: '0 0 12px', fontSize: '32px' }}>Sanntids-audit: {url}</h2>
            {auditData.siteCategoryLabel && (
              <span style={{ display: 'inline-block', background: 'var(--color-surface)', border: '1px solid var(--color-border-light)', color: 'var(--color-muted)', padding: '6px 16px', borderRadius: '24px', fontSize: '14px', fontWeight: 600 }}>
                Kategori: {auditData.siteCategoryLabel}
              </span>
            )}
          </div>
          <div className="ia-score" style={{ background: 'var(--color-accent)', color: 'var(--color-black)', padding: '12px 24px', borderRadius: '24px', fontWeight: 800, fontSize: '20px', whiteSpace: 'nowrap', boxShadow: '0 10px 20px rgba(var(--color-accent-rgb), 0.3)' }}>
            Score: {auditData.overallScore ?? '–'} / 100
          </div>
        </div>

        {/* Executive Summary */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ width: '8px', height: '24px', background: 'var(--color-accent)', borderRadius: '4px' }}></span>
            <h3 className="insight-h3" style={{ margin: 0, fontSize: '24px' }}>Overordnet diagnose</h3>
          </div>
          <p className="insight-p" style={{ fontSize: '18px', lineHeight: 1.6, marginBottom: '32px', color: 'var(--color-white)' }}>{summary.diagnosis}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '28px', background: 'rgba(255,68,68,0.05)', border: '1px solid rgba(255,68,68,0.2)', borderRadius: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#ff6666', marginBottom: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Største lekkasje</div>
              <p style={{ margin: 0, color: 'var(--color-white)', fontSize: '16px', lineHeight: 1.5, fontWeight: 500 }}>{summary.biggestLeak}</p>
            </div>
            <div style={{ padding: '28px', background: 'rgba(var(--color-accent-rgb), 0.05)', border: '1px solid rgba(var(--color-accent-rgb), 0.2)', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ filter: 'blur(4px)', opacity: 0.4 }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Raskeste gevinst</div>
                <p style={{ margin: 0, color: 'var(--color-white)', fontSize: '16px', lineHeight: 1.5 }}>Her ligger det et tiltak som gir umiddelbar effekt...</p>
              </div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(2px)' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase' }}>Låst for {url}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Paywall Container */}
        <div style={{ position: 'relative', marginTop: '40px' }}>
          <div style={{ position: 'absolute', top: '-100px', left: 0, right: 0, height: '250px', background: 'linear-gradient(to bottom, transparent, var(--color-bg-card) 85%)', zIndex: 1, pointerEvents: 'none' }}></div>
          
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '64px 40px', background: 'var(--color-surface)', border: '1px solid var(--color-border-light)', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', marginTop: '-80px' }}>
            <h3 className="insight-h3" style={{ marginTop: 0, marginBottom: '20px', fontSize: '28px' }}>Vil du ha de konkrete løsningene?</h3>
            <p className="insight-p" style={{ fontSize: '17px', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.6 }}>
              Vi har generert en fullstendig liste over tiltak, prioriterte fix-er og Princeton-metodikken for AI-synlighet for <strong>{url}</strong>. Tast inn e-posten din for å få den tilsendt umiddelbart.
            </p>

            <form onSubmit={handleLeadSubmit} style={{ display: "flex", flexWrap: 'wrap', gap: "16px", justifyContent: "center", maxWidth: "540px", margin: "0 auto" }}>
              <input
                type="email"
                placeholder="din@epost.no"
                className="url-analyzer__input"
                style={{ flex: '1', minWidth: '240px', border: "1px solid var(--color-border-light)", borderRadius: "16px", padding: "16px 24px" }}
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn--accent" style={{ height: 'auto', padding: '16px 32px' }} disabled={leadSending}>
                {leadSending ? "Sender..." : "Send full rapport gratis →"}
              </button>
            </form>
            <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--color-muted)', opacity: 0.7 }}>
              Kun for seriøse aktører. Ingen spam, kun din analyse.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="geo-audit-tool" style={{ maxWidth: '400px', margin: '40px auto 0', width: '100%' }}>
      <form 
        className="url-analyzer-dedicated" 
        onSubmit={handleAnalyze} 
        style={{ 
          display: 'flex', 
          gap: '6px', 
          background: 'rgba(255,255,255,0.05)', 
          padding: '6px', 
          borderRadius: '24px', 
          border: '1px solid rgba(255,255,255,0.1)', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          width: '100%',
          alignItems: 'center'
        }}
      >
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', minWidth: '0' }}>
          <input 
            type="text" 
            className="url-analyzer__input" 
            placeholder="f.eks: google.no" 
            style={{ 
              width: '100%', 
              border: 'none', 
              background: 'transparent', 
              padding: '10px 14px', 
              fontSize: '14px', 
              color: 'var(--color-white)',
              outline: 'none'
            }}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className="btn btn--primary" 
          style={{ 
            borderRadius: '20px', 
            padding: '0 16px', 
            height: '40px',
            fontSize: '13px',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            boxShadow: '0 5px 15px rgba(var(--color-accent-rgb), 0.2)',
            transition: 'all 0.2s ease'
          }}
        >
          Analyser
        </button>
      </form>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '24px', opacity: 0.5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
          <span style={{ color: 'var(--color-accent)' }}>✓</span> AI Search
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
          <span style={{ color: 'var(--color-accent)' }}>✓</span> CRO
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
          <span style={{ color: 'var(--color-accent)' }}>✓</span> Princeton
        </div>
      </div>
    </div>
  )
}

export default function GeoAuditPage() {
  return (
    <>
      <ScrollAnimations />
      <Nav />
      <main className="geo-audit-page" style={{ minHeight: '100vh', paddingTop: '160px', paddingBottom: '100px', position: 'relative', overflow: 'hidden' }}>
        
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '80vw', height: '60vh', background: 'radial-gradient(circle, rgba(var(--color-accent-rgb), 0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="badge fade-up" style={{ marginBottom: '24px' }}>Gratis AI-Synlighetstest</span>
            <h1 className="insight-h1 fade-up" style={{ fontSize: 'clamp(40px, 8vw, 76px)', lineHeight: 0.9, marginBottom: '24px', letterSpacing: '-0.04em' }}>
              Finn ut hvorfor du <span className="text-accent">mister kunder</span>
            </h1>
            <p className="insight-p fade-up" style={{ fontSize: 'clamp(18px, 2vw, 22px)', maxWidth: '640px', margin: '0 auto', opacity: 0.8 }}>
              Vår AI-drevne sanntids-analyse avdekker dine konverteringshull og din synlighet i AI-søk (ChatGPT, Perplexity) på under 60 sekunder.
            </p>
          </div>

          <UrlAnalyzer />

          {/* Trust indicators */}
          <div className="fade-up" style={{ marginTop: '120px', textAlign: 'center', borderTop: '1px solid var(--color-border-light)', paddingTop: '60px' }}>
            <p style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted)', marginBottom: '40px' }}>Bygget på ledende forskning og metodikk</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '60px', opacity: 0.4, filter: 'grayscale(1)' }}>
               {/* Placeholders for logos or research entities */}
               <div style={{ fontWeight: 800, fontSize: '24px', letterSpacing: '-0.02em' }}>PRINCETON</div>
               <div style={{ fontWeight: 800, fontSize: '24px', letterSpacing: '-0.02em' }}>OPENAI</div>
               <div style={{ fontWeight: 800, fontSize: '24px', letterSpacing: '-0.02em' }}>PERPLEXITY</div>
               <div style={{ fontWeight: 800, fontSize: '24px', letterSpacing: '-0.02em' }}>GOOGLE AI</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
