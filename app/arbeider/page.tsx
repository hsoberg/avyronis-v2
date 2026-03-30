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
              Dette skjer når nettsider faktisk fungerer<span style={{ color: 'var(--color-accent)' }}>.</span>
            </h1>
            <p className="hero-sub__body" style={{ fontSize: '20px', color: 'var(--color-muted-70)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
              Her er eksempler på hvordan små og mellomstore bedrifter kan få flere kunder med bedre struktur, tydeligere budskap og sterkere CTA-er.
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
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1400&q=80&auto=format&fit=crop" 
                  alt="Aktiv Helse"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="proof-card__content">
                <span className="proof-card__label">Helse / fysioterapi</span>
                <div className="proof-card__metric">+68% flere henvendelser</div>
                <h3 className="proof-card__title">Aktiv Helse</h3>
                <p className="proof-card__text" style={{ marginBottom: '24px' }}>
                  Vi fjernet friksjon i booking, tydeliggjorde behandlingstilbudet og gjorde det enklere å ta kontakt. Resultatet var flere henvendelser fra samme trafikk.
                </p>
                
                <ul className="proof-card__bullets" style={{ marginBottom: '16px' }}>
                  <li>Klarere budskap</li>
                  <li>Tydeligere CTA-er</li>
                  <li>Forenklet bookingflyt</li>
                  <li>Bedre mobilopplevelse</li>
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
                <div className="proof-card__metric">2.1x flere kundehenvendelser</div>
                <h3 className="proof-card__title">Spyle & Rørleggervakta</h3>
                <p className="proof-card__text" style={{ marginBottom: '24px' }}>
                  Vi gjorde siden mer direkte, bygget rundt akutte behov og forenklet kontaktpunktene. Det førte til betydelig flere kundehenvendelser.
                </p>
                
                <ul className="proof-card__bullets" style={{ marginBottom: '16px' }}>
                  <li>Bedre struktur på innhold</li>
                  <li>Tydeligere tjenester</li>
                  <li>Sterkere CTA-er</li>
                  <li>Optimalisert mobilopplevelse</li>
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
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80&auto=format&fit=crop" 
                  alt="Kaffe1 AS"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="proof-card__content">
                <span className="proof-card__label">Kafé / lokal bedrift</span>
                <div className="proof-card__metric">+40–60% flere henvendelser</div>
                <h3 className="proof-card__title">Kaffe1 AS</h3>
                <p className="proof-card__text" style={{ marginBottom: '24px' }}>
                  Vi tydeliggjorde tilbudet, gjorde meny og bestilling mer tilgjengelig, og forbedret strukturen – slik at flere tok kontakt og bestilte.
                </p>
                
                <ul className="proof-card__bullets" style={{ marginBottom: '16px' }}>
                  <li>Tydeligere presentasjon av tilbud</li>
                  <li>Enklere vei til bestilling</li>
                  <li>Bedre struktur og flyt</li>
                  <li>Optimalisert for mobilbruk</li>
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
              <li>Tydelig budskap – du forstår hva de tilbyr på sekunder</li>
              <li>Enkelt å ta kontakt – ingen friksjon</li>
              <li>Fokus på handling – ikke bare informasjon</li>
            </ul>

            <p style={{ marginTop: '32px' }}>Det er dette de fleste mangler.</p>
            <p style={{ color: 'var(--color-white)', fontWeight: 500 }}>Og det er dette vi fikser.</p>
          </div>
        </section>

        {/* 4. FINAL CTA SECTION (CUSTOM FOR THIS PAGE) */}
        <section className="cta-section" id="contact" aria-label="Kontakt og konvertering">
          <div className="cta-section__inner fade-up">
            <p className="cta-section__pre-headline">KLAR FOR NESTE STEG?</p>
            <h2 className="cta-section__headline">La oss finne ut hva som stopper deg fra å få flere kunder</h2>
            <p className="cta-section__support">
              Du får en konkret gjennomgang av nettsiden din – med tydelige tiltak du kan implementere med en gang.
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
