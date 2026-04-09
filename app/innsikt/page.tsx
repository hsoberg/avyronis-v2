"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import CTASection from "@/components/CTASection"
import ScrollAnimations from "@/components/ScrollAnimations"
import { insights } from "@/data/insights"

const filters = ["Alle", "SEO", "Konvertering", "Strategi", "Markedsføring"]

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
      <div className="url-analyzer__lead-form fade-up" style={{ textAlign: 'center' }}>
        <h3 className="insight-h3" style={{ marginTop: 0 }}>Takk!</h3>
        <p className="url-analyzer__lead-text" style={{ maxWidth: '400px', margin: '0 auto 24px' }}>
          Vi har mottatt forespørselen din og tar kontakt på <strong>{leadEmail}</strong> med din fulle rapport.
        </p>
        <button className="url-analyzer__btn" onClick={() => { setStatus("idle"); setUrl(""); setLeadEmail("") }}>
          Analyser en ny nettside
        </button>
      </div>
    )
  }

  if (status === "loading") {
    return (
      <div className="url-analyzer__loading fade-up">
        <div className="url-analyzer__loader"></div>
        <p className="url-analyzer__lead-text">
          Identifiserer nettside-type og analyserer <strong>{url}</strong>...<br/>
          <span style={{ fontSize: '14px', color: 'var(--color-muted)' }}>Dette tar gjerne 15-20 sekunder med OpenAI.</span>
        </p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="url-analyzer__lead-form fade-up">
        <h3 className="insight-h3" style={{ color: '#ff4444', marginTop: 0 }}>Analyse feilet</h3>
        <p className="url-analyzer__lead-text" style={{ maxWidth: '400px', margin: '0 auto 24px' }}>
          {errorMessage}
        </p>
        <button className="url-analyzer__btn" onClick={() => setStatus("idle")}>
          Prøv en annen URL
        </button>
      </div>
    )
  }

  if (status === "analyzed" && auditData) {
    const scorecard = auditData.scorecard ?? {}
    const summary = auditData.executiveSummary ?? {}

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

    const IMPACT_COLORS: Record<string, string> = {
      high: '#ff4444',
      medium: '#f5a623',
      low: '#4caf50',
    }

    return (
      <div className="url-analyzer-report fade-up" style={{ textAlign: 'left', background: 'var(--color-bg-card)', padding: '40px', borderRadius: '24px', border: '1px solid var(--color-border-light)' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '24px' }}>
          <div>
            <h2 className="insight-h2" style={{ margin: '0 0 8px' }}>Audit Report: {url}</h2>
            {auditData.siteCategoryLabel && (
              <span style={{ display: 'inline-block', background: 'var(--color-surface)', border: '1px solid var(--color-border-light)', color: 'var(--color-muted)', padding: '4px 12px', borderRadius: '20px', fontSize: '13px' }}>
                Analysert som: {auditData.siteCategoryLabel}
              </span>
            )}
          </div>
          <div className="ia-score" style={{ background: 'var(--color-accent)', color: 'var(--color-black)', padding: '8px 16px', borderRadius: '20px', fontWeight: 700, whiteSpace: 'nowrap' }}>
            Score: {auditData.overallScore ?? '–'} / 100
          </div>
        </div>

        {/* Executive Summary */}
        {summary.diagnosis && (
          <div style={{ marginBottom: '48px' }}>
            <h3 className="insight-h3" style={{ marginTop: 0, color: 'var(--color-accent)' }}>Diagnose</h3>
            <p className="insight-p" style={{ fontSize: '16px', marginBottom: '24px' }}>{summary.diagnosis}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '20px', background: 'var(--color-surface)', border: '1px solid rgba(255,68,68,0.3)', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#ff6666', marginBottom: '8px', letterSpacing: '0.05em' }}>STØRSTE LEKKASJE</div>
                <p style={{ margin: 0, color: 'var(--color-white)', fontSize: '15px', lineHeight: 1.5 }}>{summary.biggestLeak}</p>
              </div>
              <div style={{ padding: '20px', background: 'var(--color-surface)', border: '1px solid var(--color-border-light)', borderRadius: '12px', filter: 'blur(3px)', opacity: 0.5, userSelect: 'none' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-accent)', marginBottom: '8px', letterSpacing: '0.05em' }}>RASKESTE GEVINST</div>
                <p style={{ margin: 0, color: 'var(--color-white)', fontSize: '15px', lineHeight: 1.5 }}>Lås opp for å se det tiltaket som gir raskest effekt →</p>
              </div>
            </div>
          </div>
        )}

        {/* Top 3 */}
        <h3 className="insight-h3" style={{ marginTop: 0, color: 'var(--color-accent)' }}>Topp 3 prioriterte tiltak</h3>
        <p className="insight-p" style={{ fontSize: '16px' }}>Her er de tre viktigste forbedringsmulighetene AI-sjekken identifiserte:</p>

        <div className="audit-teasers" style={{ display: 'grid', gap: '16px', marginBottom: '48px' }}>
          {(auditData.top3Updates ?? []).map((update: any, i: number) => (
            <div key={i} className="audit-teaser-card" style={{ padding: '24px', background: 'var(--color-surface)', border: '1px solid var(--color-border-light)', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '14px' }}>TILTAK {i + 1}</span>
                {update.impact && (
                  <span style={{ fontSize: '12px', fontWeight: 600, color: IMPACT_COLORS[update.impact] ?? 'var(--color-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 10px', borderRadius: '20px', border: `1px solid ${IMPACT_COLORS[update.impact] ?? 'transparent'}` }}>
                    {IMPACT_LABELS[update.impact] ?? update.impact} impact
                  </span>
                )}
              </div>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', color: 'var(--color-white)', margin: '0 0 12px' }}>{update.title}</h4>
              <p style={{ margin: '0 0 16px', color: 'var(--color-muted-70)', fontSize: '15px', lineHeight: 1.5 }}>{update.whyItMatters}</p>
              <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border-light)', borderRadius: '8px', filter: 'blur(4px)', opacity: 0.4, userSelect: 'none' }}>
                <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>Anbefalt fix: Lås opp for å se konkret tiltak →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Scorecard */}
        <h3 className="insight-h3" style={{ color: 'var(--color-accent)' }}>Scorecard</h3>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '64px' }}>
          {Object.entries(SCORECARD_LABELS).map(([key, label]) => {
            const area = scorecard[key] ?? {}
            const score = area.score ?? 0
            const scoreColor = score >= 75 ? '#4caf50' : score >= 50 ? '#f5a623' : '#ff4444'
            return (
              <div key={key} style={{ padding: '16px 20px', background: 'var(--color-surface)', border: '1px solid var(--color-border-light)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-white)' }}>{label}</span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: scoreColor }}>{score} / 100</span>
                </div>
                <div style={{ height: '4px', background: 'var(--color-border-light)', borderRadius: '2px' }}>
                  <div style={{ height: '4px', width: `${score}%`, background: scoreColor, borderRadius: '2px', transition: 'width 0.6s ease' }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Paywall */}
        <div className="audit-paywall" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'linear-gradient(to bottom, transparent, var(--color-bg-card) 60%)', zIndex: 1, pointerEvents: 'none' }}></div>

          <h3 className="insight-h3" style={{ marginTop: 0, filter: 'blur(3px)', opacity: 0.5 }}>Scorecard-analyser, prioriterte tiltak og manglende signaler</h3>
          <p className="insight-p" style={{ filter: 'blur(4px)', opacity: 0.5 }}>
            Basert på analysen mangler siden flere viktige elementer som koster deg synlighet og leads. Her er vår konkrete anbefalingsliste med prioriterte tiltak og hva som ikke kunne verifiseres fra nettsiden...
          </p>

          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginTop: '-80px', padding: '40px', background: 'var(--color-bg-dark)', border: '1px solid var(--color-border-light)', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <h3 className="insight-h3" style={{ marginTop: 0, marginBottom: '16px' }}>Lås opp din fulle {auditData.siteCategoryLabel ? `${auditData.siteCategoryLabel}-` : ''}analyse</h3>
            <p className="insight-p" style={{ fontSize: '16px', maxWidth: '440px', margin: '0 auto 32px' }}>
              Få de konkrete fixene, prioriterte tiltak og en fullstendig scorecard-analyse sendt til innboksen.
            </p>

            <form onSubmit={handleLeadSubmit} style={{ display: "flex", gap: "12px", justifyContent: "center", maxWidth: "480px", margin: "0 auto" }}>
              <input
                type="email"
                placeholder="din@epost.no"
                className="url-analyzer__input"
                style={{ border: "1px solid var(--color-border-light)", borderRadius: "12px", padding: "12px 24px" }}
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                required
              />
              <button type="submit" className="url-analyzer__btn" disabled={leadSending}>
                {leadSending ? "Sender..." : "Send meg full rapport →"}
              </button>
            </form>
          </div>
        </div>

      </div>
    )
  }

  return (
    <form className="url-analyzer fade-up" onSubmit={handleAnalyze}>
      <input 
        type="text" 
        className="url-analyzer__input" 
        placeholder="F.eks: www.dinside.no" 
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit" className="url-analyzer__btn">
        Analyser nettsiden
      </button>
    </form>
  )
}

