import { BallFall, ChainedContent, FadeIn, FloatingCards, IntroSection, Lightning, Marquee, Move, MultifadeText, Parallax, Scale, Split, Visionary } from '.';

import App from '..';
import { Binder } from '../helpers';
import { breakpoint } from '../utils';

export default class AnimationManager extends Binder {
  constructor() {
    super();
    this.app = new App();
    this.animations = [];
    this.ctx = this.app.customScroll.settings.wrapper || document;
    this.animationsLibrary = [
      {
        selector: '[data-animation="fade"]',
        Instance: FadeIn,
      },
      {
        selector: '[data-animation="lightning"]',
        Instance: Lightning,
      },
      {
        selector: '[data-animation="ball-fall"]',
        Instance: BallFall,
      },
      {
        selector: '[data-animation="floating-cards"]',
        Instance: FloatingCards,
      },
      {
        selector: '[data-animation="chained-content"]',
        Instance: ChainedContent,
      },
      {
        selector: '[data-animation="visionary"]',
        Instance: Visionary,
      },
      {
        selector: '[data-animation="intro-section"]',
        Instance: IntroSection,
      },

      {
        selector: '[data-animation="marquee"]',
        Instance: Marquee,
      },

      {
        selector: '[data-animation="multifade-text"]',
        Instance: MultifadeText,
      },

      {
        selector: '[data-animation^="move"]',
        Instance: Move,
      },
      {
        selector: '[data-animation="split"]',
        Instance: Split,
      },
      {
        selector: '[data-animation="scale"]',
        Instance: Scale,
      },

      {
        selector: '[data-animation="parallax"]',
        Instance: Parallax,
      },
    ];

    this.init();
  }

  start() {
    for (const animation of this.animations) {
      animation.setup && animation.setup();
    }
  }

  init(ctx = this.ctx) {
    const filterOutBreakpoints = this.animationsLibrary.filter((settings) => {
      const { startingFrom = 0 } = settings;

      return breakpoint(startingFrom);
    });

    for (const animationSettings of filterOutBreakpoints) {
      const { selector, Instance } = animationSettings;
      const elements = [...ctx.querySelectorAll(selector)].filter((el) => !el.closest('.swup-clone'));

      elements.forEach((element) => {
        const animation = new Instance(element, { scroller: this.ctx });

        this.animations.push(animation);
      });
    }
  }

  onMouseMove(event) {
    for (const animation of this.animations) {
      animation.onMouseMove && animation.onMouseMove(event);
    }
  }

  onResize() {
    for (const animation of this.animations) {
      animation.onResize && animation.onResize();
    }
  }

  update(time) {
    for (const animation of this.animations) {
      animation.update && animation.update(time);
    }
  }

  destroy() {
    for (const animation of this.animations) {
      animation.destroy && animation.destroy();
    }
    this.animations = [];
  }
}
