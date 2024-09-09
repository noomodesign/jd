import App from '..';
import { Binder } from '../helpers';
import LazyLoad from 'vanilla-lazyload';

export default class Lazy extends Binder {
  constructor(settings) {
    super();
    this.app = new App();

    this.settings = {
      ...{
        container: this.app.customScroll.settings.wrapper,
        elements_selector: '[data-component="lazyload"]',
        threshold: this.app.sizes.height * 2,
        unobserve_entered: true,
        callback_loaded: this.onLoaded,
      },
      ...settings,
    };

    this.instance = new LazyLoad(this.settings);
  }

  onLoaded(item) {
    item.removeAttribute('data-src');
    item.removeAttribute('data-srcset');
  }

  load(items) {
    if (!items.length) return;

    for (const item of items) {
      LazyLoad.load(item, { unobserve_entered: true, callback_loaded: this.onLoaded, use_native: true });
    }
  }

  update() {
    this.instance.update();
  }

  destroy() {
    this.instance.destroy();
  }
}
