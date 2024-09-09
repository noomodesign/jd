import EventEmitter from './EventEmmiter';
import { HTML } from '../utils';
import autoBind from 'auto-bind';
import debounce from 'lodash.debounce';

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    autoBind(this);

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.debouncedResizeListener = debounce(this.onResize, 25);

    this.attachEvents();
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.trigger('resize');
  }

  attachEvents() {
    window.addEventListener('resize', this.debouncedResizeListener);
    window.addEventListener('resize', this.onOrientationChange);
    window.addEventListener('orientationchange', this.onOrientationChange);
  }

  onOrientationChange() {
    HTML.classList.add('resize-active');
    const timer = setTimeout(() => {
      HTML.classList.remove('resize-active');
      clearTimeout(timer);
    }, 300);
  }

  destroy() {
    window.removeEventListener('resize', this.debouncedResizeListener);
    window.removeEventListener('orientationchange', this.onOrientationChange);
  }
}
