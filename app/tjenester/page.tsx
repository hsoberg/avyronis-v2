import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import SystemAccordionSection from '@/components/SystemAccordionSection'
import CreativePortal from '@/components/CreativePortal'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata = {
  title: 'Tjenester | Avyronis',
  description: 'Alt som skal til for at nettsiden din faktisk skaper kunder.',
}

export default function ServicesPage() {
  return (
    <>
      <ScrollAnimations />
      <Nav />
      <main>
        
        {/* 1. HERO SECTION */}
        <section className="hero-sub" style={{ paddingTop: '180px', paddingBottom: '80px', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
            <p className="hero-sub__label" style={{ color: 'var(--color-accent)', textTransform: 'uppercase', fontWeight: 600, fontSize: '14px', letterSpacing: '0.05em', marginBottom: '24px' }}>
              Våre Tjenester
            </p>
            <h1 className="hero-sub__title" style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 500, color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '32px' }}>
              Alt som skal til for at nettsiden din faktisk skaper kunder<span style={{ color: 'var(--color-accent)' }}>.</span>
            </h1>
            <p className="hero-sub__body" style={{ fontSize: '20px', color: 'var(--color-muted-70)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.5 }}>
              Nettsiden er bare starten. Vi bygger, forbedrer og optimaliserer alt rundt den – slik at flere tar kontakt og blir kunder.
            </p>
            <a href="#contact" className="btn btn--primary" style={{ display: 'inline-flex' }}>
              Få en konkret plan for nettsiden din
            </a>
          </div>
        </section>

        {/* 2. REFRAME SECTION */}
        <section className="reframe-section fade-up">
          <div className="container">
            <h2 className="reframe-section__title">En nettside fungerer ikke alene</h2>
            <div className="reframe-section__text">
              <p>De fleste forbedrer én ting av gangen – design, tekst eller trafikk.</p>
              <p>Problemet er at det ikke er én ting som avgjør om nettsiden fungerer.</p>
              <p><strong>Det er helheten.</strong></p>
              <p>Struktur, budskap, design, innhold og hvordan brukeren opplever siden – alt må spille sammen.</p>
              <p style={{ marginTop: '24px', color: 'var(--color-white)', fontWeight: 500 }}>Det er det vi bygger.</p>
            </div>
          </div>
        </section>

        {/* 3. CORE SYSTEM SECTION */}
        <SystemAccordionSection />

        {/* 3.5 CREATIVE STUDIO SECTION */}
        <CreativePortal />

        {/* 4. POSITIONING SECTION */}
        <section className="positioning-section fade-up">
          <div className="container">
            <h2 className="positioning-section__title">Alt henger sammen</h2>
            <div className="positioning-section__text">
              <p>De fleste jobber med enkeltområder.</p>
              <p>Design. Tekst. Trafikk.</p>
              <p>Vi jobber med alt samtidig.</p>
              <p style={{ marginTop: '24px', color: 'var(--color-white)', fontWeight: 500 }}>
                Det er derfor nettsiden faktisk begynner å prestere – og ikke bare ser bra ut.
              </p>
            </div>
          </div>
        </section>

        {/* 5. OPTIONAL MINI PROOF */}
        <section className="mini-proof-section fade-up">
          <div className="container">
            <blockquote className="mini-proof__quote">
              "Små justeringer i struktur og budskap ga oss betydelig flere henvendelser – uten mer trafikk."
            </blockquote>
          </div>
        </section>

        {/* 6. FINAL CTA SECTION */}
        <CTASection />

      </main>
      <Footer />
    </>
  )
}
