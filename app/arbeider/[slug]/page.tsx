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
            {caseData.isNewSite 
              ? <>Slik bygget vi en kundemaskin for {caseData.title}</>
              : <>Slik økte vi konverteringer for {caseData.title} med <span style={{ color: 'var(--color-accent)' }}>{caseData.resultMetric}</span></>
            }
          </h1>
          <p className="cd-hero__sub">
            {caseData.isNewSite 
              ? 'Vi bygget og lanserte en komplett digital profil optimalisert for handling og konvertering.' 
              : 'Vi transformerte en passiv informasjonsside til en aktiv kundemaskin drevet av psykologi og UX.'}
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
              <span className="cd-meta__val" style={{ color: 'var(--color-accent)' }}>{caseData.resultMetric} {caseData.resultLabel}</span>
            </div>
          </div>

          <div className="cd-hero__actions">
            <Link href="/kontakt" className="btn btn--primary">
              Få en konkret plan for din nettside
            </Link>
            <a href="#resultat" className="cd-hero__sec-btn">Se hva vi gjorde</a>
          </div>
        </section>

        {/* 1.5 HERO SHOWCASE IMAGE (NEW FULL WIDTH OR DUAL DEVICE MOCKUP) */}
        <div className="cd-full-image fade-up" style={{ padding: '60px 24px', backgroundColor: 'transparent', overflow: 'visible' }}>
          {caseData.fullWidthImage ? (
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Image 
                  src={caseData.fullWidthImage} 
                  alt={caseData.title}
                  width={1400}
                  height={800}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="mockup-showcase">
              <div className="mockup-macbook">
                <div className="mockup-macbook__notch"></div>
                <div className="mockup-macbook__screen">
                  <Image 
                    src={caseData.desktopImage || (caseData.liveUrl ? `https://s.wordpress.com/mshots/v1/https://${caseData.liveUrl}?w=1200` : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&auto=format&fit=crop")} 
                    alt="Desktop visning"
                    fill
                    priority
                    unoptimized={!!caseData.liveUrl && !caseData.desktopImage}
                  />
                </div>
              </div>
              
              <div className="mockup-phone">
                <div className="mockup-phone__notch"></div>
                <div className="mockup-phone__screen">
                  <Image 
                    src={caseData.mobileImage || (caseData.liveUrl ? `https://s.wordpress.com/mshots/v1/https://${caseData.liveUrl}?v=1&w=480` : "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&q=80&auto=format&fit=crop")} 
                    alt="Mobil visning"
                    fill
                    unoptimized={!!caseData.liveUrl && !caseData.mobileImage}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. RESULTAT */}
        <section id="resultat" className="cd-result-impact fade-up">
          <div className="cd-result__number">{caseData.resultMetric}</div>
          <div className="cd-result__label">{caseData.resultLabel}</div>

          <div className="cd-result__metrics">
            <span className="cd-result__metric-item">{caseData.isNewSite ? 'Høyt engasjement' : 'Lavere bounce rate'}</span>
            <span className="cd-result__metric-item">{caseData.isNewSite ? 'Fokusert navigasjon' : 'Lengre tid på siden'}</span>
            <span className="cd-result__metric-item">{caseData.isNewSite ? 'Umiddelbar kontakt' : 'Flere klikk på CTA'}</span>
          </div>

          <p className="cd-result__exp">
            {caseData.isNewSite 
              ? 'Resultatet kom ikke fra et stort markedsføringsbudsjett – men fra et skreddersydd fundament.' 
              : 'Resultatet kom ikke fra mer trafikk – men fra en nettside som faktisk fungerer.'}
          </p>
        </section>

        {/* 3. UTGANGSPUNKT (EDITORIAL) */}
        <section className="cd-editorial fade-up">
          <div className="cd-editorial__nav">
            <h2 className="cd-editorial__title">{caseData.isNewSite ? 'Bakgrunnen' : 'Problemet'}</h2>
          </div>
          <div className="cd-editorial__content">
            <p>
              {caseData.isNewSite 
                ? 'Målet var å skape en digital tilstedeværelse som umiddelbart skaffet nye kunder.' 
                : 'Nettsiden fikk trafikk – men konverterte dårlig.'}
            </p>
            <p style={{ marginTop: '24px' }}>Besøkende:</p>
            <ul className="cd-list">
              {caseData.isNewSite ? (
                <>
                  <li>Helt ny aktør trenger trygg posisjonering</li>
                  <li>Kunder har ofte kritiske, akutte behov</li>
                  <li>Rask kontakt fra mobil er avgjørende</li>
                </>
              ) : (
                <>
                  <li>forsto ikke tydelig hva de fikk</li>
                  <li>visste ikke hva de skulle gjøre videre</li>
                  <li>falt fra før de tok kontakt</li>
                </>
              )}
            </ul>
            <p style={{ marginTop: '24px' }}>{caseData.isNewSite ? 'Krav til nettsiden:' : 'Dette er typisk for de fleste nettsider.'}</p>
          </div>
        </section>

        {/* VISUAL BREAKOUT (NEW MACBOOK MOCKUP) - ONLY IF NO FULL WIDTH IMAGE */}
        {!caseData.fullWidthImage && (
          <div className="cd-full-image fade-up" style={{ padding: '80px 24px', backgroundColor: 'var(--color-bg-alt)' }}>
            <div className="mockup-macbook">
              <div className="mockup-macbook__notch"></div>
              <div className="mockup-macbook__screen">
                <Image 
                  src={caseData.desktopImage || (caseData.liveUrl ? `https://s.wordpress.com/mshots/v1/https://${caseData.liveUrl}?w=1200` : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format&fit=crop")} 
                  alt="Detaljert design"
                  fill
                  unoptimized={!!caseData.liveUrl && !caseData.desktopImage}
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. ANALYSE (EDITORIAL) */}
        <section className="cd-editorial fade-up">
          <div className="cd-editorial__nav">
            <h2 className="cd-editorial__title">{caseData.isNewSite ? 'Strategiske valg' : 'Hva vi oppdaget'}</h2>
          </div>
          <div className="cd-editorial__content">
            <p>
              {caseData.isNewSite 
                ? 'Vi analyserte bransjen og målgruppen for å bygge en side som traff markedet umiddelbart:' 
                : 'Vi analyserte hvordan brukere faktisk oppførte seg på siden. Det viste seg at:'}
            </p>
            <ul className="cd-list">
              {caseData.isNewSite ? (
                <>
                  <li>Fokus på umiddelbar verdi og tillit</li>
                  <li>Eliminering av alle unødvendige steg</li>
                  <li>Informasjonsarkitektur bygget for fart og handling</li>
                </>
              ) : (
                <>
                  <li>Viktig informasjon var skjult</li>
                  <li>CTA-er var svake eller uklare</li>
                  <li>Strukturen gjorde det vanskelig å ta neste steg</li>
                </>
              )}
            </ul>
            <p style={{ marginTop: '32px' }}>{caseData.isNewSite ? 'Suksessen lå i fundamentet.' : 'Problemet var ikke trafikken.'}</p>
            <p style={{ color: 'var(--color-white)', fontWeight: 500, fontSize: '24px', marginTop: '8px' }}>
              {caseData.isNewSite ? 'En side skreddersydd for salg.' : 'Det var hvordan siden fungerte.'}
            </p>
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
                <h3>{caseData.isNewSite ? 'Sylskarp posisjonering' : 'Tydeligere budskap'}</h3>
                <ul>
                  <li>Hva de tilbyr ble klart på sekunder</li>
                  <li>Fjernet unødvendig tekst</li>
                </ul>
              </div>
              
              <div className="cd-block">
                <h3>{caseData.isNewSite ? 'Konverteringsdrevet struktur' : 'Bedre struktur'}</h3>
                <ul>
                  <li>Guidet bruker gjennom siden</li>
                  <li>Fokus på handling, ikke informasjon</li>
                </ul>
              </div>
              
              <div className="cd-block">
                <h3>{caseData.isNewSite ? 'Sømløs vei til kontakt' : 'Sterkere CTA-er'}</h3>
                <ul>
                  <li>Klare neste steg</li>
                  <li>Mindre friksjon</li>
                </ul>
              </div>
              
              <div className="cd-block">
                <h3>{caseData.isNewSite ? 'Mobil-først opplevelse' : 'Optimalisert for mobil'}</h3>
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
          <h2>{caseData.isNewSite ? 'Strategi og utførelse' : 'Før og etter endringene'}</h2>
          <div className="cd-split">
            <div className={`cd-split__col ${caseData.isNewSite ? '' : 'cd-split__col--before'}`}>
              <h3>{caseData.isNewSite ? 'Behov' : 'Før lansering'}</h3>
              <ul>
                {caseData.isNewSite ? (
                  <>
                    <li>Manglet en digital plattform</li>
                    <li>Måtte fange opp akutte kunder direkte</li>
                    <li>Trengte en leadsmotor</li>
                  </>
                ) : (
                  <>
                    <li>Utydelig budskap</li>
                    <li>Lav respons og få skjemaer</li>
                    <li>Vanskelig å navigere i tjenester</li>
                  </>
                )}
              </ul>
            </div>
            <div className={`cd-split__col ${caseData.isNewSite ? '' : 'cd-split__col--after'}`}>
              <h3>{caseData.isNewSite ? 'Løsning' : 'Etter lansering'}</h3>
              <ul>
                {caseData.isNewSite ? (
                  <>
                    <li>Lanserte med et sylskarpt budskap</li>
                    <li>Konverterer fra dag én</li>
                    <li>Problemfri kontakt for kundene</li>
                  </>
                ) : (
                  <>
                    <li>Klart hva de tilbyr umiddelbart</li>
                    <li>Betydelig flere henvendelser hver måned</li>
                    <li>Sømløs vei til kontakt</li>
                  </>
                )}
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
              {caseData.isNewSite 
                ? 'Etter lansering begynte telefonene å ringe umiddelbart.' 
                : 'Etter endringene begynte flere å ta kontakt – uten å øke trafikken.'}
            </p>
            <p>
              {caseData.isNewSite 
                ? 'En gjennomtenkt struktur og et sylskarp budskap fra dag én sørget for massiv effekt for bunnlinja.' 
                : 'Små, men strategiske justeringer i struktur og budskap var alt som skulle til for å generere massiv effekt for bunnlinja.'}
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
