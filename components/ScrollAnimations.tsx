'use client'

import { useEffect } from 'react'

export default function ScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    const observeNew = () => {
      document.querySelectorAll('.fade-up:not(.visible), .fade-in:not(.visible), .stagger:not(.visible)').forEach((el) => {
        observer.observe(el)
      })
    }

    observeNew()

    const mutationObserver = new MutationObserver(observeNew)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}
