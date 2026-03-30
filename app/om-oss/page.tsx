import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata = {
  title: 'Om Oss | Avyronis',
  description: 'Vi er et spesialisert byrå som fokuserer på én ting: å få nettsiden din til å konvertere bedre.',
}

export default function AboutPage() {
  return (
    <>
      <ScrollAnimations />
      <Nav />
      <main>
        <section className="hero-sub" style={{ paddingTop: '180px', paddingBottom: '80px' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
            <p className="hero-sub__label" style={{ color: 'var(--color-accent)', textTransform: 'uppercase', fontWeight: 600, fontSize: '14px', letterSpacing: '0.05em', marginBottom: '24px' }}>
              Om Avyronis
            </p>
            <h1 className="hero-sub__title" style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 500, color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '40px' }}>
              Vi fjerner gjetting fra vekstprosessen<span style={{ color: 'var(--color-accent)' }}>.</span>
            </h1>
            
            <div className="about-content" style={{ color: 'var(--color-muted-70)', fontSize: '18px', lineHeight: 1.6 }}>
              <p style={{ marginBottom: '24px' }}>
                De fleste nettsider er bygget for å se pene ut. Vi bygger nettsider for å skape resultater. 
                Avyronis ble startet med en enkel visjon: å hjelpe bedrifter med å utnytte det fulle 
                potensialet i trafikken de allerede har.
              </p>
              
              <h2 style={{ color: 'var(--color-white)', fontSize: '28px', marginTop: '48px', marginBottom: '24px' }}>Vår Filosofi</h2>
              <p style={{ marginBottom: '24px' }}>
                Vi tror ikke på synsing. Vi tror på data. Hvert designvalg, hver tekstlinje og hver 
                teknisk optimalisering vi gjør er basert på reell brukeradferd og veltesterte prinsipper 
                for konvertering.
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '40px 0' }}>
                {[
                  'Datadrevet beslutningstaking',
                  'Radikal ærlighet om hva som fungerer',
                  'Fokus på ROI (avkastning på investering)',
                  'Kontinuerlig læring og forbedring'
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', color: 'var(--color-white)', fontWeight: 500 }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--color-accent)', borderRadius: '50%', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="about-case" style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center', background: 'var(--color-bg-card)', padding: '40px', borderRadius: '24px', border: '1px solid var(--color-border-light)' }}>
                <div style={{ position: 'relative', height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
                    <img 
                        src="/Oystein_aktivhelse.jpg" 
                        alt="Øystein Grindstad" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                    />
                </div>
                <div>
                    <h3 style={{ color: 'var(--color-white)', fontSize: '24px', marginBottom: '16px' }}>Resultatet for Aktiv Helse AS</h3>
                    <p style={{ marginBottom: '24px' }}>
                        Gjennom et tett samarbeid med Øystein Grindstad har vi transformert Aktiv Helse AS 
                        sin digitale tilstedeværelse. Fokus var på å forenkle brukerreisen og tydeliggjøre 
                        verdiløftet.
                    </p>
                    <blockquote style={{ color: 'var(--color-white)', fontStyle: 'italic', borderLeft: '3px solid var(--color-accent)', paddingLeft: '20px', marginBottom: '24px' }}>
                        "Samarbeidet med Avyronis har gitt oss en nettside som ikke bare ser profesjonell ut, 
                        men som faktisk genererer mer forretning hver eneste uke."
                    </blockquote>
                    <span style={{ display: 'block', color: 'var(--color-white)', fontWeight: 600 }}>Øystein Grindstad</span>
                    <span style={{ fontSize: '14px' }}>Daglig leder, Aktiv Helse AS</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
