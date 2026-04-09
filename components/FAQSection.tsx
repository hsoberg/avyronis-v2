import Accordion from './Accordion'

const faqItems = [
  {
    id: 'faq-1',
    title: 'Hva får jeg egentlig i en gratis gjennomgangen?',
    content: (
      <>
        <p>
          Du får en konkret gjennomgang av nettsiden din med tydelige forslag til hva som bør forbedres for å få flere kunder.
        </p>

        <p>Vi viser deg nøyaktig:</p>

        <ul>
          <li>Hva som ikke fungerer</li>
          <li>Hva som kan forbedres</li>
          <li>Hva du bør gjøre videre</li>
        </ul>

        <p>
          Ingen generelle råd – kun det som faktisk gir effekt.
        </p>
      </>
    ),
  },
  {
    id: 'faq-2',
    title: 'Er dette binding eller lang kontrakt?',
    content: (
      <>
        <p>Nei. Det er ingen binding.</p>
        <p>Du kan stoppe når som helst.</p>
        <p>Vi beholder kunder fordi vi leverer resultater – ikke fordi vi låser deg til en avtale.</p>
      </>
    ),
  },
  {
    id: 'faq-3',
    title: 'Hvor raskt kan jeg forvente resultater?',
    content: (
      <>
        <p>Mange ser forbedringer raskt – spesielt når vi retter opp tydelige problemer på siden.</p>
        <p>Samtidig jobber vi kontinuerlig for å skape stabil vekst over tid, ikke bare kortsiktige løft.</p>
      </>
    ),
  },
  {
    id: 'faq-4',
    title: 'Må jeg gjøre noe selv?',
    content: (
      <>
        <p>Det er helt opp til deg.</p>
        <p>Du får konkrete tiltak du kan implementere selv, eller vi kan håndtere alt for deg.</p>
        <p>De fleste velger at vi gjør jobben – men du har full fleksibilitet.</p>
      </>
    ),
  },
  {
    id: 'faq-5',
    title: 'Passer dette for min bedrift?',
    content: (
      <>
        <p>Dette fungerer best for bedrifter som allerede har trafikk, men som ønsker flere kunder ut av den.</p>
        <p>Er du usikker, finner vi raskt ut av det i gjennomgangen.</p>
      </>
    ),
  },
  {
    id: 'faq-6',
    title: 'Hva skiller dere fra andre byråer?',
    content: (
      <>
        <p>
          De fleste byråer leverer et design og sender en faktura. Du vet sjelden om nettsiden faktisk gir deg flere kunder.
        </p>

        <p>
          Vi jobber annerledes:
        </p>

        <ul>
          <li>Alt vi gjør er basert på data og faktisk brukeradferd – ikke magefølelse</li>
          <li>Vi måler konverteringer, ikke bare besøk</li>
          <li>Vi jobber kontinuerlig med forbedringer – ikke bare én leveranse og ferdig</li>
          <li>Ingen binding. Vi beholder kunder fordi vi leverer – ikke fordi vi låser deg inn</li>
        </ul>

        <p>
          Kort sagt: vi behandler nettsiden din som et salgsinstrument, ikke et kunstverk.
        </p>
      </>
    ),
  },
  {
    id: 'faq-7',
    title: 'Hva koster det?',
    content: (
      <>
        <p>
          Vi har faste pakker tilpasset ulike behov – fra enkeltanalyser til løpende månedlig samarbeid.
        </p>
        <p>
          Prisen avhenger av hva du trenger og hvilket ambisjonsnivå du har. Vi gir deg et konkret tilbud etter gjennomgangen – ingen overraskelser.
        </p>
        <p>
          Det enkleste er å starte med den gratis gjennomgangen, så ser vi hva som gir mest mening for deg.
        </p>
      </>
    ),
  },
]

export default function FAQSection() {
  return (
    <section className="faq-section" id="faq" aria-label="Ofte stilte spørsmål">
      <div className="faq-section__inner fade-up">

        <div className="faq-section__header">
          <p className="faq-section__pre-headline">Ofte stilte spørsmål</p>
          <h2 className="faq-section__headline">Dette lurer de fleste på før de tar kontakt</h2>
          <p className="faq-section__support">
            Her er svar på det vi oftest får spørsmål om – slik at du vet nøyaktig hva du kan forvente.
          </p>
        </div>

        <div className="faq-section__list">
          <Accordion items={faqItems} />
        </div>

        <div className="faq-section__bottom">
          <a href="#contact" className="btn btn--primary">
            Book en gratis gjennomgang (15 min)
          </a>
          <p className="faq-section__microcopy">Tar 10–15 min. Helt uforpliktende.</p>
        </div>

      </div>
    </section>
  )
}
