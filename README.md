# QA Practice – Playwright + Cucumber BDD (TypeScript)

This project automates the registration form at
[https://qa-practice.netlify.app/bugs-form](https://qa-practice.netlify.app/bugs-form)

It was built for a take-home QA Automation Engineer exercise using:

* Playwright (for browser automation)
* Cucumber / Gherkin (for BDD readability)
* TypeScript
* Node.js

---

## Setup

1. Install dependencies

   ```bash
   npm install
   ```

2. Run all tests

   ```bash
   npm test
   ```

3. Generate HTML report

   ```bash
   npm run report
   ```

4. Filter by tag

   ```bash
   npx cucumber-js --config cucumber.js --tags "@happy"
   npx cucumber-js --config cucumber.js --tags "@known-bug"
   ```

5. Open the generated report

   ```bash
   npm run report
   ```

---

## Project Structure

```
├── src/
│   └── pages/
│       └── qaPracticePage.ts        # Page Object Model for registration form
├── tests/
│   ├── steps/
│   │   └── qaPractice.steps.ts      # Step definitions
│   └── features/
│       └── qaPractice.feature       # Gherkin scenarios
├── reports/                         # HTML reports
├── cucumber.js                      # Cucumber config
├── tsconfig.json
├── package.json
└── README.md
```

---

## Test Coverage Summary

### Positive Flow

| Scenario                             | Description                                      | Tags      | Expected     |
| ------------------------------------ | ------------------------------------------------ | --------- | ------------ |
| Valid inputs allow registration      | Verifies successful registration with valid data | @happy    | Pass         |
| Password length rule enforced (6–20) | Checks min/max password length                   | @password | Partial Pass |

---

### Known Bugs and Validation Gaps

| #  | Issue Summary                                     | Scenario Title                                                  | Tags                            | Expected                     | Status       |
| -- | ------------------------------------------------- | --------------------------------------------------------------- | ------------------------------- | ---------------------------- | ------------ |
| 1  | Alert message shows only one error                | When multiple fields are invalid, only the first error is shown | @known-bug @message             | Show all errors              | Known Bug    |
| 2  | Password error always first                       | When multiple fields are invalid, only the first error is shown | @known-bug @message            | Independent validation       | Known Bug    |
| 3  | Next error only after password fix                | When multiple fields are invalid, only the first error is shown | @known-bug @message             | Aggregate errors             | Known Bug    |
| 4  | Email required but blank accepted                 | Email is required but form accepts blank email                  | @known-bug @requiredField       | Should block registration    | Known Bug    |
| 5  | Last Name required but blank accepted             | Last Name is required but form accepts blank                    | @known-bug @requiredField @name | Should block registration    | Known Bug    |
| 6  | Last name allows digits                           | Last name should reject invalid characters                      | @known-bug @name                | Reject numeric input         | Known Bug    |
| 7  | Last name allows special chars                    | Last name should reject invalid characters                      | @known-bug @name                | Reject symbols               | Known Bug    |
| 8  | Last name truncates last char                     | Last name should reject invalid characters                      | @known-bug @name                | Sanitize consistently        | Known Bug    |
| 9  | First name unconstrained                          | First name should be constrained                                | @known-bug @name                | Restrict to valid characters | Known Bug    |
| 10 | Email not validated                               | Email format should be validated                                | @known-bug @email               | Validate format              | Known Bug    |
| 11 | Email accepts anything                            | Email format should be validated                                | @known-bug @email               | Enforce type="email"         | Known Bug    |
| 12 | Password not masked                               | Password field should be masked                                 | @known-bug @password            | Mask input                   | Known Bug    |
| 13 | Password rule only length                         | Password length rule enforced (6–20)                            | @password                       | Add complexity checks        | Partial Pass |
| 14 | Country not required                              | Country should be required                                      | @known-bug @country             | Require selection            | Known Bug    |
| 15 | Phone checks only length                          | Phone number should validate format                             | @known-bug @phone               | Validate pattern             | Known Bug    |
| 16 | Missing country code validation                   | Phone should require country code (+63)                         | @known-bug @phone @country-code | Validate country code        | Known Bug    |
| 17 | Phone independent of Country                      | Phone should couple to Country                                  | @known-bug @phone @coupling     | Dependent validation         | Known Bug    |
| 18 | Checkbox always disabled                          | Terms checkbox should be enabled                                | @known-bug @consent             | Enable checkbox              | Known Bug    |
| 19 | Alert shows one error even with multiple invalids | Duplicate of #1                                                 | @known-bug @errors              | Aggregate or field errors    | Known Bug    |

---

## Tags Overview

| Tag             | Purpose                             |
| ----------      | ----------------------------------- |
| @happy          | Positive flow (expected pass)       |
| @known-bug      | Currently failing / defect behavior |
| @requiredField  | Required field validation           |
| @name           | Name input field validation         |
| @email          | Email validation                    |
| @password       | Password validation and masking     |
| @phone          | Phone field and format validation   |


---

## Notes

* Design goal: simple and readable automation rather than complex abstractions.
* Framework: Playwright + Cucumber BDD for human-readable scenarios.
* Known limitations: live site accepts invalid inputs; failing tests document those defects.
* Reporting: HTML report generated in `reports/report.html`.

---

## Summary

| Total Scenarios | Passing | Known Bugs | Partial | Failing |
| --------------- | ------- | ---------- | ------- | ------- |
| 20              | 2       | 16         | 2       | 0       |

Result: Positive flow passes. Multiple validation and UI logic gaps confirmed.

---

## Author

**Renzie Mari Pasinabo Calara**
QA Automation Engineer
Playwright • TypeScript • Cucumber BDD
