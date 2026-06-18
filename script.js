

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
if (navbar && !navbar.classList.contains('navbar--solid')) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ---- MOBILE NAV TOGGLE ---- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    const spans  = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

/* ---- SCROLL REVEAL ---- */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ---- SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href   = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 85, behavior: 'smooth' });
  });
});

/* ---- ACTIVE NAV ON SCROLL (home) ---- */
const sections   = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link[href^="#"]');
if (sections.length && navLinkEls.length) {
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
    navLinkEls.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
    });
  }, { passive: true });
}



/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  if (navbar && !navbar.classList.contains('navbar--solid') && window.scrollY > 60) {
    navbar.classList.add('scrolled');
  }
  // Add reveal to key elements
  const autoReveal = [
    '.intro-card', '.symbol-card', '.importance-card',
    '.pat-point', '.coa-item', '.element-card', '.t-item', '.ah-item',
  ];
  autoReveal.forEach((sel, si) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.classList.add('rd-' + ((i % 4) + 1));
      revealObs.observe(el);
    });
  });

  console.log('%c★ PROUDLY GHANAIAN%c\nNCCE Ghana · Freedom and Justice',
    'color:#c68d23;font-size:16px;font-weight:bold;',
    'color:#5A4A2A;font-size:11px;');
});