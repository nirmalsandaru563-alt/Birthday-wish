// Trigger the wish animation on click or after a short delay
window.addEventListener('click', () => {
    const wishElement = document.querySelector('.wish');
    wishElement.classList.toggle('is-in');
});

// Automatically trigger after 1 second for demonstration
setTimeout(() => {
    const wishElement = document.querySelector('.wish');
    wishElement.classList.add('is-in');
}, 1000);
