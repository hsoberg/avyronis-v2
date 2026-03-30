/* ============================================================
   BRAVEBRAND — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     NAV — Scroll state + hamburger
  ---------------------------------------------------------- */
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  function updateNavScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavScroll, { passive: true });
  updateNavScroll();

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ----------------------------------------------------------
     HERO — Word-by-word blur animation
  ---------------------------------------------------------- */
  function initHeroAnimation() {
    const headline = document.querySelector('.hero__headline');
    if (!headline) return;

    const text = headline.textContent;
    const words = text.split(' ');

    headline.innerHTML = words.map(word =>
      `<span class="word">${word}</span>`
    ).join(' ');

    const wordEls = headline.querySelectorAll('.word');
    wordEls.forEach((word, i) => {
      setTimeout(() => {
        word.classList.add('visible');
      }, 300 + i * 80);
    });
  }

  initHeroAnimation();

  /* ----------------------------------------------------------
     LOGO TICKER — Duplicate for seamless loop
  ---------------------------------------------------------- */
  function initTicker() {
    const track = document.querySelector('.ticker__track');
    if (!track) return;

    // Clone all items for seamless looping
    const items = Array.from(track.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }

  initTicker();

  /* ----------------------------------------------------------
     ACCORDION — Services + FAQ
  ---------------------------------------------------------- */
  function initAccordions() {
    document.querySelectorAll('.accordion__trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion__item');
        const isOpen = item.classList.contains('open');

        // Close siblings in same accordion
        const accordion = item.closest('.accordion');
        accordion.querySelectorAll('.accordion__item.open').forEach(openItem => {
          if (openItem !== item) {
            openItem.classList.remove('open');
            openItem.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        item.classList.toggle('open', !isOpen);
        trigger.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }

  initAccordions();

  /* ----------------------------------------------------------
     SCROLL ANIMATIONS — Intersection Observer
  ---------------------------------------------------------- */
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .fade-in, .stagger').forEach(el => {
      observer.observe(el);
    });
  }

  initScrollAnimations();

  /* ----------------------------------------------------------
     CASE CARD — Click navigation
  ---------------------------------------------------------- */
  document.querySelectorAll('.case-card[data-href]').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = card.dataset.href;
    });
  });

  /* ----------------------------------------------------------
     VIDEO — Autoplay fallback
  ---------------------------------------------------------- */
  const heroVideo = document.querySelector('.hero__video');
  if (heroVideo) {
    heroVideo.addEventListener('loadedmetadata', () => {
      heroVideo.play().catch(() => {
        // Autoplay blocked — video stays paused, static frame shows
      });
    });
  }

})();
