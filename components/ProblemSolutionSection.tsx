export default function ProblemSolutionSection() {
  return (
    <section className="problem-solution" aria-label="Problem og Løsning">
      <div className="problem-solution__inner fade-up">
        
        <div className="problem-solution__header">
          <p className="problem-solution__pre-headline">De fleste nettsider mister kunder hver dag</p>
          <h2 className="problem-solution__headline">Konverteringsoptimalisering (CRO) for norske bedrifter – mer ut av trafikken du allerede har</h2>
        </div>

        <div className="problem-solution__grid">
          
          {/* Card 1 */}
          <div className="ps-card">
            <div className="ps-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h3 className="ps-card__title">Nettsider som ikke skaper kunder</h3>
            <ul className="ps-card__list">
              <li>Besøkende som ikke konverterer</li>
              <li>Trafikk uten målbar effekt</li>
              <li>Uklart budskap</li>
              <li>Ingen tydelig retning</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="ps-card">
            <div className="ps-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
            <h3 className="ps-card__title">Slik jobber vi</h3>
            <ul className="ps-card__list">
              <li>Analyse av brukeradferd</li>
              <li>Identifiserer hvor kunder faller fra</li>
              <li>Tester og optimaliserer kontinuerlig</li>
              <li>Implementerer tiltak som gir effekt raskt</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="ps-card ps-card--highlight">
            <div className="ps-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <h3 className="ps-card__title">Resultatet</h3>
            <ul className="ps-card__list">
              <li>Flere henvendelser fra samme trafikk</li>
              <li>Høyere konverteringsrate</li>
              <li>Bedre avkastning på nettsiden</li>
              <li>Kontinuerlig forbedring basert på data</li>
            </ul>
          </div>

        </div>

        <p className="problem-solution__transition">Se hvordan vi gjør dette i praksis ↓</p>
      </div>
    </section>
  )
}
