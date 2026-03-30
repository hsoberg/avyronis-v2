import Accordion from './Accordion'

const systemItems = [
  {
    id: 'struct',
    label: 'Struktur & konvertering',
    title: 'Vi bygger nettsiden slik at folk faktisk tar kontakt',
    defaultOpen: true,
    content: (
      <>
        <p>Vi analyserer hvordan brukerne beveger seg på siden – og bygger en struktur som leder dem mot handling.</p>
        <ul className="system-list">
          <li>Brukerflyt og struktur</li>
          <li>Wireframes og oppsett</li>
          <li>CTA-strategi</li>
          <li>Konverteringsoptimalisering (CRO)</li>
        </ul>
      </>
    ),
  },
  {
    id: 'content',
    label: 'Innhold & tekst',
    title: 'Vi gjør budskapet ditt tydelig og overbevisende',
    content: (
      <>
        <p>Vi sørger for at budskapet er klart, relevant og får folk til å forstå hvorfor de skal velge deg.</p>
        <ul className="system-list">
          <li>Tekst og copywriting</li>
          <li>Struktur på innhold</li>
          <li>Tydelige budskap og CTA-er</li>
          <li>Innhold som bygger tillit</li>
        </ul>
      </>
    ),
  },
  {
    id: 'visual',
    label: 'Design & visuelt',
    title: 'Vi sørger for at nettsiden føles profesjonell og troverdig',
    content: (
      <>
        <p>Design handler ikke bare om hvordan det ser ut – men hvordan det oppleves og hvilke signaler det sender.</p>
        <ul className="system-list">
          <li>Design og layout</li>
          <li>Visuell profil</li>
          <li>Bilder og video</li>
          <li>Grafiske elementer</li>
        </ul>
      </>
    ),
  },
  {
    id: 'tech',
    label: 'Teknisk & ytelse',
    title: 'Vi sørger for at nettsiden fungerer raskt og stabilt',
    content: (
      <>
        <p>Teknisk kvalitet påvirker direkte hvor mange kunder du mister – eller beholder.</p>
        <ul className="system-list">
          <li>Hastighet og ytelse</li>
          <li>Mobiloptimalisering</li>
          <li>Teknisk struktur</li>
          <li>Grunnleggende SEO</li>
        </ul>
      </>
    ),
  },
  {
    id: 'opt',
    label: 'Optimalisering',
    title: 'Vi forbedrer nettsiden over tid – basert på data',
    content: (
      <>
        <p>En nettside er aldri ferdig. Vi tester og forbedrer kontinuerlig for å få mer ut av trafikken.</p>
        <ul className="system-list">
          <li>Analyse av brukeradferd</li>
          <li>Testing og justeringer</li>
          <li>Datadrevne forbedringer</li>
          <li>Løpende optimalisering</li>
        </ul>
      </>
    ),
  },
]

export default function SystemAccordionSection() {
  return (
    <section className="system-section" id="system">
      <div className="system-section__inner fade-up">
        
        <div className="system-section__left">
          <h2 className="system-section__headline">Dette gjør vi for å få nettsiden din til å prestere</h2>
          <p className="system-section__body">
            Vi jobber med alle delene som påvirker om en besøkende blir kunde.
          </p>
        </div>

        <div className="system-section__right">
          <Accordion items={systemItems} />
        </div>

      </div>
    </section>
  )
}
