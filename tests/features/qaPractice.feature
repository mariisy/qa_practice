@regression
Feature: Registration form behavior and validation on QA Practice site

  Background:
    Given user navigates to registration page

  # --- Happy path ---
  @happy
  Scenario: Valid inputs allow registration (baseline passes)
    When user fills out the registration form:
      | Field         | Value             |
      | First Name    | Renzie            |
      | Last Name     | Calara            |
      | Email address | renzie@test.com   |
      | Password      | correctPassword   |
      | Phone number  | +639123456789     |
      | Country       | Philippines       |
      | Terms         | checked           |
    And user submits the registration form
    Then user should be able to register

  # --- known-bug path ---
  @known-bug @message
  Scenario: When multiple fields are invalid, only the first error is shown (password first, then phone)
    When user fills out the registration form:
      | Field         | Value |
      | Password      | 12345 |
      | Phone number  | 123   |
    And user submits the registration form
    Then the message should contain "The password should contain between [6,20] characters!"
    # Fix password data
    When user fills out the registration form:
      | Field    | Value             |
      | Password | correctPassword   |
    And user submits the registration form
    Then the message should contain "The phone number should contain at least 10 characters!"

  @known-bug @requiredField
  Scenario: Email is required but form accepts blank email
    When user fills out the registration form:
      | Field         | Value             |
      | First Name    | Renzie            |
      | Last Name     | Calara            |
      | Password      | correctPassword   |
      | Phone number  | +639123456789     |
      | Country       | Philippines       |
      | Terms         | checked           |
    And user submits the registration form
    Then user should not be able to register

  @known-bug @requiredField @name
  Scenario: Last Name is required but form accepts blank last name
    When user fills out the registration form:
      | Field         | Value             |
      | First Name    | Renzie            |
      | Email address | renzie@test.com   |
      | Password      | correctPassword   |
      | Phone number  | +639123456789     |
      | Country       | Philippines       |
      | Terms         | checked           |
    And user submits the registration form
    Then user should not be able to register

  @known-bug @name
  Scenario Outline: Last name should reject invalid characters  and avoid silent truncation
    When user fills out the registration form:
      | Field         | Value             |
      | First Name    | Renzie            |
      | Last Name     | <last>            |
      | Email address | renzie@test.com   |
      | Password      | correctPassword   |
      | Phone number  | +639123456789     |
      | Country       | Philippines       |
      | Terms         | checked           |
    And user submits the registration form
    Then user should not be able to register
    And the message should not contain "Successfully registered the following information"

    Examples:
      | last        |
      | 123asds     |   # alphanumeric
      | 123!?       |   # special characters observed to save as 123!

  @known-bug @name
  Scenario: First name should be constrained but accepts any value
    When user fills out the registration form:
      | Field         | Value             |
      | First Name    | 123!?             |
      | Last Name     | Calara            |
      | Email address | renzie@test.com   |
      | Password      | correctPassword   |
      | Phone number  | +639123456789     |
      | Country       | Philippines       |
      | Terms         | checked           |
    And user submits the registration form
    Then user should not be able to register

  @known-bug @email
  Scenario: Email format should be validated
    When user fills out the registration form:
      | Field         | Value   |
      | Email address | abc     |
    And user submits the registration form
    Then user should not be able to register

  @known-bug @password
  Scenario: Password field should be masked
    Then the password field should be masked

  @known-bug @password
  Scenario Outline: Password length rule enforced (6–20)
    When user fills out the registration form:
      | Field    | Value   |
      | Password | <value> |
    And user submits the registration form
    Then user should not be able to register
    And the message should contain "The password should contain between [6,20] characters!"

    Examples:
      | value     |
      | 12345     |   # too short
      | 123456789012345678901 |   # too long (21)

  @known-bug @country
  Scenario: Country should be required
    When user fills out the registration form:
      | Field         | Value             |
      | First Name    | Renzie            |
      | Last Name     | Calara            |
      | Email address | renzie@test.com   |
      | Password      | correctPassword   |
      | Phone number  | +639123456789     |
      | Terms         | checked           |
    And user submits the registration form
    Then user should not be able to register

  @known-bug @phone
  Scenario: Phone number should validate format, not just length
    When user fills out the registration form:
      | Field        | Value        |
      | Phone number | 0000000000   |  # invalid but 10 digits
    And user submits the registration form
    Then user should not be able to register

  @known-bug @phone
  Scenario: Phone should require country code (+63) for PH numbers
    When user fills out the registration form:
      | Field         | Value             |
      | Country       | Philippines       |
      | Phone number  | 09123456789       |  # missing +63
    And user submits the registration form
    Then user should not be able to register


  @known-bug @phone 
  Scenario: Phone should refer validation to selected country
    When user fills out the registration form:
      | Field         | Value             |
      | Country       | Philippines       |
      | Phone number  | +11234567890      |  # US code while country=PH
    And user submits the registration form
    Then user should not be able to register
    

  @known-bug
  Scenario: Terms and Conditions checkbox should be enabled and required
    Then the terms checkbox should be enabled
