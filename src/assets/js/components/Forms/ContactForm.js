import { Binder } from '../../helpers';
import EmailField from './EmailField';
import gsap from 'gsap';

export default class ContactForm extends Binder {
  constructor(holder) {
    super();
    this.holder = holder;

    this.attachEvents();
  }

  attachEvents() {
    this.holder.addEventListener('submit', this.onFormSubmit);
  }

  onFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const isValidEmailAddress = this.emailFieldController.isValid;

    if (!isValidEmailAddress) return;

    this.showSuccessModal(this.sendForm);
  }

  sendForm() {
    console.log(JSON.stringify(this.requestData));

    console.log('FORM SENT SUCCESSFULLY');
  }

  destroy() {
    this.holder.removeEventListener('submit', this.onFormSubmit);
  }

  get requestData() {
    return {
      email: this.emailFieldController.value,
    };
  }
}
