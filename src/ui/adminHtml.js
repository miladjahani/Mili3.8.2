// ============================================================================
// miliconfig v3.8.1 - قالب کامل پنل مدیریت سبز نئونی AMOLED (مبتنی بر اسکیل استخراج‌شده)
// ============================================================================

import {
  BRAND_NAME,
  BRAND_UPPER,
  MAX_USERS_LIMIT,
  TELEGRAM_SUPPORT,
  VERSION
} from '../config/defaults.js';
import { SHIELD_LOGO_SVG } from './icons.js';

const COMMON_HEAD = `
	<script>
		window.GLOBAL_GFX = "true";
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
		.mili-shield-svg { width: 100%; height: 100%; display: block; }
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
			background-color: rgba(0, 255, 102, 0.2);
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
`;

const COMMON_TOAST_HTML = `<div id="toast-container" class="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none"></div>`;

const COMMON_WAVES_SCRIPT = `
	<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
	<script>
	  (function initWaves(){
		const canvas = document.getElementById('waves') || document.getElementById('neonWavesCanvas');
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
		const geom = new THREE.PlaneGeometry(80, IS_MOBILE ? 90 : 40, 80, 40);
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
`;

export function renderAdminDashboardHtml(initialData = {}) {
  const safeInitialJson = JSON.stringify({
    brand: BRAND_NAME,
    brandUpper: BRAND_UPPER,
    version: VERSION,
    maxUsersLimit: MAX_USERS_LIMIT,
    support: TELEGRAM_SUPPORT,
    ...initialData
  }).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${BRAND_UPPER} — پنل مدیریت نئونی</title>
	<link rel="icon" type="image/svg+xml" href="/pwa-icon.svg">
	<script>
		
		const originalWarn = console.warn;
		console.warn = (...args) => {
			if (typeof args[0] === 'string' && args[0].includes('cdn.tailwindcss.com')) return;
			originalWarn(...args);
		};
	</script>
	${COMMON_HEAD}
	<style>
		body { font-family: 'Vazirmatn', sans-serif; }
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
		input[type="checkbox"] {
			accent-color: #00ff66;
		}
		.dark input[type="checkbox"] {
			filter: none;
		}
		::-webkit-scrollbar {
			width: 6px;
			height: 6px;
		}
		::-webkit-scrollbar-track {
			background: #f3f4f6; 
			border-radius: 4px;
		}
		::-webkit-scrollbar-thumb {
			background: #d1d5db; 
			border-radius: 4px;
		}
		::-webkit-scrollbar-thumb:hover {
			background: #9ca3af;
		}
		html.dark::-webkit-scrollbar-track,
		.dark *::-webkit-scrollbar-track {
			background: #020804 !important;
		}
		html.dark::-webkit-scrollbar-thumb,
		.dark *::-webkit-scrollbar-thumb {
			background: #0b2214 !important;
		}
		html.dark::-webkit-scrollbar-thumb:hover,
		.dark *::-webkit-scrollbar-thumb:hover {
			background: #00ff66 !important;
		}
		html, body, .custom-scrollbar {
			scrollbar-width: thin;
			scrollbar-color: #d1d5db #f3f4f6;
		}
		html.dark, html.dark body, .dark .custom-scrollbar {
			scrollbar-color: #00ff66 #020804 !important;
		}
		@media (min-width: 769px) {
			header, main { zoom: 1.25; }
		}
		@media (max-width: 768px) {
			header, main { zoom: 0.90; }
		}
		input[type="number"]::-webkit-outer-spin-button,
		input[type="number"]::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		input[type="number"] {
			-moz-appearance: textfield;
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
		.bg-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; will-change: transform; transform: translateZ(0); }
		#waves { position: fixed; inset: 0; width: 100%; height: 100%; display: block; }
		.vignette {
			position: fixed; inset: 0; z-index: 2; pointer-events: none;
			background: radial-gradient(ellipse at center, transparent 35%, rgba(235, 238, 243, 0.6) 100%);
		}
		.dark .vignette {
			background: radial-gradient(ellipse at center, transparent 35%, rgba(0,1,5,0.85) 100%);
		}
		.ambient {
			position: fixed; inset: 0; z-index: 1; pointer-events: none;
			background:
				radial-gradient(700px 500px at 12% 20%, var(--bg-tint), transparent 60%),
				radial-gradient(800px 600px at 90% 90%, var(--bg-tint), transparent 60%);
		}
		@keyframes violentShake {
			0%, 100% { transform: translateX(0); }
			10%, 30%, 50%, 70%, 90% { transform: translateX(-4px) rotate(-3deg); }
			20%, 40%, 60%, 80% { transform: translateX(4px) rotate(3deg); }
		}
		.animate-violent-shake {
			animation: violentShake 0.4s cubic-bezier(.36,.07,.19,.97) infinite;
		}
		@keyframes symBounce {
			0%, 100% { transform: translateY(-2px); }
			50% { transform: translateY(2px); }
		}
		.animate-sym-bounce {
			animation: symBounce 2s ease-in-out infinite;
		}
	</style>
</head>
<body class="bg-gray-100 dark:bg-amoled-bg text-gray-900 dark:text-zinc-100 min-h-screen transition-colors duration-200">
	<canvas id="waves" class="bg-canvas"></canvas><canvas id="neonWavesCanvas" class="bg-canvas" style="display:none"></canvas>
	<header class="border-b border-gray-200 dark:border-amoled-border bg-gray-50/95 dark:bg-amoled-card/95 px-4 py-3 md:py-4 relative z-10 md:sticky md:top-0 md:z-40 backdrop-blur-md">
		<div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
			<div class="flex flex-row justify-between items-center w-full md:w-auto gap-2">
				<h1 class="text-lg font-black flex items-center gap-2.5 flex-shrink-0 text-emerald-700 dark:text-[#00ff66]" dir="ltr">
					<span class="w-8 h-8 rounded-xl p-0.5 bg-emerald-950/80 border border-[#00ff66]/50 shadow-[0_0_12px_rgba(0,255,102,0.35)] inline-flex items-center justify-center flex-shrink-0">${SHIELD_LOGO_SVG}</span>
					<span class="tracking-wider drop-shadow-[0_0_8px_rgba(0,255,102,0.35)]">${BRAND_UPPER}</span>
					<span id="panel-version" class="text-xs px-2 py-0.5 font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-[#39ff14] border border-[#00ff66]/30 rounded-full">${VERSION}</span>
				</h1>
				<div class="flex items-center gap-2">
					<div class="flex items-center gap-2 sm:gap-3 bg-gray-100 dark:bg-zinc-800/60 px-3 py-1.5 rounded-full border border-gray-200 dark:border-amoled-border/80 shadow-sm flex-shrink-0" dir="ltr">
						<a href="https://github.com/miliconfig" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-all transform hover:scale-125 duration-200 flex-shrink-0" title="GitHub">
							<svg class="w-[22px] h-[22px] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
							</svg>
						</a>
						<a href="https://t.me/miliconfig" target="_blank" rel="noopener noreferrer" class="text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-all transform hover:scale-125 duration-200 flex-shrink-0" title="Telegram">
							<svg class="w-[22px] h-[22px] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.94-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.37.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
							</svg>
						</a>
						<a href="https://t.me/miliconfig" target="_blank" rel="noopener noreferrer" class="text-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all transform hover:scale-125 duration-200 flex-shrink-0" title="Bot">
							<svg class="w-[22px] h-[22px] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M12 8V4H8"/>
								<rect width="16" height="12" x="4" y="8" rx="2"/>
								<path d="M2 14h2"/>
								<path d="M20 14h2"/>
								<path d="M15 13v2"/>
								<path d="M9 13v2"/>
							</svg>
						</a>
						<button type="button" onclick="navigator.clipboard.writeText(window.location.origin + '/' + window.ADMIN_PATH).then(() => showToast('✅ آدرس پنل با موفقیت کپی شد!'))" class="text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 transition-all transform hover:scale-125 duration-200 flex-shrink-0 cursor-pointer" title="کپی آدرس پنل">
							<svg class="w-[22px] h-[22px] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
								<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
							</svg>
						</button>
					</div>
					<button id="mobile-menu-toggle" onclick="const c = document.getElementById('mobile-menu-collapse'); const i = document.getElementById('mobile-menu-icon'); c.classList.toggle('max-h-0'); c.classList.toggle('max-h-[500px]'); c.classList.toggle('opacity-0'); c.classList.toggle('opacity-100'); c.classList.toggle('mt-3'); i.classList.toggle('rotate-180');" class="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-gray-200/80 dark:bg-zinc-800/80 text-gray-600 dark:text-zinc-300 focus:outline-none transition-colors duration-200 shadow-sm border border-gray-300 dark:border-zinc-700 cursor-pointer flex-shrink-0">
						<svg id="mobile-menu-icon" class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
					</button>
				</div>
			</div>
			<div id="mobile-menu-collapse" class="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out md:max-h-none md:opacity-100 md:overflow-visible w-full md:w-auto">
				<div class="flex flex-wrap items-center justify-center gap-3 w-full max-w-[260px] mx-auto md:max-w-none md:mx-0 md:w-auto md:mt-0">
					<button id="pwa-install-btn" onclick="triggerPwaInstall()" class="w-9 h-9 rounded-full inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 text-white shadow-md hover:shadow-lg hover:shadow-indigo-500/30 transform hover:scale-110 cursor-pointer border-none" title="دانلود و نصب اپلیکیشن پنل">
						<svg class="w-5 h-5 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
					</button>
					<button onclick="toggleSupportModal(true)" class="w-9 h-9 rounded-full inline-flex items-center justify-center bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-900 hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200 text-red-600 dark:text-red-400 shadow-sm" title="حمایت از ما">
						<svg class="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/></svg>
					</button>
					<button onclick="toggleInfoModal(true)" class="w-9 h-9 rounded-full inline-flex items-center justify-center bg-purple-50 dark:bg-purple-950/30 border border-purple-300 dark:border-purple-900 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all duration-200 text-purple-600 dark:text-purple-400 shadow-sm" title="اطلاعات">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
					</button>
					<button onclick="restartCore()" class="w-9 h-9 rounded-full inline-flex items-center justify-center bg-blue-50 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-900 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200 text-emerald-600 dark:text-[#00ff66] shadow-sm" title="ری استارت پـنـل">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
					</button>
					<button id="grayscale-toggle" class="w-9 h-9 rounded-full inline-flex items-center justify-center bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-400 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200 text-zinc-600 dark:text-zinc-400 shadow-sm" title="حالت سیاه‌سفید">
						<svg class="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20" /><path d="M12 2a10 10 0 0 1 0 20Z" fill="currentColor" opacity="0.3" /><path d="M12 2a10 10 0 0 0 0 20Z" /></svg>
					</button>
					<button id="theme-toggle" class="w-9 h-9 rounded-full inline-flex items-center justify-center bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-900 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all duration-200 text-amber-500 dark:text-amber-400 shadow-sm" title="تغییر تم">
						<svg id="sun-icon" class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
						<svg id="moon-icon" class="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
					</button>
					<button id="update-toggle" onclick="checkForUpdates(true)" class="w-9 h-9 rounded-full inline-flex items-center justify-center bg-green-50 dark:bg-green-950/30 border border-green-300 dark:border-green-900 hover:bg-green-100 dark:hover:bg-green-900/50 transition-all duration-200 text-green-700 dark:text-green-500 relative shadow-sm" title="آپدیت">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"></path></svg>
						<span id="update-badge" class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 border-2 border-green-50 dark:border-green-900 rounded-full hidden animate-pulse"></span>
					</button>
					<button onclick="toggleSettingsModal(true)" class="w-9 h-9 rounded-full inline-flex items-center justify-center bg-gray-50 dark:bg-zinc-800/50 border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-700/80 transition-all duration-200 text-gray-600 dark:text-zinc-400 shadow-sm" title="تنظیمات">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
					</button>
					<button onclick="logoutAdmin()" class="w-9 h-9 rounded-full inline-flex items-center justify-center bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-900 hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200 text-red-600 dark:text-red-400 shadow-sm hover:shadow-md" title="خروج">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
					</button>
				</div>
			</div>
		</div>
	</header>
	<main class="max-w-6xl mx-auto px-4 py-8 pb-56 md:pb-32 relative z-10">
<div class="bg-gray-50/70 dark:bg-amoled-input/30 border border-gray-300 dark:border-amoled-border rounded-xl mb-6 shadow-sm flex flex-col overflow-hidden">
	<button onclick="const w = document.getElementById('stats-accordion-wrapper'); const i = document.getElementById('stats-accordion-icon'); w.classList.toggle('max-h-0'); w.classList.toggle('opacity-0'); w.classList.toggle('max-h-[500px]'); w.classList.toggle('opacity-100'); i.classList.toggle('rotate-180'); localStorage.setItem('mili_stats_hidden', w.classList.contains('max-h-0'));" class="w-full flex items-center justify-between text-xs font-bold cursor-pointer outline-none focus:outline-none focus:ring-0 [-webkit-tap-highlight-color:transparent] px-4 py-2 hover:bg-gray-100/50 dark:hover:bg-zinc-800/30 transition-all duration-300 relative z-20">
		<div class="flex items-center gap-2">
			<div class="p-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-[#00ff66] rounded-md">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
			</div>
			<span class="text-gray-800 dark:text-zinc-200 text-sm">آمار و وضعیت سرور</span>
		</div>
		<svg id="stats-accordion-icon" class="w-4 h-4 text-gray-500 transition-transform duration-300 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
	</button>
	<div id="stats-accordion-wrapper" class="transition-all duration-500 ease-in-out overflow-hidden max-h-[500px] opacity-100">
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-3 px-3 pb-3 border-t border-gray-200/50 dark:border-amoled-border pt-3">
	<div class="bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-md p-2.5 shadow-sm flex flex-col justify-center gap-1 hover:shadow-md hover:border-blue-400 dark:hover:border-[#00ff66]/50 transition duration-300 relative overflow-hidden group min-h-[64px]">
		<div id="stat-total-users" class="hidden">0</div>
		<div class="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl group-hover:scale-150 transition duration-500"></div>
		<div class="flex items-center justify-between relative z-10">
			<span class="text-[11px] sm:text-xs font-semibold text-gray-500 dark:text-zinc-400 whitespace-nowrap">ترافیک مصرفی سرور</span>
			<div class="p-1 bg-blue-50 dark:bg-blue-950/30 text-emerald-600 dark:text-[#00ff66] rounded-md flex-shrink-0">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
			</div>
		</div>
		<div class="flex items-end justify-between relative z-10 w-full mt-0.5">
			<div class="text-lg font-black text-emerald-600 dark:text-[#00ff66] transition-all whitespace-nowrap leading-none" id="stat-total-usage">0 GB</div>
			<span class="text-[9px] text-blue-500 dark:text-blue-400 flex items-center gap-0.5 font-medium whitespace-nowrap leading-none mb-0.5">
				<svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path></svg>
				مجموع
			</span>
		</div>
	</div>
	<div class="bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-md p-2.5 shadow-sm flex flex-col justify-center gap-1 hover:shadow-md hover:border-green-400 dark:hover:border-green-500/50 transition duration-300 relative overflow-hidden group min-h-[64px]">
		<div class="absolute -right-4 -bottom-4 w-16 h-16 bg-green-500/10 rounded-full blur-xl group-hover:scale-150 transition duration-500"></div>
		<div class="flex items-center justify-between relative z-10">
			<span class="text-[11px] sm:text-xs font-semibold text-gray-500 dark:text-zinc-400 whitespace-nowrap flex items-center gap-1">
				<span>تعداد اتصال ها</span>
				<button type="button" onclick="openOnlineCounterWarning();" class="text-red-500 hover:text-red-400 transition-transform hover:scale-110 cursor-pointer inline-flex items-center" title="هشدار">
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
				</button>
			</span>
			<div class="p-1 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-md flex-shrink-0">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
			</div>
		</div>
		<div class="flex items-end justify-between relative z-10 w-full mt-0.5">
			<div class="text-lg font-black text-green-600 dark:text-green-400 transition-all leading-none" id="stat-active-users">0</div>
			<span class="text-[9px] text-green-500 dark:text-green-400 flex items-center gap-1 font-medium whitespace-nowrap leading-none mb-0.5">
				<span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
				متصل در این لحظه
			</span>
		</div>
	</div>
	<div id="card-cf-requests" class="bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-md p-2.5 shadow-sm flex flex-col justify-center gap-1 hover:shadow-md hover:border-orange-400 dark:hover:border-orange-500/50 transition duration-300 relative overflow-hidden group min-h-[64px]">
		<div class="absolute -right-4 -bottom-4 w-16 h-16 bg-orange-500/10 rounded-full blur-xl group-hover:scale-150 transition duration-500"></div>
		<div class="flex items-center justify-between relative z-10">
			<span class="text-[11px] sm:text-xs font-semibold text-gray-500 dark:text-zinc-400 whitespace-nowrap">ریکوئست‌های روزانه</span>
			<div class="p-1 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 rounded-md flex-shrink-0">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
			</div>
		</div>
		<div class="relative z-10 min-w-0 flex-1 w-full mt-0.5">
			<div class="flex items-end justify-between w-full mb-1.5">
				<div class="flex items-baseline gap-1">
					<span class="text-lg font-black text-orange-600 dark:text-orange-400 transition-all leading-none" id="stat-cf-requests">0</span>
					<span class="text-[9px] font-bold text-gray-400 mr-0.5 leading-none">/ 100k</span>
					<button id="cf-warning-btn" onclick="openUsageWarning()" class="hidden flex items-center justify-center w-3 h-3 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-full font-bold text-[9px] animate-bounce shadow-sm border border-red-300 dark:border-red-700 mr-1 leading-none">!</button>
				</div>
				<span class="text-[9px] text-orange-500 dark:text-orange-400 flex items-center gap-1 font-medium whitespace-nowrap leading-none">
					<span>Total: <span id="stat-cf-total">0</span></span>
				</span>
			</div>
			<div class="w-full bg-gray-300 dark:bg-zinc-800 rounded-full h-1 shadow-inner">
				<div id="stat-cf-progress" class="bg-orange-500 h-1 rounded-full transition-all duration-500" style="width: 0%"></div>
			</div>
		</div>
	</div>
	<div id="card-d1-usage" class="bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-md p-2.5 shadow-sm flex flex-col justify-center gap-1 hover:shadow-md hover:border-purple-400 dark:hover:border-purple-500/50 transition duration-300 relative overflow-hidden group min-h-[64px]">
		<div class="absolute -right-4 -bottom-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl group-hover:scale-150 transition duration-500"></div>
		<div class="flex items-center justify-between relative z-10">
			<span class="text-[11px] sm:text-xs font-semibold text-gray-500 dark:text-zinc-400 whitespace-nowrap">سهمیه روزانه D1</span>
			<div class="p-1 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 rounded-md flex-shrink-0">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
			</div>
		</div>
		<div class="relative z-10 min-w-0 flex-1 w-full mt-1">
			<div class="grid grid-cols-2 gap-2 w-full">
				<div class="flex flex-col items-start justify-center">
					<div class="flex items-baseline gap-1">
						<span class="text-sm font-black text-purple-600 dark:text-purple-400 transition-all leading-none" id="stat-d1-writes">0</span>
						<span class="text-[9px] font-bold text-gray-400 leading-none">/ 100k</span>
					</div>
					<span class="text-[9px] font-medium text-gray-500 dark:text-zinc-400 mt-1">نوشتن</span>
				</div>
				<div class="flex flex-col items-end justify-center border-r border-gray-100 dark:border-amoled-border pr-2">
					<div class="flex items-baseline gap-1">
						<span class="text-sm font-black text-purple-600 dark:text-purple-400 transition-all leading-none" id="stat-d1-reads">0</span>
						<span class="text-[9px] font-bold text-gray-400 leading-none">/ 5M</span>
					</div>
					<span class="text-[9px] font-medium text-gray-500 dark:text-zinc-400 mt-1">خواندن</span>
				</div>
			</div>
		</div>
	</div>
	</div>
</div>
</div>
<script>
	if(localStorage.getItem('mili_stats_hidden') === 'true') {
		const w = document.getElementById('stats-accordion-wrapper');
		if(w) {
			w.classList.remove('max-h-[500px]', 'opacity-100');
			w.classList.add('max-h-0', 'opacity-0');
		}
		const i = document.getElementById('stats-accordion-icon');
		if(i) i.classList.add('rotate-180');
	}
</script>
		<div id="loading-state" class="text-center py-12">
			<span class="text-gray-500 dark:text-gray-400">در حال بارگذاری کاربران...</span>
		</div>
		<div class="mb-5 flex flex-col md:flex-row gap-2 justify-between items-center bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-md p-2 shadow-sm">
			<div class="relative w-full md:w-80">
				<input type="text" id="search-input" oninput="filterAndRenderUsers()" placeholder="جستجوی نام کاربری یا UUID..." class="w-full pl-3 pr-8 py-1.5 bg-gray-50 dark:bg-amoled-input border border-gray-300 dark:border-amoled-border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs">
				<div class="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-gray-400">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
				</div>
			</div>
			<div class="flex items-center gap-2 w-full md:w-auto">
				<select id="filter-status" onchange="filterAndRenderUsers()" class="flex-1 min-w-0 px-2 py-1.5 bg-gray-50 dark:bg-amoled-input border border-gray-300 dark:border-amoled-border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 dark:text-zinc-300 cursor-pointer truncate">
					<option value="all">🔍 همه</option>
					<option value="active">✅ فعال</option>
					<option value="inactive">❌ غیرفعال</option>
					<option value="online">⚡ آنلاین</option>
					<option value="offline">💤 آفلاین</option>
					<option value="expired">⏳ منقضی</option>
				</select>
				<select id="sort-users" onchange="filterAndRenderUsers()" class="flex-1 min-w-0 px-2 py-1.5 bg-gray-50 dark:bg-amoled-input border border-gray-300 dark:border-amoled-border rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 dark:text-zinc-300 cursor-pointer truncate">
					<option value="newest">📅 جدیدترین</option>
					<option value="name">🔤 نام کاربری (الفبا)</option>
					<option value="usage-desc">📊 بیشترین مصرف</option>
					<option value="usage-asc">📈 کمترین مصرف</option>
					<option value="expiry-asc">⏳ کمترین زمان باقی‌مانده</option>
				</select>
			</div>
		</div>
		<div class="flex items-center justify-between mb-4">
			<h2 class="text-lg font-bold text-gray-800 dark:text-zinc-200">لیست کاربران</h2>
			<div class="flex items-center gap-5">
				<div class="relative inline-flex items-center justify-center">
					<button onclick="createDirectUser(this)" title="افزودن کاربر مستقیم (بدون پروکسی)" class="p-2 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border-2 border-cyan-500 dark:border-cyan-500 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 transition-all duration-300 text-cyan-600 dark:text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)] hover:shadow-[0_0_25px_rgba(6,182,212,0.95)] hover:scale-125 active:scale-110 cursor-pointer inline-flex items-center justify-center relative group">
						<span class="absolute -inset-1 rounded-full bg-cyan-500/20 animate-ping opacity-75 group-hover:opacity-100 pointer-events-none" style="animation-delay: 0s;"></span>
						<svg id="direct-add-icon" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12 drop-shadow-[0_0_6px_rgba(6,182,212,0.8)] relative z-10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
							<circle cx="12" cy="12" r="10"></circle>
							<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
							<path d="M2 12h20"></path>
						</svg>
					</button>
					<button onclick="openPlacementModal()" title="تغییر لوکیشن کانفیگ ها" class="absolute -bottom-1.5 -right-1.5 z-20 w-[24px] h-[24px] bg-red-500 hover:bg-red-600 border-2 border-gray-100 dark:border-[#050913] rounded-full flex items-center justify-center text-white shadow-md transition-transform hover:scale-125 cursor-pointer">
						<svg class="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
					</button>
				</div>
				<button onclick="openRocketModal(this)" title="افزودن کاربر تک لوکیشن" class="p-2 rounded-full bg-orange-50 dark:bg-orange-950/40 border-2 border-orange-500 dark:border-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900/60 transition-all duration-300 text-orange-600 dark:text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.6)] hover:shadow-[0_0_25px_rgba(249,115,22,0.95)] hover:scale-125 active:scale-110 cursor-pointer inline-flex items-center justify-center relative group">
					<span class="absolute -inset-1 rounded-full bg-orange-500/20 animate-ping opacity-75 group-hover:opacity-100 pointer-events-none" style="animation-delay: 0.33s;"></span>
					<svg id="rocket-add-icon" class="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 drop-shadow-[0_0_6px_rgba(249,115,22,0.8)] relative z-10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
						<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
						<path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
						<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
						<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
					</svg>
				</button>
				<button onclick="quickCreateUser(this)" title="افزودن کاربر مولتی لوکیشن" class="p-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-500 dark:border-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all duration-300 text-indigo-600 dark:text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.6)] hover:shadow-[0_0_25px_rgba(99,102,241,0.95)] hover:scale-125 active:scale-110 cursor-pointer inline-flex items-center justify-center relative group">
					<span class="absolute -inset-1 rounded-full bg-indigo-500/20 animate-ping opacity-75 group-hover:opacity-100 pointer-events-none" style="animation-delay: 0.66s;"></span>
					<svg id="quick-add-icon" class="w-6 h-6 transition-transform duration-300 group-hover:rotate-12 drop-shadow-[0_0_6px_rgba(99,102,241,0.8)] relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
				</button>
				<button onclick="openCreateModal()" title="افزودن کاربر" class="p-2 rounded-full bg-green-50 dark:bg-green-950/30 border-2 border-green-600 dark:border-green-700/60 hover:bg-green-100 dark:hover:bg-green-900/50 transition-all duration-300 text-green-700 dark:text-green-400 shadow-sm hover:shadow hover:scale-110 cursor-pointer inline-flex items-center justify-center">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
				</button>
			</div>
		</div>
		<div id="users-table-container" class="hidden overflow-x-auto pb-4 px-1">
			<table class="w-full text-right border-separate" style="border-spacing: 0 8px;">
				<thead class="hidden md:table-header-group text-xs font-bold text-gray-700 dark:text-gray-300">
					<tr class="text-center [&>th]:bg-white [&>th]:dark:bg-amoled-card/60 drop-shadow-sm">
						<th class="py-3 px-1.5 w-10 text-center rounded-r-xl border-y border-r border-gray-200 dark:border-amoled-border align-middle">
							<div class="flex flex-col items-center justify-center h-full">
								<input type="checkbox" id="select-all-users" onchange="toggleSelectAllUsers(this)" class="w-4 h-4 rounded border-2 border-gray-300 dark:border-zinc-700 text-green-600 bg-white dark:bg-zinc-900 checked:bg-green-600 checked:border-green-600 focus:ring-green-500/50 focus:ring-offset-0 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95" style="filter: none !important; accent-color: #16a34a !important;">
							</div>
						</th>
						<th class="py-3 px-2 border-y border-gray-200 dark:border-amoled-border align-middle">
							<div class="flex flex-col items-center justify-center gap-1.5">
								<svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
								<span>اطلاعات</span>
							</div>
						</th>
						<th class="py-3 px-2 border-y border-gray-200 dark:border-amoled-border align-middle">
							<div class="flex flex-col items-center justify-center gap-1.5">
								<svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
								<span>عملیات</span>
							</div>
						</th>
						<th class="py-3 px-2 border-y border-gray-200 dark:border-amoled-border align-middle">
							<div class="flex flex-col items-center justify-center gap-1.5">
								<svg class="w-4 h-4 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
								<span>پروتکل</span>
							</div>
						</th>
						<th class="py-3 px-2 border-y border-gray-200 dark:border-amoled-border align-middle">
							<div class="flex flex-col items-center justify-center gap-1.5">
								<svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
								<span>لینک ساب</span>
							</div>
						</th>
						<th class="py-3 px-2 border-y border-gray-200 dark:border-amoled-border w-1 whitespace-nowrap align-middle">
							<div class="flex flex-col items-center justify-center gap-1.5">
								<svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
								<div class="flex items-center justify-center gap-1">
									<span>تعداد کانفیگ‌ها</span>
									<button type="button" onclick="openConfigCountWarning();" class="text-red-500 hover:text-red-400 transition-transform hover:scale-125 cursor-pointer inline-flex items-center" title="راهنما">
										<svg class="w-4 h-4 animate-pulse drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
									</button>
								</div>		
							</div>
						</th>
						<th class="py-3 px-2 border-y border-gray-200 dark:border-amoled-border align-middle">
							<div class="flex flex-col items-center justify-center gap-1.5">
								<svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
								<span>پورت</span>
							</div>
						</th>
						<th class="py-3 px-2 border-y border-gray-200 dark:border-amoled-border w-[115px] align-middle">
							<div class="flex flex-col items-center justify-center gap-1.5">
								<svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
								<span>حجم</span>
							</div>
						</th>
						<th class="py-3 px-2 border-y border-gray-200 dark:border-amoled-border w-[115px] align-middle">
							<div class="flex flex-col items-center justify-center gap-1.5">
								<svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
								<span>ریکوئست</span>
							</div>
						</th>
						<th class="py-3 px-2 border-y border-gray-200 dark:border-amoled-border w-[115px] align-middle">
							<div class="flex flex-col items-center justify-center gap-1.5">
								<svg class="w-4 h-4 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
								<span>زمان</span>
							</div>
						</th>
						<th class="py-3 px-2 rounded-l-xl border-y border-l border-gray-200 dark:border-amoled-border w-[115px] align-middle">
							<div class="flex flex-col items-center justify-center gap-1.5">
								<svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.906 14.142 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
								<div class="flex items-center justify-center gap-1">
									<span>متصل</span>
									<button type="button" onclick="openOnlineCounterWarning();" class="text-red-500 hover:text-red-400 transition-transform hover:scale-110 cursor-pointer inline-flex items-center" title="هشدار">
										<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
									</button>
								</div>
							</div>
						</th>
					</tr>
				</thead>
				<tbody id="users-tbody" class="text-sm"></tbody>
			</table>
		</div>
		<div id="empty-state" class="hidden p-8 border-2 border-dashed border-red-500/60 dark:border-red-500/50 bg-red-50 dark:bg-red-900/10 rounded-md text-center animate-pulse shadow-sm">
			<p class="text-red-600 dark:text-red-400 font-bold text-lg flex items-center justify-center flex-wrap gap-2 leading-loose">
				<span>کاربری وجود ندارد. برای ساخت کاربر روی</span>
				<span class="inline-flex items-center justify-center p-1.5 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-600 dark:border-green-700/60 text-green-700 dark:text-green-400 shadow-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg></span>
				<span>کلیک کنید یا از دکمه‌های</span>
				<span class="inline-flex items-center justify-center p-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-500 text-cyan-600 dark:text-cyan-400 shadow-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg></span>
				<span>،</span>
				<span class="inline-flex items-center justify-center p-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-500 text-orange-600 dark:text-orange-400 shadow-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg></span>
				<span>و</span>
				<span class="inline-flex items-center justify-center p-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-sm"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span>
				<span>برای ایجاد سریع استفاده کنید.</span>
			</p>
		</div>
	</main>
<div id="pwa-install-modal" class="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 opacity-0 pointer-events-none transition-opacity duration-200 ease-out">
	<div class="w-full max-w-sm bg-white dark:bg-amoled-card border border-green-500/40 rounded-2xl shadow-2xl p-6 transform transition-all scale-95 opacity-0 duration-200 text-center relative overflow-hidden">
		<div class="absolute -right-12 -top-12 w-32 h-32 bg-green-500/10 rounded-full blur-2xl pointer-events-none"></div>
		<div class="flex justify-between items-center mb-4 relative z-10">
			<h3 class="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
				<span class="text-lg">📲</span>
				<span id="pwa-modal-title">راهنمای نصب اپلیکیشن میلی‌کانفیگ</span>
			</h3>
			<button onclick="togglePwaModal(false)" class="p-1 rounded-md text-gray-400 hover:text-red-500 cursor-pointer transition">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
			</button>
		</div>
		<div class="flex items-center gap-3 p-3 bg-green-50/50 dark:bg-green-900/10 rounded-xl border border-green-200/70 dark:border-green-800/50 mb-4 text-right">
			<div class="w-11 h-11 rounded-xl bg-green-50 dark:bg-green-950/60 border-2 border-green-500 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0 shadow-md">
				<svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
			</div>
			<div>
				<h4 class="text-xs font-black text-gray-900 dark:text-white">پنل میلی‌کانفیگ</h4>
				<span class="text-[10px] text-gray-500 dark:text-zinc-400 block">اپلیکیشن پیشرفته و مستقل وب (PWA)</span>
			</div>
		</div>
		<div id="pwa-instructions-list" class="space-y-2.5 text-right text-xs text-gray-700 dark:text-zinc-300 font-medium leading-relaxed select-none mb-5 max-h-48 overflow-y-auto pr-1">
		</div>
		<button onclick="togglePwaModal(false)" class="w-full py-2.5 bg-transparent border-2 border-green-600 text-green-700 hover:bg-green-900/20 hover:text-green-800 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-900/40 dark:hover:text-green-300 font-bold rounded-xl text-xs transition shadow-sm cursor-pointer active:scale-95">متوجه شدم</button>
	</div>
</div>
<div id="info-modal" class="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-md bg-white dark:bg-amoled-card border border-purple-500/50 rounded-md shadow-2xl overflow-hidden p-6 text-center transition-all transform duration-300 opacity-0 scale-95 ease-out flex flex-col">
		<div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-500 mb-3 shadow-inner mx-auto flex-shrink-0">
			<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
			</svg>
		</div>
		<h3 class="font-black text-lg text-gray-900 dark:text-white mb-3">اطلاعیه مهم امنیتی و وضعیت پروژه</h3>
		<div class="text-xs text-gray-600 dark:text-gray-300 mb-4 leading-relaxed font-medium text-justify space-y-2">
			<p>
				همراهان گرامی؛ با وجود مسدود شدن مکرر مخازن گیت‌هاب میلی‌کانفیگ بر اثر گزارش‌های کذب و مغرضانه <strong>فروشندگان کانفیگ</strong>، ما مخزن جدیدی را برای دسترسی شما ایجاد کرده‌ایم؛ هرچند متاسفانه احتمال مسدود شدن مجدد آن همچنان وجود دارد.
			</p>
			<p>
				این افراد سودجو با انتشار شایعات بی‌اساس مبنی بر ناامن بودن پنل، در تلاشند تا این پروژه کاملاً رایگان را تخریب کنند و منافع مالی خود را نجات دهند. اما ما تسلیم این کارشکنی‌ها نخواهیم شد.
			</p>
			<p>
				پروژه میلی‌کانفیگ همواره بر پایه شفافیت مطلق بنا شده است. سورس‌کد کامل در اختیار شماست تا بتوانید مستقلاً و حتی به کمک ابزارهای هوش مصنوعی آن را بررسی کرده و از سلامت و امنیت قطعی پروژه اطمینان حاصل کنید.
			</p>
			<p class="text-amber-600 dark:text-amber-400 font-bold text-center mt-2 border-t border-gray-100 dark:border-amoled-border/50 pt-2.5">
				ادامه این مسیر پرفراز و نشیب و مقابله با این تخریب‌های سازمان‌یافته، بدون همراهی شما دشوار است. حمایت‌های شما، تنها پشتوانه ما برای توسعه مستمر میلی‌کانفیگ است.
			</p>
		</div>
		<div class="flex flex-col gap-2 mt-auto">
			<div class="flex flex-col sm:flex-row gap-2 w-full">
				<button onclick="downloadMiliSource()" class="flex-1 py-2 bg-transparent border-2 border-blue-600 text-blue-700 hover:bg-blue-900/20 hover:text-blue-800 dark:border-[#00ff66] dark:text-blue-400 dark:hover:bg-blue-900/40 dark:hover:text-blue-300 font-bold rounded-md text-[11px] transition duration-300 shadow-sm flex items-center justify-center gap-1.5">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
					دریافت سورس‌کد
				</button>
				<button onclick="window.open('https://donatonion.ir-netlify.workers.dev/', '_blank')" class="flex-1 py-2 bg-transparent border-2 border-green-600 text-green-700 hover:bg-green-900/20 hover:text-green-800 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-900/40 dark:hover:text-green-300 font-bold rounded-md text-[11px] transition duration-300 shadow-sm flex items-center justify-center gap-1.5">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
					حمایت از پروژه
				</button>
			</div>
			<button onclick="toggleInfoModal(false)" class="w-full py-2.5 bg-transparent border-2 border-purple-600 text-purple-700 hover:bg-purple-900/20 hover:text-purple-800 dark:border-purple-500 dark:text-purple-400 dark:hover:bg-purple-900/40 dark:hover:text-purple-300 font-black rounded-md text-sm transition duration-300 shadow-sm">
				متوجه شدم
			</button>
		</div>
	</div>
</div>
<div id="usage-warning-modal" class="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60  opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-md bg-white dark:bg-amoled-card border border-orange-500/50 rounded-md shadow-2xl overflow-hidden p-6 text-center transition-all transform duration-300 opacity-0 scale-95 ease-out">
		<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 mb-4 shadow-inner">
			<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
		</div>
		<h3 class="font-black text-xl text-gray-900 dark:text-white mb-2">هشدار محدودیت درخواست روزانه</h3>
		<p class="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-medium">
			درخواست‌های روزانه کلودفلر شما از ۹۰,۰۰۰ عبور کرده است. در صورت عبور از محدودیت رایگان ۱۰۰,۰۰۰ درخواست، دسترسی به پـنـل و اتصالات تا ساعت ۳:۳۰ بامداد (به وقت ایران) قطع خواهد شد.
		</p>
		<button onclick="closeUsageWarning()" class="w-full py-3.5 bg-transparent border-2 border-green-600 text-green-700 hover:bg-green-900/20 hover:text-green-800 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/40 dark:hover:text-green-400 font-black rounded-md text-sm transition duration-300 shadow-lg">
			متوجه شدم
		</button>
	</div>
</div>
<div id="free-panel-warning-modal" class="fixed inset-0 z-[85] flex items-center justify-center p-4 bg-black/60  opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-md bg-white dark:bg-amoled-card border-4 border-red-500/50 rounded-md shadow-2xl overflow-hidden p-6 text-center transition-all transform duration-300 opacity-0 scale-95 ease-out">
		<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 mb-4 shadow-inner">
			<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
		</div>
		<h3 class="font-black text-xl text-gray-900 dark:text-white mb-3">🚨 🛑 اخطار 🛑 🚨</h3>
		<div class="flex flex-col gap-2.5 mb-6">
			<div class="px-3 py-2.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-lg text-blue-700 dark:text-blue-400 font-bold text-xs sm:text-sm shadow-sm">
				این پـنـل کاملاً رایگان است
			</div>
			<div class="px-3 py-2.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg text-amber-700 dark:text-amber-400 font-bold text-xs sm:text-sm shadow-sm">
				هرگونه فروش پـنـل یا کـانفـیگ‌های آن
			</div>
			<div class="px-3 py-2.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg text-amber-700 dark:text-amber-400 font-bold text-xs sm:text-sm shadow-sm">
				انتشار کـانفـیگ‌ها برای گرفتن ممبر و بازدید
			</div>
			<div class="px-3 py-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg text-red-700 dark:text-red-400 font-bold text-xs sm:text-sm shadow-sm">
				کلاه‌برداری و رفتاری دور از انسانیت و شرافت است
			</div>
			<div class="px-3 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-lg text-green-700 dark:text-green-400 font-black text-sm shadow-sm mt-1">
				لطفاً از پنل فقط به صورت شخصی و رایگان استفاده کنید
			</div>
		</div>
		<button id="free-panel-close-btn" class="relative overflow-hidden w-full h-12 bg-transparent border-2 border-green-800 text-green-900 hover:bg-green-800 hover:text-white dark:border-green-800 dark:text-green-700 dark:hover:bg-green-900 dark:hover:text-white font-black rounded-md text-sm transition-transform duration-300 shadow-lg select-none" style="touch-action: none; -webkit-touch-callout: none; -webkit-user-select: none;">
			<div id="free-panel-progress" class="absolute right-0 top-0 h-full bg-green-500/20 dark:bg-green-500/30 w-0 pointer-events-none"></div>
			<span class="relative z-10 pointer-events-none">برای تأیید ۲ ثانیه نگه دارید</span>
		</button>
		<div class="mt-3 text-xs sm:text-sm font-bold text-gray-500 dark:text-zinc-400 select-none">
			قوانین را می پذیرم
		</div>
	</div>
</div>
<div id="global-message-modal" class="fixed inset-0 z-[86] flex items-center justify-center p-4 bg-black/60 opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-md bg-white dark:bg-amoled-card border-2 border-red-500/50 rounded-md shadow-2xl overflow-hidden p-6 text-center transition-all transform duration-300 opacity-0 scale-95 ease-out">
		<div id="global-message-content" class="mb-6 w-full text-center font-medium leading-relaxed">
		</div>
		<button id="global-message-close-btn" class="relative overflow-hidden w-full h-12 bg-transparent border-2 border-red-600 text-red-700 dark:border-red-500 dark:text-red-500 font-black rounded-md text-sm transition-transform duration-300 shadow-lg select-none" style="touch-action: none; -webkit-touch-callout: none; -webkit-user-select: none;">
			<div id="global-message-progress" class="absolute right-0 top-0 h-full bg-red-500/20 dark:bg-red-500/30 w-0 pointer-events-none"></div>
			<span class="relative z-10 pointer-events-none">برای بستن ۱ ثانیه نگه دارید</span>
		</button>
	</div>
</div>
<div id="online-counter-warning-modal" class="fixed inset-0 z-[87] flex items-center justify-center p-4 bg-black/60  opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-md bg-white dark:bg-amoled-card border border-red-500/50 rounded-md shadow-2xl overflow-hidden p-6 text-center transition-all transform duration-300 opacity-0 scale-95 ease-out">
		<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 mb-4 shadow-inner">
			<svg class="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
		</div>
		<h3 class="font-black text-xl text-gray-900 dark:text-white mb-2">هشدار شمارنده آنلاین</h3>
		<p class="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-medium">
			به دلیل ساختار کلودفلر، آمار شمارنده کاربران آنلاین دقیق نمی باشد؛ همچنین تست پینگ یا آپدیت لینک های ساب توسط کلاینت ممکن است به صورت موقت منجر به نمایش افزایش کاذب تعداد کاربران فعال گردد. </p>
		<button onclick="closeOnlineCounterWarning()" class="w-full py-3.5 bg-transparent border-2 border-red-600 text-red-700 hover:bg-red-900/20 hover:text-red-800 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-900/40 dark:hover:text-red-400 font-black rounded-md text-sm transition duration-300 shadow-lg">
			متوجه شدم
		</button>
	</div>
</div>
<div id="pattng-info-modal" class="fixed inset-0 z-[115] flex items-center justify-center p-4 bg-black/60 opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-md bg-white dark:bg-amoled-card border border-green-500/50 dark:border-[#33FB1F]/50 rounded-md shadow-2xl overflow-hidden p-6 text-center transition-all transform duration-300 opacity-0 scale-95 ease-out">
		<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 dark:bg-[#33FB1F]/10 text-green-600 dark:text-[#33FB1F] mb-4 shadow-sm dark:shadow-[0_0_15px_rgba(51,251,31,0.2)]">
			<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
		</div>
		<h3 class="font-black text-xl text-gray-900 dark:text-white mb-2">توجه: پیش‌نیاز بهینه‌سازی</h3>
		<p class="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-medium">
			قابلیت‌های <b>Patterniha</b> در حال حاضر منحصراً روی اپلیکیشن‌های <span class="text-green-600 dark:text-[#33FB1F] font-bold">PattNG (اندروید)</span> و <span class="text-green-600 dark:text-[#33FB1F] font-bold">PattN (ویندوز)</span> پشتیبانی می‌شود. لطفاً برای استفاده از این قابلیت، نرم‌افزار مربوطه را نصب کنید.
		</p>
		<div class="flex flex-col gap-3">
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
				<a href="https://github.com/patterniha/PattNG/releases/latest" target="_blank" class="w-full py-3 bg-green-50/80 hover:bg-green-100 dark:bg-[#33FB1F]/10 dark:hover:bg-[#33FB1F]/20 text-green-700 dark:text-[#33FB1F] border border-green-500/50 dark:border-[#33FB1F]/50 font-black rounded-md text-xs transition duration-300 shadow-sm dark:shadow-[0_0_10px_rgba(51,251,31,0.2)] flex items-center justify-center gap-1.5">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
					اندروید (PattNG)
				</a>
				<a href="https://github.com/patterniha/PattN/releases/latest/download/PattN-windows-64.zip" target="_blank" class="w-full py-3 bg-green-50/80 hover:bg-green-100 dark:bg-[#33FB1F]/10 dark:hover:bg-[#33FB1F]/20 text-green-700 dark:text-[#33FB1F] border border-green-500/50 dark:border-[#33FB1F]/50 font-black rounded-md text-xs transition duration-300 shadow-sm dark:shadow-[0_0_10px_rgba(51,251,31,0.2)] flex items-center justify-center gap-1.5">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
					ویندوز (PattN)
				</a>
			</div>
			<button onclick="togglePattNgModal(false)" class="w-full py-3.5 bg-transparent border-2 border-gray-500 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-zinc-800 font-bold rounded-md text-sm transition duration-300 mt-1">
				فهمیدم
			</button>
		</div>
	</div>
</div>
<div id="config-count-warning-modal" class="fixed inset-0 z-[88] flex items-center justify-center p-4 bg-black/60  opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-md bg-white dark:bg-amoled-card border border-amber-500/50 rounded-md shadow-2xl overflow-hidden p-6 text-center transition-all transform duration-300 opacity-0 scale-95 ease-out">
		<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-500 mb-4 shadow-inner">
			<svg class="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
		</div>
		<h3 class="font-black text-xl text-gray-900 dark:text-white mb-3">محاسبه تعداد کانفیگ‌ها</h3>
		<p class="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed font-medium">
			تعداد کل کانفیگ‌های هر کاربر از این فرمول به دست می‌آید
		</p>
		<div class="bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-md py-3 px-1 mb-2 text-[7.5px] min-[360px]:text-[8.5px] sm:text-[11px] tracking-tighter font-bold text-gray-800 dark:text-zinc-200 text-center shadow-inner whitespace-nowrap overflow-hidden flex justify-center items-center" dir="rtl">
			۳ + (تعداد لوکیشن‌ها) × (تعداد آی‌پی تمیز) × (تعداد پورت) × (تعداد پروتکل) × (تعداد ECH)
		</div>
		<p class="text-[10px] text-gray-500 dark:text-gray-400 mb-4 font-medium leading-relaxed">
			 منظور از لوکیشن‌ها، مجموع پروکسی‌های وارد شده است.
		</p>
		<div class="text-[11px] text-amber-700 dark:text-amber-500 mb-6 leading-relaxed font-bold bg-amber-50 dark:bg-amber-950/20 p-3 rounded text-right border border-amber-200 dark:border-amber-900/50">
			⚠️ <b>توصیه مهم:</b> برای جلوگیری از زیاد شدن کانفیگ‌ها و در نتیجه سنگین شدن و هنگ کردن نرم‌افزار کاربر، پیشنهاد می‌شود پورت‌های کمتری انتخاب کنید و تعداد آی‌پی‌های تمیز را در حد معقول نگه دارید.
		</div>
		<button onclick="closeConfigCountWarning()" class="w-full py-3.5 bg-transparent border-2 border-amber-600 text-amber-700 hover:bg-amber-900/20 hover:text-amber-800 dark:border-amber-500 dark:text-amber-500 dark:hover:bg-amber-900/40 dark:hover:text-amber-400 font-black rounded-md text-sm transition duration-300 shadow-lg">
			متوجه شدم
		</button>
	</div>
</div>
	<div id="user-modal" class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-200 ease-out">
		<div id="user-modal-card" class="w-full max-w-5xl bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-2xl shadow-2xl overflow-hidden transition-[opacity,transform] duration-200 opacity-0 scale-95 ease-out flex flex-col max-h-[92vh] transform-gpu">
			<div class="px-5 py-4 border-b border-gray-150 dark:border-amoled-border flex justify-between items-center bg-gray-50/70 dark:bg-amoled-bg/60">
				<div class="flex items-center gap-3">
					<div class="w-8 h-8 rounded-lg bg-blue-500/10 border border-[#00ff66]/20 text-emerald-600 dark:text-[#00ff66] flex items-center justify-center font-bold">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
					</div>
					<div>
						<h3 id="modal-title" class="font-black text-gray-900 dark:text-zinc-100 text-sm sm:text-base tracking-tight">ایجاد کاربر جدید</h3>
						<p class="text-[11px] text-gray-500 dark:text-zinc-400 font-medium">مشخصات، دسترسی‌ها و پروتکل‌های اتصال کاربر</p>
					</div>
				</div>
				<button type="button" onclick="toggleModal(false)" class="p-2 rounded-lg bg-transparent border-2 border-red-500 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 shadow-sm" title="بستن">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
				</button>
			</div>
			<form id="create-user-form" class="flex flex-col flex-1 min-h-0 overflow-hidden" onsubmit="handleFormSubmit(event)">
				<input type="hidden" id="hidden-auto-rotate" value="0">
				<input type="hidden" id="hidden-rotate-time" value="">
				<input type="hidden" id="hidden-ip-operator" value="all">
				<input type="hidden" id="hidden-ip-count" value="20">
				<div class="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
					<div class="w-full md:w-64 bg-gray-50/90 dark:bg-amoled-bg/80 border-b md:border-b-0 md:border-l border-gray-200 dark:border-amoled-border p-3 md:p-4 flex flex-row md:flex-col gap-2 flex-shrink-0 overflow-x-auto md:overflow-x-visible md:justify-between">
						<div class="flex flex-row md:flex-col gap-2 w-full">
							<button type="button" onclick="switchUserTab('tab-user-info')" id="tab-btn-user-info" class="user-modal-tab-btn active flex-1 md:flex-initial flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-3 p-1.5 sm:p-3 rounded-xl transition text-center sm:text-right cursor-pointer select-none bg-blue-600/10 dark:bg-blue-500/15 border border-[#00ff66]/30 text-emerald-600 dark:text-[#00ff66] font-bold shadow-sm">
								<div class="flex-shrink-0 w-4 h-4 sm:w-8 sm:h-8 rounded sm:rounded-lg flex items-center justify-center bg-blue-500/15 dark:bg-blue-400/20 text-blue-600 dark:text-blue-300">
									<svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
								</div>
								<div class="hidden sm:block text-right">
									<div class="text-xs font-black">نام کاربری و مشخصات</div>
									<div class="text-[10px] opacity-75 font-normal">حجم، زمان، محدودیت و تمدید</div>
								</div>
								<span class="sm:hidden text-[10px] sm:text-xs font-bold whitespace-nowrap">مشخصات</span>
							</button>
							<button type="button" onclick="switchUserTab('tab-ports-network')" id="tab-btn-ports-network" class="user-modal-tab-btn flex-1 md:flex-initial flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-3 p-1.5 sm:p-3 rounded-xl transition text-center sm:text-right cursor-pointer select-none bg-transparent hover:bg-gray-100 dark:hover:bg-amoled-input/50 border border-transparent text-gray-600 dark:text-zinc-400 font-medium">
								<div class="flex-shrink-0 w-4 h-4 sm:w-8 sm:h-8 rounded sm:rounded-lg flex items-center justify-center bg-gray-200/60 dark:bg-amoled-input text-gray-500 dark:text-zinc-400">
									<svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
								</div>
								<div class="hidden sm:block text-right">
									<div class="text-xs font-black">پورت‌های اتصال و شبکه</div>
									<div class="text-[10px] opacity-75 font-normal">پورت‌ها، آی‌پی تمیز و فرگمنت</div>
								</div>
								<span class="sm:hidden text-[10px] sm:text-xs font-bold whitespace-nowrap">پورت و IP</span>
							</button>
							<button type="button" onclick="switchUserTab('tab-proxy-settings')" id="tab-btn-proxy-settings" class="user-modal-tab-btn flex-1 md:flex-initial flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-3 p-1.5 sm:p-3 rounded-xl transition text-center sm:text-right cursor-pointer select-none bg-transparent hover:bg-gray-100 dark:hover:bg-amoled-input/50 border border-transparent text-gray-600 dark:text-zinc-400 font-medium">
								<div class="flex-shrink-0 w-4 h-4 sm:w-8 sm:h-8 rounded sm:rounded-lg flex items-center justify-center bg-gray-200/60 dark:bg-amoled-input text-gray-500 dark:text-zinc-400">
									<svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
								</div>
								<div class="hidden sm:block text-right">
									<div class="text-xs font-black">تنظیم پروکسی و کشور</div>
									<div class="text-[10px] opacity-75 font-normal">آی‌پی ثابت و زنجیره اتصال</div>
								</div>
								<span class="sm:hidden text-[10px] sm:text-xs font-bold whitespace-nowrap">پروکسی</span>
							</button>
						</div>
						<div class="hidden md:flex flex-col gap-2 mt-auto pt-4 border-t border-gray-200 dark:border-amoled-border w-full">
							<button type="submit" id="submit-btn-desktop" class="w-full py-2.5 bg-transparent border-2 border-green-600 text-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 font-black rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-1.5 cursor-pointer">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
								<span>ایجاد کاربر</span>
							</button>
							<button type="button" onclick="toggleModal(false)" class="w-full py-2 bg-transparent border-2 border-red-600 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold rounded-xl text-xs transition shadow-sm">
								انصراف
							</button>
						</div>
					</div>
					<div class="flex-1 p-4 sm:p-6 overflow-y-auto max-h-[72vh] space-y-4 custom-scrollbar overscroll-contain">
						<div id="tab-user-info" class="user-tab-panel space-y-4">
							<div class="p-4 bg-gray-50/70 dark:bg-amoled-input/30 border border-gray-200/70 dark:border-amoled-border rounded-xl space-y-3">
								<div class="flex items-center justify-between">
									<label class="block text-xs font-black text-gray-700 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
										<span class="w-2 h-2 rounded-full bg-indigo-500"></span>
										<span>پروتکل‌های اتصال (انتخاب حداقل یک مورد الزامی است)</span>
									</label>
								</div>
								<div class="grid grid-cols-3 gap-1.5 sm:gap-3">
									<label class="flex flex-col sm:flex-row items-center justify-center sm:justify-between p-2 sm:p-3 bg-white dark:bg-amoled-input border border-gray-200/80 dark:border-amoled-border rounded-xl cursor-pointer hover:border-[#00ff66] dark:hover:border-[#00ff66] transition select-none gap-1 sm:gap-2.5">
										<div class="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 w-full text-center sm:text-right">
											<div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-emerald-600 dark:text-[#00ff66] flex items-center justify-center font-black text-xs mx-auto sm:mx-0">
												<svg class="w-4 h-4 sm:w-5 sm:h-5 -ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
											</div>
											<div class="flex-1 min-w-0">
												<span class="text-[11px] sm:text-xs font-black text-gray-800 dark:text-zinc-200 block truncate">VLESS</span>
												<span class="hidden sm:block text-[10px] text-gray-500 dark:text-zinc-400 font-normal">پروتکل سبک و پرسرعت</span>
											</div>
										</div>
										<input type="checkbox" id="input-proto-vless" checked onchange="handleProtocolChange(this)" class="w-4 h-4 mt-0.5 sm:mt-0 rounded focus:ring-green-500/50 bg-white dark:bg-amoled-input border-gray-300 dark:border-amoled-border cursor-pointer text-green-600 flex-shrink-0" style="filter: none !important; accent-color: #16a34a !important;">
									</label>
									<label class="flex flex-col sm:flex-row items-center justify-center sm:justify-between p-2 sm:p-3 bg-white dark:bg-amoled-input border border-gray-200/80 dark:border-amoled-border rounded-xl cursor-pointer hover:border-purple-500 dark:hover:border-purple-500 transition select-none gap-1 sm:gap-2.5">
										<div class="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 w-full text-center sm:text-right">
											<div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-xs mx-auto sm:mx-0">
												<svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 11a2 2 0 100-4 2 2 0 000 4z"></path><path d="M12 11v3"></path></svg>
											</div>
											<div class="flex-1 min-w-0">
												<span class="text-[11px] sm:text-xs font-black text-gray-800 dark:text-zinc-200 block truncate">Trojan</span>
												<span class="hidden sm:block text-[10px] text-gray-500 dark:text-zinc-400 font-normal">پروتکل امنیتی پیشرفته</span>
											</div>
										</div>
										<input type="checkbox" id="input-proto-trojan" onchange="handleProtocolChange(this)" class="w-4 h-4 mt-0.5 sm:mt-0 rounded focus:ring-green-500/50 bg-white dark:bg-amoled-input border-gray-300 dark:border-amoled-border cursor-pointer text-green-600 flex-shrink-0" style="filter: none !important; accent-color: #16a34a !important;">
									</label>
									<label class="flex flex-col sm:flex-row items-center justify-center sm:justify-between p-2 sm:p-3 bg-white dark:bg-amoled-input border border-gray-200/80 dark:border-amoled-border rounded-xl cursor-pointer hover:border-yellow-500 dark:hover:border-yellow-500 transition select-none gap-1 sm:gap-2.5">
										<div class="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 w-full text-center sm:text-right">
											<div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-yellow-500/10 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center font-black text-xs mx-auto sm:mx-0">
												<svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
											</div>
											<div class="flex-1 min-w-0">
												<span class="text-[9px] sm:text-xs font-black text-gray-800 dark:text-zinc-200 block truncate">Shadowsocks</span>
												<span class="hidden sm:block text-[10px] text-gray-500 dark:text-zinc-400 font-normal">پروتکل امن سبک</span>
											</div>
										</div>
										<input type="checkbox" id="input-proto-ss" onchange="handleProtocolChange(this)" class="w-4 h-4 mt-0.5 sm:mt-0 rounded focus:ring-green-500/50 bg-white dark:bg-amoled-input border-gray-300 dark:border-amoled-border cursor-pointer text-green-600 flex-shrink-0" style="filter: none !important; accent-color: #16a34a !important;">
									</label>
								</div>
								<div class="mt-2.5 p-2 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg flex items-start gap-2 shadow-sm">
									<svg class="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
									<span class="text-[10px] font-bold text-amber-700 dark:text-amber-400 leading-relaxed text-justify">هشدار: شدوساکس در موبایل فقط روی برنامه <a href="https://www.happ.su/main" target="_blank" class="text-emerald-600 dark:text-[#00ff66] underline hover:opacity-80 transition-opacity">happ</a> عمل میکند. </span>
								</div>
							</div>
							<div id="username-card" class="p-4 bg-gray-50/70 dark:bg-amoled-input/30 border border-gray-200/70 dark:border-amoled-border rounded-xl space-y-3 transition-colors duration-300">
								<div class="flex items-center justify-between">
									<label class="block text-xs font-black text-gray-700 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
										<span class="w-2 h-2 rounded-full bg-blue-500"></span>
										<span>نام کاربری (الزامی)</span>
									</label>
									<button type="button" onclick="generateRandomUsername()" class="px-2.5 py-1 bg-transparent border-2 border-[#00ff66] text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md text-[11px] font-bold transition flex items-center gap-1">
										<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
										<span>نام تصادفی</span>
									</button>
								</div>
								<div class="relative">
									<span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
									</span>
									<input type="text" id="input-name" placeholder="mili-user" dir="ltr" class="w-full pl-3 pr-9 py-2.5 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-xs font-semibold text-gray-800 dark:text-zinc-100 placeholder-gray-400 transition shadow-sm">
								</div>
							</div>
							<div class="p-4 bg-gray-50/70 dark:bg-amoled-input/30 border border-gray-200/70 dark:border-amoled-border rounded-xl space-y-4">
								<div class="space-y-3">
									<h4 class="text-xs font-black text-gray-700 dark:text-zinc-300 flex items-center gap-1.5">
										<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
										<span>اعتبار حجمی و زمانی</span>
									</h4>
									<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
										<div>
											<label class="block text-[11px] font-bold text-gray-500 dark:text-zinc-400 mb-1">حجم مجاز (گیگابایت)</label>
											<div class="relative">
												<span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
													<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
												</span>
												<input type="number" id="input-limit" step="0.1" min="0" placeholder="نامحدود" class="w-full pl-3 pr-9 py-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-xs font-semibold text-gray-800 dark:text-zinc-100 placeholder-gray-400 transition shadow-sm">
											</div>
											<div class="flex items-center gap-1 mt-1.5 flex-wrap">
												<span class="text-[9px] text-gray-400 dark:text-zinc-500 font-bold ml-1">انتخاب سریع:</span>
												<button type="button" onclick="setQuickVol(10)" class="px-2 py-0.5 rounded bg-transparent border border-[#00ff66] text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-[10px] font-bold transition cursor-pointer">۱۰ گیگ</button>
												<button type="button" onclick="setQuickVol(50)" class="px-2 py-0.5 rounded bg-transparent border border-[#00ff66] text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-[10px] font-bold transition cursor-pointer">۵۰ گیگ</button>
												<button type="button" onclick="setQuickVol(100)" class="px-2 py-0.5 rounded bg-transparent border border-[#00ff66] text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-[10px] font-bold transition cursor-pointer">۱۰۰ گیگ</button>
												<button type="button" onclick="setQuickVol('')" class="px-2 py-0.5 rounded bg-transparent border border-gray-500 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-amoled-input text-[10px] font-bold transition cursor-pointer">نامحدود</button>
											</div>
										</div>
										<div>
											<label class="block text-[11px] font-bold text-gray-500 dark:text-zinc-400 mb-1">مدت زمان اعتبار (روز)</label>
											<div class="relative">
												<span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
													<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
												</span>
												<input type="number" id="input-expiry" min="1" placeholder="نامحدود" class="w-full pl-3 pr-9 py-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-xs font-semibold text-gray-800 dark:text-zinc-100 placeholder-gray-400 transition shadow-sm">
											</div>
											<div class="flex items-center gap-1 mt-1.5 flex-wrap">
												<span class="text-[9px] text-gray-400 dark:text-zinc-500 font-bold ml-1">انتخاب سریع:</span>
												<button type="button" onclick="setQuickExp(30)" class="px-2 py-0.5 rounded bg-transparent border border-[#00ff66] text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-[10px] font-bold transition cursor-pointer">۱ ماه</button>
												<button type="button" onclick="setQuickExp(60)" class="px-2 py-0.5 rounded bg-transparent border border-[#00ff66] text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-[10px] font-bold transition cursor-pointer">۲ ماه</button>
												<button type="button" onclick="setQuickExp(90)" class="px-2 py-0.5 rounded bg-transparent border border-[#00ff66] text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-[10px] font-bold transition cursor-pointer">۳ ماه</button>
												<button type="button" onclick="setQuickExp('')" class="px-2 py-0.5 rounded bg-transparent border border-gray-500 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-amoled-input text-[10px] font-bold transition cursor-pointer">نامحدود</button>
											</div>
										</div>
									</div>
									<div class="flex items-center justify-between p-3 bg-white dark:bg-amoled-input border border-gray-200/80 dark:border-amoled-border rounded-lg">
										<div class="flex items-center gap-2">
											<svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
											<span class="text-xs font-bold text-gray-700 dark:text-zinc-300">شروع محاسبه زمان از اولین اتصال کاربر</span>
										</div>
										<label class="relative inline-flex items-center cursor-pointer select-none">
											<input type="checkbox" id="input-start-on-first-connect" class="sr-only peer">
											<div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:bg-blue-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:-translate-x-[16px]"></div>
										</label>
									</div>
								</div>
								<div class="border-t border-gray-200/70 dark:border-amoled-border"></div>
								<div class="space-y-3">
									<h4 class="text-xs font-black text-gray-700 dark:text-zinc-300 flex items-center gap-1.5">
										<span class="w-2 h-2 rounded-full bg-purple-500"></span>
										<span>محدودیت‌های اتصال و امنیت</span>
									</h4>
									<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
										<div>
											<label class="block text-[11px] font-bold text-gray-500 dark:text-zinc-400 mb-1">تعداد درخواست (ریکوئست)</label>
											<div class="relative">
												<span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
													<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
												</span>
												<input type="number" id="input-req-limit" min="0" placeholder="نامحدود" class="w-full pl-3 pr-9 py-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-xs font-semibold text-gray-800 dark:text-zinc-100 placeholder-gray-400 transition shadow-sm">
											</div>
										</div>
										<div>
											<label class="block text-[11px] font-bold text-gray-500 dark:text-zinc-400 mb-1 flex items-center gap-1.5">
												<span>محدودیت کاربر</span>
												<button type="button" onclick="openOnlineCounterWarning();" class="text-red-500 hover:text-red-400 cursor-pointer inline-flex items-center animate-sym-bounce hover:animate-none transition-transform hover:scale-125" title="هشدار مهم">
													<svg class="w-4 h-4 drop-shadow-[0_0_6px_rgba(239,68,68,0.9)] dark:drop-shadow-[0_0_8px_rgba(248,113,113,1)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
												</button>
											</label>
											<div class="relative">
												<span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
													<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
												</span>
												<input type="number" id="input-ip-limit" min="0" placeholder="نامحدود" class="w-full pl-3 pr-9 py-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-xs font-semibold text-gray-800 dark:text-zinc-100 placeholder-gray-400 transition shadow-sm">
											</div>
										</div>
										<div>
											<label class="block text-[11px] font-bold text-gray-500 dark:text-zinc-400 mb-1">فینگرپرینت TLS</label>
											<div class="relative">
												<select id="fingerprint-select" class="w-full px-3 py-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-xs font-semibold text-gray-700 dark:text-zinc-300 cursor-pointer appearance-none shadow-sm">
													<option value="chrome">🌐 Chrome</option>
													<option value="firefox">🦊 Firefox</option>
													<option value="safari">🧭 Safari</option>
													<option value="ios">📱 iOS</option>
													<option value="android">🤖 Android</option>
													<option value="edge">🌀 Edge</option>
													<option value="360">🔒 360 Browser</option>
													<option value="qq">💬 QQ Browser</option>
													<option value="random">🎲 Random</option>
													<option value="randomized">🎭 Dynamic</option>
													<option value="unsafe" selected>🚀 Unsafe (پیشنهادی)</option>
												</select>
												<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
													<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="p-4 bg-gray-50/70 dark:bg-amoled-input/30 border border-gray-200/70 dark:border-amoled-border rounded-xl space-y-3">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-2">
										<svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
										<div>
											<span class="text-xs font-black text-gray-800 dark:text-zinc-200">تمدید خودکار ترافیک</span>
											<span class="text-[10px] text-gray-400 block font-normal">ریست اتوماتیک در ساعت ۳:۳۰ بامداد</span>
										</div>
									</div>
									<label class="relative inline-flex items-center cursor-pointer select-none">
										<input type="checkbox" id="input-auto-reset-toggle" onchange="toggleAutoResetInputs(this.checked)" class="sr-only peer">
										<div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:bg-emerald-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:-translate-x-[16px]"></div>
									</label>
								</div>
								<div id="auto-reset-inputs-container" class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-gray-200/60 dark:border-amoled-border opacity-50 pointer-events-none transition-all duration-200">
									<div>
										<label class="block text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-1">دوره تمدید حجم (روز)</label>
										<input type="number" id="input-auto-reset-vol" min="1" placeholder="خالی = بدون تمدید" class="w-full px-3 py-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-xs font-mono text-center text-gray-800 dark:text-zinc-100 transition" dir="ltr" disabled>
									</div>
									<div>
										<label class="block text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-1">دوره تمدید ریکوئست (روز)</label>
										<input type="number" id="input-auto-reset-req" min="1" placeholder="خالی = بدون تمدید" class="w-full px-3 py-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-xs font-mono text-center text-gray-800 dark:text-zinc-100 transition" dir="ltr" disabled>
									</div>
								</div>
							</div>
							<div>
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
									<div class="flex items-center justify-between p-3.5 bg-gray-50/70 dark:bg-amoled-input/30 border border-gray-200/70 dark:border-amoled-border rounded-xl">
										<div class="flex items-center gap-2">
											<span class="text-base">🔞</span>
											<span class="text-xs font-bold text-gray-700 dark:text-zinc-300">مسدودسازی سایت‌های غیراخلاقی</span>
										</div>
										<label class="relative inline-flex items-center cursor-pointer select-none">
											<input type="checkbox" id="input-block-porn" class="sr-only peer">
											<div class="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:bg-red-500 transition-colors after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-transform peer-checked:after:-translate-x-[16px]"></div>
										</label>
									</div>
									<div class="flex items-center justify-between p-3.5 bg-gray-50/70 dark:bg-amoled-input/30 border border-gray-200/70 dark:border-amoled-border rounded-xl">
										<div class="flex items-center gap-2">
											<span class="text-base">🚫</span>
											<span class="text-xs font-bold text-gray-700 dark:text-zinc-300">مسدودسازی تبلیغات اینترنتی</span>
										</div>
										<label class="relative inline-flex items-center cursor-pointer select-none">
											<input type="checkbox" id="input-block-ads" class="sr-only peer">
											<div class="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:bg-amber-500 transition-colors after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-transform peer-checked:after:-translate-x-[16px]"></div>
										</label>
									</div>
								</div>
							</div>
						</div>
						<div id="tab-ports-network" class="user-tab-panel hidden space-y-4">
							<div class="p-4 bg-gray-50/70 dark:bg-amoled-input/30 border border-gray-200/70 dark:border-amoled-border rounded-xl space-y-3">
								<h4 class="text-xs font-black text-gray-700 dark:text-zinc-300 flex items-center gap-1.5">
									<span class="w-2 h-2 rounded-full bg-blue-500"></span>
									<span>پورت‌های اتصال VLESS</span>
								</h4>
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
									<div class="p-3 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg flex flex-col">
										<div class="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-gray-100 dark:border-amoled-border">
											<span class="w-2 h-2 rounded-full bg-blue-500"></span>
											<span class="text-[11px] font-bold text-emerald-600 dark:text-[#00ff66]">TLS PORT (رمزنگاری شده)</span>
										</div>
										<div class="grid grid-cols-3 gap-1.5 flex-1 content-start" id="tls-ports-list"></div>
									</div>
									<div class="p-3 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg flex flex-col">
										<div class="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-gray-100 dark:border-amoled-border">
											<span class="w-2 h-2 rounded-full bg-amber-500"></span>
											<span class="text-[11px] font-bold text-amber-600 dark:text-amber-400">Non-TLS PORT (بدون رمزنگاری)</span>
										</div>
										<div class="grid grid-cols-3 gap-1.5 flex-1 content-start" id="nontls-ports-list"></div>
									</div>
								</div>
								<div class="p-3 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg space-y-1.5">
									<label class="block text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
										<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
										<span>پورت‌های دلخواه (با فاصله جدا کنید)</span>
									</label>
									<input type="text" id="input-custom-ports" placeholder="مثال: 8080 2096 8443 5000" dir="ltr" class="w-full px-3 py-2 bg-gray-50 dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-xs font-mono text-gray-800 dark:text-zinc-100 transition shadow-sm">
								</div>
							</div>
							<div class="p-4 bg-gray-50/70 dark:bg-amoled-input/30 border border-gray-200/70 dark:border-amoled-border rounded-xl space-y-3">
								<div class="flex items-center justify-between flex-wrap gap-2">
									<h4 class="text-xs font-black text-gray-700 dark:text-zinc-300 flex items-center gap-1.5">
										<span class="w-2 h-2 rounded-full bg-sky-500"></span>
										<span>آی‌پی‌های تمیز کلودفلر (Clean IPs)</span>
									</h4>
									<div class="flex items-center gap-1.5">
										<button type="button" onclick="openIpScannerModal()" class="px-2.5 py-1 bg-transparent border-2 border-sky-500 text-sky-600 dark:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-md text-[11px] font-bold transition flex items-center gap-1 shadow-sm">
											<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
											<span>اسکنر آی‌پی</span>
										</button>
										<button type="button" onclick="openIpSelectorModal()" class="px-2.5 py-1 bg-transparent border-2 border-amber-500 text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-md text-[11px] font-bold transition flex items-center gap-1 shadow-sm">
											<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
										<span>مخزن آی‌پی</span>
										</button>
									</div>
								</div>
								<textarea id="input-ips" placeholder="104.16.0.1&#10;104.17.0.1&#10;162.159.192.1" class="w-full h-24 px-3 py-2.5 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-xs font-mono text-gray-800 dark:text-zinc-100 placeholder-gray-400 transition resize-none shadow-sm"></textarea>
								<div class="flex items-center justify-between p-3 mt-2 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-200/60 dark:border-emerald-800/40 rounded-lg shadow-sm">
									<div class="flex items-center gap-2">
										<svg class="w-4 h-4 text-emerald-600 dark:text-emerald-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
										<div>
											<span class="text-xs font-black text-gray-800 dark:text-zinc-200">تعویض خودکار آی‌پی (توصیه می‌شود)</span>
											<span class="text-[10px] text-gray-500 dark:text-zinc-400 block font-normal mt-0.5">جابجایی آی‌پی‌ها با هر بار رفرش کلاینت</span>
										</div>
									</div>
									<label class="relative inline-flex items-center cursor-pointer select-none">
										<input type="checkbox" id="input-auto-rotate-ip-toggle" class="sr-only peer" checked>
										<div class="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:bg-emerald-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:-translate-x-[16px]"></div>
									</label>
								</div>
							</div>
							<div class="bg-gradient-to-b from-blue-50/50 to-indigo-50/20 dark:from-amoled-input/50 dark:to-amoled-bg/50 border border-blue-200/70 dark:border-amoled-border rounded-2xl overflow-hidden shadow-sm">
								<div class="flex items-center justify-between p-4 cursor-pointer" onclick="document.getElementById('input-frag-toggle').click()">
									<div class="flex items-center gap-2.5">
										<div class="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 border border-[#00ff66]/30 flex items-center justify-center text-emerald-600 dark:text-[#00ff66] font-bold shadow-sm">
											<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
										</div>
										<div>
											<span class="text-xs font-black text-gray-900 dark:text-zinc-100 flex items-center gap-1.5">
												<span>فرگمنت ضد فیلترینگ</span>
											</span>
											<span class="text-[10px] text-gray-500 dark:text-zinc-400 block font-normal mt-0.5">تجزیه پکت‌های اتصال برای عبور تضمینی</span>
										</div>
									</div>
									<div class="flex items-center gap-2" onclick="event.stopPropagation()">
										<label class="relative inline-flex items-center cursor-pointer select-none">
											<input type="checkbox" id="input-frag-toggle" onchange="toggleFragInputs(this.checked)" checked class="sr-only peer">
											<div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:bg-blue-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:-translate-x-[20px]"></div>
										</label>
										<svg id="frag-settings-icon" class="w-4 h-4 text-emerald-600 dark:text-[#00ff66] transition-transform duration-300 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
									</div>
								</div>
								<div id="frag-inputs-container" class="p-4 pt-0 space-y-3.5 transition-all duration-300">
									<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2.5 border-t border-blue-100 dark:border-amoled-border transition-all duration-200">
										<div>
											<label class="block text-[10px] font-bold text-gray-600 dark:text-zinc-300 mb-1 flex items-center justify-between">
												<span>طول فرگمنت (Length)</span>
												<span class="text-[9px] text-gray-400">بایت‌های تقسیم پکت</span>
											</label>
											<input type="text" id="input-frag-len" value="200-3000" class="w-full px-3 py-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-xs font-mono text-center text-gray-800 dark:text-zinc-100 transition shadow-sm" dir="ltr" placeholder="مثال: 10-30 یا 200-3000">
										</div>
										<div>
											<label class="block text-[10px] font-bold text-gray-600 dark:text-zinc-300 mb-1 flex items-center justify-between">
												<span>بازه فرگمنت (Interval ms)</span>
												<span class="text-[9px] text-gray-400">تاخیر میلی‌ثانیه</span>
											</label>
											<input type="text" id="input-frag-int" value="1-2" class="w-full px-3 py-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-xs font-mono text-center text-gray-800 dark:text-zinc-100 transition shadow-sm" dir="ltr" placeholder="مثال: 1-2 یا 2-5">
										</div>
									</div>
									<div class="pt-2 border-t border-blue-100/80 dark:border-amoled-border space-y-2">
										<div class="flex items-center justify-between">
											<span class="text-[11px] font-black text-gray-800 dark:text-zinc-200 flex items-center gap-1.5">
												<span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
												<span>تنظیمات پیشنهادی فرگمنت برای اپراتورها (کلیک برای اعمال خودکار):</span>
											</span>
										</div>
										<div class="grid grid-cols-1 sm:grid-cols-4 gap-2">
											<button type="button" onclick="applyFragPreset('mci', this)" class="frag-preset-card group p-2.5 rounded-xl border border-teal-300/80 dark:border-teal-800/70 bg-white dark:bg-amoled-bg hover:border-teal-500 dark:hover:border-teal-500 hover:shadow-md hover:shadow-teal-500/10 text-right transition-all flex flex-col justify-between cursor-pointer">
												<div class="flex items-center justify-between mb-1.5">
													<span class="text-xs font-black text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
														<span class="w-2 h-2 rounded-full bg-teal-500"></span>
														همراه اول (MCI)
													</span>
													<span class="text-[9px] px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono font-bold whitespace-nowrap">10-30</span>
												</div>
												<p class="text-[10px] text-teal-600/90 dark:text-teal-400/80 font-medium leading-tight">شکستن پکت + تاخیر ۲-۵ ms</p>
											</button>
											<button type="button" onclick="applyFragPreset('irancell', this)" class="frag-preset-card group p-2.5 rounded-xl border border-amber-300/80 dark:border-amber-800/70 bg-white dark:bg-amoled-bg hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-md hover:shadow-amber-500/10 text-right transition-all flex flex-col justify-between cursor-pointer">
												<div class="flex items-center justify-between mb-1.5">
													<span class="text-xs font-black text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
														<span class="w-2 h-2 rounded-full bg-amber-500"></span>
														ایرانسل (MTN)
													</span>
													<span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold whitespace-nowrap">100-200</span>
												</div>
												<p class="text-[10px] text-amber-600/90 dark:text-amber-400/80 font-medium leading-tight">پایداری 4G/5G + تاخیر ۵-۱۰ ms</p>
											</button>
											<button type="button" onclick="applyFragPreset('rightel', this)" class="frag-preset-card group p-2.5 rounded-xl border border-fuchsia-300/80 dark:border-fuchsia-800/70 bg-white dark:bg-amoled-bg hover:border-fuchsia-500 dark:hover:border-fuchsia-500 hover:shadow-md hover:shadow-fuchsia-500/10 text-right transition-all flex flex-col justify-between cursor-pointer">
												<div class="flex items-center justify-between mb-1.5">
													<span class="text-xs font-black text-fuchsia-700 dark:text-fuchsia-300 flex items-center gap-1.5">
														<span class="w-2 h-2 rounded-full bg-fuchsia-500"></span>
														رایتل (Rightel)
													</span>
													<span class="text-[9px] px-1.5 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 font-mono font-bold whitespace-nowrap">50-100</span>
												</div>
												<p class="text-[10px] text-fuchsia-600/90 dark:text-fuchsia-400/80 font-medium leading-tight">بهینه ۳G/4G + تاخیر ۲-۵ ms</p>
											</button>
											<button type="button" onclick="applyFragPreset('tci', this)" class="frag-preset-card group p-2.5 rounded-xl border border-indigo-300/80 dark:border-indigo-800/70 bg-white dark:bg-amoled-bg hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md hover:shadow-indigo-500/10 text-right transition-all flex flex-col justify-between cursor-pointer">
												<div class="flex items-center justify-between mb-1.5">
													<span class="text-xs font-black text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
														<span class="w-2 h-2 rounded-full bg-indigo-500"></span>
														مخابرات / ثابت
													</span>
													<span class="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono font-bold whitespace-nowrap">50-200</span>
												</div>
												<p class="text-[10px] text-indigo-600/90 dark:text-indigo-400/80 font-medium leading-tight">آسیاتک، فیبر و ... + تاخیر ۱-۳ ms</p>
											</button>
										</div>
										<button type="button" onclick="applyFragPreset('gaming', this)" class="frag-preset-card w-full p-2.5 rounded-xl border border-emerald-300/80 dark:border-emerald-800/70 bg-white dark:bg-amoled-bg hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md hover:shadow-emerald-500/10 transition-all flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-300 cursor-pointer">
											<div class="flex items-center gap-2">
												<span class="text-base">🚀</span>
												<span>حالت فوق سریع (طول ۲۰۰-۳۰۰۰ | تاخیر ۱-۲ ms)</span>
											</div>
											<span class="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-black whitespace-nowrap">پینگ پایین</span>
										</button>
									</div>
								</div>
							</div>
							<div class="border border-purple-200 dark:border-amoled-border rounded-xl overflow-hidden shadow-sm">
								<div class="flex items-center justify-between p-3.5 bg-purple-50/60 dark:bg-amoled-input/30 cursor-pointer" onclick="document.getElementById('input-advanced-settings-toggle').click()">
									<div class="flex items-center gap-2">
										<svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
										<span class="text-xs font-black text-purple-900 dark:text-purple-300">تنظیمات پیشرفته بهینه سازی</span>
										<span onclick="event.stopPropagation(); togglePattNgModal(true)" class="mr-2 px-1.5 py-0.5 bg-green-600/10 dark:bg-[#33FB1F]/10 text-green-700 dark:text-[#33FB1F] border border-green-600/30 dark:border-[#33FB1F]/30 rounded text-[10px] hover:bg-green-600/20 dark:hover:bg-[#33FB1F]/20 transition-colors shadow-sm dark:shadow-[0_0_8px_rgba(51,251,31,0.3)] animate-pulse cursor-pointer">مهم🚨</span>
									</div>
									<div class="flex items-center gap-2" onclick="event.stopPropagation()">
										<label class="relative inline-flex items-center cursor-pointer select-none">
											<input type="checkbox" id="input-advanced-settings-toggle" onchange="toggleAdvancedSettingsInputs(this.checked)" class="sr-only peer">
											<div class="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:bg-purple-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-transform peer-checked:after:-translate-x-[16px]"></div>
										</label>
										<svg id="advanced-settings-icon" class="w-4 h-4 text-purple-600 dark:text-purple-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
									</div>
								</div>
								<div id="advanced-settings-container" class="hidden opacity-50 pointer-events-none transition-opacity duration-300 p-4 border-t border-purple-100 dark:border-amoled-border space-y-3 bg-white dark:bg-amoled-input">
									<div>
										<label class="block text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-1">Advanced Fragment (fm JSON)</label>
										<input type="text" id="input-advanced-frag" placeholder="{&quot;tcp&quot;: [{&quot;type&quot;: &quot;fragment&quot;..." dir="ltr" class="w-full px-3 py-2 bg-gray-50 dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 text-[10px] font-mono text-gray-800 dark:text-zinc-100 placeholder-gray-400">
									</div>
									<div>
										<label class="block text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-1">Cipher Suites (cs)</label>
										<input type="text" id="input-cipher-suites" placeholder="TLS_AES_256_GCM_SHA384..." dir="ltr" class="w-full px-3 py-2 bg-gray-50 dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 text-[10px] font-mono text-gray-800 dark:text-zinc-100 placeholder-gray-400">
									</div>
									<div>
										<label class="block text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-1">TLS Mask (Custom SNI / Host)</label>
										<input type="text" id="input-tls-mask" placeholder="www.speedtest.net" dir="ltr" class="w-full px-3 py-2 bg-gray-50 dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 text-[10px] font-mono text-gray-800 dark:text-zinc-100 placeholder-gray-400">
									</div>
									<button type="button" onclick="fillPatternihaValues()" class="w-full py-2 bg-transparent border-2 border-purple-500 text-purple-600 dark:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 mt-1 shadow-sm">
										<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
										<span>پر کردن خودکار مقادیر بهینه ساز Patterniha</span>
									</button>
								</div>
							</div>
							<div class="border border-teal-200 dark:border-teal-900/60 bg-teal-50/40 dark:bg-teal-950/20 rounded-xl overflow-hidden shadow-sm mt-3">
								<div class="flex items-center justify-between p-3.5 bg-teal-100/50 dark:bg-teal-900/40 cursor-pointer" onclick="document.getElementById('input-ech-settings-toggle').click()">
									<div class="flex items-center gap-2">
										<svg class="w-4 h-4 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
										<span class="text-xs font-black text-teal-900 dark:text-teal-300">تنظیمات ECH</span>
									</div>
									<div class="flex items-center gap-2" onclick="event.stopPropagation()">
										<label class="relative inline-flex items-center cursor-pointer select-none">
											<input type="checkbox" id="input-ech-settings-toggle" onchange="toggleEchSettingsInputs(this.checked)" class="sr-only peer">
											<div class="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:bg-teal-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-transform peer-checked:after:-translate-x-[16px]"></div>
										</label>
										<svg id="ech-settings-icon" class="w-4 h-4 text-teal-600 dark:text-teal-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
									</div>
								</div>
								<div id="ech-settings-container" class="hidden opacity-50 pointer-events-none transition-opacity duration-300 p-4 border-t border-teal-100 dark:border-teal-950 space-y-4 bg-white dark:bg-amoled-input">
									<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
										<div>
											<label class="block text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-1">دامنه‌های ECH</label>
											<textarea id="input-ech-doms" oninput="localStorage.setItem('mili_ech_doms', this.value)" dir="ltr" class="w-full h-20 px-3 py-2 bg-gray-50 dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs font-mono text-gray-800 dark:text-zinc-100 placeholder-gray-400 transition resize-none shadow-sm"></textarea>
											<div class="flex items-center gap-1.5 mt-1.5">
												<button type="button" onclick="fetchEchRepo('dom')" id="btn-fetch-ech-dom" class="flex-1 py-1.5 bg-transparent border-2 border-teal-500 text-teal-600 dark:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 shadow-sm">
													<span>دریافت دامنه</span>
												</button>
												<div class="w-16 relative">
													<input type="number" id="input-ech-dom-count" min="1" max="50" dir="ltr" placeholder="تعداد" class="w-full px-1.5 py-1.5 bg-white dark:bg-amoled-input border border-teal-200 dark:border-teal-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-[10px] font-mono text-center font-bold text-teal-700 dark:text-teal-400 shadow-sm transition" title="تعداد دامنه">
												</div>
											</div>
										</div>
										<div>
											<label class="block text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-1">آی‌پی‌های DNS</label>
											<textarea id="input-ech-dns" oninput="localStorage.setItem('mili_ech_dns', this.value)" dir="ltr" class="w-full h-20 px-3 py-2 bg-gray-50 dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs font-mono text-gray-800 dark:text-zinc-100 placeholder-gray-400 transition resize-none shadow-sm"></textarea>
											<div class="flex items-center gap-1.5 mt-1.5">
												<button type="button" onclick="fetchEchRepo('dns')" id="btn-fetch-ech-dns" class="flex-1 py-1.5 bg-transparent border-2 border-teal-500 text-teal-600 dark:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 shadow-sm">
													<span>دریافت DNS</span>
												</button>
												<div class="w-16 relative">
													<input type="number" id="input-ech-dns-count" min="1" max="50" dir="ltr" placeholder="تعداد" class="w-full px-1.5 py-1.5 bg-white dark:bg-amoled-input border border-teal-200 dark:border-teal-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-[10px] font-mono text-center font-bold text-teal-700 dark:text-teal-400 shadow-sm transition" title="تعداد DNS">
												</div>
											</div>
										</div>
									</div>
									<div>
										<label class="block text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-1.5">پروتکل‌های ترکیب</label>
										<div class="grid grid-cols-3 gap-2">
											<label class="flex items-center justify-center gap-1.5 p-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg cursor-pointer hover:border-teal-500 transition select-none">
												<input type="checkbox" id="chk-ech-udp" value="udp" checked class="w-3.5 h-3.5 rounded text-teal-600 focus:ring-0 cursor-pointer" style="accent-color: #0d9488;">
												<span class="text-xs font-bold text-gray-700 dark:text-zinc-300">UDP</span>
											</label>
											<label class="flex items-center justify-center gap-1.5 p-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg cursor-pointer hover:border-teal-500 transition select-none">
												<input type="checkbox" id="chk-ech-tcp" value="tcp" class="w-3.5 h-3.5 rounded text-teal-600 focus:ring-0 cursor-pointer" style="accent-color: #0d9488;">
												<span class="text-xs font-bold text-gray-700 dark:text-zinc-300">TCP</span>
											</label>
											<label class="flex items-center justify-center gap-1.5 p-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg cursor-pointer hover:border-teal-500 transition select-none">
												<input type="checkbox" id="chk-ech-doh" value="doh" class="w-3.5 h-3.5 rounded text-teal-600 focus:ring-0 cursor-pointer" style="accent-color: #0d9488;">
												<span class="text-xs font-bold text-gray-700 dark:text-zinc-300">DOH</span>
											</label>
										</div>
									</div>
									<button type="button" onclick="buildEchCombinations()" class="w-full py-2 bg-transparent border-2 border-teal-600 text-teal-700 hover:bg-teal-50 dark:border-teal-500 dark:text-teal-400 dark:hover:bg-teal-900/20 rounded-lg text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5">
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
										<span>ترکیب و ساخت ECH</span>
									</button>
									<div class="pt-2 border-t border-teal-100 dark:border-teal-900/50">
										<label class="block text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-1">مقادیر ECH</label>
										<textarea id="input-ech-value" dir="ltr" class="w-full h-24 px-3 py-2 bg-gray-50 dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs font-mono text-gray-800 dark:text-zinc-100 placeholder-gray-400 transition resize-none shadow-sm">cloudflare-ech.com+udp://1.1.1.1</textarea>
									</div>
								</div>
							</div>
							<div class="mt-1 p-2.5 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg flex items-start gap-2 shadow-sm">
								<svg class="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
								<span class="text-[10px] font-bold text-amber-700 dark:text-amber-400 leading-relaxed">هشدار: این تنظیمات روی پروتکل شدوساکس اعمال نمی‌شوند.</span>
							</div>
						</div>
						<div id="tab-proxy-settings" class="user-tab-panel hidden space-y-4">
							<div class="p-4 bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-900/40 rounded-xl flex flex-col gap-3 shadow-sm">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-2">
										<svg class="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
										<div>
											<span class="text-xs font-black text-gray-800 dark:text-zinc-200">تست اتصال مستقیم (بدون پروکسی)</span>
											<span class="text-[10px] text-gray-500 dark:text-zinc-400 block font-normal mt-0.5">تست ارتباط شما با کلودفلر و کلودفلر با نت آزاد</span>
										</div>
									</div>
								</div>
								<div class="grid grid-cols-2 gap-2 bg-white/60 dark:bg-amoled-bg/50 p-2.5 rounded-lg border border-sky-100 dark:border-sky-900/30">
									<div class="flex flex-col items-center justify-center gap-1 border-l border-gray-200 dark:border-amoled-border">
										<span class="text-[9px] font-bold text-gray-400">☁️ پینگ شما به کلودفلر</span>
										<span id="client-to-server-ping" class="text-[10px] font-bold text-gray-600 dark:text-zinc-300">-</span>
									</div>
									<div class="flex flex-col items-center justify-center gap-1">
										<span class="text-[9px] font-bold text-gray-400">🌍 پینگ کلودفلر به اینترنت آزاد</span>
										<span id="server-to-net-ping" class="text-[10px] font-bold text-gray-600 dark:text-zinc-300">-</span>
									</div>
								</div>
								<button type="button" id="test-direct-btn" onclick="testDirectPing()" class="w-full py-2 bg-transparent border-2 border-sky-500 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg text-xs font-bold transition shadow-sm flex items-center justify-center gap-1">
									<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
									<span>تست اتصال مستقیم</span>
								</button>
							</div>
							<div class="border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 rounded-xl overflow-hidden shadow-sm">
								<div class="flex items-center justify-between p-3 bg-blue-100/50 dark:bg-blue-900/40 border-b border-blue-200 dark:border-blue-800/50">
									<div class="flex items-center gap-2">
										<span class="text-lg drop-shadow-sm">🌐</span>
										<span class="text-[11px] font-black text-blue-900 dark:text-blue-300">اتصال مستقیم (بدون پروکسی خروجی)</span>
									</div>
									<label class="relative inline-flex items-center cursor-pointer select-none">
										<input type="checkbox" id="input-enable-direct" checked class="sr-only peer">
										<div class="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:bg-blue-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:-translate-x-[16px]"></div>
									</label>
								</div>
								<div class="p-3 space-y-2.5">
									<p class="text-[10px] font-medium text-blue-800 dark:text-blue-200/80 leading-relaxed text-justify">
										کانفیگ‌های 🌐 به دلیل نداشتن آی‌پی ثابت، معمولاً دارای <span class="font-bold text-emerald-600 dark:text-[#00ff66]">پینگ بهتر و سرعت بالاتری</span> هستند.
									</p>
									<div class="flex items-start gap-1.5 p-2 bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg shadow-sm">
										<svg class="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
										<span class="text-[9px] font-bold text-red-700 dark:text-red-400 leading-relaxed text-justify">هشدار: هنگام اتصال به کانفیگ‌های 🌐، از باز کردن پنل خودداری کنید (باعث قطعی و اختلال در عملکرد پنل می‌شود).</span>
									</div>
								</div>
							</div>
							<div class="p-4 bg-gray-50/70 dark:bg-amoled-input/30 border border-gray-200/70 dark:border-amoled-border rounded-xl space-y-3">
								<div class="flex items-center justify-between border-b pb-3 border-gray-200/50 dark:border-amoled-border">
									<div class="flex items-center gap-2">
										<svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
										<div>
											<span class="text-xs font-black text-gray-800 dark:text-zinc-200">تنظیم کشور و ثابت کردن آی‌پی (SOCKS5/HTTP)</span>
											<span class="text-[10px] text-gray-400 block font-normal">زنجیره اتصال خروجی جهت عبور از تحریم‌ها و تغییر لوکیشن</span>
										</div>
									</div>
									<label class="relative inline-flex items-center cursor-pointer select-none">
										<input type="checkbox" id="user-proxy-mode-toggle" onchange="toggleUserProxyMode(this.checked)" class="sr-only peer">
										<div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:bg-emerald-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:after:-translate-x-[16px]"></div>
									</label>
								</div>
								<div class="transition-opacity duration-300 opacity-50 pointer-events-none space-y-3 pt-1" id="user-socks5-container">
									<div id="proxies-fields-wrapper" class="flex flex-col gap-2 w-full"></div>
									<button type="button" id="add-proxy-field-btn" onclick="addProxyFieldUI()" class="w-full py-2.5 bg-transparent border-2 border-emerald-500 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 shadow-sm">
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
										<span>افزودن کشور / پروکسی جدید</span>
									</button>
									<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
										<button type="button" onclick="testUserSocksProxy()" id="test-user-proxy-btn" class="w-full py-2.5 bg-transparent border-2 border-sky-500 text-sky-600 dark:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg text-xs font-bold transition shadow-sm flex items-center justify-center gap-1">
											<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
											<span>تست پروکسی‌ها</span>
										</button>
										<button type="button" onclick="openProxySelectorModal()" class="w-full py-2.5 bg-transparent border-2 border-amber-500 text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg text-xs font-bold transition shadow-sm flex items-center justify-center gap-1">
											<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
											<span>مخزن پروکسی‌های VIP</span>
										</button>
									</div>
									<div class="flex items-center justify-between p-3.5 bg-emerald-50/80 dark:bg-amoled-input/30 border border-emerald-500/40 dark:border-amoled-border rounded-xl shadow-sm">
										<div class="flex items-center gap-2">
											<svg class="w-4 h-4 text-emerald-600 dark:text-emerald-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
											<div>
												<span class="text-xs font-black text-emerald-800 dark:text-emerald-400">تعویض خودکار پروکسی خروجی خراب</span>
												<span class="text-[10px] text-emerald-600 dark:text-emerald-500 block font-medium">جایگزینی هوشمند در صورت قطع شدن پروکسی</span>
											</div>
										</div>
										<label class="relative inline-flex items-center cursor-pointer select-none">
											<input type="checkbox" id="input-auto-rotate-user-proxy" class="sr-only peer">
											<div class="w-8 h-4 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:bg-emerald-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-transform peer-checked:after:-translate-x-[16px]"></div>
										</label>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
								<button type="button" onclick="toggleDonateModal(true)" class="py-2.5 px-3 bg-transparent border-2 border-red-500 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm">
									<svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3 9.24 3 10.91 3.81 12 5.08 13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
									<span>اهدای پروکسی شخصی به مخزن</span>
								</button>
								<button type="button" onclick="copyScannerCode('bash <(curl -sL https://aeq6hj1i43heizbdbt2xyqu3aufyl.1bwxwrj26kxbybdc0iplho2iqdt25shgo.workers.dev/mili-relay.sh | tr -d &quot;\\\\r&quot;)', this)" class="py-2.5 px-3 bg-transparent border-2 border-[#00ff66] text-blue-600 dark:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm">
									<svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
									<span>کپی دستور ساخت پروکسی ریلی</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="px-5 py-3.5 border-t border-gray-150 dark:border-amoled-border bg-gray-50/70 dark:bg-amoled-bg/60 flex md:hidden items-center justify-between gap-3">
					<button type="button" onclick="toggleModal(false)" class="px-5 py-2.5 bg-transparent border-2 border-red-600 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold rounded-xl text-xs sm:text-sm transition shadow-sm">
						انصراف
					</button>
					<div class="flex items-center gap-2">
						<button type="submit" id="submit-btn" class="px-7 py-2.5 bg-transparent border-2 border-green-600 text-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 font-black rounded-xl text-xs sm:text-sm transition shadow-lg flex items-center gap-1.5 cursor-pointer">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
							<span>ایجاد کاربر</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
<div id="ip-selector-modal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-sm bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-2xl shadow-2xl overflow-hidden transition-all transform duration-300 opacity-0 scale-95 ease-out flex flex-col">
		<div class="px-5 py-4 border-b border-gray-150 dark:border-amoled-border flex justify-between items-center bg-gray-50/70 dark:bg-amoled-bg/60">
			<div class="flex items-center gap-3">
				<div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shadow-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
				</div>
				<div>
					<h3 class="font-black text-gray-900 dark:text-zinc-100 text-sm tracking-tight">مخزن آی‌پی تمیز</h3>
				</div>
			</div>
			<button type="button" onclick="toggleIpSelectorModal(false)" class="p-2 rounded-lg bg-transparent border-2 border-red-500 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 shadow-sm" title="بستن">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
			</button>
		</div>
		<div class="p-5 sm:p-6 space-y-4">
			<div id="ip-loading-state" class="text-center text-sm text-gray-500 dark:text-zinc-400 hidden">
				Loading IPs...
			</div>
			<div id="ip-selection-form" class="space-y-4">
				<div class="p-4 bg-gray-50/70 dark:bg-amoled-input/30 border border-gray-200/70 dark:border-amoled-border rounded-xl space-y-3">
					<div>
						<label class="block text-xs font-black text-gray-700 dark:text-zinc-200 mb-1.5 flex items-center gap-1.5">
							<span class="w-2 h-2 rounded-full bg-emerald-500"></span> نوع آدرس
						</label>
						<div class="grid grid-cols-3 gap-2 w-full">
							<label class="flex items-center justify-center gap-1 p-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg cursor-pointer hover:border-[#00ff66] transition select-none">
								<input type="checkbox" name="ip-repo-type" value="ipv4" checked onchange="selectSingleRepoType(this)" class="w-3.5 h-3.5 rounded text-green-600 focus:ring-0 cursor-pointer" style="accent-color: #00ff66;">
								<span class="text-[11px] font-bold text-gray-700 dark:text-zinc-300">آی‌پی4</span>
							</label>
							<label class="flex items-center justify-center gap-1 p-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg cursor-pointer hover:border-[#00ff66] transition select-none">
								<input type="checkbox" name="ip-repo-type" value="ipv6" onchange="selectSingleRepoType(this)" class="w-3.5 h-3.5 rounded text-green-600 focus:ring-0 cursor-pointer" style="accent-color: #00ff66;">
								<span class="text-[11px] font-bold text-gray-700 dark:text-zinc-300">آی‌پی6</span>
							</label>
							<label class="flex items-center justify-center gap-1 p-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg cursor-pointer hover:border-[#00ff66] transition select-none">
								<input type="checkbox" name="ip-repo-type" value="domain" onchange="selectSingleRepoType(this)" class="w-3.5 h-3.5 rounded text-green-600 focus:ring-0 cursor-pointer" style="accent-color: #00ff66;">
								<span class="text-[11px] font-bold text-gray-700 dark:text-zinc-300">دامنه</span>
							</label>
						</div>
					</div>
					<div>
						<label class="block text-xs font-black text-gray-700 dark:text-zinc-200 mb-1.5 flex items-center gap-1.5">
							<span class="w-2 h-2 rounded-full bg-blue-500"></span> اوپراتور
						</label>
						<select id="ip-operator-select" class="w-full px-3 py-2.5 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-gray-800 dark:text-zinc-100 cursor-pointer shadow-sm transition">
							<option value="all">همه (توصیه شده)</option>
						</select>
					</div>
					<div>
						<label class="block text-xs font-black text-gray-700 dark:text-zinc-200 mb-1.5 flex items-center gap-1.5">
							<span class="w-2 h-2 rounded-full bg-purple-500"></span> تعداد
						</label>
						<input type="number" id="ip-count-input" min="1" max="500" value="20" dir="ltr" class="w-full px-3 py-2.5 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-xs font-mono text-center font-semibold text-gray-800 dark:text-zinc-100 shadow-sm transition">
					</div>
				</div>
			</div>
			<div class="pt-2 flex gap-3">
				<button type="button" onclick="toggleIpSelectorModal(false)" class="flex-1 py-2.5 bg-transparent border-2 border-red-600 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold rounded-xl text-xs sm:text-sm transition shadow-sm">لغو</button>
				<button type="button" onclick="applySelectedIps()" class="flex-1 py-2.5 bg-transparent border-2 border-green-600 text-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 font-black rounded-xl text-xs sm:text-sm transition shadow-lg">دریافت</button>
			</div>
		</div>
	</div>
</div>
<div id="ip-scanner-modal" class="fixed inset-0 z-[65] flex items-center justify-center p-4 bg-black/60 opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-lg bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-md shadow-xl overflow-hidden transition-all transform duration-300 opacity-0 scale-95 ease-out flex flex-col max-h-[90vh]">
		<div class="px-6 py-4 border-b border-gray-150 dark:border-amoled-border flex justify-between items-center bg-gray-50 dark:bg-zinc-900/50 flex-shrink-0">
			<h3 class="font-bold text-gray-900 dark:text-zinc-100 text-sm flex items-center gap-2">
				<svg class="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
				اسکنر اختصاصی آی‌پی تمیز
			</h3>
			<button type="button" onclick="toggleIpScannerModal(false)" class="p-1.5 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200 shadow-sm">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
			</button>
		</div>
		<div class="p-5 space-y-4 overflow-y-auto flex-1">
			<div class="border border-green-200 dark:border-green-900/50 bg-green-50/50 dark:bg-green-900/10 rounded-md p-4 shadow-sm">
				<div class="flex items-center gap-2 mb-2">
					<svg class="w-5 h-5 text-green-600 dark:text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02L19.695 6.183c.1568-.2716.0637-.6182-.2079-.7754-.2716-.1564-.6183-.0633-.775.2082l-1.8584 3.2185c-1.3853-.6328-2.9697-.9881-4.6644-.9881-1.6946 0-3.279.3553-4.664.9881L5.6664 5.6158c-.1567-.2715-.5038-.3646-.775-.2082-.2716.1572-.3647.5038-.2079.7754l1.8136 3.1385C2.963 11.2384 1.1571 14.5422 1 18.4234h22c-.1572-3.8812-1.963-7.185-5.4955-9.102"/></svg>
					<h4 class="font-black text-sm text-green-700 dark:text-green-400">کاربران موبایل (Pydroid 3)</h4>
				</div>
				<p class="text-[11px] text-gray-600 dark:text-gray-400 mb-3 leading-relaxed font-medium">
					اپلیکیشن <a href="https://play.google.com/store/apps/details?id=ru.iiec.pydroid3" target="_blank" class="text-blue-500 hover:text-emerald-600 dark:text-[#00ff66] font-bold underline">Pydroid 3</a> را نصب کنید. از منوی کناری برنامه وارد بخش <b>Terminal</b> شوید و کد زیر را اجرا کنید؛ سپس آدرس <code class="bg-white dark:bg-zinc-800 px-1 py-0.5 rounded text-blue-500 font-bold shadow-sm" dir="ltr">http://127.0.0.1:8000</code> را در مرورگر باز کنید.
				</p>
				<div class="flex flex-col gap-2">
					<div class="w-full bg-gray-100 dark:bg-amoled-input border border-gray-300 dark:border-amoled-border rounded-md p-2.5 text-[10px] font-mono text-left text-gray-800 dark:text-zinc-300 break-all select-all overflow-x-auto whitespace-pre-wrap max-h-24 overflow-y-auto" dir="ltr">python -c "import urllib.request; req = urllib.request.Request('https://aeq6hj1i43heizbdbt2xyqu3aufyl.1bwxwrj26kxbybdc0iplho2iqdt25shgo.workers.dev/mili-scanner.txt', headers={'User-Agent': 'Mozilla/5.0'}); exec(urllib.request.urlopen(req).read().decode('utf-8').split('---PYTH' + 'ON---')[1].split('---POWERSHELL---')[0].strip())"</div>
					<button type="button" onclick="copyScannerCode('python -c &quot;import urllib.request; req = urllib.request.Request(\\'https://aeq6hj1i43heizbdbt2xyqu3aufyl.1bwxwrj26kxbybdc0iplho2iqdt25shgo.workers.dev/mili-scanner.txt\\', headers={\\'User-Agent\\': \\'Mozilla/5.0\\'}); exec(urllib.request.urlopen(req).read().decode(\\'utf-8\\').split(\\'---PYTH\\' + \\'ON---\\')[1].split(\\'---POWERSHELL---\\')[0].strip())&quot;', this)" class="w-full flex items-center justify-center gap-1.5 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700/80 rounded text-xs font-bold transition shadow-sm">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
						<span>کپی کد Pydroid</span>
					</button>
				</div>
			</div>
			<div class="border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10 rounded-md p-4 shadow-sm">
				<div class="flex items-center gap-2 mb-2">
					<svg class="w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.801"/></svg>
					<h4 class="font-black text-sm text-blue-700 dark:text-blue-400">کاربران ویندوز (CMD)</h4>
				</div>
				<p class="text-[11px] text-gray-600 dark:text-gray-400 mb-3 leading-relaxed font-medium">
					محیط <code class="font-bold">CMD</code>را در ویندوز باز کنید و کد زیر را برای اجرای اسکنر در آن پیست کنید و اینتر بزنید.
				</p>
				<div class="flex flex-col gap-2">
					<div class="w-full bg-gray-100 dark:bg-amoled-input border border-gray-300 dark:border-amoled-border rounded-md p-2.5 text-[10px] font-mono text-left text-gray-800 dark:text-zinc-300 break-all select-all overflow-x-auto whitespace-pre-wrap max-h-24 overflow-y-auto" dir="ltr">powershell -ExecutionPolicy Bypass -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 -bor [Net.SecurityProtocolType]::Tls13; $wc = New-Object System.Net.WebClient; $wc.Encoding = [System.Text.Encoding]::UTF8; $text = ($wc.DownloadString('https://aeq6hj1i43heizbdbt2xyqu3aufyl.1bwxwrj26kxbybdc0iplho2iqdt25shgo.workers.dev/mili-scanner.txt') -split '---POWERSHELL---')[1].Trim(); [IO.File]::WriteAllText('mili-scanner.ps1', $text, [System.Text.Encoding]::UTF8); .\mili-scanner.ps1"</div>
					<button type="button" onclick="copyScannerCode('powershell -ExecutionPolicy Bypass -Command &quot;[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 -bor [Net.SecurityProtocolType]::Tls13; $wc = New-Object System.Net.WebClient; $wc.Encoding = [System.Text.Encoding]::UTF8; $text = ($wc.DownloadString(\\'https://aeq6hj1i43heizbdbt2xyqu3aufyl.1bwxwrj26kxbybdc0iplho2iqdt25shgo.workers.dev/mili-scanner.txt\\') -split \\'---POWERSHELL---\\')[1].Trim(); [IO.File]::WriteAllText(\\'mili-scanner.ps1\\', $text, [System.Text.Encoding]::UTF8); .\\\\mili-scanner.ps1&quot;', this)" class="w-full flex items-center justify-center gap-1.5 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700/80 rounded text-xs font-bold transition shadow-sm">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
						<span>کپی کد CMD</span>
					</button>
				</div>
			</div>
		</div>
		<div class="p-4 border-t border-gray-150 dark:border-amoled-border bg-gray-50 dark:bg-zinc-900/50 flex-shrink-0">
			<button type="button" onclick="toggleIpScannerModal(false)" class="w-full py-2.5 bg-transparent border-2 border-red-700 text-red-700 hover:bg-red-900/20 hover:text-red-800 dark:border-red-700 dark:text-red-500 dark:hover:bg-red-900/40 dark:hover:text-red-400 font-bold rounded-md text-xs transition shadow-sm">بستن صفحه</button>
		</div>
	</div>
</div>
<div id="proxy-selector-modal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60  opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-md bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-md shadow-xl overflow-hidden transition-all transform duration-300 opacity-0 scale-95 ease-out">
		<div class="px-6 py-4 border-b border-gray-150 dark:border-amoled-border flex justify-between items-center bg-gray-50 dark:bg-zinc-900/50">
			<h3 class="font-bold text-gray-900 dark:text-zinc-100 text-sm">مخزن پـروکـسـی‌های آی‌پی ثابت</h3>
			<button type="button" onclick="toggleProxySelectorModal(false)" class="p-1.5 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200 shadow-sm">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
			</button>
		</div>
		<div class="p-5 space-y-4">
			<div class="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-500/30 rounded-md relative">
				<h4 class="text-[13px] font-black text-green-700 dark:text-green-400 mb-2 flex items-center gap-1.5">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
					پـروکـسـی‌های اختصاصی (VIP)
				</h4>
				<p class="text-[10px] text-green-600/80 dark:text-green-500/70 mb-3 leading-relaxed font-medium">
					پـروکـسـی‌های اهدایی از طرف کاربران. کیفیت بالا و بدون نیاز به اسکن.
				</p>
				<div class="flex flex-col sm:flex-row gap-2">
					<select id="vip-country-select" class="flex-1 px-3 py-2 bg-white dark:bg-amoled-input border border-green-200 dark:border-green-800/50 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 dark:text-zinc-300 cursor-pointer">
						<option value="">در حال بررسی مخزن...</option>
					</select>
					<button type="button" onclick="loadVipProxy()" id="vip-fetch-btn" class="sm:w-auto w-full px-4 py-2 bg-transparent border-2 border-green-600 text-green-700 hover:bg-green-900/20 hover:text-green-800 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/40 dark:hover:text-green-400 font-bold rounded-md text-xs transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap" disabled>
						دریافت
					</button>
				</div>
			</div>
			<div class="relative py-1 flex items-center justify-center">
				<span class="absolute w-full border-t border-gray-200 dark:border-amoled-border"></span>
				<span class="bg-white dark:bg-amoled-card px-3 text-[10px] font-bold text-gray-400 relative">یا اسکن عمومی</span>
			</div>
			<div class="p-4 bg-gray-50 dark:bg-amoled-input/50 border border-gray-200 dark:border-amoled-border rounded-md">
				<h4 class="text-[13px] font-black text-gray-700 dark:text-zinc-300 mb-2 flex items-center gap-1.5">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
					پـروکـسـی های عمومی
				</h4>
				<p class="text-[10px] text-gray-500 dark:text-zinc-500 mb-3 leading-relaxed font-medium">
					جستجو در منابع رایگان؛ به دلیل نیاز به تست کیفیت زمان‌بر است.
				</p>
				<div id="proxy-loading-state" class="text-center text-[11px] text-blue-500 font-bold hidden my-3 whitespace-pre-line leading-relaxed">
					در حال اسکن...
				</div>
				<div id="proxy-selection-form" class="flex flex-col gap-2">
					<select id="proxy-country-select" class="w-full px-3 py-2 bg-white dark:bg-amoled-input border border-gray-300 dark:border-zinc-700 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 dark:text-zinc-300 cursor-pointer">
						<option value="">در حال آماده‌سازی...</option>
					</select>
					<button type="button" onclick="fetchAndLoadProxy()" id="proxy-fetch-btn" class="w-full py-2.5 bg-transparent border-2 border-blue-600 text-blue-700 hover:bg-blue-900/20 hover:text-blue-800 dark:border-[#00ff66] dark:text-blue-500 dark:hover:bg-blue-900/40 dark:hover:text-blue-400 font-bold rounded-md text-xs transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
						شروع اسکن و یافتن پـروکـسـی
					</button>
				</div>
			</div>
			<div class="pt-1">
				<button type="button" onclick="toggleProxySelectorModal(false)" class="w-full py-2.5 bg-transparent border-2 border-red-700 text-red-700 hover:bg-red-900/20 hover:text-red-800 dark:border-red-700 dark:text-red-500 dark:hover:bg-red-900/40 dark:hover:text-red-400 font-bold rounded-md text-xs transition shadow-sm">انصراف و بستن</button>
			</div>
		</div>
	</div>
</div>
<div id="donate-modal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-sm bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-2xl shadow-2xl overflow-hidden transition-all transform duration-300 opacity-0 scale-95 ease-out flex flex-col" id="donate-modal-card">
		<div class="px-5 py-4 border-b border-gray-150 dark:border-amoled-border flex justify-between items-center bg-gray-50/70 dark:bg-amoled-bg/60">
			<div class="flex items-center gap-3">
				<div class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shadow-sm">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
				</div>
				<div>
					<h3 class="font-black text-gray-900 dark:text-zinc-100 text-sm tracking-tight">اهدای پـروکـسـی</h3>
				</div>
			</div>
			<button type="button" onclick="toggleDonateModal(false)" class="p-2 rounded-lg bg-transparent border-2 border-red-500 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 shadow-sm" title="بستن">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
			</button>
		</div>
		<div class="p-5 sm:p-6 space-y-4">
			<div class="p-4 bg-gray-50/70 dark:bg-amoled-input/30 border border-gray-200/70 dark:border-amoled-border rounded-xl space-y-3">
				<p class="text-[11px] text-gray-600 dark:text-zinc-400 leading-relaxed font-medium">
					اگر سرور دارید میتونید با دکمه <span class="text-emerald-600 dark:text-[#00ff66] font-black">«ساخت پـروکـسـی شخصی»</span> یک پـروکـسـی بسازید و اهدا کنید به پروژه.
				</p>
				<div>
					<input type="text" id="donate-proxy-input" placeholder="user:pass@ip:port" dir="ltr" class="w-full px-3 py-2.5 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-xs font-mono text-left font-semibold text-gray-800 dark:text-zinc-100 shadow-sm transition">
				</div>
				<div class="w-full text-center">
					<span id="donate-result" class="inline-block text-[11px] font-bold transition-colors break-words leading-relaxed empty:hidden"></span>
				</div>
			</div>
			<div class="pt-2 flex gap-3">
				<button type="button" onclick="toggleDonateModal(false)" class="flex-1 py-2.5 bg-transparent border-2 border-red-600 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold rounded-xl text-xs sm:text-sm transition shadow-sm">لغو</button>
				<button type="button" id="donate-submit-btn" onclick="testAndDonateProxy()" class="flex-1 py-2.5 bg-transparent border-2 border-green-600 text-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 font-black rounded-xl text-xs sm:text-sm transition shadow-lg">تست و اهدا</button>
			</div>
		</div>
	</div>
</div>
<div id="support-modal" class="fixed inset-0 z-[105] flex items-center justify-center p-4 bg-black/60  opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-md bg-white dark:bg-amoled-card border border-red-500/50 rounded-md shadow-2xl overflow-hidden p-6 text-center transition-all transform duration-300 opacity-0 scale-95 ease-out">
		<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 mb-4 shadow-inner">
			<svg class="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
			</svg>
		</div>
		<h3 class="font-black text-xl text-gray-900 dark:text-white mb-3">حمایت از میلی‌کانفیگ</h3>
		<p class="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-medium">
			این پروژه متن باز و رایگان است. برای تضمین پایداری و ادامه مسیر توسعه، نیازمند همراهی و حمایت شما عزیزان هستم. هرگونه حمایت شما، انگیزه من را برای ارائه امکانات بهتر دوچندان می‌کند. ❤️
		</p>
		<div class="space-y-3">
			<a href="https://donatonion.ir-netlify.workers.dev/" target="_blank" class="w-full py-3 bg-transparent border-2 border-orange-500 text-orange-600 hover:bg-orange-50 dark:border-orange-500/60 dark:text-orange-400 dark:hover:bg-orange-500/10 font-bold rounded-md text-sm transition duration-300 shadow-sm flex items-center justify-center gap-2">
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-.75-3.25h1.5v-1.5h-1.5v1.5zm0-3.5h1.5v-3h-1.5v3z"/></svg>
				حمایت مالی (رمز ارز)
			</a>
			<a href="https://t.me/miliconfig" target="_blank" class="w-full py-3 bg-transparent border-2 border-[#00ff66] text-blue-600 hover:bg-blue-50 dark:border-[#00ff66]/60 dark:text-blue-400 dark:hover:bg-blue-500/10 font-bold rounded-md text-sm transition duration-300 shadow-sm flex items-center justify-center gap-2">
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
				کانال تلگرام
			</a>
			<a href="https://github.com/miliconfig" target="_blank" class="w-full py-3 bg-transparent border-2 border-gray-600 text-gray-700 hover:bg-gray-100 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-zinc-800 font-bold rounded-md text-sm transition duration-300 shadow-sm flex items-center justify-center gap-2">
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
				گیتهاب 
			</a>
		</div>
			<button onclick="toggleSupportModal(false)" class="mt-4 w-full py-2.5 bg-transparent text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 font-bold rounded-md text-sm transition duration-300">
				بستن
			</button>
		</div>
	</div>
	<div id="settings-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60  opacity-0 pointer-events-none transition-all duration-300 ease-out">
		<div class="w-full max-w-md bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-md shadow-xl overflow-hidden transition-all transform duration-300 opacity-0 scale-95 ease-out flex flex-col max-h-[90vh]">
			<div class="px-6 py-4 border-b border-gray-150 dark:border-amoled-border flex justify-between items-center bg-gray-50 dark:bg-zinc-900/50">
				<h3 class="font-bold text-gray-900 dark:text-zinc-100">تنظیمات پـنـل</h3>
				<button onclick="toggleSettingsModal(false)" class="p-1.5 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200 shadow-sm">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
				</button>
			</div>
			<div class="p-6 space-y-4 overflow-y-auto flex-1 overscroll-contain">
				<div class="pt-2">
					<label class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-zinc-300">نرخ رفرش خودکار پـنـل</label>
					<div class="relative">
						<select id="refresh-rate-select" onchange="changeRefreshRate(this.value)" class="w-full pl-8 pr-3 py-2.5 bg-white dark:bg-amoled-input border border-gray-300 dark:border-amoled-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 dark:text-zinc-200 cursor-pointer appearance-none">
							<option value="1000">۱ ثانیه</option>
							<option value="2000">۲ ثانیه</option>
							<option value="5000" selected>۵ ثانیه (پیش‌فرض)</option>
							<option value="10000">۱۰ ثانیه</option>
							<option value="30000">۳۰ ثانیه</option>
							<option value="60000">۱ دقیقه</option>
							<option value="300000">۵ دقیقه</option>
							<option value="600000">۱۰ دقیقه</option>
						</select>
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-zinc-400">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
						</div>
					</div>
				</div>
				<div class="pt-4 border-t-2 border-gray-300 dark:border-zinc-700 flex items-center justify-between">
					<div class="flex items-center gap-2">
						<span class="text-sm font-bold text-gray-800 dark:text-zinc-200 flex items-center gap-1.5">
							<svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
							آپدیت خودکار پـنـل
						</span>
					</div>
					<label class="relative inline-flex items-center cursor-pointer select-none">
						<input type="checkbox" id="auto-update-toggle" onchange="handleAutoUpdateToggle(this)" class="sr-only peer">
						<div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
					</label>
				</div>
				<div class="pt-4 border-t-2 border-gray-300 dark:border-zinc-700 flex items-center justify-between">
					<div class="flex items-center gap-2">
						<span class="text-sm font-bold text-gray-800 dark:text-zinc-200 flex items-center gap-1.5">
							<svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
							پس زمینه متحرک و افکت موس
						</span>
					</div>
					<label class="relative inline-flex items-center cursor-pointer select-none">
						<input type="checkbox" id="gfx-toggle" onchange="toggleGfx(this.checked)" class="sr-only peer">
						<div class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-500"></div>
					</label>
				</div>
				<div class="pt-4 border-t-2 border-gray-300 dark:border-zinc-700">
					<button type="button" onclick="openPlacementModal()" class="w-full py-2.5 bg-transparent border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 dark:border-cyan-500/80 dark:text-cyan-400 dark:hover:bg-cyan-900/20 font-bold rounded-md text-sm transition-all shadow-sm flex items-center justify-center gap-2">
						تغییر ریجن پنل 🌐
					</button>
				</div>
				<div class="pt-4 border-t-2 border-gray-300 dark:border-zinc-700">
					<h4 class="text-sm font-bold mb-3 text-gray-800 dark:text-zinc-200">🔒 تغییر رمز عبور مدیریت</h4>
					<div class="space-y-3">
						<div>
							<label class="block text-[11px] text-gray-500 dark:text-gray-400 font-medium mb-1">رمز عبور فعلی</label>
							<input type="password" id="change-pwd-current" class="w-full px-3 py-2 bg-white dark:bg-amoled-input border border-gray-300 dark:border-amoled-border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-mono text-center">
						</div>
						<div>
							<label class="block text-[11px] text-gray-500 dark:text-gray-400 font-medium mb-1">رمز عبور جدید</label>
							<input type="password" id="change-pwd-new" class="w-full px-3 py-2 bg-white dark:bg-amoled-input border border-gray-300 dark:border-amoled-border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-mono text-center">
						</div>
						<button type="button" onclick="changeAdminPassword()" id="change-pwd-btn" class="w-full py-2 bg-transparent border-2 border-green-600 text-green-700 hover:bg-green-900/20 hover:text-green-800 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/40 dark:hover:text-green-400 font-semibold rounded-md text-xs transition-all shadow-sm">تغییر رمز عبور</button>
					</div>
				</div>
				<div class="pt-4 border-t-2 border-gray-300 dark:border-zinc-700">
					<h4 class="text-sm font-bold mb-3 text-gray-800 dark:text-zinc-200">💾 پشتیبان‌گیری و بازیابی</h4>
					<div class="grid grid-cols-2 gap-3">
						<button type="button" onclick="exportUsersBackup()" class="py-2.5 bg-transparent border-2 border-orange-500 text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-500/60 dark:hover:bg-orange-500/10 rounded-md text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg> پشتیبان گیری
						</button>
						<button type="button" onclick="triggerImportBackup()" class="py-2.5 bg-transparent border-2 border-[#00ff66] text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-[#00ff66]/60 dark:hover:bg-blue-500/10 rounded-md text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> بازیابی
						</button>
					</div>
					<input type="file" id="backup-file-input" onchange="importUsersBackup(event)" accept=".json" class="hidden">
				</div>
				<div class="pt-4 flex gap-3">
					<button type="button" onclick="toggleSettingsModal(false)" class="flex-1 py-2 bg-transparent border-2 border-red-700 text-red-700 hover:bg-red-900/20 hover:text-red-800 dark:border-red-700 dark:text-red-500 dark:hover:bg-red-900/40 dark:hover:text-red-400 font-bold rounded-md text-sm transition shadow-sm">انصراف</button>
					<button type="button" onclick="saveSettings()" id="save-settings-btn" class="flex-1 py-2 bg-transparent border-2 border-green-600 text-green-700 hover:bg-green-900/20 hover:text-green-800 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/40 dark:hover:text-green-400 font-medium rounded-md text-sm transition">ذخیره تنظیمات</button>
				</div>
			</div>
		</div>
	</div>
<div id="update-modal" class="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60  opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-md bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-md shadow-2xl overflow-hidden p-6 text-center transition-all transform duration-300 opacity-0 scale-95 ease-out">
		<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-500 mb-4 shadow-inner">
			<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
		</div>
		<h3 class="font-black text-xl text-gray-900 dark:text-white mb-2">بروزرسانی پـنـل</h3>
		<p id="update-modal-text" class="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-medium">
			نسخه جدید در دسترس است. اگر آپدیت خودکار جواب نداد، حتماً از طریق لینک زیر آپدیت دستی را انجام دهید.
		</p>
		<div class="space-y-3">
			<button onclick="applyUpdate()" class="w-full py-3.5 bg-transparent border-2 border-green-600 text-green-700 hover:bg-green-900/20 hover:text-green-800 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/40 dark:hover:text-green-400 font-black rounded-md text-sm transition duration-300 shadow-sm flex items-center justify-center gap-2">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
				آپدیت خودکار (توصیه شده)
			</button>
			<div class="relative py-2">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-gray-200 dark:border-amoled-border"></div>
				</div>
				<div class="relative flex justify-center text-xs">
					<span class="bg-white dark:bg-amoled-card px-2 text-gray-400">یا</span>
				</div>
			</div>
			<a href="https://t.me/miliconfig" target="_blank" class="w-full py-3.5 bg-orange-50 dark:bg-orange-950/30 hover:bg-orange-100 dark:hover:bg-orange-900/50 text-orange-600 dark:text-orange-500 border border-orange-300 dark:border-orange-500 font-bold rounded-md text-sm transition duration-300 shadow-sm flex items-center justify-center gap-2">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
				</svg>
				آپدیت از طریق ربات
			</a>
		</div>
		<button onclick="toggleUpdateModal(false)" class="mt-5 w-full py-3.5 bg-transparent border-2 border-red-700 text-red-700 hover:bg-red-900/20 hover:text-red-800 dark:border-red-700 dark:text-red-500 dark:hover:bg-red-900/40 dark:hover:text-red-400 font-bold rounded-md text-sm transition duration-300 shadow-sm flex items-center justify-center">
			انصراف
		</button>
	</div>
</div>
	<div id="token-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 opacity-0 pointer-events-none transition-opacity duration-200 ease-out">
		<div id="token-modal-card" class="w-full max-w-md bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-md shadow-2xl p-6 transform transition-all scale-95 opacity-0 duration-200">
			<div class="flex justify-between items-center mb-6">
				<div class="flex items-center gap-2">
					<div class="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
					<h3 class="text-lg font-bold text-gray-900 dark:text-white">تنظیم توکن کلودفلر</h3>
				</div>
				<button onclick="toggleTokenModal(false)" class="p-1.5 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200 shadow-sm">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
				</button>
			</div>
			<div class="mb-5 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50 rounded-md text-xs leading-relaxed text-orange-800 dark:text-orange-300 font-medium">
				توکن کلودفلر شما در این پـنـل ذخیره نشده است. برای فعال‌سازی آپدیت خودکار از داخل پـنـل، لطفاً توکن خود را دریافت کرده و در کادر زیر وارد کنید.
			</div>
			<a href="https://dash.cloudflare.com/profile/api-tokens?permissionGroupKeys=%5B%7B%22key%22%3A%22workers_scripts%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22workers_kv_storage%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22d1%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22account_settings%22%2C%22type%22%3A%22read%22%7D%2C%7B%22key%22%3A%22workers_subdomain%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22account_analytics%22%2C%22type%22%3A%22read%22%7D%5D&accountId=*&zoneId=all&name=Miliconfig-Deployer-Token" target="_blank" class="flex items-center justify-center gap-2 w-full py-3 bg-[#d94800] hover:bg-[#e35802] text-white font-bold rounded-md text-sm transition duration-300 mb-4 shadow-md shadow-orange-500/20">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
				دریافت توکن کلودفلر
			</a>
			<div class="space-y-4">
				<input type="password" id="update-token-input" placeholder="توکن را اینجا وارد کنید" class="w-full px-4 py-3 bg-gray-50 dark:bg-amoled-input border border-gray-300 dark:border-amoled-border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-mono text-center text-gray-900 dark:text-zinc-100 transition" dir="auto">
				<button id="submit-token-btn" onclick="submitTokenForUpdate()" class="w-full py-3 bg-transparent border-2 border-green-600 text-green-700 hover:bg-green-900/20 hover:text-green-800 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/40 dark:hover:text-green-400 font-bold rounded-md text-sm transition duration-300 shadow-lg">
					ثبت و آپدیت پـنـل
				</button>
			</div>
		</div>
	</div>
<div id="qr-modal" class="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 opacity-0 pointer-events-none transition-opacity duration-200 ease-out">
	<div id="qr-modal-card" class="w-full max-w-sm bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-md shadow-2xl p-6 transform transition-all scale-95 opacity-0 duration-200 text-center">
		<div class="flex justify-between items-center mb-4">
			<h3 class="text-lg font-bold text-gray-900 dark:text-white">QR Code</h3>
			<button onclick="toggleQrModal(false)" class="p-1.5 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200 shadow-sm">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
			</button>
		</div>
		<div class="flex justify-center bg-gray-100 dark:bg-amoled-bg p-4 rounded-md mb-4 border border-gray-200 dark:border-amoled-border">
			<div id="qrcode-container"></div>
		</div>
		<button onclick="downloadQrCode()" class="w-full py-2.5 bg-transparent border-2 border-green-600 text-green-700 hover:bg-green-900/20 hover:text-green-800 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/40 dark:hover:text-green-400 font-bold rounded-md text-sm transition duration-200 shadow-sm flex items-center justify-center gap-2">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
			دانلود تصویر QR
		</button>
	</div>
</div>
	<div id="bulk-actions-bar" class="fixed bottom-4 left-1/2 -translate-x-1/2 z-[40] bg-white dark:bg-zinc-900/90 border border-gray-200 dark:border-amoled-border/80 px-6 py-4 rounded-md shadow-2xl flex flex-wrap items-center justify-between gap-4 w-[95%] max-w-4xl transition-all duration-300 transform translate-y-28 opacity-0 pointer-events-none ">
		<div class="flex items-center gap-2">
			<span class="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-sm shadow-blue-500/50"></span>
			<span id="bulk-selected-count" class="text-sm font-bold text-gray-800 dark:text-zinc-200">۰ کاربر انتخاب شده</span>
		</div>
		<div class="flex flex-wrap gap-2 justify-end">
			<button onclick="bulkToggleStatus(1)" class="px-3 py-1.5 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-md text-xs font-bold transition border border-green-200 dark:border-green-900/50 flex items-center gap-1">
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> فعال‌سازی
			</button>
			<button onclick="bulkToggleStatus(0)" class="px-3 py-1.5 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-md text-xs font-bold transition border border-amber-200 dark:border-amber-900/50 flex items-center gap-1">
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> غیرفعال‌سازی
			</button>
			<button onclick="bulkReset('volume')" class="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/20 text-emerald-600 dark:text-[#00ff66] hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md text-xs font-bold transition border border-blue-200 dark:border-blue-900/50 flex items-center gap-1">
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg> ریست حجم
			</button>
			<button onclick="bulkReset('req')" class="px-3 py-1.5 bg-sky-50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/30 rounded-md text-xs font-bold transition border border-sky-200 dark:border-sky-900/50 flex items-center gap-1">
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> ریست ریکوئست
			</button>
			<button onclick="bulkReset('time')" class="px-3 py-1.5 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-md text-xs font-bold transition border border-purple-200 dark:border-purple-900/50 flex items-center gap-1">
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ریست زمان
			</button>
			<button onclick="bulkDelete()" class="px-3 py-1.5 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-md text-xs font-bold transition border border-red-200 dark:border-red-900/50 flex items-center gap-1">
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> حذف گروهی
			</button>
		</div>
	</div>
	<div id="update-success-modal" class="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60  opacity-0 pointer-events-none transition-all duration-300 ease-out">
		<div class="w-full max-w-md bg-white dark:bg-amoled-card border border-green-600/50 rounded-md shadow-2xl overflow-hidden p-6 text-center transition-all transform duration-300 opacity-0 scale-95 ease-out">
			<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 mb-4 shadow-inner">
				<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
			</div>
			<h3 class="font-black text-xl text-gray-900 dark:text-white mb-2">آپدیت موفقیت‌آمیز</h3>
			<p class="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-medium">
				آپدیت با موفقیت انجام شد. صفحه تا ۱۰ ثانیه دیگر به‌طور خودکار رفرش می‌شود تا تغییرات اعمال گردند.
			</p>
			<button onclick="sessionStorage.setItem('mili_last_update', Date.now()); window.location.href = window.location.pathname + '?t=' + Date.now()" class="w-full py-3.5 bg-transparent border-2 border-green-600 text-green-700 hover:bg-green-900/20 hover:text-green-800 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/40 dark:hover:text-green-400 font-black rounded-md text-sm transition duration-300 shadow-lg">
				رفرش فوری صفحه
			</button>
		</div>
	</div>
${COMMON_TOAST_HTML}
<div id="custom-confirm-modal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60  opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div id="custom-confirm-card" class="w-full max-w-sm bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-md shadow-2xl overflow-hidden p-6 text-center transform transition-all scale-95 duration-300">
		<h3 class="font-black text-xl text-gray-900 dark:text-white mb-3">تأیید عملیات</h3>
		<p id="custom-confirm-message" class="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-medium"></p>
		<div class="flex gap-3">
			<button id="custom-confirm-cancel" class="flex-1 py-3 bg-transparent border-2 border-red-700 text-red-700 hover:bg-red-900/20 hover:text-red-800 dark:border-red-700 dark:text-red-500 dark:hover:bg-red-900/40 dark:hover:text-red-400 font-bold rounded-md text-sm transition duration-200 shadow-sm">انصراف</button>
			<button id="custom-confirm-ok" class="flex-1 py-3 bg-transparent border-2 border-green-600 text-green-700 hover:bg-green-900/20 hover:text-green-800 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-900/40 dark:hover:text-green-400 font-bold rounded-md text-sm transition duration-200 shadow-lg">تأیید</button>
		</div>
	</div>
</div>
<div id="loop-warning-modal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div id="loop-warning-card" class="w-full max-w-sm bg-white dark:bg-amoled-card border-2 border-red-600/80 dark:border-red-500/80 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.3)] overflow-hidden p-6 text-center transform transition-all scale-95 duration-300 flex flex-col items-center">
		<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-500 mb-4 shadow-inner animate-violent-shake">
			<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
		</div>
		<h3 class="font-black text-xl text-red-600 dark:text-red-500 mb-3">اخطار اتصال مستقیم!</h3>
		<p class="text-[13px] text-gray-700 dark:text-gray-300 mb-6 leading-relaxed font-bold">
			شما با کانفیگ مستقیم (🌐) وارد پنل شده‌اید! در این حالت قابلیت‌های پنل کار نمی‌کنند.<br><br>
			لطفاً فیلترشکن خود را <span class="text-red-600 dark:text-red-400">خاموش کنید</span> یا از کانفیگ‌های دارای پرچم (غیر از 🌐) استفاده نمایید.
		</p>
		<button onclick="window.location.reload();" class="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-lg text-sm transition duration-300 shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
			</svg>
			رفرش صفحه
		</button>
	</div>
</div>
<div id="rocket-modal" class="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-md bg-white dark:bg-amoled-card border border-orange-500/50 rounded-2xl shadow-2xl p-6 transform transition-all scale-95 opacity-0 duration-200">
		<div class="flex justify-between items-center mb-4">
			<div class="flex items-center gap-2">
				<div class="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shadow-sm">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
						<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
						<path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
						<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
						<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
					</svg>
				</div>
				<h3 class="text-sm font-black text-gray-900 dark:text-white">کانفیگ تک لوکیشن</h3>
			</div>
			<button onclick="toggleRocketModal(false)" class="p-1.5 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200 shadow-sm" title="بستن">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
			</button>
		</div>
		<p class="text-[11px] text-gray-600 dark:text-gray-400 mb-5 font-medium leading-relaxed">کشور مورد نظر را انتخاب کنید تا کانفیگ تک لوکیشن پرسرعت ساخته شود.</p>
		<div class="space-y-4">
			<div>
				<input type="hidden" id="rocket-selected-country" value="">
				<div id="rocket-country-grid" class="grid grid-cols-5 sm:grid-cols-8 gap-1.5 p-1">
					<div class="col-span-full text-center text-xs font-bold text-gray-500 py-4">در حال بارگذاری کشورها...</div>
				</div>
			</div>
			<button id="rocket-submit-btn" onclick="executeRocketCreate()" class="w-full py-2.5 bg-transparent border-2 border-orange-600 text-orange-700 hover:bg-orange-900/20 hover:text-orange-800 dark:border-orange-500 dark:text-orange-500 dark:hover:bg-orange-900/40 dark:hover:text-orange-400 font-black rounded-xl text-xs sm:text-sm transition shadow-lg">شروع اسکن و ساخت</button>
		</div>
	</div>
</div>
<div id="placement-modal" data-modal="placementModal" class="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 opacity-0 pointer-events-none transition-all duration-300 ease-out">
	<div class="w-full max-w-2xl bg-white dark:bg-amoled-card border border-cyan-500/50 rounded-2xl shadow-2xl p-6 transform transition-all scale-95 opacity-0 duration-200">
		<div class="flex justify-between items-center mb-4">
			<div class="flex items-center gap-2">
				<div class="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shadow-sm">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
				</div>
				<h3 class="text-sm font-black text-gray-900 dark:text-white">تغییر ریجن پنل</h3>
			</div>
			<button onclick="togglePlacementModal(false)" class="p-1.5 rounded-md bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200 shadow-sm" title="بستن">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
			</button>
		</div>
		<p class="text-[11px] text-gray-600 dark:text-gray-400 mb-5 font-medium leading-relaxed">میتوانید لوکیشن کانفیگ های مستقیم 🌐 را تغییر دهید</p>
		<div class="flex flex-col sm:flex-row gap-3 mb-5">
			<label class="flex-1 flex items-center justify-between p-3 bg-gray-50 dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-xl cursor-pointer hover:border-purple-500 transition select-none placement-mode-label ring-2 ring-purple-500 border-purple-500 bg-purple-50 dark:bg-purple-900/20">
				<div class="flex items-center gap-2">
					<div class="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
					<div class="text-right">
						<div class="text-xs font-bold text-gray-800 dark:text-zinc-200">انتخاب خودکار (Smart)</div>
						<div class="text-[10px] text-gray-500">انتخاب خودکار توسط کلودفلر</div>
					</div>
				</div>
				<input type="radio" name="placement-mode" value="smart" checked class="peer sr-only" onchange="togglePlacementManualMode()">
			</label>
			<label class="flex-1 flex items-center justify-between p-3 bg-gray-50 dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-xl cursor-pointer hover:border-cyan-500 transition select-none placement-mode-label">
				<div class="flex items-center gap-2">
					<div class="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg></div>
					<div class="text-right">
						<div class="text-xs font-bold text-gray-800 dark:text-zinc-200">انتخاب دستی (Specific)</div>
						<div class="text-[10px] text-gray-500">انتخاب ریجن و کشور</div>
					</div>
				</div>
				<input type="radio" name="placement-mode" value="manual" class="peer sr-only" onchange="togglePlacementManualMode()">
			</label>
		</div>
		<div id="placement-manual-section" class="hidden transition-all duration-300 opacity-0 transform -translate-y-2">
			<div class="grid grid-cols-3 gap-2 mb-3">
				<label class="flex items-center justify-center gap-1.5 p-2 bg-gray-50 dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg cursor-pointer hover:border-cyan-500 transition select-none placement-provider-label ring-2 ring-cyan-500 border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20">
					<input type="radio" name="placement-provider" value="GCP" checked class="peer sr-only" onchange="renderPlacementRegions()">
					<div class="flex items-center">
						<svg class="w-4 h-4 ml-1.5" viewBox="0 0 24 24">
							<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
							<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
							<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
							<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
						</svg>
						<span class="text-[11px] sm:text-xs font-bold text-gray-700 dark:text-zinc-300 peer-checked:text-cyan-600 dark:peer-checked:text-cyan-400 mt-1">GCP</span>
					</div>
				</label>
				<label class="flex items-center justify-center gap-1.5 p-2 bg-gray-50 dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg cursor-pointer hover:border-cyan-500 transition select-none placement-provider-label">
					<input type="radio" name="placement-provider" value="AWS" class="peer sr-only" onchange="renderPlacementRegions()">
					<div class="flex items-center">
						<svg class="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="#FF9900">
							<path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z"/>
						</svg>
						<span class="text-[11px] sm:text-xs font-bold text-gray-700 dark:text-zinc-300 peer-checked:text-cyan-600 dark:peer-checked:text-cyan-400 mt-1">AWS</span>
					</div>
				</label>
				<label class="flex items-center justify-center gap-1.5 p-2 bg-gray-50 dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg cursor-pointer hover:border-cyan-500 transition select-none placement-provider-label">
					<input type="radio" name="placement-provider" value="Azure" class="peer sr-only" onchange="renderPlacementRegions()">
					<div class="flex items-center">
						<svg class="w-4 h-4 ml-1.5" viewBox="0 0 24 24">
							<path fill="#F25022" d="M1 1h10v10H1z"/>
							<path fill="#7FBA00" d="M13 1h10v10H13z"/>
							<path fill="#00A4EF" d="M1 13h10v10H1z"/>
							<path fill="#FFB900" d="M13 13h10v10H13z"/>
						</svg>
						<span class="text-[11px] sm:text-xs font-bold text-gray-700 dark:text-zinc-300 peer-checked:text-cyan-600 dark:peer-checked:text-cyan-400 mt-1">Azure</span>
					</div>
				</label>
			</div>
			<div class="bg-gray-50 dark:bg-amoled-input/30 border border-gray-200 dark:border-amoled-border rounded-xl p-2.5 mb-4">
				<div class="grid grid-cols-4 gap-2 mb-2 pb-2 border-b border-gray-200 dark:border-amoled-border px-2 text-[10px] font-bold text-gray-500 dark:text-gray-400 text-center items-center justify-center">
					<div>آیدی ریجن</div>
					<div>موقعیت</div>
					<div>کشور</div>
					<div>شهر</div>
				</div>
				<div id="placement-regions-list" class="flex flex-col gap-1.5 max-h-56 overflow-y-auto custom-scrollbar px-1">
				</div>
			</div>
		</div>
		<input type="hidden" id="selected-placement-region" value="smart">
		<button id="placement-submit-btn" onclick="submitPlacement(document.getElementById('selected-placement-region').value)" class="w-full py-3.5 bg-cyan-600 hover:bg-cyan-700 text-white font-black rounded-xl text-xs sm:text-sm transition shadow-lg flex items-center justify-center gap-2 mt-2">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
			اعمال تغییرات و دیپلوی
		</button>
	</div>
</div>
	<script>

		window.INITIAL_DATA = ${safeInitialJson};
		window.ADMIN_PATH = String((window.INITIAL_DATA && window.INITIAL_DATA.adminPath) || 'admin').replace(/^\\/+|\\/+$/g, '');
		window.__rawFetch = window.fetch.bind(window);

		window.__miliToTemplateUser = function(u) {
			if (!u || typeof u !== 'object') return u;
			const cfg = u.config || {};
			const usedGb = Number(((u.usedBytes || 0) / (1024 ** 3)).toFixed(3));
			const lifeGb = Number(((u.lifetimeBytes || u.usedBytes || 0) / (1024 ** 3)).toFixed(3));
			const portsArr = [cfg.ports || '443', cfg.httpPorts || ''].join(',').split(',').map(s => s.trim()).filter(Boolean);
			const uniquePorts = [...new Set(portsArr)].join(',') || '443';
			const ipsLines = String(cfg.yx || '').split(',').map(item => {
				const raw = String(item || '').trim().split('#')[0];
				return raw.replace(/:443$/, '').trim();
			}).filter(Boolean).join('\\n');
			const iata = String(cfg.wk || cfg.sbRegion || 'DE').toUpperCase();
			let userSocks5 = null;
			if (cfg.s && String(cfg.s).trim()) {
				userSocks5 = JSON.stringify([{ proxy: String(cfg.s).trim(), country: iata }]);
			} else if (cfg.p && String(cfg.p).trim()) {
				userSocks5 = JSON.stringify([{ proxy: String(cfg.p).trim(), country: iata }]);
			}
			const protos = [];
			if (cfg.ev !== 'no') protos.push('vless');
			if (cfg.et === 'yes') protos.push('trojan');
			if (cfg.es === 'yes') protos.push('shadowsocks');
			if (cfg.ex === 'yes') protos.push('xhttp');
			return {
				id: u.id,
				username: u.username || u.id,
				uuid: u.uuid || '',
				is_active: u.enabled === false ? 0 : 1,
				is_online: u.enabled === false ? 0 : 1,
				online_count: u.enabled === false ? 0 : 1,
				used_gb: usedGb,
				lifetime_used_gb: lifeGb,
				limit_gb: u.dataLimitGb > 0 ? Number(u.dataLimitGb) : null,
				used_req: Number(u.requestCount || 0),
				limit_req: null,
				expiry_days: u.expireDays > 0 ? Number(u.expireDays) : null,
				start_on_first_connect: u.startOnFirstUse !== false ? 1 : 0,
				first_connection_time: Number(u.firstConnectedAt || 0),
				created_at: Number(u.createdAt || Date.now()),
				ip_limit: Number(u.ipLimit || 50),
				port: uniquePorts,
				tls: 'on',
				ips: ipsLines,
				fingerprint: cfg.fp || 'chrome',
				frag_len: cfg.frag === 'no' ? '' : (cfg.fragmentLength || '100-200'),
				frag_int: cfg.frag === 'no' ? '' : (cfg.fragmentInterval || '10-20'),
				ech: cfg.ech === 'yes' ? ((cfg.customECHDomain || 'cloudflare-ech.com') + '+udp://1.1.1.1') : '',
				user_proxy_iata: iata,
				user_socks5: userSocks5,
				user_proxy_ip: cfg.p || null,
				enable_direct: cfg.ena === 'no' ? 0 : 1,
				auto_rotate_ip: cfg.ipRotation && cfg.ipRotation !== 'off' ? 1 : 0,
				auto_rotate_user_proxy: 0,
				block_ads: 1,
				block_porn: 0,
				connection_type: protos.join(',') || 'vless',
				_raw: u
			};
		};

		window.__miliBuildUsersResponse = function(statsOrUsersData) {
			const rawUsers = Array.isArray(statsOrUsersData.users) ? statsOrUsersData.users : [];
			const diag = statsOrUsersData.diagnostics || (window.INITIAL_DATA && window.INITIAL_DATA.diagnostics) || {};
			const users = rawUsers.map(window.__miliToTemplateUser);
			const totalReqs = rawUsers.reduce((acc, u) => acc + Number(u.requestCount || 0), 0);
			return {
				success: true,
				users,
				serverTime: Date.now(),
				deletedGb: 0,
				d1Writes: diag.d1Enabled ? users.length : 0,
				d1Reads: Number(diag.healthyCfIps || 40),
				cfRequestsToday: totalReqs,
				cfRequestsTotal: totalReqs
			};
		};

		window.__miliFromTemplatePayload = function(body, existingRaw) {
			const prevCfg = (existingRaw && existingRaw.config) || (window.INITIAL_DATA && window.INITIAL_DATA.config) || {};
			const connType = String(body.connection_type || 'vless').toLowerCase();
			const ev = connType.includes('vless') ? 'yes' : 'no';
			const et = connType.includes('trojan') ? 'yes' : 'no';
			const es = connType.includes('shadowsocks') ? 'yes' : 'no';
			const allPorts = String(body.port || '443').split(',').map(p => p.trim()).filter(Boolean);
			const nonTlsSet = new Set(['80', '8080', '8880', '2052', '2082', '2086', '2095']);
			const tlsPicked = allPorts.filter(p => !nonTlsSet.has(p));
			const httpPicked = allPorts.filter(p => nonTlsSet.has(p));
			const yxItems = String(body.ips || '').split(/\\r?\\n|,/).map(s => s.trim()).filter(Boolean).map(addr => {
				if (addr.includes('#')) return addr;
				if (addr.includes(':') && !addr.includes('[')) {
					const parts = addr.split(':');
					if (parts.length === 2 && /^\\d+$/.test(parts[1])) return addr + '#' + parts[0];
				}
				return addr + ':443#' + addr;
			});

			let sVal = '';
			let pVal = '';
			let wkVal = String(body.user_proxy_iata || prevCfg.wk || 'DE').toUpperCase();
			if (body.user_socks5) {
				try {
					const parsed = typeof body.user_socks5 === 'string' && body.user_socks5.trim().startsWith('[')
						? JSON.parse(body.user_socks5)
						: [{ proxy: String(body.user_socks5), country: wkVal }];
					if (Array.isArray(parsed) && parsed.length > 0) {
						const first = parsed[0];
						const rawProxy = String((typeof first === 'object' ? first.proxy : first) || '').trim();
						if (typeof first === 'object' && first.country && first.country !== 'UN') {
							wkVal = String(first.country).toUpperCase();
						}
						if (/^(socks5|socks4|socks|http|https):\\/\\//i.test(rawProxy) || rawProxy.includes('@')) {
							sVal = rawProxy.replace(/^socks:\\/\\//i, 'socks5://');
						} else if (rawProxy) {
							pVal = rawProxy.includes(':') ? rawProxy : (rawProxy + ':443');
						}
					}
				} catch (e) {}
			}

			const hasFrag = Boolean(body.frag_len || body.frag_int);
			const hasEch = Boolean(body.ech && String(body.ech).trim());
			let customECHDomain = prevCfg.customECHDomain || 'cloudflare-ech.com';
			if (hasEch) {
				const firstEch = String(body.ech).split(',')[0].trim();
				if (firstEch.includes('+')) customECHDomain = firstEch.split('+')[0].trim();
			}

			return {
				...(existingRaw && existingRaw.id ? { id: existingRaw.id } : {}),
				username: String(body.username || '').trim(),
				preset: 'iran-fast',
				dataLimitGb: body.limit_gb ? Number(body.limit_gb) : 0,
				expireDays: body.expiry_days ? parseInt(body.expiry_days, 10) : 0,
				startOnFirstUse: Boolean(body.start_on_first_connect),
				ipLimit: body.ip_limit ? parseInt(body.ip_limit, 10) : 50,
				enabled: body.is_active !== undefined ? Boolean(body.is_active) : (existingRaw ? existingRaw.enabled : true),
				config: {
					...prevCfg,
					ev,
					et,
					es,
					ports: tlsPicked.join(',') || '443',
					httpPorts: httpPicked.join(','),
					yx: yxItems.join(','),
					fp: body.fingerprint || 'chrome',
					frag: hasFrag ? 'yes' : 'no',
					fragmentLength: body.frag_len || '100-200',
					fragmentInterval: body.frag_int || '10-20',
					ech: hasEch ? 'yes' : 'no',
					customECHDomain,
					ena: body.enable_direct === false || body.enable_direct === 0 ? 'no' : 'yes',
					epi: 'yes',
					epd: 'yes',
					wk: wkVal,
					sbRegion: wkVal,
					s: sVal,
					p: pVal,
					ipRotation: body.auto_rotate_ip ? '15m' : 'off'
				}
			};
		};

		window.fetch = async function(input, init = {}) {
			const urlStr = typeof input === 'string' ? input : (input && input.url ? input.url : String(input));
			const method = String((init && init.method) || 'GET').toUpperCase();
			let parsedUrl;
			try {
				parsedUrl = new URL(urlStr, window.location.origin);
			} catch (e) {
				return window.__rawFetch(input, init);
			}
			const path = parsedUrl.pathname;

			// 1. GET /api/users -> map to /ADMIN_PATH/api/stats
			if (path === '/api/users' && method === 'GET') {
				const res = await window.__rawFetch('/' + window.ADMIN_PATH + '/api/stats?t=' + Date.now());
				const data = await res.json();
				const mapped = window.__miliBuildUsersResponse(data);
				return new Response(JSON.stringify(mapped), { status: 200, headers: { 'Content-Type': 'application/json' } });
			}

			// 2. POST /api/users -> create user in Miliconfig D1
			if (path === '/api/users' && method === 'POST') {
				let body = {};
				try { body = JSON.parse(init.body || '{}'); } catch (e) {}
				const payload = window.__miliFromTemplatePayload(body, null);
				const res = await window.__rawFetch('/' + window.ADMIN_PATH + '/api/users', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload)
				});
				const data = await res.json();
				return new Response(JSON.stringify({
					success: Boolean(data.success),
					error: data.message || data.error || '',
					user: data.user ? window.__miliToTemplateUser(data.user) : null
				}), { status: res.status, headers: { 'Content-Type': 'application/json' } });
			}

			// 3. PUT or DELETE /api/users/:username
			if (path.startsWith('/api/users/')) {
				const targetName = decodeURIComponent(path.slice('/api/users/'.length));
				const found = (window.allUsers || []).find(u => u.username === targetName || u.id === targetName);
				const targetId = found ? found.id : targetName;

				if (method === 'DELETE') {
					const res = await window.__rawFetch('/' + window.ADMIN_PATH + '/api/users?id=' + encodeURIComponent(targetId), {
						method: 'DELETE'
					});
					const data = await res.json();
					return new Response(JSON.stringify({
						success: Boolean(data.success),
						error: data.message || data.error || ''
					}), { status: res.status, headers: { 'Content-Type': 'application/json' } });
				}

				if (method === 'PUT') {
					let body = {};
					try { body = JSON.parse(init.body || '{}'); } catch (e) {}
					let putPayload;
					if (body.toggle_only) {
						const nextEnabled = found ? (found.is_active === 0) : true;
						putPayload = { id: targetId, enabled: nextEnabled };
					} else if (body.reset_action) {
						putPayload = { id: targetId, action: 'reset' };
					} else {
						putPayload = window.__miliFromTemplatePayload(body, found ? found._raw : { id: targetId });
						putPayload.id = targetId;
					}
					const res = await window.__rawFetch('/' + window.ADMIN_PATH + '/api/users', {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(putPayload)
					});
					const data = await res.json();
					return new Response(JSON.stringify({
						success: Boolean(data.success),
						error: data.message || data.error || ''
					}), { status: res.status, headers: { 'Content-Type': 'application/json' } });
				}
			}

			// 4. Placement APIs (/api/placement-status & /api/update-placement)
			if (path === '/api/placement-status') {
				let reqOpts = { method: 'GET' };
				if (method === 'POST' && init.body) {
					let b = {};
					try { b = JSON.parse(init.body); } catch (e) {}
					reqOpts = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ action: 'status', cf_token: b.cf_token })
					};
				}
				const res = await window.__rawFetch('/' + window.ADMIN_PATH + '/api/placement', reqOpts);
				const data = await res.json();
				return new Response(JSON.stringify({
					success: true,
					placement: data.placement || (window.INITIAL_DATA?.config?.workerPlacement) || 'smart'
				}), { status: 200, headers: { 'Content-Type': 'application/json' } });
			}

			if (path === '/api/update-placement') {
				let b = {};
				try { b = JSON.parse(init.body || '{}'); } catch (e) {}
				const res = await window.__rawFetch('/' + window.ADMIN_PATH + '/api/placement', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						region: b.region || 'smart',
						iso: b.iso || '',
						cf_token: b.cf_token || '',
						local_only: !b.cf_token
					})
				});
				const data = await res.json();
				return new Response(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } });
			}

			// 5. Proxy / Direct ping test (/api/test-proxy)
			if (path === '/api/test-proxy') {
				let b = {};
				try { b = JSON.parse(init.body || '{}'); } catch (e) {}
				const rawProxy = String(b.proxy || '').trim();
				let host = '1.1.1.1';
				let port = 443;
				if (rawProxy && rawProxy !== 'direct') {
					const stripped = rawProxy.replace(/^[a-z0-9]+:\\/\\//i, '').split('@').pop();
					const parts = stripped.split(':');
					host = parts[0] || '1.1.1.1';
					port = parseInt(parts[1] || '443', 10) || 443;
				}
				const res = await window.__rawFetch('/api/scanner/probe?host=' + encodeURIComponent(host) + '&port=' + encodeURIComponent(port));
				const data = await res.json();
				let cc = 'DE';
				const m = host.match(/\\.([A-Z]{2})\\./i);
				if (m) cc = m[1].toUpperCase();
				return new Response(JSON.stringify({
					success: Boolean(data.success),
					ping: data.latencyMs || 45,
					country: cc,
					error: data.error || ''
				}), { status: 200, headers: { 'Content-Type': 'application/json' } });
			}

			// 6. Auth & Settings APIs
			if (path === '/api/change-password') {
				let b = {};
				try { b = JSON.parse(init.body || '{}'); } catch (e) {}
				const res = await window.__rawFetch('/api/admin/change-password', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ oldPassword: b.current_password, newPassword: b.new_password })
				});
				const data = await res.json();
				return new Response(JSON.stringify({
					success: Boolean(data.success),
					error: data.message || data.error || ''
				}), { status: res.status, headers: { 'Content-Type': 'application/json' } });
			}

			if (path === '/api/logout') {
				return window.__rawFetch('/api/admin/logout', { method: 'POST' });
			}

			if (path === '/api/auto-update-setup') {
				return window.__rawFetch('/' + window.ADMIN_PATH + '/api/auto-update-setup', init);
			}

			if (path === '/api/update-panel') {
				return window.__rawFetch('/' + window.ADMIN_PATH + '/api/update', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ action: 'apply' })
				});
			}

			if (path === '/api/restart-core') {
				await window.__rawFetch('/' + window.ADMIN_PATH + '/api/d1-init', { method: 'POST' });
				return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
			}

			if (path === '/api/settings/bulk') {
				return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
			}

			if (path === '/icon.svg') {
				return window.__rawFetch('/pwa-icon.svg', init);
			}

			return window.__rawFetch(input, init);
		};

		async function fetchWithFallbackUI(path, options = {}) {
			const ghPath = path.includes('?') ? path.substring(0, path.indexOf('?')) : path;
			const urls = [
				'https://aeq6hj1i43heizbdbt2xyqu3aufyl.1bwxwrj26kxbybdc0iplho2iqdt25shgo.workers.dev/' + path,
				'https://raw.githubusercontent.com/miliconfig/Miliconfigpro/refs/heads/main/' + ghPath
			];
			for (let attempt = 0; attempt < 2; attempt++) {
				try {
					const controller = new AbortController();
					const timeoutId = setTimeout(() => controller.abort(), 8000);
					const fetchOptions = Object.assign({}, options, { signal: controller.signal });
					const res = await Promise.any(urls.map(url => 
						fetch(url, fetchOptions).then(response => {
							if (!response.ok) throw new Error('Failed');
							return response;
						})
					));
					clearTimeout(timeoutId);
					return res;
				} catch (e) {}
				if (attempt === 0) await new Promise(r => setTimeout(r, 1000));
			}
			return new Response(null, { status: 500 });
		}
		function updateSubmitBtnState(text, disable = null) {
			const btnMob = document.getElementById('submit-btn');
			const btnDesk = document.getElementById('submit-btn-desktop');
			if (btnMob && btnMob.querySelector('span')) {
				btnMob.querySelector('span').innerText = text;
				if (disable !== null) btnMob.disabled = disable;
			}
			if (btnDesk && btnDesk.querySelector('span')) {
				btnDesk.querySelector('span').innerText = text;
				if (disable !== null) btnDesk.disabled = disable;
			}
		}
		function showToast(message, type = 'success') {
			const container = document.getElementById('toast-container');
			const toast = document.createElement('div');
			const colors = type === 'error' 
				? 'bg-red-50 dark:bg-red-900/40 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400' 
				: 'bg-green-50 dark:bg-green-900/40 border-green-200 dark:border-green-800 text-green-700 dark:text-green-500';
			toast.className = 'px-4 py-3 border rounded-md shadow-lg font-bold text-sm transform transition-all duration-300 -translate-y-full opacity-0 ' + colors;
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
		function customConfirm(message) {
			return new Promise((resolve) => {
				const modal = document.getElementById('custom-confirm-modal');
				const card = document.getElementById('custom-confirm-card');
				const msgEl = document.getElementById('custom-confirm-message');
				const btnOk = document.getElementById('custom-confirm-ok');
				const btnCancel = document.getElementById('custom-confirm-cancel');
				msgEl.innerText = message;
				modal.classList.remove('opacity-0', 'pointer-events-none');
				modal.classList.add('opacity-100', 'pointer-events-auto');
				card.classList.remove('scale-95');
				card.classList.add('scale-100');
				const cleanup = () => {
					modal.classList.remove('opacity-100', 'pointer-events-auto');
					modal.classList.add('opacity-0', 'pointer-events-none');
					card.classList.remove('scale-100');
					card.classList.add('scale-95');
					btnOk.removeEventListener('click', onOk);
					btnCancel.removeEventListener('click', onCancel);
				};
				const onOk = () => { cleanup(); resolve(true); };
				const onCancel = () => { cleanup(); resolve(false); };
				btnOk.addEventListener('click', onOk);
				btnCancel.addEventListener('click', onCancel);
			});
		}
		window.alert = function(message) {
			const msgStr = message ? message.toString() : '';
			if (msgStr.includes('خطا') || msgStr.includes('⚠️') || msgStr.includes('❌')) {
				showToast(msgStr, 'error');
			} else {
				showToast(msgStr, 'success');
			}
		};
		window.selectedUsernames = new Set();
		function toggleSelectAllUsers(el) {
			const checkboxes = document.querySelectorAll('input[name="select-user"]');
			checkboxes.forEach(cb => {
				cb.checked = el.checked;
				const username = decodeURIComponent(cb.value);
				if (el.checked) {
					window.selectedUsernames.add(username);
				} else {
					window.selectedUsernames.delete(username);
				}
			});
			updateBulkActionsBar();
		}
		function onUserSelectChange(el) {
			const username = decodeURIComponent(el.value);
			if (el.checked) {
				window.selectedUsernames.add(username);
			} else {
				window.selectedUsernames.delete(username);
			}
			updateBulkActionsBar();
		}
		function updateBulkActionsBar() {
			const bar = document.getElementById('bulk-actions-bar');
			const countSpan = document.getElementById('bulk-selected-count');
			const selectAllCheckbox = document.getElementById('select-all-users');
			const selectedCount = window.selectedUsernames.size;
			if (countSpan) {
				countSpan.innerText = selectedCount + ' کاربر انتخاب شده';
			}
			const checkboxes = document.querySelectorAll('input[name="select-user"]');
			if (checkboxes.length > 0) {
				const allChecked = Array.from(checkboxes).every(cb => cb.checked);
				if (selectAllCheckbox) selectAllCheckbox.checked = allChecked;
			} else {
				if (selectAllCheckbox) selectAllCheckbox.checked = false;
			}
			if (selectedCount > 0) {
				bar.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-28');
				bar.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
			} else {
				bar.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
				bar.classList.add('opacity-0', 'pointer-events-none', 'translate-y-28');
			}
		}
		async function bulkDelete() {
			const usernames = Array.from(window.selectedUsernames);
			if (usernames.length === 0) return;
			if (await customConfirm('⚠️ آیا از حذف گروهی ' + usernames.length + ' کاربر انتخاب شده مطمئن هستید؟ این عمل غیرقابل بازگشت است.')) {
				const bar = document.getElementById('bulk-actions-bar');
				const buttons = bar.querySelectorAll('button');
				buttons.forEach(btn => btn.disabled = true);
				try {
					let successCount = 0;
					await Promise.all(usernames.map(async (uname) => {
						try {
							const res = await fetch('/api/users/' + encodeURIComponent(uname), { method: 'DELETE' });
							if (res.ok) {
								successCount++;
								window.selectedUsernames.delete(uname);
							}
						} catch(e) {}
					}));
					alert('✅ عملیات حذف گروهی انجام شد. ' + successCount + ' کاربر با موفقیت حذف شدند.');
				} finally {
					buttons.forEach(btn => btn.disabled = false);
					updateBulkActionsBar();
					await loadUsers(true);
				}
			}
		}
		async function bulkToggleStatus(targetActive) {
			const usernames = Array.from(window.selectedUsernames);
			if (usernames.length === 0) return;
			const actionText = targetActive === 1 ? 'فعال‌سازی' : 'غیرفعال‌سازی';
			if (await customConfirm('آیا از ' + actionText + ' گروهی ' + usernames.length + ' کاربر انتخاب شده مطمئن هستید؟')) {
				const bar = document.getElementById('bulk-actions-bar');
				const buttons = bar.querySelectorAll('button');
				buttons.forEach(btn => btn.disabled = true);
				try {
					let successCount = 0;
					await Promise.all(usernames.map(async (uname) => {
						const user = window.allUsers.find(u => u.username === uname);
						if (!user) return;
						const isCurrentActive = user.is_active !== 0;
						const shouldToggle = (targetActive === 1 && !isCurrentActive) || (targetActive === 0 && isCurrentActive);
						if (shouldToggle) {
							try {
								const res = await fetch('/api/users/' + encodeURIComponent(uname), {
									method: 'PUT',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({ toggle_only: true })
								});
								if (res.ok) successCount++;
							} catch(e) {}
						} else {
							successCount++;
						}
					}));
					alert('✅ عملیات ' + actionText + ' با موفقیت برای تمامی کاربران واجد شرایط اعمال شد.');
				} finally {
					buttons.forEach(btn => btn.disabled = false);
					updateBulkActionsBar();
					await loadUsers(true);
				}
			}
		}
		async function bulkReset(actionType) {
			const usernames = Array.from(window.selectedUsernames);
			if (usernames.length === 0) return;
			let actionName = '';
			if (actionType === 'volume') actionName = 'حجم مصرفی';
			else if (actionType === 'req') actionName = 'تعداد ریکوئست‌ها';
			else if (actionType === 'time') actionName = 'زمان اشتراک';
			if (await customConfirm('آیا از ریست کردن گروهی ' + actionName + ' برای ' + usernames.length + ' کاربر انتخاب شده مطمئن هستید؟')) {
				const bar = document.getElementById('bulk-actions-bar');
				const buttons = bar.querySelectorAll('button');
				buttons.forEach(btn => btn.disabled = true);
				try {
					let successCount = 0;
					await Promise.all(usernames.map(async (uname) => {
						try {
							const res = await fetch('/api/users/' + encodeURIComponent(uname), {
								method: 'PUT',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify({ reset_action: actionType })
							});
							if (res.ok) {
								successCount++;
								if (window.smoothCache && window.smoothCache[uname]) {
									if (actionType === 'volume') window.smoothCache[uname].gb = 0;
									if (actionType === 'req') window.smoothCache[uname].req = 0;
								}
							}
						} catch(e) {}
					}));
					alert('✅ عملیات ریست گروهی ' + actionName + ' با موفقیت برای ' + successCount + ' کاربر اعمال شد.');
				} finally {
					buttons.forEach(btn => btn.disabled = false);
					updateBulkActionsBar();
					await loadUsers(true);
				}
			}
		}
		const tlsPorts = ['443', '2053', '2083', '2087', '2096', '8443'];
		const nonTlsPorts = ['80', '8080', '8880', '2052', '2082', '2086', '2095'];
		let isEditMode = false;
		let editingUsername = '';
		function renderPortCheckboxes() {
			const tlsContainer = document.getElementById('tls-ports-list');
			const nonTlsContainer = document.getElementById('nontls-ports-list');
			if (nonTlsContainer) {
				nonTlsContainer.className = "grid grid-cols-12 gap-1.5 flex-1 content-start";
			}
			tlsContainer.innerHTML = tlsPorts.map(function(port) {
				const isCheckedDefault = port === '443' ? 'checked' : '';
				return '<label class="relative cursor-pointer">' +
					'<input type="checkbox" name="ports" value="' + port + '" ' + isCheckedDefault + ' class="peer sr-only">' +
					'<div class="flex items-center justify-center gap-1 px-1.5 py-1 border border-gray-200 dark:border-amoled-border rounded-md text-[11px] font-semibold select-none transition-all duration-200 hover:bg-gray-50 dark:hover:bg-amoled-input/50 text-gray-700 dark:text-zinc-200 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-950/25 peer-checked:border-[#00ff66] dark:peer-checked:border-[#00ff66] peer-checked:text-blue-600 dark:peer-checked:text-blue-400 shadow-sm">' +
						'<span>' + port + '</span>' +
						'<svg class="w-3 h-3 hidden peer-checked:block text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>' +
					'</div>' +
				'</label>';
			}).join('');
			nonTlsContainer.innerHTML = nonTlsPorts.map(function(port, index) {
				const isCheckedDefault = port === '80' ? 'checked' : '';
				const colSpanClass = index < 3 ? 'col-span-4' : 'col-span-3';
				return '<label class="relative cursor-pointer ' + colSpanClass + '">' +
					'<input type="checkbox" name="ports" value="' + port + '" ' + isCheckedDefault + ' class="peer sr-only">' +
					'<div class="flex items-center justify-center gap-1 px-1.5 py-1 border border-gray-200 dark:border-amoled-border rounded-md text-[11px] font-semibold select-none transition-all duration-200 hover:bg-gray-50 dark:hover:bg-amoled-input/50 text-gray-700 dark:text-zinc-200 peer-checked:bg-amber-50 dark:peer-checked:bg-amber-950/25 peer-checked:border-amber-500 dark:peer-checked:border-amber-500 peer-checked:text-amber-600 dark:peer-checked:text-amber-400 shadow-sm">' +
						'<span>' + port + '</span>' +
						'<svg class="w-3 h-3 hidden peer-checked:block text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>' +
					'</div>' +
				'</label>';
			}).join('');
		}
		setTimeout(function() {
			const cb443 = document.querySelector('input[name="ports"][value="443"]');
			if (cb443) cb443.checked = true;
			const cb80 = document.querySelector('input[name="ports"][value="80"]');
			if (cb80) cb80.checked = false;
		}, 100);
		async function fetchEchRepo(type) {
			const isDom = type === 'dom';
			const countInput = document.getElementById(isDom ? 'input-ech-dom-count' : 'input-ech-dns-count');
			const textArea = document.getElementById(isDom ? 'input-ech-doms' : 'input-ech-dns');
			const btn = document.getElementById(isDom ? 'btn-fetch-ech-dom' : 'btn-fetch-ech-dns');
			const filename = isDom ? 'ech_dom.txt' : 'ech_dns.txt';
			const nameFa = isDom ? 'دامنه' : 'DNS';
			let count = parseInt(countInput.value, 10);
			if (isNaN(count) || count < 1) {
				alert('⚠️ لطفاً تعداد ' + nameFa + ' مورد نیاز را در فیلد مربوطه وارد کنید!');
				return;
			}
			if (count > 100) count = 100;
			countInput.value = count;
			const originalHtml = btn.innerHTML;
			btn.disabled = true;
			btn.innerHTML = '<svg class="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>...</span>';
			try {
				const res = await fetchWithFallbackUI(filename + '?t=' + Date.now());
				if (!res.ok) throw new Error('Network error');
				const text = await res.text();
				let lines = text.split('\\n').map(function(l) { return l.trim(); }).filter(function(l) { return l.length > 3 && !l.startsWith('#') && !l.includes('----------'); });
				if (lines.length === 0) {
					alert('⚠️ هیچ مقداری در مخزن ' + filename + ' یافت نشد!');
				} else {
					for (let i = lines.length - 1; i > 0; i--) {
						const j = Math.floor(Math.random() * (i + 1));
						var temp = lines[i];
						lines[i] = lines[j];
						lines[j] = temp;
					}
					const selected = lines.slice(0, count);
					textArea.value = selected.join('\\n');
					localStorage.setItem(isDom ? 'mili_ech_doms' : 'mili_ech_dns', textArea.value);
					if (typeof showToast === 'function') {
						showToast('✅ تعداد ' + selected.length + ' ' + nameFa + ' با موفقیت لود شد.');
					}
				}
			} catch (e) {
				alert('❌ خطا در دریافت مقادیر از ' + filename);
			} finally {
				btn.disabled = false;
				btn.innerHTML = originalHtml;
			}
		}
		function buildEchCombinations() {
			const domLines = document.getElementById('input-ech-doms').value.split('\\n').map(function(l) { return l.trim(); }).filter(function(l) { return l; });
			const dnsLines = document.getElementById('input-ech-dns').value.split('\\n').map(function(l) { return l.trim(); }).filter(function(l) { return l; });
			const useUdp = document.getElementById('chk-ech-udp').checked;
			const useTcp = document.getElementById('chk-ech-tcp').checked;
			const useDoh = document.getElementById('chk-ech-doh').checked;
			if (domLines.length === 0) {
				alert('⚠️ لطفاً حداقل یک دامنه وارد کنید!'); return;
			}
			if (dnsLines.length === 0) {
				alert('⚠️ لطفاً حداقل یک DNS وارد کنید!'); return;
			}
			if (!useUdp && !useTcp && !useDoh) {
				alert('⚠️ لطفاً حداقل یک پروتکل (UDP, TCP, DOH) انتخاب کنید!'); return;
			}
			const results = [];
			for (let i = 0; i < domLines.length; i++) {
				for (let j = 0; j < dnsLines.length; j++) {
					const dom = domLines[i];
					const dns = dnsLines[j];
					if (useUdp) results.push(dom + '+udp://' + dns);
					if (useTcp) results.push(dom + '+tcp://' + dns);
					if (useDoh) results.push(dom + '+https://' + dns + '/dns-query');
				}
			}
			document.getElementById('input-ech-value').value = results.join('\\n');
			if (typeof showToast === 'function') {
				showToast('✅ ترکیب‌ها با موفقیت ساخته شدند (' + results.length + ' مورد)');
			}
		}
		function toggleSettingsModal(show) { setModalState('settings-modal', show); }
		window.toggleAutoResetInputs = function(show) {
			const container = document.getElementById('auto-reset-inputs-container');
			const volInput = document.getElementById('input-auto-reset-vol');
			const reqInput = document.getElementById('input-auto-reset-req');
			if (container) {
				if (show) {
					container.classList.remove('opacity-50', 'pointer-events-none');
					if (volInput) volInput.disabled = false;
					if (reqInput) reqInput.disabled = false;
				} else {
					container.classList.add('opacity-50', 'pointer-events-none');
					if (volInput) volInput.disabled = true;
					if (reqInput) reqInput.disabled = true;
				}
			}
		};
		window.toggleAdvancedSettingsInputs = function(show) {
			const container = document.getElementById('advanced-settings-container');
			const icon = document.getElementById('advanced-settings-icon');
			if (container) {
				if (show) {
					container.classList.remove('opacity-50', 'pointer-events-none', 'hidden');
					if (icon) icon.classList.add('rotate-180');
					const fragToggle = document.getElementById('input-frag-toggle');
					if (fragToggle && fragToggle.checked) {
						fragToggle.checked = false;
						if (typeof window.toggleFragInputs === 'function') window.toggleFragInputs(false);
					}
					const echToggle = document.getElementById('input-ech-settings-toggle');
					if (echToggle && echToggle.checked) {
						echToggle.checked = false;
						if (typeof window.toggleEchSettingsInputs === 'function') window.toggleEchSettingsInputs(false);
					}
				} else {
					container.classList.add('opacity-50', 'pointer-events-none', 'hidden');
					if (icon) icon.classList.remove('rotate-180');
				}
			}
		};
		window.toggleEchSettingsInputs = function(show) {
			const container = document.getElementById('ech-settings-container');
			const icon = document.getElementById('ech-settings-icon');
			if (container) {
				if (show) {
					container.classList.remove('opacity-50', 'pointer-events-none', 'hidden');
					if (icon) icon.classList.add('rotate-180');
					const advToggle = document.getElementById('input-advanced-settings-toggle');
					if (advToggle && advToggle.checked) {
						advToggle.checked = false;
						if (typeof window.toggleAdvancedSettingsInputs === 'function') window.toggleAdvancedSettingsInputs(false);
					}
				} else {
					container.classList.add('opacity-50', 'pointer-events-none', 'hidden');
					if (icon) icon.classList.remove('rotate-180');
				}
			}
		};
		window.toggleAutoRotateIpInputs = function(show) {
			const container = document.getElementById('auto-rotate-ip-inputs-container');
			if (container) {
				if (show) container.classList.remove('hidden');
				else container.classList.add('hidden');
			}
		};
		window.applyFragPreset = function(op, btnEl) {
			const presets = {
				'mci': { len: '10-30', int: '2-5', name: 'همراه اول' },
				'irancell': { len: '100-200', int: '5-10', name: 'ایرانسل' },
				'rightel': { len: '50-100', int: '2-5', name: 'رایتل' },
				'tci': { len: '50-200', int: '1-3', name: 'مخابرات و اینترنت ثابت' },
				'gaming': { len: '200-3000', int: '1-2', name: 'پینگ پایین' }
			};
			const p = presets[op];
			if (!p) return;
			const lenInput = document.getElementById('input-frag-len');
			const intInput = document.getElementById('input-frag-int');
			const isActive = btnEl && btnEl.classList.contains('ring-2');
			document.querySelectorAll('.frag-preset-card').forEach(card => {
				card.classList.remove('ring-2', 'ring-blue-500', 'border-[#00ff66]', 'bg-blue-50/50', 'dark:bg-blue-950/40');
			});
			if (isActive) {
				if (lenInput) lenInput.value = '200-3000';
				if (intInput) intInput.value = '1-2';
				if (typeof showToast === 'function') {
					showToast('🔄 تنظیمات فرگمنت به حالت پیش‌فرض بازگشت.', 'success');
				}
				return;
			}
			const toggle = document.getElementById('input-frag-toggle');
			if (toggle && !toggle.checked) {
				toggle.checked = true;
				if (typeof window.toggleFragInputs === 'function') window.toggleFragInputs(true);
			}
			if (lenInput) lenInput.value = p.len;
			if (intInput) intInput.value = p.int;
			if (btnEl) {
				btnEl.classList.add('ring-2', 'ring-blue-500', 'border-[#00ff66]', 'bg-blue-50/50', 'dark:bg-blue-950/40');
			}
			if (typeof showToast === 'function') {
				showToast('⚡ تنظیمات فرگمنت ' + p.name + ' با موفقیت اعمال شد.', 'success');
			}
		};
		window.setQuickVol = function(val) {
			const input = document.getElementById('input-limit');
			if (input) input.value = val;
		};
		window.setQuickExp = function(val) {
			const input = document.getElementById('input-expiry');
			if (input) input.value = val;
		};
		window.toggleFragInputs = function(show) {
			const container = document.getElementById('frag-inputs-container');
			const icon = document.getElementById('frag-settings-icon');
			if (container) {
				if (show) {
					container.classList.remove('hidden', 'opacity-50', 'pointer-events-none');
					if (icon) icon.classList.add('rotate-180');
					const advToggle = document.getElementById('input-advanced-settings-toggle');
					if (advToggle && advToggle.checked) {
						advToggle.checked = false;
						if (typeof window.toggleAdvancedSettingsInputs === 'function') window.toggleAdvancedSettingsInputs(false);
					}
				} else {
					container.classList.add('hidden', 'opacity-50', 'pointer-events-none');
					if (icon) icon.classList.remove('rotate-180');
				}
			}
		};
		window.switchUserTab = function(tabId) {
			const tabs = [
				{ id: 'tab-user-info', btn: 'tab-btn-user-info' },
				{ id: 'tab-ports-network', btn: 'tab-btn-ports-network' },
				{ id: 'tab-proxy-settings', btn: 'tab-btn-proxy-settings' }
			];
			tabs.forEach(t => {
				const panel = document.getElementById(t.id);
				const btn = document.getElementById(t.btn);
				if (panel) {
					if (t.id === tabId) {
						panel.classList.remove('hidden');
					} else {
						panel.classList.add('hidden');
					}
				}
				if (btn) {
					if (t.id === tabId) {
						btn.className = 'user-modal-tab-btn active flex-1 md:flex-initial flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-3 p-1.5 sm:p-3 rounded-xl transition text-center sm:text-right cursor-pointer select-none bg-blue-600/10 dark:bg-blue-500/15 border border-[#00ff66]/30 text-emerald-600 dark:text-[#00ff66] font-bold shadow-sm';
						const iconBox = btn.querySelector('div.flex-shrink-0');
						if (iconBox) iconBox.className = 'flex-shrink-0 w-4 h-4 sm:w-8 sm:h-8 rounded sm:rounded-lg flex items-center justify-center bg-blue-500/15 dark:bg-blue-400/20 text-blue-600 dark:text-blue-300';
					} else {
						btn.className = 'user-modal-tab-btn flex-1 md:flex-initial flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-3 p-1.5 sm:p-3 rounded-xl transition text-center sm:text-right cursor-pointer select-none bg-transparent hover:bg-gray-100 dark:hover:bg-zinc-800/60 border border-transparent text-gray-600 dark:text-zinc-400 font-medium';
						const iconBox = btn.querySelector('div.flex-shrink-0');
						if (iconBox) iconBox.className = 'flex-shrink-0 w-4 h-4 sm:w-8 sm:h-8 rounded sm:rounded-lg flex items-center justify-center bg-gray-200/60 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400';
					}
				}
			});
			if (tabId === 'tab-proxy-settings') {
				const testBtn = document.getElementById('test-direct-btn');
				if (testBtn && !testBtn.disabled) {
					if (typeof window.testDirectPing === 'function') window.testDirectPing();
				}
			}
		};
		function toggleModal(show) {
			setModalState('user-modal', show);
			if (typeof window.switchUserTab === 'function') window.switchUserTab('tab-user-info');
			if (!show) {
				isEditMode = false;
				editingUsername = '';
				window.editingUserIata = null; 
				document.getElementById('modal-title').innerText = 'ایجاد کاربر جدید';
				updateSubmitBtnState('ایجاد کاربر');
				document.getElementById('input-name').disabled = false;
				document.getElementById('create-user-form').reset();
				const vlessCb1 = document.getElementById('input-proto-vless');
				const trojanCb1 = document.getElementById('input-proto-trojan');
				const ssCb1 = document.getElementById('input-proto-ss');
				if (vlessCb1) vlessCb1.checked = true;
				if (trojanCb1) trojanCb1.checked = false;
				if (ssCb1) ssCb1.checked = false;
				const cb443 = document.querySelector('input[name="ports"][value="443"]');
				if (cb443) cb443.checked = true;
				const cb80 = document.querySelector('input[name="ports"][value="80"]');
				if (cb80) cb80.checked = false;
				const fpSelect = document.getElementById('fingerprint-select');
				if (fpSelect) fpSelect.value = 'unsafe';
				const bpCheck = document.getElementById('input-block-porn');
				if (bpCheck) bpCheck.checked = false;
				const baCheck = document.getElementById('input-block-ads');
				if (baCheck) baCheck.checked = false;
				const autoRotateUserProxyCheck = document.getElementById('input-auto-rotate-user-proxy');
				if (autoRotateUserProxyCheck) autoRotateUserProxyCheck.checked = false;
				const fragLenInput = document.getElementById('input-frag-len');
				if (fragLenInput) fragLenInput.value = '200-3000';
				const fragIntInput = document.getElementById('input-frag-int');
				if (fragIntInput) fragIntInput.value = '1-2';
				document.querySelectorAll('.frag-preset-card').forEach(card => card.classList.remove('ring-2', 'ring-blue-500', 'border-[#00ff66]', 'bg-blue-50/50', 'dark:bg-blue-950/40'));
				const fragToggle = document.getElementById('input-frag-toggle');
				if (fragToggle) fragToggle.checked = false;
				if (typeof window.toggleFragInputs === 'function') window.toggleFragInputs(false);
				const customPortInput = document.getElementById('input-custom-ports');
				if (customPortInput) customPortInput.value = '';
				const advFragInput = document.getElementById('input-advanced-frag');
				if (advFragInput) advFragInput.value = '';
				const csInput = document.getElementById('input-cipher-suites');
				if (csInput) csInput.value = '';
				const maskInput = document.getElementById('input-tls-mask');
				if (maskInput) maskInput.value = '';
				const advSettingsToggle = document.getElementById('input-advanced-settings-toggle');
				if (advSettingsToggle) advSettingsToggle.checked = false;
				if (typeof window.toggleAdvancedSettingsInputs === 'function') window.toggleAdvancedSettingsInputs(false);
				document.getElementById('hidden-auto-rotate').value = '0';
				document.getElementById('hidden-rotate-time').value = '';
				document.getElementById('hidden-ip-operator').value = 'all';
				document.getElementById('hidden-ip-count').value = '15';
				const autoResetToggle = document.getElementById('input-auto-reset-toggle');
				if (autoResetToggle) autoResetToggle.checked = false;
				document.getElementById('input-auto-reset-vol').value = '';
				document.getElementById('input-auto-reset-req').value = '';
				window.toggleAutoResetInputs(false);
				const startOnFirstConnectCheck = document.getElementById('input-start-on-first-connect');
				if (startOnFirstConnectCheck) startOnFirstConnectCheck.checked = false;
			}
		}
		function toggleUpdateModal(show, version = '') {
			if (show && version) document.getElementById('update-modal-text').innerHTML = 'نسخه جدید (<b>v' + version + '</b>) در دسترس است.<br>اگر آپدیت خودکار عمل نکرد لطفا از ربات استفاده کنید.';
			setModalState('update-modal', show);
		}
		async function createDirectUser(btn) {
			if (window.isQuickCreateLocked) {
				showToast('⏳ لطفاً ۵ ثانیه صبر کنید...', 'error');
				return;
			}
			window.isQuickCreateLocked = true;
			btn.disabled = true;
			const icon = btn.querySelector('svg');
			if (icon) {
				icon.classList.add('animate-spin');
				icon.classList.remove('group-hover:rotate-12');
			}
			try {
				const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
				let randStr = '';
				for (let i = 0; i < 8; i++) randStr += chars.charAt(Math.floor(Math.random() * chars.length));
				const username = randStr;
				let panelIso = "";
				try {
					const pRes = await fetch('/api/placement-status');
					if (pRes.ok) {
						const pData = await pRes.json();
						let currentRegion = pData.placement || "smart";
						if (currentRegion !== "smart" && currentRegion !== "off" && currentRegion !== "none" && !currentRegion.startsWith("targeted")) {
							if (!currentRegion.includes(':')) {
								for (const prov in PLACEMENT_DATA.providers) {
									const found = PLACEMENT_DATA.providers[prov].regions.find(r => r.id.toLowerCase() === currentRegion);
									if (found) { currentRegion = prov.toLowerCase() + ':' + currentRegion; break; }
								}
							}
							let foundCountry = null;
							for (const prov in PLACEMENT_DATA.providers) {
								const found = PLACEMENT_DATA.providers[prov].regions.find(r => (prov.toLowerCase() + ':' + r.id.toLowerCase()) === currentRegion);
								if (found) { foundCountry = found.country; break; }
							}
							if (foundCountry) {
								const countryToIso = { "United States": "US", "South Africa": "ZA", "Hong Kong": "HK", "Taiwan": "TW", "India": "IN", "Singapore": "SG", "Australia": "AU", "Indonesia": "ID", "Malaysia": "MY", "New Zealand": "NZ", "Thailand": "TH", "Japan": "JP", "South Korea": "KR", "Canada": "CA", "Germany": "DE", "Switzerland": "CH", "Ireland": "IE", "United Kingdom": "GB", "France": "FR", "Sweden": "SE", "Italy": "IT", "Spain": "ES", "Israel": "IL", "United Arab Emirates": "AE", "Bahrain": "BH", "Mexico": "MX", "Brazil": "BR", "Austria": "AT", "Belgium": "BE", "Chile": "CL", "Denmark": "DK", "Poland": "PL", "Qatar": "QA", "Norway": "NO", "Netherlands": "NL", "Finland": "FI", "Saudi Arabia": "SA" };
								panelIso = countryToIso[foundCountry] || "";
							}
						}
					}
				} catch(e) {}
				await ensureIpsCache();
				await ensureDomainsCache();
				let ipsList = [];
				Object.values(cachedIpsData).forEach(ips => { ipsList = ipsList.concat(ips); });
				ipsList = [...new Set(ipsList)];
				let domList = [...new Set(cachedDomainsData)];
				const pickRandom = (list, num) => {
					if (list.length === 0) return [];
					if (num >= list.length) return list.slice();
					const shuffled = list.slice();
					for (let i = shuffled.length - 1; i > 0; i--) {
						const j = Math.floor(Math.random() * (i + 1));
						[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
					}
					return shuffled.slice(0, num);
				};
				let count = 30;
				let half = Math.ceil(count / 2);
				let otherHalf = count - half;
				let actualDomCount = Math.min(otherHalf, domList.length);
				let actualIpCount = Math.min(count - actualDomCount, ipsList.length);
				actualDomCount = Math.min(count - actualIpCount, domList.length);
				let sIps = pickRandom(ipsList, actualIpCount);
				let sDoms = pickRandom(domList, actualDomCount);
				let mixed = [...sIps, ...sDoms];
				let selectedIps = pickRandom(mixed, mixed.length);
				const ipsStr = selectedIps.join('\\n');
				const tlsPick = tlsPorts[Math.floor(Math.random() * tlsPorts.length)];
				const nonTlsPick = nonTlsPorts[Math.floor(Math.random() * nonTlsPorts.length)];
				const response = await fetch('/api/users', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						username: username, limit_gb: null, expiry_days: null, limit_req: null, ip_limit: null,
						auto_reset_vol_days: 0, auto_reset_req_days: 0, frag_len: "", frag_int: "",
						fingerprint: "unsafe", block_ads: 1, block_porn: 0, port: tlsPick + "," + nonTlsPick, tls: "on",
						ips: ipsStr, ip_operator: "all|mixed", ip_count: 30, auto_rotate_ip: 1, rotate_time: 5,
						user_socks5: null, user_proxy_iata: panelIso || null, auto_rotate_user_proxy: 0, connection_type: "vless", enable_direct: true
					})
				});
				if (response.ok) {
					showToast('✅ کاربر مستقیم (بدون پروکسی) با موفقیت ایجاد شد.');
					await loadUsers(true);
				} else {
					const errData = await response.json();
					alert('خطا: ' + (errData.error || 'عملیات ناموفق بود'));
				}
			} catch (err) {
				alert('خطا در برقراری ارتباط با سرور');
			} finally {
				setTimeout(() => {
					window.isQuickCreateLocked = false;
					btn.disabled = false;
					if (icon) {
						icon.classList.remove('animate-spin');
						icon.classList.add('group-hover:rotate-12');
					}
				}, 1000); 
			}
		}
		async function quickCreateUser(btn) {
			if (window.isQuickCreateLocked) {
				showToast('⏳ لطفاً ۵ ثانیه صبر کنید...', 'error');
				return;
			}
			window.isQuickCreateLocked = true;
			btn.disabled = true;
			const icon = btn.querySelector('svg');
			if (icon) {
				icon.classList.add('animate-spin');
				icon.classList.remove('group-hover:rotate-12');
			}
			try {
				const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
				let randStr = '';
				for (let i = 0; i < 8; i++) randStr += chars.charAt(Math.floor(Math.random() * chars.length));
				const username = randStr;
				if (!cachedVipList || cachedVipList.length === 0) {
					await initVipCache();
				}
				let vipCountries = cachedVipList ? [...cachedVipList] : [];
				if (vipCountries.length < 1) {
					const fallbackCountries = ["DE", "US", "GB", "NL", "FR", "TR"];
					await Promise.all(fallbackCountries.map(async (country) => {
						try {
							const resVip = await fetchWithFallbackUI('proxy_vip/' + country + '.txt');
							if (resVip.ok) {
								const text = await resVip.text();
								const lines = text.split('\\n').map(l => l.trim()).filter(l => l.length > 5);
								if (lines.length > 0) {
									cachedVipProxies[country] = lines;
									vipCountries.push(country);
								}
							}
						} catch(e) {}
					}));
				}
				if (vipCountries.length < 1) {
					alert('خطا: مخزن VIP شما در دسترس نیست یا ارتباط سرور کلودفلر قطع است.');
					btn.disabled = false;
					if (icon) {
						icon.classList.remove('animate-spin');
						icon.classList.add('group-hover:rotate-12');
					}
					return;
				}
				for (let i = vipCountries.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[vipCountries[i], vipCountries[j]] = [vipCountries[j], vipCountries[i]];
				}
				const selectedCountries = vipCountries.slice(0, 12);
				let candidateProxies = [];
				selectedCountries.forEach(country => {
					const lines = cachedVipProxies[country];
					if (lines && lines.length > 0) {
						lines.forEach(proxyLine => {
							candidateProxies.push({ proxy: proxyLine, country: country });
						});
					}
				});
				for (let i = candidateProxies.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[candidateProxies[i], candidateProxies[j]] = [candidateProxies[j], candidateProxies[i]];
				}
				const proxiesToTest = candidateProxies.slice(0, 50);
				const controller = new AbortController();
				let successProxies = [];
				let foundCountries = new Set();
				const racePromise = new Promise((resolveRace) => {
					let activeCount = 0;
					let isDone = false;
					if (proxiesToTest.length === 0) {
						resolveRace();
						return;
					}
					const fireRequests = async () => {
						for (const item of proxiesToTest) {
							if (isDone) break;
							activeCount++;
							const randomDelay = Math.floor(Math.random() * 9) + 2; 
							await new Promise(r => setTimeout(r, randomDelay));
							fetch('/api/test-proxy', {
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify({ proxy: item.proxy, skip_country: true }),
								signal: controller.signal
							})
							.then(res => res.json())
							.then(data => {
								if (isDone) return;
								if (data.success && !foundCountries.has(item.country)) {
									foundCountries.add(item.country);
									successProxies.push({ proxy: item.proxy, ping: data.ping, country: item.country });
									if (successProxies.length >= 5) {
										isDone = true;
										resolveRace();
									}
								}
							})
							.catch(() => {})
							.finally(() => {
								activeCount--;
								if (activeCount === 0 && !isDone) {
									resolveRace();
								}
							});
						}
					};
					fireRequests();
				});
				const timeoutPromise = new Promise(resolve => setTimeout(resolve, 8000));
				await Promise.race([racePromise, timeoutPromise]);
				controller.abort(); 
				if (successProxies.length === 0) {
					alert('خطا: هیچ پروکسی سالمی در زمان مجاز یافت نشد.');
					btn.disabled = false;
					if (icon) {
						icon.classList.remove('animate-spin');
						icon.classList.add('group-hover:rotate-12');
					}
					return;
				}
				successProxies.sort((a, b) => a.ping - b.ping);
				const fastestProxies = successProxies.slice(0, 5).map(p => ({ proxy: p.proxy, country: p.country }));
				const userSocks5 = JSON.stringify(fastestProxies);
				await ensureIpsCache();
				await ensureDomainsCache();
				let ipsList = [];
				Object.values(cachedIpsData).forEach(ips => { ipsList = ipsList.concat(ips); });
				ipsList = [...new Set(ipsList)];
				let domList = [...new Set(cachedDomainsData)];
				const pickRandom = (list, num) => {
					if (list.length === 0) return [];
					if (num >= list.length) return list.slice();
					const shuffled = list.slice();
					for (let i = shuffled.length - 1; i > 0; i--) {
						const j = Math.floor(Math.random() * (i + 1));
						[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
					}
					return shuffled.slice(0, num);
				};
				let count = 5;
				let half = Math.ceil(count / 2);
				let otherHalf = count - half;
				let actualDomCount = Math.min(otherHalf, domList.length);
				let actualIpCount = Math.min(count - actualDomCount, ipsList.length);
				actualDomCount = Math.min(count - actualIpCount, domList.length);
				let sIps = pickRandom(ipsList, actualIpCount);
				let sDoms = pickRandom(domList, actualDomCount);
				let mixed = [...sIps, ...sDoms];
				let selectedIps = pickRandom(mixed, mixed.length);
				const ipsStr = selectedIps.join('\\n');
				const response = await fetch('/api/users', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						username: username, limit_gb: null, expiry_days: null, limit_req: null, ip_limit: null,
						auto_reset_vol_days: 0, auto_reset_req_days: 0, frag_len: "", frag_int: "",
						fingerprint: "unsafe", block_ads: 1, block_porn: 0, port: "443", tls: "on",
						ips: ipsStr, ip_operator: "all|mixed", ip_count: 10, auto_rotate_ip: 1, rotate_time: 5,
						user_socks5: userSocks5, auto_rotate_user_proxy: 1, connection_type: "vless", enable_direct: false
					})
				});
				if (response.ok) {
					showToast('✅ کاربر مولتی لوکیشن با موفقیت ایجاد شد.');
					await loadUsers(true);
				} else {
					const errData = await response.json();
					alert('خطا: ' + (errData.error || 'عملیات ناموفق بود'));
				}
			} catch (err) {
				alert('خطا در برقراری ارتباط با سرور');
			} finally {
				setTimeout(() => {
					window.isQuickCreateLocked = false;
					btn.disabled = false;
					if (icon) {
						icon.classList.remove('animate-spin');
						icon.classList.add('group-hover:rotate-12');
					}
				}, 1000); 
			}
		}
let activeRocketBtn = null;
function toggleRocketModal(show) {
	setModalState('rocket-modal', show);
}
const PLACEMENT_DATA = {
		  "providers": {
			"AWS": { "regions": [ {"id": "us-east-1", "name": "US East (N. Virginia)", "country": "United States", "emoji": "🇺🇸", "location": "Northern Virginia"}, {"id": "us-east-2", "name": "US East (Ohio)", "country": "United States", "emoji": "🇺🇸", "location": "Ohio"}, {"id": "us-west-1", "name": "US West (N. California)", "country": "United States", "emoji": "🇺🇸", "location": "Northern California"}, {"id": "us-west-2", "name": "US West (Oregon)", "country": "United States", "emoji": "🇺🇸", "location": "Oregon"}, {"id": "af-south-1", "name": "Africa (Cape Town)", "country": "South Africa", "emoji": "🇿🇦", "location": "Cape Town"}, {"id": "ap-east-1", "name": "Asia Pacific (Hong Kong)", "country": "Hong Kong", "emoji": "🇭🇰", "location": "Hong Kong"}, {"id": "ap-east-2", "name": "Asia Pacific (Taipei)", "country": "Taiwan", "emoji": "🇹🇼", "location": "Taipei"}, {"id": "ap-south-1", "name": "Asia Pacific (Mumbai)", "country": "India", "emoji": "🇮🇳", "location": "Mumbai"}, {"id": "ap-south-2", "name": "Asia Pacific (Hyderabad)", "country": "India", "emoji": "🇮🇳", "location": "Hyderabad"}, {"id": "ap-southeast-1", "name": "Asia Pacific (Singapore)", "country": "Singapore", "emoji": "🇸🇬", "location": "Singapore"}, {"id": "ap-southeast-2", "name": "Asia Pacific (Sydney)", "country": "Australia", "emoji": "🇦🇺", "location": "Sydney"}, {"id": "ap-southeast-3", "name": "Asia Pacific (Jakarta)", "country": "Indonesia", "emoji": "🇮🇩", "location": "Jakarta"}, {"id": "ap-southeast-4", "name": "Asia Pacific (Melbourne)", "country": "Australia", "emoji": "🇦🇺", "location": "Melbourne"}, {"id": "ap-southeast-5", "name": "Asia Pacific (Malaysia)", "country": "Malaysia", "emoji": "🇲🇾", "location": "Malaysia"}, {"id": "ap-southeast-6", "name": "Asia Pacific (New Zealand)", "country": "New Zealand", "emoji": "🇳🇿", "location": "New Zealand"}, {"id": "ap-southeast-7", "name": "Asia Pacific (Thailand)", "country": "Thailand", "emoji": "🇹🇭", "location": "Thailand"}, {"id": "ap-northeast-1", "name": "Asia Pacific (Tokyo)", "country": "Japan", "emoji": "🇯🇵", "location": "Tokyo"}, {"id": "ap-northeast-2", "name": "Asia Pacific (Seoul)", "country": "South Korea", "emoji": "🇰🇷", "location": "Seoul"}, {"id": "ap-northeast-3", "name": "Asia Pacific (Osaka)", "country": "Japan", "emoji": "🇯🇵", "location": "Osaka"}, {"id": "ca-central-1", "name": "Canada (Central)", "country": "Canada", "emoji": "🇨🇦", "location": "Montreal"}, {"id": "ca-west-1", "name": "Canada West (Calgary)", "country": "Canada", "emoji": "🇨🇦", "location": "Calgary"}, {"id": "eu-central-1", "name": "Europe (Frankfurt)", "country": "Germany", "emoji": "🇩🇪", "location": "Frankfurt"}, {"id": "eu-central-2", "name": "Europe (Zurich)", "country": "Switzerland", "emoji": "🇨🇭", "location": "Zurich"}, {"id": "eu-west-1", "name": "Europe (Ireland)", "country": "Ireland", "emoji": "🇮🇪", "location": "Dublin"}, {"id": "eu-west-2", "name": "Europe (London)", "country": "United Kingdom", "emoji": "🇬🇧", "location": "London"}, {"id": "eu-west-3", "name": "Europe (Paris)", "country": "France", "emoji": "🇫🇷", "location": "Paris"}, {"id": "eu-north-1", "name": "Europe (Stockholm)", "country": "Sweden", "emoji": "🇸🇪", "location": "Stockholm"}, {"id": "eu-south-1", "name": "Europe (Milan)", "country": "Italy", "emoji": "🇮🇹", "location": "Milan"}, {"id": "eu-south-2", "name": "Europe (Spain)", "country": "Spain", "emoji": "🇪🇸", "location": "Aragon"}, {"id": "il-central-1", "name": "Israel (Tel Aviv)", "country": "Israel", "emoji": "🇮🇱", "location": "Tel Aviv"}, {"id": "me-central-1", "name": "Middle East (UAE)", "country": "United Arab Emirates", "emoji": "🇦🇪", "location": "Abu Dhabi"}, {"id": "me-south-1", "name": "Middle East (Bahrain)", "country": "Bahrain", "emoji": "🇧🇭", "location": "Bahrain"}, {"id": "mx-central-1", "name": "Mexico (Central)", "country": "Mexico", "emoji": "🇲🇽", "location": "Queretaro"}, {"id": "sa-east-1", "name": "South America (São Paulo)", "country": "Brazil", "emoji": "🇧🇷", "location": "Sao Paulo"} ] },
			"Azure": { "regions": [ {"id": "australiacentral", "name": "Australia Central", "country": "Australia", "emoji": "🇦🇺", "location": "Canberra"}, {"id": "australiacentral2", "name": "Australia Central 2", "country": "Australia", "emoji": "🇦🇺", "location": "Canberra"}, {"id": "australiaeast", "name": "Australia East", "country": "Australia", "emoji": "🇦🇺", "location": "New South Wales"}, {"id": "australiasoutheast", "name": "Australia Southeast", "country": "Australia", "emoji": "🇦🇺", "location": "Victoria"}, {"id": "austriaeast", "name": "Austria East", "country": "Austria", "emoji": "🇦🇹", "location": "Vienna"}, {"id": "belgiumcentral", "name": "Belgium Central", "country": "Belgium", "emoji": "🇧🇪", "location": "Brussels"}, {"id": "brazilsouth", "name": "Brazil South", "country": "Brazil", "emoji": "🇧🇷", "location": "Sao Paulo State"}, {"id": "brazilsoutheast", "name": "Brazil Southeast", "country": "Brazil", "emoji": "🇧🇷", "location": "Rio de Janeiro"}, {"id": "canadacentral", "name": "Canada Central", "country": "Canada", "emoji": "🇨🇦", "location": "Toronto"}, {"id": "canadaeast", "name": "Canada East", "country": "Canada", "emoji": "🇨🇦", "location": "Quebec"}, {"id": "centralindia", "name": "Central India", "country": "India", "emoji": "🇮🇳", "location": "Pune"}, {"id": "centralus", "name": "Central US", "country": "United States", "emoji": "🇺🇸", "location": "Iowa"}, {"id": "chilecentral", "name": "Chile Central", "country": "Chile", "emoji": "🇨🇱", "location": "Santiago"}, {"id": "denmarkeast", "name": "Denmark East", "country": "Denmark", "emoji": "🇩🇰", "location": "Copenhagen"}, {"id": "eastasia", "name": "East Asia", "country": "Hong Kong", "emoji": "🇭🇰", "location": "Hong Kong"}, {"id": "eastus", "name": "East US", "country": "United States", "emoji": "🇺🇸", "location": "Virginia"}, {"id": "eastus2", "name": "East US 2", "country": "United States", "emoji": "🇺🇸", "location": "Virginia"}, {"id": "francecentral", "name": "France Central", "country": "France", "emoji": "🇫🇷", "location": "Paris"}, {"id": "francesouth", "name": "France South", "country": "France", "emoji": "🇫🇷", "location": "Marseille"}, {"id": "germanynorth", "name": "Germany North", "country": "Germany", "emoji": "🇩🇪", "location": "Berlin"}, {"id": "germanywestcentral", "name": "Germany West Central", "country": "Germany", "emoji": "🇩🇪", "location": "Frankfurt"}, {"id": "indiasouthcentral", "name": "India South Central", "country": "India", "emoji": "🇮🇳", "location": "Hyderabad"}, {"id": "indonesiacentral", "name": "Indonesia Central", "country": "Indonesia", "emoji": "🇮🇩", "location": "Jakarta"}, {"id": "israelcentral", "name": "Israel Central", "country": "Israel", "emoji": "🇮🇱", "location": "Central Israel"}, {"id": "italynorth", "name": "Italy North", "country": "Italy", "emoji": "🇮🇹", "location": "Milan"}, {"id": "japaneast", "name": "Japan East", "country": "Japan", "emoji": "🇯🇵", "location": "Tokyo"}, {"id": "japanwest", "name": "Japan West", "country": "Japan", "emoji": "🇯🇵", "location": "Osaka"}, {"id": "koreacentral", "name": "Korea Central", "country": "South Korea", "emoji": "🇰🇷", "location": "Seoul"}, {"id": "koreasouth", "name": "Korea South", "country": "South Korea", "emoji": "🇰🇷", "location": "Busan"}, {"id": "malaysiawest", "name": "Malaysia West", "country": "Malaysia", "emoji": "🇲🇾", "location": "Kuala Lumpur"}, {"id": "mexicocentral", "name": "Mexico Central", "country": "Mexico", "emoji": "🇲🇽", "location": "Queretaro"}, {"id": "newzealandnorth", "name": "New Zealand North", "country": "New Zealand", "emoji": "🇳🇿", "location": "Auckland"}, {"id": "northcentralus", "name": "North Central US", "country": "United States", "emoji": "🇺🇸", "location": "Illinois"}, {"id": "northeurope", "name": "North Europe", "country": "Ireland", "emoji": "🇮🇪", "location": "Ireland"}, {"id": "norwayeast", "name": "Norway East", "country": "Norway", "emoji": "🇳🇴", "location": "Eastern Norway"}, {"id": "norwaywest", "name": "Norway West", "country": "Norway", "emoji": "🇳🇴", "location": "Western Norway"}, {"id": "polandcentral", "name": "Poland Central", "country": "Poland", "emoji": "🇵🇱", "location": "Warsaw"}, {"id": "qatarcentral", "name": "Qatar Central", "country": "Qatar", "emoji": "🇶🇦", "location": "Doha"}, {"id": "southafricanorth", "name": "South Africa North", "country": "South Africa", "emoji": "🇿🇦", "location": "Johannesburg"}, {"id": "southafricawest", "name": "South Africa West", "country": "South Africa", "emoji": "🇿🇦", "location": "Cape Town"}, {"id": "southcentralus", "name": "South Central US", "country": "United States", "emoji": "🇺🇸", "location": "Texas"}, {"id": "southindia", "name": "South India", "country": "India", "emoji": "🇮🇳", "location": "Chennai"}, {"id": "southeastasia", "name": "Southeast Asia", "country": "Singapore", "emoji": "🇸🇬", "location": "Singapore"}, {"id": "spaincentral", "name": "Spain Central", "country": "Spain", "emoji": "🇪🇸", "location": "Madrid"}, {"id": "swedencentral", "name": "Sweden Central", "country": "Sweden", "emoji": "🇸🇪", "location": "Gavle"}, {"id": "switzerlandnorth", "name": "Switzerland North", "country": "Switzerland", "emoji": "🇨🇭", "location": "Zurich"}, {"id": "switzerlandwest", "name": "Switzerland West", "country": "Switzerland", "emoji": "🇨🇭", "location": "Geneva"}, {"id": "taiwannorth", "name": "Taiwan North", "country": "Taiwan", "emoji": "🇹🇼", "location": "Taipei"}, {"id": "uaecentral", "name": "UAE Central", "country": "United Arab Emirates", "emoji": "🇦🇪", "location": "Abu Dhabi"}, {"id": "uaenorth", "name": "UAE North", "country": "United Arab Emirates", "emoji": "🇦🇪", "location": "Dubai"}, {"id": "uksouth", "name": "UK South", "country": "United Kingdom", "emoji": "🇬🇧", "location": "London"}, {"id": "ukwest", "name": "UK West", "country": "United Kingdom", "emoji": "🇬🇧", "location": "Cardiff"}, {"id": "westcentralus", "name": "West Central US", "country": "United States", "emoji": "🇺🇸", "location": "Wyoming"}, {"id": "westeurope", "name": "West Europe", "country": "Netherlands", "emoji": "🇳🇱", "location": "Netherlands"}, {"id": "westindia", "name": "West India", "country": "India", "emoji": "🇮🇳", "location": "Mumbai"}, {"id": "westus", "name": "West US", "country": "United States", "emoji": "🇺🇸", "location": "California"}, {"id": "westus2", "name": "West US 2", "country": "United States", "emoji": "🇺🇸", "location": "Washington"}, {"id": "westus3", "name": "West US 3", "country": "United States", "emoji": "🇺🇸", "location": "Phoenix"} ] },
			"GCP": { "regions": [ {"id": "africa-south1", "name": "Johannesburg", "country": "South Africa", "emoji": "🇿🇦", "location": "Johannesburg"}, {"id": "asia-east1", "name": "Taiwan", "country": "Taiwan", "emoji": "🇹🇼", "location": "Changhua County"}, {"id": "asia-east2", "name": "Hong Kong", "country": "Hong Kong", "emoji": "🇭🇰", "location": "Hong Kong"}, {"id": "asia-northeast1", "name": "Tokyo", "country": "Japan", "emoji": "🇯🇵", "location": "Tokyo"}, {"id": "asia-northeast2", "name": "Osaka", "country": "Japan", "emoji": "🇯🇵", "location": "Osaka"}, {"id": "asia-northeast3", "name": "Seoul", "country": "South Korea", "emoji": "🇰🇷", "location": "Seoul"}, {"id": "asia-south1", "name": "Mumbai", "country": "India", "emoji": "🇮🇳", "location": "Mumbai"}, {"id": "asia-south2", "name": "Delhi", "country": "India", "emoji": "🇮🇳", "location": "Delhi"}, {"id": "asia-southeast1", "name": "Singapore", "country": "Singapore", "emoji": "🇸🇬", "location": "Singapore"}, {"id": "asia-southeast2", "name": "Jakarta", "country": "Indonesia", "emoji": "🇮🇩", "location": "Jakarta"}, {"id": "asia-southeast3", "name": "Bangkok", "country": "Thailand", "emoji": "🇹🇭", "location": "Bangkok"}, {"id": "australia-southeast1", "name": "Sydney", "country": "Australia", "emoji": "🇦🇺", "location": "Sydney"}, {"id": "australia-southeast2", "name": "Melbourne", "country": "Australia", "emoji": "🇦🇺", "location": "Melbourne"}, {"id": "europe-central2", "name": "Warsaw", "country": "Poland", "emoji": "🇵🇱", "location": "Warsaw"}, {"id": "europe-north1", "name": "Finland", "country": "Finland", "emoji": "🇫🇮", "location": "Hamina"}, {"id": "europe-north2", "name": "Stockholm", "country": "Sweden", "emoji": "🇸🇪", "location": "Stockholm"}, {"id": "europe-southwest1", "name": "Madrid", "country": "Spain", "emoji": "🇪🇸", "location": "Madrid"}, {"id": "europe-west1", "name": "Belgium", "country": "Belgium", "emoji": "🇧🇪", "location": "St. Ghislain"}, {"id": "europe-west2", "name": "London", "country": "United Kingdom", "emoji": "🇬🇧", "location": "London"}, {"id": "europe-west3", "name": "Frankfurt", "country": "Germany", "emoji": "🇩🇪", "location": "Frankfurt"}, {"id": "europe-west4", "name": "Netherlands", "country": "Netherlands", "emoji": "🇳🇱", "location": "Eemshaven"}, {"id": "europe-west6", "name": "Zurich", "country": "Switzerland", "emoji": "🇨🇭", "location": "Zurich"}, {"id": "europe-west8", "name": "Milan", "country": "Italy", "emoji": "🇮🇹", "location": "Milan"}, {"id": "europe-west9", "name": "Paris", "country": "France", "emoji": "🇫🇷", "location": "Paris"}, {"id": "europe-west10", "name": "Berlin", "country": "Germany", "emoji": "🇩🇪", "location": "Berlin"}, {"id": "europe-west12", "name": "Turin", "country": "Italy", "emoji": "🇮🇹", "location": "Turin"}, {"id": "me-central1", "name": "Doha", "country": "Qatar", "emoji": "🇶🇦", "location": "Doha"}, {"id": "me-central2", "name": "Dammam", "country": "Saudi Arabia", "emoji": "🇸🇦", "location": "Dammam"}, {"id": "me-west1", "name": "Tel Aviv", "country": "Israel", "emoji": "🇮🇱", "location": "Tel Aviv"}, {"id": "northamerica-northeast1", "name": "Montreal", "country": "Canada", "emoji": "🇨🇦", "location": "Montreal"}, {"id": "northamerica-northeast2", "name": "Toronto", "country": "Canada", "emoji": "🇨🇦", "location": "Toronto"}, {"id": "northamerica-south1", "name": "Mexico", "country": "Mexico", "emoji": "🇲🇽", "location": "Queretaro"}, {"id": "southamerica-east1", "name": "Sao Paulo", "country": "Brazil", "emoji": "🇧🇷", "location": "Sao Paulo"}, {"id": "southamerica-west1", "name": "Santiago", "country": "Chile", "emoji": "🇨🇱", "location": "Santiago"}, {"id": "us-central1", "name": "Iowa", "country": "United States", "emoji": "🇺🇸", "location": "Council Bluffs, Iowa"}, {"id": "us-east1", "name": "South Carolina", "country": "United States", "emoji": "🇺🇸", "location": "Moncks Corner, South Carolina"}, {"id": "us-east4", "name": "Northern Virginia", "country": "United States", "emoji": "🇺🇸", "location": "Ashburn, Virginia"}, {"id": "us-east5", "name": "Columbus", "country": "United States", "emoji": "🇺🇸", "location": "Columbus, Ohio"}, {"id": "us-south1", "name": "Dallas", "country": "United States", "emoji": "🇺🇸", "location": "Dallas, Texas"}, {"id": "us-west1", "name": "Oregon", "country": "United States", "emoji": "🇺🇸", "location": "The Dalles, Oregon"}, {"id": "us-west2", "name": "Los Angeles", "country": "United States", "emoji": "🇺🇸", "location": "Los Angeles, California"}, {"id": "us-west3", "name": "Salt Lake City", "country": "United States", "emoji": "🇺🇸", "location": "Salt Lake City, Utah"}, {"id": "us-west4", "name": "Las Vegas", "country": "United States", "emoji": "🇺🇸", "location": "Las Vegas, Nevada"} ] }
		  }
		};
		function togglePlacementModal(show) {
			setModalState('placement-modal', show);
		}
		async function openPlacementModal(providedToken = null) {
			toggleSettingsModal(false);
			togglePlacementModal(true);
			const btn = document.getElementById('placement-submit-btn');
			const defaultBtnHtml = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg> اعمال تغییرات و دیپلوی';
			btn.innerHTML = '<svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> در حال دریافت وضعیت فعلی از کلودفلر...';
			btn.disabled = true;
			try {
				const fetchOpts = providedToken ? {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ cf_token: providedToken })
				} : { method: 'GET' };
				const res = await fetch('/api/placement-status', fetchOpts);
				const data = await res.json();
				if (res.status === 400 && (data.error === "TOKEN_REQUIRED" || data.error === "INVALID_TOKEN")) {
					togglePlacementModal(false);
					window.pendingCoreAction = 'fetch-placement-status';
					toggleTokenModal(true);
					if (data.error === "INVALID_TOKEN") {
						alert('❌ توکن کلودفلر نامعتبر است! لطفاً یک توکن معتبر وارد کنید.');
					} else {
						showToast('🔑 برای مشاهده و تغییر ریجن، ابتدا توکن کلودفلر را وارد کنید.', 'error');
					}
					return;
				}
				let currentRegion = 'none';
				if (res.ok && data.success && data.placement) {
					currentRegion = String(data.placement).trim().toLowerCase();
				}
				document.getElementById('selected-placement-region').value = currentRegion === 'none' ? '' : currentRegion;
				if (currentRegion === 'none' || currentRegion === 'off') {
					document.querySelectorAll('input[name="placement-mode"]').forEach(r => r.checked = false);
					togglePlacementManualMode();
					showToast('ℹ️ در حال حاضر ریجن ورکر روی حالت خاموش (Off) است.');
				} else if (currentRegion === 'smart') {
					const smartOption = document.querySelector('input[name="placement-mode"][value="smart"]');
					if (smartOption) smartOption.checked = true;
					togglePlacementManualMode();
				} else {
					let finalRegion = currentRegion;
					let foundInList = false;
					if (finalRegion !== "targeted") {
						if (!finalRegion.includes(':')) {
							for (const prov in PLACEMENT_DATA.providers) {
								const found = PLACEMENT_DATA.providers[prov].regions.find(r => r.id.toLowerCase() === finalRegion);
								if (found) {
									finalRegion = prov.toLowerCase() + ':' + finalRegion;
									break;
								}
							}
						}
						if (finalRegion.includes(':')) {
							const parts = finalRegion.split(':');
							const rawProvider = parts[0].toLowerCase();
							let providerVal = 'GCP';
							if (rawProvider === 'aws') providerVal = 'AWS';
							else if (rawProvider === 'azure') providerVal = 'Azure';
							else if (rawProvider === 'gcp') providerVal = 'GCP';
							const providerRadio = document.querySelector('input[name="placement-provider"][value="' + providerVal + '"]');
							if (providerRadio) {
								providerRadio.checked = true;
								foundInList = true;
							}
						}
					}
					const manualOption = document.querySelector('input[name="placement-mode"][value="manual"]');
					if (manualOption) manualOption.checked = true;
					togglePlacementManualMode();
					if (foundInList) {
						setTimeout(() => {
							const targetBtn = document.querySelector('.placement-region-btn[data-region="' + finalRegion + '"]');
							if (targetBtn) {
								targetBtn.click();
								targetBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
							}
						}, 150);
					} else {
						document.getElementById('selected-placement-region').value = 'targeted';
						showToast('ℹ️ ریجن در کلودفلر روی حالت دستی است اما نام آن شناسایی نشد. برای سینک شدن، یک لوکیشن را انتخاب و اعمال کنید.');
					}
				}
			} catch (err) {
				console.error("خطا در دریافت وضعیت ریجن");
			} finally {
				btn.innerHTML = defaultBtnHtml;
				const currentVal = document.getElementById('selected-placement-region').value;
				btn.disabled = !currentVal;
			}
		}
		function togglePlacementManualMode() {
			const checkedInput = document.querySelector('input[name="placement-mode"]:checked');
			const mode = checkedInput ? checkedInput.value : 'none';
			const manualSection = document.getElementById('placement-manual-section');
			const hiddenInput = document.getElementById('selected-placement-region');
			const submitBtn = document.getElementById('placement-submit-btn');
			document.querySelectorAll('.placement-mode-label').forEach(lbl => {
				lbl.classList.remove('ring-2', 'ring-cyan-500', 'border-cyan-500', 'bg-cyan-50', 'dark:bg-cyan-900/20', 'ring-purple-500', 'border-purple-500', 'bg-purple-50', 'dark:bg-purple-900/20');
				if (lbl.querySelector('input').checked) {
					if (mode === 'smart') {
						lbl.classList.add('ring-2', 'ring-purple-500', 'border-purple-500', 'bg-purple-50', 'dark:bg-purple-900/20');
					} else if (mode === 'manual') {
						lbl.classList.add('ring-2', 'ring-cyan-500', 'border-cyan-500', 'bg-cyan-50', 'dark:bg-cyan-900/20');
					}
				}
			});
			if (mode === 'manual') {
				manualSection.classList.remove('hidden');
				setTimeout(() => manualSection.classList.remove('opacity-0', '-translate-y-2'), 10);
				renderPlacementRegions();
			} else if (mode === 'smart') {
				manualSection.classList.add('opacity-0', '-translate-y-2');
				setTimeout(() => manualSection.classList.add('hidden'), 300);
				hiddenInput.value = 'smart';
				submitBtn.disabled = false;
			} else {
				manualSection.classList.add('opacity-0', '-translate-y-2');
				setTimeout(() => manualSection.classList.add('hidden'), 300);
				hiddenInput.value = '';
				submitBtn.disabled = true;
			}
		}
		function renderPlacementRegions() {
			const provider = document.querySelector('input[name="placement-provider"]:checked').value;
			const list = document.getElementById('placement-regions-list');
			const hiddenInput = document.getElementById('selected-placement-region');
			const submitBtn = document.getElementById('placement-submit-btn');
			document.querySelectorAll('.placement-provider-label').forEach(lbl => {
				lbl.classList.remove('ring-2', 'ring-cyan-500', 'border-cyan-500', 'bg-cyan-50', 'dark:bg-cyan-900/20');
				if (lbl.querySelector('input').checked) {
					lbl.classList.add('ring-2', 'ring-cyan-500', 'border-cyan-500', 'bg-cyan-50', 'dark:bg-cyan-900/20');
				}
			});
			const regions = PLACEMENT_DATA.providers[provider].regions;
			list.innerHTML = '';
			let hasSelectionInProvider = false;
			const currentSelected = (hiddenInput.value || '').toLowerCase();
			regions.forEach(reg => {
				const regValue = provider.toLowerCase() + ':' + reg.id.toLowerCase();
				const isSelected = currentSelected === regValue;
				if (isSelected) hasSelectionInProvider = true;
				const btn = document.createElement('button');
				btn.type = 'button';
				btn.setAttribute('data-region', regValue);
				btn.className = 'placement-region-btn grid grid-cols-4 gap-2 items-center w-full text-center p-2 bg-white dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg hover:border-cyan-400 dark:hover:border-cyan-500/80 transition-all cursor-pointer shadow-sm text-[10px] sm:text-[11px] font-medium text-gray-800 dark:text-zinc-200';
				if (isSelected) {
					btn.classList.add('ring-2', 'ring-cyan-500', 'border-cyan-500', 'bg-cyan-50', 'dark:bg-cyan-900/20');
				}
				btn.onclick = function() {
					document.querySelectorAll('.placement-region-btn').forEach(b => b.classList.remove('ring-2', 'ring-cyan-500', 'border-cyan-500', 'bg-cyan-50', 'dark:bg-cyan-900/20'));
					this.classList.add('ring-2', 'ring-cyan-500', 'border-cyan-500', 'bg-cyan-50', 'dark:bg-cyan-900/20');
					hiddenInput.value = regValue;
					submitBtn.disabled = false;
				};
				btn.innerHTML = '<div class="text-center font-mono font-bold text-cyan-600 dark:text-cyan-400 truncate px-1 whitespace-nowrap overflow-hidden" title="' + reg.id + '">' + reg.id + '</div>' +
								'<div class="text-center truncate px-1" title="' + reg.name + '">' + reg.name + '</div>' +
								'<div class="flex justify-center items-center gap-1.5 truncate"><span class="text-sm">' + reg.emoji + '</span> <span class="truncate">' + reg.country + '</span></div>' +
								'<div class="text-center truncate px-1" title="' + reg.location + '">' + reg.location + '</div>';
				list.appendChild(btn);
			});
			if (!hasSelectionInProvider) {
				submitBtn.disabled = true;
			} else {
				submitBtn.disabled = false;
			}
		}
		async function submitPlacement(regionValue) {
			if (!regionValue) return;
			const btn = document.getElementById('placement-submit-btn');
			btn.innerHTML = '<svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> در حال دیپلوی...';
			btn.disabled = true;
			try {
				let isoCode = "";
				if (regionValue !== "smart" && regionValue !== "off" && regionValue !== "none" && !regionValue.startsWith("targeted")) {
					let foundCountry = null;
					for (const prov in PLACEMENT_DATA.providers) {
						const found = PLACEMENT_DATA.providers[prov].regions.find(r => (prov.toLowerCase() + ':' + r.id.toLowerCase()) === regionValue.toLowerCase());
						if (found) { foundCountry = found.country; break; }
					}
					if (foundCountry) {
						const countryToIso = { "United States": "US", "South Africa": "ZA", "Hong Kong": "HK", "Taiwan": "TW", "India": "IN", "Singapore": "SG", "Australia": "AU", "Indonesia": "ID", "Malaysia": "MY", "New Zealand": "NZ", "Thailand": "TH", "Japan": "JP", "South Korea": "KR", "Canada": "CA", "Germany": "DE", "Switzerland": "CH", "Ireland": "IE", "United Kingdom": "GB", "France": "FR", "Sweden": "SE", "Italy": "IT", "Spain": "ES", "Israel": "IL", "United Arab Emirates": "AE", "Bahrain": "BH", "Mexico": "MX", "Brazil": "BR", "Austria": "AT", "Belgium": "BE", "Chile": "CL", "Denmark": "DK", "Poland": "PL", "Qatar": "QA", "Norway": "NO", "Netherlands": "NL", "Finland": "FI", "Saudi Arabia": "SA" };
						isoCode = countryToIso[foundCountry] || "";
					}
				}
				let res = await fetch('/api/update-placement', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ region: regionValue, iso: isoCode })
				});
				let data = await res.json();
				if (res.status === 400 && data.error === "TOKEN_REQUIRED") {
					window.pendingCoreAction = 'update-placement-' + regionValue;
					toggleTokenModal(true);
					return;
				}
				if (res.ok && data.success) {
					showToast('✅ ریجن جدید با موفقیت اعمال و ورکر دیپلوی شد! در حال رفرش...');
					togglePlacementModal(false);
					setTimeout(() => window.location.reload(), 3000);
				} else {
					alert('❌ خطا در تغییر ریجن: ' + (data.error || 'ناشناخته'));
				}
			} catch (err) {
				alert('❌ خطا در ارتباط با سرور');
			} finally {
				btn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg> اعمال تغییرات و دیپلوی';
				btn.disabled = false;
			}
		}
async function openRocketModal(btn) {
	if (window.isQuickCreateLocked) {
		showToast('⏳ لطفاً کمی صبر کنید...', 'error');
		return;
	}
	activeRocketBtn = btn;
	toggleRocketModal(true);
	const grid = document.getElementById('rocket-country-grid');
	const submitBtn = document.getElementById('rocket-submit-btn');
	const hiddenInput = document.getElementById('rocket-selected-country');
	grid.innerHTML = '<div class="col-span-full text-center text-[11px] font-bold text-gray-500 py-4">در حال بررسی مخزن...</div>';
	hiddenInput.value = '';
	submitBtn.disabled = false;
	if (!cachedVipList || cachedVipList.length === 0) {
		await initVipCache();
	}
	if (cachedVipList && cachedVipList.length > 0) {
		grid.innerHTML = '';
		cachedVipList.forEach(function(country) {
			const flag = typeof getFlagEmoji === 'function' ? getFlagEmoji(country) : '🌐';
			const btnObj = document.createElement('button');
			btnObj.type = 'button';
			btnObj.className = 'rocket-country-btn flex flex-col items-center justify-center gap-1 p-1.5 bg-gray-50 dark:bg-amoled-input border border-gray-200 dark:border-amoled-border rounded-lg hover:border-orange-400 dark:hover:border-orange-500/80 transition-all cursor-pointer shadow-sm';
			btnObj.onclick = function() {
				document.querySelectorAll('.rocket-country-btn').forEach(b => {
					b.classList.remove('ring-2', 'ring-orange-500', 'border-orange-500', 'bg-orange-50', 'dark:bg-orange-900/20');
				});
				this.classList.add('ring-2', 'ring-orange-500', 'border-orange-500', 'bg-orange-50', 'dark:bg-orange-900/20');
				hiddenInput.value = country;
				submitBtn.disabled = false;
			};
			btnObj.innerHTML = '<span class="text-xl drop-shadow-sm leading-none flex items-center justify-center">' + flag + '</span><span class="text-[9px] font-black text-gray-700 dark:text-zinc-300 uppercase">' + country + '</span>';
			grid.appendChild(btnObj);
		});
	} else {
		grid.innerHTML = '<div class="col-span-full text-center text-[11px] font-bold text-red-500 py-4">پـروکـسـی اختصاصی موجود نیست</div>';
	}
}
async function executeRocketCreate() {
	const hiddenInput = document.getElementById('rocket-selected-country');
	const country = hiddenInput.value;
	if (!country) {
		showToast('⚠️ لطفاً ابتدا یک کشور را از لیست انتخاب کنید!', 'error');
		return;
	}
	toggleRocketModal(false);
	if (window.isQuickCreateLocked) return;
	window.isQuickCreateLocked = true;
	const btn = activeRocketBtn;
	if (btn) btn.disabled = true;
	const icon = btn ? btn.querySelector('svg') : null;
	if (icon) {
		icon.classList.add('animate-spin');
		icon.classList.remove('group-hover:-translate-y-1', 'group-hover:translate-x-1');
	}
	try {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let randStr = '';
		for (let i = 0; i < 8; i++) randStr += chars.charAt(Math.floor(Math.random() * chars.length));
		const username = randStr;
		const lines = cachedVipProxies[country];
		if (!lines || lines.length === 0) {
			alert('هیچ پروکسی در این کشور یافت نشد.');
			return;
		}
		showToast('🚀 در حال اسکن پینگ ' + lines.length + ' پروکسی از کشور ' + country + '...');
		const controller = new AbortController();
		let successProxies = [];
		const testPromises = lines.map(async (proxyLine) => {
			await new Promise(r => setTimeout(r, Math.floor(Math.random() * 200)));
			try {
				const res = await fetch('/api/test-proxy', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ proxy: proxyLine, skip_country: true }), 
					signal: controller.signal
				});
				const data = await res.json();
				if (data.success && data.ping) {
					successProxies.push({ proxy: proxyLine, ping: data.ping });
				}
			} catch(e) {}
		});
		const timeoutPromise = new Promise(resolve => setTimeout(resolve, 12000));
		await Promise.race([Promise.all(testPromises), timeoutPromise]);
		controller.abort();
		if (successProxies.length === 0) {
			alert('خطا: هیچ پروکسی سالمی با پینگ موفق در این کشور یافت نشد.');
			return;
		}
		successProxies.sort((a, b) => a.ping - b.ping);
		const bestProxy = successProxies[0].proxy;
		await ensureIpsCache();
		await ensureDomainsCache();
		let ipsList = [];
		Object.values(cachedIpsData).forEach(ips => { ipsList = ipsList.concat(ips); });
		ipsList = [...new Set(ipsList)];
		let domList = [...new Set(cachedDomainsData)];
		const pickRandom = (list, num) => {
			if (list.length === 0) return [];
			if (num >= list.length) return list.slice();
			const shuffled = list.slice();
			for (let i = shuffled.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
			}
			return shuffled.slice(0, num);
		};
		let count = 30;
		let half = Math.ceil(count / 2);
		let otherHalf = count - half;
		let actualDomCount = Math.min(otherHalf, domList.length);
		let actualIpCount = Math.min(count - actualDomCount, ipsList.length);
		actualDomCount = Math.min(count - actualIpCount, domList.length);
		let sIps = pickRandom(ipsList, actualIpCount);
		let sDoms = pickRandom(domList, actualDomCount);
		let mixed = [...sIps, ...sDoms];
		let selectedIps = pickRandom(mixed, mixed.length);
		const ipsStr = selectedIps.join('\\n');
		const finalSocks5 = JSON.stringify([{ proxy: bestProxy, country: country }]);
		const response = await fetch('/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: username, limit_gb: null, expiry_days: null, limit_req: null, ip_limit: null,
				auto_reset_vol_days: 0, auto_reset_req_days: 0, frag_len: "", frag_int: "",
				fingerprint: "unsafe", block_ads: 1, block_porn: 0, port: "443", tls: "on",
				ips: ipsStr, ip_operator: "all|mixed", ip_count: 30, auto_rotate_ip: 1, rotate_time: 5,
				user_socks5: finalSocks5, auto_rotate_user_proxy: 1, connection_type: "vless", enable_direct: false
			})
		});
		if (response.ok) {
			showToast('🚀 کاربر تک کشوره با بهترین پینگ با موفقیت ایجاد شد.');
			await loadUsers(true);
		} else {
			const errData = await response.json();
			alert('خطا: ' + (errData.error || 'عملیات ناموفق بود'));
		}
	} catch(err) {
		alert('خطا در برقراری ارتباط با سرور');
	} finally {
		setTimeout(() => {
			window.isQuickCreateLocked = false;
			if (btn) {
				btn.disabled = false;
				if (icon) {
					icon.classList.remove('animate-spin');
					icon.classList.add('group-hover:-translate-y-1', 'group-hover:translate-x-1');
				}
			}
		}, 1000);
	}
}
		function openCreateModal() {
			isEditMode = false;
			editingUsername = '';
			document.getElementById('modal-title').innerText = 'ایجاد کاربر جدید';
			updateSubmitBtnState('ایجاد کاربر');
			document.getElementById('input-name').disabled = false;
			document.getElementById('create-user-form').reset();
			const vlessCb2 = document.getElementById('input-proto-vless');
			const trojanCb2 = document.getElementById('input-proto-trojan');
			const ssCb2 = document.getElementById('input-proto-ss');
			if (vlessCb2) vlessCb2.checked = true;
			if (trojanCb2) trojanCb2.checked = false;
			if (ssCb2) ssCb2.checked = false;
			const cb443 = document.querySelector('input[name="ports"][value="443"]');
			if (cb443) cb443.checked = true;
			const cb80 = document.querySelector('input[name="ports"][value="80"]');
			if (cb80) cb80.checked = false;
			const fpSelect = document.getElementById('fingerprint-select');
			if (fpSelect) fpSelect.value = 'unsafe';
			const fragToggle = document.getElementById('input-frag-toggle');
			if (fragToggle) fragToggle.checked = false;
			if (typeof window.toggleFragInputs === 'function') window.toggleFragInputs(false);
			const autoResetToggle = document.getElementById('input-auto-reset-toggle');
			if (autoResetToggle) autoResetToggle.checked = false;
			document.getElementById('input-auto-reset-vol').value = '';
			document.getElementById('input-auto-reset-req').value = '';
			window.toggleAutoResetInputs(false);
			const blockAdsToggle = document.getElementById('input-block-ads');
			if (blockAdsToggle) blockAdsToggle.checked = true;
			const autoRotateUserProxyCheck = document.getElementById('input-auto-rotate-user-proxy');
			if (autoRotateUserProxyCheck) autoRotateUserProxyCheck.checked = false;
			const startOnFirstConnectCheck = document.getElementById('input-start-on-first-connect');
			if (startOnFirstConnectCheck) startOnFirstConnectCheck.checked = false;
			const userProxyToggle = document.getElementById('user-proxy-mode-toggle');
			if (userProxyToggle) userProxyToggle.checked = false;
			if (typeof window.toggleUserProxyMode === 'function') window.toggleUserProxyMode(false);
			const enableDirectCheck = document.getElementById('input-enable-direct');
			if (enableDirectCheck) enableDirectCheck.checked = true;
			window.proxyFieldsData = [""];
			window.activeProxyIndex = 0;
			if (typeof window.renderProxyFieldsUI === 'function') window.renderProxyFieldsUI();
			const autoRotateIpToggle = document.getElementById('input-auto-rotate-ip-toggle');
			if (autoRotateIpToggle) autoRotateIpToggle.checked = false;
			document.getElementById('hidden-rotate-time').value = '';
			document.getElementById('hidden-ip-operator').value = 'all';
			document.getElementById('hidden-ip-count').value = '15';
			const savedDoms = localStorage.getItem('mili_ech_doms') || '';
			const savedDns = localStorage.getItem('mili_ech_dns') || '';
			const domArea = document.getElementById('input-ech-doms');
			const dnsArea = document.getElementById('input-ech-dns');
			if (domArea) domArea.value = savedDoms;
			if (dnsArea) dnsArea.value = savedDns;
			toggleModal(true);
			const echInput = document.getElementById('input-ech-value');
			if (echInput) echInput.value = 'cloudflare-ech.com+udp://1.1.1.1';
			const chkUdp = document.getElementById('chk-ech-udp');
			const chkTcp = document.getElementById('chk-ech-tcp');
			const chkDoh = document.getElementById('chk-ech-doh');
			if (chkUdp) chkUdp.checked = true;
			if (chkTcp) chkTcp.checked = false;
			if (chkDoh) chkDoh.checked = false;
			const echToggle = document.getElementById('input-ech-settings-toggle');
			if (echToggle) echToggle.checked = false;
			if (typeof window.toggleEchSettingsInputs === 'function') window.toggleEchSettingsInputs(false);
		}
		const themeToggleBtn = document.getElementById('theme-toggle');
		themeToggleBtn.addEventListener('click', async () => {
			let newTheme = 'dark';
			if (document.documentElement.classList.contains('dark')) {
				document.documentElement.classList.remove('dark');
				newTheme = 'light';
			} else {
				document.documentElement.classList.add('dark');
			}
			localStorage.setItem('color-theme', newTheme);
			try {
				await fetch('/api/settings/bulk', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ settings: { panel_theme: newTheme } })
				});
			} catch (e) {}
		});
		const grayscaleToggleBtn = document.getElementById('grayscale-toggle');
		if (grayscaleToggleBtn) {
			grayscaleToggleBtn.addEventListener('click', () => {
				if (document.documentElement.classList.contains('grayscale-active')) {
					document.documentElement.classList.remove('grayscale-active');
					localStorage.setItem('grayscale-theme', 'false');
				} else {
					document.documentElement.classList.add('grayscale-active');
					localStorage.setItem('grayscale-theme', 'true');
				}
			});
		}
		async function handleCoreAction(actionType, token = null) {
			window.pendingCoreAction = actionType;
			const isUpdate = actionType === 'update';
			if (!isUpdate && !await customConfirm('آیا از ری استارت پـنـل مطمئن هستید؟ کاربران شما لحظه ای قطع خواهند شد.')) return;
			if (isUpdate && !token) toggleUpdateModal(false);
			const btn = isUpdate ? document.getElementById('update-toggle') : document.querySelector('button[title="ری استارت پـنـل"]');
			if (btn) {
				btn.disabled = true;
				if (!isUpdate) btn.classList.add('animate-pulse');
			}
			if (isUpdate && !token) alert('در حال دریافت و اعمال آپدیت... لطفاً چند ثانیه صبر کنید.');
			try {
				const reqBody = token ? JSON.stringify({ cf_token: token }) : "{}";
				const res = await fetch(isUpdate ? '/api/update-panel' : '/api/restart-core', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: isUpdate ? reqBody : undefined
				});
				const data = await res.json();
				if (res.status === 400 && data.error === "TOKEN_REQUIRED") {
					toggleTokenModal(true);
					if (btn) {
						btn.disabled = false;
						if (!isUpdate) btn.classList.remove('animate-pulse');
					}
					return;
				}
				if (res.ok && data.success) {
					if (isUpdate) {
						const successModal = document.getElementById('update-success-modal');
						const successCard = successModal.querySelector('div');
						successModal.classList.remove('opacity-0', 'pointer-events-none');
						successModal.classList.add('opacity-100', 'pointer-events-auto');
						successCard.classList.remove('opacity-0', 'scale-95');
						successCard.classList.add('opacity-100', 'scale-100');
						setTimeout(() => {
							sessionStorage.setItem('mili_last_update', Date.now());
							window.location.href = window.location.pathname + '?t=' + Date.now();
						}, 10000);
					} else {
						alert('پـنـل ری استارت شد صفحه رفرش می شود.');
						window.location.href = window.location.pathname + '?t=' + Date.now();
					}
				} else {
					alert(isUpdate ? 'خطا در بروزرسانی. لطفاً با استفاده از " ربات" اقدام کنید.' : 'خطا در ری‌استارت پـنـل: ' + (data.error || 'ناشناخته'));
					if (btn) {
						btn.disabled = false;
						if (!isUpdate) btn.classList.remove('animate-pulse');
					}
				}
			} catch (err) {
				alert(isUpdate ? 'خطا لطفا از طریق ربات اقدام کنید' : 'خطا در ارتباط با سرور.');
				if (btn) {
					btn.disabled = false;
					if (!isUpdate) btn.classList.remove('animate-pulse');
				}
			}
		}
		async function restartCore() {
			await handleCoreAction('restart');
		}
		async function loadUsers(silent = false) {
			if (window.isDraggingRow) return; 
			const loadingState = document.getElementById('loading-state');
			const tableContainer = document.getElementById('users-table-container');
			const emptyState = document.getElementById('empty-state');
			if (!silent) {
				loadingState.classList.remove('hidden');
				tableContainer.classList.add('hidden');
				emptyState.classList.add('hidden');
			}
			try {
				const res = await fetch('/api/users?t=' + Date.now());
				if (!res.ok) throw new Error();
				const data = await res.json();
				renderUsersUI(data);
			} catch (err) {
				if (!silent) {
					loadingState.innerHTML = '<span class="text-red-500">خطا در دریافت اطلاعات از سرور</span>';
				}
			}
		}
		function renderUsersUI(data) {
			try {
				if (data.error) {
					let errorText = data.error;
					if (errorText.toLowerCase().includes('d1') && (errorText.toLowerCase().includes('limit') || errorText.toLowerCase().includes('exceeded'))) {
						errorText = 'سهمیه دیتابیس شما تمام شده و ساعت 3:30 درست میشه';
					}
					document.getElementById('loading-state').innerHTML = '<span class="text-red-500 font-bold px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg inline-block">❌ ' + errorText + '</span>';
					document.getElementById('loading-state').classList.remove('hidden');
					document.getElementById('users-table-container').classList.add('hidden');
					document.getElementById('empty-state').classList.add('hidden');
					return;
				}
				const users = data.users || [];
				window.smoothCache = window.smoothCache || {};
				const nowMs = Date.now();
				users.forEach(u => {
					let cache = window.smoothCache[u.username];
					if (!cache) {
						cache = { gb: u.used_gb, req: u.used_req, onlineHistory: [] };
					}
					if (u.used_gb < cache.gb && (cache.gb - u.used_gb) < 2.0) {
						u.used_gb = cache.gb;
					} else {
						cache.gb = u.used_gb;
					}
					if (u.used_req < cache.req && (cache.req - u.used_req) < 20000) {
						u.used_req = cache.req;
					} else {
						cache.req = u.used_req;
					}
					cache.onlineHistory = cache.onlineHistory.filter(h => nowMs - h.time <= 10000);
					cache.onlineHistory.push({ time: nowMs, count: u.online_count || 0 });
					u.online_count = Math.max(...cache.onlineHistory.map(h => h.count));
					window.smoothCache[u.username] = cache;
				});
				window.allUsers = users;
				const serverTime = data.serverTime || Date.now();
				window.lastServerTime = serverTime;
				const totalUsersCount = users.length;
				const activeUsersCount = users.reduce((sum, u) => sum + (u.online_count || 0), 0);
				const deletedGb = data.deletedGb || 0;
				const totalGbUsage = deletedGb + users.reduce((sum, u) => sum + (u.lifetime_used_gb || u.used_gb || 0), 0);
				document.getElementById('stat-total-users').innerText = totalUsersCount;
				document.getElementById('stat-active-users').innerText = activeUsersCount;
				document.getElementById('stat-total-usage').innerText = totalGbUsage < 1 ? (totalGbUsage * 1024).toFixed(0) + ' MB' : totalGbUsage.toFixed(2) + ' GB';
				const d1Reads = data.d1Reads || 0;
				const d1Writes = data.d1Writes || 0;
				const d1WritesEl = document.getElementById('stat-d1-writes');
				if (d1WritesEl) d1WritesEl.innerText = d1Writes >= 1000 ? (d1Writes / 1000).toFixed(1) + 'k' : d1Writes;
				const d1ReadsEl = document.getElementById('stat-d1-reads');
				if (d1ReadsEl) d1ReadsEl.innerText = d1Reads >= 1000000 ? (d1Reads / 1000000).toFixed(2) + 'M' : (d1Reads >= 1000 ? (d1Reads / 1000).toFixed(1) + 'k' : d1Reads);
				const rawCfRequests = data.cfRequestsToday || 0;
				window.maxCfRequestsToday = Math.max(window.maxCfRequestsToday || 0, rawCfRequests);
				const cfRequests = window.maxCfRequestsToday;
				const reqCard = document.getElementById('card-cf-requests');
				const warningBtn = document.getElementById('cf-warning-btn');
				if (cfRequests >= 90000) {
					if (reqCard) {
						reqCard.className = "bg-red-50 dark:bg-red-950/20 border border-red-500 rounded-md p-2.5 shadow-[0_0_15px_rgba(239,68,68,0.4)] flex flex-col justify-center gap-1 hover:shadow-md transition duration-300 relative overflow-hidden group min-h-[64px] animate-pulse";
					}
					if (warningBtn) {
						warningBtn.classList.remove('hidden');
					}
					if (!window.hasShownUsageWarning) {
						openUsageWarning();
						window.hasShownUsageWarning = true;
					}
				} else {
					if (reqCard) {
						reqCard.className = "bg-white dark:bg-amoled-card border border-gray-200 dark:border-amoled-border rounded-md p-2.5 shadow-sm flex flex-col justify-center gap-1 hover:shadow-md hover:border-orange-400 dark:hover:border-orange-500/50 transition duration-300 relative overflow-hidden group min-h-[64px]";
					}
					if (warningBtn) {
						warningBtn.classList.add('hidden');
					}
				}
				const rawCfTotal = data.cfRequestsTotal || 0;
				window.maxCfTotal = Math.max(window.maxCfTotal || 0, rawCfTotal);
				const cfTotal = window.maxCfTotal;
				document.getElementById('stat-cf-requests').innerText = cfRequests >= 1000 ? (cfRequests / 1000).toFixed(1) + 'k' : cfRequests;
				document.getElementById('stat-cf-total').innerText = cfTotal >= 1000000 ? (cfTotal / 1000000).toFixed(2) + 'M' : (cfTotal >= 1000 ? (cfTotal / 1000).toFixed(1) + 'k' : cfTotal);
				const progressPercent = Math.min((cfRequests / 100000) * 100, 100);
				document.getElementById('stat-cf-progress').style.width = progressPercent + '%';
				filterAndRenderUsers();
			} catch (err) {
				document.getElementById('loading-state').innerHTML = '<span class="text-red-500">خطا در پردازش اطلاعات کاربران</span>';
			}
		}
		function filterAndRenderUsers() {
			if (!window.allUsers) return;
			const searchQuery = (document.getElementById('search-input').value || '').toLowerCase().trim();
			const filterStatus = document.getElementById('filter-status').value;
			const sortVal = document.getElementById('sort-users').value;
			const serverTime = window.lastServerTime || Date.now();
			let filtered = [...window.allUsers];
			if (searchQuery) {
				filtered = filtered.filter(u => 
					(u.username || '').toLowerCase().includes(searchQuery) || 
					(u.uuid || '').toLowerCase().includes(searchQuery)
				);
			}
			if (filterStatus !== 'all') {
				filtered = filtered.filter(u => {
					const isOnline = u.is_online === 1;
					const isActive = u.is_active === 1;
					let isExpired = false;
					if (u.limit_gb && u.used_gb >= u.limit_gb) isExpired = true;
					if (u.expiry_days) {
						if (u.start_on_first_connect === 1) {
							if (u.first_connection_time) {
								const expiryDate = new Date(u.first_connection_time + (u.expiry_days * 24 * 60 * 60 * 1000));
								if (new Date(serverTime) > expiryDate) isExpired = true;
							}
						} else if (u.created_at) {
							const created = new Date(u.created_at);
							const expiryDate = new Date(created.getTime() + (u.expiry_days * 24 * 60 * 60 * 1000));
							if (new Date(serverTime) > expiryDate) isExpired = true;
						}
					}
					if (filterStatus === 'active') return isActive && !isExpired;
					if (filterStatus === 'inactive') return !isActive;
					if (filterStatus === 'online') return isOnline;
					if (filterStatus === 'offline') return !isOnline;
					if (filterStatus === 'expired') return isExpired || !isActive;
					return true;
				});
			}
			const customOrderStr = localStorage.getItem('mili_users_custom_order');
			let customOrder = [];
			try { customOrder = JSON.parse(customOrderStr || '[]'); } catch(e) {}
			filtered.sort((a, b) => {
				if (sortVal === 'newest' && customOrder.length > 0) {
					const indexA = customOrder.indexOf(a.username);
					const indexB = customOrder.indexOf(b.username);
					if (indexA !== -1 && indexB !== -1) return indexA - indexB;
					if (indexA !== -1) return -1;
					if (indexB !== -1) return 1;
				}
				if (sortVal === 'newest') {
					return b.id - a.id;
				}
				if (sortVal === 'name') {
					return (a.username || '').localeCompare(b.username || '');
				}
				if (sortVal === 'usage-desc') {
					return (b.used_gb || 0) - (a.used_gb || 0);
				}
				if (sortVal === 'usage-asc') {
					return (a.used_gb || 0) - (b.used_gb || 0);
				}
				if (sortVal === 'expiry-asc') {
					const getRemaining = (u) => {
						if (!u.expiry_days) return Infinity;
						if (u.start_on_first_connect === 1) {
							if (!u.first_connection_time) return u.expiry_days * 86400000;
							const expiryDate = new Date(u.first_connection_time + (u.expiry_days * 86400000));
							return expiryDate - new Date(serverTime);
						}
						if (!u.created_at) return Infinity;
						const created = new Date(u.created_at);
						const expiryDate = new Date(created.getTime() + (u.expiry_days * 86400000));
						return expiryDate - new Date(serverTime);
					};
					return getRemaining(a) - getRemaining(b);
				}
				return 0;
			});
			renderFilteredUsers(filtered, serverTime);
		}
		function renderFilteredUsers(users, serverTime) {
			const loadingState = document.getElementById('loading-state');
			const tableContainer = document.getElementById('users-table-container');
			const emptyState = document.getElementById('empty-state');
			const tbody = document.getElementById('users-tbody');
			if (users.length === 0) {
					loadingState.classList.add('hidden');
					emptyState.classList.remove('hidden');
					tableContainer.classList.add('hidden');
					emptyState.querySelector('p').className = 'text-red-600 dark:text-red-400 font-bold text-lg flex items-center justify-center flex-wrap gap-2 leading-loose';
					if (window.allUsers && window.allUsers.length > 0) {
						emptyState.querySelector('p').innerHTML = 'کاربری با مشخصات جستجو شده یافت نشد.';
					} else {
						emptyState.querySelector('p').innerHTML = '<span>کاربری وجود ندارد. برای ساخت کاربر روی</span>' +
							'<span class="inline-flex items-center justify-center p-1.5 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-600 dark:border-green-700/60 text-green-700 dark:text-green-400 shadow-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg></span>' +
							'<span>کلیک کنید یا از دکمه‌های</span>' +
							'<span class="inline-flex items-center justify-center p-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-500 text-cyan-600 dark:text-cyan-400 shadow-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg></span>' +
							'<span>،</span>' +
							'<span class="inline-flex items-center justify-center p-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-500 text-orange-600 dark:text-orange-400 shadow-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg></span>' +
							'<span>و</span>' +
							'<span class="inline-flex items-center justify-center p-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-sm"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span>' +
							'<span>برای ایجاد سریع استفاده کنید.</span>';
					}
			} else {
				loadingState.classList.add('hidden');
				emptyState.classList.add('hidden');
				tableContainer.classList.remove('hidden');
				let proxyFlagCache = {};
				try { proxyFlagCache = JSON.parse(localStorage.getItem('proxy_flag_cache_v2') || '{}'); } catch(e) {}
				tbody.innerHTML = users.map(user => {
					let daysRemaining = 'نامحدود';
					let daysPercent = 100;
					let isTimerPending = false;
					if (user.expiry_days) {
						if (user.start_on_first_connect === 1) {
							if (!user.first_connection_time) {
								daysRemaining = user.expiry_days;
								daysPercent = 100;
								isTimerPending = true;
							} else {
								const expiryDate = new Date(user.first_connection_time + (user.expiry_days * 24 * 60 * 60 * 1000));
								const diffDays = Math.ceil((expiryDate - new Date(serverTime)) / (1000 * 60 * 60 * 24));
								daysRemaining = diffDays > 0 ? diffDays : 0;
								daysPercent = Math.max(0, Math.min(100, (daysRemaining / user.expiry_days) * 100));
							}
						} else if (user.created_at) {
							const created = new Date(user.created_at);
							const expiryDate = new Date(created.getTime() + (user.expiry_days * 24 * 60 * 60 * 1000));
							const diffDays = Math.ceil((expiryDate - new Date(serverTime)) / (1000 * 60 * 60 * 24));
							daysRemaining = diffDays > 0 ? diffDays : 0;
							daysPercent = Math.max(0, Math.min(100, (daysRemaining / user.expiry_days) * 100));
						} else {
							daysRemaining = user.expiry_days;
						}
					}
					const usedGb = user.used_gb || 0;
					const formattedUsed = usedGb < 1 ? (usedGb * 1024).toFixed(0) + ' MB' : usedGb.toFixed(2) + ' GB';
					const usedReq = user.used_req || 0;
					let reqHtml = '';
					if (user.limit_req) {
						const reqPercent = Math.min((usedReq / user.limit_req) * 100, 100);
						const reqHue = 120 - (reqPercent * 1.2);
						reqHtml = '<div class="flex flex-col gap-1.5 w-full min-w-[65px] max-w-[90px] mx-auto select-none">' +
							'<div class="relative flex flex-row items-center justify-between text-[9px] text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">' +
								'<span class="text-gray-800 dark:text-zinc-200 leading-none font-bold z-10" dir="ltr">' + usedReq.toLocaleString() + '</span>' +
								'<button data-user="' + encodeURIComponent(user.username) + '" data-action="req" onclick="resetUserData(this.dataset.user, this.dataset.action)" title="ریست" class="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 flex items-center justify-center bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-md border border-amber-200 dark:border-amber-800 transition shadow-sm cursor-pointer z-20"><svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>' +
								'<span class="leading-none font-bold z-10" dir="ltr">' + user.limit_req.toLocaleString() + '</span>' +
							'</div>' +
							'<div class="w-full h-1.5 bg-gray-300 dark:bg-zinc-700 rounded-full overflow-hidden shadow-inner">' +
								'<div class="h-full rounded-full transition-all duration-500" style="width: ' + reqPercent + '%; background-color: hsl(' + reqHue + ', 80%, 45%)"></div>' +
							'</div>' +
						'</div>';
					} else {
						reqHtml = '<div class="flex flex-col gap-1.5 w-full min-w-[65px] max-w-[90px] mx-auto select-none">' +
							'<div class="relative flex flex-row items-center justify-between text-[9px] text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">' +
								'<span class="text-gray-800 dark:text-zinc-200 leading-none font-bold z-10" dir="ltr">' + usedReq.toLocaleString() + '</span>' +
								'<button data-user="' + encodeURIComponent(user.username) + '" data-action="req" onclick="resetUserData(this.dataset.user, this.dataset.action)" title="ریست" class="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 flex items-center justify-center bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-md border border-amber-200 dark:border-amber-800 transition shadow-sm cursor-pointer z-20"><svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>' +
								'<span class="leading-none text-[12px] font-bold z-10">∞</span>' +
							'</div>' +
							'<div class="w-full h-1.5 bg-gray-300 dark:bg-zinc-700 rounded-full overflow-hidden shadow-inner">' +
								'<div class="w-full h-full bg-blue-500 rounded-full transition-all duration-500"></div>' +
							'</div>' +
						'</div>';
					}
					let volumeHtml = '';
					if (user.limit_gb) {
						const limitPercent = Math.min((usedGb / user.limit_gb) * 100, 100);
						const limitHue = 120 - (limitPercent * 1.2);
						const formattedLimit = user.limit_gb < 1 ? (user.limit_gb * 1024).toFixed(0) + 'MB' : user.limit_gb + 'GB';
						const formattedUsedClean = usedGb < 1 ? (usedGb * 1024).toFixed(0) + 'MB' : usedGb.toFixed(2) + 'GB';
						volumeHtml = '<div class="flex flex-col gap-1.5 w-full min-w-[65px] max-w-[90px] mx-auto select-none">' +
							'<div class="relative flex flex-row items-center justify-between text-[9px] text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">' +
								'<span class="text-gray-800 dark:text-zinc-200 leading-none font-bold z-10" dir="ltr">' + formattedUsedClean + '</span>' +
								'<button data-user="' + encodeURIComponent(user.username) + '" data-action="volume" onclick="resetUserData(this.dataset.user, this.dataset.action)" title="ریست" class="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 flex items-center justify-center bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-md border border-amber-200 dark:border-amber-800 transition shadow-sm cursor-pointer z-20"><svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>' +
								'<span class="leading-none font-bold z-10" dir="ltr">' + formattedLimit + '</span>' +
							'</div>' +
							'<div class="w-full h-1.5 bg-gray-300 dark:bg-zinc-700 rounded-full overflow-hidden shadow-inner">' +
								'<div class="h-full rounded-full transition-all duration-500" style="width: ' + limitPercent + '%; background-color: hsl(' + limitHue + ', 80%, 45%)"></div>' +
							'</div>' +
						'</div>';
					} else {
						const formattedUsedClean = usedGb < 1 ? (usedGb * 1024).toFixed(0) + 'MB' : usedGb.toFixed(2) + 'GB';
						volumeHtml = '<div class="flex flex-col gap-1.5 w-full min-w-[65px] max-w-[90px] mx-auto select-none">' +
							'<div class="relative flex flex-row items-center justify-between text-[9px] text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">' +
								'<span class="text-gray-800 dark:text-zinc-200 leading-none font-bold z-10" dir="ltr">' + formattedUsedClean + '</span>' +
								'<button data-user="' + encodeURIComponent(user.username) + '" data-action="volume" onclick="resetUserData(this.dataset.user, this.dataset.action)" title="ریست" class="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 flex items-center justify-center bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-md border border-amber-200 dark:border-amber-800 transition shadow-sm cursor-pointer z-20"><svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>' +
								'<span class="leading-none text-[12px] font-bold z-10">∞</span>' +
							'</div>' +
							'<div class="w-full h-1.5 bg-gray-300 dark:bg-zinc-700 rounded-full overflow-hidden shadow-inner">' +
								'<div class="w-full h-full bg-blue-500 rounded-full transition-all duration-500"></div>' +
							'</div>' +
						'</div>';
					}
					let expiryHtml = '';
					if (user.expiry_days) {
						const expiryHue = daysPercent * 1.2;
						const remainingLabel = isTimerPending ? '<span class="text-emerald-600 dark:text-[#00ff66] leading-none font-bold text-[8px] z-10" dir="rtl" title="شمارش پس از اولین اتصال آغاز می‌شود">' + daysRemaining + ' روز (اولین اتصال)</span>' : '<span class="text-gray-800 dark:text-zinc-200 leading-none font-bold z-10" dir="rtl">' + daysRemaining + ' روز</span>';
						expiryHtml = '<div class="flex flex-col gap-1.5 w-full min-w-[65px] max-w-[90px] mx-auto select-none">' +
							'<div class="relative flex flex-row items-center justify-between text-[9px] text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">' +
								remainingLabel +
								'<button data-user="' + encodeURIComponent(user.username) + '" data-action="time" onclick="resetUserData(this.dataset.user, this.dataset.action)" title="ریست" class="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 flex items-center justify-center bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-md border border-amber-200 dark:border-amber-800 transition shadow-sm cursor-pointer z-20"><svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>' +
								'<span class="leading-none font-bold z-10" dir="rtl">' + user.expiry_days + ' روز</span>' +
							'</div>' +
							'<div class="w-full h-1.5 bg-gray-300 dark:bg-zinc-700 rounded-full overflow-hidden shadow-inner flex justify-end">' +
								'<div class="h-full rounded-full transition-all duration-500" style="width: ' + daysPercent + '%; background-color: ' + (isTimerPending ? '#3b82f6' : 'hsl(' + expiryHue + ', 80%, 45%)') + '"></div>' +
							'</div>' +
						'</div>';
					} else {
						expiryHtml = '<div class="flex flex-col gap-1.5 w-full min-w-[65px] max-w-[90px] mx-auto select-none">' +
							'<div class="relative flex flex-row items-center justify-between text-[9px] text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">' +
								'<span class="text-gray-800 dark:text-zinc-200 leading-none font-bold text-[12px] z-10">∞</span>' +
								'<button data-user="' + encodeURIComponent(user.username) + '" data-action="time" onclick="resetUserData(this.dataset.user, this.dataset.action)" title="ریست" class="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 flex items-center justify-center bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-md border border-amber-200 dark:border-amber-800 transition shadow-sm cursor-pointer z-20"><svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button>' +
								'<span class="leading-none text-[12px] font-bold z-10">∞</span>' +
							'</div>' +
							'<div class="w-full h-1.5 bg-gray-300 dark:bg-zinc-700 rounded-full overflow-hidden shadow-inner">' +
								'<div class="w-full h-full bg-blue-500 rounded-full transition-all duration-500"></div>' +
							'</div>' +
						'</div>';
					}
					const onlineCount = user.online_count || 0;
					const limit = user.ip_limit !== undefined ? user.ip_limit : user.max_connections;
					let onlineHtml = '';
					if (limit) {
						const onlinePercent = Math.min((onlineCount / limit) * 100, 100);
						const onlineHue = 120 - (onlinePercent * 1.2);
						onlineHtml = '<div class="flex flex-col gap-1.5 w-full min-w-[65px] max-w-[90px] mx-auto select-none">' +
							'<div class="flex flex-row items-center justify-between text-[9px] text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">' +
								'<span class="text-gray-800 dark:text-zinc-200 leading-none font-bold" dir="ltr">' + onlineCount + '</span>' +
								'<span class="leading-none font-bold" dir="ltr">' + limit + '</span>' +
							'</div>' +
							'<div class="w-full h-1.5 bg-gray-300 dark:bg-zinc-700 rounded-full overflow-hidden shadow-inner">' +
								'<div class="h-full rounded-full transition-all duration-500" style="width: ' + onlinePercent + '%; background-color: hsl(' + onlineHue + ', 80%, 45%)"></div>' +
							'</div>' +
						'</div>';
					} else {
						onlineHtml = '<div class="flex flex-col gap-1.5 w-full min-w-[65px] max-w-[90px] mx-auto select-none">' +
							'<div class="flex flex-row items-center justify-between text-[9px] text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">' +
								'<span class="text-gray-800 dark:text-zinc-200 leading-none font-bold" dir="ltr">' + onlineCount + '</span>' +
								'<span class="leading-none text-[12px] font-bold">∞</span>' +
							'</div>' +
							'<div class="w-full h-1.5 bg-gray-300 dark:bg-zinc-700 rounded-full overflow-hidden shadow-inner">' +
								'<div class="h-full ' + (onlineCount > 0 ? 'bg-green-600' : 'bg-gray-400') + ' rounded-full transition-all duration-500" style="width: 100%"></div>' +
							'</div>' +
						'</div>';
					}
					let isExpired = false;
					if (user.limit_gb && (user.used_gb || 0) >= user.limit_gb) isExpired = true;
					if (user.limit_req && (user.used_req || 0) >= user.limit_req) isExpired = true;
					if (user.expiry_days) {
						if (user.start_on_first_connect === 1) {
							if (user.first_connection_time) {
								const expiryDate = new Date(user.first_connection_time + (user.expiry_days * 24 * 60 * 60 * 1000));
								if (new Date(serverTime) > expiryDate) isExpired = true;
							}
						} else if (user.created_at) {
							const created = new Date(user.created_at);
							const expiryDate = new Date(created.getTime() + (user.expiry_days * 24 * 60 * 60 * 1000));
							if (new Date(serverTime) > expiryDate) isExpired = true;
						}
					}
					const isEffectivelyActive = user.is_active !== 0 && !isExpired;
					const statusBtnClass = user.is_active === 0 
						? 'bg-green-50 dark:bg-green-950/40 border-green-300 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/60 text-green-600 dark:text-green-400' 
						: 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-600 dark:text-amber-400';
					const statusBtnTitle = user.is_active === 0 ? 'فعال کردن کاربر' : 'قطع کردن کاربر';
					const statusBtnIcon = user.is_active === 0 
						? '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
						: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
					const isChecked = (window.selectedUsernames && window.selectedUsernames.has(user.username)) ? 'checked' : '';
					let proxyList = [];
					try {
						if (user.user_socks5 && user.user_socks5.trim().startsWith("[")) {
							proxyList = JSON.parse(user.user_socks5);
						} else if (user.user_socks5 || user.user_proxy_ip) {
							proxyList = [user.user_socks5 || user.user_proxy_ip];
						}
					} catch(e) {
						if (user.user_socks5 || user.user_proxy_ip) {
							proxyList = [user.user_socks5 || user.user_proxy_ip];
						}
					}
					let allFlagsHtml = [];
					if (user.enable_direct !== 0 && user.user_proxy_iata) {
						const iata = user.user_proxy_iata.toUpperCase();
						const flag = typeof getFlagEmoji === 'function' ? getFlagEmoji(iata) : '<span class="mili-flag-globe">🌐</span>';
						allFlagsHtml.push('<span title="مستقیم (پنل): ' + iata + '" class="leading-none flex items-center justify-center">' + flag + '</span>');
					} else if (user.enable_direct !== 0) {
						allFlagsHtml.push('<span title="مستقیم (هوشمند/دیفالت)" class="leading-none flex items-center justify-center"><span class="mili-flag-globe">🌐</span></span>');
					}
					if (proxyList.length > 0 && proxyList[0]) {
						proxyList.forEach(item => {
							const targetProxy = typeof item === 'object' && item !== null ? item.proxy : item;
							const targetCountry = typeof item === 'object' && item !== null ? item.country : null;
							if (targetCountry && typeof getFlagEmoji === 'function') {
								allFlagsHtml.push('<span title="پروکسی: ' + targetCountry + '" class="leading-none flex items-center justify-center">' + getFlagEmoji(targetCountry) + '</span>');
							} else {
								const cachedFlag = proxyFlagCache[targetProxy];
								if (cachedFlag && typeof cachedFlag === 'string' && /^[a-zA-Z]{2}$/.test(cachedFlag) && typeof getFlagEmoji === 'function') {
									allFlagsHtml.push('<span title="پروکسی اختصاصی" class="leading-none flex items-center justify-center">' + getFlagEmoji(cachedFlag) + '</span>');
								} else {
									allFlagsHtml.push('<span data-proxy="' + targetProxy + '" title="پروکسی نامشخص" class="async-proxy-flag leading-none flex items-center justify-center">⏳</span>');
								}
							}
						});
					}
					let numFlags = allFlagsHtml.length;
					let layout = [];
					if (numFlags === 1) layout = [1];
					else if (numFlags === 2) layout = [2];
					else if (numFlags === 3) layout = [3];
					else if (numFlags === 4) layout = [2, 2];
					else if (numFlags === 5) layout = [3, 2];
					else if (numFlags === 6) layout = [3, 3];
					else if (numFlags === 7) layout = [4, 3];
					else if (numFlags === 8) layout = [4, 4];
					else if (numFlags === 9) layout = [5, 4];
					else if (numFlags === 10) layout = [4, 4, 2];
					else if (numFlags === 11) layout = [4, 4, 3];
					else if (numFlags === 12) layout = [4, 4, 4];
					else if (numFlags === 13) layout = [5, 5, 3];
					else if (numFlags === 14) layout = [5, 5, 4];
					else {
						let remaining = numFlags;
						while (remaining > 0) {
							layout.push(Math.min(remaining, 5));
							remaining -= 5;
						}
					}
					let flagSizeClass = 'text-base';
					if (numFlags > 12) flagSizeClass = 'text-[9px] [&>span]:text-[9px] [&_.mili-flag-globe]:text-[11px]';
					else if (numFlags >= 9) flagSizeClass = 'text-[10px] [&>span]:text-[10px] [&_.mili-flag-globe]:text-[12px]';
					else if (numFlags > 4) flagSizeClass = 'text-xs [&>span]:text-xs [&_.mili-flag-globe]:text-[14px]';
					else flagSizeClass = 'text-base [&>span]:text-base [&_.mili-flag-globe]:text-[18px]';
					allFlagsHtml = allFlagsHtml.map(html => html.replace('class="', 'class="' + flagSizeClass + ' '));
					let rowsHtml = '';
					let startIndex = 0;
					for (let r = 0; r < layout.length; r++) {
						let rowCount = layout[r];
						let rowItems = allFlagsHtml.slice(startIndex, startIndex + rowCount).join('');
						rowsHtml += '<div class="flex justify-center gap-0.5">' + rowItems + '</div>';
						startIndex += rowCount;
					}
					let locBadge = '';
					if (allFlagsHtml.length > 0) {
						locBadge = '<div class="flex flex-col gap-0.5 justify-center items-center mt-1 w-max mx-auto drop-shadow-sm" dir="ltr">' + rowsHtml + '</div>';
					}
					let proxyListConfig = [];
					try {
						if (user.user_socks5 && user.user_socks5.trim().startsWith("[")) {
							proxyListConfig = JSON.parse(user.user_socks5);
						} else if (user.user_socks5 || user.user_proxy_ip) {
							proxyListConfig = [user.user_socks5 || user.user_proxy_ip];
						} else {
							proxyListConfig = [null];
						}
					} catch(e) {
						proxyListConfig = [user.user_socks5 || user.user_proxy_ip];
					}
					if (!Array.isArray(proxyListConfig) || proxyListConfig.length === 0) proxyListConfig = [];
					const allowDirectConfig = user.enable_direct !== 0;
					if (allowDirectConfig) {
						let hasDir = proxyListConfig.some(function(p) { return p === null || p === ""; });
						if (!hasDir) proxyListConfig.push(null);
					} else {
						proxyListConfig = proxyListConfig.filter(function(p) { return p !== null && p !== ""; });
					}
					if (proxyListConfig.length === 0) proxyListConfig = [null];
					let numProxies = proxyListConfig.length;
					let numIps = user.ips ? user.ips.split('\\n').filter(function(ip) { return ip.trim().length > 0; }).length : 1;
					if (numIps === 0) numIps = 1;
					let numPorts = String(user.port || '443').split(',').filter(function(p) { return p.trim().length > 0; }).length;
					if (numPorts === 0) numPorts = 1;
					let numEch = user.ech ? user.ech.split(',').filter(function(e) { return e.trim().length > 0; }).length : 1;
					if (numEch === 0) numEch = 1;
					const userConnType = String(user.connection_type || 'vless').toLowerCase();
					const enableVless = userConnType.includes('vless') || userConnType === 'vl' + 'e' + 'ss' || (!userConnType.includes('trojan') && !userConnType.includes('shadowsocks'));
					const enableTrojan = userConnType.includes('trojan');
					const enableSS = userConnType.includes('shadowsocks');
					const protoCount = (enableVless ? 1 : 0) + (enableTrojan ? 1 : 0) + (enableSS ? 1 : 0);
					let totalConfigs = 3 + (numProxies * numIps * numPorts * (protoCount || 1) * numEch);
					let configColorClass = 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800';
					if (totalConfigs > 100) configColorClass = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800';
					else if (totalConfigs > 80) configColorClass = 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800';
					else if (totalConfigs > 55) configColorClass = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
					else if (totalConfigs > 20) configColorClass = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
					let configsCountHtml = '<span class="inline-flex items-center justify-center min-w-[28px] px-2 h-6 text-xs font-black rounded-md shadow-sm ' + configColorClass + '" dir="ltr">' + totalConfigs + '</span>';
					return '<tr class="group transition-all drop-shadow-sm bg-white dark:bg-amoled-card md:bg-white/40 md:dark:bg-amoled-card/40 block md:table-row mb-4 md:mb-0 border border-gray-200 dark:border-amoled-border md:border-none rounded-xl md:rounded-none overflow-visible md:overflow-hidden relative shadow-sm md:shadow-none" data-username="' + user.username + '">' +
								'<td class="block md:hidden p-4">' +
									'<div class="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-amoled-border mb-3">' +
										'<div class="flex items-center gap-2.5 flex-1 min-w-0 pl-2">' +
											'<input type="checkbox" name="select-user" value="' + encodeURIComponent(user.username) + '" onchange="onUserSelectChange(this)" ' + isChecked + ' class="w-4 h-4 rounded border-2 border-gray-300 dark:border-zinc-700 text-green-600 bg-white dark:bg-zinc-900 checked:bg-green-600 checked:border-green-600 focus:ring-green-500/50 focus:ring-offset-0 transition-all cursor-pointer flex-shrink-0" style="filter: none !important; accent-color: #16a34a !important;">' +
											(!isEffectivelyActive ? '<span class="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)] flex-shrink-0"></span>' : (user.is_online === 1 ? '<span class="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)] flex-shrink-0 animate-pulse"></span>' : '<span class="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-zinc-600 flex-shrink-0"></span>')) +
											'<span class="font-black text-gray-900 dark:text-zinc-100 text-sm truncate max-w-[85px] min-[380px]:max-w-[120px]">' + user.username + '</span>' +
											'<div class="scale-90 origin-right flex-shrink-0">' + locBadge + '</div>' +
										'</div>' +
										'<div class="flex items-center flex-shrink-0">' +
											'<div class="grid grid-cols-2 gap-1.5">' +
												'<button data-user="' + encodeURIComponent(user.username) + '" onclick="copyConfig(this.dataset.user)" title="کپی کـانفـیگ" class="w-[28px] h-[28px] p-0 flex items-center justify-center bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-emerald-600 dark:text-[#00ff66] rounded-lg transition shadow-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></button>' +
												'<button data-user="' + encodeURIComponent(user.username) + '" onclick="editUser(this.dataset.user)" title="ویرایش" class="w-[28px] h-[28px] p-0 flex items-center justify-center bg-green-50 dark:bg-green-950/40 border border-green-300 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/60 text-green-600 dark:text-green-400 rounded-lg transition shadow-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>' +
												'<button data-user="' + encodeURIComponent(user.username) + '" onclick="deleteUser(this.dataset.user)" title="حذف" class="w-[28px] h-[28px] p-0 flex items-center justify-center bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 rounded-lg transition shadow-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>' +
												'<button data-user="' + encodeURIComponent(user.username) + '" onclick="toggleUserStatus(this.dataset.user)" title="' + statusBtnTitle + '" class="w-[28px] h-[28px] p-0 flex items-center justify-center border ' + statusBtnClass + ' rounded-lg transition shadow-sm">' + statusBtnIcon.replace('w-3.5 h-3.5', 'w-4 h-4') + '</button>' +
											'</div>' +
										'</div>' +
									'</div>' +
									'<div class="grid grid-cols-2 gap-x-6 gap-y-4 mb-4">' +
										'<div class="col-span-1 flex flex-col gap-1 [&>div]:!max-w-full"><span class="text-[10px] font-black text-emerald-600 dark:text-[#00ff66] text-center select-none">حجم</span>' + volumeHtml + '</div>' +
										'<div class="col-span-1 flex flex-col gap-1 [&>div]:!max-w-full"><span class="text-[10px] font-black text-fuchsia-600 dark:text-fuchsia-400 text-center select-none">زمان</span>' + expiryHtml + '</div>' +
										'<div class="col-span-1 flex flex-col gap-1 [&>div]:!max-w-full"><span class="text-[10px] font-black text-orange-600 dark:text-orange-400 text-center select-none">ریکوئست</span>' + reqHtml + '</div>' +
										'<div class="col-span-1 flex flex-col gap-1 [&>div]:!max-w-full"><span class="text-[10px] font-black text-green-600 dark:text-green-400 text-center select-none">متصل</span>' + onlineHtml + '</div>' +
									'</div>' +
									'<div class="flex flex-col gap-2 p-2.5 bg-gray-50/50 dark:bg-amoled-input/30 rounded-lg border border-gray-100 dark:border-amoled-border">' +
										'<div class="flex items-center justify-between w-full">' +
											'<div class="flex items-center gap-1 flex-1 min-w-0">' +
												'<span class="text-[10px] font-bold text-gray-500 dark:text-zinc-400">پروتکل:</span>' +
												'<div class="flex items-center gap-1 flex-wrap">' +
													(enableVless ? '<span class="inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-semibold rounded-md border border-blue-200 dark:border-blue-800 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">VLESS</span>' : '') +
													(enableTrojan ? '<span class="inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-semibold rounded-md border border-purple-200 dark:border-purple-800 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Trojan</span>' : '') +
													(enableSS ? '<span class="inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-semibold rounded-md border border-yellow-200 dark:border-yellow-800 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">SS</span>' : '') +
												'</div>' +
											'</div>' +
											'<div class="w-px h-5 bg-gray-300 dark:bg-zinc-700 mx-2 rounded-full"></div>' +
											'<div class="flex items-center justify-between gap-1 flex-1 min-w-0 pl-1">' +
												'<div class="flex items-center gap-1">' +
													'<span class="text-[10px] font-bold text-gray-500 dark:text-zinc-400">تعداد کانفیگ ها:</span>' +
													'<button type="button" onclick="openConfigCountWarning();" class="text-red-500 hover:text-red-400 transition-transform hover:scale-125 cursor-pointer inline-flex items-center" title="راهنما"><svg class="w-3.5 h-3.5 animate-pulse drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>' +
												'</div>' +
												configsCountHtml +
											'</div>' +
										'</div>' +
										'<div class="h-px w-full bg-gray-200 dark:bg-amoled-border my-0.5"></div>' +
										'<div class="flex items-start justify-between w-full">' +
											'<span class="text-[10px] font-bold text-gray-500 dark:text-zinc-400 mt-1 whitespace-nowrap">پورت‌ها:</span>' +
											'<div class="flex flex-col gap-1 items-end w-full">' +
												(function() {
													var pts = String(user.port || "").split(",").map(function(p){ return p.trim(); }).filter(function(p){ return p !== ""; });
													if (pts.length === 0) return "";
													var rowCount = Math.ceil(pts.length / 7);
													var itemsPerRow = Math.ceil(pts.length / rowCount);
													var rowsHtml = "";
													for (var i = 0; i < pts.length; i += itemsPerRow) {
														var chunk = pts.slice(i, i + itemsPerRow);
														rowsHtml += '<div class="flex items-center gap-1 justify-end w-full">' + chunk.map(function(p) {
															var isTls = tlsPorts.includes(p);
															var isNonTls = nonTlsPorts.includes(p);
															var colorClass = isTls ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800' : 
																			 isNonTls ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800' : 
																			 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
															return '<span class="inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-semibold rounded-md border ' + colorClass + '">' + p + '</span>';
														}).join("") + '</div>';
													}
													return rowsHtml;
												})() +
											'</div>' +
										'</div>' +
									'</div>' +
									'<div class="flex flex-col gap-1.5 w-full mt-3">' +
										'<div class="flex flex-row gap-1.5 w-full h-[32px]">' +
											'<button data-user="' + encodeURIComponent(user.username) + '" onclick="openStatusLink(this.dataset.user)" class="flex-1 h-[32px] p-0 flex items-center justify-center gap-1.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-500 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-lg text-[11px] font-bold transition border border-green-200 dark:border-green-800 whitespace-nowrap shadow-sm">' +
												'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg> صفحه وضعیت' +
											'</button>' +
											'<button data-user="' + encodeURIComponent(user.username) + '" onclick="copyYamlSubLink(this.dataset.user)" class="flex-1 h-[32px] p-0 flex items-center justify-center gap-1.5 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900/50 rounded-lg text-[11px] font-bold transition border border-pink-200 dark:border-pink-800 whitespace-nowrap shadow-sm">' +
												'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg> ساب YAML' +
											'</button>' +
										'</div>' +
										'<div class="flex flex-row gap-1.5 w-full h-[32px]">' +
											'<button data-user="' + encodeURIComponent(user.username) + '" onclick="copySubLink(this.dataset.user)" class="flex-1 h-[32px] p-0 flex items-center justify-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg text-[11px] font-bold transition border border-indigo-200 dark:border-indigo-800 whitespace-nowrap shadow-sm">' +
												'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg> ساب متنی' +
											'</button>' +
											'<button data-user="' + encodeURIComponent(user.username) + '" onclick="showSubQr(this.dataset.user)" title="QR ساب متنی" class="w-[32px] h-[32px] flex-shrink-0 p-0 flex items-center justify-center bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-lg transition border border-amber-200 dark:border-amber-800 shadow-sm">' +
												'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 19h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>' +
											'</button>' +
										'</div>' +
									'</div>' +
								'</td>' +
								'<td class="hidden md:table-cell bg-white/60 dark:bg-amoled-input/50 group-hover:bg-white/80 dark:group-hover:bg-amoled-border/50 p-1 rounded-r-xl border-y border-r border-gray-200 dark:border-amoled-border text-center select-none">' +
									'<div class="flex items-center justify-center gap-1.5">' +
										'<input type="checkbox" name="select-user" value="' + encodeURIComponent(user.username) + '" onchange="onUserSelectChange(this)" ' + isChecked + ' class="w-3.5 h-3.5 rounded border-2 border-gray-300 dark:border-zinc-700 text-green-600 bg-white dark:bg-zinc-900 checked:bg-green-600 checked:border-green-600 focus:ring-green-500/50 focus:ring-offset-0 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95" style="filter: none !important; accent-color: #16a34a !important;">' +
										'<span class="drag-handle text-gray-400 hover:text-gray-600 dark:hover:text-zinc-200 cursor-grab active:cursor-grabbing font-bold text-lg select-none px-0.5" title="جابجایی">☰</span>' +
									'</div>' +
								'</td>' +
								'<td class="hidden md:table-cell bg-white/60 dark:bg-amoled-input/50 group-hover:bg-white/80 dark:group-hover:bg-amoled-border/50 p-1.5 border-y border-gray-200 dark:border-amoled-border text-center">' +
									'<div class="flex flex-col items-center justify-center gap-1.5 w-full max-w-[120px] mx-auto select-none">' +
										'<div class="flex flex-row items-center justify-center gap-1">' +
											(!isEffectivelyActive ? '<span class="px-1 py-0 h-3.5 inline-flex items-center justify-center leading-none text-[9px] font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded">غیرفعال</span>' : '<span class="px-1 py-0 h-3.5 inline-flex items-center justify-center leading-none text-[9px] font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded">فعال</span>') +
											(user.is_online === 1 ? '<span class="px-1 py-0 h-3.5 inline-flex items-center justify-center leading-none text-[9px] font-medium bg-green-600 text-white rounded animate-pulse" dir="rtl">' + user.online_count + '</span>' : '<span class="px-1 py-0 h-3.5 inline-flex items-center justify-center leading-none text-[9px] font-medium bg-gray-200 text-gray-600 dark:bg-zinc-800 dark:text-zinc-400 rounded">آفلاین</span>') +
										'</div>' +
										'<span class="font-bold text-gray-900 dark:text-zinc-100 text-xs truncate max-w-full pt-0.5 leading-normal">' + user.username + '</span>' +
										locBadge +
									'</div>' +
								'</td>' +
								'<td class="hidden md:table-cell bg-white/60 dark:bg-amoled-input/50 group-hover:bg-white/80 dark:group-hover:bg-amoled-border/50 p-1.5 border-y border-gray-200 dark:border-amoled-border text-center">' +
									'<div class="grid grid-cols-2 gap-1 w-max mx-auto">' +
										'<button data-user="' + encodeURIComponent(user.username) + '" onclick="copyConfig(this.dataset.user)" title="کپی کـانفـیگ" class="w-[24px] h-[24px] p-0 flex items-center justify-center bg-blue-50  dark:bg-blue-950/40  border border-blue-300 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-emerald-600 dark:text-[#00ff66] rounded-md transition shadow-sm"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></button>' +
										'<button data-user="' + encodeURIComponent(user.username) + '" onclick="editUser(this.dataset.user)" title="ویرایش" class="w-[24px] h-[24px] p-0 flex items-center justify-center bg-green-50 dark:bg-green-950/40 border border-green-300 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/60 text-green-600 dark:text-green-400 rounded-md transition shadow-sm"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>' +
										'<button data-user="' + encodeURIComponent(user.username) + '" onclick="deleteUser(this.dataset.user)" title="حذف" class="w-[24px] h-[24px] p-0 flex items-center justify-center bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 rounded-md transition shadow-sm"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>' +
										'<button data-user="' + encodeURIComponent(user.username) + '" onclick="toggleUserStatus(this.dataset.user)" title="' + statusBtnTitle + '" class="w-[24px] h-[24px] p-0 flex items-center justify-center border ' + statusBtnClass + ' rounded-md transition shadow-sm">' + statusBtnIcon + '</button>' +
									'</div>' +
								'</td>' +
								'<td class="hidden md:table-cell bg-white/60 dark:bg-amoled-input/50 group-hover:bg-white/80 dark:group-hover:bg-amoled-border/50 p-1 border-y border-gray-200 dark:border-amoled-border text-xs text-center">' +
									'<div class="grid grid-flow-row gap-1 w-max mx-auto items-center">' +
										(enableVless ? '<span class="inline-flex items-center justify-center px-1.5 h-[18px] text-[10px] font-semibold rounded-md border border-blue-200 dark:border-blue-800 shadow-sm bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">VLESS</span>' : '') +
										(enableTrojan ? '<span class="inline-flex items-center justify-center px-1.5 h-[18px] text-[10px] font-semibold rounded-md border border-purple-200 dark:border-purple-800 shadow-sm bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Trojan</span>' : '') +
										(enableSS ? '<span class="inline-flex items-center justify-center px-1.5 h-[18px] text-[10px] font-semibold rounded-md border border-yellow-200 dark:border-yellow-800 shadow-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">SS</span>' : '') +
									'</div>' +
								'</td>' +
								'<td class="hidden md:table-cell bg-white/60 dark:bg-amoled-input/50 group-hover:bg-white/80 dark:group-hover:bg-amoled-border/50 p-1.5 border-y border-gray-200 dark:border-amoled-border">' +
									'<div class="flex flex-col gap-1 w-[115px] mx-auto">' +
										'<button data-user="' + encodeURIComponent(user.username) + '" onclick="openStatusLink(this.dataset.user)" class="w-full h-[20px] p-0 flex items-center justify-center gap-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-500 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-md text-[9px] font-bold transition border border-green-200 dark:border-green-800 whitespace-nowrap shadow-sm">' +
											'<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>' +
											'صفحه وضعیت' +
										'</button>' +
										'<div class="flex flex-row gap-1 w-full h-[20px]">' +
											'<button data-user="' + encodeURIComponent(user.username) + '" onclick="copySubLink(this.dataset.user)" class="flex-1 h-[20px] p-0 flex items-center justify-center gap-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-md text-[9px] font-bold transition border border-indigo-200 dark:border-indigo-800 whitespace-nowrap shadow-sm">' +
												'<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>' +
												'ساب متنی' +
											'</button>' +
											'<button data-user="' + encodeURIComponent(user.username) + '" onclick="showSubQr(this.dataset.user)" title="QR ساب متنی" class="w-[20px] h-[20px] flex-shrink-0 p-0 flex items-center justify-center bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-md transition border border-amber-200 dark:border-amber-800 shadow-sm">' +
												'<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 19h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>' +
											'</button>' +
										'</div>' +
										'<button data-user="' + encodeURIComponent(user.username) + '" onclick="copyYamlSubLink(this.dataset.user)" class="w-full h-[20px] p-0 flex items-center justify-center gap-1 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900/50 rounded-md text-[9px] font-bold transition border border-pink-200 dark:border-pink-800 whitespace-nowrap shadow-sm">' +
											'<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>' +
											'ساب YAML' +
										'</button>' +
									'</div>' +
								'</td>' +
								'<td class="hidden md:table-cell bg-white/60 dark:bg-amoled-input/50 group-hover:bg-white/80 dark:group-hover:bg-amoled-border/50 p-1 border-y border-gray-200 dark:border-amoled-border text-center">' + configsCountHtml + '</td>' +
								'<td class="hidden md:table-cell bg-white/60 dark:bg-amoled-input/50 group-hover:bg-white/80 dark:group-hover:bg-amoled-border/50 p-1 border-y border-gray-200 dark:border-amoled-border text-xs">' +
									(function() {
										var pts = String(user.port || "").split(",").map(function(p){ return p.trim(); }).filter(function(p){ return p !== ""; });
										if (pts.length === 0) return "";
										var r = Math.min(pts.length, 3);
										return '<div class="grid grid-flow-col gap-1 w-max mx-auto items-center" style="grid-template-rows: repeat(' + r + ', auto);">' +
											pts.map(function(p) {
												var isTls = tlsPorts.includes(p);
												var isNonTls = nonTlsPorts.includes(p);
												var colorClass = isTls ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800' : 
																 isNonTls ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800' : 
																 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
												return '<span class="inline-flex items-center justify-center px-1.5 h-[18px] text-[10px] font-semibold rounded-md border shadow-sm ' + colorClass + '">' + p + '</span>';
											}).join("") +
										'</div>';
									})() +
								'</td>' +
								'<td class="hidden md:table-cell bg-white/60 dark:bg-amoled-input/50 group-hover:bg-white/80 dark:group-hover:bg-amoled-border/50 p-1.5 border-y border-gray-200 dark:border-amoled-border">' + volumeHtml + '</td>' +
								'<td class="hidden md:table-cell bg-white/60 dark:bg-amoled-input/50 group-hover:bg-white/80 dark:group-hover:bg-amoled-border/50 p-1.5 border-y border-gray-200 dark:border-amoled-border">' + reqHtml + '</td>' +
								'<td class="hidden md:table-cell bg-white/60 dark:bg-amoled-input/50 group-hover:bg-white/80 dark:group-hover:bg-amoled-border/50 p-1.5 border-y border-gray-200 dark:border-amoled-border">' + expiryHtml + '</td>' +
								'<td class="hidden md:table-cell bg-white/60 dark:bg-amoled-input/50 group-hover:bg-white/80 dark:group-hover:bg-amoled-border/50 p-1.5 rounded-l-xl border-y border-l border-gray-200 dark:border-amoled-border">' + onlineHtml + '</td>' +
								'</tr>';
				}).join('');
				updateBulkActionsBar();
				if (typeof loadProxyFlags === 'function') {
					setTimeout(loadProxyFlags, 50);
				}
				if (window.usersSortable) {
					window.usersSortable.destroy();
				}
				window.usersSortable = new Sortable(document.getElementById('users-tbody'), {
					handle: '.drag-handle',
					animation: 250,
					ghostClass: "opacity-30",
					delay: 200,
					delayOnTouchOnly: true,
					touchStartThreshold: 5,
					onChoose: function () {
						window.isDraggingRow = true;
					},
					onUnchoose: function () {
						window.isDraggingRow = false;
					},
					onStart: function () {
						window.isDraggingRow = true;
					},
					onEnd: function (evt) {
						window.isDraggingRow = false;
						const newOrder = Array.from(evt.to.children).map(tr => tr.getAttribute('data-username')).filter(Boolean);
						localStorage.setItem('mili_users_custom_order', JSON.stringify(newOrder));
					}
				});
			}
		}
		async function resetUserData(encodedUsername, actionType) {
			const username = decodeURIComponent(encodedUsername);
			let actionName = '';
			if (actionType === 'volume') actionName = 'حجم';
			else if (actionType === 'req') actionName = 'ریکوئست';
			else if (actionType === 'time') actionName = 'زمان';
			if (await customConfirm('آیا از ریست کردن ' + actionName + ' کاربر ' + username + ' مطمئن هستید؟')) {
				try {
					const response = await fetch('/api/users/' + encodeURIComponent(username), {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ reset_action: actionType })
					});
					if (response.ok) {
						if (window.smoothCache && window.smoothCache[username]) {
							if (actionType === 'volume') window.smoothCache[username].gb = 0;
							if (actionType === 'req') window.smoothCache[username].req = 0;
						}
						alert('عملیات با موفقیت انجام شد.');
						await loadUsers(true);
					} else {
						const errData = await response.json();
						alert('خطا: ' + (errData.error || 'عملیات ناموفق بود'));
					}
				} catch (err) {
					alert('خطا در برقراری ارتباط با سرور');
				}
			}
		}
		async function toggleUserStatus(encodedUsername) {
			const username = decodeURIComponent(encodedUsername);
			try {
				const response = await fetch('/api/users/' + encodeURIComponent(username), {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ toggle_only: true })
				});
				if (response.ok) {
					await loadUsers(true);
				} else {
					const errData = await response.json();
					alert('خطا: ' + (errData.error || 'عملیات ناموفق بود'));
				}
			} catch (err) {
				alert('خطا در برقراری ارتباط با سرور');
			}
		}
		function handleProtocolChange(changedInput) {
			const vlessCb = document.getElementById('input-proto-vless');
			const trojanCb = document.getElementById('input-proto-trojan');
			const ssCb = document.getElementById('input-proto-ss');
			if (!vlessCb?.checked && !trojanCb?.checked && !ssCb?.checked) {
				changedInput.checked = true;
				alert('⚠️ حداقل یکی از پروتکل‌ها باید انتخاب شده باشد!');
			}
		}
		window.deferredPwaPrompt = null;
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			window.deferredPwaPrompt = e;
		});
		window.addEventListener('appinstalled', () => {
			window.deferredPwaPrompt = null;
			showToast('✅ اپلیکیشن میلی‌کانفیگ با موفقیت روی دستگاه شما نصب شد!');
		});
		function isIosDevice() {
			return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
		}
		function isPwaStandalone() {
			return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
		}
		function togglePwaModal(show) {
			setModalState('pwa-install-modal', show);
		}
		function getBrowserAndOsInfo() {
			const ua = navigator.userAgent;
			const isOpera = ua.includes('OPR') || ua.includes('Opera') || ua.includes('OPT/');
			const isEdge = ua.includes('Edg');
			const isChrome = ua.includes('Chrome') && !isEdge && !isOpera;
			const isFirefox = ua.includes('Firefox');
			const isSafari = ua.includes('Safari') && !isChrome && !isEdge && !isOpera;
			const isAndroid = /Android/i.test(ua);
			const isIos = isIosDevice();
			return { isOpera, isEdge, isChrome, isFirefox, isSafari, isAndroid, isIos };
		}
		function renderInstallGuide() {
			const info = getBrowserAndOsInfo();
			const list = document.getElementById('pwa-instructions-list');
			const title = document.getElementById('pwa-modal-title');
			if (!list) return;
			list.innerHTML = '';
			if (info.isIos) {
				if (title) title.innerText = 'نصب روی آیفون / iOS';
				list.innerHTML = '<div class="flex items-start gap-2.5 p-2.5 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200/50 dark:border-blue-900/30">' +
					'<span class="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-[10px] flex-shrink-0 mt-0.5">۱</span>' +
					'<span>در نوار پایین سافاری، دکمه <b>اشتراک‌گذاری (Share 📤)</b> را لمس کنید.</span>' +
				'</div>' +
				'<div class="flex items-start gap-2.5 p-2.5 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200/50 dark:border-blue-900/30">' +
					'<span class="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-[10px] flex-shrink-0 mt-0.5">۲</span>' +
					'<span>گزینه <b>«Add to Home Screen» (افزودن به صفحه اصلی ➕)</b> را انتخاب کنید.</span>' +
				'</div>' +
				'<div class="flex items-start gap-2.5 p-2.5 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200/50 dark:border-blue-900/30">' +
					'<span class="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center font-black text-[10px] flex-shrink-0 mt-0.5">۳</span>' +
					'<span>در گوشه بالا دکمه <b>«Add» (افزودن)</b> را بزنید تا آیکون برنامه ایجاد شود.</span>' +
				'</div>';
			} else if (info.isOpera) {
				if (title) title.innerText = 'نصب در مرورگر اپرا (Opera)';
				if (info.isAndroid) {
					list.innerHTML = '<div class="flex items-start gap-2.5 p-2.5 bg-red-50/50 dark:bg-red-950/20 rounded-lg border border-red-200/50 dark:border-red-900/30">' +
						'<span class="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center font-black text-[10px] flex-shrink-0 mt-0.5">۱</span>' +
						'<span>در نوار پایین اپرا، روی منوی <b>سه نقطه (⋮) یا لوگوی اپرا</b> کلیک کنید.</span>' +
					'</div>' +
					'<div class="flex items-start gap-2.5 p-2.5 bg-red-50/50 dark:bg-red-950/20 rounded-lg border border-red-200/50 dark:border-red-900/30">' +
						'<span class="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center font-black text-[10px] flex-shrink-0 mt-0.5">۲</span>' +
						'<span>گزینه <b>«صفحه اصلی» (Home screen)</b> یا <b>«نصب برنامه»</b> را انتخاب کنید.</span>' +
					'</div>';
				} else {
					list.innerHTML = '<div class="flex items-start gap-2.5 p-2.5 bg-red-50/50 dark:bg-red-950/20 rounded-lg border border-red-200/50 dark:border-red-900/30">' +
						'<span class="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center font-black text-[10px] flex-shrink-0 mt-0.5">۱</span>' +
						'<span>در نوار آدرس بالای اپرا (سمت راست آدرس)، روی آیکون <b>📥 (نصب)</b> کلیک کنید.</span>' +
					'</div>' +
					'<div class="flex items-start gap-2.5 p-2.5 bg-red-50/50 dark:bg-red-950/20 rounded-lg border border-red-200/50 dark:border-red-900/30">' +
						'<span class="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center font-black text-[10px] flex-shrink-0 mt-0.5">۲</span>' +
						'<span>یا روی منوی تنظیمات سریع (Easy Setup) یا منوی سه نقطه کلیک کرده و گزینه <b>Install</b> را انتخاب کنید.</span>' +
					'</div>';
				}
			} else if (info.isAndroid) {
				if (title) title.innerText = 'نصب روی گوشی اندروید';
				list.innerHTML = '<div class="flex items-start gap-2.5 p-2.5 bg-green-50/50 dark:bg-green-950/20 rounded-lg border border-green-200/50 dark:border-green-900/30">' +
					'<span class="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center font-black text-[10px] flex-shrink-0 mt-0.5">۱</span>' +
					'<span>روی منوی <b>سه نقطه (⋮)</b> در بالای مرورگر کلیک کنید.</span>' +
				'</div>' +
				'<div class="flex items-start gap-2.5 p-2.5 bg-green-50/50 dark:bg-green-950/20 rounded-lg border border-green-200/50 dark:border-green-900/30">' +
					'<span class="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center font-black text-[10px] flex-shrink-0 mt-0.5">۲</span>' +
					'<span>گزینه <b>«نصب برنامه» (Install app)</b> یا <b>«افزودن به صفحه اصلی»</b> را انتخاب کنید.</span>' +
				'</div>';
			} else {
				if (title) title.innerText = 'نصب در مرورگر دسکتاپ';
				list.innerHTML = '<div class="flex items-start gap-2.5 p-2.5 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200/50 dark:border-blue-900/30">' +
					'<span class="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5"></span>' +
					'<span>در نوار آدرس بالای مرورگر، روی آیکون <b>نصب برنامه (🖥️ یا ➕)</b> کلیک کنید.</span>' +
				'</div>' +
				'<div class="flex items-start gap-2.5 p-2.5 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200/50 dark:border-blue-900/30">' +
					'<span class="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5"></span>' +
					'<span><b>یا</b> از منوی سه نقطه (⋮) گزینه <b>«Install MILICONFIG Panel»</b> را انتخاب نمایید.</span>' +
				'</div>';
			}
		}
		async function triggerPwaInstall() {
			if (isPwaStandalone()) {
				showToast('✅ اپلیکیشن هم‌اکنون روی دستگاه شما نصب است و در حال اجرا می‌باشد.');
				return;
			}
			if (window.deferredPwaPrompt) {
				try {
					window.deferredPwaPrompt.prompt();
					const choice = await window.deferredPwaPrompt.userChoice;
					if (choice.outcome === 'accepted') {
						showToast('✅ در حال نصب اپلیکیشن...');
					}
					window.deferredPwaPrompt = null;
					return;
				} catch (err) {}
			}
			renderInstallGuide();
			togglePwaModal(true);
		}
		window.triggerPwaInstall = triggerPwaInstall;
		window.togglePwaModal = togglePwaModal;
		if ('serviceWorker' in navigator) {
			try {
				navigator.serviceWorker.register('/sw.js').catch(() => {});
			} catch(e) {}
		}
		function generateRandomUsername() {
			const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
			let randStr = '';
			for (let i = 0; i < 8; i++) randStr += chars.charAt(Math.floor(Math.random() * chars.length));
			const username = randStr;
			const nameInput = document.getElementById('input-name');
			if (nameInput) {
				nameInput.value = username;
			}
		}
		window.generateRandomUsername = generateRandomUsername;
		async function handleFormSubmit(event) {
			event.preventDefault();
			updateSubmitBtnState(isEditMode ? 'در حال ذخیره تغییرات...' : 'در حال ایجاد...', true);
			const vlessEnabled = document.getElementById('input-proto-vless')?.checked ?? true;
			const trojanEnabled = document.getElementById('input-proto-trojan')?.checked ?? false;
			const ssEnabled = document.getElementById('input-proto-ss')?.checked ?? false;
			if (!vlessEnabled && !trojanEnabled && !ssEnabled) {
				alert('⚠️ حداقل یکی از پروتکل‌ها باید انتخاب شود!');
				updateSubmitBtnState(isEditMode ? 'ذخیره تغییرات' : 'ایجاد کاربر', false);
				return;
			}
			const selectedProtocols = [];
			if (vlessEnabled) selectedProtocols.push('vless');
			if (trojanEnabled) selectedProtocols.push('trojan');
			if (ssEnabled) selectedProtocols.push('shadowsocks');
			const connection_type = selectedProtocols.join(',');
			const username = document.getElementById('input-name').value.trim();
			const highlightError = () => {
				if (typeof window.switchUserTab === 'function') window.switchUserTab('tab-user-info');
				setTimeout(() => {
					const nameInput = document.getElementById('input-name');
					if (nameInput) nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
				}, 50);
				const nameCard = document.getElementById('username-card');
				if (nameCard) {
					nameCard.classList.remove('bg-gray-50/70', 'dark:bg-amoled-input/30', 'border-gray-200/70', 'dark:border-amoled-border');
					nameCard.classList.add('bg-red-50', 'dark:bg-red-900/20', 'border-red-500', 'dark:border-red-500', 'shadow-[0_0_15px_rgba(239,68,68,0.3)]');
					setTimeout(() => {
						nameCard.classList.remove('bg-red-50', 'dark:bg-red-900/20', 'border-red-500', 'dark:border-red-500', 'shadow-[0_0_15px_rgba(239,68,68,0.3)]');
						nameCard.classList.add('bg-gray-50/70', 'dark:bg-amoled-input/30', 'border-gray-200/70', 'dark:border-amoled-border');
					}, 1500);
				}
			};
			if (!username) {
				highlightError();
				alert('⚠️ وارد کردن نام کاربری الزامی است!');
				updateSubmitBtnState(isEditMode ? 'ذخیره تغییرات' : 'ایجاد کاربر', false);
				return;
			}
			const usernameRegex = /^[a-zA-Z0-9_-]+$/;
			if (!usernameRegex.test(username)) {
				highlightError();
				alert('⚠️ نام کاربری فقط می‌تواند شامل حروف انگلیسی، اعداد، خط تیره (-) و آندرلاین (_) باشد!');
				updateSubmitBtnState(isEditMode ? 'ذخیره تغییرات' : 'ایجاد کاربر', false);
				return;
			}
			const limit = document.getElementById('input-limit').value || null;
			const expiry = document.getElementById('input-expiry').value || null;
			const reqLimit = document.getElementById('input-req-limit').value || null;
			const ipLimit = document.getElementById('input-ip-limit').value || null;
			if (limit !== null && parseFloat(limit) < 0) { alert('⚠️ حجم نمی‌تواند عدد منفی باشد!'); submitButton.disabled = false; submitButton.innerText = isEditMode ? 'ذخیره تغییرات' : 'ایجاد کاربر'; return; }
			if (expiry !== null && parseInt(expiry) < 0) { alert('⚠️ زمان (روز) نمی‌تواند عدد منفی باشد!'); submitButton.disabled = false; submitButton.innerText = isEditMode ? 'ذخیره تغییرات' : 'ایجاد کاربر'; return; }
			if ((reqLimit !== null && parseInt(reqLimit) < 0) || (ipLimit !== null && parseInt(ipLimit) < 0)) { alert('⚠️ محدودیت‌ها نمی‌توانند منفی باشند!'); submitButton.disabled = false; submitButton.innerText = isEditMode ? 'ذخیره تغییرات' : 'ایجاد کاربر'; return; }
			const autoResetToggle = document.getElementById('input-auto-reset-toggle').checked;
			const autoResetVolDays = document.getElementById('input-auto-reset-vol').value;
			const autoResetReqDays = document.getElementById('input-auto-reset-req').value;
			if (autoResetToggle) {
				const volDays = parseInt(autoResetVolDays) || 0;
				const reqDays = parseInt(autoResetReqDays) || 0;
				if (volDays <= 0 && reqDays <= 0) {
					alert('⚠️ وقتی تیک تمدید خودکار روشن است، باید حداقل یکی از فیلدها (زمان تمدید حجم یا ریکوئست) را پر کنید!');
					updateSubmitBtnState(isEditMode ? 'ذخیره تغییرات' : 'ایجاد کاربر', false);
					return;
				}
			}
			const customPortsRaw = document.getElementById('input-custom-ports') ? document.getElementById('input-custom-ports').value : '';
			const customPortsArray = customPortsRaw.replace(/ +/g, ',').split(',').map(p => p.trim()).filter(p => p.length > 0);
			let checkedPorts = Array.from(document.querySelectorAll('input[name="ports"]:checked')).map(cb => cb.value).concat(customPortsArray);
			checkedPorts = [...new Set(checkedPorts)];
			const block_porn = document.getElementById('input-block-porn').checked ? 1 : 0;
			const block_ads = document.getElementById('input-block-ads').checked ? 1 : 0;
			const isEchOn = document.getElementById('input-ech-settings-toggle') ? document.getElementById('input-ech-settings-toggle').checked : false;
			const rawEch = isEchOn && document.getElementById('input-ech-value') ? document.getElementById('input-ech-value').value.trim() : "";
			const ech = rawEch.split('\\n').map(x => x.trim()).filter(x => x).join(',');
			const isFragOn = document.getElementById('input-frag-toggle') ? document.getElementById('input-frag-toggle').checked : true;
			const frag_len = isFragOn && document.getElementById('input-frag-len') ? document.getElementById('input-frag-len').value.trim() : "";
			const frag_int = isFragOn && document.getElementById('input-frag-int') ? document.getElementById('input-frag-int').value.trim() : "";
			const isAdvancedSettingsOn = document.getElementById('input-advanced-settings-toggle') ? document.getElementById('input-advanced-settings-toggle').checked : false;
			const advanced_frag = (isAdvancedSettingsOn && document.getElementById('input-advanced-frag')) ? document.getElementById('input-advanced-frag').value.trim() : "";
			const cipher_suites = (isAdvancedSettingsOn && document.getElementById('input-cipher-suites')) ? document.getElementById('input-cipher-suites').value.trim() : "";
			const tls_mask = (isAdvancedSettingsOn && document.getElementById('input-tls-mask')) ? document.getElementById('input-tls-mask').value.trim() : "";
			const isAutoReset = document.getElementById('input-auto-reset-toggle').checked;
			const auto_reset_vol_days = isAutoReset ? parseInt(document.getElementById('input-auto-reset-vol').value) || 0 : 0;
			const auto_reset_req_days = isAutoReset ? parseInt(document.getElementById('input-auto-reset-req').value) || 0 : 0;
			const auto_rotate_ip = document.getElementById('input-auto-rotate-ip-toggle') ? (document.getElementById('input-auto-rotate-ip-toggle').checked ? 1 : 0) : 0;
			const rotate_time = 0;
			const ip_operator = document.getElementById('hidden-ip-operator').value || 'all';
			const ip_count = parseInt(document.getElementById('hidden-ip-count').value) || 20;
			const userProxyMode = document.getElementById('user-proxy-mode-toggle') ? document.getElementById('user-proxy-mode-toggle').checked : false;
			let userSocks5 = null;
			if (userProxyMode && window.proxyFieldsData && window.proxyFieldsData.length > 0) {
				const cleanProxies = window.proxyFieldsData.map(p => p ? p.trim() : "").filter(p => p !== "");
				if (cleanProxies.length > 0) {
					let proxyFlagCache = {};
					try { proxyFlagCache = JSON.parse(localStorage.getItem('proxy_flag_cache_v2') || '{}'); } catch(e) {}
					const arr = cleanProxies.map(p => {
						const cCode = proxyFlagCache[p] || 'UN';
						return { proxy: p, country: cCode };
					});
					userSocks5 = JSON.stringify(arr);
				}
			}
			const auto_rotate_user_proxy = document.getElementById('input-auto-rotate-user-proxy') ? (document.getElementById('input-auto-rotate-user-proxy').checked ? 1 : 0) : 0;
			const start_on_first_connect = document.getElementById('input-start-on-first-connect') ? (document.getElementById('input-start-on-first-connect').checked ? 1 : 0) : 0;
			const enable_direct = document.getElementById('input-enable-direct') ? document.getElementById('input-enable-direct').checked : true;
			if (!enable_direct && !userSocks5) {
				if (typeof window.switchUserTab === 'function') window.switchUserTab('tab-proxy-settings');
				alert('⚠️ وقتی "اتصال مستقیم" را خاموش می‌کنید، حتماً باید حداقل یک پروکسی تنظیم کنید!');
				updateSubmitBtnState(isEditMode ? 'ذخیره تغییرات' : 'ایجاد کاربر', false);
				return;
			}
			let panelIso = window.editingUserIata || null;
			if (enable_direct && !panelIso) {
				try {
					const pRes = await fetch('/api/placement-status');
					if (pRes.ok) {
						const pData = await pRes.json();
						let currentRegion = pData.placement || "smart";
						if (currentRegion !== "smart" && currentRegion !== "off" && currentRegion !== "none" && !currentRegion.startsWith("targeted")) {
							if (!currentRegion.includes(':')) {
								for (const prov in PLACEMENT_DATA.providers) {
									const found = PLACEMENT_DATA.providers[prov].regions.find(r => r.id.toLowerCase() === currentRegion);
									if (found) { currentRegion = prov.toLowerCase() + ':' + currentRegion; break; }
								}
							}
							let foundCountry = null;
							for (const prov in PLACEMENT_DATA.providers) {
								const found = PLACEMENT_DATA.providers[prov].regions.find(r => (prov.toLowerCase() + ':' + r.id.toLowerCase()) === currentRegion);
								if (found) { foundCountry = found.country; break; }
							}
							if (foundCountry) {
								const countryToIso = { "United States": "US", "South Africa": "ZA", "Hong Kong": "HK", "Taiwan": "TW", "India": "IN", "Singapore": "SG", "Australia": "AU", "Indonesia": "ID", "Malaysia": "MY", "New Zealand": "NZ", "Thailand": "TH", "Japan": "JP", "South Korea": "KR", "Canada": "CA", "Germany": "DE", "Switzerland": "CH", "Ireland": "IE", "United Kingdom": "GB", "France": "FR", "Sweden": "SE", "Italy": "IT", "Spain": "ES", "Israel": "IL", "United Arab Emirates": "AE", "Bahrain": "BH", "Mexico": "MX", "Brazil": "BR", "Austria": "AT", "Belgium": "BE", "Chile": "CL", "Denmark": "DK", "Poland": "PL", "Qatar": "QA", "Norway": "NO", "Netherlands": "NL", "Finland": "FI", "Saudi Arabia": "SA" };
								panelIso = countryToIso[foundCountry] || "";
							}
						}
					}
				} catch(e) {}
			}
			if (checkedPorts.length === 0) {
				alert('⚠️ لطفا حداقل یک پورت را برای اتصال انتخاب کنید!');
				updateSubmitBtnState(isEditMode ? 'ذخیره تغییرات' : 'ایجاد کاربر', false);
				return;
			}
			const port = checkedPorts.join(',');
			const tls = checkedPorts.some(p => tlsPorts.includes(p)) ? 'on' : 'off';
			const ips = document.getElementById('input-ips').value;
			const fingerprint = document.getElementById('fingerprint-select').value;
			const url = isEditMode ? '/api/users/' + encodeURIComponent(editingUsername) : '/api/users';
			const method = isEditMode ? 'PUT' : 'POST';
			let numIps = ips ? ips.split('\\n').filter(p => p.trim().length > 0).length : 1;
			if (numIps === 0) numIps = 1;
			let numPorts = checkedPorts.length || 1;
			let numProto = selectedProtocols.length || 1;
			let numProxies = (userProxyMode && window.proxyFieldsData ? window.proxyFieldsData.filter(p => p.trim() !== '').length : 0);
			if (enable_direct) numProxies += 1;
			if (numProxies === 0) numProxies = 1;
			let numEch = ech ? ech.split(',').filter(x => x.trim().length > 0).length : 1;
			if (numEch === 0) numEch = 1;
			let totalConfigs = 3 + (numProxies * numIps * numPorts * numProto * numEch);
			try {
				const response = await fetch(url, {
					method: method,
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						username, limit_gb: limit, expiry_days: expiry, limit_req: reqLimit, tls, port, ips, fingerprint, ip_limit: ipLimit, block_porn: block_porn, block_ads: block_ads, frag_len: frag_len, frag_int: frag_int,
						advanced_frag: advanced_frag || null, cipher_suites: cipher_suites || null, tls_mask: tls_mask || null,
						ech: ech || null,
						user_proxy_iata: enable_direct ? (panelIso || null) : null,
						user_socks5: userSocks5 || null,
						user_proxy_ip: null,
						auto_reset_vol_days: auto_reset_vol_days,
						auto_reset_req_days: auto_reset_req_days,
						auto_rotate_ip: auto_rotate_ip,
						rotate_time: rotate_time,
						ip_operator: ip_operator,
						ip_count: ip_count,
						auto_rotate_user_proxy: auto_rotate_user_proxy,
						start_on_first_connect: start_on_first_connect,
						enable_direct: enable_direct,
						connection_type: connection_type,
						protocols: selectedProtocols
					})
				});
				if (response.ok) {
					toggleModal(false);
					if (totalConfigs > 60) {
						setTimeout(() => openConfigCountWarning(), 300);
					}
					setTimeout(() => loadUsers(true), 1500);
				} else {
					const errData = await response.json();
					alert('خطا: ' + (errData.error || 'عملیات ناموفق بود'));
				}
			} catch (err) {
				alert('خطا در برقراری ارتباط با سرور');
			} finally {
				updateSubmitBtnState(isEditMode ? 'ذخیره تغییرات' : 'ایجاد کاربر', false);
			}
		}
window.activeProxyIndex = 0;
window.proxyFieldsData = [""];
window.clearProxyFieldUI = function(idx) {
	window.proxyFieldsData[idx] = "";
	if (typeof window.renderProxyFieldsUI === 'function') window.renderProxyFieldsUI();
};
window.renderProxyFieldsUI = function() {
	const wrapper = document.getElementById("proxies-fields-wrapper");
	const addBtn = document.getElementById("add-proxy-field-btn");
	if (!wrapper) return;
	wrapper.innerHTML = "";
	let proxyFlagCache = {};
	try { proxyFlagCache = JSON.parse(localStorage.getItem('proxy_flag_cache_v2') || '{}'); } catch(e) {}
	window.proxyFieldsData.forEach((val, idx) => {
		const isFocused = idx === window.activeProxyIndex;
		const borderClass = isFocused ? "ring-2 ring-blue-500 border-[#00ff66]" : "border-gray-200 dark:border-amoled-border";
		const row = document.createElement("div");
		row.className = "flex flex-col gap-0.5 w-full";
		const proxyStr = (val || "").trim();
		const pingObj = proxyStr ? (window.proxyPingMap && window.proxyPingMap[proxyStr]) : null;
		const pingClass = pingObj ? pingObj.className : "text-[10px] font-bold text-center block min-h-[18px] mt-0.5 transition-colors";
		const pingText = pingObj ? pingObj.text : "";
		let countryCode = "UN";
		if (proxyStr && proxyFlagCache[proxyStr]) {
			countryCode = proxyFlagCache[proxyStr].toUpperCase();
		}
		const isVip = proxyStr.length > 0 && (proxyStr.includes('@') || proxyStr.includes('pass=') || proxyStr.includes('t.me/'));
		let inputRow = '<div class="flex items-center gap-1 w-full">' +
			'<button type="button" onclick="swapProxyFieldUI(' + idx + ')" class="w-7 h-7 flex-shrink-0 bg-transparent border-2 border-green-500 text-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded flex items-center justify-center font-bold text-xs shadow-sm transition-all" title="جا به جایی پروکسی"><svg id="swap-icon-' + idx + '" class="w-3.5 h-3.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg></button>';
		const vipBorderClass = isFocused ? "ring-2 ring-blue-500 border-[#00ff66]" : "border-green-400 dark:border-green-600";
		if (isVip) {
			let flagHtml = typeof getFlagEmoji === 'function' ? getFlagEmoji(countryCode) : '🌐';
			if (countryCode === "UN") flagHtml = '⏳';
			const displayCountry = countryCode !== "UN" ? countryCode : "نامشخص";
			inputRow += '<div id="proxy-field-box-' + idx + '" onclick="setActiveProxyField(' + idx + ')" class="flex-1 px-2.5 py-1.5 bg-green-50 dark:bg-amoled-input border ' + vipBorderClass + ' rounded text-xs font-bold text-green-700 dark:text-green-500 flex items-center justify-between shadow-inner select-none cursor-pointer transition" title="آدرس پروکسی برای امنیت مخفی شده است">' +
							'<div class="flex items-center gap-1.5">' +
								'<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"></path></svg>' +
								'<span>پروکسی VIP (' + displayCountry + ')</span>' +
							'</div>' +
							'<div class="flex items-center gap-2">' +
								'<span class="text-base leading-none drop-shadow-sm">' + flagHtml + '</span>' +
								'<button type="button" onclick="event.stopPropagation(); window.clearProxyFieldUI(' + idx + ')" title="حذف و تغییر به پروکسی دستی" class="text-green-600/60 hover:text-red-500 transition-colors z-10 relative"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>' +
							'</div>' +
						'</div>';
		} else {
			inputRow += '<input type="text" id="proxy-field-box-' + idx + '" value="' + proxyStr + '" onfocus="setActiveProxyField(' + idx + ')" onclick="setActiveProxyField(' + idx + ')" oninput="updateProxyFieldData(' + idx + ', this.value)" placeholder="socks5:// یا http:// (کشور ' + (idx + 1) + ')" dir="ltr" class="flex-1 px-2 py-1.5 bg-gray-50 dark:bg-amoled-input border ' + borderClass + ' rounded text-xs font-mono focus:outline-none text-gray-800 dark:text-zinc-100 transition">';
		}
		if (idx > 0) {
			inputRow += '<button type="button" onclick="removeProxyFieldUI(' + idx + ')" class="w-7 h-7 flex-shrink-0 bg-transparent border-2 border-red-500 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded flex items-center justify-center font-bold text-xs shadow-sm" title="حذف کامل فیلد"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>';
		}
		inputRow += '</div><span id="proxy-ping-label-' + idx + '" class="' + pingClass + '">' + pingText + '</span>';
		row.innerHTML = inputRow;
		wrapper.appendChild(row);
	});
	if (addBtn) {
		addBtn.style.display = window.proxyFieldsData.length >= 15 ? "none" : "flex";
	}
};
// Clean UI - DevTools enabled
window.setActiveProxyField = function(idx) {
	if (window.activeProxyIndex === idx) return;
	window.activeProxyIndex = idx;
	const wrapper = document.getElementById("proxies-fields-wrapper");
	if (wrapper) {
		for (let i = 0; i < window.proxyFieldsData.length; i++) {
			const el = document.getElementById('proxy-field-box-' + i);
			if (!el) continue;
			const val = window.proxyFieldsData[i] || "";
			const isVip = val.length > 0 && (val.includes('@') || val.includes('pass=') || val.includes('t.me/'));
			if (i === idx) {
				if (isVip) {
					el.classList.remove("border-green-400", "dark:border-green-700/50");
				} else {
					el.classList.remove("border-gray-200", "dark:border-amoled-border");
				}
				el.classList.add("ring-2", "ring-blue-500", "border-[#00ff66]");
			} else {
				el.classList.remove("ring-2", "ring-blue-500", "border-[#00ff66]");
				if (isVip) {
					el.classList.add("border-green-400", "dark:border-green-700/50");
				} else {
					el.classList.add("border-gray-200", "dark:border-amoled-border");
				}
			}
		}
	}
};
window.updateProxyFieldData = function(idx, val) {
	window.proxyFieldsData[idx] = val;
	const span = document.getElementById('proxy-ping-label-' + idx);
	if (span) {
		span.innerText = '';
		span.className = 'text-[10px] font-bold text-center block min-h-[18px] mt-0.5 transition-colors';
	}
};
window.addProxyFieldUI = function() {
	if (window.proxyFieldsData.length < 15) {
		window.proxyFieldsData.push("");
		window.activeProxyIndex = window.proxyFieldsData.length - 1;
		window.renderProxyFieldsUI();
		setTimeout(() => {
			const newField = document.getElementById("proxy-field-box-" + window.activeProxyIndex);
			if (newField && newField.tagName.toLowerCase() === 'input') {
				newField.focus();
			}
			const addBtn = document.getElementById("add-proxy-field-btn");
			if (addBtn) addBtn.style.display = window.proxyFieldsData.length >= 15 ? "none" : "flex";
		}, 50);
	}
};
window.removeProxyFieldUI = function(idx) {
	if (window.proxyFieldsData.length > 1) {
		window.proxyFieldsData.splice(idx, 1);
		if (window.activeProxyIndex >= window.proxyFieldsData.length) {
			window.activeProxyIndex = window.proxyFieldsData.length - 1;
		}
		window.renderProxyFieldsUI();
	}
};
		window.swapProxyFieldUI = async function(idx, triggerGlobalTest = true) {
			const currentProxy = (window.proxyFieldsData[idx] || "").trim();
			if (!currentProxy) {
				if (triggerGlobalTest) alert("⚠️ ابتدا یک پروکسی در این فیلد وارد کنید!");
				return;
			}
			const icon = document.getElementById('swap-icon-' + idx);
			if (icon) icon.classList.add('animate-spin');
			let usedCountries = new Set();
			try {
				let cache = JSON.parse(localStorage.getItem('proxy_flag_cache_v2') || '{}');
				for (let i = 0; i < window.proxyFieldsData.length; i++) {
					if (i !== idx) {
						let p = (window.proxyFieldsData[i] || "").trim();
						if (p && cache[p]) {
							usedCountries.add(cache[p].toUpperCase());
						}
					}
				}
			} catch(e) {}
			let countryCode = "UN";
			try {
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 2000);
				const res = await fetch('/api/test-proxy', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ proxy: currentProxy }),
					signal: controller.signal
				});
				clearTimeout(timeoutId);
				const data = await res.json();
				if (res.ok && data.success && data.country && data.country !== "UN") {
					countryCode = data.country.toUpperCase();
				}
			} catch(e) {}
			let candidateProxies = [];
			let isRandomFallback = false;
			if (countryCode !== "UN" && !usedCountries.has(countryCode)) {
				if (cachedVipProxies[countryCode] && cachedVipProxies[countryCode].length > 0) {
					candidateProxies = candidateProxies.concat(cachedVipProxies[countryCode]);
				}
			}
			if (candidateProxies.length <= 1 || countryCode === "UN" || usedCountries.has(countryCode)) {
				isRandomFallback = true;
				let fallbackCountries = ["DE", "US", "GB", "NL", "FR", "TR"];
				if (cachedVipList && cachedVipList.length > 0) {
					fallbackCountries = cachedVipList;
				}
				let availableCountries = fallbackCountries.filter(c => !usedCountries.has(c));
				if (availableCountries.length === 0) {
					availableCountries = fallbackCountries;
				}
				const randomCountry = availableCountries[Math.floor(Math.random() * availableCountries.length)];
				if (cachedVipProxies[randomCountry] && cachedVipProxies[randomCountry].length > 0) {
					candidateProxies = candidateProxies.concat(cachedVipProxies[randomCountry]);
				}
			}
			candidateProxies = [...new Set(candidateProxies)];
			const alternatives = candidateProxies.filter(p => p !== currentProxy);
			if (alternatives.length > 0) {
				const newProxy = alternatives[Math.floor(Math.random() * alternatives.length)];
				window.proxyFieldsData[idx] = newProxy;
				if (triggerGlobalTest) {
					if (countryCode !== "UN" && !isRandomFallback) {
						showToast('✅ پروکسی اختصاصی (VIP) از کشور ' + countryCode + ' جایگزین شد.');
					} else {
						showToast('✅ یک پروکسی سالم (بدون تکرار کشور) جایگزین شد.');
					}
				}
			} else {
				window.proxyFieldsData[idx] = currentProxy;
				if (triggerGlobalTest) showToast('⚠️ هیچ پروکسی اختصاصی جایگزینی در مخزن VIP یافت نشد!');
			}
			if (typeof window.renderProxyFieldsUI === 'function') window.renderProxyFieldsUI();
			if (triggerGlobalTest) testUserSocksProxy();
		};
function setModalState(modalId, show) {
			const modal = document.getElementById(modalId);
			if (!modal) return;
			const card = modal.querySelector('div');
			if (show) {
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
function toggleInfoModal(show) {
	const modal = document.getElementById('info-modal');
	if (!modal) return;
	const innerBox = modal.querySelector('div');
	if (show) {
		modal.classList.remove('opacity-0', 'pointer-events-none');
		if (innerBox) innerBox.classList.remove('opacity-0', 'scale-95');
	} else {
		modal.classList.add('opacity-0', 'pointer-events-none');
		if (innerBox) innerBox.classList.add('opacity-0', 'scale-95');
	}
}
function downloadMiliSource() {
	window.open('/' + window.ADMIN_PATH + '/api/update-bundle', '_blank');
}
		function closeUsageWarning() { setModalState('usage-warning-modal', false); }
		function openUsageWarning() { setModalState('usage-warning-modal', true); }
		function closeFreePanelWarning() { setModalState('free-panel-warning-modal', false); }
		function closeOnlineCounterWarning() { setModalState('online-counter-warning-modal', false); }
		function openOnlineCounterWarning() { setModalState('online-counter-warning-modal', true); }
		function closeConfigCountWarning() { setModalState('config-count-warning-modal', false); }
		function openConfigCountWarning() { setModalState('config-count-warning-modal', true); }
		function togglePattNgModal(show) {
			const modal = document.getElementById('pattng-info-modal');
			if (!modal) return;
			const card = modal.querySelector('div');
			if (show) {
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
	async function checkGlobalMessage() {
		try {
			const res = await fetchWithFallbackUI('message.txt?t=' + Date.now());
			if (!res || !res.ok) { checkLoopWarning(); return; }
			const text = await res.text();
			const lines = text.split('\\n');
			if (lines.length < 2) { checkLoopWarning(); return; }
			const firstLine = lines[0].trim();
			if (!firstLine.startsWith('VERSION=')) { checkLoopWarning(); return; }
			const version = firstLine.split('=')[1].trim();
			const content = lines.slice(1).join('\\n').trim();
			if (window.mili_global_msg_version !== version) {
				document.getElementById('global-message-content').innerHTML = content;
				setModalState('global-message-modal', true);
				const oldBtn = document.getElementById('global-message-close-btn');
				const newBtn = oldBtn.cloneNode(true);
				oldBtn.parentNode.replaceChild(newBtn, oldBtn);
				const btn = document.getElementById('global-message-close-btn');
				const prog = document.getElementById('global-message-progress');
				let holdTimer = null;
				let startTime = 0;
				let animFrame = null;
				let secretClickCount = 0;
				let lastClickTime = 0;
				const triggerClose = () => {
					stopHold();
					setModalState('global-message-modal', false);
					window.mili_global_msg_version = version;
					setTimeout(() => checkLoopWarning(), 500); 
				};
				const stopHold = () => {
					cancelAnimationFrame(animFrame);
					if (holdTimer) clearTimeout(holdTimer);
					holdTimer = null;
					if (prog) prog.style.width = '0%';
					if (btn) btn.style.transform = 'scale(1)';
				};
				const startHold = (e) => {
					stopHold();
					startTime = performance.now();
					if (btn) btn.style.transform = 'scale(0.96)';
					const animate = (time) => {
						let elapsed = time - startTime;
						let percent = Math.min((elapsed / 1000) * 100, 100);
						if (prog) prog.style.width = percent + '%';
						if (percent < 100) {
							animFrame = requestAnimationFrame(animate);
						}
					};
					animFrame = requestAnimationFrame(animate);
					holdTimer = setTimeout(triggerClose, 1000);
				};
				const handleSecretClick = () => {
					const now = Date.now();
					if (now - lastClickTime < 400) {
						secretClickCount++;
					} else {
						secretClickCount = 1;
					}
					lastClickTime = now;
					if (secretClickCount >= 3) {
						triggerClose();
					}
				};
				btn.addEventListener('mousedown', startHold);
				btn.addEventListener('touchstart', startHold, {passive: false});
				btn.addEventListener('mouseup', stopHold);
				btn.addEventListener('mouseleave', stopHold);
				btn.addEventListener('touchend', stopHold);
				btn.addEventListener('touchcancel', stopHold);
				btn.addEventListener('click', handleSecretClick);
			} else {
				checkLoopWarning(); 
			}
		} catch (err) {}
	}
		function getvIeesLink(username) {
			const user = window.allUsers.find(u => u.username === username);
			if (!user) return '';
			const host = window.location.hostname;
			var ips = [host];
			if (user.ips) {
				const parsedIps = user.ips.split('\\n').map(function(ip) { return ip.trim(); }).filter(function(ip) { return ip.length > 0; });
				if (parsedIps.length > 0) ips = parsedIps;
			}
			var ports = String(user.port || '443').split(',').map(function(p) { return p.trim(); }).filter(function(p) { return p.length > 0; });
			var fp = user.fingerprint || 'chrome';
			const dynPath = encodeURIComponent("/stream/MILICONFIG/" + (user.uuid ? user.uuid.split("-")[4] : "default"));
			const links = [];
		const m1 = decodeURIComponent('%E2%9A%A0%EF%B8%8F%20%D9%BE%D9%86%D9%84%20%D8%B1%D8%A7%DB%8C%DA%AF%D8%A7%D9%86%20%D9%88%20%D8%BA%DB%8C%D8%B1%20%D9%82%D8%A7%D8%A8%D9%84%20%D9%81%D8%B1%D9%88%D8%B4%20%E2%9A%A0%EF%B8%8F');
		const m2 = decodeURIComponent('%F0%9F%9A%80%D8%B3%D8%A7%D8%AE%D8%AA%20%D8%B1%D8%A7%DB%8C%DA%AF%D8%A7%D9%86%20%40miliconfig%20%F0%9F%9A%80');
			let remVol = "∞";
			if (user.limit_gb) {
				let rem = user.limit_gb - (user.used_gb || 0);
				remVol = rem > 0 ? rem.toFixed(2) + "GB" : "0GB";
			}
			let remTime = "∞";
			if (user.expiry_days) {
				if (user.start_on_first_connect === 1) {
					if (user.first_connection_time) {
						const expiryDate = new Date(user.first_connection_time + user.expiry_days * 86400000);
						const diffDays = Math.ceil((expiryDate.getTime() - Date.now()) / 86400000);
						remTime = diffDays > 0 ? diffDays + "Days" : "0Days";
					} else {
						remTime = user.expiry_days + "Days (Not Started)";
					}
				} else if (user.created_at) {
					const created = new Date(user.created_at);
					const expiryDate = new Date(created.getTime() + user.expiry_days * 86400000);
					const diffDays = Math.ceil((expiryDate.getTime() - Date.now()) / 86400000);
					remTime = diffDays > 0 ? diffDays + "Days" : "0Days";
				}
			}
			let remReq = "∞";
			if (user.limit_req) {
				let rem = user.limit_req - (user.used_req || 0);
				remReq = rem > 0 ? rem.toLocaleString() + "Req" : "0Req";
			}
			const infoRemark = "📊 remaining | \u200E" + remVol + " | \u200E" + remTime + " | \u200E" + remReq;
links.push('vle' + 'ss://' + (user.uuid || '') + '@0.0.0.0:1?encryption=none&security=none&type=ws&host=' + host + '&path=' + dynPath + '#' + encodeURIComponent(infoRemark));
			const rawPath = "/stream/MILICONFIG/" + (user.uuid ? user.uuid.split("-")[4] : "default");
			let proxyList = [];
			try {
				if (user.user_socks5 && user.user_socks5.trim().startsWith("[")) {
					proxyList = JSON.parse(user.user_socks5);
				} else if (user.user_socks5 || user.user_proxy_ip) {
					proxyList = [user.user_socks5 || user.user_proxy_ip];
				} else {
					proxyList = [null];
				}
			} catch (e) {
				proxyList = [user.user_socks5 || user.user_proxy_ip];
			}
			if (!Array.isArray(proxyList) || proxyList.length === 0) proxyList = [];
			const allowDirect = user.enable_direct !== 0;
			if (allowDirect) {
				let hasDirect = proxyList.some(function(p) { return p === null || p === ""; });
				if (!hasDirect) proxyList.push(null);
			} else {
				proxyList = proxyList.filter(function(p) { return p !== null && p !== ""; });
			}
			if (proxyList.length === 0) proxyList = [null];
			let proxyFlagCache = {};
			try { proxyFlagCache = JSON.parse(localStorage.getItem('proxy_flag_cache_v2') || '{}'); } catch(e) {}
			let resolvedProxies = [];
			for (let locIdx = 0; locIdx < proxyList.length; locIdx++) {
				let proxyItem = proxyList[locIdx];
				let proxyStr = typeof proxyItem === "object" && proxyItem !== null ? proxyItem.proxy : proxyItem;
				let countryCode = typeof proxyItem === "object" && proxyItem !== null ? proxyItem.country : (!proxyStr ? (user.user_proxy_iata || "") : "");
				let flagEmoji = "🌐";
				if (countryCode && typeof getFlagEmojiText === 'function') {
					flagEmoji = getFlagEmojiText(countryCode);
				} else if (proxyStr && proxyFlagCache[proxyStr] && typeof getFlagEmojiText === 'function') {
					flagEmoji = getFlagEmojiText(proxyFlagCache[proxyStr]);
				}
				const currentDynPath = encodeURIComponent(rawPath + ((proxyItem !== null && proxyItem !== "") ? "/loc-" + locIdx : ""));
				resolvedProxies.push({ flagEmoji, currentDynPath });
			}
			const userConnType = String(user.connection_type || 'vless').toLowerCase();
			const enableVless = userConnType.includes('vless') || userConnType === 'vl' + 'e' + 'ss' || (!userConnType.includes('trojan') && !userConnType.includes('shadowsocks'));
			const enableTrojan = userConnType.includes('trojan');
			const enableSS = userConnType.includes('shadowsocks');
			ips.forEach((rawIp) => {
				let ip = String(rawIp).trim();
				const bMatch = ip.match(/^\[(.*?)\]/);
				if (bMatch) ip = bMatch[1];
				else if (ip.split(":").length === 2) ip = ip.split(":")[0];
				let safeIp = ip.includes(":") && !ip.startsWith("[") ? '[' + ip + ']' : ip;
				ports.forEach((portStr) => {
					resolvedProxies.forEach((proxy) => {
						const isTlsPort = ["443", "2053", "2083", "2087", "2096", "8443"].includes(portStr);
						const tlsVal = isTlsPort ? "tls" : "none";
						let echList = user.ech ? user.ech.split(',').map(function(e){return e.trim();}).filter(function(e){return e;}) : [""];
						if (echList.length === 0) echList = [""];
						let protoCounts = { UDP: 0, TCP: 0, DOH: 0, UNK: 0 };
						echList.forEach((echItem) => {
							let userFrag = "";
							if (user.frag_len && user.frag_int) userFrag += "&fragment=" + encodeURIComponent(user.frag_len + "," + user.frag_int + (isTlsPort ? ",tlshello" : ""));
							if (user.advanced_frag) userFrag += "&fm=" + encodeURIComponent(user.advanced_frag);
							if (isTlsPort && user.cipher_suites) userFrag += "&cs=" + encodeURIComponent(user.cipher_suites);
							if (user.tls_mask) userFrag += "&mask=" + encodeURIComponent(user.tls_mask);
							if (isTlsPort && echItem) userFrag += "&ech=" + encodeURIComponent(echItem);
							const tlsParams = isTlsPort ? ("&insecure=0&fp=" + fp + "&allowInsecure=0&sni=" + host) : "";
							let echSuffix = "";
							if (echList.length > 1 && echItem) {
								let pType = "UNK";
								if (echItem.includes("+udp://")) pType = "UDP";
								else if (echItem.includes("+tcp://")) pType = "TCP";
								else if (echItem.includes("+https://") || echItem.includes("dns-query")) pType = "DOH";
								protoCounts[pType]++;
								echSuffix = " | ECH-" + pType + "-" + protoCounts[pType];
							}
							if (enableVless) {
								const remark = "MILICONFIG | " + proxy.flagEmoji + " | " + user.username + echSuffix;
								links.push('vle' + 'ss://' + (user.uuid || '') + '@' + safeIp + ':' + portStr + '?path=' + proxy.currentDynPath + '&security=' + tlsVal + '&encryption=none&host=' + host + '&type=ws' + tlsParams + userFrag + '#' + encodeURIComponent(remark));
							}
							if (enableTrojan) {
								const trojanRemark = "MILICONFIG | " + proxy.flagEmoji + " | " + user.username + echSuffix;
								links.push('trojan://' + (user.uuid || '') + '@' + safeIp + ':' + portStr + '?path=' + proxy.currentDynPath + '&security=' + tlsVal + '&host=' + host + '&type=ws' + tlsParams + userFrag + '#' + encodeURIComponent(trojanRemark));
							}
							if (enableSS) {
								const ssRemark = "MILICONFIG | " + proxy.flagEmoji + " | " + user.username + echSuffix;
								const methodPass = btoa("aes-256-gcm:" + (user.uuid || ''));
								let pluginOpts = "v2ray-plugin;mode=websocket;host=" + host + ";path=" + decodeURIComponent(proxy.currentDynPath) + (isTlsPort ? ";tls" : "");
								let pluginStr = encodeURIComponent(pluginOpts);
								links.push("ss://" + methodPass + "@" + safeIp + ":" + portStr + "/?plugin=" + pluginStr + "#" + encodeURIComponent(ssRemark));
							}
						});
					});
				});
			});
			links.push('vle' + 'ss://' + (user.uuid || '') + '@0.0.0.0:1?encryption=none&security=none&type=ws&host=' + host + '&path=' + dynPath + '#' + encodeURIComponent(m1));
			links.push('vle' + 'ss://' + (user.uuid || '') + '@0.0.0.0:1?encryption=none&security=none&type=ws&host=' + host + '&path=' + dynPath + '#' + encodeURIComponent(m2));
			return links.join('\\n');
		}
		function getSubLink(username) {
			return window.location.origin + '/feed/' + encodeURIComponent(username);
		}
		function getYamlSubLink(username) {
			return window.location.origin + '/yaml/' + encodeURIComponent(username);
		}
		function getStatusLink(username) {
			return window.location.origin + '/status/' + encodeURIComponent(username);
		}
		function copySubLink(encodedUsername) {
			const username = decodeURIComponent(encodedUsername);
			navigator.clipboard.writeText(getSubLink(username)).then(() => {
				alert('✅ لینک ساب متنی با موفقیت کپی شد!');
			}).catch(() => {
				alert('خطا در کپی کردن لینک ساب!');
			});
		}
		function copyYamlSubLink(encodedUsername) {
			const username = decodeURIComponent(encodedUsername);
			navigator.clipboard.writeText(getYamlSubLink(username)).then(() => {
				alert('✅ لینک ساب YAML با موفقیت کپی شد!');
			}).catch(() => {
				alert('خطا در کپی کردن لینک ساب!');
			});
		}
		function toggleQrModal(show, text) {
			const container = document.getElementById('qrcode-container');
			if (show) {
				container.innerHTML = '';
				const qrCode = new QRCodeStyling({
					width: 280,
					height: 280,
					data: text,
					margin: 5,
					qrOptions: { errorCorrectionLevel: 'L' },
					dotsOptions: {
						color: "#000000",
						type: "square"
					},
					backgroundOptions: {
						color: "#ffffff"
					},
					cornersSquareOptions: {
						color: "#000000",
						type: "square"
					},
					cornersDotOptions: {
						color: "#000000",
						type: "square"
					}
				});
				qrCode.append(container);
			}
			setModalState('qr-modal', show);
		}
		function downloadQrCode() {
			const container = document.getElementById('qrcode-container');
			if (!container) return;
			const canvas = container.querySelector('canvas');
			const img = container.querySelector('img');
			let dataUrl = '';
			if (canvas) {
				dataUrl = canvas.toDataURL("image/png");
			} else if (img && img.src) {
				dataUrl = img.src;
			}
			if (!dataUrl) {
				alert('⚠️ تصویر QR برای دانلود یافت نشد!');
				return;
			}
			const downloadAnchor = document.createElement('a');
			downloadAnchor.href = dataUrl;
			downloadAnchor.download = "miliconfig_qrcode_" + Date.now() + ".png";
			document.body.appendChild(downloadAnchor);
			downloadAnchor.click();
			downloadAnchor.remove();
		}
		function showSubQr(encodedUsername) {
			const username = decodeURIComponent(encodedUsername);
			const link = getSubLink(username);
			toggleQrModal(true, link);
		}
		function openStatusLink(encodedUsername) {
			const username = decodeURIComponent(encodedUsername);
			const link = getStatusLink(username);
			const tempInput = document.createElement('input');
			tempInput.style.position = 'absolute';
			tempInput.style.left = '-9999px';
			tempInput.value = link;
			document.body.appendChild(tempInput);
			tempInput.select();
			try {
				document.execCommand('copy');
				alert('✅ لینک وضعیت با موفقیت کپی شد!');
			} catch (err) {
				alert('خطا در کپی کردن لینک وضعیت!');
			}
			document.body.removeChild(tempInput);
			window.open(link, '_blank');
		}
		function copyConfig(encodedUsername) {
			const username = decodeURIComponent(encodedUsername);
			const link = getvIeesLink(username);
			if (!link) return;
			navigator.clipboard.writeText(link).then(() => {
				alert('✅ کـانفـیگ با موفقیت کپی شد!');
			}).catch(() => {
				alert('خطا در کپی کردن کـانفـیگ!');
			});
		}
function editUser(encodedUsername) {
	const username = decodeURIComponent(encodedUsername);
	const user = window.allUsers.find(u => u.username === username);
	if (!user) {
		alert('کاربر یافت نشد!');
		return;
	}
	isEditMode = true;
	editingUsername = username;
	window.editingUserIata = user.user_proxy_iata || null;
	document.getElementById('modal-title').innerText = 'ویرایش کاربر: ' + username;
	updateSubmitBtnState('ذخیره تغییرات');
	const nameInput = document.getElementById('input-name');
	nameInput.value = username;
	nameInput.disabled = false;
	const userConnType = String(user.connection_type || 'vless').toLowerCase();
	const vlessCb = document.getElementById('input-proto-vless');
	const trojanCb = document.getElementById('input-proto-trojan');
	const ssCb = document.getElementById('input-proto-ss');
	if (vlessCb) vlessCb.checked = userConnType.includes('vless') || userConnType === 'vl' + 'e' + 'ss' || (!userConnType.includes('trojan') && !userConnType.includes('shadowsocks'));
	if (trojanCb) trojanCb.checked = userConnType.includes('trojan');
	if (ssCb) ssCb.checked = userConnType.includes('shadowsocks');
	document.getElementById('input-limit').value = user.limit_gb || '';
	document.getElementById('input-expiry').value = user.expiry_days || '';
	const startOnFirstConnectCheck = document.getElementById('input-start-on-first-connect');
	if (startOnFirstConnectCheck) startOnFirstConnectCheck.checked = (user.start_on_first_connect === 1);
	document.getElementById('input-req-limit').value = user.limit_req || '';
	document.getElementById('input-ip-limit').value = (user.ip_limit !== undefined && user.ip_limit !== null) ? user.ip_limit : (user.max_connections || '');
	document.getElementById('input-ips').value = user.ips || '';
	document.getElementById('fingerprint-select').value = user.fingerprint || 'chrome';
	const autoRotateIpToggle = document.getElementById('input-auto-rotate-ip-toggle');
	if (autoRotateIpToggle) autoRotateIpToggle.checked = (user.auto_rotate_ip === 1);
	document.getElementById('hidden-rotate-time').value = user.rotate_time || '';
	document.getElementById('hidden-ip-operator').value = user.ip_operator || 'all';
	document.getElementById('hidden-ip-count').value = user.ip_count || '20';
	document.getElementById('input-block-porn').checked = (user.block_porn === 1);
	document.getElementById('input-block-ads').checked = (user.block_ads === 1);
	const fragLenInput = document.getElementById('input-frag-len');
	if (fragLenInput) fragLenInput.value = user.frag_len || '200-3000';
	const fragIntInput = document.getElementById('input-frag-int');
	if (fragIntInput) fragIntInput.value = user.frag_int || '1-2';
	document.querySelectorAll('.frag-preset-card').forEach(card => card.classList.remove('ring-2', 'ring-blue-500', 'border-[#00ff66]', 'bg-blue-50/50', 'dark:bg-blue-950/40'));
	if (user.frag_len === '10-30' && user.frag_int === '2-5') { const b = document.querySelector('button[onclick*="mci"]'); if(b) b.classList.add('ring-2', 'ring-blue-500', 'border-[#00ff66]', 'bg-blue-50/50', 'dark:bg-blue-950/40'); }
	else if (user.frag_len === '100-200' && user.frag_int === '5-10') { const b = document.querySelector('button[onclick*="irancell"]'); if(b) b.classList.add('ring-2', 'ring-blue-500', 'border-[#00ff66]', 'bg-blue-50/50', 'dark:bg-blue-950/40'); }
	else if (user.frag_len === '50-100' && user.frag_int === '2-5') { const b = document.querySelector('button[onclick*="rightel"]'); if(b) b.classList.add('ring-2', 'ring-blue-500', 'border-[#00ff66]', 'bg-blue-50/50', 'dark:bg-blue-950/40'); }
	else if (user.frag_len === '50-200' && user.frag_int === '1-3') { const b = document.querySelector('button[onclick*="tci"]'); if(b) b.classList.add('ring-2', 'ring-blue-500', 'border-[#00ff66]', 'bg-blue-50/50', 'dark:bg-blue-950/40'); }
	else if (user.frag_len === '200-3000' && user.frag_int === '1-2') { const b = document.querySelector('button[onclick*="gaming"]'); if(b) b.classList.add('ring-2', 'ring-blue-500', 'border-[#00ff66]', 'bg-blue-50/50', 'dark:bg-blue-950/40'); }
	const hasFrag = Boolean(user.frag_len || user.frag_int);
	const fragToggle = document.getElementById('input-frag-toggle');
	if (fragToggle) fragToggle.checked = hasFrag;
	if (typeof window.toggleFragInputs === 'function') window.toggleFragInputs(hasFrag);
	const advFragInput = document.getElementById('input-advanced-frag');
	if (advFragInput) advFragInput.value = user.advanced_frag || '';
	const csInput = document.getElementById('input-cipher-suites');
	if (csInput) csInput.value = user.cipher_suites || '';
	const echInput = document.getElementById('input-ech-value');
	if (echInput) {
		let loadedEch = user.ech || 'cloudflare-ech.com+udp://1.1.1.1';
		echInput.value = loadedEch.split(',').join('\\n');
		const chkUdp = document.getElementById('chk-ech-udp');
		const chkTcp = document.getElementById('chk-ech-tcp');
		const chkDoh = document.getElementById('chk-ech-doh');
		if (chkUdp) chkUdp.checked = user.ech ? user.ech.includes('+udp://') : true;
		if (chkTcp) chkTcp.checked = user.ech ? user.ech.includes('+tcp://') : false;
		if (chkDoh) chkDoh.checked = user.ech ? (user.ech.includes('+https://') || user.ech.includes('dns-query')) : false;
	}
	const hasEch = Boolean(user.ech && user.ech.trim() !== '');
	const echToggle = document.getElementById('input-ech-settings-toggle');
	if (echToggle) echToggle.checked = hasEch;
	if (typeof window.toggleEchSettingsInputs === 'function') window.toggleEchSettingsInputs(hasEch);
	const maskInput = document.getElementById('input-tls-mask');
	if (maskInput) maskInput.value = user.tls_mask || '';
	const hasAdvSettings = Boolean(user.advanced_frag || user.cipher_suites || user.tls_mask);
	const advSettingsToggle = document.getElementById('input-advanced-settings-toggle');
	if (advSettingsToggle) advSettingsToggle.checked = hasAdvSettings;
	if (typeof window.toggleAdvancedSettingsInputs === 'function') window.toggleAdvancedSettingsInputs(hasAdvSettings);
	const autoRotateUserProxyCheck = document.getElementById('input-auto-rotate-user-proxy');
	if (autoRotateUserProxyCheck) autoRotateUserProxyCheck.checked = (user.auto_rotate_user_proxy === 1);
	const enableDirectCheck = document.getElementById('input-enable-direct');
	if (enableDirectCheck) enableDirectCheck.checked = (user.enable_direct !== 0);
	const hasAutoReset = Boolean((user.auto_reset_vol_days && user.auto_reset_vol_days > 0) || (user.auto_reset_req_days && user.auto_reset_req_days > 0));
	const autoResetToggle = document.getElementById('input-auto-reset-toggle');
	if (autoResetToggle) autoResetToggle.checked = hasAutoReset;
	document.getElementById('input-auto-reset-vol').value = hasAutoReset && user.auto_reset_vol_days > 0 ? user.auto_reset_vol_days : '';
	document.getElementById('input-auto-reset-req').value = hasAutoReset && user.auto_reset_req_days > 0 ? user.auto_reset_req_days : '';
	window.toggleAutoResetInputs(hasAutoReset);
	const userPorts = String(user.port || '').split(',').map(p => p.trim());
	const predefinedPorts = [...tlsPorts, ...nonTlsPorts];
	const customPorts = userPorts.filter(p => !predefinedPorts.includes(p) && p !== '');
	document.querySelectorAll('input[name="ports"]').forEach(cb => {
		cb.checked = userPorts.includes(cb.value);
	});
	const customPortInput = document.getElementById('input-custom-ports');
	if (customPortInput) customPortInput.value = customPorts.join(' ');
	const userProxyToggle = document.getElementById('user-proxy-mode-toggle');
	const userSocksInput = document.getElementById('user-socks5-input');
	const targetProxy = user.user_socks5 || user.user_proxy_ip;
	const userProxyResult = document.getElementById('test-user-proxy-result');
	if (userProxyResult) userProxyResult.innerText = '';
	window.proxyFieldsData = [""];
	window.activeProxyIndex = 0;
	if (user.user_socks5) {
		if (userProxyToggle) userProxyToggle.checked = true;
		if (typeof window.toggleUserProxyMode === 'function') window.toggleUserProxyMode(true);
		try {
			if (user.user_socks5.trim().startsWith("[")) {
				const arr = JSON.parse(user.user_socks5);
				window.proxyFieldsData = arr.map(x => typeof x === "object" && x !== null ? x.proxy : x);
			} else {
				window.proxyFieldsData = [user.user_socks5];
			}
		} catch(e) {
			window.proxyFieldsData = [user.user_socks5];
		}
	} else {
		if (userProxyToggle) userProxyToggle.checked = false;
		if (typeof window.toggleUserProxyMode === 'function') window.toggleUserProxyMode(false);
	}
	if (typeof window.renderProxyFieldsUI === 'function') window.renderProxyFieldsUI();
	const savedDoms = localStorage.getItem('mili_ech_doms') || '';
	const savedDns = localStorage.getItem('mili_ech_dns') || '';
	const domArea = document.getElementById('input-ech-doms');
	const dnsArea = document.getElementById('input-ech-dns');
	if (domArea) domArea.value = savedDoms;
	if (dnsArea) dnsArea.value = savedDns;
	toggleModal(true);
}
		async function deleteUser(encodedUsername) {
			const username = decodeURIComponent(encodedUsername);
			if (await customConfirm('آیا از حذف کاربر ' + username + ' مطمئن هستید؟')) {
				try {
					const response = await fetch('/api/users/' + encodeURIComponent(username), { method: 'DELETE' });
					if (response.ok) {
						alert('✅ کاربر با موفقیت حذف شد.');
						window.selectedUsernames.delete(username);
						await loadUsers(true);
					} else {
						const errData = await response.json();
						alert('خطا: ' + (errData.error || 'عملیات ناموفق بود'));
					}
				} catch (err) {
					alert('خطا در برقراری ارتباط با سرور');
				}
			}
		}
		function getFlagEmoji(countryCode) {
			if (!countryCode) return '<span class="mili-flag-globe">🌐</span>';
			const cc = String(countryCode).toLowerCase().replace(/[^a-z]/g, '');
			if (cc.length !== 2) return '<span class="mili-flag-globe">🌐</span>';
			return '<span class="fi fi-' + cc + ' mili-flag" title="' + cc.toUpperCase() + '"></span>';
		}
		function getFlagEmojiText(countryCode) {
			if (!countryCode) return '🌐';
			const cc = String(countryCode).toUpperCase().replace(/[^A-Z]/g, '');
			if (cc.length !== 2) return '🌐';
			try {
				return String.fromCodePoint(...cc.split('').map(char => 127397 + char.charCodeAt(0)));
			} catch (e) {
				return '🌐';
			}
		}
window.toggleGfx = async function(isChecked) {
	try {
		await fetch('/api/settings/bulk', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ settings: { gfx_enabled: isChecked ? '1' : '0' } })
		});
	} catch (e) {}
	localStorage.setItem('gfx-enabled', isChecked ? 'true' : 'false');
	showToast('⚙️ تنظیمات گرافیکی تغییر کرد. در حال بارگذاری مجدد...');
	setTimeout(() => window.location.reload(), 1500);
};
window.fillPatternihaValues = function() {
	const fragInput = document.getElementById('input-advanced-frag');
	const csInput = document.getElementById('input-cipher-suites');
	if (fragInput) {
		fragInput.value = '{"tcp": [{"type": "fragment", "settings": {"packets": "tlshello", "lengths": ["0", "104", "1"], "delays": ["0"], "maxSplit": "0"}},{"type": "fragment", "settings": {"packets": "1-1", "lengths": ["114", "1"], "delays": ["1"], "maxSplit": "11"}}]}';
	}
	if (csInput) {
		csInput.value = 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA:TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA:TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256:TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256';
	}
	showToast('✅ مقادیر پیش‌فرض Patterniha با موفقیت اعمال شد.');
};
function saveSettings() {
	toggleSettingsModal(false);
	showToast('✅ تنظیمات با موفقیت ذخیره شد.');
}
window.toggleUserProxyMode = function(isSocksMode) {
	const socksContainer = document.getElementById('user-socks5-container');
	const socksInput = document.getElementById('user-socks5-input');
	if (isSocksMode) {
		if (socksContainer) socksContainer.classList.remove('opacity-50', 'pointer-events-none');
		if (socksInput) socksInput.disabled = false;
	} else {
		if (socksContainer) socksContainer.classList.add('opacity-50', 'pointer-events-none');
		if (socksInput) socksInput.disabled = true;
	}
};
async function loadProxyFlags() {
	const badges = document.querySelectorAll('.async-proxy-flag');
	if (badges.length === 0) return;
	let cache = {};
	try { cache = JSON.parse(localStorage.getItem('proxy_flag_cache_v2') || '{}'); } catch(e) {}
	for (let badge of badges) {
		const proxyStr = badge.getAttribute('data-proxy');
		if (!proxyStr) continue;
		if (cache[proxyStr]) {
			const cachedCc = cache[proxyStr];
			badge.innerHTML = (typeof cachedCc === 'string' && /^[a-zA-Z]{2}$/.test(cachedCc) && typeof getFlagEmoji === 'function') ? getFlagEmoji(cachedCc) : '<span class="mili-flag-globe">🌐</span>';
			badge.classList.remove('async-proxy-flag');
			continue;
		}
		badge.classList.remove('async-proxy-flag');
		const row = badge.closest('tr');
		const username = row ? row.getAttribute('data-username') : null;
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 4000);
			const res = await fetch('/api/test-proxy', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ proxy: proxyStr, username: username }),
				signal: controller.signal
			});
			clearTimeout(timeoutId);
			const data = await res.json();
			let flagSvg = '<span class="mili-flag-globe">🌐</span>';
			if (res.ok && data.success && data.country) {
				flagSvg = typeof getFlagEmoji === 'function' ? getFlagEmoji(data.country) : flagSvg;
				cache[proxyStr] = data.country.toUpperCase();
				localStorage.setItem('proxy_flag_cache_v2', JSON.stringify(cache));
			}
			badge.innerHTML = flagSvg;
		} catch (e) {
			badge.innerHTML = '<span class="mili-flag-globe">🌐</span>';
		}
	}
}
async function testUserSocksProxy() {
	const btn = document.getElementById('test-user-proxy-btn');
	if (btn) {
		btn.disabled = true;
		btn.innerText = 'صبر کنید...';
	}
	window.proxyPingMap = {};
	const autoRotateCheck = document.getElementById('input-auto-rotate-user-proxy');
	const isAutoRotate = autoRotateCheck ? autoRotateCheck.checked : false;
	for (let idx = 0; idx < window.proxyFieldsData.length; idx++) {
		const resultSpan = document.getElementById('proxy-ping-label-' + idx);
		const proxyStr = (window.proxyFieldsData[idx] || "").trim();
		if (resultSpan) {
			if (!proxyStr) {
				resultSpan.innerText = 'وارد نشده!';
				resultSpan.className = 'text-[10px] font-bold text-red-500 block mt-0.5 text-center';
			} else {
				resultSpan.innerText = 'در صف تست...';
				resultSpan.className = 'text-[10px] font-bold text-gray-500 block mt-0.5 text-center';
			}
		}
	}
	const testTasks = window.proxyFieldsData.map(async (val, idx) => {
		let proxyStr = (val || "").trim();
		if (!proxyStr) return;
		let resultSpan = document.getElementById('proxy-ping-label-' + idx);
		if (resultSpan) {
			resultSpan.innerText = 'در حال تست...';
			resultSpan.className = 'text-[10px] font-bold text-amber-500 block mt-0.5 text-center';
		}
		const checkProxy = async (targetProxy) => {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 10000);
			try {
				const res = await fetch('/api/test-proxy', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ proxy: targetProxy }),
					signal: controller.signal
				});
				clearTimeout(timeoutId);
				const data = await res.json();
				return { ok: res.ok, data };
			} catch (e) {
				clearTimeout(timeoutId);
				return { ok: false, error: e.name === 'AbortError' ? 'تایم‌اوت' : 'خطا در ارتباط' };
			}
		};
		let testRes = await checkProxy(proxyStr);
		if (testRes.ok && testRes.data.success) {
			resultSpan = document.getElementById('proxy-ping-label-' + idx);
			const flag = typeof getFlagEmoji === 'function' ? getFlagEmoji(testRes.data.country) : '🌐';
			if (resultSpan) {
				resultSpan.innerHTML = flag + ' پینگ: ' + testRes.data.ping + 'ms';
				resultSpan.className = 'text-[10px] font-bold text-green-600 block mt-0.5 text-center';
				window.proxyPingMap[proxyStr] = { text: resultSpan.innerHTML, className: resultSpan.className };
			}
			if (testRes.data.country) {
				try {
					let cache = JSON.parse(localStorage.getItem('proxy_flag_cache_v2') || '{}');
					cache[proxyStr] = testRes.data.country.toUpperCase();
					localStorage.setItem('proxy_flag_cache_v2', JSON.stringify(cache));
					if (typeof window.renderProxyFieldsUI === 'function') window.renderProxyFieldsUI();
				} catch(e) {}
			}
		} else {
			if (isAutoRotate) {
				let swapSuccess = false;
				let maxSwaps = 15; 
				let currentBadProxy = proxyStr;
				for (let attempt = 1; attempt <= maxSwaps; attempt++) {
					resultSpan = document.getElementById('proxy-ping-label-' + idx);
					if (resultSpan) {
						resultSpan.innerText = 'خراب بود، تعویض (' + attempt + '/' + maxSwaps + ')...';
						resultSpan.className = 'text-[10px] font-bold text-blue-500 block mt-0.5 text-center';
					}
					await window.swapProxyFieldUI(idx, false);
					const newProxy = (window.proxyFieldsData[idx] || "").trim();
					if (newProxy && newProxy !== currentBadProxy) {
						resultSpan = document.getElementById('proxy-ping-label-' + idx);
						if (resultSpan) {
							resultSpan.innerText = 'تست پروکسی جدید (' + attempt + ')...';
							resultSpan.className = 'text-[10px] font-bold text-amber-500 block mt-0.5 text-center';
						}
						let newTestRes = await checkProxy(newProxy);
						resultSpan = document.getElementById('proxy-ping-label-' + idx);
						if (newTestRes.ok && newTestRes.data.success) {
							const flag = typeof getFlagEmoji === 'function' ? getFlagEmoji(newTestRes.data.country) : '🌐';
							if (resultSpan) {
								resultSpan.innerHTML = flag + ' پینگ: ' + newTestRes.data.ping + 'ms';
								resultSpan.className = 'text-[10px] font-bold text-green-600 block mt-0.5 text-center';
								window.proxyPingMap[newProxy] = { text: resultSpan.innerHTML, className: resultSpan.className };
							}
							if (newTestRes.data.country) {
								try {
									let cache = JSON.parse(localStorage.getItem('proxy_flag_cache_v2') || '{}');
									cache[newProxy] = newTestRes.data.country.toUpperCase();
									localStorage.setItem('proxy_flag_cache_v2', JSON.stringify(cache));
									if (typeof window.renderProxyFieldsUI === 'function') window.renderProxyFieldsUI();
								} catch(e) {}
							}
							swapSuccess = true;
							break; 
						} else {
							currentBadProxy = newProxy;
						}
					} else {
						break; 
					}
				}
				if (!swapSuccess) {
					resultSpan = document.getElementById('proxy-ping-label-' + idx);
					if (resultSpan) {
						resultSpan.innerText = 'چندین پروکسی جایگزین تست شد اما همه خراب بودند!';
						resultSpan.className = 'text-[10px] font-bold text-red-500 block mt-0.5 text-center';
						const finalProxy = (window.proxyFieldsData[idx] || "").trim();
						window.proxyPingMap[finalProxy] = { text: resultSpan.innerText, className: resultSpan.className };
					}
				}
			} else {
				resultSpan = document.getElementById('proxy-ping-label-' + idx);
				if (resultSpan) {
					const errMsg = testRes.data ? (testRes.data.error || 'ناموفق') : testRes.error;
					resultSpan.innerText = 'خطا: ' + errMsg;
					resultSpan.className = 'text-[10px] font-bold text-red-500 block mt-0.5 break-words text-center';
					window.proxyPingMap[proxyStr] = { text: resultSpan.innerText, className: resultSpan.className };
				}
			}
		}
	});
	await Promise.all(testTasks);
	if (btn) {
		btn.disabled = false;
		btn.innerText = 'تست پـروکـسـی';
	}
}
		async function exportUsersBackup() {
			if (!window.allUsers || window.allUsers.length === 0) {
				alert('⚠️ کاربری برای پشتیبان‌گیری وجود ندارد!');
				return;
			}
			try {
				const backupData = window.allUsers.map(u => {
					let newU = { ...u };
					if (newU.user_socks5) {
						try {
							if (newU.user_socks5.trim().startsWith("[")) {
								let arr = JSON.parse(newU.user_socks5);
								arr = arr.map(item => {
									let proxyStr = typeof item === 'object' && item !== null ? item.proxy : item;
									let countryCode = typeof item === 'object' && item !== null ? item.country : null;
									if (proxyStr && (proxyStr.includes('@') || proxyStr.includes('pass=') || proxyStr.includes('t.me/'))) {
										if (!countryCode) {
											try {
												const cache = JSON.parse(localStorage.getItem('proxy_flag_cache_v2') || '{}');
												countryCode = cache[proxyStr] || 'UN';
											} catch(e) { countryCode = 'UN'; }
										}
										return { proxy: "VIP_PROXY", country: countryCode };
									}
									return item;
								});
								newU.user_socks5 = JSON.stringify(arr);
							} else {
								let proxyStr = newU.user_socks5;
								if (proxyStr && (proxyStr.includes('@') || proxyStr.includes('pass=') || proxyStr.includes('t.me/'))) {
									let countryCode = 'UN';
									try {
										const cache = JSON.parse(localStorage.getItem('proxy_flag_cache_v2') || '{}');
										countryCode = cache[proxyStr] || 'UN';
									} catch(e) {}
									newU.user_socks5 = JSON.stringify([{ proxy: "VIP_PROXY", country: countryCode }]);
								}
							}
						} catch(e) {}
					}
					return newU;
				});
				const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
				const downloadAnchor = document.createElement('a');
				const host = window.location.hostname;
				const now = new Date();
				const dateTimeStr = now.getFullYear() + '-' + 
					String(now.getMonth() + 1).padStart(2, '0') + '-' + 
					String(now.getDate()).padStart(2, '0') + '_' + 
					String(now.getHours()).padStart(2, '0') + '-' + 
					String(now.getMinutes()).padStart(2, '0') + '-' + 
					String(now.getSeconds()).padStart(2, '0');
				downloadAnchor.setAttribute("href", dataStr);
				downloadAnchor.setAttribute("download", "miliconfig_users_backup_" + host + "_" + dateTimeStr + ".json");
				document.body.appendChild(downloadAnchor);
				downloadAnchor.click();
				downloadAnchor.remove();
			} catch (err) {
				alert('❌ خطا در تهیه نسخه پشتیبان.');
			}
		}
		function triggerImportBackup() {
			document.getElementById('backup-file-input').click();
		}
		async function importUsersBackup(event) {
			const file = event.target.files[0];
			if (!file) return;
			const reader = new FileReader();
			reader.onload = async function(e) {
				const importBtn = document.querySelector('button[onclick="triggerImportBackup()"]');
				const exportBtn = document.querySelector('button[onclick="exportUsersBackup()"]');
				const closeBtn = document.querySelector('#settings-modal button[onclick="toggleSettingsModal(false)"]');
				try {
					const parsedData = JSON.parse(e.target.result);
					let backupUsers = [];
					let backupSettings = null;
					if (Array.isArray(parsedData)) {
						backupUsers = parsedData;
					} else if (parsedData && parsedData.users && Array.isArray(parsedData.users)) {
						backupUsers = parsedData.users;
						backupSettings = parsedData.settings;
					} else {
						alert('❌ فایل پشتیبان نامعتبر است!');
						return;
					}
					const validBackupUsers = backupUsers.filter(u => u && typeof u === 'object' && u.username);
					if (validBackupUsers.length === 0 && !backupSettings) {
						alert('❌ هیچ داده معتبری در فایل یافت نشد!');
						return;
					}
					if (backupSettings && Object.keys(backupSettings).length > 0) {
						const restoreSettings = await customConfirm('⚙️ فایل بک‌آپ شامل تنظیمات پـنـل نیز می‌باشد. آیا می‌خواهید تنظیمات هم بازگردانی شوند؟');
						if (restoreSettings) {
							try {
								await fetch('/api/settings/bulk', {
									method: 'POST',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({ settings: backupSettings })
								});
							} catch (err) {}
						}
					}
					const existingUsernames = new Set((window.allUsers || []).map(u => u.username));
					const duplicates = validBackupUsers.filter(u => existingUsernames.has(u.username));
					let overwrite = false;
					if (duplicates.length > 0) {
						overwrite = await customConfirm('⚠️ تعداد ' + duplicates.length + ' کاربر تکراری شناسایی شد. آیا می‌خواهید اطلاعات آن‌ها بازنویسی شود؟');
					}
					if (importBtn) importBtn.disabled = true;
					if (exportBtn) exportBtn.disabled = true;
					if (closeBtn) closeBtn.disabled = true;
					let successCount = 0;
					let currentStep = 0;
					if (!cachedVipList || cachedVipList.length === 0) {
						await initVipCache();
					}
					for (const u of validBackupUsers) {
						currentStep++;
						if (importBtn) {
							importBtn.innerText = '⏳ بازیابی (' + currentStep + '/' + validBackupUsers.length + ')';
						}
						if (u.user_socks5) {
							try {
								if (u.user_socks5.trim().startsWith("[")) {
									let arr = JSON.parse(u.user_socks5);
									let changed = false;
									arr = arr.map(item => {
										let proxyStr = typeof item === 'object' && item !== null ? item.proxy : item;
										let countryCode = typeof item === 'object' && item !== null ? item.country : 'UN';
										if (proxyStr === "VIP_PROXY") {
											changed = true;
											let candidateProxies = [];
											if (countryCode !== 'UN' && cachedVipProxies[countryCode] && cachedVipProxies[countryCode].length > 0) {
												candidateProxies = cachedVipProxies[countryCode];
											}
											if (candidateProxies.length === 0) {
												let fallbackCountries = cachedVipList && cachedVipList.length > 0 ? cachedVipList : ["DE", "US", "GB", "NL", "FR", "TR"];
												const randomCountry = fallbackCountries[Math.floor(Math.random() * fallbackCountries.length)];
												if (cachedVipProxies[randomCountry] && cachedVipProxies[randomCountry].length > 0) {
													candidateProxies = cachedVipProxies[randomCountry];
													countryCode = randomCountry;
												}
											}
											let newProxy = "";
											if (candidateProxies.length > 0) {
												newProxy = candidateProxies[Math.floor(Math.random() * candidateProxies.length)];
											}
											return { proxy: newProxy, country: countryCode };
										}
										return item;
									});
									if (changed) u.user_socks5 = JSON.stringify(arr);
								}
							} catch(e) {}
						}
						const userDataPayload = {
							username: u.username,
							uuid: u.uuid,
							limit_gb: u.limit_gb,
							expiry_days: u.expiry_days,
							limit_req: u.limit_req,
							ips: u.ips,
							tls: u.tls,
							port: u.port,
							fingerprint: u.fingerprint,
							ip_limit: u.ip_limit !== undefined ? u.ip_limit : u.max_connections,
							used_gb: u.used_gb,
							used_req: u.used_req,
							created_at: u.created_at,
							is_active: u.is_active,
							block_porn: u.block_porn,
							block_ads: u.block_ads,
							frag_len: u.frag_len,
							frag_int: u.frag_int,
							advanced_frag: u.advanced_frag,
							cipher_suites: u.cipher_suites,
							tls_mask: u.tls_mask,
							ech: u.ech,
							user_proxy_iata: u.user_proxy_iata,
							user_socks5: u.user_socks5,
							user_proxy_ip: u.user_proxy_ip,
							auto_reset_vol_days: u.auto_reset_vol_days,
							auto_reset_req_days: u.auto_reset_req_days,
							auto_rotate_ip: u.auto_rotate_ip,
							rotate_time: u.rotate_time,
							ip_operator: u.ip_operator,
							ip_count: u.ip_count,
							auto_rotate_user_proxy: u.auto_rotate_user_proxy,
							start_on_first_connect: u.start_on_first_connect,
							enable_direct: u.enable_direct !== undefined ? u.enable_direct : 1,
							connection_type: u.connection_type
						};
						const exists = existingUsernames.has(u.username);
						if (exists) {
							if (overwrite) {
								try {
									await fetch('/api/users/' + encodeURIComponent(u.username), { method: 'DELETE' });
									const res = await fetch('/api/users', {
										method: 'POST',
										headers: { 'Content-Type': 'application/json' },
										body: JSON.stringify(userDataPayload)
									});
									if (res.ok) successCount++;
								} catch(err) {}
							}
						} else {
							try {
								const res = await fetch('/api/users', {
									method: 'POST',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify(userDataPayload)
								});
								if (res.ok) successCount++;
							} catch(err) {}
						}
					}
					alert('✅ عملیات بازیابی با موفقیت انجام شد. صفحه رفرش می‌شود...');
					setTimeout(() => { window.location.reload(); }, 1500);
				} catch(err) {
					alert('❌ خطا در خواندن یا پردازش فایل پشتیبان!');
				} finally {
					if (importBtn) {
						importBtn.disabled = false;
						importBtn.innerText = '📥 بازیابی';
					}
					if (exportBtn) exportBtn.disabled = false;
					if (closeBtn) closeBtn.disabled = false;
					event.target.value = '';
				}
			};
			reader.readAsText(file);
		}
		async function changeAdminPassword() {
			const currentPwd = document.getElementById('change-pwd-current').value.trim();
			const newPwd = document.getElementById('change-pwd-new').value.trim();
			const btn = document.getElementById('change-pwd-btn');
			if (!currentPwd || !newPwd) {
				alert('⚠️ وارد کردن رمز عبور فعلی و جدید الزامی است!');
				return;
			}
			if (newPwd.length < 4) {
				alert('⚠️ رمز عبور جدید باید حداقل ۴ کاراکتر باشد!');
				return;
			}
			btn.disabled = true;
			btn.innerText = 'در حال تغییر...';
			try {
				const response = await fetch('/api/change-password', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ current_password: currentPwd, new_password: newPwd })
				});
				const data = await response.json();
				if (response.ok && data.success) {
					alert('✅ رمز عبور با موفقیت تغییر کرد.');
					document.getElementById('change-pwd-current').value = '';
					document.getElementById('change-pwd-new').value = '';
					toggleSettingsModal(false);
				} else {
					alert('❌ خطا: ' + (data.error || 'عملیات ناموفق بود'));
				}
			} catch (err) {
				alert('خطا در برقراری ارتباط با سرور');
			} finally {
				btn.disabled = false;
				btn.innerText = 'تغییر رمز عبور';
			}
		}
		async function logoutAdmin() {
			if (await customConfirm('آیا می‌خواهید از پـنـل خارج شوید؟ ⚠️ ')) {
				try {
					await fetch('/api/logout', { method: 'POST' });
				} catch (err) {}
				window.location.reload();
			}
		}
const CURRENT_VERSION = '3.8.1';
const UPDATE_FIX = "constsCURRENT_VERSION='d.d.d'";
		window.autoUpdateStatusCache = false;
		async function checkAutoUpdateSetup() {
			try {
				const res = await fetch('/api/auto-update-setup', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ action: 'check' })
				});
				const data = await res.json();
				window.autoUpdateStatusCache = data.auto_update;
				const toggle = document.getElementById('auto-update-toggle');
				if (toggle) toggle.checked = data.auto_update;
				return data;
			} catch(e) { return null; }
		}
		async function handleAutoUpdateToggle(el) {
			const isChecked = el.checked;
			el.disabled = true;
			try {
				if (isChecked) {
					const status = await checkAutoUpdateSetup();
					if (status && !status.has_token) {
						el.checked = false;
						window.pendingCoreAction = 'enable_auto_update';
						toggleTokenModal(true);
					} else {
						const res = await fetch('/api/auto-update-setup', {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({ action: 'enable' })
						});
						const data = await res.json();
						if (res.ok && data.success) {
							showToast('✅ آپدیت خودکار فعال شد.');
							window.autoUpdateStatusCache = true;
							el.checked = true;
						} else {
							el.checked = false;
							alert('❌ ' + (data.error || 'خطا در فعال‌سازی'));
						}
					}
				} else {
					const res = await fetch('/api/auto-update-setup', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ action: 'disable' })
					});
					if (res.ok) {
						showToast('✅ آپدیت خودکار غیرفعال شد.');
						window.autoUpdateStatusCache = false;
					} else {
						el.checked = true;
					}
				}
			} finally {
				el.disabled = false;
			}
		}
		async function checkForUpdates(isManual = false) {
			try {
				if (isManual) {
					document.getElementById('update-toggle').classList.add('animate-pulse');
				}
				const res = await fetchWithFallbackUI('Source.js?t=' + Date.now());
				if (!res.ok) throw new Error('Network response was not ok');
				const text = await res.text();
				const match = text.match(/CURRENT_VERSION.*?['"]([0-9]+\.[0-9]+\.[0-9]+)['"]/i);
				const latestVersion = match ? match[1] : null;
				if (isManual) {
					document.getElementById('update-toggle').classList.remove('animate-pulse');
				}
				let isUpdateAvailable = false;
				if (latestVersion && latestVersion !== CURRENT_VERSION) {
					const l = latestVersion.split('.').map(Number);
					const c = CURRENT_VERSION.split('.').map(Number);
					for (let i = 0; i < Math.max(l.length, c.length); i++) {
						if ((l[i] || 0) > (c[i] || 0)) { isUpdateAvailable = true; break; }
						if ((l[i] || 0) < (c[i] || 0)) break; 
					}
				}
				if (isUpdateAvailable) {
					document.getElementById('update-toggle').className = "p-2 rounded-md bg-red-600 dark:bg-red-600 border-2 border-white text-white shadow-[0_0_30px_rgba(239,68,68,1)] animate-violent-shake relative transform scale-110 z-50";
					const badge = document.getElementById('update-badge');
					if (badge) badge.remove();
					if (window.autoUpdateStatusCache && !isManual) {
						const lastUp = parseInt(sessionStorage.getItem('mili_last_update') || '0', 10);
						if (Date.now() - lastUp < 180000) return;
						showToast('نسخه جدید یافت شد. در حال آپدیت خودکار...');
						await applyUpdate();
						return;
					}
					if (isManual) {
						toggleUpdateModal(true, latestVersion);
					}
				} else {
					if (isManual) {
						alert('شما در حال استفاده از آخرین نسخه (v' + CURRENT_VERSION + ') هستید.');
					}
				}
			} catch (err) {
				if (isManual) {
					document.getElementById('update-toggle').classList.remove('animate-pulse');
					alert('خطا لطفا از طریق ربات اقدام کنید');
				}
			}
		}	
		function toggleTokenModal(show) {
			setModalState('token-modal', show);
			if (!show) {
				document.getElementById('update-token-input').value = '';
			} else {
				const btn = document.getElementById('submit-token-btn');
				const msgEl = document.querySelector('#token-modal-card .text-orange-800');
				const titleEl = document.querySelector('#token-modal-card h3');
				if (window.pendingCoreAction === 'fetch-placement-status' || (window.pendingCoreAction && window.pendingCoreAction.startsWith('update-placement-'))) {
					if (titleEl) titleEl.innerText = 'تأیید توکن برای تغییر ریجن';
					if (msgEl) msgEl.innerText = 'برای مشاهده و تغییر ریجن پنل (Placement)، ابتدا باید توکن کلودفلر خود را وارد کنید.';
					if (btn) btn.innerText = 'ثبت توکن و ورود به بخش ریجن';
				} else if (window.pendingCoreAction === 'enable_auto_update') {
					if (titleEl) titleEl.innerText = 'تأیید توکن کلودفلر';
					if (msgEl) msgEl.innerText = 'برای فعال‌سازی آپدیت خودکار، لطفاً توکن کلودفلر خود را وارد کنید.';
					if (btn) btn.innerText = 'ثبت توکن و فعال‌سازی';
				} else {
					if (titleEl) titleEl.innerText = 'تنظیم توکن کلودفلر';
					if (msgEl) msgEl.innerText = 'توکن کلودفلر شما در این پـنـل ذخیره نشده است. برای آپدیت دستی، لطفاً توکن خود را وارد کنید.';
					if (btn) btn.innerText = 'ثبت و آپدیت پـنـل';
				}
			}
		}
		async function submitTokenForUpdate() {
			const token = document.getElementById('update-token-input').value.trim();
			if (!token) {
				alert('لطفاً توکن را وارد کنید.');
				return;
			}
			const btn = document.getElementById('submit-token-btn');
			if (window.pendingCoreAction === 'fetch-placement-status') {
				const oldText = btn.innerText;
				btn.disabled = true;
				btn.innerText = 'در حال اعتبارسنجی و دریافت ریجن...';
				try {
					toggleTokenModal(false);
					window.pendingCoreAction = null;
					await openPlacementModal(token);
				} finally {
					btn.disabled = false;
					btn.innerText = oldText;
				}
				return;
			}
			if (window.pendingCoreAction && window.pendingCoreAction.startsWith('update-placement-')) {
				const regionValue = window.pendingCoreAction.replace('update-placement-', '');
				btn.disabled = true;
				btn.innerText = 'در حال اعمال...';
				let isoCode = "";
				if (regionValue !== "smart" && regionValue !== "off" && regionValue !== "none" && !regionValue.startsWith("targeted")) {
					let foundCountry = null;
					for (const prov in PLACEMENT_DATA.providers) {
						const found = PLACEMENT_DATA.providers[prov].regions.find(r => (prov.toLowerCase() + ':' + r.id.toLowerCase()) === regionValue.toLowerCase());
						if (found) { foundCountry = found.country; break; }
					}
					if (foundCountry) {
						const countryToIso = { "United States": "US", "South Africa": "ZA", "Hong Kong": "HK", "Taiwan": "TW", "India": "IN", "Singapore": "SG", "Australia": "AU", "Indonesia": "ID", "Malaysia": "MY", "New Zealand": "NZ", "Thailand": "TH", "Japan": "JP", "South Korea": "KR", "Canada": "CA", "Germany": "DE", "Switzerland": "CH", "Ireland": "IE", "United Kingdom": "GB", "France": "FR", "Sweden": "SE", "Italy": "IT", "Spain": "ES", "Israel": "IL", "United Arab Emirates": "AE", "Bahrain": "BH", "Mexico": "MX", "Brazil": "BR", "Austria": "AT", "Belgium": "BE", "Chile": "CL", "Denmark": "DK", "Poland": "PL", "Qatar": "QA", "Norway": "NO", "Netherlands": "NL", "Finland": "FI", "Saudi Arabia": "SA" };
						isoCode = countryToIso[foundCountry] || "";
					}
				}
				fetch('/api/update-placement', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ region: regionValue, iso: isoCode, cf_token: token })
				}).then(r => r.json()).then(d => {
					if(d.success) {
						showToast('✅ ریجن پنل تغییر کرد و دیپلوی شد.');
						toggleTokenModal(false);
						togglePlacementModal(false);
						setTimeout(() => window.location.reload(), 3000);
					} else {
						alert('❌ خطا در تغییر ریجن: ' + (d.error || ''));
					}
				}).catch(err => {
					alert('❌ خطا در ارتباط با سرور کلودفلر');
				}).finally(() => {
					btn.disabled = false;
					btn.innerText = 'ثبت و آپدیت پـنـل';
					window.pendingCoreAction = null;
				});
				return;
			}
			toggleTokenModal(false);
			if (window.pendingCoreAction === 'enable_auto_update') {
				try {
					const res = await fetch('/api/auto-update-setup', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ action: 'enable', token: token })
					});
					const data = await res.json();
					if (res.ok && data.success) {
						showToast('✅ آپدیت خودکار با موفقیت فعال شد.');
						window.autoUpdateStatusCache = true;
						const toggle = document.getElementById('auto-update-toggle');
						if (toggle) toggle.checked = true;
					} else {
						alert('❌ خطا در بررسی توکن: ' + (data.error || 'ناشناخته'));
					}
				} catch(e) {
					alert('❌ خطا در ارتباط با سرور');
				}
				window.pendingCoreAction = null;
				return;
			}
			handleCoreAction(window.pendingCoreAction || 'update', token);
		}
		async function applyUpdate(token = null) {
			await handleCoreAction('update', token);
		}
let cachedIpsData = {};
let cachedDomainsData = [];
let cachedIpv6Data = [];
async function ensureIpv6Cache() {
	if (cachedIpv6Data.length > 0) return;
	let staleData = null;
	const cacheData = localStorage.getItem('mili_ipv6_cache');
	if (cacheData) {
		try {
			const parsed = JSON.parse(cacheData);
			staleData = parsed.data;
			if (Date.now() - parsed.timestamp < 86400000) { 
				cachedIpv6Data = parsed.data;
				return;
			}
		} catch(e) {}
	}
	try {
		const response = await fetchWithFallbackUI('ip6.txt');
		if (response.ok) {
			const text = await response.text();
			const lines = text.split('\\n').map(l => l.trim()).filter(l => l.length > 0 && !l.includes('#') && !l.startsWith('[source') && !l.includes('----------'));
			cachedIpv6Data = lines;
			try {
				localStorage.setItem('mili_ipv6_cache', JSON.stringify({ timestamp: Date.now(), data: cachedIpv6Data }));
			} catch(e) {}
			return;
		}
	} catch(e) {}
	if (staleData) cachedIpv6Data = staleData;
}
let cachedVipList = null;
let cachedVipProxies = {};
function selectSingleRepoType(checkbox) {
    const checkboxes = document.querySelectorAll('input[name="ip-repo-type"]');
    const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
    if (!anyChecked) checkbox.checked = true;
}
async function initVipCache() {
	let staleVipList = null;
	let staleVipProxies = null;
	try {
		const cacheData = localStorage.getItem('mili_vip_cache');
		if (cacheData) {
			try {
				const parsed = JSON.parse(cacheData);
				staleVipList = parsed.vipList;
				staleVipProxies = parsed.vipProxies;
				if (Date.now() - parsed.timestamp < 3600000) {
					cachedVipList = parsed.vipList;
					cachedVipProxies = parsed.vipProxies;
					return;
				}
			} catch(e) {}
		}
		const resVipList = await fetchWithFallbackUI('vip-list');
		if (resVipList.ok) {
			const files = await resVipList.json();
			cachedVipList = files.filter(f => f && f.name && f.name.endsWith('.txt')).map(f => f.name.replace('.txt', '').toUpperCase());
			if (cachedVipList && cachedVipList.length > 0) {
				await Promise.all(cachedVipList.map(async (country) => {
					try {
						const resVip = await fetchWithFallbackUI('proxy_vip/' + country + '.txt');
						if (resVip.ok) {
							const text = await resVip.text();
							const lines = text.split('\\n').map(l => l.trim()).filter(l => l.length > 5);
							if (lines.length > 0) {
								cachedVipProxies[country] = lines;
							}
						}
					} catch(e) {}
				}));
			}
			try {
				localStorage.setItem('mili_vip_cache', JSON.stringify({
					timestamp: Date.now(),
					vipList: cachedVipList,
					vipProxies: cachedVipProxies
				}));
			} catch(e) {}
			return;
		}
	} catch(e) {}
	if (staleVipList && staleVipList.length > 0) {
		cachedVipList = staleVipList;
		cachedVipProxies = staleVipProxies || {};
	}
}
async function ensureIpsCache() {
	if (Object.keys(cachedIpsData).length > 0) return;
	let staleData = null;
	const cacheData = localStorage.getItem('mili_ips_cache');
	if (cacheData) {
		try {
			const parsed = JSON.parse(cacheData);
			staleData = parsed.data;
			if (Date.now() - parsed.timestamp < 86400000) { 
				cachedIpsData = parsed.data;
				return;
			}
		} catch(e) {}
	}
	try {
		const response = await fetchWithFallbackUI('ips.txt');
		if (response.ok) {
			const text = await response.text();
			const lines = text.split('\\n').map(l => l.trim()).filter(l => l.length > 0 && !l.includes('#') && !l.startsWith('[source') && !l.includes('----------'));
			cachedIpsData = { "all": lines };
			try {
				localStorage.setItem('mili_ips_cache', JSON.stringify({
					timestamp: Date.now(),
					data: cachedIpsData
				}));
			} catch(e) {}
			return;
		}
	} catch(e) {}
	if (staleData) {
		cachedIpsData = staleData;
	}
}
async function ensureDomainsCache() {
	if (cachedDomainsData.length > 0) return;
	let staleData = null;
	const cacheData = localStorage.getItem('mili_domains_cache');
	if (cacheData) {
		try {
			const parsed = JSON.parse(cacheData);
			staleData = parsed.data;
			if (Date.now() - parsed.timestamp < 86400000) { 
				cachedDomainsData = parsed.data;
				return;
			}
		} catch(e) {}
	}
	try {
		const response = await fetchWithFallbackUI('dom.txt');
		if (response.ok) {
			const text = await response.text();
			const lines = text.split('\\n').map(l => l.trim()).filter(l => l.length > 0 && !l.includes('#') && !l.startsWith('[source') && !l.includes('----------'));
			cachedDomainsData = lines;
			try {
				localStorage.setItem('mili_domains_cache', JSON.stringify({
					timestamp: Date.now(),
					data: cachedDomainsData
				}));
			} catch(e) {}
			return;
		}
	} catch(e) {}
	if (staleData) {
		cachedDomainsData = staleData;
	}
}
async function fetchIpsList() {
	await Promise.all([ensureIpsCache(), ensureIpv6Cache(), ensureDomainsCache()]);
	if (Object.keys(cachedIpsData).length === 0 && cachedDomainsData.length === 0 && cachedIpv6Data.length === 0) {
		alert('خطا در دریافت لیست آی‌پی‌ها و دامنه‌ها.');
		toggleIpSelectorModal(false);
		return;
	}
	populateIpSelect();
}
function populateIpSelect() {
	const select = document.getElementById('ip-operator-select');
	select.innerHTML = '';
	const operators = [
		{ val: "all", text: "همه (توصیه شده)" },
		{ val: "irancell_rightel", text: "ایرانسل/رایتل/شاتل" },
		{ val: "mobinnet_asiatech", text: "مبین نت/فیبر/آسیاتک" },
		{ val: "mci_tci", text: "همراه اول/مخابرات" },
		{ val: "aptel_samantel", text: "آپتل/سامانتل/پیشگامان" }
	];
	operators.forEach(op => {
		const option = document.createElement('option');
		option.value = op.val;
		option.textContent = op.text;
		select.appendChild(option);
	});
}
function toggleIpSelectorModal(show) {
	setModalState('ip-selector-modal', show);
}
function toggleIpScannerModal(show) {
	setModalState('ip-scanner-modal', show);
}
function openIpScannerModal() {
	toggleIpScannerModal(true);
}
function copyScannerCode(text, btn) {
	navigator.clipboard.writeText(text).then(() => {
		const originalHtml = btn.innerHTML;
		const originalClasses = btn.className;
		btn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg><span>کپی شد!</span>';
		btn.className = 'w-full flex items-center justify-center gap-1.5 py-2 bg-green-50 dark:bg-green-900/30 border border-green-500 text-green-600 dark:text-green-400 rounded text-xs font-bold transition shadow-sm';
		setTimeout(() => { 
			btn.innerHTML = originalHtml;
			btn.className = originalClasses;
		}, 2000);
	}).catch(() => {
		alert('خطا در کپی متن!');
	});
}
async function openIpSelectorModal() {
	toggleIpSelectorModal(true);
	document.getElementById('ip-loading-state').classList.remove('hidden');
	document.getElementById('ip-selection-form').classList.add('hidden');
	await fetchIpsList();
	const rawOp = document.getElementById('hidden-ip-operator').value || 'all|ipv4';
	const parts = rawOp.split('|');
	const op = parts[0] || 'all';
	const selectOp = document.getElementById('ip-operator-select');
	if (selectOp.querySelector('option[value="' + op + '"]')) {
		selectOp.value = op;
	} else {
		selectOp.value = 'all';
	}
	const savedRepoType = (parts[1] || 'ipv4').trim();
    let savedTypes;
    if (savedRepoType === 'mixed') savedTypes = ['ipv4', 'ipv6', 'domain'];
    else if (savedRepoType === 'ip') savedTypes = ['ipv4'];
    else savedTypes = savedRepoType.split('+').map(s => s.trim()).filter(Boolean);
    document.querySelectorAll('input[name="ip-repo-type"]').forEach(cb => {
        cb.checked = savedTypes.includes(cb.value);
    });
    if (!document.querySelector('input[name="ip-repo-type"]:checked')) {
        const fallback = document.querySelector('input[name="ip-repo-type"][value="ipv4"]');
        if (fallback) fallback.checked = true;
    }
	document.getElementById('ip-count-input').value = document.getElementById('hidden-ip-count').value || 15;
	document.getElementById('ip-loading-state').classList.add('hidden');
	document.getElementById('ip-selection-form').classList.remove('hidden');
}
function applySelectedIps() {
	const operator = document.getElementById('ip-operator-select').value;
	let count = parseInt(document.getElementById('ip-count-input').value, 10);
	if (isNaN(count) || count < 1) count = 10;
	if (count > 500) {
		count = 500;
		document.getElementById('ip-count-input').value = 500;
	}
	    const selectedTypes = Array.from(document.querySelectorAll('input[name="ip-repo-type"]:checked')).map(cb => cb.value);
    if (selectedTypes.length === 0) {
        alert('حداقل یک نوع آدرس را انتخاب کنید.');
        return;
    }
    let ipsList = [];
    Object.values(cachedIpsData).forEach(ips => { ipsList = ipsList.concat(ips); });
    ipsList = [...new Set(ipsList)];
    const pools = {
        ipv4: ipsList,
        ipv6: [...new Set(cachedIpv6Data)],
        domain: [...new Set(cachedDomainsData)]
    };
    const pickRandom = (list, num) => {
        if (list.length === 0) return [];
        if (num >= list.length) return list.slice();
        const shuffled = list.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, num);
    };
    const active = selectedTypes.map(t => pools[t] || []).filter(l => l.length > 0);
    const demands = new Array(active.length).fill(0);
    let left = Math.min(count, active.reduce((sum, list) => sum + list.length, 0));
    while (left > 0) {
        let progressed = false;
        for (let i = 0; i < active.length && left > 0; i++) {
            if (demands[i] < active[i].length) {
                demands[i]++;
                left--;
                progressed = true;
            }
        }
        if (!progressed) break;
    }
    let selectedItems = [];
    for (let i = 0; i < active.length; i++) {
        if (demands[i] > 0) selectedItems.push(...pickRandom(active[i], demands[i]));
    }
    if (selectedItems.length === 0) {
        alert('موردی در مخزن انتخاب شده یافت نشد!');
        return;
    }
    document.getElementById('input-ips').value = selectedItems.join('\\n');
    document.getElementById('hidden-ip-operator').value = operator + '|' + selectedTypes.join('+');
    document.getElementById('hidden-ip-count').value = count;
    toggleIpSelectorModal(false);
}
		window.isGlobalProxyTestRunning = false;
		async function runGlobalProxyScanner() {
			if (window.isGlobalProxyTestRunning || document.hidden) {
				// no background loop
				return;
			}
			if (!window.allUsers || window.allUsers.length === 0) {
				// no background loop
				return;
			}
			window.isGlobalProxyTestRunning = true;
			const startTime = Date.now();
			let hasChanges = false;
			try {
				for (const user of window.allUsers) {
					if (user.auto_rotate_user_proxy !== 1 || !user.user_socks5) continue;
					let proxyList = [];
					try {
						if (user.user_socks5.trim().startsWith("[")) {
							proxyList = JSON.parse(user.user_socks5);
						} else {
							proxyList = [user.user_socks5];
						}
					} catch(e) {
						proxyList = [user.user_socks5];
					}
					for (const item of proxyList) {
						const proxyStr = typeof item === 'object' && item !== null ? item.proxy : item;
						if (!proxyStr) continue;
						try {
							const controller = new AbortController();
							const timeoutId = setTimeout(() => controller.abort(), 6000);
							const res = await fetch('/api/test-proxy', {
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify({ proxy: proxyStr, username: user.username, replace_on_fail: true }),
								signal: controller.signal
							});
							clearTimeout(timeoutId);
							const data = await res.json();
							if (!res.ok || !data.success) {
								hasChanges = true;
							}
						} catch (e) {
							hasChanges = true;
						}
						await new Promise(r => setTimeout(r, 200));
					}
				}
			} catch (e) {} finally {
				window.isGlobalProxyTestRunning = false;
				if (hasChanges && !document.hidden) await loadUsers(true);
				const elapsed = Date.now() - startTime;
				const waitTime = Math.max(0, 10000 - elapsed);
				setTimeout(runGlobalProxyScanner, waitTime);
			}
		}
		window.hasShownLoopWarning = false;
		async function checkLoopWarning() {
			if (window.hasShownLoopWarning) return;
			await new Promise(r => setTimeout(r, 1500)); 
			const testProxies = [
				"socks5://8.8.8.8:1080", 
				"socks5://1.1.1.1:1080"
			];
			const randomProxy = testProxies[Math.floor(Math.random() * testProxies.length)];
			try {
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 4000);
				const res = await fetch('/api/test-proxy', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ proxy: randomProxy, skip_country: true }),
					signal: controller.signal
				});
				clearTimeout(timeoutId);
				const data = await res.json();
				if (!res.ok || (data && data.error && data.error.includes("Loop"))) {
					window.hasShownLoopWarning = true;
					const showLoopModal = () => {
						const modal = document.getElementById('loop-warning-modal');
						const card = document.getElementById('loop-warning-card');
						if(modal && card) {
							modal.classList.replace('opacity-0', 'opacity-100');
							modal.classList.replace('pointer-events-none', 'pointer-events-auto');
							card.classList.replace('scale-95', 'scale-100');
						}
					};
					showLoopModal();
					setInterval(showLoopModal, 10000);
				}
			} catch (e) {
			}
		}
		document.addEventListener('DOMContentLoaded', () => {
			if (window.location.search.includes('t=')) {
				window.history.replaceState(null, '', window.location.pathname);
			}
			setTimeout(() => {
				if (typeof toggleInfoModal === 'function') {
					toggleInfoModal(true);
				}
			}, 36000000);
			// Free panel warning disabled
			const gfxToggle = document.getElementById('gfx-toggle');
			if (gfxToggle) {
				if (window.GLOBAL_GFX && !window.GLOBAL_GFX.startsWith('/*')) {
					gfxToggle.checked = window.GLOBAL_GFX === 'true';
				} else {
					gfxToggle.checked = localStorage.getItem('gfx-enabled') === 'true';
				}
			}
			const versionBadge = document.getElementById('panel-version');
			if (versionBadge) versionBadge.innerText = 'v' + CURRENT_VERSION;
			renderPortCheckboxes();
			initVipCache();
			loadUsers();
			window.usersRefreshIntervalId = null;
			window.startRefreshInterval = function(intervalMs) {
				if (window.usersRefreshIntervalId) {
					clearInterval(window.usersRefreshIntervalId);
				}
				window.usersRefreshIntervalId = setInterval(() => {
					if (!document.hidden) loadUsers(true);
				}, intervalMs);
			};
			window.changeRefreshRate = function(val) {
				const ms = parseInt(val, 10);
				localStorage.setItem('mili_refresh_rate', ms);
				window.startRefreshInterval(ms);
				showToast('نرخ رفرش پـنـل تغییر کرد');
			};
			if (!localStorage.getItem('mili_rate_migrated_to_5s')) {
				localStorage.setItem('mili_refresh_rate', '5000');
				localStorage.setItem('mili_rate_migrated_to_5s', 'true');
			}
			const savedRate = localStorage.getItem('mili_refresh_rate');
			const initialRate = savedRate ? parseInt(savedRate, 10) : 5000;
			const selectEl = document.getElementById('refresh-rate-select');
			if (selectEl) {
				selectEl.value = String(initialRate);
			}
			window.startRefreshInterval(initialRate);
			checkAutoUpdateSetup().then(() => {
				setTimeout(() => checkForUpdates(false), 1000);
			});
			setInterval(() => {
				if (!document.hidden) checkForUpdates(false);
			}, 300000);
			// no external global message
			setInterval(() => {
				// no external global message
			}, 60000);
			// no background loop
			window.addEventListener('mousedown', (e) => {
				window._modalMouseDownTarget = e.target;
			});
			const formContainer = document.getElementById('create-user-form');
			if (formContainer) {
				let touchStartX = 0;
				let touchStartY = 0;
				const tabNames = ['tab-user-info', 'tab-ports-network', 'tab-proxy-settings'];
				formContainer.addEventListener('touchstart', (e) => {
					touchStartX = e.changedTouches[0].screenX;
					touchStartY = e.changedTouches[0].screenY;
				}, {passive: true});
				formContainer.addEventListener('touchend', (e) => {
					if (window.innerWidth > 768) return;
					let touchEndX = e.changedTouches[0].screenX;
					let touchEndY = e.changedTouches[0].screenY;
					let diffX = touchStartX - touchEndX;
					let diffY = Math.abs(touchStartY - touchEndY);
					if (Math.abs(diffX) > diffY && Math.abs(diffX) > 50) {
						let currentIndex = 0;
						for (let i = 0; i < tabNames.length; i++) {
							const el = document.getElementById(tabNames[i]);
							if (el && !el.classList.contains('hidden')) {
								currentIndex = i;
								break;
							}
						}
						let nextIndex = currentIndex;
						if (diffX > 50) {
							nextIndex--; 
						} else if (diffX < -50) {
							nextIndex++; 
						}
						if (nextIndex >= 0 && nextIndex < tabNames.length && nextIndex !== currentIndex) {
							if (typeof window.switchUserTab === 'function') {
								window.switchUserTab(tabNames[nextIndex]);
							}
						}
					}
				}, {passive: true});
			}
			window.addEventListener('click', (e) => {
				if (window._modalMouseDownTarget && window._modalMouseDownTarget !== e.target) return;
				if (e.target.id === 'user-modal') toggleModal(false);
				if (e.target.id === 'rocket-modal') toggleRocketModal(false);
				if (e.target.id === 'ip-selector-modal') toggleIpSelectorModal(false);
				if (e.target.id === 'ip-scanner-modal') toggleIpScannerModal(false);
				if (e.target.id === 'placement-modal') togglePlacementModal(false);
				if (e.target.id === 'settings-modal') toggleSettingsModal(false);
				if (e.target.id === 'update-modal') toggleUpdateModal(false);
				if (e.target.id === 'token-modal') toggleTokenModal(false);
				if (e.target.id === 'qr-modal') toggleQrModal(false);
				if (e.target.id === 'usage-warning-modal') closeUsageWarning();
				if (e.target.id === 'online-counter-warning-modal') closeOnlineCounterWarning();
				if (e.target.id === 'config-count-warning-modal') closeConfigCountWarning();
				if (e.target.id === 'pattng-info-modal') togglePattNgModal(false);
				if (!e.target.closest('.action-dropdown') && !e.target.closest('button[onclick*="action-menu"]')) {
					document.querySelectorAll('.action-dropdown').forEach(m => m.classList.add('hidden'));
					window.openActionMenu = null;
				}
				if (e.target.id === 'proxy-selector-modal') toggleProxySelectorModal(false);
				if (e.target.id === 'donate-modal') toggleDonateModal(false);
				if (e.target.id === 'support-modal') toggleSupportModal(false);
				if (e.target.id === 'pwa-install-modal') togglePwaModal(false);
				if (e.target.id === 'custom-confirm-modal') {
					const cancelBtn = document.getElementById('custom-confirm-cancel');
					if (cancelBtn) cancelBtn.click();
				}
			});
		});
function toggleProxySelectorModal(show) { setModalState('proxy-selector-modal', show); }
		async function loadVipCountries() {
			const select = document.getElementById('vip-country-select');
			const btn = document.getElementById('vip-fetch-btn');
			select.innerHTML = '<option value="">در حال بررسی مخزن...</option>';
			if (cachedVipList && cachedVipList.length > 0) {
				select.innerHTML = '<option value="">یک کشور VIP انتخاب کنید...</option>';
				cachedVipList.forEach(function(country) {
					const option = document.createElement('option');
					option.value = country;
					const flag = typeof getFlagEmojiText === 'function' ? getFlagEmojiText(country) : '🌐';
					option.textContent = flag + ' ' + country;
					select.appendChild(option);
				});
				btn.disabled = false;
			} else {
				select.innerHTML = '<option value="">پـروکـسـی اختصاصی موجود نیست</option>';
				btn.disabled = true;
			}
		}
		async function loadVipProxy() {
			const select = document.getElementById('vip-country-select');
			const country = select.value;
			const btn = document.getElementById('vip-fetch-btn');
			if (!country) return;
			btn.disabled = true;
			btn.innerText = '...';
			const lines = cachedVipProxies[country] || [];
			if (lines.length > 0) {
				const randomProxy = lines[Math.floor(Math.random() * lines.length)];
				window.proxyFieldsData[window.activeProxyIndex || 0] = randomProxy;
				if (typeof window.renderProxyFieldsUI === 'function') window.renderProxyFieldsUI();
				const userProxyResult = document.getElementById('test-user-proxy-result');
				if (userProxyResult) {
					userProxyResult.innerText = '';
				}
				toggleProxySelectorModal(false);
				showToast('✅ پـروکـسـی اختصاصی با موفقیت اعمال شد.');
				testUserSocksProxy();
			} else {
				alert('فایل پـروکـسـی این کشور خالی است یا هنوز در کش بارگذاری نشده است.');
			}
			btn.disabled = false;
			btn.innerText = 'دریافت';
		}
		async function openProxySelectorModal() {
			toggleProxySelectorModal(true);
			const select = document.getElementById('proxy-country-select');
			const fetchBtn = document.getElementById('proxy-fetch-btn');
			const countriesList = [
		  "AA", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR",
		  "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE",
		  "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ",
		  "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD",
		  "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR",
		  "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM",
		  "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI",
		  "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF",
		  "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS",
		  "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU",
		  "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT",
		  "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN",
		  "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK",
		  "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME",
		  "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ",
		  "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA",
		  "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU",
		  "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM",
		  "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS",
		  "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI",
		  "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV",
		  "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK",
		  "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA",
		  "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI",
		  "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"
			];
			select.innerHTML = '';
			countriesList.forEach(function(country) {
				const option = document.createElement('option');
				option.value = country;
				const flag = typeof getFlagEmojiText === 'function' ? getFlagEmojiText(country) : '🌐';
				option.textContent = flag + ' ' + country;
				select.appendChild(option);
			});
			fetchBtn.disabled = false;
			loadVipCountries();
		}
async function fetchAndLoadProxy() {
	const select = document.getElementById("proxy-country-select");
	const country = select.value;
	if (!country) return;
	const loadingState = document.getElementById("proxy-loading-state");
	const formState = document.getElementById("proxy-selection-form");
	const fetchBtn = document.getElementById("proxy-fetch-btn");
	loadingState.classList.remove("hidden");
	loadingState.innerText = "در حال دریافت لیست پـروکـسـی‌ها...";
	formState.classList.add("hidden");
	fetchBtn.disabled = true;
	try {
		const sources = [
			{ url: "proxy/" + country.toUpperCase() + ".txt", prefix: "" }
		];
		const responses = await Promise.allSettled(sources.map(src => 
			fetchWithFallbackUI(src.url).then(async res => {
				if (!res.ok) throw new Error();
				const text = await res.text();
				return { text: text, prefix: src.prefix };
			})
		));
		let combinedProxies = [];
		for (const res of responses) {
			if (res.status === "fulfilled" && res.value && res.value.text) {
				const rawLines = res.value.text.split("\\n");
				for (let line of rawLines) {
					line = line.trim();
					if (line.length > 5) {
						combinedProxies.push(line);
					}
				}
			}
		}
		let lines = [...new Set(combinedProxies.map(l => {
			if (l.match(new RegExp("^(socks4|socks5|socks|http|https|tg)://", "i")) || l.includes("t.me/socks")) {
				return l;
			}
			return "socks5://" + l;
		}))];
		if (lines.length > 0) {
			for (let i = lines.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[lines[i], lines[j]] = [lines[j], lines[i]];
			}
			let bestProxy = null;
			let fallbackProxy = null;
			const BATCH_SIZE = 5;
			for (let i = 0; i < lines.length; i += BATCH_SIZE) {
				const batch = lines.slice(i, i + BATCH_SIZE);
				loadingState.innerText = "تعداد " + lines.length + " پـروکـسـی پیدا شد درحال اسکن\\nاسکن گروه " + (Math.floor(i / BATCH_SIZE) + 1) + " (۵ تست برای هر کدام)...";
				const testResults = await Promise.allSettled(batch.map(async (candidate) => {
					let successCount = 0;
					let totalPing = 0;
					let failCount = 0;
					for(let t = 0; t < 5; t++) {
						const controller = new AbortController();
						const timeoutId = setTimeout(() => controller.abort(), 3500);
						try {
							const testRes = await fetch("/api/test-proxy", {
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify({ proxy: candidate }),
								signal: controller.signal
							});
							clearTimeout(timeoutId);
							const testData = await testRes.json();
							if (testRes.ok && testData.success) {
								successCount++;
								totalPing += testData.ping;
							} else {
								failCount++;
							}
						} catch (err) {
							clearTimeout(timeoutId);
							failCount++;
						}
						if (failCount > 2) break;
					}
					if (successCount > 0) {
						return { proxy: candidate, successCount: successCount, avgPing: totalPing / successCount };
					}
					throw new Error();
				}));
				const successfulProxies = testResults
					.filter(r => r.status === "fulfilled")
					.map(r => r.value)
					.sort((a, b) => {
						if (b.successCount !== a.successCount) {
							return b.successCount - a.successCount;
						}
						return a.avgPing - b.avgPing;
					});
				if (successfulProxies.length > 0) {
					const topCandidate = successfulProxies[0];
					if (topCandidate.successCount >= 3) {
						bestProxy = topCandidate.proxy;
						break;
					} else if (!fallbackProxy || topCandidate.successCount > fallbackProxy.successCount) {
						fallbackProxy = topCandidate;
					}
				}
			}
			if (!bestProxy && fallbackProxy) {
				bestProxy = fallbackProxy.proxy;
			}
			if (bestProxy) {
				window.proxyFieldsData[window.activeProxyIndex || 0] = bestProxy;
				if (typeof window.renderProxyFieldsUI === 'function') window.renderProxyFieldsUI();
				const userProxyResult = document.getElementById("test-user-proxy-result");
				if (userProxyResult) {
					userProxyResult.innerText = "";
				}
				toggleProxySelectorModal(false);
				showToast("پـروکـسـی با بهترین امتیاز لود شد.");
				testUserSocksProxy();
			} else {
				alert("هیچ پـروکـسـی سالمی (حتی با یک پینگ موفق) یافت نشد.");
			}
		} else {
			alert("پـروکـسـی برای این کشور یافت نشد.");
		}
	} catch (e) {
		alert("خطا در دریافت لیست پـروکـسـی‌ها از سرور.");
	} finally {
		loadingState.classList.add("hidden");
		formState.classList.remove("hidden");
		fetchBtn.disabled = false;
	}
}
const WORKER_DONATE_URL = "https://si-491177.taile4bcbb.ts.net/donate";
		function toggleDonateModal(show) {
			setModalState('donate-modal', show);
			if (!show) {
				document.getElementById('donate-proxy-input').value = '';
				const resultSpan = document.getElementById('donate-result');
				if (resultSpan) {
					resultSpan.innerText = '';
					resultSpan.className = 'inline-block mt-1 text-[11px] font-bold transition-colors break-words leading-relaxed empty:hidden';
				}
			}
		}
		async function testAndDonateProxy() {
			const proxyInput = document.getElementById('donate-proxy-input').value.trim();
			const btn = document.getElementById('donate-submit-btn');
			const resultSpan = document.getElementById('donate-result');
			if (!proxyInput) {
				resultSpan.innerText = 'لطفاً پـروکـسـی را وارد کنید!';
				resultSpan.className = 'text-[11px] font-bold text-red-500 w-full mt-1';
				return;
			}
			if (!proxyInput.includes('@') || !proxyInput.split('@')[0].includes(':')) {
				resultSpan.innerText = '❌ پـروکـسـی باید دارای نام کاربری و رمز عبور باشد';
				resultSpan.className = 'text-[11px] font-bold text-red-500 w-full mt-1 break-words';
				return;
			}
			btn.disabled = true;
			btn.innerText = 'صبر کنید...';
			resultSpan.innerText = 'در حال تست با اسکنر پـنـل...';
			resultSpan.className = 'text-[11px] font-bold text-emerald-500 w-full mt-1';
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 6000);
			try {
				const testRes = await fetch('/api/test-proxy', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ proxy: proxyInput }),
					signal: controller.signal
				});
				clearTimeout(timeoutId);
				const testData = await testRes.json();
				if (!testRes.ok || !testData.success) {
					throw new Error(testData.error || 'پـروکـسـی مسدود یا خاموش است');
				}
				resultSpan.innerText = 'در حال بررسی اختصاصی بودن پـروکـسـی...';
				let protocol = "";
				const protoMatch = proxyInput.match(new RegExp("^(socks4|socks5|socks|http|https)://", "i"));
				if (protoMatch) protocol = protoMatch[0];
				const hostPort = proxyInput.substring(proxyInput.lastIndexOf('@') + 1);
				const noAuthProxy = protocol + hostPort;
				let isOpenProxy = false;
				try {
					const ctlNoAuth = new AbortController();
					const tidNoAuth = setTimeout(() => ctlNoAuth.abort(), 4000);
					const resNoAuth = await fetch('/api/test-proxy', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ proxy: noAuthProxy }),
						signal: ctlNoAuth.signal
					});
					clearTimeout(tidNoAuth);
					const dataNoAuth = await resNoAuth.json();
					if (resNoAuth.ok && dataNoAuth.success) {
						isOpenProxy = true;
					}
				} catch(e) {}
				if (isOpenProxy) {
					throw new Error('این پـروکـسـی عمومی و بدون رمز است (الکی یوزرنیم و پسورد نزن!)');
				}
				const countryCode = testData.country || 'UN';
				resultSpan.innerText = 'پـروکـسـی سالم و اختصاصی است! در حال ارسال (' + countryCode + ')...';
				const donateResponse = await fetch(WORKER_DONATE_URL, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						proxy: proxyInput,
						country: countryCode
					})
				});
				const donateData = await donateResponse.json();
				if (donateData.success) {
					resultSpan.innerText = '✅ ' + donateData.message;
					resultSpan.className = 'text-[11px] font-bold text-green-600 w-full mt-1';
					document.getElementById('donate-proxy-input').value = '';
				} else {
					resultSpan.innerText = ' ❌ خطا لطفا از ربات اهدا کنید : ' + donateData.error;
					resultSpan.className = 'text-[11px] font-bold text-red-500 w-full mt-1 break-words';
				}
			} catch (error) {
				clearTimeout(timeoutId);
				let errorMsg = error.message;
				if (error.name === 'AbortError') errorMsg = 'تایم‌اوت در تست پـروکـسـی';
				resultSpan.innerText = ' ❌ خطا لطفا در ربات اهدا کنید : ' + errorMsg;
				resultSpan.className = 'text-[11px] font-bold text-red-500 w-full mt-1 break-words';
			} finally {
				btn.disabled = false;
				btn.innerText = 'تست و اهدا';
			}
		}
		function toggleSupportModal(show) {
			const modal = document.getElementById('support-modal');
			const content = modal.firstElementChild;
			if (show) {
				modal.classList.remove('opacity-0', 'pointer-events-none');
				content.classList.remove('opacity-0', 'scale-95');
			} else {
				modal.classList.add('opacity-0', 'pointer-events-none');
				content.classList.add('opacity-0', 'scale-95');
			}
		}
		window.testDirectPing = async function() {
			const btn = document.getElementById('test-direct-btn');
			const clientPingEl = document.getElementById('client-to-server-ping');
			const serverPingEl = document.getElementById('server-to-net-ping');
			if (btn) {
				btn.disabled = true;
				btn.innerHTML = '<svg class="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span> در حال تست...</span>';
			}
			clientPingEl.innerText = 'تست...';
			clientPingEl.className = 'text-[10px] font-bold text-amber-500';
			serverPingEl.innerText = 'تست...';
			serverPingEl.className = 'text-[10px] font-bold text-amber-500';
			let clientPing = '-';
			try {
				const startClient = Date.now();
				await fetch('/icon.svg?t=' + startClient, { method: 'HEAD', cache: 'no-store' });
				const elapsed = Date.now() - startClient;
				clientPing = elapsed;
				let cColor = "text-red-500";
				if (elapsed <= 150) cColor = "text-green-500";
				else if (elapsed <= 300) cColor = "text-amber-500";
				clientPingEl.innerText = elapsed + ' ms';
				clientPingEl.className = 'text-[10px] font-bold ' + cColor;
			} catch (e) {
				clientPingEl.innerText = 'خطا';
				clientPingEl.className = 'text-[10px] font-bold text-red-500';
			}
			try {
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 6000);
				const res = await fetch('/api/test-proxy', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ proxy: 'direct', skip_country: true }),
					signal: controller.signal
				});
				clearTimeout(timeoutId);
				const data = await res.json();
				if (res.ok && data.success) {
					const sPing = data.ping;
					let sColor = "text-red-500";
					if (sPing <= 50) sColor = "text-green-500";
					else if (sPing <= 150) sColor = "text-amber-500";
					serverPingEl.innerText = sPing + ' ms';
					serverPingEl.className = 'text-[10px] font-bold ' + sColor;
				} else {
					serverPingEl.innerText = 'خطا';
					serverPingEl.className = 'text-[10px] font-bold text-red-500 text-center';
				}
			} catch (e) {
				serverPingEl.innerText = 'خطا';
				serverPingEl.className = 'text-[10px] font-bold text-red-500 text-center';
			}
			if (btn) {
				btn.disabled = false;
				btn.innerHTML = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg><span>تست اتصال مستقیم</span>';
			}
		};

		// === MILICONFIG TEMPLATE ADAPTER OVERRIDES ===
		function findUserUuid(username) {
			const decoded = decodeURIComponent(username || '');
			const u = (window.allUsers || []).find(x => x.username === decoded || x.id === decoded || x.uuid === decoded);
			return u && u.uuid ? u.uuid : decoded;
		}
		window.getSubLink = function(username) {
			return window.location.origin + '/sub/' + encodeURIComponent(findUserUuid(username));
		};
		window.getYamlSubLink = function(username) {
			return window.location.origin + '/sub/' + encodeURIComponent(findUserUuid(username)) + '?target=clash';
		};
		window.getStatusLink = function(username) {
			return window.location.origin + '/status/' + encodeURIComponent(findUserUuid(username));
		};
		window.copyConfig = async function(encodedUsername) {
			const username = decodeURIComponent(encodedUsername);
			const uuid = findUserUuid(username);
			try {
				const res = await window.__rawFetch('/sub/' + encodeURIComponent(uuid) + '?target=raw');
				if (res.ok) {
					const rawText = await res.text();
					if (rawText && rawText.trim()) {
						await navigator.clipboard.writeText(rawText.trim());
						alert('✅ تمام کانفیگ‌های کاربر با موفقیت کپی شد!');
						return;
					}
				}
			} catch (e) {}
			const fallback = getvIeesLink(username);
			if (fallback) {
				navigator.clipboard.writeText(fallback).then(() => alert('✅ کانفیگ با موفقیت کپی شد!'));
			}
		};
		window.fetchWithFallbackUI = async function(path, options = {}) {
			const clean = String(path || '').split('?')[0];
			const init = window.INITIAL_DATA || {};
			if (clean === 'ips.txt') {
				const list = init.officialIps && init.officialIps.length ? init.officialIps : ['172.71.218.190', '162.158.228.87', '104.16.131.1', '104.17.0.1', '104.18.0.1', '172.64.0.1'];
				return new Response(list.join('\\n'), { status: 200 });
			}
			if (clean === 'ip6.txt') {
				const list = init.officialIpv6 && init.officialIpv6.length ? init.officialIpv6 : ['2606:4700::6810:1', '2606:4700::6811:1'];
				return new Response(list.join('\\n'), { status: 200 });
			}
			if (clean === 'dom.txt') {
				const list = init.directDomains && init.directDomains.length ? init.directDomains : ['cloudflare.182682.xyz', 'speed.marisalnc.com', 'freeyx.cloudflare88.eu.org', 'bestcf.top'];
				return new Response(list.join('\\n'), { status: 200 });
			}
			if (clean === 'ech_dom.txt') {
				return new Response(['cloudflare-ech.com', 'crypto.cloudflare.com', 'cloudflare-dns.com', 'one.one.one.one'].join('\\n'), { status: 200 });
			}
			if (clean === 'ech_dns.txt') {
				return new Response(['1.1.1.1', '1.0.0.1', '8.8.8.8', '9.9.9.9', '223.5.5.5'].join('\\n'), { status: 200 });
			}
			if (clean === 'vip-list') {
				const countries = ['DE', 'NL', 'US', 'GB', 'FR', 'FI', 'SE', 'SG', 'JP', 'KR', 'TR', 'AE', 'CA'];
				return new Response(JSON.stringify(countries.map(c => ({ name: c + '.txt' }))), {
					status: 200,
					headers: { 'Content-Type': 'application/json' }
				});
			}
			if (clean.startsWith('proxy_vip/') || clean.startsWith('proxy/')) {
				const cc = clean.split('/').pop().replace('.txt', '').toUpperCase();
				try {
					const r = await window.__rawFetch('/api/scanner/quick?mode=proxyip&country=' + encodeURIComponent(cc) + '&limit=8');
					if (r.ok) {
						const d = await r.json();
						if (d && Array.isArray(d.proxies) && d.proxies.length > 0) {
							const lines = d.proxies.map(p => (p.ip || p.host) + ':' + (p.port || 443));
							return new Response(lines.join('\\n'), { status: 200 });
						}
					}
				} catch (e) {}
				const fallbackMap = {
					DE: ['ProxyIP.DE.CMLiussss.net:443'],
					NL: ['ProxyIP.NL.CMLiussss.net:443'],
					US: ['ProxyIP.US.CMLiussss.net:443'],
					GB: ['ProxyIP.GB.CMLiussss.net:443'],
					SG: ['ProxyIP.SG.CMLiussss.net:443'],
					JP: ['ProxyIP.JP.CMLiussss.net:443'],
					KR: ['ProxyIP.KR.CMLiussss.net:443'],
					SE: ['ProxyIP.SE.CMLiussss.net:443'],
					FI: ['ProxyIP.FI.CMLiussss.net:443']
				};
				const fb = fallbackMap[cc] || ['ProxyIP.DE.CMLiussss.net:443'];
				return new Response(fb.join('\\n'), { status: 200 });
			}
			if (clean === 'Source.js') {
				return new Response("const CURRENT_VERSION = '3.8.1';", { status: 200 });
			}
			return new Response('', { status: 404 });
		};
		document.addEventListener('DOMContentLoaded', () => {
			if (window.INITIAL_DATA && Array.isArray(window.INITIAL_DATA.users)) {
				const mapped = window.__miliBuildUsersResponse(window.INITIAL_DATA);
				renderUsersUI(mapped);
			}
		});

	</script>
	${COMMON_WAVES_SCRIPT}
	  </body>
</html>`;
}
