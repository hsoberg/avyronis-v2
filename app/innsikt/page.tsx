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
        
        {/* HERO */}
        <section className="innsikt-hero">
          <h1 className="innsikt-hero__title fade-up">
            Våre siste dykk ned i <span className="text-accent">vekst og data</span>
          </h1>
          <p className="innsikt-hero__sub fade-up">
            Vi deler våre erfaringer fra innsiden av norske bedrifter – alt fra CRO-eksperimenter til de nyeste strategiene innen SEO og AI-synlighet.
          </p>
          <div className="fade-up" style={{ marginTop: '32px' }}>
            <Link href="/geo-audit" className="btn btn--primary">
              Nervøs for AI-søk? Prøv vår gratis analyse her →
            </Link>
          </div>
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
