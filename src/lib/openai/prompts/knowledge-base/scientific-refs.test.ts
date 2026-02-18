import { describe, it, expect } from 'vitest';
import { SCIENTIFIC_REFERENCES } from './scientific-refs';

describe('SCIENTIFIC_REFERENCES integrity', () => {
  it('should have no duplicate DOIs', () => {
    const dois = SCIENTIFIC_REFERENCES
      .map(r => r.doi)
      .filter(doi => doi !== 'N/A' && !doi.startsWith('N/A'));
    const uniqueDois = new Set(dois);
    expect(uniqueDois.size).toBe(dois.length);
  });

  it('should have IDs consistent with year', () => {
    for (const ref of SCIENTIFIC_REFERENCES) {
      expect(ref.id).toContain(String(ref.year));
    }
  });

  it('should have all required fields', () => {
    for (const ref of SCIENTIFIC_REFERENCES) {
      expect(ref.id).toBeTruthy();
      expect(ref.title).toBeTruthy();
      expect(ref.authors.length).toBeGreaterThan(0);
      expect(ref.journal).toBeTruthy();
      expect(ref.year).toBeGreaterThan(1900);
      expect(ref.doi).toBeTruthy();
      expect(ref.keyFindings.length).toBeGreaterThan(0);
      expect(ref.topics.length).toBeGreaterThan(0);
      expect(ref.reliability).toBeTruthy();
    }
  });

  it('should not contain the removed chen-2017 duplicate', () => {
    const ids = SCIENTIFIC_REFERENCES.map(r => r.id);
    expect(ids).not.toContain('chen-2017');
  });

  it('should have bresolin-1983 instead of nestor-2020-study', () => {
    const ids = SCIENTIFIC_REFERENCES.map(r => r.id);
    expect(ids).not.toContain('nestor-2020-study');
    expect(ids).toContain('bresolin-1983');
  });
});
