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
      <div className="hero__video-wrap" aria-hidden="true">
        <video
          className="hero__video"
          src="/henning.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <h1 className="hero__headline" ref={headlineRef}>
          Få 2–5x flere kunder fra nettsiden din
        </h1>
        <p className="hero__sub">
          Vi finner hvorfor du mister kunder – og fikser det med data, testing og faktisk brukeradferd.
        </p>
        <div className="hero__proof">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Basert på metoder som har økt konvertering med opptil 300%</span>
        </div>
        <div className="hero__buttons">
          <a href="#contact" className="btn btn--primary">
            <span className="btn__icon" aria-hidden="true">
              <svg className="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#01200f" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
            Få en konkret plan for nettsiden din
          </a>
        </div>
        <p className="hero__microcopy">
          Tar 15 min – ingen forpliktelser
        </p>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
