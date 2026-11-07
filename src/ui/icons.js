// ============================================================================
// miliconfig v3.8 - مجموعه آیکون‌های اختصاصی SVG با استایل سبز نئونی (بدون هیچ ایموجی)
// تمام آیکون‌ها stroke-based و با currentColor رنگ می‌گیرند.
// ============================================================================

const EMOJI_RE = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{2190}-\u{21FF}\u{FE0F}\u{200D}]/gu;

export function stripEmoji(text = '') {
  return String(text).replace(EMOJI_RE, '');
}

const wrap = (body, extraClass = '') =>
  `<svg class="mi ${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

export const ICONS = {
  menu: wrap('<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h10"/>'),
  dashboard: wrap('<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>'),
  users: wrap('<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c0-3.1 2.5-5.2 5.5-5.2s5.5 2.1 5.5 5.2"/><path d="M16.2 5.4a3 3 0 0 1 0 5.6"/><path d="M17.6 14.6c2 .6 3.4 2.4 3.4 4.7"/>'),
  settings: wrap('<path d="M4 7h9"/><path d="M17 7h3"/><circle cx="15" cy="7" r="2.2"/><path d="M4 17h3"/><path d="M11 17h9"/><circle cx="9" cy="17" r="2.2"/>'),
  radar: wrap('<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><path d="M12 12l6-5.6"/>'),
  globe: wrap('<circle cx="12" cy="12" r="8.8"/><path d="M3.4 12h17.2"/><path d="M12 3.2c2.6 2.4 3.9 5.4 3.9 8.8s-1.3 6.4-3.9 8.8c-2.6-2.4-3.9-5.4-3.9-8.8S9.4 5.6 12 3.2z"/>'),
  bolt: wrap('<path d="M13.2 2.8 4.8 13.4h5.6l-1.2 7.8 8.8-11h-5.8l1-7.4z"/>'),
  shield: wrap('<path d="M12 3 20 6.2v5.4c0 4.9-3.3 8.6-8 10.4-4.7-1.8-8-5.5-8-10.4V6.2L12 3z"/><path d="m8.8 12 2.4 2.4 4-4.4"/>'),
  copy: wrap('<rect x="9" y="9" width="11" height="11" rx="2.4"/><path d="M15.2 6.4V5.6A2.4 2.4 0 0 0 12.8 3.2H6.4A2.4 2.4 0 0 0 4 5.6v6.4a2.4 2.4 0 0 0 2.4 2.4h.8"/>'),
  trash: wrap('<path d="M4.5 7h15"/><path d="M9.5 7V4.8h5V7"/><path d="M6.5 7l.9 12.2h9.2L17.5 7"/><path d="M10.2 10.5v5.4"/><path d="M13.8 10.5v5.4"/>'),
  refresh: wrap('<path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 4v4.4h-4.4"/>'),
  plus: wrap('<path d="M12 5v14"/><path d="M5 12h14"/>'),
  lock: wrap('<rect x="4.5" y="10" width="15" height="10" rx="2.6"/><path d="M8.2 10V7.6a3.8 3.8 0 0 1 7.6 0V10"/><circle cx="12" cy="15" r="1.3" fill="currentColor"/>'),
  key: wrap('<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8"/><path d="m16 4 4 4"/><path d="m14 6 4 4"/>'),
  logout: wrap('<path d="M14.5 4.5h-7A2.5 2.5 0 0 0 5 7v10a2.5 2.5 0 0 0 2.5 2.5h7"/><path d="M11 12h9"/><path d="m17 8.5 3.5 3.5L17 15.5"/>'),
  link: wrap('<path d="M10.2 6.8 12.6 4.4a4.1 4.1 0 0 1 5.8 5.8l-2.4 2.4"/><path d="M13.8 17.2 11.4 19.6a4.1 4.1 0 0 1-5.8-5.8l2.4-2.4"/><path d="m9.4 14.6 5.2-5.2"/>'),
  download: wrap('<path d="M12 3.5v11"/><path d="m7.6 10.6 4.4 4.4 4.4-4.4"/><path d="M4.5 19.5h15"/>'),
  install: wrap('<rect x="6.5" y="2.6" width="11" height="18.8" rx="2.8"/><path d="M12 7.4v5.6"/><path d="m9.8 11 2.2 2.2 2.2-2.2"/><path d="M10.6 18.2h2.8"/>'),
  zip: wrap('<path d="M15 3H8.5A2.5 2.5 0 0 0 6 5.5v13A2.5 2.5 0 0 0 8.5 21h7a2.5 2.5 0 0 0 2.5-2.5V6z"/><path d="M15 3v3.4h3"/><path d="M12 7.4v1.3M12 10.4v1.3M12 13.4v1.3M12 16.4v1.3"/>'),
  check: wrap('<path d="m4.5 12.5 4.8 4.8L19.5 6.8"/>'),
  close: wrap('<path d="m6 6 12 12"/><path d="m18 6-12 12"/>'),
  sun: wrap('<circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/>'),
  moon: wrap('<path d="M20 14.2A8.2 8.2 0 0 1 9.8 4 8.6 8.6 0 1 0 20 14.2z"/>'),
  database: wrap('<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6"/>'),
  activity: wrap('<path d="M3 12h3.4l2.2-6.6 3.6 13.2L15 12h6"/>'),
  wifi: wrap('<path d="M4 9.4a12.5 12.5 0 0 1 16 0"/><path d="M7 12.6a8.2 8.2 0 0 1 10 0"/><path d="M9.8 15.8a4 4 0 0 1 4.4 0"/><circle cx="12" cy="19" r="1.1" fill="currentColor"/>'),
  layers: wrap('<path d="m12 3.5 8.4 4.4L12 12.3 3.6 7.9 12 3.5z"/><path d="m4.6 12.4 7.4 3.9 7.4-3.9"/><path d="m4.6 16.6 7.4 3.9 7.4-3.9"/>'),
  clock: wrap('<circle cx="12" cy="12" r="8.6"/><path d="M12 7.4V12l3.2 2"/>'),
  terminal: wrap('<rect x="3" y="4.5" width="18" height="15" rx="2.6"/><path d="m7.4 9.6 2.6 2.4-2.6 2.4"/><path d="M12.8 14.6h3.8"/>'),
  external: wrap('<path d="M13.5 4.5h6v6"/><path d="m19.5 4.5-8 8"/><path d="M18 14v4.2a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 18.2V7.8A1.8 1.8 0 0 1 5.8 6H10"/>'),
  server: wrap('<rect x="3.5" y="4" width="17" height="6.4" rx="2"/><rect x="3.5" y="13.6" width="17" height="6.4" rx="2"/><path d="M7 7.2h.01M7 16.8h.01"/>'),
  power: wrap('<path d="M12 3.5v8"/><path d="M7 6.2a8 8 0 1 0 10 0"/>'),
  chevron: wrap('<path d="m8.5 5.5 6.5 6.5-6.5 6.5"/>'),
  signal: wrap('<path d="M4.5 19.5v-4"/><path d="M9.5 19.5v-8"/><path d="M14.5 19.5v-12"/><path d="M19.5 19.5v-16"/>'),
  gauge: wrap('<path d="M4.2 17.5a8.4 8.4 0 1 1 15.6 0"/><path d="m12 13.5 3.6-4.2"/><circle cx="12" cy="14.6" r="1.5"/>'),
  branch: wrap('<circle cx="6.5" cy="6" r="2.2"/><circle cx="6.5" cy="18" r="2.2"/><circle cx="17.5" cy="8.5" r="2.2"/><path d="M6.5 8.2v7.6"/><path d="M17.5 10.7c0 3.1-2.4 5.3-6 6.3"/>'),
  search: wrap('<circle cx="11" cy="11" r="6.4"/><path d="m16 16 4.2 4.2"/>'),
  filter: wrap('<path d="M4 5.5h16l-6 7.2v5.6l-4 2v-7.6L4 5.5z"/>'),
  sanctions: wrap('<path d="M12 2.8 20 6v5.6c0 4.9-3.3 8.7-8 10.6-4.7-1.9-8-5.7-8-10.6V6l8-3.2z"/><path d="m13.1 8.2-3.4 4.4h3l-1 3.6 3.4-4.5h-3l1-3.5z"/>'),
  api: wrap('<path d="m8.4 8.2-4 3.8 4 3.8"/><path d="m15.6 8.2 4 3.8-4 3.8"/><path d="m13.4 5.6-2.8 12.8"/>'),
  dns: wrap('<circle cx="12" cy="12" r="3.2"/><path d="M12 2.6v3.2M12 18.2v3.2M2.6 12h3.2M18.2 12h3.2"/><circle cx="12" cy="12" r="8.4" stroke-dasharray="2.6 3.4"/>'),
  warp: wrap('<path d="M3 9.4c2.4-3 4.6-3 6.9 0s4.5 3 6.9 0c.9-1.1 1.9-1.7 3.2-1.7"/><path d="M3 15.6c2.4-3 4.6-3 6.9 0s4.5 3 6.9 0c.9-1.1 1.9-1.7 3.2-1.7"/>'),
  pin: wrap('<path d="M12 21s6.2-5 6.2-10.2A6.2 6.2 0 0 0 5.8 10.8C5.8 16 12 21 12 21z"/><circle cx="12" cy="10.6" r="2.4"/>'),
  region: wrap('<circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8"/><path d="M3.6 15h16.8"/><path d="M12 3a14.5 14.5 0 0 1 0 18 14.5 14.5 0 0 1 0-18z"/><circle cx="12" cy="12" r="2.2" fill="currentColor"/>'),
  telegram: wrap('<path d="M21.4 4.2 2.8 11c-.8.3-.8 1.4 0 1.7l4.6 1.6 1.8 5.4c.2.7 1.1.9 1.6.3l2.5-2.9 4.5 3.3c.6.4 1.4.1 1.6-.6l3-14.5c.2-.8-.6-1.4-1.2-1.1z"/><path d="m7.4 14.3 9.3-6.2-7.2 7.9"/>'),
  back: wrap('<path d="M20 12H5"/><path d="m11 6-6 6 6 6"/>'),
  stop: wrap('<rect x="6" y="6" width="12" height="12" rx="2.4"/>'),
  pulse: wrap('<path d="M2.8 12h3.6l2-4.8 3.4 9.8 2.2-5h7.2"/>')
};

export function icon(name, extraClass = '') {
  const raw = ICONS[name] || ICONS.dashboard;
  return extraClass ? raw.replace('class="mi ', `class="mi ${extraClass} `) : raw;
}

