import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Login Page', () => {
  test('login page — light mode', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('login-light.png', {
      fullPage: true,
    });
  });

  test('login page — dark mode', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await expect(page).toHaveScreenshot('login-dark.png', {
      fullPage: true,
    });
  });
});
