import { parseDeck } from './parseDeck.js';
import { themes, defaultThemeId, resolveTheme } from './themes.js';

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const slidesEl = document.getElementById('slides');
const themeSelect = document.getElementById('theme-select');

function render() {
  const slides = parseDeck(editor.value);
  slidesEl.innerHTML = slides
    .map((slide) => `<section class="slide"><div class="slide-content">${slide.html}</div></section>`)
    .join('');
}

function applyTheme(id) {
  preview.dataset.theme = resolveTheme(id).id;
}

themeSelect.innerHTML = themes
  .map((theme) => `<option value="${theme.id}">${theme.name}</option>`)
  .join('');
themeSelect.value = defaultThemeId;
applyTheme(defaultThemeId);

themeSelect.addEventListener('change', () => applyTheme(themeSelect.value));
editor.addEventListener('input', render);
render();