// لوگوی اختصاصی تولیدشده خودکار متناسب با Miliconfig (سپر شبکه نئونی با هسته ارتباطی M)
export const SHIELD_LOGO_SVG = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="mili-shield-svg">
  <defs>
    <radialGradient id="miliNeonBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0a2e1a"/>
      <stop offset="100%" stop-color="#020804"/>
    </radialGradient>
    <filter id="miliGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="3.2" flood-color="#00ff66" flood-opacity="0.65"/>
    </filter>
  </defs>
  <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#miliNeonBg)" stroke="#00ff66" stroke-width="2" filter="url(#miliGlow)"/>
  <rect x="8" y="8" width="48" height="48" rx="12" fill="none" stroke="#39ff14" stroke-width="0.9" stroke-opacity="0.4"/>
  <path d="M32 13L48 19.5V31C48 41.2 41.1 49.4 32 52.5C22.9 49.4 16 41.2 16 31V19.5L32 13Z" fill="rgba(0, 255, 102, 0.08)" stroke="#00ff66" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M23 36V26L32 33L41 26V36" stroke="#39ff14" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="23" cy="26" r="2.2" fill="#00ff66"/>
  <circle cx="32" cy="33" r="2.2" fill="#39ff14"/>
  <circle cx="41" cy="26" r="2.2" fill="#00ff66"/>
