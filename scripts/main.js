document.addEventListener('DOMContentLoaded', function() {

    // Efeito de digitação
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) {
        const textToType = "Olá, eu sou Thiago Coelho";
        let charIndex = 0;
        function type() {
            if (charIndex < textToType.length) {
                typingTextElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 150);
            }
        }
        type();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Lógica do carrossel de certificados
    const carousel = document.querySelector('.certificados-grid');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (carousel && prevBtn && nextBtn) {
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

        calculateCardWidth();
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

        function updateButtonState() {
            const carouselWidth = carousel.scrollWidth;
            const visibleWidth = carouselWrapper.offsetWidth;
            prevBtn.disabled = scrollPosition <= 0;
            nextBtn.disabled = scrollPosition >= (carouselWidth - visibleWidth - 1);
        }
        updateButtonState();
    }

    // modal para ampliar imagens dos certificados
    const modal = document.getElementById('image-modal');
    if (modal) {
        const modalImg = document.getElementById('modal-image');
        const certificateImages = document.querySelectorAll('.certificado-card img');
        const closeModalBtn = document.querySelector('.close-modal');

        certificateImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = "flex";
                modalImg.src = this.src;
                modalImg.alt = this.alt;
            });
        });

        function closeImageModal() {
            modal.style.display = "none";
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeImageModal);
        }
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeImageModal();
            }
        });
    }

    // Lógica do botão voltar ao topo
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            backToTopButton.style.display = (window.scrollY > 300) ? 'flex' : 'none';
        });
        backToTopButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Acessibilidade
    const accessibilityButton = document.getElementById('accessibility-button');
    const accessibilityPanel = document.getElementById('accessibility-panel');
    const closeAccessibilityButton = document.getElementById('close-accessibility');
    if (accessibilityButton && accessibilityPanel && closeAccessibilityButton) {
        accessibilityButton.addEventListener('click', () => {
            accessibilityPanel.style.display = accessibilityPanel.style.display === 'block' ? 'none' : 'block';
        });

        closeAccessibilityButton.addEventListener('click', () => {
            accessibilityPanel.style.display = 'none';
        });

        const htmlEl = document.documentElement;
        const bodyEl = document.body;
        let currentFontSize = parseFloat(window.getComputedStyle(htmlEl).fontSize);

        document.getElementById('increase-font').addEventListener('click', () => {
            if (currentFontSize < 24) {
                currentFontSize += 1;
                htmlEl.style.fontSize = `${currentFontSize}px`;
            }
        });

        document.getElementById('decrease-font').addEventListener('click', () => {
            if (currentFontSize > 10) {
                currentFontSize -= 1;
                htmlEl.style.fontSize = `${currentFontSize}px`;
            }
        });

        document.getElementById('font-default').addEventListener('click', () => bodyEl.classList.remove('font-sans-serif', 'font-serif'));
        document.getElementById('font-sans-serif').addEventListener('click', () => {
            bodyEl.classList.remove('font-serif');
            bodyEl.classList.add('font-sans-serif');
        });
        document.getElementById('font-serif').addEventListener('click', () => {
            bodyEl.classList.remove('font-sans-serif');
            bodyEl.classList.add('font-serif');
        });

        document.getElementById('color-default').addEventListener('click', () => htmlEl.classList.remove('grayscale', 'faded', 'intense'));
        document.getElementById('color-grayscale').addEventListener('click', () => {
            htmlEl.classList.remove('faded', 'intense');
            htmlEl.classList.add('grayscale');
        });
        document.getElementById('color-faded').addEventListener('click', () => {
            htmlEl.classList.remove('grayscale', 'intense');
            htmlEl.classList.add('faded');
        });
        document.getElementById('color-intense').addEventListener('click', () => {
            htmlEl.classList.remove('grayscale', 'faded');
            htmlEl.classList.add('intense');
        });
    }
});
