document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const projetoId = parseInt(params.get('id'));

    const projeto = meusProjetos.find(p => p.id === projetoId);

    if (projeto) {
        document.title = `Detalhes do Projeto | ${projeto.titulo}`;
        document.querySelector('.titulo-projeto').textContent = projeto.titulo;
        document.querySelector('.descricao-projeto p').textContent = projeto.descricao;
        document.querySelector('.btn-projeto').href = projeto.linkOnline;

        // Preenche a lista de tecnologias
        const techList = document.querySelector('.tech-list');
        techList.innerHTML = ''; 
        projeto.tecnologias.forEach(tech => {
            const li = document.createElement('li');
            if (tech.icone) {
                li.innerHTML = `<i class="${tech.icone}"></i> ${tech.nome}`;
            } else if (tech.imagemIcone) {
                li.innerHTML = `<img class="tech-icon-img" alt="${tech.nome} logo" src="${tech.imagemIcone}"> ${tech.nome}`;
            }
            techList.appendChild(li);
        });

        // Preenche a galeria de imagens
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
                    <div class="zoom-icon" onclick="openModal()"><i class="fas fa-search-plus"></i></div>
                `;
                galeria.appendChild(slide);

                const dot = document.createElement('span');
                dot.className = 'dot';
                dot.setAttribute('onclick', `currentSlide(${index + 1})`);
                dotsContainer.appendChild(dot);
            });

            galeria.innerHTML += `
                <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                <a class="next" onclick="plusSlides(1)">&#10095;</a>
            `;
            galeria.appendChild(dotsContainer);

            showSlides(1);
        } else {
            galeria.innerHTML = '<p style="text-align: center; width: 100%;">Não há imagens para este projeto.</p>';
        }

    } else {
        // Caso não encontre um projeto com o ID fornecido
        document.querySelector('#projeto-detalhe .container').innerHTML = '<h2 class="titulo-projeto">Projeto não encontrado</h2>';
    }
});


// funções gerais

let slideIndex = 1;

function openModal() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const currentSlideImg = document.querySelector(".slide:not([style*='none']) img");
    if (modal && modalImg && currentSlideImg) {
        modal.style.display = "flex";
        modalImg.src = currentSlideImg.src;
    }
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
    }
}

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
