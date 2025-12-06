/**
 * SEO Head Validation Script
 * 
 * Checks that critical SEO elements are in <head>, not <body>.
 * 
 * Usage:
 *   npx tsx scripts/checkSeoHead.ts [base-url]
 *   
 * Examples:
 *   npx tsx scripts/checkSeoHead.ts                     # Uses http://localhost:3000
 *   npx tsx scripts/checkSeoHead.ts https://www.actarion.com
 * 
 * @see docs/seo-issues-overview.md
 */

const BASE_URL = process.argv[2] || 'http://localhost:3000';

// URLs to check (representative sample)
const URLS_TO_CHECK = [
  '/en',
  '/en/about',
  '/en/use-cases',
  '/en/blog',
  '/en/contact',
  '/en/services',
  '/en/faq',
  '/en/privacy',
  '/en/ar-training-and-onboarding',
  '/en/partner-contact',
  '/en/management',
  '/en/vision',
];

interface SeoCheckResult {
  url: string;
  passed: boolean;
  errors: string[];
  warnings: string[];
}

function getHeadAndBody(html: string): { head: string; body: string } {
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  
  return {
    head: headMatch ? headMatch[1] : '',
    body: bodyMatch ? bodyMatch[1] : '',
  };
}

function checkUrl(url: string, html: string): SeoCheckResult {
  const { head, body } = getHeadAndBody(html);
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check title
  const headTitles = (head.match(/<title[^>]*>/gi) || []).length;
  const bodyTitles = (body.match(/<title[^>]*>/gi) || []).length;
  
  if (headTitles === 0) {
    errors.push('No <title> found in <head>');
  } else if (headTitles > 1) {
    warnings.push(`Multiple <title> tags in <head> (${headTitles})`);
  }
  
  if (bodyTitles > 0) {
    errors.push(`<title> found in <body> (${bodyTitles} occurrence(s))`);
  }

  // Check canonical
  const headCanonical = head.includes('rel="canonical"') || head.includes("rel='canonical'");
  const bodyCanonical = body.includes('rel="canonical"') || body.includes("rel='canonical'");
  
  if (!headCanonical) {
    warnings.push('No canonical link in <head>');
  }
  
  if (bodyCanonical) {
    errors.push('Canonical link found in <body>');
  }

  // Check hreflang
  const headHreflang = (head.match(/hreflang=/gi) || []).length;
  const bodyHreflang = (body.match(/hreflang=/gi) || []).length;
  
  if (headHreflang === 0) {
    warnings.push('No hreflang tags in <head>');
  }
  
  if (bodyHreflang > 0) {
    errors.push(`Hreflang tags found in <body> (${bodyHreflang} occurrence(s))`);
  }

  // Check robots meta
  const headRobots = head.includes('name="robots"') || head.includes("name='robots'");
  const bodyRobots = body.includes('name="robots"') || body.includes("name='robots'");
  
  if (!headRobots) {
    warnings.push('No robots meta in <head>');
  }
  
  if (bodyRobots) {
    errors.push('Robots meta found in <body>');
  }

  // Check description
  const headDescription = head.includes('name="description"') || head.includes("name='description'");
  const bodyDescription = body.includes('name="description"') || body.includes("name='description'");
  
  if (!headDescription) {
    warnings.push('No meta description in <head>');
  }
  
  if (bodyDescription) {
    errors.push('Meta description found in <body>');
  }

  return {
    url,
    passed: errors.length === 0,
    errors,
    warnings,
  };
}

async function runSeoCheck() {
  console.log('\n🔍 SEO Head Validation');
  console.log('='.repeat(60));
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Checking ${URLS_TO_CHECK.length} URLs...\n`);

  const results: SeoCheckResult[] = [];
  let passedCount = 0;
  let failedCount = 0;

  for (const path of URLS_TO_CHECK) {
    const url = `${BASE_URL}${path}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        results.push({
          url: path,
          passed: false,
          errors: [`HTTP ${response.status}: ${response.statusText}`],
          warnings: [],
        });
        failedCount++;
        continue;
      }

      const html = await response.text();
      const result = checkUrl(path, html);
      results.push(result);
      
      if (result.passed) {
        passedCount++;
        console.log(`✅ ${path}`);
      } else {
        failedCount++;
        console.log(`❌ ${path}`);
        result.errors.forEach(err => console.log(`   ⛔ ${err}`));
      }
      
      if (result.warnings.length > 0) {
        result.warnings.forEach(warn => console.log(`   ⚠️  ${warn}`));
      }
    } catch (error) {
      results.push({
        url: path,
        passed: false,
        errors: [`Fetch error: ${error instanceof Error ? error.message : String(error)}`],
        warnings: [],
      });
      failedCount++;
      console.log(`❌ ${path}`);
      console.log(`   ⛔ Fetch error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('Summary:');
  console.log(`  ✅ Passed: ${passedCount}`);
  console.log(`  ❌ Failed: ${failedCount}`);
  console.log('='.repeat(60) + '\n');

  // Exit with error code if any failed
  if (failedCount > 0) {
    console.log('❌ SEO validation failed. Fix the errors above.');
    process.exit(1);
  } else {
    console.log('✅ All SEO checks passed!');
    process.exit(0);
  }
}

runSeoCheck().catch(console.error);

