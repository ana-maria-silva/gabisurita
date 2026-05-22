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

/* =============================================
   THEME TOGGLE (dark ↔ light)
   ============================================= */
(function () {
  const html   = document.documentElement;
  const btn    = document.getElementById('theme-toggle');
  const saved  = localStorage.getItem('theme');

  // Apply saved or default (dark)
  if (saved === 'light') html.setAttribute('data-theme', 'light');

  function updateIcon() {
    if (!btn) return;
    btn.textContent = html.getAttribute('data-theme') === 'light' ? '🌙' : '☀️';
    btn.setAttribute('aria-label', html.getAttribute('data-theme') === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro');
  }

  updateIcon();

  btn?.addEventListener('click', () => {
    const isLight = html.getAttribute('data-theme') === 'light';
    if (isLight) {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
    updateIcon();
  });
})();

/* =============================================
   LANGUAGE TOGGLE (en-uk ↔ pt-br)
   ============================================= */
(function () {
  const html = document.documentElement;
  const buttons = document.querySelectorAll('#lang-toggle-group .lang-btn');
  const savedLang = localStorage.getItem('preferred-language');

  const pageTitle = {
    'en-uk': 'Gabi Surita — Building the AI Counterculture',
    'pt-br': 'Gabi Surita — Construindo a Contracultura da IA'
  };

  const pageDesc = {
    'en-uk': 'Gabriela Surita — AI researcher working on Gemini, code generation, and empowering developers through AI.',
    'pt-br': 'Gabriela Surita — Pesquisadora de IA trabalhando no Gemini, geração de código e empoderamento de desenvolvedores por meio de IA.'
  };

  function setLanguage(lang) {
    if (!buttons.length) return;
    
    // 1. Set lang attribute on <html>
    html.setAttribute('lang', lang);
    
    // 2. Update active button class
    buttons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 3. Update title and meta description dynamically
    document.title = pageTitle[lang] || pageTitle['en-uk'];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDesc[lang] || pageDesc['en-uk']);
    }

    // 4. Save preference
    localStorage.setItem('preferred-language', lang);
  }

  // Only run if the language toggle element exists on the page (i.e. on the home page)
  if (buttons.length > 0) {
    // Determine initial language
    let initialLang = 'en-uk'; // default
    if (savedLang === 'en-uk' || savedLang === 'pt-br') {
      initialLang = savedLang;
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang && browserLang.toLowerCase().startsWith('pt')) {
        initialLang = 'pt-br';
      }
    }

    // Apply initial language
    setLanguage(initialLang);

    // Add click listeners
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedLang = btn.getAttribute('data-lang');
        setLanguage(selectedLang);
      });
    });
  }
})();

