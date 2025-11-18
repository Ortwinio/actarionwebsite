import { expect, test } from '@playwright/test';

const routes = [
  { name: 'home', path: '/en' },
  { name: 'about', path: '/en/about' },
  { name: 'contact', path: '/en/contact' },
  { name: 'use cases overview', path: '/en/use-cases' },
  { name: 'use case detail', path: '/en/ar-training-and-onboarding' },
  { name: 'faq', path: '/en/faq' },
  { name: 'career', path: '/en/career' },
];

const replaceLocaleSegment = (path: string, nextLocale: string) =>
  path.replace(/^\/[a-z]{2}(?=\/|$)/, `/${nextLocale}`);

test.describe('Language selector behaviour', () => {
  routes.forEach(({ name, path }) => {
    test(`keeps slug when switching to German on ${name}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'networkidle' });

      const toggle = page.getByTestId('language-selector-toggle');
      await expect(toggle).toBeVisible();

      await toggle.click();
      await page.getByTestId('language-option-de').click();

      const expectedPath = replaceLocaleSegment(path, 'de');
      await page.waitForURL((url) => url.pathname === expectedPath);
    });
  });

  test('supports switching to Dutch from German on the homepage', async ({ page }) => {
    await page.goto('/de', { waitUntil: 'networkidle' });

    const toggle = page.getByTestId('language-selector-toggle');
    await toggle.click();
    await page.getByTestId('language-option-nl').click();

    await page.waitForURL((url) => url.pathname === '/nl');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

