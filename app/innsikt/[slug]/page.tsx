import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import ScrollAnimations from '@/components/ScrollAnimations'
import Accordion from '@/components/Accordion'
import { insights } from '@/data/insights'

export function generateStaticParams() {
  return insights.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = insights.find((a) => a.slug === slug)
  if (!article) return {}

  return {
    title: `${article.title} | Avyronis`,
    description: article.description || article.excerpt,
  }
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = insights.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  // Format FAQs for the Accordion component
  const faqAccordionItems = article.faqItems.map((faq, i) => ({
    id: `faq-${i}`,
    title: faq.q,
    content: <p style={{ margin: 0 }}>{faq.a}</p>
  }))

  return (
    <>
      <ScrollAnimations />
      <Nav />
      <main>
        
        <article className="insight-article fade-up" style={{ padding: '160px 24px 80px' }}>
          
          <Link href="/innsikt" style={{ 
            display: 'inline-block', 
            color: 'var(--color-muted-50)', 
            marginBottom: '40px',
            fontFamily: 'var(--font-body)',
            textDecoration: 'none'
          }}>
            ← Tilbake til Innsikt
          </Link>

          <span className="insight-badge" style={{ display: 'block', width: 'max-content', marginBottom: '24px' }}>
            {article.tag}
          </span>
          
          <h1 className="insight-h1">
            {article.title}
          </h1>

          <div className="insight-meta" style={{ marginTop: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--color-border-light)', marginBottom: '48px' }}>
            <span style={{ color: 'var(--color-white)', fontWeight: 500 }}>Avyronis</span>
            <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-muted-50)' }}></span>
            <span>{article.date}</span>
            <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-muted-50)' }}></span>
            <span>⏱ {article.read} lesetid</span>
          </div>

          <p className="insight-p" style={{ fontSize: '24px', color: 'var(--color-white)', marginBottom: '48px' }}>
            {article.lead}
          </p>

          <div className="insight-content">
            {article.content}
          </div>

        </article>

        {article.faqItems && article.faqItems.length > 0 && (
          <section className="container fade-up" style={{ padding: '80px 24px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="insight-h2" style={{ textAlign: 'center', marginTop: 0 }}>Vanlige spørsmål</h2>
            <Accordion items={faqAccordionItems} />
          </section>
        )}

        {/* BOTTOM CTA */}
        <div style={{ borderTop: '1px solid var(--color-border-light)' }}>
          <CTASection 
            overline="KLAR FOR NESTE STEG?"
            headline={article.ctaTitle}
            body={article.ctaText}
          />
        </div>

      </main>
      <Footer />
    </>
  )
}
