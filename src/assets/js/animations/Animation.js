import App from '..';
import { Binder } from '../helpers';
import gsap from 'gsap';

export default class Animation extends Binder {
  constructor(holder, settings) {
    super();

    this.app = new App();
    this.sizes = this.app.sizes;
    this.customScroll = this.app.customScroll;
    this.holder = holder;

    this.settings = {
      ...{
        trigger: this.hasAttribute('data-trigger') ? this.getAttribute('data-trigger') : this.holder,
        scrub: this.scrubSetting,
        duration: +this.getAttribute('data-duration') || 1.1,
        interval: +this.getAttribute('data-stagger-interval') || 0.1,
        staggerDirection: this.getAttribute('data-stagger-direction') || 'start',
        delay: +this.getAttribute('data-delay') || 0,
        ease: this.getAttribute('data-ease') || 'power2.out',
        start: this.getAttribute('data-start') || 'top bottom',
        end: this.getAttribute('data-end') || 'bottom top',
        toggleActions: this.getAttribute('data-toggle-actions') || 'play none play none',
        from: this.getAttribute('data-from') || 0,
        to: this.getAttribute('data-to') || 1,
        id: this.getAttribute('data-markers') || undefined,
        repeat: this.hasAttribute('data-repeat'),
        markers: this.hasAttribute('data-markers'),
        customScrollTriggerSettings: {},
      },
      ...settings,
    };

    if (this.settings.start.includes('rem')) {
      this.settings.start = this.calculateRem(this.settings.start);
    }

    if (this.settings.end.includes('rem')) {
      this.settings.end = this.calculateRem(this.settings.end);
    }

    if (this.settings.start.includes('vh')) {
      this.settings.start = this.calculateVh(this.settings.start);
    }

    if (this.settings.end.includes('vh')) {
      this.settings.end = this.calculateVh(this.settings.end);
    }

    if (this.settings.end.includes('full-height')) {
      const { height } = this.holder.getBoundingClientRect();
      this.settings.end = `+=${height}px`;
    }
  }

  setup() {
    this.attachEvents();
    this.setupTimeline();
    this.addTweens();
  }

  hasAttribute(attr, node = this.holder) {
    return node.hasAttribute(attr);
  }

  getAttribute(attr, node = this.holder) {
    return node.getAttribute(attr);
  }

  setupTimeline() {
    this.animation = gsap.timeline({
      paused: true,
      delay: this.settings.delay,
      ease: this.settings.ease,
      onComplete: this.onComplete,
      scrollTrigger: {
        snap: {
          snapTo: 'labelsDirectional',
          duration: 1.3,
          delay: 0,
          ease: 'power.inOut',
        },
        scroller: this.settings.scroller || this.app.customScroll.settings.wrapper,
        markers: this.settings.markers,
        id: this.settings.id,
        trigger: this.settings.trigger,
        once: !this.settings.repeat,
        start: this.settings.start,
        end: this.settings.end,
        scrub: this.settings.scrub,
        onEnterBack: this.onEnter,
        onEnter: this.onEnter,
        onLeave: this.onLeave,
        onLeaveBack: this.onLeave,
        onUpdate: this.onUpdate,
        toggleActions: this.settings.toggleActions,
        ...this.settings.customScrollTriggerSettings,
      },
    });
  }

  calculateRem(value) {
    const remValue = parseFloat(value.match(/\d+rem/));
    const pixelValue = Math.round(remValue * parseFloat(getComputedStyle(document.documentElement).fontSize));
    const result = value.replace(remValue, pixelValue).replace('rem', 'px');

    return result || value;
  }

  calculateVh(value) {
    const remValue = parseFloat(value.match(/\d+vh/));
    const pixelValue = window.innerHeight;
    const result = value.replace(remValue, pixelValue).replace('vh', 'px');

    return result || value;
  }

  get scrubSetting() {
    const isEvenHasScrub = this.hasAttribute('data-scrub');
    const scrubValue = this.getAttribute('data-scrub');
    const isNumber = +scrubValue;

    if (!isEvenHasScrub) return false;
    if (isNumber !== 0 && !isNaN(isNumber)) return isNumber;
    return true;
  }

  addTweens() {
    return this;
  }

  onComplete() {
    this.holder.classList.add('is-complete');
  }

  onEnter() {
    this.holder.classList.add('is-started');
  }

  onLeave() {
    if (this.settings.repeat) {
      this.holder.classList.remove('is-started');
      this.holder.classList.remove('is-complete');
    }
  }

  onUpdate() {
    return this;
  }

  destroy() {
    this.animation && this.animation.kill();
    this.animation = null;
  }
}
