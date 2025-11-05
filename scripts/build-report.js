// scripts/build-report.js (CommonJS)
const { readFileSync, writeFileSync, mkdirSync } = require('fs');

(async () => {
  try {
    // Ensure the reports folder exists
    mkdirSync('reports', { recursive: true });

    // Read cucumber messages produced by "npm test"
    const source = readFileSync('reports/messages.ndjson', 'utf-8');

    // Dynamically import the ESM html-formatter in a CJS project
    const { FormatterBuilder } = await import('@cucumber/html-formatter');

    const formatter = new FormatterBuilder();
    const html = await formatter.build(source);

    writeFileSync('reports/report.html', html);
    console.log('✅ HTML report written to reports/report.html');
  } catch (err) {
    console.error('❌ Failed to build HTML report:', err);
    process.exit(1);
  }
})();
