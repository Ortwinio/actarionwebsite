import { test, expect } from '@playwright/test';

/**
 * SEO Head Validation Tests
 * 
 * These tests verify that critical SEO elements are correctly placed
 * inside the <head> section, not in the <body>.
 * 
 * Elements checked:
 * - <title>
 * - <link rel="canonical">
 * - <link rel="alternate" hreflang="...">
 * - <meta name="robots">
 * - <meta name="description">
 * 
 * @see docs/seo-issues-overview.md
 */

// Key URLs to test (representative sample from the crawler report)
const TEST_URLS = [
  // Home pages
  '/en',
  '/de',
  '/nl',
  
  // Main pages
  '/en/about',
  '/en/use-cases',
  '/en/blog',
  '/en/contact',
  '/en/services',
  '/en/faq',
  '/en/privacy',
  '/en/terms',
  '/en/career',
  
  // Use case pages
  '/en/ar-training-and-onboarding',
  '/en/ar-preventive-maintenance',
  '/en/ar-guided-assembly-production',
  
  // Partner pages
  '/en/partner-contact',
  '/en/partners/deepsight',
  
  // Content pages
  '/en/videos',
  '/en/news',
  '/en/events',
  '/en/whitepapers',
  '/en/management',
  '/en/vision',
];

// Helper to extract head and body content from HTML
function getHeadAndBody(html: string): { head: string; body: string } {
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  
  return {
    head: headMatch ? headMatch[1] : '',
    body: bodyMatch ? bodyMatch[1] : '',
  };
}

test.describe('SEO Head Validation', () => {
  for (const url of TEST_URLS) {
    test.describe(`URL: ${url}`, () => {
      let html: string;
      let head: string;
      let body: string;

      test.beforeAll(async ({ request }) => {
        const response = await request.get(url);
        html = await response.text();
        const parsed = getHeadAndBody(html);
        head = parsed.head;
        body = parsed.body;
      });

      test('should have exactly one <title> in <head> and none in <body>', async () => {
        // Count titles in head
        const headTitles = (head.match(/<title[^>]*>/gi) || []).length;
        expect(headTitles).toBe(1);
        
        // Check no titles in body
        const bodyTitles = (body.match(/<title[^>]*>/gi) || []).length;
        expect(bodyTitles).toBe(0);
      });

      test('should have canonical link in <head> and none in <body>', async () => {
        // Check canonical in head
        const headCanonical = head.includes('rel="canonical"') || head.includes("rel='canonical'");
        expect(headCanonical).toBe(true);
        
        // Check no canonical in body
        const bodyCanonical = body.includes('rel="canonical"') || body.includes("rel='canonical'");
        expect(bodyCanonical).toBe(false);
      });

      test('should have hreflang links in <head> and none in <body>', async () => {
        // Check hreflang in head (at least x-default should be present)
        const headHreflang = head.includes('hreflang=') || head.includes('hrefLang=');
        expect(headHreflang).toBe(true);
        
        // Check no hreflang in body
        const bodyHreflang = body.includes('hreflang=') || body.includes('hrefLang=');
        expect(bodyHreflang).toBe(false);
      });

      test('should have meta robots in <head> only', async () => {
        // Check robots meta in head
        const headRobots = head.includes('name="robots"') || head.includes("name='robots'");
        expect(headRobots).toBe(true);
        
        // Check no robots meta in body
        const bodyRobots = body.includes('name="robots"') || body.includes("name='robots'");
        expect(bodyRobots).toBe(false);
      });

      test('should have meta description in <head> only', async () => {
        // Check description in head
        const headDescription = head.includes('name="description"') || head.includes("name='description'");
        expect(headDescription).toBe(true);
        
        // Check no description in body
        const bodyDescription = body.includes('name="description"') || body.includes("name='description'");
        expect(bodyDescription).toBe(false);
      });
    });
  }
});

// Quick check test for a single URL (useful for debugging)
test('Quick SEO check for home page', async ({ page }) => {
  await page.goto('/en');
  
  // Wait for page to be ready
  await page.waitForLoadState('domcontentloaded');
  
  // Get the HTML content
  const html = await page.content();
  const { head, body } = getHeadAndBody(html);
  
  console.log('\n=== SEO Head Validation Results ===\n');
  
  // Title check
  const headTitles = (head.match(/<title[^>]*>.*?<\/title>/gi) || []);
  const bodyTitles = (body.match(/<title[^>]*>/gi) || []).length;
  console.log(`Title in <head>: ${headTitles.length} (${headTitles.length === 1 ? '✓' : '✗'})`);
  if (headTitles.length > 0) {
    console.log(`  Title value: ${headTitles[0]}`);
  }
  console.log(`Title in <body>: ${bodyTitles} (${bodyTitles === 0 ? '✓' : '✗'})`);
  
  // Canonical check
  const headCanonical = head.includes('rel="canonical"');
  const bodyCanonical = body.includes('rel="canonical"');
  console.log(`Canonical in <head>: ${headCanonical ? '✓' : '✗'}`);
  console.log(`Canonical in <body>: ${!bodyCanonical ? '✓' : '✗ (found in body!)'}`);
  
  // Hreflang check
  const headHreflang = (head.match(/hreflang=/gi) || []).length;
  const bodyHreflang = (body.match(/hreflang=/gi) || []).length;
  console.log(`Hreflang in <head>: ${headHreflang} tags (${headHreflang >= 3 ? '✓' : '✗'})`);
  console.log(`Hreflang in <body>: ${bodyHreflang} (${bodyHreflang === 0 ? '✓' : '✗ (found in body!)'})`);
  
  // Robots check
  const headRobots = head.includes('name="robots"');
  const bodyRobots = body.includes('name="robots"');
  console.log(`Robots in <head>: ${headRobots ? '✓' : '✗'}`);
  console.log(`Robots in <body>: ${!bodyRobots ? '✓' : '✗ (found in body!)'}`);
  
  console.log('\n===================================\n');
  
  // Assert basic requirements
  expect(headTitles.length).toBe(1);
  expect(bodyTitles).toBe(0);
});






