// ============================================================================
// miliconfig v3.8 - لایهٔ نصب اپ (PWA) با آیکون خودکار سبز نئونی AMOLED
// ============================================================================

import { BRAND_NAME, VERSION } from '../config/defaults.js';

const THEME_BG = '#020804';

export const PWA_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="miliPwaBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0a2e1a"/>
      <stop offset="100%" stop-color="#020804"/>
    </radialGradient>
    <filter id="miliPwaGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="16" flood-color="#00ff66" flood-opacity="0.65"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="128" fill="#000000"/>
  <rect x="48" y="48" width="416" height="416" rx="96" fill="url(#miliPwaBg)" stroke="#00ff66" stroke-width="14" filter="url(#miliPwaGlow)"/>
  <rect x="58" y="58" width="396" height="396" rx="86" fill="none" stroke="#39ff14" stroke-width="3" stroke-opacity="0.45"/>
  <path d="M256 112L384 164V256C384 338 328 404 256 428C184 404 128 338 128 256V164L256 112Z" fill="rgba(0,255,102,0.08)" stroke="#00ff66" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" filter="url(#miliPwaGlow)"/>
  <path d="M184 296V212L256 268L328 212V296" fill="none" stroke="#39ff14" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="184" cy="212" r="16" fill="#00ff66"/>
  <circle cx="256" cy="268" r="16" fill="#39ff14"/>
  <circle cx="328" cy="212" r="16" fill="#00ff66"/>
</svg>`;

const MANIFEST = {
  name: `${BRAND_NAME}OS`,
  short_name: BRAND_NAME,
  description: 'مرکز کنترل اتصال و کانفیگ نئونی',
  lang: 'fa',
  dir: 'rtl',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  display_override: ['standalone', 'minimal-ui'],
  orientation: 'portrait-primary',
  background_color: THEME_BG,
  theme_color: '#00ff66',
  version: String(VERSION).replace(/^v/i, ''),
  icons: [
    { src: '/pwa-icon.svg', sizes: '192x192 512x512', type: 'image/svg+xml', purpose: 'any' },
    { src: '/pwa-icon.svg', sizes: '192x192 512x512', type: 'image/svg+xml', purpose: 'maskable' }
  ]
};

export const PWA_SW_JS = `/* ${BRAND_NAME}OS service worker */
self.addEventListener('install', function (event) { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil((self.clients && self.clients.claim) ? self.clients.claim() : Promise.resolve());
});
self.addEventListener('fetch', function () {});
`;

export const PWA_HEAD_TAGS = `<link rel="manifest" href="/manifest.webmanifest">
<meta name="theme-color" content="${THEME_BG}">
<meta name="application-name" content="${BRAND_NAME}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="${BRAND_NAME}">
<link rel="apple-touch-icon" href="/pwa-icon.svg">`;

export const PWA_CLIENT_JS = `(function () {
  try {
    if ('serviceWorker' in navigator && location.protocol === 'https:') {
      navigator.serviceWorker.register('/sw.js').catch(function () {});
    }
  } catch (e) {}
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    window.miliInstallPrompt = e;
    var btn = document.getElementById('installBtn');
    if (btn) { btn.classList.add('is-ready'); btn.removeAttribute('hidden'); }
  });
  window.addEventListener('appinstalled', function () {
    window.miliInstallPrompt = null;
    var btn = document.getElementById('installBtn');
    if (btn) btn.classList.remove('is-ready');
  });
})();`;

export function pwaManifestResponse() {
  return new Response(JSON.stringify(MANIFEST), {
    status: 200,
    headers: {
      'Content-Type': 'application/manifest+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}

export function pwaServiceWorkerResponse() {
  return new Response(PWA_SW_JS, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Service-Worker-Allowed': '/'
    }
  });
}

export function pwaIconResponse() {
  return new Response(PWA_ICON_SVG, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
