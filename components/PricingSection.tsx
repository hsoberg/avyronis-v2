'use client'

import { useState } from 'react'

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual')

  return (
    <section className="pricing-section" id="priser" aria-label="Priser og pakker">
      <div className="pricing-section__inner fade-up">

        {/* Section Header */}
        <div className="pricing-section__header">
          <p className="pricing-section__pre-headline">Bygg → Drift → Forbedring</p>
          <h2 className="pricing-section__headline">Først bygger vi nettsiden. Så velger du hvor mye vi skal følge opp.</h2>
        </div>

        {/* ============================================================
            STEG 1: PROSJEKTET
            ============================================================ */}
        <div className="pricing-stage">
          <p className="pricing-stage__label">Først bygger vi nettsiden</p>
          <p className="pricing-stage__text">
            Ny nettside fra 9 900 kr eks. mva. Omfang og pris avtales etter at vi har sett på bedriften,
            kundene og hva siden skal løse.
          </p>
        </div>

        {/* ============================================================
            STEG 2: OPPFØLGING ETTER LANSERING
            ============================================================ */}
        <div className="pricing-stage">
          <p className="pricing-stage__label">Etter lansering velger du hvor mye vi skal følge opp</p>

          {/* Clean Toggle Switch */}
          <div className="pricing-toggle-wrap">
            <span
              className={`pricing-toggle-label ${billingCycle === 'monthly' ? 'is-active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Månedlig
            </span>

            <button
              type="button"
              className={`pricing-toggle-switch ${billingCycle === 'annual' ? 'is-annual' : ''}`}
              role="switch"
              aria-checked={billingCycle === 'annual'}
              aria-label="Bytt mellom månedlig og årlig fakturering"
              onClick={() => setBillingCycle(billingCycle === 'annual' ? 'monthly' : 'annual')}
            >
              <span className="pricing-toggle-knob" />
            </button>

            <span
              className={`pricing-toggle-label ${billingCycle === 'annual' ? 'is-active' : ''}`}
              onClick={() => setBillingCycle('annual')}
            >
              Årlig <span className="pricing-toggle-badge">2 mnd gratis</span>
            </span>
          </div>
        </div>

        {/* ============================================================
            3 CLEAN PRICING CARDS
            ============================================================ */}
        <div className="pricing-grid">

          {/* Card 1: Trygghet */}
          <div className="pricing-card">
            <h3 className="pricing-card__title">Trygghet</h3>
            
            <div className="pricing-card__price">
              {billingCycle === 'annual' ? (
                <>825 kr <span className="mnd">/ mnd</span></>
              ) : (
                <>990 kr <span className="mnd">/ mnd</span></>
              )}
            </div>

            <div className="pricing-card__etab">
              {billingCycle === 'annual' ? (
                <>Fakturert årlig</>
              ) : (
                <>Løpende månedlig</>
              )}
            </div>

            <p className="pricing-card__positioning">
              Vi holder nettsiden sikker, oppdatert og fungerende.
            </p>

            <ul className="pricing-card__list">
              <li>Rask og sikker hosting med SSL-sertifikat</li>
              <li>Sikkerhetskopi av kildekode og konfigurasjon</li>
              <li>Månedlig oppdatering av systemer og avhengigheter</li>
              <li>Automatiserte oppetidskontroller (ukentlig gjennomgang)</li>
              <li>Inntil 30 min endringskapasitet/mnd, respons innen 3 virkedager</li>
            </ul>

            <div className="pricing-card__fit-text">
              For deg som vil slippe teknisk vedlikehold og vite at siden alltid er operativ og trygg.
            </div>

            <div className="pricing-card__bottom">
              <a href="/kontakt" className="btn btn--secondary">
                Få en uforpliktende vurdering
              </a>
              <p className="pricing-card__microcopy">Ingen ferdig salgspakke. Først finner vi ut hva dere faktisk trenger.</p>
            </div>
          </div>

          {/* Card 2: Synlighet (Mest valgt) */}
          <div className="pricing-card pricing-card--popular">
            <div className="pricing-card__badge">Mest valgt</div>
            <h3 className="pricing-card__title">Synlighet</h3>
            <p className="pricing-card__recommendation">Dette er det de fleste velger</p>

            <div className="pricing-card__price">
              {billingCycle === 'annual' ? (
                <>1 242 kr <span className="mnd">/ mnd</span></>
              ) : (
                <>1 490 kr <span className="mnd">/ mnd</span></>
              )}
            </div>

            <div className="pricing-card__etab">
              {billingCycle === 'annual' ? (
                <>Fakturert årlig (spar 2 980 kr)</>
              ) : (
                <>Løpende månedlig</>
              )}
            </div>

            <p className="pricing-card__positioning">
              Vi følger i tillegg med på hvordan nettsiden blir funnet og brukt.
            </p>

            <ul className="pricing-card__list">
              <li><strong>Alt fra Trygghet inkludert</strong>, med direktevarsling ved nedetid</li>
              <li>Lokal SEO for AI-søk & Google Bedriftsprofil</li>
              <li>Sporing av henvendelser/klikk med månedlig rapport</li>
              <li>Kvartalsvis optimalisering av eksisterende side</li>
              <li>Inntil 1 time support eller utvikling per måned, respons innen 2 virkedager</li>
            </ul>

            <div className="pricing-card__fit-text">
              For deg som vil tiltrekke flere lokale henvendelser og klatre på Google.
            </div>

            <div className="pricing-card__bottom">
              <a href="/kontakt" className="btn btn--primary">
                Få en uforpliktende vurdering
              </a>
              <p className="pricing-card__microcopy">Ingen ferdig salgspakke. Først finner vi ut hva dere faktisk trenger.</p>
            </div>
          </div>

          {/* Card 3: Vekst */}
          <div className="pricing-card">
            <h3 className="pricing-card__title">Vekst</h3>

            <div className="pricing-card__price">
              {billingCycle === 'annual' ? (
                <>2 492 kr <span className="mnd">/ mnd</span></>
              ) : (
                <>2 990 kr <span className="mnd">/ mnd</span></>
              )}
            </div>

            <div className="pricing-card__etab">
              {billingCycle === 'annual' ? (
                <>Fakturert årlig (spar 5 980 kr)</>
              ) : (
                <>Løpende månedlig</>
              )}
            </div>

            <p className="pricing-card__positioning">
              Vi jobber aktivt videre med forbedringer, testing og nye muligheter.
            </p>

            <ul className="pricing-card__list">
              <li><strong>Alt fra Synlighet inkludert</strong></li>
              <li>Prioritert respons ved teknisk stans (innen 1 virkedag)</li>
              <li>Månedlig optimalisering av eksisterende sider</li>
              <li>Heatmap og enkel A/B-testing for konverteringsoptimalisering</li>
              <li>Inntil 2 timer support eller utvikling per måned</li>
            </ul>

            <div className="pricing-card__fit-text">
              For deg som vil at nettsiden skal være en aktiv kanal for nye kunder.
            </div>

            <div className="pricing-card__bottom">
              <a href="/kontakt" className="btn btn--secondary">
                Få en uforpliktende vurdering
              </a>
              <p className="pricing-card__microcopy">Ingen ferdig salgspakke. Først finner vi ut hva dere faktisk trenger.</p>
            </div>
          </div>

        </div>

        {/* Global friction / Trust note */}
        <div className="pricing-section__global-friction">
          Ny nettside fra 9 900 kr • Ingen bindingstid på drift • 100% eierskap • Fast timepris 990 kr for ekstraoppdrag
        </div>

      </div>
    </section>
  )
}
