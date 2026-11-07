// ============================================================================
// miliconfig v3.8.1 - صفحه وضعیت اشتراک اختصاصی کاربر (قالب شیشه‌ای نئون سبز AMOLED)
// ============================================================================

import { BRAND_UPPER, TELEGRAM_SUPPORT, VERSION } from '../config/defaults.js';
import { SHIELD_LOGO_SVG } from './icons.js';

export function renderUserStatusPageHtml(user, nodes = [], originUrl = '') {
  let origin = '';
  try {
    origin = originUrl ? new URL(originUrl).origin : '';
  } catch (_e) {
    origin = '';
  }

  const statusPayload = {
    id: user.id || '',
    username: user.username || 'User',
    uuid: user.uuid || '',
    is_active: user.enabled === false ? 0 : 1,
    used_gb: Number(((user.usedBytes || 0) / (1024 ** 3)).toFixed(3)),
    limit_gb: Number(user.dataLimitGb || 0),
    used_req: Number(user.requestCount || 0),
    limit_req: 0,
    expiry_days: Number(user.expireDays || 0),
    expire_at: Number(user.expireAt || 0),
    start_on_first_connect: user.startOnFirstUse ? 1 : 0,
    first_connection_time: Number(user.firstConnectedAt || 0),
    created_at: Number(user.createdAt || Date.now()),
    ip_limit: Number(user.ipLimit || 50),
    online_count: user.enabled === false ? 0 : 1,
    user_proxy_iata: String(user.config?.wk || user.config?.sbRegion || 'DE').toUpperCase(),
    protocols: {
      vless: user.config?.ev !== 'no',
      trojan: user.config?.et === 'yes',
      ss: user.config?.es === 'yes',
      xhttp: user.config?.ex === 'yes',
      warp: user.config?.warp === 'yes' || user.config?.warpPro === 'yes'
    }
  };

  const safeStatusJson = JSON.stringify(statusPayload).replace(/</g, '\\u003c');
  const safeNodesJson = JSON.stringify(Array.isArray(nodes) ? nodes : []).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl" class="dark">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>وضعیت اشتراک ${statusPayload.username} — ${BRAND_UPPER}</title>
	
	<script>
		if (localStorage.getItem('gfx-enabled') === 'false') {
			document.documentElement.classList.add('gfx-off');
		}
		let activeTheme = localStorage.getItem('color-theme') || 'dark';
		if (activeTheme === 'light') {
			document.documentElement.classList.remove('dark');
		} else {
			document.documentElement.classList.add('dark');
		}
		if (localStorage.getItem('grayscale-theme') === 'true') {
			document.documentElement.classList.add('grayscale-active');
		}
	</script>
	<script src="https://cdn.tailwindcss.com"></script>
	<script src="https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/Sortable.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/qr-code-styling@1.5.0/lib/qr-code-styling.js"></script>
	<link rel="manifest" href="/manifest.webmanifest">
	<link rel="icon" type="image/svg+xml" href="/pwa-icon.svg">
	<link rel="apple-touch-icon" href="/pwa-icon.svg">
	<meta name="theme-color" content="#020804">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="apple-mobile-web-app-title" content="MILICONFIG">
	<link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css">
	<script>
		tailwind.config = {
			darkMode: 'class',
			theme: {
				extend: {
					fontFamily: { sans: ['Vazirmatn', 'sans-serif'] },
					colors: {
						amoled: { bg: '#020804', card: '#06140b', input: '#0b2214', border: '#143d24' },
						neon: { DEFAULT: '#00ff66', lime: '#39ff14', dark: '#059669' },
						white: '#f0fdf4',
						gray: {
							50: '#ecfdf5',
							100: '#d1fae5'
						}
					}
				}
			}
		}
	</script>
	<style>
		body { font-family: 'Vazirmatn', sans-serif; }
		.cursor-wrapper {
			pointer-events: none;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 9999;
			display: none;
		}
		@media (pointer: fine) {
			html:not(.gfx-off) * {
				cursor: none !important;
			}
			html:not(.gfx-off) .cursor-wrapper {
				display: block;
			}
		}
		#cursor-dot {
			width: 6px;
			height: 6px;
			background-color: #00ff66;
			border-radius: 50%;
			box-shadow: 0 0 8px #00ff66, 0 0 16px #39ff14;
			transform: translate(-50%, -50%);
		}
		#cursor-ring-pos {
			width: 36px;
			height: 36px;
			transform: translate(-50%, -50%);
			transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1);
		}
		#cursor-ring-visual {
			width: 100%;
			height: 100%;
			border: 1.5px dashed rgba(0, 255, 102, 0.9);
			border-radius: 50%;
			animation: spinRing 10s linear infinite;
			transition: border-color 0.2s, background-color 0.2s;
		}
		@keyframes spinRing {
			from { transform: rotate(0deg); }
			to { transform: rotate(360deg); }
		}
		body.hover-active #cursor-ring-pos {
			width: 48px;
			height: 48px;
		}
		body.hover-active #cursor-ring-visual {
			border: 2px solid #00ff66;
			background-color: rgba(0, 255, 102, 0.18);
			animation: spinRingFast 3s linear infinite;
		}
		@keyframes spinRingFast {
			from { transform: rotate(0deg); }
			to { transform: rotate(360deg); }
		}
		#cursor-glow-pos {
			width: 40px;
			height: 40px;
			transform: translate(-50%, -50%);
			transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1);
		}
		body.hover-active #cursor-glow-pos {
			width: 54px;
			height: 54px;
		}
		#cursor-glow-visual {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background: radial-gradient(circle, rgba(0, 255, 102, 0.4) 0%, rgba(57, 255, 20, 0.12) 40%, transparent 70%);
		}
		:root {
			--bg-tint: rgba(0, 255, 102, 0.04);
			--plane-color: #10b981;
			--plane-dark: #ecfdf5;
			--plane-opacity: 0.22;
		}
		.dark {
			--bg-tint: rgba(0, 255, 102, 0.18);
			--plane-color: #00ff66;
			--plane-dark: #020804;
			--plane-opacity: 0.18;
		}
		.bg-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
		#waves, #neonWavesCanvas { position: fixed; inset: 0; width: 100%; height: 100%; display: block; }
		.mili-shield-svg { width: 100%; height: 100%; display: block; }
		.mili-flag {
			display: inline-block;
			width: 1.35em;
			height: 1em;
			vertical-align: -0.15em;
			border-radius: 2px;
			background-size: cover;
			background-position: 50%;
			background-repeat: no-repeat;
		}
		.mili-flag-globe {
			font-size: 1.1em;
			line-height: 1;
			vertical-align: -0.05em;
		}
		html.grayscale-active {
			filter: grayscale(100%);
		}
	</style>
	<script>
		document.addEventListener('DOMContentLoaded', () => {
			if (window.matchMedia('(pointer: fine)').matches && localStorage.getItem('gfx-enabled') !== 'false') {
				const glowPos = document.createElement('div');
				glowPos.id = 'cursor-glow-pos';
				glowPos.className = 'cursor-wrapper';
				glowPos.innerHTML = '<div id="cursor-glow-visual"></div>';
				document.body.appendChild(glowPos);
				const ringPos = document.createElement('div');
				ringPos.id = 'cursor-ring-pos';
				ringPos.className = 'cursor-wrapper';
				ringPos.innerHTML = '<div id="cursor-ring-visual"></div>';
				document.body.appendChild(ringPos);
				const dot = document.createElement('div');
				dot.id = 'cursor-dot';
				dot.className = 'cursor-wrapper';
				document.body.appendChild(dot);
				let mouseX = window.innerWidth / 2;
				let mouseY = window.innerHeight / 2;
				let ringX = mouseX, ringY = mouseY;
				let glowX = mouseX, glowY = mouseY;
				let isMoving = false;
				window.addEventListener('mousemove', (e) => {
					mouseX = e.clientX;
					mouseY = e.clientY;
					dot.style.transform = 'translate3d(' + mouseX + 'px, ' + mouseY + 'px, 0) translate(-50%, -50%)';
					if (!isMoving) {
						isMoving = true;
						requestAnimationFrame(animatePhysics);
					}
				}, { passive: true });
				function animatePhysics() {
					ringX += (mouseX - ringX) * 0.45;
					ringY += (mouseY - ringY) * 0.45;
					ringPos.style.transform = 'translate3d(' + ringX + 'px, ' + ringY + 'px, 0) translate(-50%, -50%)';
					glowX += (mouseX - glowX) * 0.25;
					glowY += (mouseY - glowY) * 0.25;
					glowPos.style.transform = 'translate3d(' + glowX + 'px, ' + glowY + 'px, 0) translate(-50%, -50%)';
					if (Math.abs(mouseX - ringX) < 0.5 && Math.abs(mouseY - ringY) < 0.5) {
						isMoving = false;
					} else {
						requestAnimationFrame(animatePhysics);
					}
				}
				document.addEventListener('mouseover', (e) => {
					if (e.target.closest('a, button, input, select, label, [role="button"], textarea')) {
						document.body.classList.add('hover-active');
					}
				});
				document.addEventListener('mouseout', (e) => {
					if (e.target.closest('a, button, input, select, label, [role="button"], textarea')) {
						document.body.classList.remove('hover-active');
					}
				});
			}
		});
	</script>

	<style>
		.glass {
			background: rgba(255, 255, 255, 0.75);
			border: 1px solid rgba(16, 185, 129, 0.35);
			backdrop-filter: blur(14px);
			-webkit-backdrop-filter: blur(14px);
			box-shadow: 0 8px 32px 0 rgba(0, 255, 102, 0.08);
		}
		.dark .glass {
			background: rgba(6, 20, 11, 0.72);
			border: 1px solid rgba(0, 255, 102, 0.22);
			box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 255, 102, 0.08);
		}
	</style>
