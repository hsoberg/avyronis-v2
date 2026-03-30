const cards = [
  {
    number: '01',
    title: 'Autoritet',
    body: 'Vi posisjonerer nettsiden din som det åpenbare valget i markedet. Når folk møter deg, forstår de umiddelbart hvorfor du er annerledes – og hvorfor det betyr noe.',
  },
  {
    number: '02',
    title: 'Emosjon',
    body: 'Beslutninger er emosjonelle. Vi designer nettsider som skaper en visceral reaksjon – den typen som får folk til å føle noe før de har lest et ord.',
  },
  {
    number: '03',
    title: 'Vekst',
    body: 'En god nettside er din mest verdifulle ressurs. Den bygger seg opp over tid, tiltrekker seg bedre kunder og lar deg ta betalt for det du faktisk er verdt.',
  },
]

export default function ProcessSection() {
  return (
    <section className="process" aria-label="Our process">
      <div className="process__inner">
        <div className="process__header">
          <h2 className="process__title fade-up">
            En Avyronis-nettside gjør at besøkende merker deg – og velger deg.
          </h2>
        </div>
        <div className="process__cards stagger">
          {cards.map((card) => (
            <div className="process__card" key={card.number}>
              <span className="process__card-number">{card.number}</span>
              <h3 className="process__card-title">{card.title}</h3>
              <p className="process__card-body">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
