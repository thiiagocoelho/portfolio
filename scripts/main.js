import { initializeTypingEffect } from './typing.js';
import { initializeScrollAnimations } from './animations.js';
import { initializeCarousel } from './carousel.js';
import { initializeImageModal } from './modal.js';
import { initializeBackToTopButton } from './backToTop.js';
import { initializeAccessibilityPanel } from './accessibility.js';

document.addEventListener('DOMContentLoaded', function() {
    initializeTypingEffect('typing-text', "Olá, eu sou Thiago Coelho");
    initializeScrollAnimations();
    initializeCarousel();
    initializeImageModal('image-modal', 'modal-image', '.certificado-card img', '.close-modal');
    initializeBackToTopButton();
    initializeAccessibilityPanel();
});