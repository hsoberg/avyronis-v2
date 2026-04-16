'use client'

import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = headlineRef.current
    if (!el) return

    const text = el.textContent ?? ''
    const words = text.trim().split(/\s+/)

    el.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(' ')

    const wordEls = el.querySelectorAll<HTMLSpanElement>('.word')
    wordEls.forEach((word, i) => {
      setTimeout(() => word.classList.add('visible'), 300 + i * 80)
    })
  }, [])

  return (
    <section className="hero" id="home" aria-label="Hero">
      {/* Background */}
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__container">
        {/* Left: Content */}
        <div className="hero__content">
          <h1 className="hero__headline hero-entrance" ref={headlineRef}>
            Få flere kunder fra trafikken du allerede har
          </h1>
          <p className="hero__sub hero-entrance delay-1">
            Vi optimaliserer nettsiden din basert på faktisk brukerdata – slik at flere besøkende blir til kunder
          </p>
          <div className="hero__proof hero-entrance delay-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>✔ Snitt +30–70% flere henvendelser innen 90 dager</span>
          </div>
          <div className="hero__buttons hero-entrance delay-3">
            <a href="#contact" className="btn btn--primary">Book en gratis gjennomgang (15 min)</a>
          </div>
        </div>

      </div>

    </section>
  )
}
