'use client'

import { useEffect } from 'react'

export default function ScrollAnimations() {
  useEffect(() => {
    // ── Legacy: .fade-up / .fade-in / .stagger ────────────────
    const legacyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            legacyObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    const observeLegacy = () => {
      document
        .querySelectorAll('.fade-up:not(.visible), .fade-in:not(.visible), .stagger:not(.visible)')
        .forEach((el) => legacyObserver.observe(el))
    }
    observeLegacy()

    // ── Cards: ps-card, hiw-card, pricing-card, faq items ────
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            cardObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const cardSelectors = [
      '.ps-card',
      '.hiw-card',
    ]
    cardSelectors.forEach((sel) => {
      document.querySelectorAll(`${sel}:not(.is-in)`).forEach((el) => cardObserver.observe(el))
    })

    // ── Outcome cards: staggered reveal ───────────────────────
    const proofObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const card = entry.target as HTMLElement
          card.classList.add('is-in')
          proofObserver.unobserve(card)
        })
      },
      { threshold: 0.25 }
    )

    document
      .querySelectorAll('.proof-section__grid .proof-card:not(.is-in)')
      .forEach((el) => proofObserver.observe(el))

    // ── CTA button glow ───────────────────────────────────────
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cta-btn-glow')
            ctaObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )
    document
      .querySelectorAll('.cta-section .btn--primary')
      .forEach((el) => ctaObserver.observe(el))

    // ── Watch for dynamic DOM additions ──────────────────────
    const mutationObserver = new MutationObserver(observeLegacy)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      legacyObserver.disconnect()
      cardObserver.disconnect()
      proofObserver.disconnect()
      ctaObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}
