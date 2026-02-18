import { describe, it, expect } from 'vitest';
import { SCIENTIFIC_REFERENCES } from './scientific-refs';

describe('Scientific References Integrity', () => {
  it('should have no duplicate DOIs', () => {

    const seen = new Map<string, string>();
    const duplicates: string[] = [];

    for (const ref of SCIENTIFIC_REFERENCES) {
      if (ref.doi === 'N/A' || ref.doi.startsWith('N/A')) continue;
      if (seen.has(ref.doi)) {
        duplicates.push(`${ref.id} and ${seen.get(ref.doi)} share DOI ${ref.doi}`);
      }
      seen.set(ref.doi, ref.id);
    }

    expect(duplicates).toEqual([]);
  });

  it('should have IDs consistent with publication year', () => {
    const mismatches: string[] = [];
    for (const ref of SCIENTIFIC_REFERENCES) {
      if (!ref.id.includes(String(ref.year))) {
        mismatches.push(`${ref.id} has year ${ref.year} but ID does not contain it`);
      }
    }
    expect(mismatches).toEqual([]);
  });

  it('should have all required fields populated', () => {
    for (const ref of SCIENTIFIC_REFERENCES) {
      expect(ref.id, `Missing id`).toBeTruthy();
      expect(ref.title, `Missing title for ${ref.id}`).toBeTruthy();
      expect(ref.authors.length, `No authors for ${ref.id}`).toBeGreaterThan(0);
      expect(ref.journal, `Missing journal for ${ref.id}`).toBeTruthy();
      expect(ref.year, `Missing year for ${ref.id}`).toBeGreaterThan(1900);
      expect(ref.doi, `Missing doi for ${ref.id}`).toBeTruthy();
      expect(ref.keyFindings.length, `No findings for ${ref.id}`).toBeGreaterThan(0);
      expect(ref.topics.length, `No topics for ${ref.id}`).toBeGreaterThan(0);
      expect(['peer-reviewed', 'meta-analysis', 'systematic-review']).toContain(ref.reliability);
    }
  });

  it('should have unique IDs', () => {
    const ids = SCIENTIFIC_REFERENCES.map(r => r.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should not contain known removed duplicates', () => {
    const ids = SCIENTIFIC_REFERENCES.map(r => r.id);
    expect(ids).not.toContain('chen-2017');
    expect(ids).not.toContain('nestor-2020-study');
  });

  it('should have bresolin-1983 with correct year', () => {
    const ref = SCIENTIFIC_REFERENCES.find(r => r.id === 'bresolin-1983');
    expect(ref).toBeDefined();
    expect(ref!.year).toBe(1983);
  });
});
