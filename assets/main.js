/* =============================================
   NAV SCROLL EFFECT
   ============================================= */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* =============================================
   MOBILE MENU
   ============================================= */
const toggle = document.getElementById('nav-toggle');
const links  = document.getElementById('nav-links');

toggle?.addEventListener('click', () => {
  links.classList.toggle('open');
  document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
});

links?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* =============================================
   SCROLL-REVEAL (lightweight, no deps)
   ============================================= */
const revealEls = document.querySelectorAll('.section-label, .section-title, .section-body, .course-card, .contact-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {});

// Attach revealed class styles
const style = document.createElement('style');
style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);
