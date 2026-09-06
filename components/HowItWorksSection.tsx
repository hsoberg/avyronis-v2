export default function HowItWorksSection() {
  return (
    <section className="hiw-section" id="modell" aria-label="Slik jobber vi">
      <div className="hiw-section__inner fade-up">

        <div className="hiw-section__header">
          <h2 className="hiw-section__headline">Slik jobber vi</h2>
          <p className="hiw-section__support">
            Fra første samtale til løpende forbedring
          </p>
        </div>

        <div className="hiw-section__grid">

          <div className="hiw-card hiw-card--highlight">
            <span className="hiw-card__number">01</span>
            <h3 className="hiw-card__title">Vi forstår</h3>
            <p className="hiw-card__text">Bedriften, kundene og målene dine</p>
          </div>

          <div className="hiw-card">
            <span className="hiw-card__number">02</span>
            <h3 className="hiw-card__title">Vi bygger</h3>
            <p className="hiw-card__text">Struktur, innhold, design og teknologi</p>
          </div>

          <div className="hiw-card">
            <span className="hiw-card__number">03</span>
            <h3 className="hiw-card__title">Vi lanserer</h3>
            <p className="hiw-card__text">Måling, SEO og nødvendige integrasjoner</p>
          </div>

          <div className="hiw-card">
            <span className="hiw-card__number">04</span>
            <h3 className="hiw-card__title">Vi forbedrer</h3>
            <p className="hiw-card__text">Basert på data, behov og utviklingen i bedriften</p>
          </div>

        </div>

        <p className="hiw-section__statement">
          Nettsiden er ikke sluttproduktet. Den er starten.
        </p>

      </div>
    </section>
  )
}
