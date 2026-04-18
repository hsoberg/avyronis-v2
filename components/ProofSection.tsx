export default function ProofSection() {
  return (
    <section className="proof-section" aria-label="Concrete Results">
      <div className="proof-section__inner fade-up">

        <div className="proof-section__header">
          <p className="proof-section__pre-headline">Dokumenterte resultater</p>
          <h2 className="proof-section__headline">Når nettsider optimaliseres riktig, skjer dette</h2>
          <p className="proof-section__support">
            Alle forbedringer er testet og basert på faktisk brukeradferd
          </p>
        </div>

        <div className="proof-section__grid">

          <div className="proof-card">
            <div
              className="proof-card__metric"
              data-metric
              data-metric-value="127"
              data-metric-prefix="+"
              data-metric-suffix="%"
            >+127%</div>
            <h3 className="proof-card__title">Flere henvendelser fra samme trafikk</h3>
            <p className="proof-card__text">Ved å forbedre struktur og CTA økte vi henvendelser uten mer trafikk</p>
            <div className="proof-card__bar" style={{ '--bar-fill': '0.9' } as React.CSSProperties}>
              <i />
            </div>
          </div>

          <div className="proof-card">
            <div
              className="proof-card__metric"
              data-metric
              data-metric-value="82"
              data-metric-prefix="+"
              data-metric-suffix="%"
            >+82%</div>
            <h3 className="proof-card__title">Høyere konverteringsrate</h3>
            <p className="proof-card__text">Endringer i layout og budskap ga flere kunder fra samme trafikk</p>
            <div className="proof-card__bar" style={{ '--bar-fill': '0.72' } as React.CSSProperties}>
              <i />
            </div>
          </div>

          <div className="proof-card">
            <div
              className="proof-card__metric"
              data-metric
              data-metric-value="2.3"
              data-metric-prefix=""
              data-metric-suffix="x"
            >2.3x</div>
            <h3 className="proof-card__title">Bedre avkastning på nettsiden</h3>
            <p className="proof-card__text">Optimalisering gjorde at samme budsjett ga langt flere kunder</p>
            <div className="proof-card__bar" style={{ '--bar-fill': '0.85' } as React.CSSProperties}>
              <i />
            </div>
          </div>

        </div>

        <div className="proof-section__cta">
          <h3 className="proof-section__cta-heading">Vi viser deg nøyaktig hva som kan forbedres</h3>
          <a href="#contact" className="btn btn--primary">
            Book en gratis gjennomgang (15 min)
          </a>
          <p className="proof-section__microcopy">Se hva som kan forbedres – helt uforpliktende</p>
        </div>

      </div>
    </section>
  )
}
