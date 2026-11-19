// Illustrazioni 2D su misura (SVG inline, ~1 KB ciascuna).
// Stile unico: linea viola profondo, campiture lilla/rosa, alone chiaro.
// Colori e spessori arrivano da variabili CSS (--ill-*) definite in style.css.

const n = (v) => +v.toFixed(1);
const R = 'var(--ill-rose)';
const T2 = 'var(--ill-tint2)';
const A = 'var(--ill-accent)';

/* ---------- elementi ricorrenti ---------- */
const halo = (cx = 80, cy = 60, r = 44) => `<circle class="h" cx="${cx}" cy="${cy}" r="${r}"/>`;
const sh = (rx = 30, cx = 80, cy = 105) => `<ellipse class="sh" cx="${cx}" cy="${cy}" rx="${rx}" ry="3.5"/>`;
const dot = (x, y, r = 2, c = 'a') => `<circle class="${c}" cx="${x}" cy="${y}" r="${r}"/>`;
const sp = (x, y, s = 1, c = 'a') => {
  const k = 6 * s, q = `Q${x} ${y} `;
  return `<path class="${c}" d="M${x} ${n(y - k)}${q}${n(x + k)} ${y}${q}${x} ${n(y + k)}${q}${n(x - k)} ${y}${q}${x} ${n(y - k)}Z"/>`;
};
const heart = (x, y, s = 1, c = 'r') => {
  const p = (a, b) => `${n(x + a * s)} ${n(y + b * s)}`;
  return `<path class="${c}" d="M${p(0, 7)}C${p(-6, 3)} ${p(-9, 0)} ${p(-9, -3.5)}C${p(-9, -6.3)} ${p(-6.8, -8)} ${p(-4.5, -8)}C${p(-2.6, -8)} ${p(-1, -7)} ${p(0, -5.4)}C${p(1, -7)} ${p(2.6, -8)} ${p(4.5, -8)}C${p(6.8, -8)} ${p(9, -6.3)} ${p(9, -3.5)}C${p(9, 0)} ${p(6, 3)} ${p(0, 7)}Z"/>`;
};
// tubo con contorno (vasi, nastri, cavi): tratto scuro largo + tratto colorato sopra
const tube = (d, w, c = '#fff') => `<path class="to" style="--w:${w}" d="${d}"/><path class="ti" style="--w:${w};--c:${c}" d="${d}"/>`;

