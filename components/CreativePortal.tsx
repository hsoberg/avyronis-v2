import Link from 'next/link'
import Image from 'next/image'

const creativeServices = [
  {
    id: 'music',
    label: 'Lyddesign',
    title: 'Musikk & identitet',
    href: '/tjenester/musikk',
    image: '/creative/music-cover.png',
    size: 'music'
  },
  {
    id: 'video',
    label: 'Produksjon',
    title: 'Cinematisk video',
    href: '/tjenester/video',
    image: '/creative/video-frame.png',
    size: 'video'
  },
  {
    id: 'visual',
    label: 'Branding',
    title: 'Visuell historiefortelling',
    href: '/tjenester',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80',
    size: 'visual'
  }
]

export default function CreativePortal() {
  return (
    <section className="creative-portal">
      <div className="container" style={{ marginBottom: '64px', textAlign: 'center' }}>
        <p className="services__label" style={{ marginBottom: '16px' }}>Creative Studio</p>
        <h2 className="services__heading" style={{ maxWidth: '700px', margin: '0 auto' }}>
          Vi skaper innholdet som faktisk <span className="text-accent">selger</span>
        </h2>
      </div>

      <div className="creative-grid">
        {creativeServices.map((service) => (
          <Link 
            key={service.id} 
            href={service.href}
            className={`creative-card creative-card--${service.size} fade-up`}
          >
            <div className="creative-card__img">
              <Image 
                src={service.image}
                alt={service.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="creative-card__content">
              <span className="creative-card__label">{service.label}</span>
              <h3 className="creative-card__title">{service.title}</h3>
              <div className="case-card__arrow" style={{ padding: '0', height: '32px', width: '32px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
