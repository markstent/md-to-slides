const STORAGE_KEY = 'md-to-slides:state';

const defaults = { content: '', theme: null };

export function saveState(state, storage) {
  storage.setItem(STORAGE_KEY, JSON.stringify({
    content: state.content,
    theme: state.theme,
  }));
}

export function loadState(storage) {
  const raw = storage.getItem(STORAGE_KEY);
  if (raw === null) return { ...defaults };
  const parsed = JSON.parse(raw);
  return { content: parsed.content, theme: parsed.theme };
}
