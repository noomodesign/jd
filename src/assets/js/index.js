import { Binder, Mouse, Sizes, Time } from './helpers';
import { ComponentManager, Cursor } from './components';
import { CustomScrollLenis, Lazy } from './plugins';
import { HTML, detect } from './utils';

import { AnimationManager } from './animations';
import { Gradient } from 'whatamesh';
import IELayout from './ie';
import { Navigation } from './components/Navigation';
import { PageTransitions } from './transitions';

export default class App extends Binder {
  constructor() {
    super();

    if (App.instance) {
      return App.instance;
    }

    if (detect.isIE) {
      IELayout();

      return;
    }

    if (detect.isTouch) {
      HTML.classList.add('touchevents');
    } else {
      HTML.classList.add('no-touchevents');
    }

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    App.instance = this;
    this.mouse = new Mouse();
    this.sizes = new Sizes();
    this.time = new Time();

    this.init();
  }

  async init() {
    await document.fonts.ready;

    this.customScroll = new CustomScrollLenis();
    this.pageTransitions = new PageTransitions();
    this.lazyload = new Lazy();
    this.navigation = new Navigation();
    this.cursor = new Cursor();
    this.animationManager = new AnimationManager();
    this.componentManager = new ComponentManager();
    this.gradient = new Gradient();
    this.gradient.initGradient('[data-background]');
    this.attachEvents();

    this.customScroll.init();
    this.animationManager.start();
    this.onLoaded();
  }

  attachEvents() {
    this.time.on('tick', this.update);
    this.sizes.on('resize', this.onResize);
    this.mouse.on('mousemove', this.onMouseMove);

    if (this.pageTransitions) {
      this.pageTransitions.instance.hooks.on('visit:start', this.onTransitionStart);
      this.pageTransitions.instance.hooks.before('content:replace', this.destroyCurrentPage);
      this.pageTransitions.instance.hooks.on('content:replace', this.initNewPage);
      this.pageTransitions.instance.hooks.on('visit:end', this.onTransitionEnd);
    }
  }

  onMouseMove(event) {
    this.animationManager.onMouseMove(event);
    this.cursor.onMouseMove(event);
  }

  onResize() {
    this.customScroll.onResize();
    this.componentManager.onResize();
    this.animationManager.onResize();
    this.navigation.onResize();
  }

  onTransitionStart() {
    if (this.navigation.isActive) {
      this.navigation.hide();
    }
  }

  destroyCurrentPage() {
    this.componentManager.destroy();
    this.animationManager.destroy();
    this.customScroll.resetPosition();
    this.customScroll.stop();
    this.customScroll.destroy();
    this.cursor.destroy();
  }

  async initNewPage() {
    await document.fonts.ready;
    this.cursor.init();
    this.componentManager.init();
    this.animationManager.init();
    this.lazyload.update();
    this.animationManager.start();
    this.customScroll.refresh();
    this.pageTransitions.linkManager.setActiveLinks();
  }

  onTransitionEnd() {
    this.customScroll.init();
    this.customScroll.start();
    setTimeout(() => {
      window.ga && this.updateGA();
    }, 1000);
  }

  update(time) {
    this.cursor.update(time);
    this.customScroll.update(time);
    this.animationManager.update(time);
    this.componentManager.update(time);
  }

  updateGA() {
    if (!window.ga) return;
    window.ga('set', 'page', window.location.pathname);
    window.ga('send', 'pageview');
  }

  onLoaded() {
    HTML.classList.add('is-loaded');
    HTML.classList.remove('is-loading');

    this.updateGA();
  }

  destroy() {
    this.cursor && this.cursor.destroy();
    this.sizes && this.sizes.destroy();
    this.mouse && this.mouse.destroy();
    this.lazyload && this.lazyload.destroy();
    this.preloader && this.preloader.destroy();
    this.customScroll && this.customScroll.destroy();
    this.navigation && this.navigation.destroy();
    this.animationManager && this.animationManager.destroy();
    this.componentManager && this.componentManager.destroy();
    this.pageTransitions && this.pageTransitions.destroy();
  }
}

new App();
