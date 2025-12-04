/**
 * Locale Coverage Verification Script
 * 
 * Verifies that all key routes are accessible in EN, NL, and DE locales.
 * Also checks that the HTML lang attribute matches the expected locale.
 * 
 * Usage: npm run check:locales
 * Prerequisites: Run npm run dev in another terminal first
 */

const baseEnRoutes = [
  "/en",                     // Home
  "/en/about",               // About page
  "/en/contact",             // Contact page
  "/en/demo",                // Demo page
  "/en/partner-contact",     // Partner contact
  "/en/career",              // Career page
  "/en/faq",                 // FAQ page
  "/en/privacy",             // Privacy policy
  "/en/terms",               // Terms of service
  "/en/use-cases",           // Use cases overview
  "/en/events",              // Events page
  "/en/whitepapers",         // Whitepapers page
  "/en/videos",              // Videos page
  "/en/news",                // News page
  "/en/blog",                // Blog listing
  "/en/vision",              // Vision page
  "/en/management",          // Management page
  "/en/services",            // Services page
  // Use case detail pages
  "/en/ar-preventive-maintenance",
  "/en/ar-training-and-onboarding",
  "/en/ar-guided-assembly-production",
  "/en/ar-remote-expert-support-corrective-maintenance",
  "/en/ar-guided-changeover-batch-preparation",
  "/en/ar-work-instructions-corporate-memory",
];

const locales = ["nl", "de"];
const allLocales = ["en", "nl", "de"];

interface CheckResult {
  url: string;
  status: number | "error";
  htmlLang?: string;
  expectedLang: string;
  langMatch: boolean;
  hasCanonical: boolean;
  hasHreflang: boolean;
  error?: string;
}

function toLocaleRoute(enRoute: string, locale: string): string {
  if (!enRoute.startsWith("/en")) return enRoute;
  return enRoute.replace(/^\/en/, `/${locale}`);
}

async function checkRoute(url: string, expectedLocale: string): Promise<CheckResult> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    const res = await fetch(url, {
      headers: {
        'Accept': 'text/html',
        'User-Agent': 'ActARion-QA-Bot/1.0',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    const result: CheckResult = {
      url,
      status: res.status,
      expectedLang: expectedLocale,
      langMatch: false,
      hasCanonical: false,
      hasHreflang: false,
    };

    if (res.ok) {
      const html = await res.text();
      
      // Check HTML lang attribute
      const langMatch = html.match(/<html[^>]*lang="([^"]+)"/i);
      result.htmlLang = langMatch?.[1];
      result.langMatch = result.htmlLang === expectedLocale;
      
      // Check for canonical tag
      result.hasCanonical = /<link[^>]*rel="canonical"[^>]*>/i.test(html);
      
      // Check for hreflang tags
      result.hasHreflang = /<link[^>]*hreflang="[^"]+"/i.test(html);
    }
    
    return result;
  } catch (e) {
    return {
      url,
      status: "error",
      expectedLang: expectedLocale,
      langMatch: false,
      hasCanonical: false,
      hasHreflang: false,
      error: (e as Error).message,
    };
  }
}

async function main() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  
  console.log("╔══════════════════════════════════════════════════════════════╗");
  console.log("║        ActARion Locale Coverage Verification Script          ║");
  console.log("╚══════════════════════════════════════════════════════════════╝");
  console.log(`\nBase URL: ${baseUrl}\n`);

  const results: CheckResult[] = [];
  const missing: string[] = [];
  const langErrors: string[] = [];
  const seoIssues: string[] = [];

  // Check all EN routes first
  console.log("Checking EN routes...");
  for (const enRoute of baseEnRoutes) {
    const url = `${baseUrl}${enRoute}`;
    const result = await checkRoute(url, "en");
    results.push(result);
    
    if (result.status !== 200) {
      missing.push(`${enRoute} (${result.status})`);
    } else if (!result.langMatch) {
      langErrors.push(`${enRoute} has lang="${result.htmlLang}", expected "en"`);
    }
    
    if (result.status === 200) {
      if (!result.hasCanonical) {
        seoIssues.push(`${enRoute} missing canonical tag`);
      }
      if (!result.hasHreflang) {
        seoIssues.push(`${enRoute} missing hreflang tags`);
      }
    }
  }

  // Check NL and DE versions
  for (const locale of locales) {
    console.log(`Checking ${locale.toUpperCase()} routes...`);
    for (const enRoute of baseEnRoutes) {
      const localized = toLocaleRoute(enRoute, locale);
      const url = `${baseUrl}${localized}`;
      const result = await checkRoute(url, locale);
      results.push(result);
      
      if (result.status !== 200) {
        missing.push(`${localized} (${result.status})`);
      } else if (!result.langMatch) {
        langErrors.push(`${localized} has lang="${result.htmlLang}", expected "${locale}"`);
      }
      
      if (result.status === 200) {
        if (!result.hasCanonical) {
          seoIssues.push(`${localized} missing canonical tag`);
        }
        if (!result.hasHreflang) {
          seoIssues.push(`${localized} missing hreflang tags`);
        }
      }
    }
  }

  // Summary
  console.log("\n════════════════════════════════════════════════════════════════");
  console.log("                           RESULTS");
  console.log("════════════════════════════════════════════════════════════════");

  const totalChecked = results.length;
  const successCount = results.filter(r => r.status === 200).length;
  const errorCount = results.filter(r => r.status !== 200).length;

  console.log(`\nTotal routes checked: ${totalChecked}`);
  console.log(`  ✓ Success (200): ${successCount}`);
  console.log(`  ✗ Failed: ${errorCount}`);

  if (missing.length > 0) {
    console.log("\n──────────────────────────────────────────────────────────────");
    console.log("MISSING OR NON-200 ROUTES:");
    console.log("──────────────────────────────────────────────────────────────");
    missing.forEach(m => console.log(`  ✗ ${m}`));
  } else {
    console.log("\n✓ All routes return 200 OK");
  }

  if (langErrors.length > 0) {
    console.log("\n──────────────────────────────────────────────────────────────");
    console.log("HTML LANG ATTRIBUTE ISSUES:");
    console.log("──────────────────────────────────────────────────────────────");
    langErrors.forEach(e => console.log(`  ⚠ ${e}`));
  } else {
    console.log("✓ All HTML lang attributes are correct");
  }

  if (seoIssues.length > 0) {
    console.log("\n──────────────────────────────────────────────────────────────");
    console.log("SEO ISSUES:");
    console.log("──────────────────────────────────────────────────────────────");
    // Group and show unique issues (to avoid repetition)
    const uniqueIssues = [...new Set(seoIssues)];
    const canonicalMissing = uniqueIssues.filter(i => i.includes("canonical"));
    const hreflangMissing = uniqueIssues.filter(i => i.includes("hreflang"));
    
    if (canonicalMissing.length > 0) {
      console.log(`  ⚠ ${canonicalMissing.length} pages missing canonical tags`);
    }
    if (hreflangMissing.length > 0) {
      console.log(`  ⚠ ${hreflangMissing.length} pages missing hreflang tags`);
    }
  } else {
    console.log("✓ All pages have canonical and hreflang tags");
  }

  console.log("\n════════════════════════════════════════════════════════════════");
  
  // Exit with error code if there are issues
  if (missing.length > 0 || langErrors.length > 0) {
    console.log("\n❌ QA Check FAILED - Fix issues above\n");
    process.exit(1);
  } else {
    console.log("\n✅ QA Check PASSED\n");
    process.exit(0);
  }
}

main().catch(console.error);

