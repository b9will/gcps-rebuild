/* GCPS site-wide JS
   - Top bar + nav scroll behaviour
   - Mobile drawer toggle
   - IntersectionObserver reveals
   - FAQ accordion
   - Smooth in-page anchor scroll
   - Footer year stamp
*/

(function () {
    'use strict';

    // NAV / TOP BAR
    const nav = document.getElementById('nav');
    const topBar = document.querySelector('.top-bar');

    if (nav && topBar) {
        let tbH = topBar.offsetHeight;

        const onScroll = () => {
            const sy = window.scrollY;
            if (sy > tbH + 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');

            if (sy > 10) {
                topBar.style.transform = 'translateY(-100%)';
                topBar.style.transition = 'transform .3s';
                nav.style.top = '0';
            } else {
                topBar.style.transform = 'translateY(0)';
                nav.style.top = tbH + 'px';
            }
        };
        nav.style.top = tbH + 'px';
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', () => { tbH = topBar.offsetHeight; onScroll(); }, { passive: true });
        onScroll();
    } else if (nav) {
        // Interior pages with no top bar: keep nav pinned to top, always solid
        nav.style.top = '0';
        nav.classList.add('scrolled');
    }

    // MOBILE DRAWER
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('drawerOverlay');

    if (hamburger && drawer && overlay) {
        const toggleDrawer = () => {
            hamburger.classList.toggle('active');
            drawer.classList.toggle('open');
            overlay.classList.toggle('active');
            document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
        };
        hamburger.addEventListener('click', toggleDrawer);
        overlay.addEventListener('click', toggleDrawer);
        document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', () => {
            if (drawer.classList.contains('open')) toggleDrawer();
        }));
    }

    // SCROLL REVEALS
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        const ro = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    en.target.classList.add('visible');
                    ro.unobserve(en.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => ro.observe(el));
    }

    // FAQ
    document.querySelectorAll('.faq-item__q').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const active = item.classList.contains('active');
            // close siblings within the same FAQ block only
            const parent = item.parentElement;
            parent.querySelectorAll(':scope > .faq-item').forEach(i => i.classList.remove('active'));
            if (!active) item.classList.add('active');
        });
    });

    // SMOOTH SCROLL for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            const t = document.querySelector(href);
            if (t) {
                e.preventDefault();
                window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 70, behavior: 'smooth' });
            }
        });
    });

    // FOOTER YEAR
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
