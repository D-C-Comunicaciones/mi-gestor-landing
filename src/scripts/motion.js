// Movimiento de la landing: scroll suave con URL limpia, barra de funciones,
// acordeón de preguntas, cifras y pasos. Sin este script el sitio sigue completo y usable.
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const bar = document.querySelector('.topbar');
const barHeight = () => (bar ? bar.offsetHeight : 0);
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const OUT = 'cubic-bezier(.16,1,.3,1)';
const PENDING = 'migestor:scroll-to';

/* ---------- Scroll suave ---------- */
let frame = 0;
let finish = null;

function stopScroll() {
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  const done = finish;
  finish = null;
  if (done) done();
}

function scrollToY(y, done) {
  stopWheel();
  stopScroll();
  const target = clamp(y, 0, document.documentElement.scrollHeight - innerHeight);
  const from = scrollY;
  const delta = target - from;
  if (reduce.matches || Math.abs(delta) < 2) {
    scrollTo({ top: target, behavior: 'instant' });
    if (done) done();
    return;
  }
  finish = done || null;
  const duration = clamp(380 + Math.abs(delta) * 0.22, 480, 1050);
  const start = performance.now();
  const tick = (now) => {
    const t = clamp((now - start) / duration, 0, 1);
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    scrollTo({ top: from + delta * eased, behavior: 'instant' });
    if (t < 1) frame = requestAnimationFrame(tick);
    else stopScroll();
  };
  frame = requestAnimationFrame(tick);
}

