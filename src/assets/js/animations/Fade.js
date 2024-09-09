import Animation from './Animation';
import gsap from 'gsap';

export default class Fade extends Animation {
  constructor(holder, settings) {
    super(holder, settings);

    this.settings.repeat = true;

    gsap.set(this.holder, {
      opacity: this.settings.from,
    });
  }

  addTweens() {
    this.animation.fromTo(
      this.holder,
      {
        opacity: this.settings.from,
      },
      {
        opacity: this.settings.to,
        duration: this.settings.duration,
        ease: this.settings.ease,
      }
    );
  }
}
