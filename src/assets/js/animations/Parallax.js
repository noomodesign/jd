import Animation from './Animation';
import { bounds } from '../utils';
import gsap from 'gsap';

export default class Parallax extends Animation {
  constructor(holder, settings) {
    super(holder, settings);
    this.settings.trigger = this.trigger;
    this.settings.repeat = true;
    this.settings.scrub = true;
    this.settings.stopAt = this.hasAttribute('data-stop-at') ? this.getAttribute('data-stop-at') : false;
    this.settings.startAt = this.hasAttribute('data-start-at') ? this.getAttribute('data-start-at') : false;
    this.settings.parallaxSpeed = +this.getAttribute('data-scroll-speed') || 1;

    gsap.set(this.holder, {
      y: this.settings.startAt || -this.Y,
    });
  }

  get trigger() {
    const scrollTarget = this.getAttribute('data-scroll-target');

    if (!scrollTarget) return this.holder.parentNode;

    if (scrollTarget === 'this') return this.holder;

    return document.querySelector(scrollTarget);
  }

  get Y() {
    return bounds(this.settings.trigger).height * this.settings.parallaxSpeed * 0.1;
  }

  addTweens() {
    this.animation.fromTo(
      this.holder,
      {
        y: this.settings.startAt || -this.Y,
      },
      {
        y: this.settings.stopAt || this.Y,
        ease: 'none',
      }
    );
  }
}
