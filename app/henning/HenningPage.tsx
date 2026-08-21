'use client'

import { useState } from 'react'
import { content, Lang } from './content'
import './henning.css'

export default function HenningPage() {
  const [lang, setLang] = useState<Lang>('en')
  const t = content[lang]

  return (
    <div className="henning-page">
      <div className="henning-page__lang">
        <button
          className={lang === 'en' ? 'is-active' : ''}
          onClick={() => setLang('en')}
        >
          EN
        </button>
        <span>/</span>
        <button
          className={lang === 'no' ? 'is-active' : ''}
          onClick={() => setLang('no')}
        >
          NO
        </button>
      </div>

      <main className="henning-page__container">
        <section className="henning-hero">
          <img
            className="henning-hero__portrait"
            src="/henning-avyronis-portrett.webp"
            alt="Henning Navrud-Søberg"
          />
          <p className="henning-hero__label">{t.label}</p>
          <h1 className="henning-hero__title">{t.heroTitle}</h1>
          <p className="henning-hero__tagline">{t.heroTagline}</p>
        </section>

        <section className="henning-intro">
          <p>{t.intro}</p>
        </section>

        <section className="henning-section">
          <h2>{t.toolbeltHeading}</h2>
          <div className="henning-grid">
            {t.toolbelt.map((item) => (
              <div className="henning-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="henning-section">
          <h2>{t.proofHeading}</h2>
          <div className="henning-proof">
            {t.proof.map((item) => (
              <div className="henning-proof__item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="henning-cta">
          <h2>{t.ctaHeading}</h2>
          <p>{t.ctaSub}</p>
          <a href="mailto:henning@avyronis.com" className="henning-cta__button">
            {t.ctaButton}
          </a>
        </section>
      </main>
    </div>
  )
}
