export interface FormData {
  name: string;
  company: string;
  email: string;
  message: string;
}

export interface ExpectedEmail {
  subject: string;
  bodyContains: string[];
}

export interface GetInTouchDataType {
  positive: {
    valid: FormData;
  };
  negative: {
    invalidEmail: FormData;
  };
  expectedEmailContent: ExpectedEmail;
}

export const GetInTouchData: GetInTouchDataType = {
  positive: {
    valid: {
      name: 'John Doe',
      company: 'Acme Corp',
      email: 'john@example.com',
      message: 'This is a test message.'
    }
  },

  negative: {
    invalidEmail: {
      name: 'John Doe',
      company: 'Acme Corp',
      email: 'testgmail.com', // invalid email
      message: 'Test message'
    }
  },

  expectedEmailContent: {
    subject: 'welcome',
    bodyContains: [
      'Dear John Doe',
      'Thank you for getting in touch with us',
      "We'll get back to you as soon as possible",
      'Best regards',
      'The SpheraX Team'
    ]
  }
};
