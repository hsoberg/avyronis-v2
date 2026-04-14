import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import ScrollAnimations from '@/components/ScrollAnimations'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Arbeider & Bevis | Avyronis',
  description: 'Her er bevis på hvordan nettsider kan skape flere kunder når struktur og budskap stemmer.',
}

export default function ProofPage() {
  return (
    <>
      <ScrollAnimations />
      <Nav />
      <main>
        
        {/* 1. HERO SECTION */}
        <section className="hero-sub fade-up" style={{ paddingTop: '180px', paddingBottom: '80px', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
            <p className="hero-sub__label" style={{ color: 'var(--color-accent)', textTransform: 'uppercase', fontWeight: 600, fontSize: '14px', letterSpacing: '0.05em', marginBottom: '24px' }}>
              CASE / ARBEIDER
            </p>
            <h1 className="hero-sub__title" style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 500, color: 'var(--color-white)', lineHeight: 1.1, marginBottom: '32px' }}>
              Bevis på at struktur selger bedre enn design alene<span style={{ color: 'var(--color-accent)' }}>.</span>
            </h1>
            <p className="hero-sub__body" style={{ fontSize: '20px', color: 'var(--color-muted-70)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
              De fleste nettsider er som brosjyrer – de ser pene ut, men gjør ikke jobben sin. Her er bevis på hva som skjer når vi bygger for konvertering.
            </p>
          </div>
        </section>

        {/* 2. CASE GRID (MAIN SECTION) */}
        <section className="proof-section">
          <div className="proof-grid stagger">
            
            {/* Case 1 */}
            <article className="proof-card fade-up">
              <div className="proof-card__image-container">
                <Image 
                  src="/cases/aktiv-helse-lifestyle.png" 
                  alt="Aktiv Helse"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="proof-card__content">
                <span className="proof-card__label">Helse / fysioterapi</span>
                <div className="proof-card__metric">+68% bookinger</div>
                <h3 className="proof-card__title">Aktiv Helse</h3>
                <p className="proof-card__text" style={{ marginBottom: '24px' }}>
                  Den gamle siden fungerte kun som en oppslagstavle. Ved å innføre en visuell «Hvor har du vondt?»-funksjon og løfte frem tillitssignaler i første skjermbilde, reduserte vi friksjonen mellom smerte og booking drastisk.
                </p>
                
                <ul className="proof-card__bullets" style={{ marginBottom: '16px' }}>
                  <li>Interaktiv "Problem-velger"</li>
                  <li>Sømløs 3-stegs kundereise</li>
                  <li>Trust-signaler i front (4.9/5)</li>
                  <li>Optimalisert bookings-flyt</li>
                </ul>
                <p className="proof-card__note">Basert på analyse av faktisk brukeradferd</p>
                
                <Link href="/arbeider/aktiv-helse" className="proof-card__btn">
                  Se case
                </Link>
              </div>
            </article>

            {/* Case 2 */}
            <article className="proof-card fade-up">
              <div className="proof-card__image-container">
                <Image 
                  src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80&auto=format&fit=crop" 
                  alt="Spyle & Rørleggervakta"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="proof-card__content">
                <span className="proof-card__label">Håndverker / rørlegger</span>
                <div className="proof-card__metric">Solid kundestrøm</div>
                <h3 className="proof-card__title">Spyle & Rørleggervakta</h3>
                <p className="proof-card__text" style={{ marginBottom: '24px' }}>
                  Når røret sprekker, har man ikke tid til å lese om bedriftens historie. Vi bygget en strategisk nettside fra bunnen som spisset innholdet mot akutte behov og gjorde "Ring nå"-knappen til sidens eneste logiske steg.
                </p>
                
                <ul className="proof-card__bullets" style={{ marginBottom: '16px' }}>
                  <li>Logisk innholdsstruktur</li>
                  <li>Krystallklare tjenester</li>
                  <li>Friksjonsfri kontakt</li>
                  <li>Sømløs mobilopplevelse</li>
                </ul>
                <p className="proof-card__note">Basert på analyse av faktisk brukeradferd</p>
                
                <Link href="/arbeider/spyle-rorleggervakta" className="proof-card__btn">
                  Se case
                </Link>
              </div>
            </article>

            {/* Case 3 */}
            <article className="proof-card fade-up">
              <div className="proof-card__image-container">
                <Image 
                  src="/cases/kaffe1-lifestyle.png" 
                  alt="Kaffe1 AS"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="proof-card__content">
                <span className="proof-card__label">B2B / Kaffeløsninger</span>
                <div className="proof-card__metric">40–60% vekst</div>
                <h3 className="proof-card__title">Kaffe1 AS</h3>
                <p className="proof-card__text" style={{ marginBottom: '24px' }}>
                  Den gamle siden var en passiv produktkatalog. Vi reposisjonerte Kaffe1 som en premium B2B-partner ved å selge selve opplevelsen – med skreddersydde løsninger for kontor og lager, og "få gratis forslag"-magneter som knuser friksjon.
                </p>
                
                <ul className="proof-card__bullets" style={{ marginBottom: '16px' }}>
                  <li>Verdibasert B2B-posisjonering</li>
                  <li>Skreddersydde kundereiser</li>
                  <li>Fokus på trygg drift & service</li>
                  <li>Høy-konverterende leadsmagnet</li>
                </ul>
                <p className="proof-card__note">Basert på analyse av faktisk brukeradferd</p>
                
                <Link href="/arbeider/kaffe1" className="proof-card__btn">
                  Se hvordan
                </Link>
              </div>
            </article>

          </div>
        </section>

        {/* 3. INSIGHT SECTION */}
        <section className="connecting-section fade-up">
          <h2 className="connecting-section__title">Hvorfor fungerte dette?</h2>
          <div className="connecting-section__text">
            <p>De hadde ikke mer trafikk.</p>
            <p style={{ marginBottom: '32px' }}>De hadde ikke bedre produkter.</p>
            
            <p style={{ color: 'var(--color-white)', fontWeight: 500, fontSize: '22px' }}>
              De hadde bare nettsider som faktisk gjorde jobben sin.
            </p>

            <ul className="connecting-section__list">
              <li>Budskap over dekor – brukeren forstår verdien din på under 3 sekunder</li>
              <li>Null friksjon – vi fjerner alle unødvendige steg mellom nysgjerrighet og handel</li>
              <li>Resultatfokus – siden er bygget for å generere leads, ikke bare for å se pen ut</li>
            </ul>

            <p style={{ marginTop: '32px' }}>Det er dette de fleste mangler.</p>
            <p style={{ color: 'var(--color-white)', fontWeight: 500 }}>Og det er slik vi bygger.</p>
          </div>
        </section>

        {/* 4. FINAL CTA SECTION (CUSTOM FOR THIS PAGE) */}
        <section className="cta-section" id="contact" aria-label="Kontakt og konvertering">
          <div className="cta-section__inner fade-up">
            <p className="cta-section__pre-headline">KLAR FOR NESTE STEG?</p>
            <h2 className="cta-section__headline">Er din nettside bare en utgift – eller en salgsmaskin?</h2>
            <p className="cta-section__support">
              Jeg går gjennom siden din live og peker ut akkurat hvor du taper penger i dag. Du får en konkret plan du kan bruke med en gang.
            </p>

            <ul className="cta-section__bullets" style={{ justifyContent: 'center' }}>
              <li>Tar 10–15 min</li>
              <li>Ingen binding</li>
              <li>Kun konkrete tiltak</li>
            </ul>

            <Link href="/kontakt" className="btn btn--primary">
              Få en konkret plan for nettsiden din
            </Link>

            <p style={{ marginTop: '16px', fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-muted-70)' }}>
              Eller <a href="/kontakt" style={{ color: 'var(--color-white)', textDecoration: 'underline' }}>kontakt meg direkte</a>
            </p>
            
            <p className="cta-section__microcopy" style={{ marginTop: '24px' }}>
              Ingen synsing. Ingen fluff. Kun det som faktisk gir effekt.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
