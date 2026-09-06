import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import ScrollAnimations from '@/components/ScrollAnimations'

export const metadata = {
  title: 'Om Avyronis | Avyronis',
  description: 'Andre bygger nettsiden og går videre. Vi bygger den – og blir igjen. Én leverandør til å bygge, drifte og videreutvikle nettsiden din.',
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
              Andre bygger nettsiden og går videre. Vi blir igjen<span style={{ color: 'var(--color-accent)' }}>.</span>
            </h1>
            
            <div className="about-content" style={{ color: 'var(--color-muted-70)', fontSize: '18px', lineHeight: 1.6 }}>
              <p style={{ marginBottom: '24px' }}>
                De fleste nettsider blir bygget, lansert og deretter nesten glemt. Avyronis ble startet fordi
                det burde fungere annerledes: bedriften din endrer seg, kundene endrer seg og Google endrer seg –
                og nettsiden bør følge med.
              </p>
              
              <h2 style={{ color: 'var(--color-white)', fontSize: '28px', marginTop: '48px', marginBottom: '24px' }}>Vår filosofi</h2>
              <p style={{ marginBottom: '24px' }}>
                En god nettside blir ikke ferdig på lanseringsdagen. Vi starter derfor ikke med en ferdig mal –
                vi ser først på bedriften, kundene og hva nettsiden faktisk skal hjelpe deg med. Deretter bygger
                vi løsningen, og fortsetter å forbedre den etter lansering.
              </p>
              <p style={{ marginBottom: '24px' }}>
                Du skal ikke måtte bli webansvarlig fordi du kjøper en nettside. Du har en bedrift å drive –
                du sender behovet til oss, så hjelper vi deg videre.
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '40px 0' }}>
                {[
                  'Kompetent – vi kan faget, du slipper å kunne det',
                  'Tilgjengelig – fast kontaktperson, ingen ticket-kø',
                  'Proaktiv – vi sier fra før du må spørre',
                  'Transparent – faste priser og ingen bindingstid',
                  'Langsiktig – vi blir igjen etter lansering'
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
                        src="/hf_20260410_094220_669317af-37a3-455e-b975-8cfb9dda9d6f.png" 
                        alt="Nettsiden til Aktiv Helse AS" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                    />
                </div>
                <div>
                    <h3 style={{ color: 'var(--color-white)', fontSize: '24px', marginBottom: '16px' }}>Fra oppslagstavle til booking i tre steg</h3>
                    <p style={{ marginBottom: '24px' }}>
                        For Aktiv Helse AS gjorde vi det tydelig hvem de hjelper og hva de tilbyr, og enkelt
                        å ta kontakt. Etter lansering følger vi siden opp videre.
                    </p>
                    <a href="/arbeider/aktiv-helse" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>
                        Se hele caset →
                    </a>
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
