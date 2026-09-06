export default function OutcomesSection() {
  return (
    <section className="proof-section" aria-label="Hva nettsiden skal gjøre">
      <div className="proof-section__inner fade-up">

        <div className="proof-section__header">
          <p className="proof-section__pre-headline">Resultatet</p>
          <h2 className="proof-section__headline">En nettside som gjør jobben sin</h2>
        </div>

        <div className="proof-section__grid">

          <div className="proof-card">
            <h3 className="proof-card__title">Blir forstått</h3>
            <p className="proof-card__text">
              Besøkende skal raskt forstå hvem dere hjelper, hva dere tilbyr og hvorfor de bør velge dere.
            </p>
          </div>

          <div className="proof-card">
            <h3 className="proof-card__title">Blir funnet</h3>
            <p className="proof-card__text">
              Vi bygger strukturen slik at Google og moderne AI-baserte søketjenester lettere kan forstå
              virksomheten og innholdet.
            </p>
          </div>

          <div className="proof-card">
            <h3 className="proof-card__title">Skaper handling</h3>
            <p className="proof-card__text">
              Det skal være enkelt å ringe, sende en forespørsel, bestille eller gjøre det som er viktigst
              for bedriften.
            </p>
          </div>

          <div className="proof-card">
            <h3 className="proof-card__title">Blir tatt vare på</h3>
            <p className="proof-card__text">
              Hosting, tekniske oppdateringer, overvåking og nødvendige justeringer håndteres etter lansering.
            </p>
          </div>

          <div className="proof-card">
            <h3 className="proof-card__title">Blir bedre</h3>
            <p className="proof-card__text">
              Vi bruker data og faktiske behov til å finne neste forbedring – i stedet for å vente flere år
              på neste redesign.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}
