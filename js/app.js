import { UI, CONTACT, EXPERIENCE, EDUCATION, PUBLICATION, SKILLS } from './content.js';
import { TIROCINI } from './tirocini.js';
import { art, TINT } from './illustrations.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fineHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
const EASE = 'cubic-bezier(.22,1,.36,1)';
const EASE_IO = 'cubic-bezier(.77,0,.18,1)';

const scenes = $$('.scene');
const navItems = $$('.nav-item');
const ids = scenes.map((s) => s.id);
const pad = (n) => String(n).padStart(2, '0');
const pick = (v, lang) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] : v);
const icon = (id) => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;

let lang = 'it';
let current = 0;
let busy = false;

/* ---------------- Language ---------------- */
function initialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'it' || saved === 'en') return saved;
  } catch { /* storage unavailable */ }
  return (navigator.language || 'it').toLowerCase().startsWith('it') ? 'it' : 'en';
}

function getKey(obj, path) {
  return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
}

function applyStatic() {
  const t = UI[lang];
  document.documentElement.lang = lang;
  $('meta[name="description"]').setAttribute('content', t.meta);
  $$('[data-t]').forEach((el) => { const v = getKey(t, el.dataset.t); if (v != null) el.textContent = v; });
  $$('[data-alt]').forEach((el) => { el.alt = getKey(t, el.dataset.alt); });
  $$('[data-nav]').forEach((el) => { el.textContent = t.nav[+el.dataset.nav]; });
  navItems.forEach((b, i) => b.setAttribute('aria-label', t.nav[i]));
  $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  $('.topbar-title span').textContent = t.nav[current];
  $('.skip').textContent = lang === 'it' ? 'Salta al contenuto' : 'Skip to content';
  $('#sheet [data-step="-1"]').setAttribute('aria-label', t.clin.prev);
  $('#sheet [data-step="1"]').setAttribute('aria-label', t.clin.next);
  $('#sheet .sheet-close').setAttribute('aria-label', t.clin.close);
  $('#st-a').textContent = t.clin.tabA;
  $('#st-s').textContent = t.clin.tabS;
}

/* ---------------- Scene templates ---------------- */
const head = (i, kicker, title, sub = '') => `
  <header class="head">
    <p class="kicker" data-a>${kicker}</p>
    <h2 class="h2" id="h-${i}" tabindex="-1" data-a>${title}</h2>
    ${sub ? `<p class="sub" data-a>${sub}</p>` : ''}
  </header>`;

const deco = (i, a = -18, b = 26) => `
  <div class="deco" aria-hidden="true">
    <span class="blob b1 depth" style="--d:${a}"></span>
    <span class="blob b2 depth" style="--d:${b}"></span>
    <span class="numeral depth" style="--d:${Math.round(b / 2)}">${pad(i)}</span>
  </div>`;

const dots = (n) => `<div class="dots" aria-hidden="true">${'<i></i>'.repeat(n)}</div>`;

