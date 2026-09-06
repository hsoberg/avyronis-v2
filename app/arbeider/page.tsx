import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import ScrollAnimations from '@/components/ScrollAnimations'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Arbeider | Avyronis',
  description: 'Nettsider vi har bygget – og som vi fortsatt følger opp. Se hva vi gjorde, hvordan løsningen brukes i dag og hva vi jobber videre med.',
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
              Nettsider vi har bygget – og fortsatt følger opp<span style={{ color: 'var(--color-accent)' }}>.</span>
            </h1>
            <p className="hero-sub__body" style={{ fontSize: '20px', color: 'var(--color-muted-70)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
              For hver kunde: hva utfordringen var, hva vi gjorde, hvordan løsningen brukes i dag – og hva vi forbedrer videre.
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
                <div className="proof-card__outcome">Fra oppslagstavle til booking i tre steg</div>
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
                <p className="proof-card__note">Følges opp videre: nye behandlingsområder og løpende justering av bookingflyten.</p>
                
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
                <div className="proof-card__outcome">Bygget for akutte behov</div>
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
                <p className="proof-card__note">Følges opp videre: lokal synlighet og tydeligere skille mellom akutt og planlagt arbeid.</p>
                
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
                <div className="proof-card__outcome">Fra produktkatalog til B2B-partner</div>
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
                <p className="proof-card__note">Følges opp videre: nye tjenestesider og oppfølging av hvilke løsninger som etterspørres.</p>
                
                <Link href="/arbeider/kaffe1" className="proof-card__btn">
                  Se hvordan
                </Link>
              </div>
            </article>

          </div>
        </section>

        {/* 3. INSIGHT SECTION */}
        <section className="connecting-section fade-up">
          <h2 className="connecting-section__title">Hva de har til felles</h2>
          <div className="connecting-section__text">
            <p>Ingen av dem fikk en ferdig mal.</p>
            <p style={{ marginBottom: '32px' }}>Og ingen av dem ble overlatt til seg selv etter lansering.</p>
            
            <p style={{ color: 'var(--color-white)', fontWeight: 500, fontSize: '22px' }}>
              Vi startet med bedriften og kundene – og ble igjen etterpå.
            </p>

            <ul className="connecting-section__list">
              <li>Blir forstått – besøkende ser raskt hvem de hjelper og hva de tilbyr</li>
              <li>Blir funnet – strukturen er bygget så søkemotorer og AI-tjenester forstår innholdet</li>
              <li>Skaper handling – det er enkelt å ringe, sende en forespørsel eller bestille</li>
              <li>Blir bedre – vi finner neste forbedring i stedet for å vente på neste redesign</li>
            </ul>

            <p style={{ marginTop: '32px' }}>Nettsiden er ikke sluttproduktet.</p>
            <p style={{ color: 'var(--color-white)', fontWeight: 500 }}>Den er starten.</p>
          </div>
        </section>

        {/* 4. FINAL CTA SECTION (CUSTOM FOR THIS PAGE) */}
        <section className="cta-section" id="contact" aria-label="Kontakt og konvertering">
          <div className="cta-section__inner fade-up">
            <p className="cta-section__pre-headline">NESTE STEG</p>
            <h2 className="cta-section__headline">Fortell oss om nettsiden du trenger</h2>
            <p className="cta-section__support">
              Svar på noen korte spørsmål om bedriften, dagens nettside og hva du ønsker å få til. Deretter ser vi på hva som faktisk gir mening – før vi anbefaler løsning eller pris.
            </p>

            <ul className="cta-section__bullets" style={{ justifyContent: 'center' }}>
              <li>Uforpliktende</li>
              <li>Du får en konkret anbefaling</li>
              <li>Ingen ferdig salgspakke</li>
            </ul>

            <Link href="/kontakt" className="btn btn--primary">
              Få en uforpliktende vurdering
            </Link>

            <p style={{ marginTop: '16px', fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--color-muted-70)' }}>
              Eller <a href="mailto:henning@avyronis.com" style={{ color: 'var(--color-white)', textDecoration: 'underline' }}>send en e-post direkte</a>
            </p>
            
            <p className="cta-section__microcopy" style={{ marginTop: '24px' }}>
              Vi anbefaler ikke noe før vi har forstått behovet.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
