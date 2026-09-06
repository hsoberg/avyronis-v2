import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import Image from 'next/image'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Kontakt | Avyronis',
  description: 'Fortell oss om nettsiden du trenger. Du får en konkret anbefaling – uten forpliktelser.',
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
              Fortell oss om nettsiden du trenger<span style={{ color: 'var(--color-accent)' }}>.</span>
            </h1>
            <p className="hero-sub__body" style={{ fontSize: '20px', color: 'var(--color-muted-70)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
              Svar på noen korte spørsmål om bedriften, dagens nettside og hva du ønsker å få til. Deretter ser vi på hva som faktisk gir mening – før vi anbefaler løsning eller pris.
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
            <ContactForm />

            {/* 3. DIRECT CONTACT (SECONDARY OPTION) */}
            <div className="direct-contact">
              <p>Vil du heller ta det direkte?</p>
              <div className="direct-contact__links">
                <a href="tel:+4798288634">+47 98 28 86 34</a>
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
              <p className="contact-step__text">Vi blir kjent med bedriften og kundene dine</p>
            </div>
            <div className="contact-step">
              <div className="contact-step__number">2</div>
              <p className="contact-step__text">Du får en konkret anbefaling</p>
            </div>
            <div className="contact-step">
              <div className="contact-step__number">3</div>
              <p className="contact-step__text">Vi blir enige om riktig neste steg</p>
            </div>
          </div>
        </section>

        {/* 5. TRUST / RISK REDUCTION */}
        <div className="contact-trust-footer fade-up">
          <ul className="contact-trust-footer__bullets">
            <li>Uforpliktende</li>
            <li>Ingen ferdig salgspakke</li>
            <li>Du eier alt vi lager</li>
          </ul>
          <p className="contact-trust-footer__sub">
            Vi anbefaler ikke noe før vi har forstått behovet.
          </p>
        </div>

      </main>
      <Footer />
    </>
  )
}
