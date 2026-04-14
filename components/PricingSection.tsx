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
            <h3 className="pricing-card__title">Kom i gang</h3>
            <div className="pricing-card__price">1 990 kr <span className="mnd">/ mnd</span></div>
            <div className="pricing-card__etab">+ 9 900 kr etablering</div>

            <p className="pricing-card__positioning">En nettside som faktisk representerer bedriften din</p>

            <ul className="pricing-card__list">
              <li>Ferdig nettside tilpasset mobil</li>
              <li>Synlig på Google</li>
              <li>Rask og brukervennlig struktur</li>
              <li>Drift og løpende oppdateringer</li>
            </ul>

            <div className="pricing-card__fit-text">For deg som trenger en nettside som faktisk representerer bedriften din</div>

            <div className="pricing-card__bottom">
              <a href="#contact" className="btn btn--secondary">Få en konkret plan for din nettside</a>
              <p className="pricing-card__microcopy">Tar 10–15 min. Ingen forpliktelser.</p>
            </div>
          </div>

          {/* Card 2 (Recommended) */}
          <div className="pricing-card pricing-card--popular">
            <div className="pricing-card__badge">Mest valgt</div>
            <h3 className="pricing-card__title">Få flere kunder</h3>
            <p className="pricing-card__recommendation">Dette er det de fleste velger</p>
            <div className="pricing-card__price">3 990 kr <span className="mnd">/ mnd</span></div>
            <div className="pricing-card__etab">+ 14 900 kr etablering</div>

            <p className="pricing-card__positioning">En nettside bygget for flere henvendelser og bedre konvertering</p>

            <ul className="pricing-card__list">
              <li>Flere henvendelser fra samme trafikk</li>
              <li>Kontinuerlig forbedring av nettsiden</li>
              <li>Fokus på konvertering og tydelige CTA-er</li>
              <li>Tiltak basert på data og brukeradferd</li>
            </ul>

            <div className="pricing-card__fit-text">For deg som vil ha flere kunder – uten å øke annonsebudsjettet</div>

            <div className="pricing-card__bottom">
              <a href="#contact" className="btn btn--primary">Få en konkret plan for din nettside</a>
              <p className="pricing-card__microcopy">Tar 10–15 min. Ingen forpliktelser.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="pricing-card">
            <h3 className="pricing-card__title">Dominer markedet</h3>
            <div className="pricing-card__price">6 990 kr <span className="mnd">/ mnd</span></div>
            <div className="pricing-card__etab">+ 19 900 kr etablering</div>

            <p className="pricing-card__positioning">En løsning for bedrifter som vil bli det naturlige valget i sin bransje</p>

            <ul className="pricing-card__list">
              <li>Strategisk innhold og synlighet</li>
              <li>A/B-testing og løpende optimalisering</li>
              <li>AI-agent for kundeservice</li>
              <li>Fullt fokus på vekst og konvertering</li>
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
