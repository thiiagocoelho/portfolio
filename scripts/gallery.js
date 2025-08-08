let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    if (slides.length === 0) return;

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function openModal() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const currentSlideImg = document.querySelector(".slide:not([style*='none']) img");
    if (modal && modalImg && currentSlideImg) {
        modal.style.display = "flex";
        modalImg.src = currentSlideImg.src;
    }
}

export function initializeGallery(projeto) {
    const galeria = document.querySelector('.galeria');
    const dotsContainer = document.querySelector('.dots-container');
    galeria.innerHTML = '';
    dotsContainer.innerHTML = '';

    if (projeto.imagensGaleria && projeto.imagensGaleria.length > 0) {
        projeto.imagensGaleria.forEach((imagem, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide fade';
            slide.innerHTML = `
                <img src="${imagem}" alt="Imagem ${index + 1} do projeto ${projeto.titulo}">
                <div class="zoom-icon"><i class="fas fa-search-plus"></i></div>
            `;
            galeria.appendChild(slide);

            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.onclick = () => currentSlide(index + 1);
            dotsContainer.appendChild(dot);
        });
        
        const prevButton = document.createElement('a');
        prevButton.className = 'prev';
        prevButton.innerHTML = '&#10094;';
        prevButton.onclick = () => plusSlides(-1);
        galeria.appendChild(prevButton);

        const nextButton = document.createElement('a');
        nextButton.className = 'next';
        nextButton.innerHTML = '&#10095;';
        nextButton.onclick = () => plusSlides(1);
        galeria.appendChild(nextButton);

        galeria.appendChild(dotsContainer);
        
        // Adiciona o evento de clique para o ícone de zoom
        document.querySelectorAll('.zoom-icon').forEach(icon => {
            icon.addEventListener('click', openModal);
        });

        showSlides(1);
    } else {
        galeria.innerHTML = '<p style="text-align: center; width: 100%;">Não há imagens para este projeto.</p>';
    }
}