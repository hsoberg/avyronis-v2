export default function CTASection({
  overline = 'Neste steg',
  headline = 'Fortell oss om nettsiden du trenger',
  body = 'Svar på noen korte spørsmål om bedriften, dagens nettside og hva du ønsker å få til. Deretter ser vi på hva som faktisk gir mening – før vi anbefaler løsning eller pris.',
}: {
  overline?: string
  headline?: string
  body?: string
}) {
  return (
    <section className="cta-section" id="contact" aria-label="Kontakt og konvertering">
      <div className="cta-section__inner fade-up">
        
        <p className="cta-section__pre-headline">{overline}</p>
        <h2 className="cta-section__headline">{headline}</h2>
        <p className="cta-section__support">{body}</p>

        <ul className="cta-section__bullets">
          <li>Uforpliktende</li>
          <li>Du får en konkret anbefaling</li>
          <li>Vi anbefaler ikke noe før vi har forstått behovet</li>
        </ul>

        <div className="cta-section__actions">
            <a href="/kontakt" className="btn btn--primary btn--large">
              Få en uforpliktende vurdering →
            </a>
            
            <a href="mailto:henning@avyronis.com" className="cta-section__secondary">
              eller send en e-post direkte
            </a>

            <p className="cta-section__trust">
              Ingen ferdig salgspakke. Først finner vi ut hva dere faktisk trenger.
            </p>
        </div>

      </div>
    </section>
  )
}
