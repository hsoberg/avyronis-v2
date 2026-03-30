import Accordion from './Accordion'

const serviceItems = [
  {
    id: 'cro',
    title: 'Konverteringsoptimalisering (CRO)',
    defaultOpen: true,
    content: (
      <>
        <p>
          Vi finner ut nøyaktig hvorfor besøkende ikke blir kunder. Gjennom analyse, testing og 
          kontinuerlig forbedring øker vi verdien av hver eneste besøkende på nettsiden din.
        </p>
        <div className="accordion__tags">
          {['Analyse', 'A/B-testing', 'Brukerreiser', 'Vekststrategi'].map((tag) => (
            <span key={tag} className="accordion__tag">{tag}</span>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'design',
    title: 'Datadrevet Design & UX',
    content: (
      <>
        <p>
          Vi designer ikke bare for at det skal se pent ut. Vi bruker data, heatmaps og 
          psykologiske prinsipper for å guide brukeren mot målet ditt – enten det er et salg eller en henvendelse.
        </p>
        <div className="accordion__tags">
          {['UX-design', 'Heatmap-analyse', 'Wireframing', 'Prototyping'].map((tag) => (
            <span key={tag} className="accordion__tag">{tag}</span>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'tech',
    title: 'Høyytelses Nettsider',
    content: (
      <>
        <p>
          Raske nettsider konverterer bedre. Vi bygger moderne, lynraske og responsive nettsider 
          som fungerer knirkefritt på alle enheter og er optimalisert for Google.
        </p>
        <div className="accordion__tags">
          {['Next.js', 'Hastighetsoptimalisering', 'Mobil-først', 'SEO'].map((tag) => (
            <span key={tag} className="accordion__tag">{tag}</span>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'strategy',
    title: 'Strategi & Posisjonering',
    content: (
      <>
        <p>
          Uten en tydelig plan hjelper det lite med en fin nettside. Vi hjelper deg med å finne din 
          unike posisjon i markedet og spisse budskapet ditt slik at det treffer målgruppen din perfekt.
        </p>
        <div className="accordion__tags">
          {['Markedsanalyse', 'Verdiløfte', 'Konkurrentanalyse', 'Budskap'].map((tag) => (
            <span key={tag} className="accordion__tag">{tag}</span>
          ))}
        </div>
      </>
    ),
  },
]

export default function ServicesSection() {
  return (
    <section className="services" id="services" aria-label="Our services">
      <div className="services__inner">
        <div className="services__left">
          <span className="services__label">Hva vi gjør</span>
          <h2 className="services__heading">Tjenester som skaper resultater</h2>
          <p className="services__body">
            Vi bygger ikke bare nettsider – vi bygger salgsmaskiner. Alt vi gjør er forankret i data, 
            psykologi og en dyp forståelse for hvordan vi får folk til å handle.
          </p>
          <a href="#contact" className="services__cta">
            Start et prosjekt
            <svg className="icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        <Accordion items={serviceItems} />
      </div>
    </section>
  )
}
