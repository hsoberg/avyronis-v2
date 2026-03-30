import Link from 'next/link'

const pages = [
  { label: 'Arbeider', href: '/arbeider' },
  { label: 'Om oss', href: '/#about' },
  { label: 'Tjenester', href: '/#services' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Kontakt', href: '/#contact' },
]

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter / X', href: '#' },
  { label: 'Dribbble', href: '#' },
]

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__brand-name">Avyronis</span>
            <p className="footer__tagline">
              Vi bygger nettsider som gjør besøkende til kunder – ikke bare pent design.
            </p>
          </div>

          <nav aria-label="Footer pages">
            <p className="footer__col-title">Sider</p>
            <ul className="footer__links">
              {pages.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="footer__link">{p.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Social links">
            <p className="footer__col-title">Sosiale medier</p>
            <ul className="footer__links">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="footer__link" rel="noopener noreferrer">{s.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© {new Date().getFullYear()} Avyronis. Alle rettigheter forbeholdt.</p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Personvern</a>
            <a href="#" className="footer__bottom-link">Vilkår</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
