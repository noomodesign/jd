import { Binder } from '../../helpers';

export default class extends Binder {
  constructor(holder) {
    super();
    this.holder = holder;
    this.emailField = this.holder.querySelector('input[name="email"]');
    this.emailFieldErrorBlock = this.holder.querySelector('[data-error-field="email"]');
  }

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  showErrorMessage() {
    this.emailField.classList.add('is-invalid');
    this.emailFieldErrorBlock.innerHTML = 'Invalid format';
  }

  removeErrorMessage() {
    this.emailField.classList.remove('is-invalid');
    this.emailFieldErrorBlock.innerHTML = '';
  }

  get value() {
    return this.emailField.value;
  }

  get isValid() {
    return this.validateEmail(this.emailField.value);
  }
}
