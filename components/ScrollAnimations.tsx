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
      '.pricing-card',
      '.faq-section__list .accordion__item',
    ]
    cardSelectors.forEach((sel) => {
      document.querySelectorAll(`${sel}:not(.is-in)`).forEach((el) => cardObserver.observe(el))
    })

    // ── Proof cards: reveal + count-up + bar fill ─────────────
    const proofObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const card = entry.target as HTMLElement
          card.classList.add('is-in')

          const metricEl = card.querySelector<HTMLElement>('[data-metric]')
          if (metricEl) {
            const target = parseFloat(metricEl.dataset.metricValue ?? '0')
            const prefix = metricEl.dataset.metricPrefix ?? ''
            const suffix = metricEl.dataset.metricSuffix ?? ''
            const isFloat = !Number.isInteger(target)
            const duration = 1400
            const startTime = performance.now()

            const tick = (now: number) => {
              const p = Math.min(1, (now - startTime) / duration)
              const eased = 1 - Math.pow(1 - p, 4)
              const val = target * eased
              metricEl.textContent =
                prefix + (isFloat ? val.toFixed(1) : Math.round(val)) + suffix
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }

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
