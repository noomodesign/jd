import Animation from './Animation';
import gsap from 'gsap';

export default class Move extends Animation {
  constructor(holder, settings) {
    super(holder, settings);
    this.requiredAnimationType = this.getAttribute('data-animation') || 'moveUp';
    this.shouldNotFade = this.hasAttribute('data-no-fade');
    this.settings.from = this.getAttribute('data-from') || 40;
    this.settings.to = this.getAttribute('data-to') || 0;

    this.settings.variants = {
      moveLeft: { axis: 'x' },
      moveRight: { axis: 'x' },
      moveUp: { axis: 'y' },
      moveDown: { axis: 'y' },
    };

    gsap.set(this.holder, {
      [this.animationValues.axis]: this.settings.from,
      opacity: this.shouldNotFade ? 1 : 0,
    });
  }

  get animationValues() {
    return this.settings.variants[this.requiredAnimationType];
  }

  addTweens() {
    this.animation.fromTo(
      this.holder,
      {
        [this.animationValues.axis]: this.settings.from,
        opacity: this.shouldNotFade ? 1 : 0,
      },
      {
        [this.animationValues.axis]: this.settings.to,
        opacity: this.shouldNotFade ? 1 : 1,
        duration: this.settings.duration,
        ease: this.settings.ease,
        delay: this.settings.delay,
      }
    );
  }
}
