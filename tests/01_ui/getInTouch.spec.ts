import { test, expect } from '@playwright/test';
import { GetInTouchPage } from '../../pages/GetInTouchPage';
import { GetInTouchData } from '../../data/testData';

test.describe('Get In Touch Form UI', () => {
  
  let getInTouchPage: GetInTouchPage;

  test.beforeEach(async ({ page, baseURL }) => {
    // Create Page Object for each test
    getInTouchPage = new GetInTouchPage(page);

    // Navigate before every test
    await page.goto(baseURL!);

    // Accept cookies
    await getInTouchPage.acceptCookies();
  });

  test('Negative: Send button is disabled when fields are empty', async () => {
    await expect(getInTouchPage.sendButton).toBeDisabled();
  });
  
  test('Negative: Send button is disabled for invalid email', async () => {
    await getInTouchPage.fillForm(
      GetInTouchData.negative.invalidEmail.name,
      GetInTouchData.negative.invalidEmail.company,
      GetInTouchData.negative.invalidEmail.email,
      GetInTouchData.negative.invalidEmail.message
    );
    
    await expect(getInTouchPage.sendButton).toBeDisabled();
  });

  test('Positive: Submit form and see success message', async () => {
    const FIXED_EMAIL: string = process.env.FIXED_MAILSLURP_EMAIL!;

    await getInTouchPage.fillForm(
      GetInTouchData.positive.valid.name,
      GetInTouchData.positive.valid.company,
      FIXED_EMAIL,
      GetInTouchData.positive.valid.message
    );

    await getInTouchPage.enableSendButton();
    await getInTouchPage.submit();
    await getInTouchPage.expectSuccess();
    await getInTouchPage.closeSuccessModal();
  });
});