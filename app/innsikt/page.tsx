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
  const [status, setStatus] = useState<"idle" | "loading" | "lead">("idle")

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return
    setStatus("loading")
    
    // Fake loading for 2.5 seconds, then show lead form
    setTimeout(() => {
      setStatus("lead")
    }, 2500)
  }

  if (status === "loading") {
    return (
      <div className="url-analyzer__loading fade-up">
        <div className="url-analyzer__loader"></div>
        <p className="url-analyzer__lead-text">Analyserer {url}... Dette tar et par sekunder.</p>
      </div>
    )
  }

  if (status === "lead") {
    return (
      <div className="url-analyzer__lead-form fade-up">
        <p className="url-analyzer__lead-text">
          Analysen for <strong>{url}</strong> er nesten klar!<br/>
          Verktøyet er foreløpig i lukket beta. Legg igjen e-posten din, så sender vi rapporten manuelt.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", maxWidth: "480px", margin: "0 auto" }}>
          <input 
            type="email" 
            placeholder="din@epost.no" 
            className="url-analyzer__input" 
            style={{ border: "1px solid var(--color-border-light)", borderRadius: "12px", padding: "12px 24px" }}
          />
          <button className="url-analyzer__btn" onClick={() => setStatus("idle")}>
            Send meg analyse
          </button>
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
