// scripts/report-html.js (CommonJS)
const { generate } = require('cucumber-html-reporter');
const fs = require('fs');

if (!fs.existsSync('reports/cucumber-report.json')) {
  console.error('❌ reports/cucumber-report.json not found. Run "npm test" first.');
  process.exit(1);
}

generate({
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: false, // we’ll open it via shell after generating
  metadata: {
    Platform: process.platform,
    Browser: 'Playwright (Chromium/Firefox/WebKit)',
    Parallel: 'Yes',
    Executed: 'Local'
  }
});

console.log('✅ HTML report written to reports/cucumber-report.html'); 