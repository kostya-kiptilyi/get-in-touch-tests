import { test, expect } from '@playwright/test';
import MailSlurp, { EmailPreview, Email } from 'mailslurp-client';
import { GetInTouchData } from '../../data/testData';

test.describe('Get In Touch Email API', () => {
  let mailslurp: MailSlurp;

  // Environment variable types
  const FIXED_INBOX_ID: string = process.env.FIXED_MAILSLURP_INBOX_ID!;
  const FIXED_INBOX_EMAIL: string = process.env.FIXED_MAILSLURP_EMAIL!;
  const MAILSLURP_API_KEY: string = process.env.MAILSLURP_API_KEY!;

  test.beforeAll(async () => {
    mailslurp = new MailSlurp({ apiKey: MAILSLURP_API_KEY });

    console.log('Using fixed inbox for email verification:', FIXED_INBOX_EMAIL);

    // Delete all old emails to avoid receiving stale messages
    const emails: EmailPreview[] = await mailslurp.getEmails(FIXED_INBOX_ID);

    for (const email of emails) {
      await mailslurp.deleteEmail(email.id);
    }
  });

  test('Positive: Verify email is received after form submission', async () => {
    const expectedEmailContent = GetInTouchData.expectedEmailContent;

    // Wait up to 2 minutes for the latest email
    const email: Email = await mailslurp.waitForLatestEmail(FIXED_INBOX_ID, 120_000);

    expect(email).not.toBeNull();

    console.log('Email subject:', email.subject);

    // Validate email subject
    expect(email.subject?.toLowerCase()).toContain(expectedEmailContent.subject);

    // Validate email body content
    for (const text of expectedEmailContent.bodyContains) {
      expect(email.body).toContain(text);
    }
  });
});