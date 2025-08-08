export function initializeBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    window.addEventListener('scroll', () => {
        backToTopButton.style.display = (window.scrollY > 300) ? 'flex' : 'none';
    });

    backToTopButton.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}