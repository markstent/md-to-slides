import { parseDeck } from './parseDeck.js';

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

function render() {
  const slides = parseDeck(editor.value);
  preview.innerHTML = slides
    .map((slide) => `<section class="slide"><div class="slide-content">${slide.html}</div></section>`)
    .join('');
}

editor.addEventListener('input', render);
render();
