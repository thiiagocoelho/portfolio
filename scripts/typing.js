export function initializeTypingEffect(elementId, text, speed = 150) {
    const typingTextElement = document.getElementById(elementId);
    if (!typingTextElement) return;

    let charIndex = 0;
    function type() {
        if (charIndex < text.length) {
            typingTextElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, speed);
        }
    }
    type();
}