</head>
<body class="bg-gray-50 text-gray-900 dark:bg-amoled-bg dark:text-zinc-100 min-h-screen flex flex-col items-center py-10 px-4 overflow-x-hidden">
	<div class="w-full max-w-xl glass rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden z-10">
		<div class="absolute -left-12 -top-12 w-40 h-40 bg-[#00ff66]/10 rounded-full blur-3xl pointer-events-none"></div>
		<div class="absolute -right-12 -bottom-12 w-40 h-40 bg-[#39ff14]/10 rounded-full blur-3xl pointer-events-none"></div>
		<div class="text-center mb-6 relative z-10">
			<div class="inline-flex items-center justify-center w-16 h-16 p-1 bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-400 dark:border-[#00ff66]/60 rounded-2xl mb-3 shadow-md dark:shadow-[0_0_20px_rgba(0,255,102,0.35)]">
				${SHIELD_LOGO_SVG}
			</div>
			<h1 class="text-lg sm:text-xl font-black tracking-tight text-gray-900 dark:text-white mb-1">${BRAND_UPPER} — وضعیت اشتراک</h1>
			<p id="display-username" class="text-sm font-black text-emerald-600 dark:text-[#00ff66] tracking-wide font-mono mb-2"></p>
			<p id="display-flag" class="text-xl font-bold tracking-wide mb-2" style="display:none;"></p>
			<div id="live-connections-badge" class="hidden">
				<span class="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse"></span>
				<span id="live-connections-text" dir="rtl">آماده اتصال</span>
			</div>
		</div>

		<div id="status-card" class="mb-6 rounded-xl p-3.5 text-center border font-bold relative z-10 transition duration-300">
			<span id="status-text" class="text-xs sm:text-sm">در حال بررسی وضعیت اشتراک...</span>
		</div>

		<div class="grid grid-cols-2 gap-3 mb-7 relative z-10">
			<div class="bg-white/60 dark:bg-amoled-card/80 border border-gray-200 dark:border-amoled-border rounded-xl p-3 shadow-sm flex flex-col justify-between">
				<div class="flex justify-between items-center mb-2">
					<span class="text-[11px] font-bold text-gray-600 dark:text-zinc-300 flex items-center gap-1">
						<svg class="w-3.5 h-3.5 text-[#00ff66]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
						حجم مصرفی
					</span>
					<span id="volume-pct" class="text-[10px] font-bold text-gray-800 dark:text-zinc-200">۰٪</span>
				</div>
				<div class="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden mb-2">
					<div id="volume-progress" class="h-1.5 rounded-full transition-all duration-700" style="width: 0%"></div>
				</div>
				<div class="flex justify-between text-[10px] text-gray-500 dark:text-zinc-400 font-medium">
					<span id="used-vol" class="font-bold text-gray-800 dark:text-zinc-200" dir="ltr">-</span>
					<span id="limit-vol" class="font-bold text-gray-800 dark:text-zinc-200" dir="ltr">-</span>
				</div>
			</div>

			<div class="bg-white/60 dark:bg-amoled-card/80 border border-gray-200 dark:border-amoled-border rounded-xl p-3 shadow-sm flex flex-col justify-between">
				<div class="flex justify-between items-center mb-2">
					<span class="text-[11px] font-bold text-gray-600 dark:text-zinc-300 flex items-center gap-1">
						<svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
						زمان باقی‌مانده
					</span>
					<span id="expiry-pct" class="text-[10px] font-bold text-gray-800 dark:text-zinc-200">۰٪</span>
				</div>
				<div class="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden mb-2 flex justify-end">
					<div id="expiry-progress" class="h-1.5 rounded-full transition-all duration-700" style="width: 0%"></div>
				</div>
				<div class="flex justify-between text-[10px] text-gray-500 dark:text-zinc-400 font-medium">
					<span id="days-remaining" class="font-bold text-gray-800 dark:text-zinc-200" dir="rtl">-</span>
					<span id="total-days" class="font-bold text-gray-800 dark:text-zinc-200" dir="rtl">-</span>
				</div>
			</div>

			<div class="bg-white/60 dark:bg-amoled-card/80 border border-gray-200 dark:border-amoled-border rounded-xl p-3 shadow-sm flex flex-col justify-between">
				<div class="flex justify-between items-center mb-2">
					<span class="text-[11px] font-bold text-gray-600 dark:text-zinc-300 flex items-center gap-1">
						<svg class="w-3.5 h-3.5 text-[#39ff14]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
						ریکوئست‌ها
					</span>
					<span id="req-pct" class="text-[10px] font-bold text-gray-800 dark:text-zinc-200">فعال</span>
				</div>
				<div class="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden mb-2">
					<div id="req-progress" class="h-1.5 rounded-full transition-all duration-700" style="width: 100%"></div>
				</div>
				<div class="flex justify-between text-[10px] text-gray-500 dark:text-zinc-400 font-medium">
					<span id="used-req" class="font-bold text-gray-800 dark:text-zinc-200" dir="ltr">-</span>
					<span id="limit-req" class="font-bold text-gray-800 dark:text-zinc-200" dir="ltr">نامحدود</span>
				</div>
			</div>

			<div class="bg-white/60 dark:bg-amoled-card/80 border border-gray-200 dark:border-amoled-border rounded-xl p-3 shadow-sm flex flex-col justify-between">
				<div class="flex justify-between items-center mb-2">
					<span class="text-[11px] font-bold text-gray-600 dark:text-zinc-300 flex items-center gap-1">
						<svg class="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
						سقف دستگاه متصل
					</span>
					<span id="online-pct" class="text-[10px] font-bold text-gray-800 dark:text-zinc-200">مجاز</span>
				</div>
				<div class="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden mb-2">
					<div id="online-progress" class="h-1.5 rounded-full transition-all duration-700" style="width: 100%"></div>
				</div>
				<div class="flex justify-between text-[10px] text-gray-500 dark:text-zinc-400 font-medium">
					<span id="online-count" class="font-bold text-gray-800 dark:text-zinc-200" dir="ltr">۱</span>
					<span id="limit-online" class="font-bold text-gray-800 dark:text-zinc-200" dir="ltr">-</span>
				</div>
			</div>
		</div>

		<div class="border-t border-gray-200 dark:border-amoled-border pt-5 relative z-10">
			<h2 class="text-sm font-black mb-3.5 flex items-center gap-2 text-gray-800 dark:text-zinc-100">
				<svg class="w-4 h-4 text-[#00ff66]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
				دریافت کانفیگ و لینک‌های اشتراک
			</h2>
			<div class="space-y-2.5">
				<button onclick="copyTextSub()" class="w-full flex justify-between items-center px-4 py-3 bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border hover:border-[#00ff66] dark:hover:border-[#00ff66] rounded-xl text-xs font-bold transition shadow-sm cursor-pointer">
					<span class="flex items-center gap-2"><svg class="w-4 h-4 text-[#00ff66]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg> کپی لینک ساب‌اسکریپشن متنی (v2rayNG / Hiddify)</span>
					<span class="text-emerald-600 dark:text-[#00ff66] font-black">کپی</span>
				</button>
				<button onclick="copyYamlSub()" class="w-full flex justify-between items-center px-4 py-3 bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border hover:border-pink-500 dark:hover:border-pink-500 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer">
					<span class="flex items-center gap-2"><svg class="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg> کپی لینک ساب‌اسکریپشن Clash / Mihomo (YAML)</span>
					<span class="text-pink-500 font-black">کپی</span>
				</button>
				<button onclick="copySingboxSub()" class="w-full flex justify-between items-center px-4 py-3 bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border hover:border-cyan-500 dark:hover:border-cyan-400 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer">
					<span class="flex items-center gap-2"><svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg> کپی لینک ساب‌اسکریپشن Sing-box (JSON)</span>
					<span class="text-cyan-500 font-black">کپی</span>
				</button>
				<button onclick="showSubQr()" class="w-full flex justify-between items-center px-4 py-3 bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border hover:border-amber-500 dark:hover:border-amber-500 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer">
					<span class="flex items-center gap-2"><svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 19h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg> نمایش کیوآر کد اشتراک (QR Code)</span>
					<span class="text-amber-500 font-black">نمایش</span>
				</button>
				<button onclick="copyAllNodesConfig()" class="w-full flex justify-between items-center px-4 py-3 bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border hover:border-[#39ff14] dark:hover:border-[#39ff14] rounded-xl text-xs font-bold transition shadow-sm cursor-pointer">
					<span class="flex items-center gap-2"><svg class="w-4 h-4 text-[#39ff14]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> کپی یکجای تمام کانفیگ‌های اتصال (${Array.isArray(nodes) ? nodes.length : 0} نود)</span>
					<span class="text-emerald-500 dark:text-[#39ff14] font-black">کپی</span>
				</button>
			</div>
		</div>

		<div class="border-t border-gray-200 dark:border-amoled-border pt-5 mt-5 relative z-10 w-full">
			<button onclick="document.getElementById('software-downloads-content').classList.toggle('hidden'); document.getElementById('software-downloads-icon').classList.toggle('rotate-180');" class="w-full flex items-center justify-between text-sm font-black mb-3 cursor-pointer focus:outline-none">
				<div class="flex items-center gap-2">
					<svg class="w-4 h-4 text-[#00ff66]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
					<span>دانلود نرم‌افزارهای پیشنهادی</span>
				</div>
				<svg id="software-downloads-icon" class="w-4 h-4 text-gray-500 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
			</button>
			<div id="software-downloads-content" class="hidden grid grid-cols-1 sm:grid-cols-3 gap-3">
				<div class="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-amoled-border rounded-xl p-2.5">
					<div class="flex items-center gap-1.5 mb-2.5 text-emerald-700 dark:text-[#00ff66] font-bold text-[11px]">
						<span>🤖 اندروید</span>
					</div>
					<div class="flex flex-col gap-1.5">
						<a href="https://github.com/2dust/v2rayNG/releases/latest" target="_blank" class="flex justify-between items-center bg-white dark:bg-amoled-card border border-emerald-300 dark:border-amoled-border px-2 py-1.5 rounded text-[10px] font-bold text-emerald-700 dark:text-[#00ff66] hover:border-[#00ff66] transition"><span>v2rayNG (پیشنهادی)</span><span>📥</span></a>
						<a href="https://github.com/hiddify/hiddify-app/releases/latest/download/Hiddify-Android-universal.apk" target="_blank" class="flex justify-between items-center bg-white dark:bg-amoled-card border border-gray-100 dark:border-amoled-border px-2 py-1.5 rounded text-[10px] font-semibold text-gray-700 dark:text-zinc-300 hover:border-[#00ff66] transition"><span>Hiddify</span><span>📥</span></a>
						<a href="https://github.com/Happ-proxy/happ-android/releases/latest/download/Happ.apk" target="_blank" class="flex justify-between items-center bg-white dark:bg-amoled-card border border-gray-100 dark:border-amoled-border px-2 py-1.5 rounded text-[10px] font-semibold text-gray-700 dark:text-zinc-300 hover:border-[#00ff66] transition"><span>Happ</span><span>📥</span></a>
						<a href="https://github.com/chen08209/FlClash/releases" target="_blank" class="flex justify-between items-center bg-white dark:bg-amoled-card border border-pink-300 dark:border-pink-800 px-2 py-1.5 rounded text-[10px] font-bold text-pink-700 dark:text-pink-400 transition"><span>FlClash (YAML)</span><span>📥</span></a>
					</div>
				</div>
				<div class="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30 rounded-xl p-2.5">
					<div class="flex items-center gap-1.5 mb-2.5 text-blue-700 dark:text-blue-400 font-bold text-[11px]">
						<span>💻 ویندوز</span>
					</div>
					<div class="flex flex-col gap-1.5">
						<a href="https://github.com/2dust/v2rayN/releases/latest/download/v2rayN-windows-64.zip" target="_blank" class="flex justify-between items-center bg-white dark:bg-amoled-card border border-blue-300 dark:border-blue-800 px-2 py-1.5 rounded text-[10px] font-bold text-blue-700 dark:text-blue-400 transition"><span>v2rayN (پیشنهادی)</span><span>📥</span></a>
						<a href="https://github.com/hiddify/hiddify-app/releases/latest/download/Hiddify-Windows-Setup-x64.exe" target="_blank" class="flex justify-between items-center bg-white dark:bg-amoled-card border border-gray-100 dark:border-amoled-border px-2 py-1.5 rounded text-[10px] font-semibold text-gray-700 dark:text-zinc-300 transition"><span>Hiddify</span><span>📥</span></a>
						<a href="https://github.com/clash-verge-rev/clash-verge-rev/releases" target="_blank" class="flex justify-between items-center bg-white dark:bg-amoled-card border border-pink-300 dark:border-pink-800 px-2 py-1.5 rounded text-[10px] font-bold text-pink-700 dark:text-pink-400 transition"><span>Clash Verge (YAML)</span><span>📥</span></a>
					</div>
				</div>
				<div class="bg-gray-50/50 dark:bg-zinc-800/30 border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-2.5">
					<div class="flex items-center gap-1.5 mb-2.5 text-gray-700 dark:text-gray-300 font-bold text-[11px]">
						<span>🍎 آیفون / مک</span>
					</div>
					<div class="flex flex-col gap-1.5">
						<a href="https://apps.apple.com/us/app/streisand/id6450534064" target="_blank" class="flex justify-between items-center bg-white dark:bg-amoled-card border border-gray-100 dark:border-amoled-border px-2 py-1.5 rounded text-[10px] font-semibold text-gray-700 dark:text-zinc-300 transition"><span>Streisand</span><span>📥</span></a>
						<a href="https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690" target="_blank" class="flex justify-between items-center bg-white dark:bg-amoled-card border border-gray-100 dark:border-amoled-border px-2 py-1.5 rounded text-[10px] font-semibold text-gray-700 dark:text-zinc-300 transition"><span>V2Box</span><span>📥</span></a>
						<a href="https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532" target="_blank" class="flex justify-between items-center bg-white dark:bg-amoled-card border border-gray-100 dark:border-amoled-border px-2 py-1.5 rounded text-[10px] font-semibold text-gray-700 dark:text-zinc-300 transition"><span>Hiddify</span><span>📥</span></a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="qr-modal" class="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/75 opacity-0 pointer-events-none transition-opacity duration-200 ease-out">
		<div id="qr-modal-card" class="w-full max-w-sm bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-2xl shadow-2xl p-6 transform transition-all scale-95 opacity-0 duration-200 text-center">
			<div class="flex justify-between items-center mb-4">
				<h3 class="text-base font-black text-gray-900 dark:text-white">QR Code اشتراک</h3>
				<button onclick="toggleQrModal(false)" class="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-500">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
				</button>
			</div>
			<div class="flex justify-center bg-white p-4 rounded-xl mb-4 border border-gray-200 dark:border-amoled-border">
				<div id="qrcode-container"></div>
			</div>
			<button onclick="downloadQrCode()" class="w-full py-2.5 bg-transparent border-2 border-emerald-600 text-emerald-700 dark:border-[#00ff66] dark:text-[#00ff66] hover:bg-emerald-900/20 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer">
				<span>دانلود تصویر QR</span>
			</button>
		</div>
	</div>

	<div id="toast-container" class="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none"></div>
	<script>
		window.statusUser = ${safeStatusJson};
		window.USER_NODES = ${safeNodesJson};
		const BASE_ORIGIN = ${JSON.stringify(origin)} || window.location.origin;

		function showToast(message, type = 'success') {
			const container = document.getElementById('toast-container');
			const toast = document.createElement('div');
			const colors = type === 'error'
				? 'bg-red-50 dark:bg-red-900/60 border-red-300 dark:border-red-700 text-red-600 dark:text-red-300'
				: 'bg-emerald-50 dark:bg-emerald-900/60 border-emerald-300 dark:border-[#00ff66] text-emerald-700 dark:text-[#00ff66]';
			toast.className = 'px-4 py-3 border rounded-lg shadow-lg font-bold text-xs sm:text-sm transform transition-all duration-300 -translate-y-full opacity-0 ' + colors;
			toast.innerText = message;
			container.appendChild(toast);
			requestAnimationFrame(() => toast.classList.remove('-translate-y-full', 'opacity-0'));
			setTimeout(() => {
				toast.classList.add('-translate-y-full', 'opacity-0');
				setTimeout(() => toast.remove(), 300);
			}, 3000);
		}

		function getSubUrl(target = '') {
			const base = BASE_ORIGIN + '/sub/' + encodeURIComponent(window.statusUser.uuid || window.statusUser.username);
			return target ? (base + '?target=' + encodeURIComponent(target)) : base;
		}

		function copyTextSub() {
			navigator.clipboard.writeText(getSubUrl()).then(() => showToast('✅ لینک ساب متنی با موفقیت کپی شد!'));
		}
		function copyYamlSub() {
			navigator.clipboard.writeText(getSubUrl('clash')).then(() => showToast('✅ لینک ساب Clash YAML کپی شد!'));
		}
		function copySingboxSub() {
			navigator.clipboard.writeText(getSubUrl('singbox')).then(() => showToast('✅ لینک ساب Sing-box کپی شد!'));
		}
		function copyAllNodesConfig() {
			const text = Array.isArray(window.USER_NODES) && window.USER_NODES.length > 0
				? window.USER_NODES.join('\\n')
				: getSubUrl();
			navigator.clipboard.writeText(text).then(() => showToast('✅ تمام کانفیگ‌های اتصال کپی شدند!'));
		}

		function toggleQrModal(show, text) {
			const modal = document.getElementById('qr-modal');
			const card = document.getElementById('qr-modal-card');
			const container = document.getElementById('qrcode-container');
			if (show) {
				container.innerHTML = '';
				if (typeof QRCodeStyling !== 'undefined') {
					const qrCode = new QRCodeStyling({
						width: 240,
						height: 240,
						data: text,
						margin: 5,
						qrOptions: { errorCorrectionLevel: 'L' },
						dotsOptions: { color: '#020804', type: 'rounded' },
						backgroundOptions: { color: '#ffffff' }
					});
					qrCode.append(container);
				}
				modal.classList.remove('opacity-0', 'pointer-events-none');
				modal.classList.add('opacity-100', 'pointer-events-auto');
				card.classList.remove('opacity-0', 'scale-95');
				card.classList.add('opacity-100', 'scale-100');
			} else {
				modal.classList.remove('opacity-100', 'pointer-events-auto');
				modal.classList.add('opacity-0', 'pointer-events-none');
				card.classList.remove('opacity-100', 'scale-100');
				card.classList.add('opacity-0', 'scale-95');
			}
		}

		function showSubQr() {
			toggleQrModal(true, getSubUrl());
		}

		function downloadQrCode() {
			const container = document.getElementById('qrcode-container');
			const canvas = container ? container.querySelector('canvas') : null;
			if (!canvas) return;
			const a = document.createElement('a');
			a.href = canvas.toDataURL('image/png');
			a.download = 'miliconfig-qr-' + (window.statusUser.username || 'sub') + '.png';
			a.click();
		}

		function getFlagEmoji(countryCode) {
			if (!countryCode) return '<span class="mili-flag-globe">🌐</span>';
			const cc = String(countryCode).toLowerCase().replace(/[^a-z]/g, '');
			if (cc.length !== 2 || cc === 'cf') return '<span class="mili-flag-globe">🌐</span>';
			return '<span class="fi fi-' + cc + ' mili-flag" title="' + cc.toUpperCase() + '"></span>';
		}

		document.addEventListener('DOMContentLoaded', () => {
			const u = window.statusUser;
			if (!u) return;
			document.getElementById('display-username').innerText = u.username;
			const flagEl = document.getElementById('display-flag');
			if (u.user_proxy_iata) {
				flagEl.innerHTML = getFlagEmoji(u.user_proxy_iata) + ' <span class="text-xs font-mono text-gray-400">' + u.user_proxy_iata + '</span>';
				flagEl.style.display = 'block';
			}
			const badge = document.getElementById('live-connections-badge');
			badge.classList.remove('hidden');
			badge.className = 'inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-[#00ff66] rounded-full text-xs font-bold shadow-sm';
			document.getElementById('live-connections-text').innerText = 'حداکثر ' + (u.ip_limit || '∞') + ' دستگاه همزمان';

			const usedGb = u.used_gb || 0;
			const limitGb = u.limit_gb;
			document.getElementById('used-vol').innerText = usedGb < 1 ? (usedGb * 1024).toFixed(0) + ' MB' : usedGb.toFixed(2) + ' GB';
			let isVolumeExpired = false;
			if (limitGb > 0) {
				document.getElementById('limit-vol').innerText = limitGb + ' GB';
				const pct = Math.min((usedGb / limitGb) * 100, 100);
				document.getElementById('volume-pct').innerText = pct.toFixed(0) + '٪';
				document.getElementById('volume-progress').style.width = pct + '%';
				document.getElementById('volume-progress').style.backgroundColor = '#00ff66';
				if (usedGb >= limitGb) isVolumeExpired = true;
			} else {
				document.getElementById('limit-vol').innerText = 'نامحدود';
				document.getElementById('volume-pct').innerText = '∞';
				document.getElementById('volume-progress').style.width = '100%';
				document.getElementById('volume-progress').style.backgroundColor = '#00ff66';
			}

			let isTimeExpired = false;
			if (u.expiry_days > 0) {
				document.getElementById('total-days').innerText = u.expiry_days + ' روز';
				if (u.start_on_first_connect === 1 && !u.first_connection_time) {
					document.getElementById('days-remaining').innerText = u.expiry_days + ' روز (از اولین اتصال)';
					document.getElementById('expiry-pct').innerText = '۱۰۰٪';
					document.getElementById('expiry-progress').style.width = '100%';
					document.getElementById('expiry-progress').style.backgroundColor = '#00ff66';
				} else {
					const targetExpire = u.expire_at > 0 ? u.expire_at : ((u.first_connection_time || u.created_at) + u.expiry_days * 86400000);
					const diffDays = Math.ceil((targetExpire - Date.now()) / 86400000);
					const rem = diffDays > 0 ? diffDays : 0;
					document.getElementById('days-remaining').innerText = rem + ' روز';
					const pct = Math.max(0, Math.min(100, (rem / u.expiry_days) * 100));
					document.getElementById('expiry-pct').innerText = pct.toFixed(0) + '٪';
					document.getElementById('expiry-progress').style.width = pct + '%';
					document.getElementById('expiry-progress').style.backgroundColor = '#00ff66';
					if (Date.now() > targetExpire) isTimeExpired = true;
				}
			} else {
				document.getElementById('days-remaining').innerText = 'نامحدود';
				document.getElementById('total-days').innerText = 'نامحدود';
				document.getElementById('expiry-pct').innerText = '∞';
				document.getElementById('expiry-progress').style.width = '100%';
				document.getElementById('expiry-progress').style.backgroundColor = '#00ff66';
			}

			document.getElementById('used-req').innerText = (u.used_req || 0).toLocaleString();
			document.getElementById('req-progress').style.backgroundColor = '#39ff14';
			document.getElementById('limit-online').innerText = u.ip_limit || 'نامحدود';
			document.getElementById('online-progress').style.backgroundColor = '#00ff66';

			const statusCard = document.getElementById('status-card');
			const statusText = document.getElementById('status-text');
			if (u.is_active === 0) {
				statusCard.className = 'mb-6 rounded-xl p-3.5 text-center border font-bold relative z-10 bg-red-50 dark:bg-red-500/10 border-red-300 dark:border-red-500/30 text-red-600 dark:text-red-400';
				statusText.innerText = '❌ وضعیت اشتراک: غیرفعال / مسدود شده';
			} else if (isVolumeExpired || isTimeExpired) {
				statusCard.className = 'mb-6 rounded-xl p-3.5 text-center border font-bold relative z-10 bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/30 text-amber-600 dark:text-amber-400';
				statusText.innerText = isVolumeExpired ? '⚠️ وضعیت اشتراک: اتمام حجم مجاز' : '⏳ وضعیت اشتراک: پایان زمان اعتبار';
			} else {
				statusCard.className = 'mb-6 rounded-xl p-3.5 text-center border font-bold relative z-10 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-[#00ff66]/40 text-emerald-700 dark:text-[#00ff66]';
				statusText.innerText = '✅ وضعیت اشتراک: فعال و آماده اتصال';
			}
		});
	</script>
	
	<canvas id="neonWavesCanvas" class="bg-canvas"></canvas>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
	<script>
	  (function initWaves(){
		const canvas = document.getElementById('neonWavesCanvas') || document.getElementById('waves');
		if (!canvas) return;
		if (localStorage.getItem('gfx-enabled') === 'false') {
			canvas.style.display = 'none';
			return;
		}
		const IS_MOBILE = window.innerWidth < 768;
		const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: false, powerPreference: "default" });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
		renderer.setSize(window.innerWidth, window.innerHeight);
		const isDarkInit = document.documentElement.classList.contains('dark');
		renderer.setClearColor(isDarkInit ? 0x020804 : 0xecfdf5, 1);
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 200);
		camera.position.set(0, 0, IS_MOBILE ? 35 : 14);
		const segX = 80;
		const segY = 40;
		const geom = new THREE.PlaneGeometry(80, IS_MOBILE ? 90 : 40, segX, segY);
		const vertShader = "uniform float uTime; uniform float uStrength; varying float vElev; void main(){ vec3 p = position; float x = p.x * 0.2 + uTime * 0.3; float y = p.y * 0.2 + uTime * 0.25; float wave = sin(x)*cos(y)*1.6 + sin(x*2.1 + uTime)*0.7 + cos(y*1.7 - uTime*0.6)*0.7; wave *= uStrength * 1.5; p.z += wave; vElev = wave; gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }";
		const fragShader = "varying float vElev; uniform vec3 uHigh; uniform vec3 uLow; uniform float uFade; void main(){ float t = clamp((vElev + 2.0) / 4.0, 0.0, 1.0); vec3 col = mix(uLow, uHigh, t); gl_FragColor = vec4(col, uFade); }";
		function makePlane(px, py, pz, rx, ry, rz, high, low, fade){
		  const mat = new THREE.ShaderMaterial({
			wireframe: true,
			transparent: true,
			depthWrite: false,
			uniforms:{
			  uTime:{value:0},
			  uStrength:{value:1.1},
			  uHigh:{value:new THREE.Color(high)},
			  uLow:{value:new THREE.Color(low)},
			  uFade:{value:fade}
			},
			vertexShader: vertShader,
			fragmentShader: fragShader
		  });
		  const m = new THREE.Mesh(geom, mat);
		  m.position.set(px, py, pz);
		  m.rotation.set(rx, ry, rz);
		  return m;
		}
		const yOffset = IS_MOBILE ? 14 : 8;
		const topPlane = makePlane(0, yOffset, -5, -Math.PI/2.4, 0, 0, '#00ff66', '#041209', 0.32);
		const midPlane = makePlane(0, 0, -25, 0, 0, 0, '#39ff14', '#020804', 0.14);
		const botPlane = makePlane(0, -yOffset, -5, Math.PI/2.4, 0, 0, '#00ff66', '#020804', 0.22);
		scene.add(topPlane);
		scene.add(midPlane);
		scene.add(botPlane);
		const clock = new THREE.Clock();
		let lastFrameTime = 0;
		function animate(timestamp) {
		  requestAnimationFrame(animate);
		  if (timestamp - lastFrameTime < 30) return;
		  lastFrameTime = timestamp;
		  const t = clock.getElapsedTime();
		  topPlane.material.uniforms.uTime.value = t * 0.8;
		  midPlane.material.uniforms.uTime.value = t * 0.6;
		  botPlane.material.uniforms.uTime.value = t * 0.8;
		  renderer.render(scene, camera);
		}
		requestAnimationFrame(animate);
		window.addEventListener('resize', function(){
		  camera.aspect = window.innerWidth/window.innerHeight;
		  camera.updateProjectionMatrix();
		  renderer.setSize(window.innerWidth, window.innerHeight);
		});
		function retintScene(){
		  const isDark = document.documentElement.classList.contains('dark');
		  if (renderer) renderer.setClearColor(isDark ? 0x020804 : 0xecfdf5, 1);
		  const pColor = isDark ? '#00ff66' : '#059669';
		  const pDark = isDark ? '#020804' : '#ecfdf5';
		  const pOpacity = isDark ? 0.18 : 0.22;
		  if (botPlane) {
			botPlane.material.uniforms.uHigh.value.set(pColor);
			botPlane.material.uniforms.uLow.value.set(pDark);
			botPlane.material.uniforms.uFade.value = pOpacity;
		  }
		  if (midPlane) {
			midPlane.material.uniforms.uHigh.value.set(isDark ? '#39ff14' : '#10b981');
			midPlane.material.uniforms.uLow.value.set(pDark);
			midPlane.material.uniforms.uFade.value = pOpacity * 0.7;
		  }
		  if (topPlane) {
			topPlane.material.uniforms.uLow.value.set(isDark ? '#041209' : '#ecfdf5');
			topPlane.material.uniforms.uHigh.value.set(isDark ? '#00ff66' : '#34d399');
		  }
		}
		const observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.attributeName === 'class') retintScene();
			});
		});
		observer.observe(document.documentElement, { attributes: true });
		retintScene();
	  })();
	</script>

</body>
</html>`;
}