const TPL = {
  1() {
    const t = UI[lang].profile;
    return `${deco(1)}
    <div class="scene-inner profile">
      <div class="head" style="gap:16px">
        <p class="kicker" data-a>${t.kicker}</p>
        <h2 class="h2" id="h-1" tabindex="-1" data-a>${t.title}</h2>
        <div class="bio">${t.bio.map((p) => `<p data-a>${p}</p>`).join('')}</div>
      </div>
      <div class="profile-side">
        <div class="stats">
          ${t.stats.map(([n, suf, label]) => `
            <div class="card stat lift" data-a>
              <b><span data-count="${n}">${n.toLocaleString(lang === 'it' ? 'it-IT' : 'en-GB')}</span><small>${suf}</small></b>
              <span>${label}</span>
            </div>`).join('')}
        </div>
        <ul class="values" data-a>${t.values.map((v) => `<li class="chip chip-dot">${v}</li>`).join('')}</ul>
      </div>
    </div>`;
  },

  2() {
    const t = UI[lang].exp;
    return `${deco(2, 22, -20)}
    <div class="scene-inner">
      ${head(2, t.kicker, t.title)}
      <ol class="rail exp-rail" data-rail>
        ${EXPERIENCE.map((e) => `
          <li class="card exp lift ${e.current ? 'is-current' : ''}" data-a>
            <div class="card-art tint-${e.tint}">${art(e.art)}</div>
            <p class="exp-period"><span>${pick(e.period, lang)}</span>${e.current ? `<span class="exp-now">${t.now}</span>` : ''}</p>
            <h3>${pick(e.role, lang)}</h3>
            <p class="exp-org">${e.org ? `<b>${pick(e.org, lang)}</b> · ` : ''}${pick(e.place, lang)}</p>
            <ul class="ticks">${e.points[lang].map((p) => `<li>${p}</li>`).join('')}</ul>
          </li>`).join('')}
      </ol>
      ${dots(EXPERIENCE.length)}
    </div>`;
  },

  3() {
    const t = UI[lang].clin;
    return `${deco(3, -24, 18)}
    <div class="scene-inner">
      ${head(3, t.kicker, t.title, t.sub)}
      <ul class="clin-grid" data-rail>
        ${TIROCINI.map((x, i) => `
          <li style="display:contents">
            <button class="tile tint-${TINT[x.area]}" type="button" data-tile="${i}" data-a aria-label="${x[lang].t} — ${t.open}">
              <span class="tile-art">${art(x.id)}</span>
              <span class="chip chip-soft">${t.areas[x.area]}</span>
              <span class="tile-text"><span class="tile-title">${x[lang].t}</span></span>
              <span class="tile-go">${icon('arrow')}</span>
            </button>
          </li>`).join('')}
      </ul>
    </div>`;
  },

  4() {
    const t = UI[lang].edu;
    return `${deco(4, 20, -24)}
    <div class="scene-inner">
      ${head(4, t.kicker, t.title)}
      <div class="rail edu-wrap" data-rail>
        ${EDUCATION.map((e) => `
          <article class="card edu lift" data-a>
            <div class="card-art tint-${e.tint}">${art(e.art)}</div>
            <div class="edu-top"><span class="edu-type">${pick(e.type, lang)}</span>${e.status ? `<span class="edu-status">${icon('check')}${pick(e.status, lang)}</span>` : ''}</div>
            <h3>${pick(e.title, lang)}</h3>
            <p class="edu-org">${pick(e.org, lang)}</p>
            <p class="edu-period">${e.period}</p>
            <p class="desc">${pick(e.desc, lang)}</p>
          </article>`).join('')}
        <article class="card edu pub lift" data-a>
          <div class="card-art">${art('pub')}</div>
          <div class="edu-top"><span class="edu-type">${icon('doc')}${t.pub}</span></div>
          <h3 lang="it">${PUBLICATION.title}</h3>
          <p class="edu-period">${PUBLICATION.date}</p>
          <p class="desc">${PUBLICATION.desc[lang]}</p>
        </article>
      </div>
      ${dots(EDUCATION.length + 1)}
    </div>`;
  },

  5() {
    const t = UI[lang].skills;
    const ops = SKILLS.ops[lang], soft = SKILLS.soft[lang];
    const mini = ([h, p]) => `<article class="card mini"><h3>${h}</h3><p>${p}</p></article>`;
    return `${deco(5, -20, 24)}
    <div class="scene-inner skills">
      ${head(5, t.kicker, t.title)}
      <div class="panel-wrap">
        <div class="tabs" role="tablist" aria-label="${t.kicker}" data-a>
          ${t.tabs.map((name, i) => `<button class="tab" role="tab" type="button" id="sk-t${i}" aria-controls="sk-p${i}" aria-selected="${i === 0}" ${i ? 'tabindex="-1"' : ''}>${name}</button>`).join('')}
        </div>
        <div class="panel" id="sk-p0" role="tabpanel" aria-labelledby="sk-t0" data-a>
          <ul class="chips">${SKILLS.clinical[lang].map((c) => `<li class="chip chip-dot">${c}</li>`).join('')}</ul>
        </div>
        <div class="panel" id="sk-p1" role="tabpanel" aria-labelledby="sk-t1" hidden>
          <div class="mini-grid">${ops.map(mini).join('')}</div>
        </div>
        <div class="panel" id="sk-p2" role="tabpanel" aria-labelledby="sk-t2" hidden>
          <div class="mini-grid five">${soft.map(mini).join('')}</div>
        </div>
        <div class="panel" id="sk-p3" role="tabpanel" aria-labelledby="sk-t3" hidden>
          <div class="lang-grid">
            <div>
              <h3>${t.langs}</h3>
              <div class="bars">${SKILLS.langs[lang].map(([n, l, v]) => `
                <div class="bar-row"><div class="bar-head">${n}<span>${l}</span></div><div class="bar" role="img" aria-label="${n}: ${l}"><i style="--lv:${v}"></i></div></div>`).join('')}
              </div>
            </div>
            <div>
              <h3>${t.interests}</h3>
              <ul class="chips">${SKILLS.interests[lang].map((c) => `<li class="chip">${c}</li>`).join('')}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  },

  6() {
    const t = UI[lang].contact;
    const year = new Date().getFullYear();
    return `${deco(6, 24, -18)}
    <div class="scene-inner contact">
      <div class="head" style="gap:14px">
        <p class="kicker" data-a>${t.kicker}</p>
        <h2 class="big" id="h-6" tabindex="-1" data-a>${t.title.replace(/(\S+)\.$/, '<em>$1.</em>')}</h2>
        <p class="sub" data-a>${t.sub}</p>
      </div>
      <ul class="c-list">
        <li class="card c-item lift" data-a>
          <span class="c-ico">${icon('mail')}</span>
          <a class="c-txt" href="mailto:${CONTACT.email}"><small>${t.email}</small><span>${CONTACT.email}</span></a>
          <span class="c-act">
            <button class="icon-btn" type="button" data-copy="${CONTACT.email}" aria-label="${t.copy}">${icon('copy')}</button>
          </span>
        </li>
        <li class="card c-item lift" data-a>
          <span class="c-ico">${icon('phone')}</span>
          <a class="c-txt" href="${CONTACT.phoneHref}"><small>${t.phone}</small><span>${CONTACT.phone}</span></a>
          <span></span>
        </li>
        <li class="card c-item lift" data-a>
          <span class="c-ico">${icon('in')}</span>
          <a class="c-txt" href="${CONTACT.linkedin}" target="_blank" rel="noopener"><small>${t.linkedin}</small><span>claudia-stefanelli</span></a>
          <span class="c-act"><a class="icon-btn" href="${CONTACT.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${icon('out')}</a></span>
        </li>
        <li class="card c-item" data-a>
          <span class="c-ico">${icon('pin')}</span>
          <span class="c-txt"><small>${t.place}</small><span>${t.placeVal}</span></span>
          <span></span>
        </li>
      </ul>
      <p class="credit" data-a><span>© ${year} Claudia Stefanelli</span><span>${t.credit}</span></p>
    </div>`;
  },
};

// Hidden scenes are built lazily (on navigation or when the browser is idle),
// so the first load only paints Home.
const rendered = new Set();
function render(i) {
  if (TPL[i]) scenes[i].innerHTML = TPL[i]();
  setupScene(scenes[i]);
  rendered.add(i);
}

function ensure(i) {
  if (i > 0 && !rendered.has(i)) render(i);
}

function renderLater() {
  const idle = window.requestIdleCallback || ((cb) => setTimeout(() => cb(), 120));
  const queue = scenes.map((_, i) => i).filter((i) => i > 0 && !rendered.has(i));
  const step = (deadline) => {
    do { ensure(queue.shift()); } while (queue.length && deadline && deadline.timeRemaining() > 8);
    if (queue.length) idle(step, { timeout: 1500 });
  };
  if (queue.length) idle(step, { timeout: 1500 });
}

/* ---------------- Per-scene behaviour ---------------- */
function setupScene(scene) {
  // swipe rails → dots
  $$('[data-rail]', scene).forEach((rail) => {
    const d = rail.parentElement.querySelector('.dots');
    if (!d) return;
    const marks = [...d.children];
    let raf = 0;
    const update = () => {
      raf = 0;
      const items = rail.children;
      const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : 1;
      const max = rail.scrollWidth - rail.clientWidth;
      const idx = rail.scrollLeft >= max - 4 ? items.length - 1 : Math.round(rail.scrollLeft / step);
      marks.forEach((m, k) => m.classList.toggle('on', k === idx));
    };
    rail.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    rail._dots = update;
    update();
  });
  // tabs
  const tabs = $$('.tabs [role="tab"]', scene);
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tabs, i));
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      selectTab(tabs, n); tabs[n].focus();
    });
  });
  if (fineHover) $$('.tile', scene).forEach(tilt);
}

function selectTab(tabs, n) {
  tabs.forEach((t, i) => {
    const on = i === n;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    const p = document.getElementById(t.getAttribute('aria-controls'));
    p.hidden = !on;
    if (on) stagger(p.querySelectorAll('.chip, .mini, .bar-row'), 0, 40);
  });
}

/* ---------------- Animations ---------------- */
function stagger(els, base = 0, step = 70) {
  if (reduce) return;
  [...els].forEach((el, k) => {
    el.animate(
      [{ opacity: 0, transform: 'translate3d(0,26px,0)' }, { opacity: 1, transform: 'none' }],
      { duration: 800, delay: base + k * step, easing: EASE, fill: 'backwards' },
    );
  });
}

function enterScene(scene, delay = 0) {
  stagger($$('[data-a]', scene), delay);
  const name = $$('.name .word', scene);
  if (name.length && !reduce) {
    name.forEach((w, k) => w.animate(
      [{ transform: 'translate3d(0,105%,0) rotate(4deg)' }, { transform: 'none' }],
      { duration: 1100, delay: delay + 80 + k * 120, easing: EASE, fill: 'backwards' },
    ));
  }
  $$('[data-count]', scene).forEach((el) => countUp(el, delay + 300));
  $$('.bar i', scene).forEach((b) => { b.style.animation = 'none'; b.offsetWidth; b.style.animation = ''; });
  // carousels were built while hidden (display:none): refresh their dots now
  $$('[data-rail]', scene).forEach((r) => r._dots?.());
}

function countUp(el, delay) {
  const to = +el.dataset.count;
  const fmt = new Intl.NumberFormat(lang === 'it' ? 'it-IT' : 'en-GB');
  if (reduce || to < 5) { el.textContent = fmt.format(to); return; }
  const t0 = performance.now() + delay, dur = 1400;
  el.textContent = '0';
  const tick = (now) => {
    const p = Math.min(1, Math.max(0, (now - t0) / dur));
    el.textContent = fmt.format(Math.round(to * (1 - Math.pow(1 - p, 4))));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------------- Navigation ---------------- */
function updateChrome(i) {
  navItems.forEach((b, k) => (k === i ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current')));
  $('.progress-num b').textContent = pad(i + 1);
  $('.progress-track i').style.transform = `scaleY(${(i + 1) / scenes.length})`;
  const title = $('.topbar-title span');
  title.textContent = UI[lang].nav[i];
  if (!reduce) title.animate([{ transform: 'translate3d(0,110%,0)' }, { transform: 'none' }], { duration: 600, easing: EASE });
  scenes.forEach((s, k) => { s.inert = k !== i; });
  try { history.replaceState(null, '', i ? `#${ids[i]}` : location.pathname + location.search); } catch { /* sandboxed */ }
}

function go(i, origin) {
  if (busy || i === current || i < 0 || i >= scenes.length) return;
  busy = true;
  ensure(i);
  const from = scenes[current];
  const to = scenes[i];
  const dir = i > current ? 1 : -1;
  current = i;
  updateChrome(i);
  from.classList.add('is-leaving');
  from.classList.remove('is-active');
  to.classList.add('is-active');
  setParallaxTarget(to);

  const done = () => {
    from.classList.remove('is-leaving');
    busy = false;
    $(`#h-${i === 0 ? 'home' : i}`)?.focus({ preventScroll: true });
  };

  if (reduce) {
    to.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250 }).finished.then(done);
    return;
  }

  let clip;
  if (origin) {
    const r = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
    clip = [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${r}px at ${origin.x}px ${origin.y}px)`];
  } else {
    clip = dir > 0 ? ['inset(100% 0 0 0 round 40px)', 'inset(0 0 0 0 round 0px)'] : ['inset(0 0 100% 0 round 40px)', 'inset(0 0 0 0 round 0px)'];
  }
  const dur = 1000;
  const a = to.animate([{ clipPath: clip[0] }, { clipPath: clip[1] }], { duration: dur, easing: EASE_IO });
  from.animate(
    [{ transform: 'none', opacity: 1 }, { transform: `translate3d(0,${-dir * 8}%,0) scale(.92)`, opacity: 0.2 }],
    { duration: dur, easing: EASE_IO },
  );
  const inner = $('.scene-inner', to);
  if (inner) inner.animate([{ transform: `translate3d(0,${dir * 12}vh,0)` }, { transform: 'none' }], { duration: dur, easing: EASE_IO });
  enterScene(to, 380);
  a.finished.then(done, done);
}

const next = () => go(current + 1);
const prev = () => go(current - 1);

document.addEventListener('click', (e) => {
  const g = e.target.closest('[data-go]');
  if (g) {
    const r = g.getBoundingClientRect();
    go(+g.dataset.go, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
    return;
  }
  const l = e.target.closest('[data-lang]');
  if (l && l.dataset.lang !== lang) { setLang(l.dataset.lang); return; }
  const tile = e.target.closest('[data-tile]');
  if (tile) { openSheet(+tile.dataset.tile, tile); return; }
  const cp = e.target.closest('[data-copy]');
  if (cp) copy(cp.dataset.copy);
});

/* scrollable helper: let inner regions scroll natively before switching scene */
function canScroll(target, dy) {
  const el = target.closest?.('.scene-inner');
  if (!el || el.scrollHeight <= el.clientHeight + 2) return false;
  return dy > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 2 : el.scrollTop > 0;
}

// wheel: one scene per gesture (handles trackpad inertia)
let lastWheel = 0, wheelAcc = 0, gestureUsed = false;
addEventListener('wheel', (e) => {
  if (sheet.open) return;
  const now = performance.now();
  if (now - lastWheel > 220) { wheelAcc = 0; gestureUsed = false; }
  lastWheel = now;
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
  if (canScroll(e.target, e.deltaY)) return;
  if (gestureUsed || busy) return;
  wheelAcc += e.deltaY;
  if (Math.abs(wheelAcc) > 30) {
    gestureUsed = true;
    wheelAcc > 0 ? next() : prev();
  }
}, { passive: true });

// touch swipe (vertical) between scenes
let ts = null;
const stage = $('#stage');
stage.addEventListener('touchstart', (e) => {
  const t = e.touches[0];
  ts = { x: t.clientX, y: t.clientY, time: performance.now(), target: e.target };
}, { passive: true });
stage.addEventListener('touchend', (e) => {
  if (!ts) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - ts.x, dy = t.clientY - ts.y;
  const fast = performance.now() - ts.time < 600;
  if (Math.abs(dy) > 46 && Math.abs(dy) > Math.abs(dx) * 1.3 && fast && !canScroll(ts.target, -dy)) {
    dy < 0 ? next() : prev();
  }
  ts = null;
}, { passive: true });

addEventListener('keydown', (e) => {
  if (sheet.open || e.altKey || e.ctrlKey || e.metaKey) return;
  if (e.target.closest('input, textarea, [role="tab"]') && /Arrow(Left|Right)/.test(e.key)) return;
  switch (e.key) {
    case 'ArrowDown': case 'PageDown': next(); break;
    case 'ArrowUp': case 'PageUp': prev(); break;
    case 'Home': go(0); break;
    case 'End': go(scenes.length - 1); break;
    default: return;
  }
  e.preventDefault();
});

addEventListener('hashchange', () => {
  const i = ids.indexOf(location.hash.slice(1));
  if (i >= 0) go(i);
});

/* ---------------- Language switch ---------------- */
function setLang(l) {
  lang = l;
  try { localStorage.setItem('lang', l); } catch { /* ignore */ }
  applyStatic();
  [...rendered].forEach(render);
  scenes.forEach((s, k) => { s.inert = k !== current; });
  setParallaxTarget(scenes[current]);
  enterScene(scenes[current], 0);
}

/* ---------------- Parallax (mouse + gyroscope) ---------------- */
let target = scenes[0];
let mx = 0, my = 0, tx = 0, ty = 0, rafP = 0;
function setParallaxTarget(s) {
  target.style.removeProperty('--mx'); target.style.removeProperty('--my');
  target = s;
}
function loopP() {
  mx += (tx - mx) * 0.08; my += (ty - my) * 0.08;
  target.style.setProperty('--mx', mx.toFixed(3));
  target.style.setProperty('--my', my.toFixed(3));
  rafP = Math.abs(tx - mx) + Math.abs(ty - my) > 0.002 ? requestAnimationFrame(loopP) : 0;
}
const kick = () => { if (!rafP) rafP = requestAnimationFrame(loopP); };
if (!reduce) {
  if (fineHover) {
    addEventListener('pointermove', (e) => {
      tx = (e.clientX / innerWidth) * 2 - 1;
      ty = (e.clientY / innerHeight) * 2 - 1;
      kick();
    }, { passive: true });
  } else if ('DeviceOrientationEvent' in window && typeof DeviceOrientationEvent.requestPermission !== 'function') {
    addEventListener('deviceorientation', (e) => {
      if (e.gamma == null) return;
      tx = Math.max(-1, Math.min(1, e.gamma / 30));
      ty = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
      kick();
    }, { passive: true });
  }
}

/* tilt for placement tiles */
function tilt(el) {
  let r = null, raf = 0, px = 0, py = 0;
  el.addEventListener('pointerenter', () => { r = el.getBoundingClientRect(); el.style.transition = 'transform .2s ease-out'; });
  el.addEventListener('pointermove', (e) => {
    if (!r) return;
    px = (e.clientX - r.left) / r.width - 0.5;
    py = (e.clientY - r.top) / r.height - 0.5;
    if (!raf) raf = requestAnimationFrame(() => {
      raf = 0;
      el.style.transform = `rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg) translateZ(10px)`;
    });
  });
  el.addEventListener('pointerleave', () => { r = null; el.style.transition = ''; el.style.transform = ''; });
}

/* magnetic buttons */
if (fineHover && !reduce) {
  $$('.magnet').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate3d(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px, 0)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
}

/* ---------------- Detail sheet ---------------- */
const sheet = $('#sheet');
const panel = $('.sheet-panel', sheet);
let sheetIdx = 0, sheetFrom = null, closing = false;

function fillSheet(i) {
  const x = TIROCINI[i], t = UI[lang].clin;
  $('.sheet-hero', sheet).className = `sheet-hero tint-${TINT[x.area]}`;
  $('.sheet-art', sheet).innerHTML = art(x.id);
  $('#sheet-title').textContent = x[lang].t;
  $('.sheet-area', sheet).textContent = `${x.id === 'blsd' ? t.course : t.placement} · ${t.areas[x.area]}`;
  $('#sp-a').innerHTML = x[lang].a.map((s) => `<li>${s}</li>`).join('');
  $('#sp-s').innerHTML = x[lang].s.map((s) => `<li>${s}</li>`).join('');
  $('.sheet-count', sheet).textContent = `${pad(i + 1)} / ${TIROCINI.length}`;
  $('.sheet-body', sheet).scrollTop = 0;
}

function sheetTab(which) {
  const a = which === 'a';
  $('#st-a').setAttribute('aria-selected', String(a)); $('#st-a').tabIndex = a ? 0 : -1;
  $('#st-s').setAttribute('aria-selected', String(!a)); $('#st-s').tabIndex = a ? -1 : 0;
  $('#sp-a').hidden = !a; $('#sp-s').hidden = a;
  stagger($$('li', a ? $('#sp-a') : $('#sp-s')), 0, 35);
}

function openSheet(i, fromEl) {
  sheetIdx = i; sheetFrom = fromEl;
  fillSheet(i);
  sheetTab('a');
  sheet.showModal();
  closing = false;
  if (reduce) return;
  $('.sheet-backdrop', sheet).animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: EASE });
  const mobile = innerWidth <= 820;
  if (mobile || !fromEl) {
    panel.animate([{ transform: 'translate3d(0,100%,0)' }, { transform: 'none' }], { duration: 650, easing: EASE });
  } else {
    const a = fromEl.getBoundingClientRect(), b = panel.getBoundingClientRect();
    const sx = a.width / b.width, sy = a.height / b.height;
    const dx = a.left + a.width / 2 - (b.left + b.width / 2), dy = a.top + a.height / 2 - (b.top + b.height / 2);
    panel.animate(
      [{ transform: `translate3d(${dx}px,${dy}px,0) scale(${sx},${sy})`, opacity: 0.4 }, { transform: 'none', opacity: 1 }],
      { duration: 700, easing: EASE },
    );
  }
  stagger($$('.sheet-tabs, #sp-a li', sheet), 250, 40);
}

function closeSheet() {
  if (!sheet.open || closing) return;
  closing = true;
  const finish = () => { sheet.close(); closing = false; panel.style.transform = ''; sheetFrom?.focus({ preventScroll: true }); };
  if (reduce) return finish();
  const mobile = innerWidth <= 820;
  $('.sheet-backdrop', sheet).animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, easing: EASE, fill: 'forwards' });
  panel.animate(
    mobile ? [{ transform: panel.style.transform || 'none' }, { transform: 'translate3d(0,100%,0)' }]
      : [{ transform: 'none', opacity: 1 }, { transform: 'translate3d(0,24px,0) scale(.96)', opacity: 0 }],
    { duration: 380, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' },
  ).finished.then(() => {
    panel.getAnimations().forEach((an) => an.cancel());
    $('.sheet-backdrop', sheet).getAnimations().forEach((an) => an.cancel());
    finish();
  });
}

function stepSheet(d) {
  sheetIdx = (sheetIdx + d + TIROCINI.length) % TIROCINI.length;
  sheetFrom = $(`[data-tile="${sheetIdx}"]`);
  const hero = $('.sheet-hero', sheet);
  if (reduce) { fillSheet(sheetIdx); sheetTab('a'); return; }
  hero.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: `translate3d(${-d * 30}px,0,0)` }], { duration: 180, easing: 'ease-in' })
    .finished.then(() => {
      fillSheet(sheetIdx); sheetTab('a');
      hero.animate([{ opacity: 0, transform: `translate3d(${d * 30}px,0,0)` }, { opacity: 1, transform: 'none' }], { duration: 420, easing: EASE });
    });
}

sheet.addEventListener('click', (e) => {
  if (e.target.closest('[data-close]')) closeSheet();
  const s = e.target.closest('[data-step]');
  if (s) stepSheet(+s.dataset.step);
  if (e.target.closest('#st-a')) sheetTab('a');
  if (e.target.closest('#st-s')) sheetTab('s');
});
sheet.addEventListener('cancel', (e) => { e.preventDefault(); closeSheet(); });
sheet.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && !e.target.closest('[role="tab"]')) stepSheet(1);
  if (e.key === 'ArrowLeft' && !e.target.closest('[role="tab"]')) stepSheet(-1);
  if (e.target.closest('[role="tab"]') && /Arrow(Left|Right)/.test(e.key)) {
    const toS = e.target.id === 'st-a';
    sheetTab(toS ? 's' : 'a');
    $(toS ? '#st-s' : '#st-a').focus();
  }
});

// drag-to-dismiss on mobile (from hero/handle)
let drag = null;
panel.addEventListener('touchstart', (e) => {
  if (innerWidth > 820 || !e.target.closest('.sheet-hero, .sheet-grab, .sheet-tabs')) return;
  drag = { y: e.touches[0].clientY, dy: 0 };
}, { passive: true });
panel.addEventListener('touchmove', (e) => {
  if (!drag) return;
  drag.dy = Math.max(0, e.touches[0].clientY - drag.y);
  panel.style.transform = `translate3d(0,${drag.dy}px,0)`;
}, { passive: true });
panel.addEventListener('touchend', () => {
  if (!drag) return;
  if (drag.dy > 110) closeSheet();
  else {
    panel.animate([{ transform: panel.style.transform }, { transform: 'none' }], { duration: 400, easing: EASE });
    panel.style.transform = '';
  }
  drag = null;
});

/* ---------------- Clipboard / toast ---------------- */
const toast = $('.toast');
let toastT = 0;
async function copy(text) {
  try { await navigator.clipboard.writeText(text); } catch { location.href = `mailto:${text}`; return; }
  toast.textContent = UI[lang].contact.copied;
  toast.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ---------------- Boot ---------------- */
lang = initialLang();
applyStatic();
setupScene(scenes[0]);
const start = Math.max(0, ids.indexOf(location.hash.slice(1)));
if (start) {
  ensure(start);
  scenes[0].classList.remove('is-active');
  scenes[start].classList.add('is-active');
  current = start;
  setParallaxTarget(scenes[start]);
}
updateChrome(current);
// Home on first load animates via CSS (.intro); other deep-linked scenes use the JS entrance
if (current !== 0) { scenes[0].classList.remove('intro'); enterScene(scenes[current], 0); }
renderLater();
