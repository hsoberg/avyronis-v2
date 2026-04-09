'use client'

import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__ambient-glow" />
        <div className="hero__dot-grid" />
        <div
          className="floating-shape anim-pulse"
          style={{
            width: '800px', height: '800px', color: 'var(--color-accent)',
            top: '-20%', left: '-15%', opacity: 0.03,
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
          }}
        />
      </div>

      <div className="hero__container">
        {/* Left: Content */}
        <div className="hero__content">
          <h1 className="hero__headline hero-entrance" ref={headlineRef}>
            Få 2–5x flere kunder fra nettsiden din
          </h1>
          <p className="hero__sub hero-entrance delay-1">
            For norske bedrifter med trafikk som ikke konverterer. Vi gjør besøkende om til kunder – med datadrevet CRO, A/B-testing og kontinuerlig optimalisering.
          </p>
          <div className="hero__proof hero-entrance delay-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Ingen binding. Du betaler for resultater – ikke løfter.</span>
          </div>
          <div className="hero__buttons hero-entrance delay-3">
            <a href="#contact" className="btn btn--primary">Book en gratis gjennomgang (15 min)</a>
          </div>
        </div>

        {/* Right: UI Scene — hidden on mobile via CSS */}
        <div className="hero__visual-side hero-entrance delay-2" aria-hidden="true">
          <div
            className="ui-scene"
            style={{
              transform: `rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg)`,
            }}
          >
            {/* Ambient glows */}
            <div className="ui-glow ui-glow--1" />
            <div className="ui-glow ui-glow--2" />

            {/* 1 — Main SEO dashboard */}
            <div className="ui-panel ui-panel--main">
              <div className="panel-header">
                <div className="panel-dot" style={{ background: '#ff5f56' }} />
                <div className="panel-dot" style={{ background: '#ffbd2e' }} />
                <div className="panel-dot" style={{ background: '#27c93f' }} />
                <span className="panel-title-label">SEO_DASHBOARD.APP</span>
              </div>
              <div className="panel-body">
                <div className="panel-stat-row">
                  <div>
                    <div className="panel-label">Organisk vekst</div>
                    <div className="panel-big-num">+245%</div>
                  </div>
                  <span className="panel-badge">LIVE</span>
                </div>

                <div className="panel-chart">
                  <svg viewBox="0 0 380 72" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f3d05b" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#f3d05b" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,68 C50,64 80,54 120,40 C160,26 190,32 230,18 C270,4 310,12 350,5 L380,2 L380,72 L0,72 Z"
                      fill="url(#chartFill)"
                    />
                    <path
                      d="M0,68 C50,64 80,54 120,40 C160,26 190,32 230,18 C270,4 310,12 350,5 L380,2"
                      fill="none"
                      stroke="#f3d05b"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="380" cy="2" r="4" fill="#f3d05b" className="chart-live-dot" />
                  </svg>
                </div>

                <div className="panel-rows">
                  {[
                    { kw: 'tannlege oslo', pos: 1, up: true },
                    { kw: 'elektriker bergen', pos: 2, up: true },
                    { kw: 'advokat stavanger', pos: 3, up: false },
                  ].map(({ kw, pos, up }) => (
                    <div key={kw} className="panel-row-item">
                      <span className="panel-row-kw">{kw}</span>
                      <span className={`panel-row-pos ${up ? 'pos--up' : 'pos--same'}`}>
                        {up ? '↑' : '→'} #{pos}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2 — PageSpeed score ring */}
            <div className="ui-panel ui-panel--score">
              <div className="panel-label" style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Ytelse
              </div>
              <svg viewBox="0 0 80 80" width="80" height="80" aria-hidden="true">
                <circle cx="40" cy="40" r="33" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="33" fill="none"
                  stroke="#27c93f" strokeWidth="6"
                  strokeDasharray="207.3" strokeDashoffset="2.1"
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                  style={{ filter: 'drop-shadow(0 0 8px #27c93f)' }}
                />
                <text x="40" y="45" textAnchor="middle" fill="white" fontSize="20" fontWeight="800" fontFamily="Inter, sans-serif">
                  99
                </text>
              </svg>
              <div style={{ fontSize: '10px', opacity: 0.45, textAlign: 'center' }}>PageSpeed Score</div>
              <div className="score-badges">
                <span className="score-badge score-badge--green">FCP 0.8s</span>
                <span className="score-badge score-badge--green">LCP 1.2s</span>
              </div>
            </div>

            {/* 3 — CRO conversion rate */}
            <div className="ui-panel ui-panel--cro">
              <div className="panel-label" style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                CRO Konvertering
              </div>
              <div className="cro-row">
                <div>
                  <div className="panel-big-num" style={{ fontSize: '26px' }}>8.4%</div>
                  <div style={{ fontSize: '11px', color: '#27c93f', marginTop: '2px' }}>+3.2% vs fjor</div>
                </div>
                <svg className="cro-sparkline" viewBox="0 0 60 30" width="60" height="30" aria-hidden="true">
                  <polyline
                    points="0,28 12,22 24,17 36,11 48,6 60,1"
                    fill="none"
                    stroke="#27c93f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="cro-bar-wrap">
                <div className="cro-bar" style={{ width: '84%' }} />
              </div>
            </div>

            {/* 4 — Live notification toast */}
            <div className="ui-panel ui-panel--notify">
              <div className="notify-dot" />
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-white)' }}>
                  Ny konvertering!
                </div>
                <div style={{ fontSize: '10px', opacity: 0.45 }}>oslo@bedrift.no — akkurat nå</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
