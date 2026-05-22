/* ============================================================
   ARG — PROCESS.JS (FAQ accordion smooth animation)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const summary = item.querySelector('.faq-question');
    const answer  = item.querySelector('.faq-answer');

    if (!summary || !answer) return;

    /* Set initial max-height for smooth animation */
    if (item.hasAttribute('open')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      answer.style.opacity   = '1';
    } else {
      answer.style.maxHeight = '0';
      answer.style.overflow  = 'hidden';
      answer.style.opacity   = '0';
      answer.style.transition = 'max-height 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.35s ease';
    }

    summary.addEventListener('click', (e) => {
      e.preventDefault();

      const isOpen = item.hasAttribute('open');

      /* Close all others */
      faqItems.forEach(other => {
        if (other === item) return;
        const otherAnswer = other.querySelector('.faq-answer');
        if (!otherAnswer) return;
        other.removeAttribute('open');
        otherAnswer.style.maxHeight = '0';
        otherAnswer.style.opacity   = '0';
      });

      if (isOpen) {
        item.removeAttribute('open');
        answer.style.maxHeight = '0';
        answer.style.opacity   = '0';
      } else {
        item.setAttribute('open', '');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity   = '1';
      }
    });
  });

  /* Step highlight on scroll */
  const steps = document.querySelectorAll('.process-step');
  if (steps.length) {
    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('step--active', entry.isIntersecting);
      });
    }, { threshold: 0.3 });

    steps.forEach(step => stepObserver.observe(step));
  }

});
