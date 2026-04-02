import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import Image from 'next/image'

export const metadata = {
  title: 'Kontakt | Avyronis',
  description: 'Få en konkret plan for nettsiden din. Ingen binding, kun konkrete tiltak.',
}

export default function ContactPage() {
  return (
    <>
      <ScrollAnimations />
      <Nav />
      <main>

        {/* 1. HERO SECTION */}
        <section className="hero-sub fade-up" style={{ paddingTop: '160px', paddingBottom: '40px', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
            <h1 className="hero-sub__title" style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 500, color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '24px' }}>
              Få en konkret plan for nettsiden din – og se hva som stopper deg fra flere kunder<span style={{ color: 'var(--color-accent)' }}>.</span>
            </h1>
            <p className="hero-sub__body" style={{ fontSize: '20px', color: 'var(--color-muted-70)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
              Jeg viser deg hva som stopper deg fra flere kunder – og hva du bør gjøre for å få flere.
            </p>
          </div>
        </section>

        {/* 2. MAIN 2-COLUMN SECTION */}
        <div className="contact-layout fade-up">

          {/* LEFT: Trust & Person */}
          <div className="contact-trust">
            <div className="contact-trust__image-wrap">
              <Image
                src="/henning-avyronis-portrett.webp"
                alt="Henning - Avyronis"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                sizes="(max-width: 899px) 100vw, 50vw"
                priority
              />
            </div>

            {/* The Trust Card */}
            <div className="trust-card fade-up">
              <h2 className="trust-card__headline">Du snakker direkte med meg – ikke et salgsteam</h2>
              
              <p className="trust-card__text">
                Jeg går gjennom nettsiden din og viser deg nøyaktig hvor du mister kunder – og hva du bør gjøre for å få flere.
              </p>
              
              <p className="trust-card__reinforcement">
                De fleste blir overrasket over hvor mye som kan forbedres med små justeringer.
              </p>
              
              <div style={{ marginTop: '8px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, color: 'var(--color-white)' }}>Du får konkret:</span>
                <ul className="trust-card__list">
                  <li>Nøyaktig hvor du mister kunder</li>
                  <li>Hva du bør endre – steg for steg</li>
                  <li>Hva som faktisk gir flere henvendelser</li>
                </ul>
              </div>
              
              <div>
                <span className="contact-trust__badge">
                  Svarer vanligvis innen noen timer – ofte raskere
                </span>
              </div>
              
              <p className="trust-card__credibility">
                Vi jobber med et begrenset antall kunder om gangen – slik at vi faktisk kan levere resultater.
              </p>
            </div>
          </div>

          {/* RIGHT: High-Converting Form */}
          <div className="contact-form-container">
            <form className="contact-form" action="mailto:henning@avyronis.com" method="POST" encType="text/plain">

              <div className="form-group">
                <label htmlFor="name">Navn</label>
                <input type="text" id="name" name="Navn" className="form-input" placeholder="Ditt navn" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-post</label>
                <input type="email" id="email" name="Epost" className="form-input" placeholder="din@epost.no" required />
              </div>

              <div className="form-group">
                <label htmlFor="website">Nettside (valgfritt)</label>
                <input type="url" id="website" name="Nettside" className="form-input" placeholder="www.dinbedrift.no" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Hva ønsker du å oppnå? (valgfritt)</label>
                <textarea id="message" name="Melding" className="form-textarea" placeholder="Beskriv kort hva du ønsker å oppnå..."></textarea>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button type="submit" className="btn btn--primary" style={{ width: '100%', padding: '20px', fontSize: '18px', justifyContent: 'center' }}>
                  Se hva som stopper deg fra flere kunder
                </button>
                <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--color-muted-70)', fontFamily: 'var(--font-body)' }}>
                  Tar 10–15 min. Helt uforpliktende.
                </p>
              </div>
            </form>

            {/* 3. DIRECT CONTACT (SECONDARY OPTION) */}
            <div className="direct-contact">
              <p>Vil du heller ta det direkte?</p>
              <div className="direct-contact__links">
                <a href="tel:+4799000000">+47 99 00 00 00</a>
                <span style={{ color: 'var(--color-muted-70)', opacity: 0.5 }}>|</span>
                <a href="mailto:henning@avyronis.com">henning@avyronis.com</a>
              </div>
            </div>

          </div>
        </div>

        {/* 4. WHAT HAPPENS NEXT */}
        <section className="contact-steps fade-up">
          <h2 className="contact-steps__title">Hva skjer etter du tar kontakt?</h2>
          <div className="contact-steps__grid">
            <div className="contact-step">
              <div className="contact-step__number">1</div>
              <p className="contact-step__text">Vi analyserer nettsiden din</p>
            </div>
            <div className="contact-step">
              <div className="contact-step__number">2</div>
              <p className="contact-step__text">Du får konkrete forbedringer</p>
            </div>
            <div className="contact-step">
              <div className="contact-step__number">3</div>
              <p className="contact-step__text">Vi viser deg hva som faktisk gir flere kunder</p>
            </div>
          </div>
        </section>

        {/* 5. TRUST / RISK REDUCTION */}
        <div className="contact-trust-footer fade-up">
          <ul className="contact-trust-footer__bullets">
            <li>Ingen binding</li>
            <li>Ingen synsing</li>
            <li>Kun konkrete tiltak</li>
          </ul>
          <p className="contact-trust-footer__sub">
            Du kan velge å gjøre tiltakene selv – eller få hjelp av oss.
          </p>
        </div>

      </main>
      <Footer />
    </>
  )
}
