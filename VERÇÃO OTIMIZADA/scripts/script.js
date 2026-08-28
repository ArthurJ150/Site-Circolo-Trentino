document.addEventListener('DOMContentLoaded', function () {
	const storageKey = 'circolo-theme';
	const themeToggle = document.getElementById('themeToggle');
	const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	function getStoredTheme() {
		try {
			return localStorage.getItem(storageKey);
		} catch (error) {
			return null;
		}
	}

	const savedTheme = getStoredTheme();
	const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

	function applyTheme(theme) {
		document.body.dataset.theme = theme;
		if (themeToggle) {
			themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
			themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
			themeToggle.classList.toggle('is-dark', theme === 'dark');
			const themeIcon = themeToggle.querySelector('img');
			if (themeIcon) {
				themeIcon.style.filter = theme === 'dark' ? 'brightness(1.2) saturate(1.1)' : 'brightness(0.95) saturate(0.9)';
			}
		}
		try {
			localStorage.setItem(storageKey, theme);
		} catch (error) {
			// Ignora falhas de armazenamento em ambientes restritivos.
		}
	}

	applyTheme(initialTheme);

	if (themeToggle) {
		themeToggle.addEventListener('click', () => {
			const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
			applyTheme(nextTheme);
		});
	}

	const events = [
		{ title: 'Festa da Colheita', date: '12/09/2026', location: 'Praça Central' },
		{ title: 'Romaria e Procissão', date: '05/10/2026', location: 'Igreja Matriz' },
		{ title: 'Noite de Cantorias', date: '20/11/2026', location: 'Centro Cultural' }
	];

	const out = document.getElementById('outNoticias');
	if (out) {
		events.forEach(ev => {
			const card = document.createElement('div');
			card.className = 'event-card';
			card.innerHTML = `<h3>${ev.title}</h3><p><strong>Data:</strong> ${ev.date}</p><p><strong>Local:</strong> ${ev.location}</p>`;
			out.appendChild(card);
		});
	}

	const nav = document.querySelector('.main-nav');
	const menuToggle = document.getElementById('menuToggle');
	if (menuToggle && nav) {
		menuToggle.addEventListener('click', () => {
			const isOpen = nav.classList.toggle('is-open');
			menuToggle.setAttribute('aria-expanded', String(isOpen));
		});
	}

	const carousel = document.querySelector('.promo-carousel');
	if (carousel) {
		const slides = Array.from(document.querySelectorAll('.promo-slide'));
		const dots = Array.from(document.querySelectorAll('.dot'));
		const prevBtn = document.querySelector('.carousel-btn.prev');
		const nextBtn = document.querySelector('.carousel-btn.next');
		let currentSlide = 0;
		let autoPlay = null;

		function showSlide(index) {
			currentSlide = (index + slides.length) % slides.length;
			slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
			dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
		}

		function startAutoPlay() {
			autoPlay = setInterval(() => showSlide(currentSlide + 1), 5000);
		}

		prevBtn?.addEventListener('click', () => {
			showSlide(currentSlide - 1);
			clearInterval(autoPlay);
			startAutoPlay();
		});

		nextBtn?.addEventListener('click', () => {
			showSlide(currentSlide + 1);
			clearInterval(autoPlay);
			startAutoPlay();
		});

		dots.forEach(dot => {
			dot.addEventListener('click', () => {
				showSlide(Number(dot.dataset.slide));
				clearInterval(autoPlay);
				startAutoPlay();
			});
		});

		showSlide(0);
		startAutoPlay();
	}

	const currentPage = window.location.pathname.split('/').pop() || 'index.html';
	document.querySelectorAll('.main-nav a').forEach(link => {
		const href = link.getAttribute('href') || '';
		if (href.endsWith(currentPage) || (currentPage === '' && href === 'index.html')) {
			link.classList.add('active');
		}
	});

	// Tornar o botão "Seja Sócio" funcional em todas as páginas (pode haver cópias com o mesmo id)
	document.querySelectorAll('#btSocio').forEach(btn => {
		btn.addEventListener('click', () => {
			// Se estivermos na raiz (index.html ou pasta raiz), navegar para html/seja-socio.html
			// Se já estivermos dentro da pasta html, navegar para seja-socio.html
			const path = window.location.pathname;
			let target = 'html/seja-socio.html';
			if (path.includes('/html/') || path.endsWith('seja-socio.html')) {
				target = 'seja-socio.html';
			}
			window.location.href = target;
		});
	});
});