export default function InnsiktPage() {
  const [activeFilter, setActiveFilter] = useState("Alle")

  // Find the featured article
  const featuredArticle = insights.find((a) => a.featured)
  
  // Filter the grid articles based on active filter, excluding the featured one
  const gridArticles = insights.filter((a) => {
    const isFeatured = a.featured
    const matchesFilter = activeFilter === "Alle" || a.tag === activeFilter
    return !isFeatured && matchesFilter
  })

  // Should we show the featured article? (Yes if filter is Alle or matches its tag)
  const showFeatured = featuredArticle && (activeFilter === "Alle" || featuredArticle.tag === activeFilter)

  return (
    <>
      <ScrollAnimations />
      <Nav />
      <main>
        
        {/* HERO & URL ANALYZER */}
        <section className="innsikt-hero">
          <h1 className="innsikt-hero__title fade-up">
            Hvorfor mister du kunder på nett?
          </h1>
          <p className="innsikt-hero__sub fade-up">
            Små feil koster titusenvis av kroner. Skriv inn nettsiden din nedenfor for å få en konkret analyse av hva du bør oppdatere.
          </p>
          <UrlAnalyzer />
        </section>

        <section className="container" style={{ paddingBottom: '120px' }}>
          {/* FILTER */}
          <div className="insight-filter fade-up">
            {filters.map((f) => (
              <button
                key={f}
                className={`insight-filter__btn ${activeFilter === f ? 'insight-filter__btn--active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* FEATURED ARTICLE */}
          {showFeatured && featuredArticle && (
            <div className="insight-featured fade-up">
              <div className="insight-featured__img">
                <Image 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop" 
                  alt="Desktop Analytics Mockup"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="insight-featured__content">
                <span className="insight-badge">{featuredArticle.tag}</span>
                <h2 className="insight-featured__title">{featuredArticle.title}</h2>
                <p className="insight-featured__excerpt">{featuredArticle.excerpt}</p>
                <div className="insight-meta">
                  <span>📅 {featuredArticle.date}</span>
                  <span>⏱ {featuredArticle.read} lestetid</span>
                </div>
                {/* 
                  Link points to the dynamic article path. 
                  (To be built in the future: /innsikt/[slug]) 
                */}
                <Link href={`/innsikt/${featuredArticle.slug}`} className="insight-featured__btn">
                  Les hele guiden →
                </Link>
              </div>
            </div>
          )}

          {/* GRID ARTICLES */}
          {gridArticles.length > 0 ? (
            <div className="insight-grid fade-up stagger">
              {gridArticles.map((article) => (
                <Link key={article.id} href={`/innsikt/${article.slug}`} className="insight-card fade-up">
                  <span className="insight-badge" style={{ alignSelf: 'flex-start' }}>{article.tag}</span>
                  <h3 className="insight-card__title">{article.title}</h3>
                  <p className="insight-card__excerpt">{article.excerpt}</p>
                  <div className="insight-card__footer">
                    <span>{article.date}</span>
                    <span style={{ color: 'var(--color-white)', fontWeight: 500 }}>Les guiden →</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
             <div className="cd-pull-quote">Ingen guider i denne kategorien enda.</div>
          )}
        </section>

        {/* BOTTOM CTA */}
        <CTASection 
          overline="FÅ ET FORSPRANG"
          headline="Vil du heller ha fasiten servert direkte?"
          body="I stedet for å lese deg opp selv, kan vi fortelle deg nøyaktig hva som bør forbedres på din nettside."
        />

      </main>
      <Footer />
    </>
  )
}
