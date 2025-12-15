import { test, expect } from '@playwright/test';

/**
 * SEO Test: Title Element Placement
 * 
 * Ensures that <title> elements are correctly placed inside <head>
 * and not streamed into the body by Next.js.
 * 
 * This test addresses the Screaming Frog issue "Page Titles: Outside <head>"
 * 
 * @see docs/seo-issues-overview.md
 */

const PAGES_TO_CHECK = [
  { path: '/en', name: 'Homepage' },
  { path: '/en/about', name: 'About' },
  { path: '/en/privacy', name: 'Privacy' },
  { path: '/en/terms', name: 'Terms' },
  { path: '/en/contact', name: 'Contact' },
  { path: '/en/blog', name: 'Blog List' },
  { path: '/en/use-cases', name: 'Use Cases' },
  { path: '/en/services', name: 'Services' },
  { path: '/en/faq', name: 'FAQ' },
  { path: '/en/career', name: 'Career' },
  { path: '/en/vision', name: 'Vision' },
  { path: '/en/management', name: 'Management' },
  { path: '/en/partner-contact', name: 'Partners' },
];

test.describe('SEO: Title Element Placement', () => {
  for (const page of PAGES_TO_CHECK) {
    test(`${page.name} (${page.path}) - title should be inside <head>`, async ({ request }) => {
      const response = await request.get(page.path);
      expect(response.ok()).toBeTruthy();
      
      const html = await response.text();
      
      // Find the position of </head> and <title>
      const headEndIndex = html.indexOf('</head>');
      const titleIndex = html.indexOf('<title>');
      const titleCloseIndex = html.indexOf('</title>');
      
      // Verify <head> exists
      expect(headEndIndex).toBeGreaterThan(-1);
      
      // Verify <title> exists
      expect(titleIndex).toBeGreaterThan(-1);
      expect(titleCloseIndex).toBeGreaterThan(-1);
      
      // Verify <title> appears BEFORE </head>
      expect(titleIndex).toBeLessThan(headEndIndex);
      expect(titleCloseIndex).toBeLessThan(headEndIndex);
      
      // Verify there's exactly one <title> element
      const titleCount = (html.match(/<title>/g) || []).length;
      expect(titleCount).toBe(1);
      
      // Verify <title> is not empty
      const titleContent = html.substring(titleIndex + 7, titleCloseIndex);
      expect(titleContent.trim().length).toBeGreaterThan(0);
    });
  }
  
  test('No <title> elements should appear after </head>', async ({ request }) => {
    for (const page of PAGES_TO_CHECK) {
      const response = await request.get(page.path);
      const html = await response.text();
      
      const headEndIndex = html.indexOf('</head>');
      const bodyContent = html.substring(headEndIndex);
      
      // There should be no <title> in the body
      const titlesInBody = (bodyContent.match(/<title>/g) || []).length;
      expect(titlesInBody).toBe(0);
    }
  });
});






