import { parseDeck } from './parseDeck.js';
import { themes, defaultThemeId, resolveTheme } from './themes.js';
import { saveState, loadState } from './state.js';

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

const saved = loadState(localStorage);
if (saved.content) editor.value = saved.content;
const initialThemeId = saved.theme ?? defaultThemeId;
themeSelect.value = initialThemeId;
applyTheme(initialThemeId);

function persist() {
  saveState({ content: editor.value, theme: themeSelect.value }, localStorage);
}

themeSelect.addEventListener('change', () => {
  applyTheme(themeSelect.value);
  persist();
});
editor.addEventListener('input', () => {
  render();
  persist();
});
render();
