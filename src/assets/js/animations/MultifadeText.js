import Animation from './Animation';
import SplitText from 'gsap/SplitText';
import gsap from 'gsap';

export default class MultifadeText extends Animation {
  constructor(holder, settings) {
    super(holder, settings);

    this.settings.repeat = true;
    this.settings.scrub = true;
    this.settings.start = 'top top';
    this.settings.end = 'bottom bottom';

    this.texts = [...this.holder.querySelectorAll('[data-text]')];
  }

  addTweens() {
    for (let i = 0; i < this.texts.length; i++) {
      const element = this.texts[i];

      if (i === 0) {
        const hide = gsap.to(element, {
          opacity: 0,
          y: -70,
          duration: this.settings.duration,
          ease: 'none',
        });

        this.animation.add(hide);
      } else {
        const show = gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,
            duration: this.settings.duration,
            ease: 'none',
          }
        );

        this.animation.add(show, '-=0.15');

        if (i < this.texts.length - 1) {
          const hide = gsap.fromTo(
            element,
            {
              opacity: 1,
              y: 0,
            },
            {
              opacity: 0,
              y: -70,
              duration: this.settings.duration,
              ease: 'none',
            }
          );
          this.animation.add(hide);
        }

        gsap.set(element, {
          opacity: 0,
          y: 70,
        });
      }
    }
  }
}
