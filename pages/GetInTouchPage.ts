import { Page, Locator, expect } from '@playwright/test';

export class GetInTouchPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly companyInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly successContainer: Locator;
  readonly okButton: Locator;
  readonly modalContainer: Locator;
  readonly acceptCookiesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByRole('textbox', { name: 'Enter your name' });
    this.companyInput = page.getByRole('textbox', { name: 'Enter your company name' });
    this.emailInput = page.getByRole('textbox', { name: 'Enter your email' });
    this.messageInput = page.getByRole('textbox', { name: 'Share your ideas' });
    this.sendButton = page.getByRole('button', { name: 'Send' });
    this.successContainer = page.locator('[data-testid="getInTouchForm"]');
    this.okButton = page.getByRole('button', { name: 'Ok' });
    this.modalContainer = page.locator('[data-testid="getInTouchForm"]'); // modal container
    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept cookies' });
  }

  // Accept cookies popup
  async acceptCookies() {
    await this.acceptCookiesButton.click();
  }

  // Fill the contact form
  async fillForm(name: string, company: string, email: string, message: string) {
    await this.nameInput.fill(name);
    await this.companyInput.fill(company);
    await this.emailInput.fill(email);
    await this.messageInput.fill(message);
  }

  // Enable the Send button (bypass frontend lock / reCAPTCHA)
  async enableSendButton() {
    await this.page.evaluate(() => {
      const btn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (btn) {
        btn.removeAttribute('disabled');
        btn.classList.remove('Mui-disabled');
      }
    });
  }

  // Submit the form
  async submit() {
    await this.sendButton.click();
  }

  // Verify success messages
  async expectSuccess() {
    await expect(this.successContainer.getByRole('heading', { name: 'Success' })).toBeVisible();
    await expect(
      this.successContainer.getByText(
        /You have successfully sent a request for early access! Let's create the future of business processes together./i
      )
    ).toBeVisible();
  }

  // Close success modal
  async closeSuccessModal() {
    await this.okButton.dblclick();
    await expect(this.successContainer.getByRole('heading', { name: 'Success' })).toHaveCount(0);   // modal should no longer be visible
  }
}