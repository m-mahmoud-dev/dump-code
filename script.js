const yearSpan = document.getElementById('current-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
  card.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') return;
    const projectName = card.querySelector('h3')?.innerText || 'this project';
    alert(`why are you clicking on "${projectName}" — (this is just a simple demo you didn't pay me yet)`);
  });
});