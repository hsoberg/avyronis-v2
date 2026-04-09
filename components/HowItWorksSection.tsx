export default function HowItWorksSection() {
  return (
    <section className="hiw-section" aria-label="Prosessen">
      <div className="hiw-section__inner fade-up">
        
        <div className="hiw-section__header">
          <h2 className="hiw-section__headline">Slik får du flere kunder fra nettsiden din</h2>
          <p className="hiw-section__support">
            En enkel, konkret prosess – basert på data, ikke synsing
          </p>
        </div>

        <div className="hiw-section__grid">
          
          <div className="hiw-card hiw-card--highlight">
            <span className="hiw-card__number">1</span>
            <h3 className="hiw-card__title">Vi analyserer nettsiden din</h3>
            <p className="hiw-card__text">Vi finner nøyaktig hvor du mister kunder – basert på faktisk brukeradferd</p>
          </div>

          <div className="hiw-card">
            <span className="hiw-card__number">2</span>
            <h3 className="hiw-card__title">Du får konkrete forbedringer</h3>
            <p className="hiw-card__text">Du får en tydelig plan med tiltak du kan implementere med en gang – kun det som gir effekt</p>
          </div>

          <div className="hiw-card">
            <span className="hiw-card__number">3</span>
            <h3 className="hiw-card__title">Vi implementerer og tester</h3>
            <p className="hiw-card__text">Vi implementerer tiltak, tester hva som fungerer og optimaliserer basert på data</p>
          </div>

          <div className="hiw-card">
            <span className="hiw-card__number">4</span>
            <h3 className="hiw-card__title">Nettsiden din forbedres over tid</h3>
            <p className="hiw-card__text">Nettsiden blir kontinuerlig bedre – og genererer flere kunder fra samme trafikk</p>
          </div>

        </div>

        <div className="hiw-section__cta-area">
          <p className="hiw-section__friction">Du får konkrete tiltak du kan implementere selv</p>
          <a href="#contact" className="btn btn--primary">
            Book en gratis gjennomgang (15 min)
          </a>
          <p className="hiw-section__microcopy">Du får konkrete tiltak – helt uforpliktende</p>
        </div>

      </div>
    </section>
  )
}
