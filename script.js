/* ================================================================
   CREATIVE SPARK — SCRIPT.JS
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ────────────────────────────────────────────────
     Init Lucide Icons
  ──────────────────────────────────────────────── */
  if (typeof lucide !== 'undefined') lucide.createIcons();


  /* ────────────────────────────────────────────────
     1. NAVBAR — scroll state & active link tracking
  ──────────────────────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link:not(.nav-cta)');
  const sections  = document.querySelectorAll('section[id]');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      const top    = sec.offsetTop - 120;
      const bottom = top + sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    updateNavbar();
    updateActiveLink();
  });
  updateNavbar();


  /* ────────────────────────────────────────────────
     2. HAMBURGER MENU
  ──────────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* ────────────────────────────────────────────────
     3. SMOOTH SCROLL for anchor links
  ──────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ────────────────────────────────────────────────
     4. SCROLL REVEAL — Intersection Observer
  ──────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ────────────────────────────────────────────────
     5. ANIMATED COUNTERS
  ──────────────────────────────────────────────── */
  const counters    = document.querySelectorAll('.stat-num');
  let countersRan   = false;

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step     = 16;
    const steps    = Math.ceil(duration / step);
    let   count    = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(count);
      }
    }, step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersRan) {
      countersRan = true;
      counters.forEach(animateCounter);
      statsObserver.disconnect();
    }
  }, { threshold: 0.4 });

  const statsBand = document.querySelector('.stats-band');
  if (statsBand) statsObserver.observe(statsBand);


  /* ────────────────────────────────────────────────
     6. PORTFOLIO FILTER
  ──────────────────────────────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide cards
      portfolioCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          // Retrigger reveal animation
          card.classList.remove('in-view');
          setTimeout(() => card.classList.add('in-view'), 10);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  /* ────────────────────────────────────────────────
     7. TESTIMONIALS CAROUSEL
  ──────────────────────────────────────────────── */
  const track       = document.getElementById('testiTrack');
  const cards       = track ? track.querySelectorAll('.testi-card') : [];
  const dots        = document.querySelectorAll('.testi-dot');
  const prevBtn     = document.getElementById('testiPrev');
  const nextBtn     = document.getElementById('testiNext');
  let   currentIdx  = 0;
  let   autoTimer;

  function goToSlide(idx) {
    currentIdx = (idx + cards.length) % cards.length;
    if (track) {
      track.style.transform = `translateX(-${currentIdx * 100}%)`;
      track.style.transition = 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentIdx - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentIdx + 1); resetAuto(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); resetAuto(); }));

  function startAuto() {
    autoTimer = setInterval(() => goToSlide(currentIdx + 1), 5000);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  if (track) {
    // Make the track a flex container with no wrap
    track.style.display = 'flex';
    track.style.flexWrap = 'nowrap';
    cards.forEach(c => {
      c.style.flex = '0 0 100%';
      c.style.minWidth = '0';
    });
    startAuto();
  }

  // Touch / swipe support
  let touchStartX = 0;
  if (track) {
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        goToSlide(diff > 0 ? currentIdx + 1 : currentIdx - 1);
        resetAuto();
      }
    }, { passive: true });
  }


  /* ────────────────────────────────────────────────
     8. CONTACT FORM
  ──────────────────────────────────────────────── */
  const form        = document.getElementById('contactForm');
  const successMsg  = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const required = form.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#e05050';
          field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
        }
      });

      if (!valid) return;

      // Simulate form submission (replace with your backend / EmailJS / Formspree)
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Message Sent ✓';
        if (successMsg) successMsg.classList.add('visible');
        form.reset();
        setTimeout(() => {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
          if (successMsg) successMsg.classList.remove('visible');
        }, 5000);
        // Re-add the icon after lucide init
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }, 1200);
    });
  }


  /* ────────────────────────────────────────────────
     9. SCROLL TO TOP BUTTON
  ──────────────────────────────────────────────── */
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ────────────────────────────────────────────────
     10. FOOTER YEAR
  ──────────────────────────────────────────────── */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ────────────────────────────────────────────────
     11. HERO IMAGE PARALLAX (subtle)
  ──────────────────────────────────────────────── */
  const heroGrid = document.querySelector('.hero-grid');
  if (heroGrid && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroGrid.style.transform = `translateY(${y * 0.25}px)`;
      }
    }, { passive: true });
  }

}); // end DOMContentLoaded
