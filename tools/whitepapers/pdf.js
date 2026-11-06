// Print each whitepaper HTML to an A4 PDF with Chromium, with a running footer (title + page number).
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const [html, pdf, title] of jobs) {
    await page.goto('file://' + html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const opts = {
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: `<div style="width:100%;font-family:Arial,sans-serif;font-size:7.5px;color:#4A5D6E;padding:0 20mm;display:flex;justify-content:space-between">
        <span>ActARion · ${esc(title)}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
      tagged: true,
      outline: true,
    };
    // Body with running footer; cover (first) and back page (last) without.
    await page.pdf({ ...opts, path: pdf + '.body' });
    await page.pdf({ ...opts, path: pdf + '.plain', displayHeaderFooter: false });
    console.log('printed', pdf);
  }
  await browser.close();
})();
