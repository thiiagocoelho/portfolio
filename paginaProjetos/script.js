// Variável para controlar o slide atual, começando no primeiro
let slideIndex = 1;

// Seleciona os elementos do DOM para o modal (janela de zoom)
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");

// Garante que o primeiro slide seja exibido assim que a página carregar
document.addEventListener("DOMContentLoaded", function() {
    showSlides(slideIndex);
});

// Função para ABRIR o modal de imagem ampliada
function openModal() {
  modal.style.display = "flex"; // Torna o modal visível
  // Garante que a imagem correta (a que está visível na galeria) seja mostrada
  showSlides(slideIndex); 
}

// Função para FECHAR o modal
function closeModal() {
  modal.style.display = "none"; // Esconde o modal
}

// Função para avançar ou retroceder os slides
// É chamada pelos botões de seta (prev/next)
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Função para ir para um slide específico (bolinhas)
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Função principal que gerencia qual slide é exibido
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  
  // Lógica para fazer a galeria "circular"
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  // 1. Esconde todos os slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  // 2. Remove a classe "active" de todas as bolinhas
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // 3. Mostra o slide correto na galeria
  slides[slideIndex - 1].style.display = "block";
  
  // 4. Acende a bolinha correta
  dots[slideIndex - 1].className += " active";
  
  // 5. Atualiza a imagem dentro do modal para corresponder ao slide atual
  let currentImgSrc = slides[slideIndex - 1].getElementsByTagName('img')[0].src;
  modalImg.src = currentImgSrc;
}

// Acessibilidade
document.addEventListener('DOMContentLoaded', () => {
    const accessibilityButton = document.getElementById('accessibility-button');
    const accessibilityPanel = document.getElementById('accessibility-panel');
    const closeAccessibilityButton = document.getElementById('close-accessibility');

    if (accessibilityButton && accessibilityPanel && closeAccessibilityButton) {
        accessibilityButton.addEventListener('click', () => {
            const isVisible = accessibilityPanel.style.display === 'block';
            accessibilityPanel.style.display = isVisible ? 'none' : 'block';
        });

        closeAccessibilityButton.addEventListener('click', () => {
            accessibilityPanel.style.display = 'none';
        });

        const htmlEl = document.documentElement;
        const bodyEl = document.body;
        let currentFontSize = parseFloat(window.getComputedStyle(htmlEl).fontSize);

        // Tamanho da fonte
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

        // Fonte
        document.getElementById('font-default').addEventListener('click', () => {
            bodyEl.classList.remove('font-sans-serif', 'font-serif');
        });

        document.getElementById('font-sans-serif').addEventListener('click', () => {
            bodyEl.classList.remove('font-serif');
            bodyEl.classList.add('font-sans-serif');
        });

        document.getElementById('font-serif').addEventListener('click', () => {
            bodyEl.classList.remove('font-sans-serif');
            bodyEl.classList.add('font-serif');
        });

        // Cor
        document.getElementById('color-default').addEventListener('click', () => {
            htmlEl.classList.remove('grayscale', 'faded', 'intense');
        });

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
