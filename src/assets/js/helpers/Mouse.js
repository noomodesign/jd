import App from '..';
import EventEmitter from './EventEmmiter';

export default class Mouse extends EventEmitter {
  constructor() {
    super();
    this.app = new App();

    this.init();
  }

  init() {
    document.addEventListener('mousemove', this.onMouseMove, { passive: true });
  }

  onMouseMove(event) {
    this.trigger('mousemove', [event]);
  }

  destroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
  }
}
