/* ============================================================
   ARG — PORTFOLIO.JS (Filter logic)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const filterBtns = document.querySelectorAll('.filter-btn');
  const portItems  = document.querySelectorAll('.port-item');

  if (!filterBtns.length || !portItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      /* Update active state */
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      /* Filter items */
      portItems.forEach(item => {
        const cat = item.dataset.category;
        const show = filter === 'all' || cat === filter;

        if (show) {
          item.classList.remove('hidden');
          /* Stagger re-entrance */
          item.style.opacity = '0';
          item.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              item.style.opacity    = '1';
              item.style.transform  = 'translateY(0)';
            }, 40);
          });
        } else {
          item.classList.add('hidden');
        }
      });

      /* Reset wide-span on filter */
      portItems.forEach(item => {
        if (item.classList.contains('hidden')) {
          item.style.gridColumn = '';
        } else if (item.classList.contains('port-item--wide')) {
          item.style.gridColumn = 'span 2';
        }
      });
    });
  });

  /* Handle hash on load (e.g. portfolio.html#commercial) */
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const matchBtn = document.querySelector(`.filter-btn[data-filter="${hash}"]`);
    if (matchBtn) matchBtn.click();
  }

});
