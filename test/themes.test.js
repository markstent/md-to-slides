import { describe, it, expect } from 'vitest';
import { themes, defaultThemeId, resolveTheme } from '../src/themes.js';

describe('themes list', () => {
  it('exports at least three themes', () => {
    expect(themes.length).toBeGreaterThanOrEqual(3);
  });

  it('defines a default theme that exists in the list', () => {
    expect(themes.some((theme) => theme.id === defaultThemeId)).toBe(true);
  });
});

describe('resolveTheme', () => {
  it('returns the matching theme for a known id', () => {
    const dark = themes.find((theme) => theme.id === 'dark');
    expect(resolveTheme('dark')).toEqual(dark);
  });

  it('falls back to the default theme for an unknown id', () => {
    expect(resolveTheme('nope').id).toBe(defaultThemeId);
  });

  it('falls back to the default theme when id is missing', () => {
    expect(resolveTheme().id).toBe(defaultThemeId);
  });
});
