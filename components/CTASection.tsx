export default function CTASection({
  overline = 'Klar for neste steg?',
  headline = 'Få en konkret plan for nettsiden din',
  body = 'Vi viser deg nøyaktig hva som bør forbedres – og hvilke tiltak som gir flest kunder.',
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
          <li>Tar 10–15 min</li>
          <li>Ingen forpliktelser</li>
          <li>Du får konkrete tiltak du kan bruke med en gang</li>
        </ul>

        <div className="cta-section__actions">
            <a href="mailto:henning@avyronis.com?subject=Få en konkret plan for min nettside" className="btn btn--primary btn--large">
              Få en konkret plan for din nettside
            </a>
            
            <a href="mailto:henning@avyronis.com" className="cta-section__secondary">
              eller kontakt oss direkte
            </a>

            <p className="cta-section__trust">
              Ingen binding. Ingen synsing. Kun konkrete tiltak.
            </p>
        </div>

      </div>
    </section>
  )
}
