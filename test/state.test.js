import { describe, it, expect } from 'vitest';
import { saveState, loadState } from '../src/state.js';

function createFakeStorage() {
  const map = new Map();
  return {
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, String(value)),
  };
}

describe('state save/load', () => {
  it('round-trips content and theme through storage', () => {
    const storage = createFakeStorage();
    saveState({ content: '# Hello', theme: 'dark' }, storage);
    expect(loadState(storage)).toEqual({ content: '# Hello', theme: 'dark' });
  });

  it('returns defaults (empty content, null theme) when storage is empty', () => {
    const storage = createFakeStorage();
    expect(loadState(storage)).toEqual({ content: '', theme: null });
  });
});
