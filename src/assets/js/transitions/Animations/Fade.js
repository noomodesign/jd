import { FadeIn, Move, Scale, Split } from '../../animations';

import Base from './Base';
import gsap from 'gsap';

export default class TransitionFade extends Base {
  constructor() {
    super();
    this.settings = {
      DOM: {
        overlay: '[data-page-overlay]',
      },
    };

    this.animationsToReverse = [FadeIn, Split];

    this.overlay = document.querySelector(this.settings.DOM.overlay);
  }

  out(next, data) {
    const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg').trim();
    const { el: element } = data.visit.trigger;

    let backgroundColor = defaultColor;

    const animation = {
      opacity: 1,
      duration: 0.7,
      ease: 'power2.in',
      onComplete: next,
    };

    if (element && element.classList.contains('typeface-block__holder')) {
      const parentStyles = getComputedStyle(element.parentNode);
      const color = parentStyles.getPropertyValue('--hover-bg').trim();

      if (color) {
        backgroundColor = color;
      }
    }

    const animationsToPlay = this.app.animationManager.animations.filter((a) => {
      return this.animationsToReverse.some((instance) => a instanceof instance);
    });

    for (const animation of animationsToPlay) {
      animation.animation.reverse().duration(0.8);
    }

    gsap.set(this.overlay, { backgroundColor });

    return gsap.to(this.overlay, animation);
  }

  in(next) {
    next();
    return gsap.to(this.overlay, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      clearProps: 'backgroundColor',
    });
  }
}
