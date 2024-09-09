import App from '..';
import { Binder } from '../helpers';

export default class ScrollTo extends Binder {
  constructor(holder, settings) {
    super();
    this.holder = holder;
    this.settings = { ...{}, ...settings };
    this.app = new App();

    this.scrollTarget = this.holder.getAttribute('data-scroll-to');

    this.init();
  }

  init() {
    this.attachEvents();
  }

  attachEvents() {
    this.holder.addEventListener('click', this.scrollTo);
  }

  scrollTo(e) {
    e.preventDefault();
    e.stopPropagation();

    this.app.customScroll.scrollTo(this.scrollTarget);
  }

  destroy() {
    this.holder.removeEventListener('click', this.scrollTo);
  }
}
