'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Arbeider', href: '/arbeider' },
  { label: 'Tjenester', href: '/tjenester' },
  { label: 'Innsikt', href: '/innsikt' },
  { label: 'Kontakt', href: '/kontakt' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav__inner">
          <Link href="/" className="nav__logo" aria-label="Avyronis Home">
            <span className="nav__logo-text">
              Avyronis<span className="text-accent">.</span>
            </span>
          </Link>

          <div className="nav__links" role="list">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav__link" role="listitem">
                {link.label}
              </a>
            ))}
          </div>

          <a href="/#contact" className="nav__cta">
            Ta kontakt
            <svg className="icon" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          <button
            className={`nav__hamburger${menuOpen ? ' active' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-menu__links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="mobile-menu__link" onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="/#contact" className="mobile-menu__cta" onClick={closeMenu}>
          Ta kontakt →
        </a>
      </div>
    </>
  )
}
