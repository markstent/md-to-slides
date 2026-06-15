import { describe, it, expect } from 'vitest';
import { parseDeck } from '../src/parseDeck.js';

describe('parseDeck slide splitting', () => {
  it('splits on lines that are exactly --- into an ordered array', () => {
    const deck = parseDeck('First slide\n\n---\n\nSecond slide');
    expect(deck).toHaveLength(2);
    expect(deck[0].html).toContain('First slide');
    expect(deck[1].html).toContain('Second slide');
  });

  it('does not split on lines that are not exactly --- (e.g. ----)', () => {
    const deck = parseDeck('One\n\n----\n\nstill one');
    expect(deck).toHaveLength(1);
  });
});

describe('parseDeck Markdown features', () => {
  const render = (md) => parseDeck(md)[0].html;

  it('renders headings', () => {
    expect(render('# Title')).toContain('<h1');
  });

  it('renders bold and italic', () => {
    const html = render('**bold** and *italic*');
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('<em>italic</em>');
  });

  it('renders unordered and ordered lists', () => {
    expect(render('- a\n- b')).toContain('<ul>');
    expect(render('1. a\n2. b')).toContain('<ol>');
  });

  it('renders links', () => {
    expect(render('[site](https://example.com)')).toContain('<a href="https://example.com">site</a>');
  });

  it('renders blockquotes', () => {
    expect(render('> quoted')).toContain('<blockquote>');
  });

  it('renders inline code', () => {
    expect(render('use `code` here')).toContain('<code>code</code>');
  });

  it('renders tables', () => {
    const html = render('| a | b |\n| - | - |\n| 1 | 2 |');
    expect(html).toContain('<table>');
    expect(html).toContain('<th>a</th>');
    expect(html).toContain('<td>1</td>');
  });

  it('renders an image by URL', () => {
    expect(render('![alt](https://example.com/pic.png)')).toContain('<img src="https://example.com/pic.png" alt="alt"');
  });

  it('syntax-highlights fenced code blocks', () => {
    const html = render('```js\nconst x = 1;\n```');
    expect(html).toContain('hljs');
    expect(html).toContain('language-js');
    // highlight.js wraps tokens in spans with hljs- classes
    expect(html).toContain('hljs-keyword');
  });
});
