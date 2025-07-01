/**
 * @jest-environment jsdom
 */

describe('Contact Form Validation', () => {
  let form;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="contact" method="POST" action="https://formsubmit.co/matheus.costa.vieira@gmail.com">
        <input type="hidden" name="_next" value="http://matheus-vieira.github.io/contact/thanks" />
        <input type="hidden" name="_language" value="en-US" />
        <label for="email">Your E-mail:</label>
        <input type="email" name="email" id="email" placeholder="Your email" required />
        <label for="_subject">Subject:</label>
        <input type="text" name="_subject" id="_subject" placeholder="Type a subject!" required />
        <label for="message">Message:</label>
        <textarea name="message" id="message" placeholder="Your message" required></textarea>
        <button type="submit" class="btn btn-ghost">Send</button>
      </form>
    `;
    form = document.getElementById('contact');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should have correct form attributes', () => {
    expect(form.method.toLowerCase()).toBe('post');
    expect(form.action).toBe('https://formsubmit.co/matheus.costa.vieira@gmail.com');
  });

  test('should have all required form fields', () => {
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('_subject');
    const messageField = document.getElementById('message');

    expect(emailField).toBeTruthy();
    expect(subjectField).toBeTruthy();
    expect(messageField).toBeTruthy();

    expect(emailField.type).toBe('email');
    expect(emailField.required).toBe(true);
    expect(subjectField.required).toBe(true);
    expect(messageField.required).toBe(true);
  });

  test('should have correct hidden fields', () => {
    const nextField = document.querySelector('input[name="_next"]');
    const languageField = document.querySelector('input[name="_language"]');

    expect(nextField.value).toBe('http://matheus-vieira.github.io/contact/thanks');
    expect(languageField.value).toBe('en-US');
  });

  test('should have proper field labels', () => {
    const emailLabel = document.querySelector('label[for="email"]');
    const subjectLabel = document.querySelector('label[for="_subject"]');
    const messageLabel = document.querySelector('label[for="message"]');

    expect(emailLabel.textContent).toBe('Your E-mail:');
    expect(subjectLabel.textContent).toBe('Subject:');
    expect(messageLabel.textContent).toBe('Message:');
  });

  test('should have submit button', () => {
    const submitButton = form.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
    expect(submitButton.textContent).toBe('Send');
    expect(submitButton.className).toBe('btn btn-ghost');
  });

  test('should validate email format', () => {
    const emailField = document.getElementById('email');
    
    // Valid email
    emailField.value = 'test@example.com';
    expect(emailField.checkValidity()).toBe(true);

    // Invalid email
    emailField.value = 'invalid-email';
    expect(emailField.checkValidity()).toBe(false);
  });

  test('should require all fields to be filled', () => {
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('_subject');
    const messageField = document.getElementById('message');

    // Empty fields should be invalid
    expect(emailField.checkValidity()).toBe(false);
    expect(subjectField.checkValidity()).toBe(false);
    expect(messageField.checkValidity()).toBe(false);

    // Filled fields should be valid
    emailField.value = 'test@example.com';
    subjectField.value = 'Test Subject';
    messageField.value = 'Test message';

    expect(emailField.checkValidity()).toBe(true);
    expect(subjectField.checkValidity()).toBe(true);
    expect(messageField.checkValidity()).toBe(true);
  });
});
