export function initializeImageModal(modalId, imageId, triggerSelector, closeSelector) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const modalImg = document.getElementById(imageId);
    const images = document.querySelectorAll(triggerSelector);
    const closeModalBtn = document.querySelector(closeSelector);

    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "flex";
            modalImg.src = this.src;
            modalImg.alt = this.alt;
        });
    });

    function closeModal() {
        modal.style.display = "none";
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}