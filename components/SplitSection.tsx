import Image from 'next/image'

export default function SplitSection() {
  return (
    <section className="split-section" id="about" aria-label="About Avyronis">
      <div className="split-section__inner">
        <div className="split-section__image fade-in">
          <Image
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80&auto=format&fit=crop"
            alt="Brand strategy session"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 809px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
        <div className="split-section__content">
          <span className="split-section__label fade-up">Hvem vi er</span>
          <h2 className="split-section__heading fade-up">
            Vi bygger nettsider som gir autoritet og øker omsetningen
          </h2>
          <p className="split-section__body fade-up">
            Avyronis er et nettside- og brandingstudio for ambisiøse grunnleggere som nekter å bli ignorert.
            Vi kombinerer strategisk tenkning med dristig visuell identitet for å skape nettsider som ikke
            bare ser bra ut – de selger.
          </p>
          <a href="#work" className="split-section__link fade-up">
            Se hva vi har laget
            <svg className="icon" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
