import { HTML, SCROLL, detect } from '../utils';

import App from '..';
import { EventEmmiter } from '../helpers';
import Lenis from 'lenis';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';

// const shouldBeSmooth = detect.isLaptop ? !detect.isSafari : !detect.isTouch;
const shouldBeSmooth = true;

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.pinType = 'transform';
ScrollTrigger.config({ ignoreMobileResize: true });
ScrollTrigger.normalizeScroll(shouldBeSmooth);

export default class CustomScrollLenis extends EventEmmiter {
  constructor(settings) {
    super();
    this.app = new App();
    this.settings = {
      ...{
        wrapper: document.querySelector('[data-scroll-wrapper]'),
        content: document.querySelector('[data-scroller]'),
        duration: 1.1,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothTouch: false,
        smoothWheel: shouldBeSmooth,
        normalizeWheel: shouldBeSmooth,
        scrollTreshold: 70,
        wheelMultiplier: 0.9,
      },
      ...settings,
    };
  }

  get infinite() {
    return document.querySelector('[data-transitions-container]').hasAttribute('data-infinite');
  }

  init() {
    this.scroll = new Lenis(this.settings);
    window.lenis = this;
    this.checkPageTop();
    this.scroll.on('scroll', this.onScroll);
  }

  resetPosition() {
    window.scrollTo(0, 0);
    this.scrollTo(0, { immediate: true, duration: 0 });
  }

  checkPageTop() {
    this.pageTop = this.scroll.targetScroll < this.settings.scrollTreshold;

    HTML.setAttribute('data-top', this.pageTop);
  }

  onScroll(data) {
    this.trigger(SCROLL.update, [data]);
    this.checkPageTop();
    ScrollTrigger.update();
  }

  scrollTo(target, data) {
    this.scroll?.scrollTo(target, {
      duration: 5,
      ...data,
    });
  }

  stop() {
    this.scroll.stop();
  }

  start() {
    this.scroll.start();
  }

  update(time) {
    if (this.scroll?.isStopped) return;
    this.scroll?.raf(time);
    // this.updateVelocity();
  }

  updateVelocity() {
    const velocity = gsap.utils.normalize(0, 60, Math.abs(this.scroll.velocity));
    const clamped = gsap.utils.clamp(0, 0.5, velocity);
    document.documentElement.style.setProperty('--velocity', clamped.toFixed(3));
  }

  refresh() {
    this.scroll?.resize();
    ScrollTrigger.refresh();
  }

  onResize() {
    ScrollTrigger.refresh();
  }

  destroy() {
    this.scroll.destroy();
    this.scroll.off('scroll');
  }
}
