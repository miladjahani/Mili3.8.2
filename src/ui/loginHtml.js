// ============================================================================
// miliconfig v3.8.1 - درگاه ورود، راه‌اندازی اولیه رمز و بازیابی (قالب نئون سبز AMOLED)
// ============================================================================

import { BRAND_UPPER, TELEGRAM_SUPPORT, VERSION } from '../config/defaults.js';
import { SHIELD_LOGO_SVG } from './icons.js';

export function renderLoginGatewayHtml(options = {}) {
  const isInitialized = options.initialized !== false;
  const customPath = String(options.customPath || 'admin').trim();

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl" class="dark">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${isInitialized ? 'ورود به پنل مدیریت' : 'تعریف رمز عبور پنل'} — ${BRAND_UPPER}</title>
	
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

</head>
<body class="bg-gray-50 text-gray-900 dark:bg-amoled-bg dark:text-zinc-100 min-h-screen flex flex-col items-center justify-center p-4 gap-6">
	<div class="w-full max-w-md bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-xl shadow-[0_0_35px_rgba(0,255,102,0.12)] p-6 relative z-10">
		<div class="flex flex-col items-center justify-center mb-5">
			<div class="w-16 h-16 rounded-2xl p-1 bg-emerald-950/60 border border-emerald-500/40 shadow-[0_0_20px_rgba(0,255,102,0.3)] mb-3">
				${SHIELD_LOGO_SVG}
			</div>
			<div class="flex items-center gap-2" dir="ltr">
				<span class="text-lg font-black tracking-wider text-emerald-600 dark:text-[#00ff66] drop-shadow-[0_0_8px_rgba(0,255,102,0.4)]">${BRAND_UPPER}</span>
				<span class="text-[11px] px-2 py-0.5 font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-[#39ff14] border border-emerald-500/30 rounded-full">${VERSION}</span>
			</div>
		</div>

		<div id="setup-section" class="${isInitialized ? 'hidden' : ''}">
			<h2 class="text-xl font-bold mb-2 text-center text-emerald-600 dark:text-[#00ff66]">تنظیم رمز عبور جدید</h2>
			<p class="text-xs text-gray-500 dark:text-gray-400 text-center mb-6 leading-relaxed">این اولین ورود شما به پنل مدیریت است. لطفاً رمز عبور مدیریت خود را تعیین کنید.</p>
			<form onsubmit="handleSetup(event)" class="space-y-4">
				<div>
					<label class="block text-xs font-bold mb-1.5 text-gray-700 dark:text-zinc-300">رمز عبور جدید (حداقل ۴ کاراکتر)</label>
					<input type="password" id="setup-password" class="w-full px-3 py-2.5 bg-gray-50 dark:bg-amoled-input border border-gray-300 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-center font-mono" required minlength="4" placeholder="••••••••">
				</div>
				<div>
					<label class="block text-xs font-bold mb-1.5 text-gray-700 dark:text-zinc-300">تکرار رمز عبور</label>
					<input type="password" id="setup-confirm-password" class="w-full px-3 py-2.5 bg-gray-50 dark:bg-amoled-input border border-gray-300 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-center font-mono" required minlength="4" placeholder="••••••••">
				</div>
				<button type="submit" id="setup-submit-btn" class="w-full py-2.5 bg-transparent border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-900/20 dark:border-[#00ff66] dark:text-[#00ff66] dark:hover:bg-emerald-900/40 rounded-lg text-sm transition font-black shadow-[0_0_15px_rgba(0,255,102,0.2)] cursor-pointer">ثبت رمز و ورود به پنل</button>
			</form>
		</div>

		<div id="login-section" class="${isInitialized ? '' : 'hidden'}">
			<h2 class="text-xl font-bold mb-6 text-center text-emerald-600 dark:text-[#00ff66]">ورود به پنل مدیریت</h2>
			<form onsubmit="handleLogin(event)" class="space-y-4">
				<div>
					<label class="block text-xs font-bold mb-1.5 text-gray-700 dark:text-zinc-300">رمز عبور مدیریت</label>
					<input type="password" id="login-password" class="w-full px-3 py-2.5 bg-gray-50 dark:bg-amoled-input border border-gray-300 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-center font-mono" required placeholder="••••••••">
				</div>
				<button type="submit" id="login-submit-btn" class="w-full py-2.5 bg-transparent border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-900/20 dark:border-[#00ff66] dark:text-[#00ff66] dark:hover:bg-emerald-900/40 rounded-lg text-sm transition font-black shadow-[0_0_15px_rgba(0,255,102,0.2)] cursor-pointer">ورود به پنل</button>
			</form>
			<div class="mt-4 text-center">
				<button type="button" onclick="toggleRecovery(true)" class="text-xs text-emerald-500 hover:text-[#00ff66] transition font-bold cursor-pointer">بازیابی رمز پنل با UUID مدیر</button>
			</div>
		</div>

		<div id="recovery-section" class="hidden">
			<h2 class="text-lg font-bold mb-3 text-center text-amber-500">بازیابی رمز عبور پنل</h2>
			<div class="mb-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 rounded-lg text-xs leading-relaxed text-amber-800 dark:text-amber-300">
				برای بازنشانی رمز عبور، شناسه مسیر مدیریت (UUID مدیر یا مسیر سفارشی) و رمز عبور جدید خود را وارد نمایید.
			</div>
			<form onsubmit="handleRecovery(event)" class="space-y-3">
				<div>
					<label class="block text-xs font-bold mb-1 text-gray-700 dark:text-zinc-300">UUID یا مسیر مدیریت</label>
					<input type="text" id="recovery-uuid" placeholder="UUID یا مسیر پنل" dir="ltr" class="w-full px-3 py-2 bg-gray-50 dark:bg-amoled-input border border-gray-300 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs text-center font-mono" required>
				</div>
				<div>
					<label class="block text-xs font-bold mb-1 text-gray-700 dark:text-zinc-300">رمز عبور جدید</label>
					<input type="password" id="recovery-password" placeholder="حداقل ۴ کاراکتر" dir="ltr" minlength="4" class="w-full px-3 py-2 bg-gray-50 dark:bg-amoled-input border border-gray-300 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs text-center font-mono" required>
				</div>
				<div class="flex gap-2 pt-2">
					<button type="button" onclick="toggleRecovery(false)" class="w-1/3 py-2.5 bg-transparent border-2 border-red-600 text-red-600 dark:text-red-400 hover:bg-red-900/20 font-bold rounded-lg text-xs transition cursor-pointer">انصراف</button>
					<button type="submit" id="recover-btn" class="w-2/3 py-2.5 bg-transparent border-2 border-emerald-600 text-emerald-700 dark:border-[#00ff66] dark:text-[#00ff66] hover:bg-emerald-900/30 font-black rounded-lg text-xs transition cursor-pointer">ثبت رمز جدید</button>
				</div>
			</form>
		</div>
	</div>

	<div class="flex flex-wrap items-center gap-3 justify-center relative z-10 w-full max-w-md">
		<a href="https://t.me/${String(TELEGRAM_SUPPORT || '@miliconfig').replace('@', '')}" target="_blank" class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-full shadow-sm hover:border-[#00ff66] transition text-xs font-bold text-gray-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-[#00ff66]">
			<svg class="w-4 h-4 text-[#00ff66]" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.94-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.37.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
			</svg>
			<span>پشتیبانی تلگرام</span>
		</a>
	</div>

	<div id="toast-container" class="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none"></div>
	<script>
		const DEFAULT_REDIRECT = '/' + ${JSON.stringify(customPath || 'admin')};
		function showToast(message, type = 'success') {
			const container = document.getElementById('toast-container');
			const toast = document.createElement('div');
			const colors = type === 'error'
				? 'bg-red-50 dark:bg-red-900/60 border-red-300 dark:border-red-700 text-red-600 dark:text-red-300'
				: 'bg-emerald-50 dark:bg-emerald-900/60 border-emerald-300 dark:border-[#00ff66] text-emerald-700 dark:text-[#00ff66]';
			toast.className = 'px-4 py-3 border rounded-lg shadow-lg font-bold text-xs sm:text-sm transform transition-all duration-300 -translate-y-full opacity-0 ' + colors;
			toast.innerText = message;
			container.appendChild(toast);
			requestAnimationFrame(() => {
				toast.classList.remove('-translate-y-full', 'opacity-0');
			});
			setTimeout(() => {
				toast.classList.add('-translate-y-full', 'opacity-0');
				setTimeout(() => toast.remove(), 300);
			}, 3000);
		}
		function toggleRecovery(show) {
			document.getElementById('login-section').classList.toggle('hidden', show);
			document.getElementById('recovery-section').classList.toggle('hidden', !show);
		}
		async function handleSetup(event) {
			event.preventDefault();
			const password = document.getElementById('setup-password').value.trim();
			const confirmPassword = document.getElementById('setup-confirm-password').value.trim();
			const btn = document.getElementById('setup-submit-btn');
			if (password !== confirmPassword) {
				showToast('⚠️ رمز عبور و تکرار آن مطابقت ندارند!', 'error');
				return;
			}
			btn.disabled = true;
			btn.innerText = 'در حال ثبت...';
			try {
				const res = await fetch('/api/admin/setup-password', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ password })
				});
				const data = await res.json();
				if (res.ok && data.success) {
					showToast('✅ رمز عبور با موفقیت تنظیم شد. در حال ورود...', 'success');
					setTimeout(() => {
						window.location.href = data.redirect || DEFAULT_REDIRECT;
					}, 900);
				} else {
					showToast('❌ ' + (data.message || data.error || 'عملیات ناموفق بود'), 'error');
				}
			} catch (err) {
				showToast('❌ خطا در ارتباط با سرور', 'error');
			} finally {
				btn.disabled = false;
				btn.innerText = 'ثبت رمز و ورود به پنل';
			}
		}
		async function handleLogin(event) {
			event.preventDefault();
			const password = document.getElementById('login-password').value.trim();
			const btn = document.getElementById('login-submit-btn');
			btn.disabled = true;
			btn.innerText = 'در حال بررسی...';
			try {
				const res = await fetch('/api/admin/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ password })
				});
				const data = await res.json();
				if (res.ok && data.success) {
					showToast('✅ ورود موفقیت‌آمیز! در حال انتقال...', 'success');
					setTimeout(() => {
						window.location.href = data.redirect || DEFAULT_REDIRECT;
					}, 600);
				} else {
					showToast('❌ ' + (data.message || data.error || 'رمز عبور اشتباه است'), 'error');
				}
			} catch (err) {
				showToast('❌ خطا در ارتباط با سرور', 'error');
			} finally {
				btn.disabled = false;
				btn.innerText = 'ورود به پنل';
			}
		}
		async function handleRecovery(event) {
			event.preventDefault();
			const uuid = document.getElementById('recovery-uuid').value.trim();
			const password = document.getElementById('recovery-password').value.trim();
			const btn = document.getElementById('recover-btn');
			btn.disabled = true;
			btn.innerText = 'در حال بازیابی...';
			try {
				const res = await fetch('/api/admin/reset-password', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ uuid, password })
				});
				const data = await res.json();
				if (res.ok && data.success) {
					showToast('✅ رمز عبور با موفقیت بازنشانی شد!', 'success');
					setTimeout(() => {
						window.location.href = data.redirect || DEFAULT_REDIRECT;
					}, 900);
				} else {
					showToast('❌ ' + (data.message || data.error || 'شناسه مدیریت نامعتبر است'), 'error');
				}
			} catch (err) {
				showToast('❌ خطا در ارتباط با سرور', 'error');
			} finally {
				btn.disabled = false;
				btn.innerText = 'ثبت رمز جدید';
			}
		}
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
