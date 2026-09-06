import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import SystemAccordionSection from '@/components/SystemAccordionSection'
import CreativePortal from '@/components/CreativePortal'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata = {
  title: 'Nettsider | Avyronis',
  description: 'Vi bygger nettsiden din, lanserer den og følger den opp med drift, synlighet og løpende forbedring.',
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
              Nettsider
            </p>
            <h1 className="hero-sub__title" style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 500, color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '32px' }}>
              Vi bygger nettsiden din. Så gjør vi den bedre over tid<span style={{ color: 'var(--color-accent)' }}>.</span>
            </h1>
            <p className="hero-sub__body" style={{ fontSize: '20px', color: 'var(--color-muted-70)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.5 }}>
              Vi bygger en rask, tydelig og profesjonell nettside rundt bedriften og kundene dine – og følger den opp med drift, synlighet, måling og konkrete forbedringer.
            </p>
            <a href="/kontakt" className="btn btn--primary" style={{ display: 'inline-flex' }}>
              Få en uforpliktende vurdering
            </a>
          </div>
        </section>

        {/* 2. REFRAME SECTION */}
        <section className="reframe-section fade-up">
          <div className="container">
            <h2 className="reframe-section__title">En nettside blir ikke ferdig på lanseringsdagen</h2>
            <div className="reframe-section__text">
              <p>De fleste nettsider blir bygget, lansert og deretter nesten glemt.</p>
              <p>Men bedriften endrer seg. Kundene endrer seg. Google endrer seg.</p>
              <p><strong>Nettsiden bør følge med.</strong></p>
              <p>Struktur, budskap, design, innhold og teknikk må spille sammen – og fortsette å gjøre det etter lansering.</p>
              <p style={{ marginTop: '24px', color: 'var(--color-white)', fontWeight: 500 }}>Det er det vi bygger, og det er det vi følger opp.</p>
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
            <h2 className="positioning-section__title">Én leverandør hele veien</h2>
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

        {/* 6. FINAL CTA SECTION */}
        <CTASection />

      </main>
      <Footer />
    </>
  )
}
