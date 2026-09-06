'use client'

import { useEffect, useRef } from 'react'

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
          <p className="hero__overline hero-entrance">Nettside + løpende forbedring</p>
          <h1 className="hero__headline hero-entrance" ref={headlineRef}>
            Vi bygger nettsiden din. Så gjør vi den bedre over tid.
          </h1>
          <p className="hero__sub hero-entrance delay-1">
            En god nettside blir ikke ferdig på lanseringsdagen. Vi bygger en rask, tydelig og profesjonell nettside rundt bedriften og kundene dine – og følger den opp med drift, synlighet, måling og konkrete forbedringer.
          </p>
          <div className="hero__buttons hero-entrance delay-2">
            <a href="/kontakt" className="btn btn--primary">Få en uforpliktende vurdering</a>
            <a href="#modell" className="hero__secondary-link">Se hvordan vi jobber →</a>
          </div>
          <p className="hero__microcopy hero-entrance delay-3">
            Fortell oss litt om bedriften din. Du får en konkret anbefaling på hva nettsiden bør gjøre bedre – uten forpliktelser.
          </p>
        </div>

      </div>

    </section>
  )
}
