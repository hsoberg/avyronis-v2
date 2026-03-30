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
          
          {/* Card 1 */}
          <div className="proof-card">
            <div className="proof-card__metric">+127%</div>
            <h3 className="proof-card__title">Flere henvendelser fra samme trafikk</h3>
            <p className="proof-card__text">Ved å forbedre struktur og CTA økte vi henvendelser uten mer trafikk</p>
          </div>

          {/* Card 2 */}
          <div className="proof-card">
            <div className="proof-card__metric">+82%</div>
            <h3 className="proof-card__title">Høyere konverteringsrate</h3>
            <p className="proof-card__text">Endringer i layout og budskap ga flere kunder fra samme trafikk</p>
          </div>

          {/* Card 3 */}
          <div className="proof-card">
            <div className="proof-card__metric">2.3x</div>
            <h3 className="proof-card__title">Bedre avkastning på nettsiden</h3>
            <p className="proof-card__text">Optimalisering gjorde at samme budsjett ga langt flere kunder</p>
          </div>

        </div>

        <div className="proof-section__cta">
          <h3 className="proof-section__cta-heading">Vi viser deg nøyaktig hva som kan forbedres</h3>
          <a href="#contact" className="btn btn--primary">
            <span className="btn__icon" aria-hidden="true">
              <svg className="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#01200f" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
            Få en konkret plan for din nettside
          </a>
          <p className="proof-section__microcopy">Se hva som kan forbedres – helt uforpliktende</p>
        </div>
        
      </div>
    </section>
  )
}