const ART = {
  /* ================= Tirocini ================= */

  // Terapia intensiva di cardiochirurgia: monitor multiparametrico
  terapia: `${halo()}${sh(26)}
<path class="l" d="M72 86l-5 15M88 86l5 15M60 102h40"/>
<rect class="w l" x="36" y="24" width="88" height="62" rx="9"/>
<rect class="k" x="43" y="31" width="74" height="40" rx="4"/>
<path class="gl" d="M47 55h12l4-9 5 17 5-22 4 18 3-4h11l3-5 3 5h18"/>
<path class="gl th" d="M49 38h13M49 43h8"/>
${heart(108, 40, 0.5)}
<path class="l th" d="M44 78.5h28"/>
${dot(104, 78.5, 2.6)}${dot(112, 78.5, 2.6, 'r')}
${sp(26, 30)}${sp(134, 22, 0.7, 'r')}${dot(134, 92, 2.2)}`,

  // Impianto PICC e Midline: sezione cutanea con vena e catetere
  impianto: `${halo(72, 62)}
<clipPath id="$u"><circle cx="72" cy="62" r="37"/></clipPath>
<circle class="w" cx="72" cy="62" r="37"/>
<g clip-path="url(#$u)">
<path class="tn" d="M30 46c16-5 30 1 44-2s28-4 44 1v62H30z"/>
<path class="l" d="M30 46c16-5 30 1 44-2s28-4 44 1"/>
${tube('M24 82c18-6 34 2 52-3s30-6 48-1', 12, R)}
${tube('M90 46c-4 9-8 20-15 27-7 5-22 6-44 7', 2.4)}
</g>
<circle class="l" cx="72" cy="62" r="37"/>
${tube('M90 46l14-22', 2.4)}
<rect class="w al th" style="opacity:.7;stroke-dasharray:2.5 3" x="78" y="38" width="19" height="14" rx="4"/>
<path class="w l" d="M101 26l6-11 8 4-6 11z"/>
<path class="l" d="M113 15c5-4 11-5 17-3M115 23c6 0 11 3 15 8"/>
${dot(131, 12, 3.2, 'a l')}${dot(131, 31, 3.2, 'r l')}
${sp(24, 28, 0.8)}${sp(132, 88, 0.7, 'r')}${dot(118, 104)}`,

  // Day hospital oncologico: sacca per infusione e nastro
  day: `${halo()}${sh(16, 98)}
<path class="l" d="M98 12v90M84 102h28M98 16H76v6"/>
<path class="w l" d="M64 22h24a4 4 0 0 1 4 4v26c0 10-8 18-16 18s-16-8-16-18V26a4 4 0 0 1 4-4z"/>
<path class="t2n" d="M61.6 40h28.8v12c0 8.6-7 16.4-14.4 16.4S61.6 60.6 61.6 52z"/>
<path class="l th" d="M67 29h18M67 34h11"/>
<rect class="w l" x="72" y="70" width="8" height="12" rx="2.5"/>
<path class="a" d="M76 73.5s-2.2 2.6-2.2 3.9a2.2 2.2 0 0 0 4.4 0c0-1.3-2.2-3.9-2.2-3.9z"/>
<path class="l" d="M76 82c0 10-5 13-12 13s-13 3-13 11"/>
${tube('M34 98l10-17c5-8 3-19-4-19s-9 11-4 19l10 17', 4.5, R)}
${sp(124, 30)}${sp(26, 34, 0.7, 'r')}${dot(124, 82)}`,

  // Centro grandi ustionati: benda, garza e idratazione
  centro: `${halo()}${sh(40)}
<path class="w l" d="M60 84h56c5 0 8 5 5 9l-3 4H60z"/>
<path class="tl th" style="stroke-dasharray:3 4" d="M68 90.5h46"/>
<circle class="w l" cx="58" cy="62" r="26"/>
<circle class="tl th" cx="58" cy="62" r="18"/>
<circle class="t2n l" cx="58" cy="62" r="9"/>
<path class="t2n l" d="M110 22s-12 14-12 22a12 12 0 0 0 24 0c0-8-12-22-12-22z"/>
<path class="wl" d="M104 46a6 6 0 0 0 5 5"/>
${sp(134, 70, 0.7)}${sp(26, 28, 0.8, 'r')}${dot(28, 96)}`,

  // Cardiologia: cuore e tracciato ECG
  cardio: `${halo()}
${heart(80, 48, 3, 'r l')}
<path class="wl" d="M61 37c1-4 4-7 8-7"/>
<rect class="w l" x="30" y="80" width="100" height="20" rx="4"/>
<path class="tl th" d="M42 80v20M54 80v20M66 80v20M78 80v20M90 80v20M102 80v20M114 80v20M30 90h100"/>
<path class="al" d="M34 91h14l3-6 3 11 4-14 3 9h17l3-6 3 11 4-14 3 9h27"/>
${sp(126, 26)}${sp(32, 34, 0.7, 'r')}${dot(122, 62)}`,

  // Chirurgia vascolare: biforcazione arteriosa con suture e bisturi
  chirurgia: `${halo()}
${tube('M66 108c0-14 4-28 8-40M74 68C70 56 60 42 48 28M74 68c8-12 20-24 34-36', 11, R)}
<path class="wl th" style="stroke-dasharray:1.5 6" d="M66 108c0-14 4-28 8-40C70 56 60 42 48 28M74 68c8-12 20-24 34-36"/>
<path class="l th" d="M77 53l8 8M85 45l8 8M93 37l8 8"/>
<g transform="rotate(-40 110 86)">
<rect class="w l" x="102" y="82" width="34" height="7" rx="3.5"/>
<path class="tn l" d="M102 82H90c-6 0-10 3-12 7h24z"/>
</g>
${sp(30, 62, 0.8)}${sp(126, 22, 0.7, 'r')}${dot(34, 96)}`,

  // Ortopedia: osso con placca di osteosintesi, cornice radiografica
  ortopedia: `${halo()}
<path class="al" d="M38 22h-8v8M122 22h8v8M38 98h-8v-8M122 98h8v-8"/>
<g transform="rotate(-20 80 60)">
<path class="w l" d="M54 53c-4-8-17-7-17 1-6 1-7 10 0 12 0 8 13 9 17 1h52c4 8 17 7 17-1 7-2 6-11 0-12 0-8-13-9-17-1z"/>
<path class="l" d="M78 53l4 4-5 3 5 3-4 4"/>
<rect class="t2n l" x="62" y="56.5" width="36" height="7" rx="3.5"/>
${[68, 76, 84, 92].map((x) => dot(x, 60, 1.6, 'w l th')).join('')}
</g>
${sp(132, 48, 0.7)}${sp(28, 78, 0.7, 'r')}`,

  // Fisiopatologia respiratoria: polmoni, trachea e flussi d'aria
  fisiopatologia: `${halo()}
<path class="tn l" d="M74 40c-12-6-30 6-34 26-4 20 2 34 16 34 12 0 18-6 18-16z"/>
<path class="tn l" d="M86 40c12-6 30 6 34 26 4 20-2 34-16 34-12 0-18-6-18-16z"/>
<path class="al th" d="M68 58c-6 6-10 14-12 24M64 62c2 8 4 14 2 24M60 66c-6 2-10 6-12 12M92 58c6 6 10 14 12 24M96 62c-2 8-4 14-2 24M100 66c6 2 10 6 12 12"/>
<path class="l" d="M80 44c0 6-6 9-12 14M80 44c0 6 6 9 12 14"/>
${tube('M80 14v30', 6)}
<path class="l th" d="M77.5 21h5M77.5 27h5M77.5 33h5M77.5 39h5"/>
<path class="al" d="M20 50c6-5 13-3 13 2s-6 5-6 1M140 42c-6-5-13-3-13 2s6 5 6 1"/>
${sp(132, 94, 0.7, 'r')}${sp(28, 24, 0.7)}`,

  // Nefrologia pediatrica: rene e orsetto
  nefrologia: `${halo()}${sh(16, 112)}
<path class="r l" d="M66 26c-16-4-30 10-28 30s14 34 28 30c10-3 11-12 5-20-4-6-4-12 2-18 6-8 4-18-7-22z"/>
<path class="wl" d="M47 48c1-6 5-11 10-12"/>
<path class="al" d="M70 58c8 4 10 16 8 46"/>
<ellipse class="tn l" cx="112" cy="92" rx="13" ry="11"/>
<ellipse class="w" cx="112" cy="94" rx="6" ry="5"/>
<circle class="tn l" cx="101" cy="60" r="5"/><circle class="tn l" cx="123" cy="60" r="5"/>
${dot(101, 60, 2.2, 'r')}${dot(123, 60, 2.2, 'r')}
<circle class="tn l" cx="112" cy="71" r="13"/>
<ellipse class="w l" cx="112" cy="76" rx="6" ry="4.5"/>
<ellipse class="k" cx="112" cy="74" rx="2.2" ry="1.6"/>
${dot(107.5, 68, 1.4, 'k')}${dot(116.5, 68, 1.4, 'k')}
${sp(128, 30, 0.8)}${sp(34, 98, 0.6, 'r')}${dot(92, 24)}`,

  // Psichiatria: profilo con spirale del pensiero
  psichiatria: `${halo()}
<path class="w l" d="M58 106c0-10-2-16-6-22-9-11-11-25-7-37 6-18 25-28 44-26 19 2 30 16 30 32 0 6-2 10 2 16 2 4-2 6-4 6 0 4 2 8-2 10-2 2 0 6-4 8-4 2-10 0-14 2-2 2-2 11-2 11z"/>
<path class="al" d="M80 52a2 2 0 0 1 4 0a4 4 0 0 1-8 0a6 6 0 0 1 12 0a8 8 0 0 1-16 0a10 10 0 0 1 20 0"/>
${sp(134, 30, 0.8, 'r')}${sp(28, 40, 0.7)}${dot(132, 96)}`,

  // Comunità terapeutica protetta: casa con cuore e pianta
  comunita: `${halo()}${sh(38)}
<rect class="t2n l" x="94" y="30" width="9" height="18" rx="1.5"/>
<rect class="w l" x="50" y="56" width="58" height="46" rx="3"/>
<path class="t2n l" d="M42 60L79 30l37 30z"/>
<path class="tn l" d="M72 102V87a7 7 0 0 1 14 0v15"/>
${dot(82.5, 94, 1.3, 'k')}
<rect class="tn l" x="56" y="66" width="12" height="12" rx="2"/><rect class="tn l" x="90" y="66" width="12" height="12" rx="2"/>
<path class="l th" d="M62 66v12M56 72h12M96 66v12M90 72h12"/>
${heart(79, 48, 0.9)}
<path class="l" d="M124 102c0-10 2-17 6-23"/>
<path class="t2n l" d="M125 93c-8-1-12-6-12-11 6 0 11 4 12 11zM128 85c2-7 8-10 13-9-1 6-6 10-13 9z"/>
${sp(30, 34, 0.8)}${sp(130, 24, 0.7, 'r')}${dot(34, 92)}`,

  // Assistenza domiciliare: borsa sanitaria e posizione
  assistenza: `${halo()}${sh(36)}
<path class="l" d="M66 50v-7a5 5 0 0 1 5-5h18a5 5 0 0 1 5 5v7"/>
<path class="w l" d="M44 56a6 6 0 0 1 6-6h60a6 6 0 0 1 6 6l-3 40a5 5 0 0 1-5 5H52a5 5 0 0 1-5-5z"/>
<path class="l th" d="M45 64h70"/>
<rect class="t2n l" x="75" y="60" width="10" height="8" rx="2.5"/>
<path class="a" d="M76 72h8v7h7v8h-7v7h-8v-7h-7v-8h7z"/>
<path class="r l" d="M124 48s-11-11-11-19a11 11 0 0 1 22 0c0 8-11 19-11 19z"/>
<circle class="w l" cx="124" cy="29" r="4"/>
${sp(30, 36, 0.8)}${dot(30, 84)}${sp(136, 72, 0.6, 'r')}`,

  // Punto prelievi: provette nel rack
  punto: `${halo()}${sh(40)}
<path class="l" d="M44 84v18M116 84v18M38 102h84"/>
${[[58, 'a l'], [80, 't2n l'], [102, 'r l']].map(([x, c]) => `<path class="w l" d="M${x - 6} 32v50a6 6 0 0 0 12 0V32z"/><path class="r" d="M${x - 4.5} 58v24a4.5 4.5 0 0 0 9 0V58z"/><rect class="${c}" x="${x - 8}" y="24" width="16" height="10" rx="3"/>`).join('')}
<rect class="tn l" x="38" y="68" width="84" height="14" rx="3"/>
<path class="r l" d="M30 34s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z"/>
${sp(132, 32, 0.8)}${dot(134, 62)}`,

  // Corso BLSD: defibrillatore (DAE) con placche
  blsd: `${halo()}${sh(36, 72)}
<path class="l" d="M100 58c8 0 7-15 14-17M100 66c8 0 7 15 14 17"/>
<path class="l" d="M54 36v-6a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v6"/>
<rect class="w l" x="34" y="36" width="68" height="62" rx="10"/>
${heart(68, 64, 1.9, 'r l')}
<path class="a" d="M71 50l-8.5 14h6.5l-3 11 10-15.5h-6.5l3.5-9.5z"/>
<path class="l th" d="M42 88h12M42 92h8"/>
${dot(92, 89, 3.5, 'a l')}
<rect class="tn l" x="112" y="26" width="22" height="28" rx="7"/><rect class="tn l" x="112" y="70" width="22" height="28" rx="7"/>
${dot(123, 40, 5, 't2n l th')}${dot(123, 84, 5, 't2n l th')}
${sp(26, 30, 0.8, 'r')}${dot(26, 70)}${sp(138, 102, 0.6)}`,

  /* ================= Esperienze ================= */

  // Infermiera (OPSA): piano di cura e terapia
  opsa: `${halo()}
<rect class="t2n l" x="46" y="22" width="60" height="80" rx="8"/>
<rect class="w l" x="53" y="31" width="46" height="64" rx="3"/>
<rect class="a l" x="64" y="17" width="24" height="12" rx="4"/>
${dot(76, 22, 2, 'w l th')}
${[44, 56, 68, 80].map((y, i) => `<rect class="tn l th" x="59" y="${y - 4}" width="8" height="8" rx="2"/>${i < 3 ? `<path class="al" d="M60.6 ${y}l2.1 2.3 4-4.8"/>` : ''}<path class="l th" d="M72 ${y}h${i % 2 ? 14 : 20}"/>`).join('')}
<g transform="rotate(-35 112 86)"><path class="r" d="M100 80h12v12h-12a6 6 0 0 1 0-12z"/><path class="w" d="M112 80h12a6 6 0 0 1 0 12h-12z"/><rect class="l" x="94" y="80" width="36" height="12" rx="6"/><path class="l" d="M112 80v12"/></g>
${sp(32, 32, 0.8)}${heart(30, 74, 0.6)}${dot(128, 28)}`,

  // Istruttrice di ginnastica ritmica: nastro e palla
  gym: `${halo()}${sh(14, 116, 106)}
<circle class="t2n l" cx="116" cy="88" r="13"/>
<path class="l th" d="M104 85c8 5 17 6 24 1"/>
<path class="wl" d="M109 81c2-3 4-4 7-5"/>
${tube('M62 62C64 36 92 26 96 42c3 12-12 18-16 8-4-12 18-24 32-18 14 6 12 24 0 22-10-2-4-18 12-20 10-1 16 6 16 14', 4, R)}
<path class="l" d="M40 102l22-40"/>
${tube('M40 102l5.5-10', 4, A)}
${sp(30, 40, 0.8)}${sp(138, 70, 0.6, 'r')}${dot(44, 72)}`,

  // Receptionist: cuffia con microfono e fumetto
  desk: `${halo()}
<path class="w l" d="M118 10h18a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6h-14l-6 6v-6a6 6 0 0 1-4-6V16a6 6 0 0 1 6-6z"/>
${dot(121, 21, 1.8)}${dot(127, 21, 1.8)}${dot(133, 21, 1.8)}
${tube('M48 70C46 42 60 28 80 28s34 14 32 42', 5, T2)}
<rect class="t2n l" x="38" y="60" width="16" height="26" rx="7"/><rect class="t2n l" x="106" y="60" width="16" height="26" rx="7"/>
<path class="wl th" d="M42 66v12M110 66v12"/>
<path class="l" d="M46 86c0 10 8 15 20 14"/>
<rect class="a l" x="64" y="96" width="12" height="8" rx="4"/>
${sp(28, 30, 0.8, 'r')}${dot(30, 98)}${sp(134, 96, 0.6)}`,

  // Volontaria Croce Rossa: squadra e cura
  aid: `${halo()}${sh(42)}
<circle class="tn l" cx="54" cy="68" r="9"/><path class="tn l" d="M38 102c0-14 7-22 16-22s16 8 16 22z"/>
<circle class="tn l" cx="106" cy="68" r="9"/><path class="tn l" d="M90 102c0-14 7-22 16-22s16 8 16 22z"/>
<circle class="w l" cx="80" cy="60" r="11"/><path class="w l" d="M60 102c0-17 9-27 20-27s20 10 20 27z"/>
${heart(80, 32, 1.4, 'r l')}
<path class="al th" d="M62 30c-3-4-3-10 0-14M98 30c3-4 3-10 0-14"/>
${sp(30, 40, 0.8)}${sp(132, 42, 0.7, 'r')}`,

  /* ================= Formazione ================= */

  // Master AVIG: sonda ecografica, vasi in sezione e ago guidato
  avig: `${halo()}
<path class="tn l" d="M26 64c24-6 84-6 108 0 4 1 6 4 6 8v24c0 6-4 9-9 9H29c-5 0-9-3-9-9V72c0-4 2-7 6-8z"/>
<path class="k" d="M68 62L48 98c20 6 44 6 64 0L92 62z"/>
<path class="gl th" style="opacity:.45" d="M62 74c11 3 25 3 36 0M54 88c15 4 37 4 52 0"/>
<circle class="tl" style="fill:#160c2b" cx="72" cy="86" r="6.5"/>
${dot(90, 82, 4.5, 'r')}
<path class="l" d="M36 52l24.4 23.7"/>
<path class="gl" d="M60.4 75.7L69 84"/>
${tube('M30 46l6 6', 5, T2)}
<path class="w l" d="M72 16h16a4 4 0 0 1 4 4v20l6 10v8a4 4 0 0 1-4 4H66a4 4 0 0 1-4-4v-8l6-10V20a4 4 0 0 1 4-4z"/>
<path class="l th" d="M63 54h34"/>
<path class="l" d="M80 16c0-6 6-9 12-8s10 4 14 2"/>
${sp(126, 32, 0.8)}${sp(134, 50, 0.55, 'r')}${dot(42, 28)}`,

  // Laurea in infermieristica: tocco e stetoscopio
  nursing: `${halo()}
<path class="tn l" d="M62 44v12c0 6 36 6 36 0V44"/>
<path class="t2n l" d="M80 22l34 14-34 14-34-14z"/>
${dot(80, 36, 2.6, 'a l')}
<path class="l" d="M80 36l28 7v15"/>
<path class="r l" d="M105 58h6l2 9h-10z"/>
<path class="l" d="M48 68c0 14 6 22 16 22s16-8 16-22"/>
${dot(48, 66, 2.6)}${dot(80, 66, 2.6)}
<path class="l" d="M64 90c0 10 8 14 18 14s22-6 24-16"/>
<circle class="t2n l" cx="107" cy="82" r="7"/>${dot(107, 82, 3, 'w l th')}
${sp(28, 32, 0.8)}${sp(132, 24, 0.7, 'r')}${dot(134, 100)}`,

  // Liceo delle scienze umane: libro aperto e bilancia
  liceo: `${halo()}
<path class="l" d="M80 76V27M54 32h52M72 76h16"/>
${dot(80, 25, 3, 'a l')}
<path class="l th" d="M54 32l-9 18M54 32l9 18M106 32l-9 18M106 32l9 18"/>
<path class="t2n l" d="M43 50a11 6 0 0 0 22 0zM95 50a11 6 0 0 0 22 0z"/>
<path class="w l" d="M80 78c-12-8-28-8-42-4v26c14-4 30-4 42 4zM80 78c12-8 28-8 42-4v26c-14-4-30-4-42 4z"/>
<path class="tl th" d="M46 82c9-2 18-2 27 1M46 88c9-2 18-2 27 1M87 83c9-3 18-3 27-1M87 89c9-3 18-3 27-1"/>
${sp(28, 30, 0.8, 'r')}${sp(132, 40, 0.7)}${dot(30, 96)}`,

  // Pubblicazione cardio-oncologia: articolo con cuore ed ECG
  pub: `${halo()}
<rect class="tn l" x="56" y="20" width="54" height="74" rx="5" transform="rotate(8 83 57)"/>
<path class="w l" d="M50 18h36l14 14v58a4 4 0 0 1-4 4H50a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4z"/>
<path class="tn l" d="M86 18v10a4 4 0 0 0 4 4h10"/>
<path class="al" d="M54 30h24M54 36h16"/>
${heart(73, 57, 1.25)}
<path class="al" d="M52 58h12l3-6 4 12 4-14 3 8h16"/>
<path class="tl th" d="M54 76h38M54 82h30"/>
${sp(124, 30, 0.8)}${sp(30, 72, 0.6, 'r')}${dot(122, 98)}`,
};

