export function initializeCarousel() {
    const carousel = document.querySelector('.certificados-grid');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!carousel || !prevBtn || !nextBtn) return;

    const carouselWrapper = document.querySelector('.certificados-wrapper');
    let cardWidth = 0;
    let scrollPosition = 0;

    function calculateCardWidth() {
        const firstCard = carousel.querySelector('.certificado-card');
        if (firstCard) {
            const gap = parseFloat(window.getComputedStyle(carousel).gap);
            cardWidth = firstCard.offsetWidth + gap;
        }
    }

    function updateButtonState() {
        const carouselWidth = carousel.scrollWidth;
        const visibleWidth = carouselWrapper.offsetWidth;
        prevBtn.disabled = scrollPosition <= 0;
        nextBtn.disabled = scrollPosition >= (carouselWidth - visibleWidth - 1);
    }

    calculateCardWidth();
    updateButtonState();

    window.addEventListener('resize', () => {
        calculateCardWidth();
        updateButtonState();
    });

    nextBtn.addEventListener('click', () => {
        const carouselWidth = carousel.scrollWidth;
        const visibleWidth = carouselWrapper.offsetWidth;
        if (scrollPosition < (carouselWidth - visibleWidth)) {
            scrollPosition += cardWidth;
        }
        if (scrollPosition > (carouselWidth - visibleWidth)) {
            scrollPosition = carouselWidth - visibleWidth;
        }
        carousel.style.transform = `translateX(-${scrollPosition}px)`;
        updateButtonState();
    });

    prevBtn.addEventListener('click', () => {
        if (scrollPosition > 0) {
            scrollPosition -= cardWidth;
        }
        if (scrollPosition < 0) {
            scrollPosition = 0;
        }
        carousel.style.transform = `translateX(-${scrollPosition}px)`;
        updateButtonState();
    });
}