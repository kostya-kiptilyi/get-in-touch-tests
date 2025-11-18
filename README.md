# Get In Touch Tests

Automated UI tests for the "Get In Touch" form using Playwright.

## Installing Dependencies

npm install

## Setting Environment Variables

Create a `.env` file in the project root with the following:

BASE_URL=https://your-site.com  
FIXED_MAILSLURP_EMAIL=your-email@example.com  
MAILSLURP_API_KEY=your-mailslurp-api-key  

## Running Tests Locally

Run all tests:

npx playwright test

Run tests with an HTML report:

npx playwright test --reporter=html

## Test Description

**Area:** “Get In Touch” form

**Main automated scenarios:**

- **Negative:**
  - Verify the send button is disabled when fields are empty
  - Verify error is shown for invalid email
- **Positive:**
  - Submit the form with valid data and check for success message
  - Verify email is received via MailSlurp

**Future improvements (if more time is available):**

- Add validations for all form fields (length, special characters)  
- Automate reCaptcha validation  
- Run tests across different browsers and mobile devices  
- Integrate with CI/CD pipelines