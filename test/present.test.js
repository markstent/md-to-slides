import { describe, it, expect } from 'vitest';
import { createPresenter } from '../src/present.js';

describe('createPresenter navigation', () => {
  it('starts at index 0', () => {
    const p = createPresenter(3);
    expect(p.current()).toBe(0);
  });

  it('next() advances the current index', () => {
    const p = createPresenter(3);
    p.next();
    expect(p.current()).toBe(1);
  });

  it('prev() retreats the current index', () => {
    const p = createPresenter(3);
    p.next();
    p.next();
    p.prev();
    expect(p.current()).toBe(1);
  });

  it('next() clamps at the last slide and does not wrap', () => {
    const p = createPresenter(3);
    p.next();
    p.next();
    p.next();
    p.next();
    expect(p.current()).toBe(2);
  });

  it('prev() clamps at 0 and does not wrap', () => {
    const p = createPresenter(3);
    p.prev();
    p.prev();
    expect(p.current()).toBe(0);
  });

  it('handles slideCount === 0: stays at 0, next/prev are no-ops', () => {
    const p = createPresenter(0);
    expect(p.current()).toBe(0);
    p.next();
    expect(p.current()).toBe(0);
    p.prev();
    expect(p.current()).toBe(0);
  });
});
