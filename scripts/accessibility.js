export function initializeAccessibilityPanel() {
    const accessibilityButton = document.getElementById('accessibility-button');
    const accessibilityPanel = document.getElementById('accessibility-panel');
    const closeAccessibilityButton = document.getElementById('close-accessibility');

    if (!accessibilityButton || !accessibilityPanel || !closeAccessibilityButton) return;

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