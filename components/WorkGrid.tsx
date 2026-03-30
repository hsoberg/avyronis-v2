import Image from 'next/image'
import Link from 'next/link'

interface CaseStudy {
  title: string
  tag: string
  description: string
  image: string
  wide?: boolean
}

const cases: CaseStudy[] = [
  {
    title: 'Momentum',
    tag: 'Brand Identity',
    description: 'Komplett merkevarebygging for en Serie A fintech-startup. Strategi, identitet og lanseringssystem.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1400&q=80&auto=format&fit=crop',
    wide: true,
  },
  {
    title: 'Roven',
    tag: 'Brand Strategy',
    description: 'Markedsposisjonering og visuell identitet for en premium SaaS-plattform inn i et overfylt marked.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80&auto=format&fit=crop',
  },
  {
    title: 'Aura',
    tag: 'Brand System',
    description: 'Fullt brandsystem for et wellnessselskap som skalerer til retail – fra identitet til butikkopplevelse.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80&auto=format&fit=crop',
  },
]

const ArrowIcon = () => (
  <svg className="icon" width="16" height="16" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function WorkGrid({ isTeaser = false }: { isTeaser?: boolean }) {
  const displayCases = isTeaser ? cases.slice(0, 2) : cases

  return (
    <section className="work" id="work" aria-label="Selected work" style={!isTeaser ? { paddingTop: '160px', paddingBottom: '40px' } : {}}>
      <div className="work__inner">
        <div className="work__header">
          <h2 className="work__title fade-up">{isTeaser ? 'Utvalgte prosjekter' : 'Våre arbeider'}</h2>
          {isTeaser && (
            <Link href="/arbeider" className="work__view-all fade-up">
              Se alle arbeider
              <ArrowIcon />
            </Link>
          )}
        </div>

        <div className="work__grid stagger">
          {displayCases.map((c) => (
            <article key={c.title} className={`case-card${c.wide ? ' case-card--wide' : ''}`}>
              <div className="case-card__image">
                <Image
                  src={c.image}
                  alt={`${c.title} — ${c.tag}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes={c.wide ? '(max-width: 809px) 100vw, 1200px' : '(max-width: 809px) 100vw, 600px'}
                  loading="lazy"
                />
                <span className="case-card__tag">{c.tag}</span>
              </div>
              <div className="case-card__body">
                <h3 className="case-card__title">{c.title}</h3>
                <p className="case-card__desc">{c.description}</p>
              </div>
              <div className="case-card__footer">
                <div className="case-card__arrow" aria-hidden="true">
                  <ArrowIcon />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