</svg>`;

export const CLOUD_LOGO_SVG = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="mili-cloud-svg">
  <rect x="4" y="4" width="56" height="56" rx="18" fill="#020804" stroke="#00ff66" stroke-width="1.8"/>
  <path d="M25.5 42H40.5C44.6421 42 48 38.6421 48 34.5C48 30.491 44.8544 27.2165 40.8926 27.0104C39.2471 21.7876 34.3652 18 28.6 18C21.4203 18 15.6 23.8203 15.6 31C15.6 37.0751 20.1249 42 25.5 42Z" stroke="#00ff66" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M26 34L32 29L38 34" stroke="#39ff14" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const FAVICON_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="4" y="4" width="56" height="56" rx="16" fill="#020804" stroke="#00ff66" stroke-width="3.5"/><path d="M32 13L48 19.5V31C48 41.2 41.1 49.4 32 52.5C22.9 49.4 16 41.2 16 31V19.5L32 13Z" fill="none" stroke="#00ff66" stroke-width="3.5" stroke-linejoin="round"/><path d="M23 36V26L32 33L41 26V36" fill="none" stroke="#39ff14" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
)}`;

// افکت امواج سه‌بعدی نئونی WebGL و نشانگر فیزیکی موس (قابل استفاده در تمام صفحات پنل)
export const NEON_WAVES_AND_CURSOR_HTML = `
<style>
  .neon-bg-canvas { position: fixed; inset: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; opacity: 0.85; }
  body.light-mode .neon-bg-canvas { opacity: 0.45; }
  html.gfx-off .neon-bg-canvas { display: none !important; }
  .neon-cursor-wrap { pointer-events: none; position: fixed; top: 0; left: 0; z-index: 9999; display: none; }
  @media (pointer: fine) {
    html:not(.gfx-off) .neon-cursor-wrap { display: block; }
  }
  #neon-cursor-dot {
    width: 6px; height: 6px; background-color: #00ff66; border-radius: 50%;
    box-shadow: 0 0 10px #00ff66, 0 0 20px #39ff14; transform: translate(-50%, -50%);
  }
  #neon-cursor-ring {
    width: 34px; height: 34px; transform: translate(-50%, -50%);
    transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  #neon-cursor-ring-inner {
    width: 100%; height: 100%; border: 1.5px dashed rgba(0, 255, 102, 0.85); border-radius: 50%;
    animation: neonSpinRing 10s linear infinite; transition: border-color 0.2s, background-color 0.2s;
  }
  body.neon-hover #neon-cursor-ring { width: 46px; height: 46px; }
  body.neon-hover #neon-cursor-ring-inner {
    border: 2px solid #00ff66; background-color: rgba(0, 255, 102, 0.14);
    animation: neonSpinRing 3s linear infinite;
  }
  @keyframes neonSpinRing { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>
<canvas id="neonWavesCanvas" class="neon-bg-canvas"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
<script>
(function initNeonSkillVisuals() {
  if (localStorage.getItem('mili_gfx_off') === '1') {
    document.documentElement.classList.add('gfx-off');
  }
  document.addEventListener('DOMContentLoaded', function() {
    if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
      var ring = document.createElement('div');
      ring.id = 'neon-cursor-ring';
      ring.className = 'neon-cursor-wrap';
      ring.innerHTML = '<div id="neon-cursor-ring-inner"></div>';
      document.body.appendChild(ring);
      var dot = document.createElement('div');
      dot.id = 'neon-cursor-dot';
      dot.className = 'neon-cursor-wrap';
      document.body.appendChild(dot);
      var mx = window.innerWidth / 2, my = window.innerHeight / 2;
      var rx = mx, ry = my, moving = false;
      window.addEventListener('mousemove', function(e) {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0) translate(-50%,-50%)';
        if (!moving) { moving = true; requestAnimationFrame(stepCursor); }
      }, { passive: true });
      function stepCursor() {
        rx += (mx - rx) * 0.42; ry += (my - ry) * 0.42;
        ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%)';
        if (Math.abs(mx - rx) < 0.5 && Math.abs(my - ry) < 0.5) moving = false;
        else requestAnimationFrame(stepCursor);
      }
      document.addEventListener('mouseover', function(e) {
        if (e.target && e.target.closest && e.target.closest('a,button,input,select,textarea,label,[role="button"]')) {
          document.body.classList.add('neon-hover');
        }
      });
      document.addEventListener('mouseout', function(e) {
        if (e.target && e.target.closest && e.target.closest('a,button,input,select,textarea,label,[role="button"]')) {
          document.body.classList.remove('neon-hover');
        }
      });
    }

    function bootThreeWaves() {
      var canvas = document.getElementById('neonWavesCanvas');
      if (!canvas || typeof THREE === 'undefined') return;
      if (document.documentElement.classList.contains('gfx-off')) return;
      try {
        var isMob = window.innerWidth < 768;
        var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1));
        renderer.setSize(window.innerWidth, window.innerHeight);
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
        camera.position.set(0, 0, isMob ? 35 : 14);
        var geom = new THREE.PlaneGeometry(80, isMob ? 90 : 40, 72, 36);
        var vShader = "uniform float uTime; uniform float uStrength; varying float vElev; void main(){ vec3 p = position; float x = p.x * 0.2 + uTime * 0.3; float y = p.y * 0.2 + uTime * 0.25; float wave = sin(x)*cos(y)*1.6 + sin(x*2.1 + uTime)*0.7 + cos(y*1.7 - uTime*0.6)*0.7; wave *= uStrength * 1.5; p.z += wave; vElev = wave; gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }";
        var fShader = "varying float vElev; uniform vec3 uHigh; uniform vec3 uLow; uniform float uFade; void main(){ float t = clamp((vElev + 2.0) / 4.0, 0.0, 1.0); vec3 col = mix(uLow, uHigh, t); gl_FragColor = vec4(col, uFade); }";
        function makePlane(py, pz, rx, high, low, fade) {
          var mat = new THREE.ShaderMaterial({
            wireframe: true, transparent: true, depthWrite: false,
            uniforms: { uTime: { value: 0 }, uStrength: { value: 1.1 }, uHigh: { value: new THREE.Color(high) }, uLow: { value: new THREE.Color(low) }, uFade: { value: fade } },
            vertexShader: vShader, fragmentShader: fShader
          });
          var m = new THREE.Mesh(geom, mat);
          m.position.set(0, py, pz);
          m.rotation.set(rx, 0, 0);
          return m;
        }
        var yOff = isMob ? 14 : 8;
        var topP = makePlane(yOff, -5, -Math.PI / 2.4, '#00ff66', '#020804', 0.22);
        var botP = makePlane(-yOff, -5, Math.PI / 2.4, '#39ff14', '#020804', 0.20);
        scene.add(topP); scene.add(botP);
        var clock = new THREE.Clock(), lastT = 0;
        function animate(ts) {
          requestAnimationFrame(animate);
          if (document.documentElement.classList.contains('gfx-off')) return;
          if (ts - lastT < 33) return;
          lastT = ts;
          var t = clock.getElapsedTime();
          topP.material.uniforms.uTime.value = t * 0.75;
          botP.material.uniforms.uTime.value = t * 0.75;
          renderer.render(scene, camera);
        }
        requestAnimationFrame(animate);
        window.addEventListener('resize', function() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      } catch (err) {}
    }
    if (typeof THREE !== 'undefined') bootThreeWaves();
    else window.addEventListener('load', bootThreeWaves);
  });
})();
</script>
`;
