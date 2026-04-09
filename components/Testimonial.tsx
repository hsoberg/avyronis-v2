import Image from 'next/image'

export default function Testimonial() {
  return (
    <section className="testimonial" aria-label="Client testimonial">
      {/* Background portrait — right 45% of the section */}
      <div className="testimonial__bg" aria-hidden="true">
        <Image
          src="/Oystein_aktivhelse.jpg"
          alt="Øystein Grindstad"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          sizes="45vw"
          loading="lazy"
        />
      </div>
      <div className="testimonial__overlay" aria-hidden="true" />
      <div className="testimonial__content">
        <blockquote className="testimonial__quote fade-up">
  &ldquo;
  <span>Etter at Avyronis tok over nettsiden vår, har vi fått jevn tilstrømning av nye pasienter – uten å måtte bruke mer tid på markedsføring selv.</span>
  
  <span>Nettsiden forklarer tydelig hva vi tilbyr, og gjør det enkelt for folk å ta kontakt.</span>
  
  <span className="highlight">Den fungerer nå som en viktig del av driften vår – ikke bare en side som ‘ligger der’.</span>
  &rdquo;
</blockquote>
        <div className="testimonial__author fade-up">
          <span className="testimonial__author-name">Øystein Grindstad</span>
          <span className="testimonial__author-title">Daglig leder, Aktiv Helse AS</span>
        </div>
        <a href="#contact" className="testimonial__cta fade-up">
          La oss jobbe sammen
          <svg className="icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </section>
  )
}
