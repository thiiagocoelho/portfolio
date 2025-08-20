import { meusProjetos } from './data.js';
import { initializeGallery } from './gallery.js';

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const projetoId = parseInt(params.get('id'));
    const projeto = meusProjetos.find(p => p.id === projetoId);

    if (projeto) {
        document.title = `Detalhes do Projeto | ${projeto.titulo}`;
        document.querySelector('.titulo-projeto').textContent = projeto.titulo;
        document.querySelector('.descricao-projeto p').textContent = projeto.descricao;
        document.querySelector('.btn-projeto').href = projeto.linkOnline;

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

        initializeGallery(projeto);
        
        // Configura o botão de fechar do modal
        const modal = document.getElementById("imageModal");
        const closeModalBtn = document.querySelector(".close-modal");
        
        function closeModal() {
            if (modal) {
                modal.style.display = "none";
            }
        }
        
        if(closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

    } else {
        document.querySelector('#projeto-detalhe .container').innerHTML = '<h2 class="titulo-projeto">Projeto não encontrado</h2>';
    }
});