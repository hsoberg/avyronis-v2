import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import { caseStudies } from '@/data/cases'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseData = caseStudies.find((c) => c.slug === params.slug)

  if (!caseData) {
    notFound()
  }

  return (
    <>
      <ScrollAnimations />
      <Nav />
      <main>
        
        {/* 1. HERO */}
        <section className="cd-section cd-hero fade-up">
          <span className="cd-hero__label">CASE</span>
          <h1 className="cd-hero__title">
            Fra trafikk til kunder – slik økte vi henvendelser med <span style={{ color: 'var(--color-accent)' }}>{caseData.resultMetric}</span>
          </h1>
          <p className="cd-hero__sub">
            Vi forbedret struktur, budskap og brukeropplevelse – slik at flere faktisk tok kontakt.
          </p>

          <div className="cd-meta">
            <div className="cd-meta__item">
              <span className="cd-meta__label">Bransje</span>
              <span className="cd-meta__val">{caseData.industry}</span>
            </div>
            <div className="cd-meta__item">
              <span className="cd-meta__label">Type</span>
              <span className="cd-meta__val">{caseData.type}</span>
            </div>
            <div className="cd-meta__item">
              <span className="cd-meta__label">Resultat</span>
              <span className="cd-meta__val" style={{ color: 'var(--color-accent)' }}>{caseData.resultMetric} henvendelser</span>
            </div>
          </div>

          <div className="cd-hero__actions">
            <Link href="/kontakt" className="btn btn--primary">
              Få en konkret plan for din nettside
            </Link>
            <a href="#resultat" className="cd-hero__sec-btn">Se hva vi gjorde</a>
          </div>
        </section>

        {/* 1.5 HERO SHOWCASE IMAGE (NEW) */}
        <div className="cd-full-image fade-up">
          <Image 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&auto=format&fit=crop" 
            alt="Visuell presentasjon av prosjektet"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* 2. RESULTAT */}
        <section id="resultat" className="cd-result-impact fade-up">
          <div className="cd-result__number">{caseData.resultMetric}</div>
          <div className="cd-result__label">{caseData.resultLabel}</div>

          <div className="cd-result__metrics">
            <span className="cd-result__metric-item">Lavere bounce rate</span>
            <span className="cd-result__metric-item">Lengre tid på siden</span>
            <span className="cd-result__metric-item">Flere klikk på CTA</span>
          </div>

          <p className="cd-result__exp">
            Resultatet kom ikke fra mer trafikk – men fra en nettside som faktisk fungerer.
          </p>
        </section>

        {/* 3. UTGANGSPUNKT (EDITORIAL) */}
        <section className="cd-editorial fade-up">
          <div className="cd-editorial__nav">
            <h2 className="cd-editorial__title">Problemet</h2>
          </div>
          <div className="cd-editorial__content">
            <p>Nettsiden fikk trafikk – men konverterte dårlig.</p>
            <p style={{ marginTop: '24px' }}>Besøkende:</p>
            <ul className="cd-list">
              <li>forsto ikke tydelig hva de fikk</li>
              <li>visste ikke hva de skulle gjøre videre</li>
              <li>falt fra før de tok kontakt</li>
            </ul>
            <p style={{ marginTop: '24px' }}>Dette er typisk for de fleste nettsider.</p>
          </div>
        </section>

        {/* VISUAL BREAKOUT (NEW) */}
        <div className="cd-full-image fade-up">
          <Image 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format&fit=crop" 
            alt="Analyse av nettsiden"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* 4. ANALYSE (EDITORIAL) */}
        <section className="cd-editorial fade-up">
          <div className="cd-editorial__nav">
            <h2 className="cd-editorial__title">Hva vi oppdaget</h2>
          </div>
          <div className="cd-editorial__content">
            <p>Vi analyserte hvordan brukere faktisk oppførte seg på siden. Det viste seg at:</p>
            <ul className="cd-list">
              <li>Viktig informasjon var skjult</li>
              <li>CTA-er var svake eller uklare</li>
              <li>Strukturen gjorde det vanskelig å ta neste steg</li>
            </ul>
            <p style={{ marginTop: '32px' }}>Problemet var ikke trafikken.</p>
            <p style={{ color: 'var(--color-white)', fontWeight: 500, fontSize: '24px', marginTop: '8px' }}>Det var hvordan siden fungerte.</p>
          </div>
        </section>

        {/* 5. TILTAK (EDITORIAL) */}
        <section className="cd-editorial fade-up">
          <div className="cd-editorial__nav">
            <h2 className="cd-editorial__title">Hva vi gjorde</h2>
          </div>
          <div className="cd-editorial__content">
            <div className="cd-grid-blocks" style={{ marginTop: 0 }}>
              <div className="cd-block">
                <h3>Tydeligere budskap</h3>
                <ul>
                  <li>Hva de tilbyr ble klart på sekunder</li>
                  <li>Fjernet unødvendig tekst</li>
                </ul>
              </div>
              
              <div className="cd-block">
                <h3>Bedre struktur</h3>
                <ul>
                  <li>Guidet bruker gjennom siden</li>
                  <li>Fokus på handling, ikke informasjon</li>
                </ul>
              </div>
              
              <div className="cd-block">
                <h3>Sterkere CTA-er</h3>
                <ul>
                  <li>Klare neste steg</li>
                  <li>Mindre friksjon</li>
                </ul>
              </div>
              
              <div className="cd-block">
                <h3>Optimalisert for mobil</h3>
                <ul>
                  <li>Enklere å kontakte fra mobil</li>
                  <li>Raskere opplevelse</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FØR VS ETTER (CARDS) */}
        <section className="cd-split-wrapper fade-up">
          <h2>Før og etter endringene</h2>
          <div className="cd-split">
            <div className="cd-split__col cd-split__col--before">
              <h3>Før lansering</h3>
              <ul>
                <li>Utydelig budskap</li>
                <li>Lav respons og få skjemaer</li>
                <li>Vanskelig å navigere i tjenester</li>
              </ul>
            </div>
            <div className="cd-split__col cd-split__col--after">
              <h3>Etter optimalisering</h3>
              <ul>
                <li>Klart hva de tilbyr umiddelbart</li>
                <li>Betydelig flere henvendelser hver måned</li>
                <li>Sømløs vei til kontakt</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 7. RESULTAT (EDITORIAL STORY) */}
        <section className="cd-editorial fade-up" style={{ paddingBottom: '0' }}>
          <div className="cd-editorial__nav">
            <h2 className="cd-editorial__title" style={{ color: 'var(--color-accent)' }}>Resultatet</h2>
          </div>
          <div className="cd-editorial__content">
            <p style={{ fontSize: '24px', color: 'var(--color-white)', marginBottom: '24px' }}>
              Etter endringene begynte flere å ta kontakt – uten å øke trafikken.
            </p>
            <p>
              Små, men strategiske justeringer i struktur og budskap var alt som skulle til for å generere massiv effekt for bunnlinja. 
            </p>
            <p style={{ fontStyle: 'italic', marginTop: '32px' }}>
              "Dette er forskjellen på en nettside som bare eksisterer – og en som faktisk er en ansatt som jobber for deg."
            </p>
          </div>
        </section>

        {/* 8. KEY TAKEAWAY (PULL QUOTE) */}
        <div className="cd-pull-quote fade-up">
          De fleste tror de trenger <span>mer trafikk.</span><br/>
          I virkeligheten trenger de <span>en nettside som konverterer.</span><br/>
          Det er der veksten ligger.
        </div>

        {/* 9. CTA */}
        <section className="cta-section" style={{ borderTop: '1px solid var(--color-border-light)' }}>
          <div className="cta-section__inner fade-up">
            <p className="cta-section__pre-headline">KLAR FOR NESTE STEG?</p>
            <h2 className="cta-section__headline">La oss finne ut hva som stopper deg fra å få flere kunder</h2>
            <p className="cta-section__support">Du får konkrete forbedringer du kan implementere med en gang.</p>

            <ul className="cta-section__bullets" style={{ justifyContent: 'center' }}>
              <li>Tar 10–15 min</li>
              <li>Ingen binding</li>
              <li>Kun konkrete tiltak</li>
            </ul>

            <Link href="/kontakt" className="btn btn--primary">
              Få en konkret plan for din nettside
            </Link>

            <p className="cta-section__microcopy" style={{ marginTop: '24px' }}>
              Ingen synsing. Kun det som faktisk gir effekt.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
