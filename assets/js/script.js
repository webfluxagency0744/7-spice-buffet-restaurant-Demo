/**
 * 7 SPICE BUFFET RESTAURANT - MASTER SCRIPT
 * UI interactions, mobile drawer, spice journey menu switcher,
 * gallery lightbox, reservation modal, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /* ==========================================================================
       1. GLASSMORPHI HEADER ON SCROLL
       ========================================================================== */
    const siteHeader = document.getElementById('main-header');
    function handleHeaderScroll() {
        if (window.scrollY > 40) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    /* ==========================================================================
       2. MOBILE DRAWER NAVIGATION
       ========================================================================== */
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileDrawer = document.getElementById('mobileMenuDrawer');
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    const closeDrawerBtn = document.getElementById('closeMobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
        mobileDrawer.classList.add('open');
        drawerBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileDrawer.classList.remove('open');
        drawerBackdrop.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeMobileMenu);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileMenu);
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    /* ==========================================================================
       3. "THE 7 SPICE EXPERIENCE" INTERACTIVE MENU TABS
       ========================================================================== */
    const categoryBtns = document.querySelectorAll('.category-tab-btn');
    const categoryPanels = document.querySelectorAll('.menu-category-panel');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');

            // Update tab states
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Switch dish panels
            categoryPanels.forEach(panel => {
                if (panel.getAttribute('id') === `panel-${targetCategory}`) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });

    /* ==========================================================================
       4. GALLERY FILTER & LIGHTBOX MODAL
       ========================================================================== */
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
    const lightboxNextBtn = document.getElementById('lightboxNextBtn');

    let currentGalleryIndex = 0;
    const galleryData = [];

    // Collect gallery images data
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const titleEl = item.querySelector('.gallery-overlay h6');
        const descEl = item.querySelector('.gallery-overlay span');

        galleryData.push({
            src: img ? img.getAttribute('src') : '',
            title: titleEl ? titleEl.textContent : '7 Spice Signature Experience',
            desc: descEl ? descEl.textContent : 'Luxury buffet presentation'
        });

        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });

    // Filter functionality
    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            galleryItems.forEach(item => {
                const colWrapper = item.closest('.gallery-col');
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    if (colWrapper) colWrapper.style.display = 'block';
                } else {
                    if (colWrapper) colWrapper.style.display = 'none';
                }
            });
        });
    });

    function openLightbox(index) {
        if (!galleryData[index]) return;
        currentGalleryIndex = index;
        updateLightboxContent();
        lightboxModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const data = galleryData[currentGalleryIndex];
        if (!data) return;
        lightboxImg.src = data.src;
        lightboxTitle.textContent = data.title;
        lightboxDesc.textContent = data.desc;
    }

    function prevLightboxImage() {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
        updateLightboxContent();
    }

    function nextLightboxImage() {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
        updateLightboxContent();
    }

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightboxImage);
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightboxImage);

    // Keyboard support for Lightbox
    window.addEventListener('keydown', function(e) {
        if (!lightboxModal.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevLightboxImage();
        if (e.key === 'ArrowRight') nextLightboxImage();
    });

    /* ==========================================================================
       5. RESERVATION FORM DEMO & CONFIRMATION MODAL
       ========================================================================== */
    const reservationForm = document.getElementById('reservationForm');
    const reservationModal = document.getElementById('reservationModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalDoneBtn = document.getElementById('modalDoneBtn');
    const summaryDateTime = document.getElementById('summaryDateTime');
    const summaryGuests = document.getElementById('summaryGuests');
    const modalWhatsappDirect = document.getElementById('modalWhatsappDirect');

    // Set minimum date to today
    const dateInput = document.getElementById('resDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }

    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Collect form data
            const name = document.getElementById('resName').value.trim() || 'Valued Guest';
            const date = document.getElementById('resDate').value;
            const time = document.getElementById('resTime').value;
            const guests = document.getElementById('resGuests').value;
            const phone = document.getElementById('resPhone').value.trim();

            if (!date || !time || !guests) {
                alert('Please select date, time and number of guests.');
                return;
            }

            // Populate Modal Summary
            if (summaryDateTime) summaryDateTime.textContent = `${date} at ${time}`;
            if (summaryGuests) summaryGuests.textContent = `${guests} Guests (Requested by: ${name})`;

            // Construct personalized WhatsApp link
            const whatsappMsg = encodeURIComponent(
                `Hello 7 Spice Buffet Restaurant, I would like to confirm my table reservation:\n\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}`
            );
            if (modalWhatsappDirect) {
                modalWhatsappDirect.href = `https://wa.me/0123456789?text=${whatsappMsg}`;
            }

            // Show luxury modal
            reservationModal.classList.add('open');
            document.body.style.overflow = 'hidden';
            reservationForm.reset();
            if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
        });
    }

    function closeReservationModal() {
        reservationModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeReservationModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeReservationModal);
    if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeReservationModal);

    /* ==========================================================================
       6. INTERSECTION OBSERVER SCROLL ANIMATIONS
       ========================================================================== */
    const animatedElements = document.querySelectorAll('.fade-up-element');
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.12
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => scrollObserver.observe(el));
    } else {
        // Fallback for browsers without IntersectionObserver
        animatedElements.forEach(el => el.classList.add('in-view'));
    }

    /* ==========================================================================
       7. ACTIVE NAV LINK TRACKING ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-luxury');

    function highlightActiveNav() {
        const scrollPosition = window.scrollY + 160;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightActiveNav, { passive: true });
});
