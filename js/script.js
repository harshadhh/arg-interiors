/* ============================================================
   ARG INTERIOR DESIGN STUDIO — GLOBAL SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PAGE TRANSITION OUT ── */
  const pt = document.querySelector('.page-transition');
  if (pt) {
    setTimeout(() => pt.classList.add('out'), 60);
  }

  /* ── CUSTOM CURSOR ── */
  const cursor   = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  if (cursor && follower && window.innerWidth > 768) {
    let fx = 0, fy = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => {
      cx = e.clientX; cy = e.clientY;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
    });

    const followMouse = () => {
      fx += (cx - fx) * 0.12;
      fy += (cy - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(followMouse);
    };
    followMouse();

    /* Expand cursor on interactive elements */
    document.querySelectorAll('a, button, .btn, .proj-card, .hamburger').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width   = '18px';
        cursor.style.height  = '18px';
        follower.style.width  = '56px';
        follower.style.height = '56px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width   = '10px';
        cursor.style.height  = '10px';
        follower.style.width  = '36px';
        follower.style.height = '36px';
      });
    });
  }

  /* ── NAVBAR SCROLL ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── HAMBURGER MENU ── */
  const hamburger  = document.querySelector('.hamburger');
  const navMobile  = document.querySelector('.nav-mobile');
  const navOverlay = document.querySelector('.nav-overlay');

  const closeMenu = () => {
    hamburger?.classList.remove('open');
    navMobile?.classList.remove('open');
    navOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navMobile?.classList.toggle('open', isOpen);
    navOverlay?.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navOverlay?.addEventListener('click', closeMenu);
  navMobile?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  /* ── COUNTER ANIMATION ── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el  = entry.target;
        const end = parseFloat(el.dataset.count);
        const dur = 1800;
        const step = 16;
        const inc  = end / (dur / step);
        let cur    = 0;
        const isFloat = String(end).includes('.');

        const update = () => {
          cur = Math.min(cur + inc, end);
          el.textContent = isFloat ? cur.toFixed(1) : Math.floor(cur);
          if (cur < end) setTimeout(update, step);
          else el.textContent = isFloat ? end.toFixed(1) : end;
        };
        update();
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => countObserver.observe(el));
  }

  /* ── PARALLAX (lightweight CSS-var based) ── */
  const parallaxSections = document.querySelectorAll('[data-parallax]');
  if (parallaxSections.length && window.innerWidth > 768) {
    const onParallax = () => {
      parallaxSections.forEach(el => {
        const rect   = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        const speed  = parseFloat(el.dataset.parallax) || 0.15;
        el.style.setProperty('--parallax-y', `${center * speed}px`);
      });
    };
    window.addEventListener('scroll', onParallax, { passive: true });
    onParallax();
  }

  /* ── ACTIVE NAV LINK ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── PAGE TRANSITION ON LINK CLICK ── */
  if (pt) {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') ||
          href.startsWith('mailto') || href.startsWith('tel') ||
          href.startsWith('https://wa.me')) return;

      link.addEventListener('click', e => {
        e.preventDefault();
        pt.classList.remove('out');
        setTimeout(() => { window.location.href = href; }, 650);
      });
    });
  }

  /* ── HERO SLIDER (if present) ── */
  const slides    = document.querySelectorAll('.hero-slide');
  const dotsWrap  = document.querySelector('.hero-dots');

  if (slides.length > 1) {
    let current = 0;
    const total = slides.length;

    /* Build dots */
    if (dotsWrap) {
      slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'hero-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Slide ${i + 1}`);
        d.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(d);
      });
    }

    const goTo = (idx) => {
      slides[current].classList.remove('active');
      dotsWrap?.querySelectorAll('.hero-dot')[current]?.classList.remove('active');
      current = (idx + total) % total;
      slides[current].classList.add('active');
      dotsWrap?.querySelectorAll('.hero-dot')[current]?.classList.add('active');
    };

    slides[0].classList.add('active');
    setInterval(() => goTo(current + 1), 5500);
  } else if (slides.length === 1) {
    slides[0].classList.add('active');
  }

  /* ── FORM VALIDATION (contact page) ── */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const name  = form.querySelector('#name')?.value.trim();
      const phone = form.querySelector('#phone')?.value.trim();
      const msg   = form.querySelector('#message')?.value.trim();

      if (!name || name.length < 2) { showFormMsg(form, 'Please enter your full name.', 'error'); return; }
      if (!phone || !/^[6-9]\d{9}$/.test(phone)) { showFormMsg(form, 'Please enter a valid 10-digit Indian mobile number.', 'error'); return; }
      if (!msg || msg.length < 10) { showFormMsg(form, 'Please tell us a bit more about your project.', 'error'); return; }

      btn.textContent = 'Sending…';
      btn.disabled = true;

      /* Formspree endpoint — replace YOUR_ID with actual */
      try {
        const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        if (res.ok) {
          showFormMsg(form, '✓ Message received! We'll reach out within 24 hours.', 'success');
          form.reset();
        } else {
          showFormMsg(form, 'Something went wrong. Please WhatsApp us directly.', 'error');
        }
      } catch {
        showFormMsg(form, 'Network error. Please try again or WhatsApp us.', 'error');
      }

      btn.textContent = 'Send Message';
      btn.disabled = false;
    });
  }

  function showFormMsg(form, text, type) {
    let el = form.querySelector('.form-msg');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-msg';
      form.appendChild(el);
    }
    el.textContent = text;
    el.style.color  = type === 'success' ? '#2E7D32' : '#B71C1C';
    el.style.fontSize = '0.82rem';
    el.style.marginTop = '1rem';
    el.style.fontFamily = 'Montserrat, sans-serif';
    el.style.letterSpacing = '0.04em';
  }

});
