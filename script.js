// ===== Iasmyn Montenegro — Shared JS =====

// ---- Sticky header ----
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('solid', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---- Mobile nav ----
const burger = document.querySelector('.nav__burger');
const mobileNav = document.querySelector('.mobile-nav');
if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ---- Scroll-reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-fade],[data-fade-left],[data-fade-right]')
  .forEach(el => revealObserver.observe(el));

// ---- Stagger children ----
document.querySelectorAll('[data-stagger]').forEach(parent => {
  const base = parseInt(parent.dataset.stagger || 80);
  Array.from(parent.children).forEach((child, i) => {
    child.setAttribute('data-fade', '');
    child.dataset.delay = i * base;
    revealObserver.observe(child);
  });
});

// ---- Smooth scroll for hash links ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 84;
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth' });
  });
});

// ---- WhatsApp float pulse ----
const waBtn = document.querySelector('.wa-float');
if (waBtn) {
  setTimeout(() => {
    waBtn.style.animation = 'waPulse 2.5s ease-in-out 3';
  }, 4000);
}
const waStyle = document.createElement('style');
waStyle.textContent = `
  @keyframes waPulse {
    0%,100% { box-shadow: 0 6px 24px rgba(37,211,102,0.45); }
    50%      { box-shadow: 0 6px 48px rgba(37,211,102,0.7); transform: scale(1.1); }
  }
`;
document.head.appendChild(waStyle);
