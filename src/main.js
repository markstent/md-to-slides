import { parseDeck } from './parseDeck.js';
import { themes, defaultThemeId, resolveTheme } from './themes.js';
import { saveState, loadState } from './state.js';
import { createPresenter } from './present.js';

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const slidesEl = document.getElementById('slides');
const themeSelect = document.getElementById('theme-select');
const presentButton = document.getElementById('present-button');
const presentEl = document.getElementById('present');
const stageEl = presentEl.querySelector('.present-stage');

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

// Present mode: fullscreen, one slide at a time on a 16:9 surface, arrow keys.
let presentSlides = [];
let presenter = null;

function renderPresentSlide() {
  const slide = presentSlides[presenter.current()];
  stageEl.innerHTML = slide
    ? `<section class="slide"><div class="slide-content">${slide.html}</div></section>`
    : '';
}

function onPresentKey(event) {
  if (event.key === 'ArrowRight' || event.key === ' ') {
    event.preventDefault();
    presenter.next();
    renderPresentSlide();
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    presenter.prev();
    renderPresentSlide();
  }
}

function stopPresenting() {
  presentEl.classList.remove('is-presenting');
  document.removeEventListener('keydown', onPresentKey);
  document.removeEventListener('fullscreenchange', onFullscreenChange);
}

function onFullscreenChange() {
  if (!document.fullscreenElement) stopPresenting();
}

function startPresenting() {
  presentSlides = parseDeck(editor.value);
  presenter = createPresenter(presentSlides.length);
  presentEl.dataset.theme = preview.dataset.theme;
  presentEl.classList.add('is-presenting');
  renderPresentSlide();
  document.addEventListener('keydown', onPresentKey);
  document.addEventListener('fullscreenchange', onFullscreenChange);
  presentEl.requestFullscreen?.();
}

presentButton.addEventListener('click', startPresenting);
