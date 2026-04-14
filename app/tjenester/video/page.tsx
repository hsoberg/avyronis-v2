import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Image from 'next/image'
import ScrollAnimations from '@/components/ScrollAnimations'
import CTASection from '@/components/CTASection'

export const metadata = {
  title: 'Cinematisk Video | Avyronis',
  description: 'Vi lager videoene som fanger oppmerksomhet og konverterer seere til kunder.',
}

export default function VideoServicePage() {
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
              Historier som <span className="text-accent">beveger.</span>
            </h1>
            <p className="hero-sub__body" style={{ fontSize: '20px', color: 'var(--color-muted-70)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.5 }}>
              Fra "Shorts" som treffer trendene, til kinomatisk innhold som bygger autoritet. Vi produserer videoen som får folk til å stoppe opp.
            </p>
          </div>
        </section>

        {/* 2. VIDEO SHOWCASE GRID */}
        <section style={{ paddingBottom: '120px' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
            
            <div className="video-card fade-up" style={{ gridColumn: 'span 2' }}>
                <div className="video-placeholder" style={{ 
                    position: 'relative', 
                    aspectRatio: '16/9', 
                    background: '#111', 
                    borderRadius: '24px', 
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <Image 
                      src="/creative/video-frame.png"
                      alt="Main Video Showcase"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="video-overlay" style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        background: 'rgba(0,0,0,0.3)'
                    }}>
                        <div className="play-btn" style={{ 
                            width: '80px', 
                            height: '80px', 
                            background: 'var(--color-white)', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}>
                             <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}><path d="M8 5V19L19 12L8 5Z" /></svg>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '24px' }}>
                    <h3 style={{ fontSize: '24px', color: '#fff' }}>Brand Narrative: Avyronis Studio</h3>
                    <p style={{ color: 'var(--color-muted-70)' }}>Cinematisk storytelling for moderne merkevarer.</p>
                </div>
            </div>

            <div className="video-card fade-up">
                <div style={{ aspectRatio: '9/16', background: '#111', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
                    <Image src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80" alt="Short Form" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ marginTop: '16px' }}>
                    <h3 style={{ fontSize: '18px', color: '#fff' }}>The "Shorts" Strategy</h3>
                    <p style={{ color: 'var(--color-muted-70)', fontSize: '14px' }}>Høy-tempo innhold for TikTok & Reels.</p>
                </div>
            </div>

            <div className="video-card fade-up">
                 <div style={{ aspectRatio: '9/16', background: '#111', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
                    <Image src="https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80" alt="Product Demo" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ marginTop: '16px' }}>
                    <h3 style={{ fontSize: '18px', color: '#fff' }}>Product Demo Reel</h3>
                    <p style={{ color: 'var(--color-muted-70)', fontSize: '14px' }}>Vis frem kvaliteten i det du leverer.</p>
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
