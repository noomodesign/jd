import Animation from './Animation';
import gsap from 'gsap';

export default class Lighthing extends Animation {
  constructor(holder, settings) {
    super(holder, settings);

    this.settings.repeat = true;
    this.settings.scrub = 1.5;

    gsap.set(this.holder, {
      '--power': this.settings.from,
    });
  }

  addTweens() {
    this.animation.fromTo(
      this.holder,
      {
        '--power': this.settings.from,
      },
      {
        '--power': this.settings.to,
        duration: this.settings.duration,
        ease: this.settings.ease,
      }
    );
  }
}
