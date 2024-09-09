import { HTML, MathUtils } from '../utils';

import App from '..';
import { Binder } from '../helpers';

export default class Cursor extends Binder {
  constructor() {
    super();
    this.app = new App();
    this.cursorElement = document.querySelector('.cursor');
    this.speed = 0.4;
    this.animate = false;
    this.target = { x: -0.5, y: -0.5 };
    this.cursor = { x: -0.5, y: -0.5 };

    this.init();
  }

  init() {
    this.elements = [...document.querySelectorAll('[data-cursor]'), ...document.querySelectorAll('a')];

    this.attachEvents();
  }

  attachEvents() {
    for (const target of this.elements) {
      target.addEventListener('mouseenter', this.onMouseEnter);
      target.addEventListener('mouseleave', this.onMouseLeave);
    }
  }

  onMouseEnter() {
    HTML.classList.add('cursor-active');
  }

  onMouseLeave() {
    HTML.classList.remove('cursor-active');
  }

  onMouseMove(e) {
    this.animate = true;
    HTML.classList.add('cursor-shown');
    this.target.x = e.clientX / this.app.sizes.width;
    this.target.y = e.clientY / this.app.sizes.height;
  }

  update() {
    if (!this.animate) return;

    this.cursor.x = MathUtils.lerp(this.cursor.x, this.target.x, this.speed);
    this.cursor.y = MathUtils.lerp(this.cursor.y, this.target.y, this.speed);

    document.documentElement.style.setProperty('--cursor-x', this.cursor.x.toFixed(3));
    document.documentElement.style.setProperty('--cursor-y', this.cursor.y.toFixed(3));

    const delta = Math.sqrt(Math.pow(this.target.x - this.cursor.x, 2) + Math.pow(this.target.y - this.cursor.y, 2));

    if (delta < 0.001) {
      this.animate = false;
    }
  }

  destroy() {
    this.onMouseLeave();
    for (const target of this.elements) {
      target.removeEventListener('mouseenter', this.onMouseEnter);
      target.removeEventListener('mouseleave', this.onMouseLeave);
    }
  }
}
