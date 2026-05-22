/* ============================================================
   ARG — CONTACT.JS (Form validation, submission, UX polish)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── ELEMENTS ── */
  const form        = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');
  const submitText  = document.getElementById('submitBtnText');
  const submitArrow = document.getElementById('submitArrow');
  const spinner     = document.getElementById('submitSpinner');
  const statusEl    = document.getElementById('formStatus');
  const msgArea     = document.getElementById('message');
  const charCount   = document.getElementById('charCount');

  if (!form) return;

  /* ── CHARACTER COUNTER ── */
  if (msgArea && charCount) {
    msgArea.addEventListener('input', () => {
      const len = msgArea.value.length;
      charCount.textContent = `${len} / 1000`;
      charCount.style.color = len > 900 ? '#B71C1C' : '';
    });
  }

  /* ── REAL-TIME FIELD VALIDATION ── */
  const validators = {
    name:    { el: document.getElementById('name'),    errId: 'name-error'  },
    phone:   { el: document.getElementById('phone'),   errId: 'phone-error' },
    message: { el: document.getElementById('message'), errId: 'msg-error'   },
  };

  Object.values(validators).forEach(({ el, errId }) => {
    if (!el) return;
    el.addEventListener('blur', () => validateField(el, errId));
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) validateField(el, errId);
    });
  });

  function validateField(input, errId) {
    const err = document.getElementById(errId);
    if (!err) return true;

    let msg = '';

    if (input.id === 'name') {
      const v = input.value.trim();
      if (!v)           msg = 'Please enter your full name.';
      else if (v.length < 2) msg = 'Name must be at least 2 characters.';
    }

    if (input.id === 'phone') {
      const v = input.value.trim();
      if (!v)                      msg = 'Please enter your mobile number.';
      else if (!/^[6-9]\d{9}$/.test(v)) msg = 'Enter a valid 10-digit Indian number (starts 6–9).';
    }

    if (input.id === 'message') {
      const v = input.value.trim();
      if (!v)            msg = 'Please describe your project briefly.';
      else if (v.length < 10) msg = 'Please provide at least 10 characters.';
    }

    err.textContent = msg;
    input.classList.toggle('error', !!msg);
    return !msg;
  }

  /* ── PHONE: NUMERIC ONLY ── */
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    });
  }

  /* ── HONEYPOT CHECK ── */
  function isBot() {
    const hp = document.getElementById('website_url');
    return hp && hp.value.trim() !== '';
  }

  /* ── FORM SUBMISSION ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    /* Honeypot guard */
    if (isBot()) return;

    /* Validate all required fields */
    const nameOk  = validateField(validators.name.el,    validators.name.errId);
    const phoneOk = validateField(validators.phone.el,   validators.phone.errId);
    const msgOk   = validateField(validators.message.el, validators.message.errId);

    /* Project type required */
    const typeSelected = form.querySelector('input[name="project_type"]:checked');
    const typeErr      = document.getElementById('type-error');
    if (!typeSelected) {
      if (typeErr) typeErr.textContent = 'Please select a project type.';
    } else {
      if (typeErr) typeErr.textContent = '';
    }

    if (!nameOk || !phoneOk || !msgOk || !typeSelected) {
      /* Scroll to first error */
      const firstError = form.querySelector('.error, .field-error:not(:empty)');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    /* Loading state */
    setLoading(true);
    clearStatus();

    /* Build payload */
    const payload = new FormData(form);

    /* Remove honeypot from payload */
    payload.delete('website_url');

    try {
      /* ── FORMSPREE SUBMISSION ──
         Replace YOUR_FORMSPREE_ID with your actual Formspree endpoint ID.
         Sign up free at https://formspree.io
         e.g. https://formspree.io/f/abcdefgh
      ── */
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: payload
      });

      if (res.ok) {
        showStatus(
          '✓ Thank you! Your enquiry has been received. Our team will reach out within 24 hours to schedule your free consultation.',
          'success'
        );
        form.reset();
        if (charCount) charCount.textContent = '0 / 1000';

        /* ── GA4 Conversion Event ── */
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submission', {
            event_category: 'lead',
            event_label: 'consultation_form'
          });
        }

        /* ── Meta Pixel ── */
        if (typeof fbq !== 'undefined') {
          fbq('track', 'Lead');
        }

        /* Smooth scroll to status */
        statusEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });

      } else {
        const data = await res.json().catch(() => ({}));
        if (data.errors) {
          showStatus(
            '⚠ ' + data.errors.map(e => e.message).join(', '),
            'error'
          );
        } else {
          showStatus(
            '⚠ Something went wrong. Please WhatsApp us directly at the number below.',
            'error'
          );
        }
      }

    } catch (err) {
      console.error('Form submission error:', err);
      showStatus(
        '⚠ Network error. Please check your connection or message us on WhatsApp.',
        'error'
      );
    }

    setLoading(false);
  });

  /* ── HELPERS ── */
  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitBtn.classList.toggle('loading', loading);
    submitText.textContent = loading ? 'Sending…' : 'Send Enquiry';
    if (spinner) spinner.style.display = loading ? 'block' : 'none';
    if (submitArrow) submitArrow.style.display = loading ? 'none' : 'block';
  }

  function showStatus(msg, type) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className   = `form-status ${type}`;
  }

  function clearStatus() {
    if (!statusEl) return;
    statusEl.textContent = '';
    statusEl.className   = 'form-status';
  }

  /* ── TYPE CHIP ACCESSIBILITY ── */
  document.querySelectorAll('.type-chip input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      /* Clear type error on selection */
      const typeErr = document.getElementById('type-error');
      if (typeErr) typeErr.textContent = '';
    });
  });

});