// Si la persona hace scroll por su cuenta, se le devuelve el control de inmediato.
['wheel', 'touchstart'].forEach((type) => addEventListener(type, () => frame && stopScroll(), { passive: true }));
addEventListener('keydown', (e) => {
  if (frame && [' ', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) stopScroll();
});

/* ---------- Rueda del mouse con inercia ---------- */
let wheelFrame = 0;
let wheelTarget = 0;
let wheelCurrent = 0;
let wheelLast = 0;

function stopWheel() {
  if (wheelFrame) cancelAnimationFrame(wheelFrame);
  wheelFrame = 0;
}

function wheelTick(now) {
  const dt = Math.min(48, now - wheelLast);
  wheelLast = now;
  wheelCurrent += (wheelTarget - wheelCurrent) * (1 - Math.exp(-dt / 105));
  if (Math.abs(wheelTarget - wheelCurrent) < 0.5) wheelCurrent = wheelTarget;
  scrollTo({ top: wheelCurrent, behavior: 'instant' });
  wheelFrame = wheelCurrent === wheelTarget ? 0 : requestAnimationFrame(wheelTick);
}

addEventListener('wheel', (e) => {
  if (reduce.matches || e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
  if (e.target.closest && e.target.closest('dialog, .wa-panel')) return;
  const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? innerHeight : 1;
  e.preventDefault();
  if (!wheelFrame) {
    wheelCurrent = scrollY;
    wheelTarget = scrollY;
    wheelLast = performance.now();
  }
  wheelTarget = clamp(wheelTarget + e.deltaY * unit, 0, document.documentElement.scrollHeight - innerHeight);
  if (!wheelFrame) wheelFrame = requestAnimationFrame(wheelTick);
}, { passive: false });

/* ---------- Parallax: cada capa avanza a su propio ritmo ---------- */
const canParallax = matchMedia('(min-width:861px)');
const heroLayers = [
  ['.hero > .wrap', 0.14],
  ['.screen-main', 0.04],
  ['.screen-left', 0.1],
  ['.screen-right', 0.1],
  ['.screen-phone', -0.05],
].map(([selector, speed]) => [document.querySelector(selector), speed]).filter(([el]) => el);
const reliefs = [...document.querySelectorAll('.cta-relief')];
let parallaxQueued = false;

function updateParallax() {
  parallaxQueued = false;
  const active = canParallax.matches && !reduce.matches;
  if (scrollY < innerHeight * 1.4) {
    heroLayers.forEach(([el, speed]) => {
      el.style.translate = active ? `0 ${(scrollY * speed).toFixed(1)}px` : '';
    });
  }
  reliefs.forEach((relief) => {
    const box = relief.getBoundingClientRect();
    if (box.bottom < 0 || box.top > innerHeight) return;
    const offset = (box.top + box.height / 2 - innerHeight / 2) * -0.05;
    relief.style.translate = active ? `0 ${clamp(offset, -18, 18).toFixed(1)}px` : '';
  });
}

function queueParallax() {
  if (parallaxQueued) return;
  parallaxQueued = true;
  requestAnimationFrame(updateParallax);
}
addEventListener('scroll', queueParallax, { passive: true });
addEventListener('resize', queueParallax);
queueParallax();

/* ---------- Barra de funciones ---------- */
const tools = document.getElementById('tools');
const toolbar = tools && setupTools(tools);

function setupTools(root) {
  const stage = root.querySelector('.tools-stage');
  const area = root.querySelector('.tools-panels');
  const navWrap = root.querySelector('.tools-nav');
  const nav = root.querySelector('.pills');
  const thumb = root.querySelector('.pills-thumb');
  const links = [...nav.querySelectorAll('a')];
  const panels = [...root.querySelectorAll('.feature')];
  const canPin = matchMedia('(min-width:1024px)');
  let current = -1;
  let pinned = false;
  let locked = false;

  const top = () => root.getBoundingClientRect().top + scrollY;
  const step = () => (root.offsetHeight - stage.offsetHeight) / panels.length;

  function moveThumb() {
    const link = links[current];
    if (!link) return;
    thumb.style.width = `${link.offsetWidth}px`;
    thumb.style.height = `${link.offsetHeight}px`;
    thumb.style.transform = `translate(${link.offsetLeft}px,${link.offsetTop}px)`;
    if (nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({ left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2, behavior: reduce.matches ? 'auto' : 'smooth' });
    }
  }

  function showPanel(next, prev, direction) {
    const shift = reduce.matches ? 0 : direction;
    panels.forEach((p) => p.getAnimations({ subtree: true }).forEach((a) => a.cancel()));
    panels.forEach((p, i) => {
      p.classList.toggle('is-active', i === next);
      p.classList.remove('is-leaving');
    });
    const incoming = panels[next];
    incoming.querySelector('.feature-text').animate(
      [{ opacity: 0, transform: `translateY(${shift * 18}px)` }, { opacity: 1, transform: 'none' }],
      { duration: 440, easing: OUT },
    );
    incoming.querySelector('.shots').animate(
      [{ opacity: 0, transform: `translateY(${shift * 40}px)` }, { opacity: 1, transform: 'none' }],
      { duration: 620, delay: 50, easing: OUT, fill: 'backwards' },
    );
    const outgoing = panels[prev];
    outgoing.classList.add('is-leaving');
    outgoing.animate(
      [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translateY(${shift * -14}px)` }],
      { duration: 170, easing: 'ease-in', fill: 'forwards' },
    ).onfinish = () => outgoing.classList.remove('is-leaving');
  }

  function setActive(next) {
    if (next === current) return;
    const prev = current;
    current = next;
    links.forEach((link, i) => {
      link.classList.toggle('active', i === next);
      if (i === next) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    moveThumb();
    if (!pinned) return;
    if (prev < 0) panels[next].classList.add('is-active');
    else showPanel(next, prev, next > prev ? 1 : -1);
  }

  function spy() {
    if (locked) return;
    if (pinned) {
      const progress = scrollY + barHeight() - top();
      setActive(clamp(Math.floor(progress / step()), 0, panels.length - 1));
      return;
    }
    const line = innerHeight * 0.45;
    let next = 0;
    panels.forEach((p, i) => {
      if (p.getBoundingClientRect().top < line) next = i;
    });
    setActive(next);
    const stuck = navWrap.getBoundingClientRect().top <= barHeight() + 1 && root.getBoundingClientRect().bottom > barHeight() + navWrap.offsetHeight;
    navWrap.classList.toggle('stuck', stuck);
  }

  // Solo se fija si todas las funciones caben en pantalla; si no, quedan una debajo de otra.
  function layout() {
    panels.forEach((p) => {
      p.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      p.classList.remove('is-active', 'is-leaving');
    });
    root.classList.toggle('is-pinned', canPin.matches);
    pinned = canPin.matches && panels.every((p) => p.offsetHeight <= area.clientHeight);
    if (!pinned) root.classList.remove('is-pinned');
    if (pinned && current >= 0) panels[current].classList.add('is-active');
    moveThumb();
    spy();
  }

  function offsetOf(i) {
    if (pinned) return top() - barHeight() + i * step() + 2;
    return panels[i].getBoundingClientRect().top + scrollY - barHeight() - navWrap.offsetHeight;
  }

  function goTo(i, keyboard) {
    locked = true;
    setActive(i);
    if (keyboard) panels[i].focus({ preventScroll: true });
    scrollToY(offsetOf(i), () => {
      locked = false;
      spy();
    });
  }

  layout();
  requestAnimationFrame(() => nav.classList.add('ready'));

  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      spy();
    });
  }, { passive: true });

  let resizeTimer = 0;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layout, 120);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

  return { goTo, indexOf: (id) => panels.findIndex((p) => p.id === id) };
}

/* ---------- Enlaces internos: scroll suave y URL sin #seccion ---------- */
function scrollToId(id, keyboard) {
  const index = toolbar ? toolbar.indexOf(id) : -1;
  if (index >= 0) {
    toolbar.goTo(index, keyboard);
    return true;
  }
  const el = document.getElementById(id);
  if (!el) return false;
  scrollToY(el.getBoundingClientRect().top + scrollY - barHeight());
  if (keyboard) {
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }
  return true;
}

document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const link = e.target.closest('a[href]');
  if (!link || link.target === '_blank' || link.classList.contains('js-zoom')) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin) return;
  const id = decodeURIComponent(url.hash.slice(1));
  if (url.pathname !== location.pathname) {
    if (!id) return;
    // Desde otra página: se guarda el destino para que la URL llegue limpia.
    try {
      sessionStorage.setItem(PENDING, id);
    } catch {
      return;
    }
    e.preventDefault();
    location.href = url.pathname;
    return;
  }
  e.preventDefault();
  if (!id) scrollToY(0);
  else if (!scrollToId(id, e.detail === 0)) location.hash = id;
});

const toTop = document.getElementById('to-top');
if (toTop) toTop.addEventListener('click', () => scrollToY(0));

function consumePendingTarget() {
  let id = '';
  try {
    id = sessionStorage.getItem(PENDING) || '';
    sessionStorage.removeItem(PENDING);
  } catch {
    // Almacenamiento bloqueado: se usa solo el hash de la URL.
  }
  if (location.hash) {
    id = id || decodeURIComponent(location.hash.slice(1));
    history.replaceState(history.state, '', location.pathname + location.search);
  }
  if (id) requestAnimationFrame(() => scrollToId(id));
}
consumePendingTarget();
addEventListener('hashchange', consumePendingTarget);

/* ---------- Preguntas: una abierta a la vez, con altura animada ---------- */
function setupFaq(faq) {
  const items = [...faq.querySelectorAll('details')];
  const motions = new Map();
  let keepFrame = 0;

  function run(item, opening) {
    const body = item.querySelector('.faq-body');
    const from = item.open ? body.getBoundingClientRect().height : 0;
    if (motions.has(item)) motions.get(item).cancel();
    if (opening) item.open = true;
    item.classList.toggle('closing', !opening);
    const finished = () => {
      motions.delete(item);
      body.style.overflow = '';
      if (!opening) item.open = false;
      item.classList.remove('closing');
    };
    if (reduce.matches) {
      finished();
      return;
    }
    body.style.overflow = 'hidden';
    const motion = body.animate(
      [{ height: `${from}px`, opacity: opening ? 0 : 1 }, { height: `${opening ? body.scrollHeight : 0}px`, opacity: opening ? 1 : 0 }],
      { duration: opening ? 380 : 260, easing: 'cubic-bezier(.22,1,.36,1)' },
    );
    motion.onfinish = finished;
    motions.set(item, motion);
  }

  // Al cerrarse una pregunta de arriba, la pregunta tocada no debe salirse de su lugar.
  function keepInPlace(anchor) {
    cancelAnimationFrame(keepFrame);
    if (reduce.matches) return;
    let last = anchor.getBoundingClientRect().top;
    const until = performance.now() + 420;
    const tick = (now) => {
      const y = anchor.getBoundingClientRect().top;
      if (y !== last) scrollBy({ top: y - last, behavior: 'instant' });
      last = anchor.getBoundingClientRect().top;
      if (now < until) keepFrame = requestAnimationFrame(tick);
    };
    keepFrame = requestAnimationFrame(tick);
  }

  items.forEach((item) => {
    const summary = item.querySelector('summary');
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      const opening = !item.open || item.classList.contains('closing');
      if (opening) {
        items.forEach((other) => {
          if (other !== item && other.open && !other.classList.contains('closing')) run(other, false);
        });
        keepInPlace(summary);
      }
      run(item, opening);
    });
  });
}
document.querySelectorAll('.faq').forEach(setupFaq);

/* ---------- Cifras y pasos ---------- */
const facts = document.querySelector('.facts');
const steps = document.querySelector('.steps');
if ('IntersectionObserver' in window) {
  if (steps) {
    const stepsObserver = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      steps.classList.add('is-lit');
      stepsObserver.disconnect();
    }, { threshold: 0.35 });
    stepsObserver.observe(steps);
  }
  if (facts) {
    const numbers = [...facts.querySelectorAll('[data-count]')];
    const countUp = !reduce.matches;
    if (countUp) numbers.forEach((n) => { n.textContent = '0'; });
    const factsObserver = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      factsObserver.disconnect();
      facts.classList.add('is-in');
      if (!countUp) return;
      numbers.forEach((n, i) => {
        const value = Number(n.dataset.count);
        const start = performance.now() + i * 120;
        const tick = (now) => {
          const t = clamp((now - start) / 900, 0, 1);
          n.textContent = String(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    factsObserver.observe(facts);
  }
} else {
  if (steps) steps.classList.add('is-lit');
}