// Tinta di sfondo delle card per area clinica (famiglia lilla)
export const TINT = {
  critical: 'lav', medicine: 'lav', mental: 'lav',
  vascular: 'peri', surgery: 'peri', lab: 'peri',
  onco: 'rose', peds: 'rose', community: 'rose', emergency: 'rose',
};

// Optical centring: offsets measured on each drawing's bounding box so its visual centre
// sits on the halo centre (80, 60). The halo stays put, except for the PICC lens it frames.
const OFFSET = {
  terapia: [1, 0], impianto: [2, 2], day: [4, 1], chirurgia: [1.5, -3], fisiopatologia: [0, 3],
  nefrologia: [-1.5, -4.5], psichiatria: [-1.5, -3.5], comunita: [-3, -1], assistenza: [-2.5, 0.5],
  punto: [0, -3], blsd: [-1.5, -5.5], opsa: [2.5, 0.5], gym: [-3.5, -6], desk: [-2.5, 3],
  aid: [-0.5, 1], avig: [0, 3.5], nursing: [0, -2], liceo: [0, -3], pub: [2.5, 4],
};
const MOVE_HALO = new Set(['impianto']);

let uid = 0;
export function art(key) {
  const body = ART[key];
  if (!body) return '';
  let inner = body.replace(/\$u/g, `ill${++uid}`);
  const off = OFFSET[key];
  if (off) {
    const cut = MOVE_HALO.has(key) ? 0 : inner.indexOf('/>') + 2; // first element is the halo
    inner = `${inner.slice(0, cut)}<g transform="translate(${off[0]} ${off[1]})">${inner.slice(cut)}</g>`;
  }
  return `<svg class="ill" viewBox="0 0 160 120" aria-hidden="true" focusable="false">${inner}</svg>`;
}
