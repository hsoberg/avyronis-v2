import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AudioShowcase from '@/components/AudioShowcase'
import ScrollAnimations from '@/components/ScrollAnimations'
import CTASection from '@/components/CTASection'

export const metadata = {
  title: 'Musikk & Lyddesign | Avyronis',
  description: 'Vi skaper den auditive identiteten som får merkevaren din til å huskes.',
}

export default function MusicServicePage() {
  return (
    <>
      <ScrollAnimations />
      <Nav />
      <main>
        {/* 1. HERO */}
        <section className="hero-sub" style={{ paddingTop: '180px', paddingBottom: '80px', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
            <p className="hero-sub__label" style={{ color: 'var(--color-accent)', textTransform: 'uppercase', fontWeight: 600, fontSize: '14px', letterSpacing: '0.05em', marginBottom: '24px' }}>
              Creative Studio
            </p>
            <h1 className="hero-sub__title" style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 500, color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '32px' }}>
              Lyden av din <span className="text-accent">suksess.</span>
            </h1>
            <p className="hero-sub__body" style={{ fontSize: '20px', color: 'var(--color-muted-70)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.5 }}>
              Vi skaper skreddersydde lydlandskap, bakgrunnsmusikk og lyddesign som forsterker budskapet ditt og bygger en dypere emosjonell tilkobling.
            </p>
          </div>
        </section>

        {/* 2. INTERACTIVE PLAYER SECTION */}
        <section style={{ backgroundColor: '#050505', paddingBottom: '120px' }}>
          <div className="container">
            <h2 className="services__heading" style={{ textAlign: 'center', marginBottom: '48px', fontSize: '32px' }}>
              Hør eksempler på Avyronis Soundscapes
            </h2>
            <AudioShowcase />
          </div>
        </section>

        {/* 3. CAPABILITIES */}
        <section className="reframe-section fade-up">
           <div className="container">
             <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
                <div>
                    <h2 className="reframe-section__title" style={{ textAlign: 'left', margin: 0 }}>Hvorfor lyddesign?</h2>
                    <p style={{ color: 'var(--color-muted-70)', fontSize: '18px', marginTop: '24px' }}>
                        Lyd er den raskeste veien til brukernes følelser. Med riktig musikk kan du styre stemningen, øke tilliten og gjøre budskapet ditt umulig å glemme.
                    </p>
                </div>
                <ul className="system-list" style={{ padding: 0 }}>
                    <li>Auditiv merkevarebygging</li>
                    <li>Bakgrunnsmusikk for video og annonser</li>
                    <li>Lydeffekter og UX-lyd</li>
                    <li>Podcast-produksjon og lyddesign</li>
                </ul>
             </div>
           </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  )
}
