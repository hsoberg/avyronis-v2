export default function PricingSection() {
  return (
    <section className="pricing-section" id="priser" aria-label="Priser og pakker">
      <div className="pricing-section__inner fade-up">

        <div className="pricing-section__header">
          <p className="pricing-section__pre-headline">Start enkelt – oppgrader når du vokser</p>
          <h2 className="pricing-section__headline">Velg løsningen som gir deg flere kunder</h2>
          <p className="pricing-section__support">
            Tre nivåer – velg hvor raskt du vil vokse
          </p>
        </div>

        <div className="pricing-grid">

          {/* Card 1 */}
          <div className="pricing-card">
            <h3 className="pricing-card__title">Synlig</h3>
            <div className="pricing-card__price">1 990 kr <span className="mnd">/ mnd</span></div>
            <div className="pricing-card__etab">+ 9 900 kr etablering</div>

            <p className="pricing-card__positioning">Du får en profesjonell nettside som gjør at folk faktisk finner deg – og tar deg seriøst.</p>

            <ul className="pricing-card__list">
              <li>Synlig på Google når kunder søker</li>
              <li>Rask, mobiltilpasset og enkel å bruke</li>
              <li>Struktur som gjør det lett å ta kontakt</li>
              <li>Drift, sikkerhet og oppdateringer inkludert</li>
            </ul>

            <div className="pricing-card__fit-text">For deg som ikke har nettside i dag eller har en utdatert side som skader tilliten din</div>

            <div className="pricing-card__bottom">
              <a href="#contact" className="btn btn--secondary">Få en konkret plan for din nettside</a>
              <p className="pricing-card__microcopy">Tar 10–15 min. Ingen forpliktelser.</p>
            </div>
          </div>

          {/* Card 2 (Recommended) */}
          <div className="pricing-card pricing-card--popular">
            <div className="pricing-card__badge">Mest valgt</div>
            <h3 className="pricing-card__title">Flere kunder</h3>
            <p className="pricing-card__recommendation">Dette er det de fleste velger</p>
            <div className="pricing-card__price">3 990 kr <span className="mnd">/ mnd</span></div>
            <div className="pricing-card__etab">+ 14 900 kr etablering</div>

            <p className="pricing-card__positioning">Vi bygger ikke bare en nettside – vi bygger et system som gjør flere besøkende til kunder.</p>

            <ul className="pricing-card__list">
              <li>Strukturert for konvertering (ikke bare design)</li>
              <li>Tydelige CTA-er som faktisk blir brukt</li>
              <li>Kontinuerlig forbedring basert på data</li>
              <li>Måling av hva som gir henvendelser</li>
            </ul>

            <div className="pricing-card__fit-text">For deg som vil ha flere kunder – uten å øke annonsebudsjettet</div>

            <div className="pricing-card__bottom">
              <a href="#contact" className="btn btn--primary">Få en konkret plan for din nettside</a>
              <p className="pricing-card__microcopy">Tar 10–15 min. Ingen forpliktelser.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="pricing-card">
            <h3 className="pricing-card__title">Markedsleder</h3>
            <div className="pricing-card__price">6 990 kr <span className="mnd">/ mnd</span></div>
            <div className="pricing-card__etab">+ 19 900 kr etablering</div>

            <p className="pricing-card__positioning">Dette er for deg som vil dominere – ikke bare være synlig.</p>

            <ul className="pricing-card__list">
              <li>A/B-testing av sider og budskap</li>
              <li>Strategisk innhold som bygger tillit og autoritet</li>
              <li>AI-chat som fanger og kvalifiserer leads 24/7</li>
              <li>Løpende optimalisering av hele kundereisen</li>
            </ul>

            <div className="pricing-card__fit-text">For deg som vil være det naturlige valget i markedet ditt</div>

            <div className="pricing-card__bottom">
              <a href="#contact" className="btn btn--secondary">Få en konkret plan for din nettside</a>
              <p className="pricing-card__microcopy">Tar 10–15 min. Ingen forpliktelser.</p>
            </div>
          </div>

        </div>

        <div className="pricing-section__global-friction">
          Start uten risiko – ingen binding
        </div>

      </div>
    </section>
  )
}
