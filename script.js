/* =========================================================
   BARRETO | TREINADOR — interações
   ========================================================= */

// >>> Troque pelos dados reais do Barreto <<<
const WHATSAPP_NUMBER = '5567999999999'; // DDI + DDD + número, só dígitos
const INSTAGRAM_URL = 'https://instagram.com/';

(() => {
  const root = document.documentElement;
  const body = document.body;

  /* ---------- Links de WhatsApp / Instagram ---------- */
  document.querySelectorAll('[data-wa]').forEach((el) => {
    const msg = el.getAttribute('data-wa') || 'Olá, Barreto! Quero agendar minha avaliação.';
    el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    el.target = '_blank';
    el.rel = 'noopener';
  });
  document.querySelectorAll('[data-ig]').forEach((el) => { el.href = INSTAGRAM_URL; });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Entrada do hero ---------- */
  const start = () => requestAnimationFrame(() => body.classList.add('is-loaded'));
  const heroImg = document.querySelector('.hero__photo img');
  if (heroImg && !heroImg.complete) {
    heroImg.addEventListener('load', start, { once: true });
    heroImg.addEventListener('error', start, { once: true });
    setTimeout(start, 1200); // fallback
  } else {
    start();
  }

  /* ---------- Header + menu mobile ---------- */
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  const setMenu = (open) => {
    root.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  burger.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Separar palavras da frase de impacto ---------- */
  const impact = document.getElementById('impactText');
  if (impact) {
    let i = 0;
    const wrap = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const s = document.createElement('span');
            s.className = 'w';
            s.style.setProperty('--wi', i++);
            s.textContent = part;
            frag.appendChild(s);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          wrap(child);
        }
      });
    };
    wrap(impact);
  }

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll('[data-reveal], #impactText, #stepsList, .mode--online');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Spotlight nos cards ---------- */
  document.querySelectorAll('.spec').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* ---------- Scroll: header, parallax, CTAs flutuantes ---------- */
  const heroPhoto = document.getElementById('heroPhoto');
  const hero = document.querySelector('.hero');
  const sticky = document.getElementById('stickyCta');
  const waFloat = document.querySelector('.wa-float');
  const finalSection = document.getElementById('agendar');

  let finalVisible = false;
  if ('IntersectionObserver' in window && finalSection) {
    new IntersectionObserver(([entry]) => {
      finalVisible = entry.isIntersecting;
      onScroll();
    }, { threshold: 0.2 }).observe(finalSection);
  }

  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 20);

    const pastHero = y > hero.offsetHeight * 0.7;
    const showCta = pastHero && !finalVisible;
    sticky.classList.toggle('is-visible', showCta);
    waFloat.classList.toggle('is-visible', showCta);

    if (heroPhoto && y < hero.offsetHeight) {
      heroPhoto.style.setProperty('--py', `${y * 0.18}px`);
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
})();
