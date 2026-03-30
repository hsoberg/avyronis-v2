import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata = {
  title: 'Innsikt | Avyronis',
  description: 'Strategier, tips og dypdykk i hvordan du øker konverteringen på nettsiden din.',
}

export default function InsightsPage() {
  return (
    <>
      <ScrollAnimations />
      <Nav />
      <main>
        <section className="hero-sub" style={{ paddingTop: '180px', paddingBottom: '120px', textAlign: 'center' }}>
          <div className="container">
            <p className="hero-sub__label" style={{ color: 'var(--color-accent)', textTransform: 'uppercase', fontWeight: 600, fontSize: '14px', letterSpacing: '0.05em', marginBottom: '24px' }}>
              Innsikt & Strategi
            </p>
            <h1 className="hero-sub__title" style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 500, color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '32px' }}>
              Coming Soon<span style={{ color: 'var(--color-accent)' }}>.</span>
            </h1>
            <p className="hero-sub__body" style={{ fontSize: '20px', color: 'var(--color-muted-70)', maxWidth: '600px', margin: '0 auto' }}>
              Vi jobber med å ferdigstille våre dypdykk i konverteringsoptimalisering, brukeradferd og datadrevet design. Meld deg på under for å få beskjed når vi lanserer.
            </p>
          </div>
        </section>
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
