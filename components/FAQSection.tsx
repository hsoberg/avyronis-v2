import Accordion from './Accordion'

const faqItems = [
  {
    id: 'faq-1',
    title: 'Hva får jeg i en uforpliktende vurdering?',
    content: (
      <>
        <p>
          Du forteller oss litt om bedriften, dagens nettside og hva du ønsker å få til. Deretter får du en
          konkret anbefaling tilbake.
        </p>

        <p>Vi ser på:</p>

        <ul>
          <li>Hva nettsiden bør gjøre bedre</li>
          <li>Hva som er viktigst å ta først</li>
          <li>Hva som er riktig neste steg for dere</li>
        </ul>

        <p>
          Ingen ferdig salgspakke. Vi anbefaler ikke noe før vi har forstått behovet.
        </p>
      </>
    ),
  },
  {
    id: 'faq-2',
    title: 'Er dette binding eller lang kontrakt?',
    content: (
      <>
        <p>Nei. Det er ingen bindingstid på drift.</p>
        <p>Du kan stoppe når som helst, og du eier nettsiden, domenet og innholdet 100 %.</p>
        <p>Vi beholder kunder fordi vi følger dem opp – ikke fordi vi låser dem til en avtale.</p>
      </>
    ),
  },
  {
    id: 'faq-3',
    title: 'Hvor lang tid tar det å få en ny nettside?',
    content: (
      <>
        <p>En typisk nettside er klar på tre til fire uker fra vi starter.</p>
        <p>
          Tiden går med til å forstå bedriften og kundene, bygge struktur, innhold og design, og deretter
          lansere med måling og søkemotoroppsett på plass.
        </p>
        <p>Større prosjekter med mange sider eller integrasjoner tar lengre tid – det avklarer vi før vi starter.</p>
      </>
    ),
  },
  {
    id: 'faq-4',
    title: 'Må jeg gjøre noe selv?',
    content: (
      <>
        <p>Du trenger ikke å bli webansvarlig.</p>
        <p>
          Vi trenger innspill om bedriften, tjenestene og kundene dine i starten. Etter lansering sender du
          behovet til oss, så håndterer vi det.
        </p>
        <p>Vil du gjøre endringer selv, legger vi til rette for det.</p>
      </>
    ),
  },
  {
    id: 'faq-5',
    title: 'Passer dette for min bedrift?',
    content: (
      <>
        <p>
          Dette passer for bedrifter som trenger en ny nettside, har en utdatert side, eller har en side som
          ikke gjør jobben den skal.
        </p>
        <p>
          Du trenger ikke å ha mye trafikk fra før, og du trenger ikke å kunne noe om SEO eller konvertering.
          Det er vår jobb.
        </p>
      </>
    ),
  },
  {
    id: 'faq-6',
    title: 'Må jeg ha et abonnement?',
    content: (
      <>
        <p>Nei. Du kan kjøpe kun nettsiden, og så drifte den selv.</p>
        <p>
          Abonnementet finnes for deg som ikke ønsker å administrere nettsiden selv – som vil at hosting,
          oppdateringer, synlighet og forbedringer blir tatt hånd om uten at du må følge med.
        </p>
        <p>De fleste velger oppfølging, men det er ikke et krav.</p>
      </>
    ),
  },
  {
    id: 'faq-7',
    title: 'Hva skiller dere fra andre byråer?',
    content: (
      <>
        <p>
          De fleste byråer bygger nettsiden, sender en faktura og går videre. Et par år senere er siden
          utdatert, og du starter på nytt.
        </p>

        <p>
          Vi jobber annerledes:
        </p>

        <ul>
          <li>Vi blir igjen etter lansering og følger opp nettsiden videre</li>
          <li>Du snakker direkte med den som gjør jobben – ingen prosjektleder i mellom</li>
          <li>Vi måler hvordan siden blir funnet og brukt, og forbedrer den løpende</li>
          <li>Ingen bindingstid, faste priser og fullt eierskap for deg</li>
        </ul>

        <p>
          Kort sagt: andre bygger nettsiden og går videre. Vi bygger den – og blir igjen.
        </p>
      </>
    ),
  },
  {
    id: 'faq-8',
    title: 'Hva koster det?',
    content: (
      <>
        <p>
          Vi skiller mellom å bygge nettsiden og å følge den opp etterpå:
        </p>
        <ul>
          <li><strong>Først bygger vi nettsiden:</strong> fra 9 900 kr eks. mva (inkluderer inntil 4 sider, responsivt design, kontaktskjema, SEO og analyseoppsett). Omfang og pris avtales etter at vi har sett på behovet.</li>
          <li><strong>Etter lansering velger du oppfølging:</strong> Trygghet 990 kr/mnd, Synlighet 1 490 kr/mnd eller Vekst 2 990 kr/mnd. Ved årlig fakturering får du 2 måneder gratis.</li>
        </ul>
        <p>
          Ingen bindingstid, 100 % eierskap til domene og innhold, og fast timepris på 990 kr eks. mva for eventuelt ekstraarbeid.
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
          <h2 className="faq-section__headline">Dette lurer de fleste på</h2>
          <p className="faq-section__support">
            Her er svar på det vi oftest får spørsmål om – slik at du vet nøyaktig hva du kan forvente.
          </p>
        </div>

        <div className="faq-section__list">
          <Accordion items={faqItems} />
        </div>

        <div className="faq-section__bottom">
          <a href="/kontakt" className="btn btn--primary">
            Få en uforpliktende vurdering
          </a>
          <p className="faq-section__microcopy">Ingen ferdig salgspakke. Først finner vi ut hva dere faktisk trenger.</p>
        </div>

      </div>
    </section>
  )
}
