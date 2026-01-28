import { describe, it, expect } from 'vitest';
import {
  detectTopics,
  detectTopicsWithMatches,
  detectTopicsFromSlides,
  detectTopicsFromSlidesWithMatches,
  normalizeText,
  getTopicLabel,
  getAllTopics,
} from './topic-detection.service';

describe('topic-detection.service', () => {
  describe('normalizeText', () => {
    it('should convert text to lowercase', () => {
      expect(normalizeText('ANSIEDADE')).toBe('ansiedade');
      expect(normalizeText('Estresse')).toBe('estresse');
    });

    it('should remove accents and diacritics', () => {
      expect(normalizeText('ansiedade')).toBe('ansiedade');
      expect(normalizeText('pânico')).toBe('panico');
      expect(normalizeText('angústia')).toBe('angustia');
      expect(normalizeText('insônia')).toBe('insonia');
      expect(normalizeText('coração')).toBe('coracao');
    });

    it('should normalize whitespace', () => {
      expect(normalizeText('sistema   nervoso')).toBe('sistema nervoso');
      expect(normalizeText('  sono  ')).toBe('sono');
    });

    it('should handle special characters', () => {
      expect(normalizeText('4-7-8')).toBe('4-7-8');
      expect(normalizeText('fight/flight')).toBe('fight flight');
    });
  });

  describe('detectTopics', () => {
    it('should detect ansiedade topic', () => {
      expect(detectTopics('Como controlar a ansiedade')).toContain('ansiedade');
      expect(detectTopics('Estou me sentindo muito ansioso hoje')).toContain('ansiedade');
      expect(detectTopics('Técnicas para crises de pânico')).toContain('ansiedade');
    });

    it('should detect sono topic', () => {
      expect(detectTopics('Melhore seu sono com respiração')).toContain('sono');
      expect(detectTopics('Técnica 4-7-8 para dormir')).toContain('sono');
      expect(detectTopics('Insônia é um problema comum')).toContain('sono');
    });

    it('should detect vfc topic', () => {
      expect(detectTopics('Aumente sua VFC com respiração')).toContain('vfc');
      expect(detectTopics('Variabilidade da frequência cardíaca')).toContain('vfc');
      expect(detectTopics('HRV e saúde do coração')).toContain('vfc');
    });

    it('should detect energia topic', () => {
      expect(detectTopics('Respiração para aumentar energia')).toContain('energia');
      expect(detectTopics('Combater fadiga e cansaço')).toContain('energia');
      expect(detectTopics('Evite o burnout')).toContain('energia');
    });

    it('should detect foco topic', () => {
      expect(detectTopics('Melhore seu foco e concentração')).toContain('foco');
      expect(detectTopics('Clareza mental através da respiração')).toContain('foco');
      expect(detectTopics('Técnicas para TDAH')).toContain('foco');
    });

    it('should detect respiracao_nasal topic', () => {
      expect(detectTopics('Respire pelo nariz')).toContain('respiracao_nasal');
      expect(detectTopics('Benefícios da respiração nasal')).toContain('respiracao_nasal');
      expect(detectTopics('Mouth taping para dormir')).toContain('respiracao_nasal');
    });

    it('should detect sistema_nervoso topic', () => {
      expect(detectTopics('Ative o sistema nervoso parassimpático')).toContain('sistema_nervoso');
      expect(detectTopics('Estimule o nervo vago')).toContain('sistema_nervoso');
      expect(detectTopics('Saia do modo luta ou fuga')).toContain('sistema_nervoso');
    });

    it('should detect relaxamento topic', () => {
      expect(detectTopics('Técnicas de relaxamento')).toContain('relaxamento');
      expect(detectTopics('Encontre calma interior')).toContain('relaxamento');
      expect(detectTopics('Mantenha o equilíbrio')).toContain('relaxamento');
    });

    it('should detect estresse topic', () => {
      expect(detectTopics('Reduza o estresse diário')).toContain('estresse');
      expect(detectTopics('Controle do cortisol')).toContain('estresse');
      expect(detectTopics('Stress crônico afeta a saúde')).toContain('estresse');
    });

    it('should detect multiple topics in the same text', () => {
      const text = 'Respiração para ansiedade e sono melhor';
      const topics = detectTopics(text);
      expect(topics).toContain('ansiedade');
      expect(topics).toContain('sono');
    });

    it('should return empty array for text without topics', () => {
      expect(detectTopics('O tempo está bom hoje')).toEqual([]);
      expect(detectTopics('')).toEqual([]);
    });

    it('should return sorted topics', () => {
      const text = 'Estresse causa ansiedade e afeta o sono';
      const topics = detectTopics(text);
      expect(topics).toEqual([...topics].sort());
    });

    it('should handle case insensitivity', () => {
      expect(detectTopics('ANSIEDADE')).toContain('ansiedade');
      expect(detectTopics('Sono')).toContain('sono');
      expect(detectTopics('vFc')).toContain('vfc');
    });

    it('should handle accented text', () => {
      expect(detectTopics('insônia')).toContain('sono');
      expect(detectTopics('coração')).toContain('vfc');
      expect(detectTopics('pânico')).toContain('ansiedade');
    });
  });

  describe('detectTopicsWithMatches', () => {
    it('should return matched keywords for each topic', () => {
      const result = detectTopicsWithMatches('Ansiedade e pânico são comuns');
      expect(result.topics).toContain('ansiedade');
      expect(result.matches.ansiedade).toContain('ansiedade');
      expect(result.matches.ansiedade).toContain('panico');
    });

    it('should return empty matches for non-detected topics', () => {
      const result = detectTopicsWithMatches('Melhore seu sono');
      expect(result.matches.ansiedade).toEqual([]);
      expect(result.matches.sono.length).toBeGreaterThan(0);
    });
  });

  describe('detectTopicsFromSlides', () => {
    it('should detect topics from multiple slides', () => {
      const slides = [
        { texto: 'Técnicas para ansiedade' },
        { texto: 'Melhore seu sono' },
        { texto: 'Aumente sua energia' },
      ];
      const topics = detectTopicsFromSlides(slides);
      expect(topics).toContain('ansiedade');
      expect(topics).toContain('sono');
      expect(topics).toContain('energia');
    });

    it('should handle empty slides array', () => {
      expect(detectTopicsFromSlides([])).toEqual([]);
    });

    it('should handle slides with empty text', () => {
      const slides = [{ texto: '' }, { texto: 'ansiedade' }];
      const topics = detectTopicsFromSlides(slides);
      expect(topics).toContain('ansiedade');
    });
  });

  describe('detectTopicsFromSlidesWithMatches', () => {
    it('should return detailed matches from slides', () => {
      const slides = [
        { texto: 'Controle a ansiedade' },
        { texto: 'Melhore seu sono' },
      ];
      const result = detectTopicsFromSlidesWithMatches(slides);
      expect(result.topics).toContain('ansiedade');
      expect(result.topics).toContain('sono');
    });
  });

  describe('getTopicLabel', () => {
    it('should return Portuguese labels for topics', () => {
      expect(getTopicLabel('ansiedade')).toBe('Ansiedade');
      expect(getTopicLabel('sono')).toBe('Sono');
      expect(getTopicLabel('vfc')).toBe('Variabilidade da Frequência Cardíaca');
      expect(getTopicLabel('energia')).toBe('Energia');
      expect(getTopicLabel('foco')).toBe('Foco e Concentração');
      expect(getTopicLabel('respiracao_nasal')).toBe('Respiração Nasal');
      expect(getTopicLabel('sistema_nervoso')).toBe('Sistema Nervoso');
      expect(getTopicLabel('relaxamento')).toBe('Relaxamento');
      expect(getTopicLabel('estresse')).toBe('Estresse');
    });
  });

  describe('getAllTopics', () => {
    it('should return all 9 topics', () => {
      const topics = getAllTopics();
      expect(topics).toHaveLength(9);
      expect(topics).toContain('ansiedade');
      expect(topics).toContain('sono');
      expect(topics).toContain('vfc');
      expect(topics).toContain('energia');
      expect(topics).toContain('foco');
      expect(topics).toContain('respiracao_nasal');
      expect(topics).toContain('sistema_nervoso');
      expect(topics).toContain('relaxamento');
      expect(topics).toContain('estresse');
    });
  });

  describe('edge cases', () => {
    it('should not match partial words', () => {
      // "sono" should not match in "sonolência" context where it's a different word
      // But "sonolência" IS a keyword for sono topic, so it should match
      expect(detectTopics('sonolência')).toContain('sono');

      // "foco" should not match in "enfocou" if not a keyword
      expect(detectTopics('enfocou')).not.toContain('foco');
    });

    it('should match multi-word phrases', () => {
      expect(detectTopics('sistema nervoso autônomo')).toContain('sistema_nervoso');
      expect(detectTopics('frequência cardíaca alta')).toContain('vfc');
      expect(detectTopics('luta ou fuga')).toContain('sistema_nervoso');
    });

    it('should handle real carousel content', () => {
      const realSlides = [
        { texto: 'A respiração é a chave para controlar a ansiedade' },
        { texto: 'Quando estamos ansiosos, respiramos rápido e superficialmente' },
        { texto: 'A técnica 4-7-8 ativa o sistema nervoso parassimpático' },
        { texto: 'Pratique antes de dormir para melhorar o sono' },
        { texto: 'Comece hoje e sinta a diferença!' },
      ];
      const topics = detectTopicsFromSlides(realSlides);
      expect(topics).toContain('ansiedade');
      expect(topics).toContain('sono');
      expect(topics).toContain('sistema_nervoso');
    });
  });
});
