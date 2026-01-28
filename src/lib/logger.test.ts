import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger } from './logger';

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'debug').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should log debug messages', () => {
    logger.debug('Test debug message');
    expect(console.debug).toHaveBeenCalled();
  });

  it('should log info messages', () => {
    logger.info('Test info message');
    expect(console.info).toHaveBeenCalled();
  });

  it('should log warn messages', () => {
    logger.warn('Test warn message');
    expect(console.warn).toHaveBeenCalled();
  });

  it('should log error messages', () => {
    logger.error('Test error message');
    expect(console.error).toHaveBeenCalled();
  });

  it('should include context in log output', () => {
    logger.info('Message with context', { userId: '123', action: 'test' });
    expect(console.info).toHaveBeenCalled();
  });

  it('should log API request info', () => {
    logger.apiRequest('/api/test', 'POST', 'user-123');
    expect(console.info).toHaveBeenCalled();
  });

  it('should log API response info', () => {
    logger.apiResponse('/api/test', 200, 150);
    expect(console.info).toHaveBeenCalled();
  });

  it('should log API errors with error object', () => {
    const error = new Error('Test error');
    logger.apiError('/api/test', error);
    expect(console.error).toHaveBeenCalled();
  });
});
