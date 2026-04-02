import Link from 'next/link'

const pages = [
  { label: 'Arbeider', href: '/arbeider' },
  { label: 'Om oss', href: '/#about' },
  { label: 'Tjenester', href: '/#services' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Kontakt', href: '/#contact' },
]



export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__brand-name">
              Avyronis<span className="text-accent">.</span>
            </span>
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


        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© {new Date().getFullYear()} Avyronis<span className="text-accent">.</span> Alle rettigheter forbeholdt.</p>
          <div className="footer__bottom-links">
            <a href="/personvern" className="footer__bottom-link">Personvern</a>
            <a href="/cookies" className="footer__bottom-link">Cookies</a>
            <a href="/vilkar" className="footer__bottom-link">Vilkår</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
