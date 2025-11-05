// cucumber.js
module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'tests/support/**/*.ts',   // <-- hooks.ts & world.ts must be included here
      'tests/steps/**/*.ts'
    ],
    paths: ['tests/features/**/*.feature'],
    format: ['progress', 'json:reports/cucumber-report.json'],
    publishQuiet: true,
    parallel: 2,
    worldParameters: {
      baseURL: process.env.BASE_URL || 'https://qa-practice.netlify.app/bugs-form'
    }
  }
};
