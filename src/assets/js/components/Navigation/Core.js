import { HTML, NAV, detect } from '../../utils';

import { EventEmmiter } from '../../helpers';
import MenuAnimator from './MenuAnimator';

export default class Navigation extends EventEmmiter {
  constructor(holder, settings) {
    super();

    this.holder = holder;
    this.settings = {
      selector: '[data-header]',
      triggerEvent: 'click',
      activeClass: 'menu--opened',
      DOM: {
        opener: '[data-menu-opener]',
      },
      ...settings,
    };

    this.init();
  }

  init() {
    this.holder = document.querySelector(this.settings.selector);
    this.menuAnimator = new MenuAnimator(this.holder);
    this.opener = this.holder.querySelector(this.settings.DOM.opener);

    this.attachEvents();
  }

  show() {
    HTML.classList.add(this.settings.activeClass);
    this.trigger(NAV.active);
    this.menuAnimator.animateIn();
  }

  hide() {
    HTML.classList.remove(this.settings.activeClass);
    this.trigger(NAV.innactive);
    this.menuAnimator.animateOut();
  }

  onOutsideClick(e) {
    const { target } = e;

    if (target.classList.contains('nav-item') || target.closest('.nav-item') || target.closest('.header-nav')) return;

    this.hide();
  }

  attachEvents() {
    this.opener && this.opener.addEventListener(this.settings.triggerEvent, this.onClick);
  }

  onResize() {
    detect.isLaptop ? this.menuAnimator.destroy() : this.menuAnimator.init();
  }

  onClick(e) {
    e && e.preventDefault();

    this.isActive ? this.hide() : this.show();
  }

  destroy() {
    this.opener && this.opener.removeEventListener(this.settings.triggerEvent, this.onClick);

    this.menuAnimator.destroy();

    if (this.isActive) this.hide();
  }

  get isActive() {
    return HTML.classList.contains(this.settings.activeClass);
  }
}
