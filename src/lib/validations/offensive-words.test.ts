import { describe, it, expect } from 'vitest';
import { OFFENSIVE_WORDS, removeAccents, containsOffensiveContent } from './offensive-words';

describe('OFFENSIVE_WORDS list', () => {
  it('should have a non-empty list', () => {
    expect(OFFENSIVE_WORDS.length).toBeGreaterThan(0);
  });

  it('should have all entries in lowercase', () => {
    for (const word of OFFENSIVE_WORDS) {
      expect(word).toBe(word.toLowerCase());
    }
  });

  it('should have no accented characters (normalized)', () => {
    for (const word of OFFENSIVE_WORDS) {
      expect(removeAccents(word)).toBe(word);
    }
  });
});

describe('removeAccents', () => {
  it('should remove common Portuguese accents', () => {
    expect(removeAccents('ação')).toBe('acao');
    expect(removeAccents('café')).toBe('cafe');
    expect(removeAccents('não')).toBe('nao');
    expect(removeAccents('saúde')).toBe('saude');
    expect(removeAccents('até')).toBe('ate');
  });

  it('should not modify text without accents', () => {
    expect(removeAccents('hello world')).toBe('hello world');
  });
});

describe('containsOffensiveContent', () => {
  it('should detect offensive words', () => {
    expect(containsOffensiveContent('isso é uma merda')).toBe(true);
    expect(containsOffensiveContent('seu idiota')).toBe(true);
  });

  it('should detect offensive words with accents (bypass attempt)', () => {
    expect(containsOffensiveContent('isso é uma mérdà')).toBe(true);
    expect(containsOffensiveContent('seu estúpido')).toBe(true);
  });

  it('should accept clean content', () => {
    expect(containsOffensiveContent('técnica de respiração para ansiedade')).toBe(false);
    expect(containsOffensiveContent('como melhorar o sono com breathwork')).toBe(false);
  });

  it('should be case insensitive', () => {
    expect(containsOffensiveContent('MERDA')).toBe(true);
    expect(containsOffensiveContent('Idiota')).toBe(true);
  });
});
