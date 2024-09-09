import { SCROLL, bounds } from '../utils';

import Animation from './Animation';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import SplitText from 'gsap/SplitText';
import gsap from 'gsap';

gsap.registerPlugin(MotionPathPlugin);

export default class FloatingCards extends Animation {
  constructor(holder, settings) {
    super(holder, settings);

    this.settings.repeat = true;
    this.settings.scrub = true;
    this.settings.start = 'top top';
    this.settings.end = 'bottom bottom';
    this.pathToFollow = this.holder.querySelector('[data-path-to-follow]');
    this.cards = [...this.holder.querySelectorAll('[data-floating-card]')].map((card) => {
      const title = card.querySelector('[data-title]');
      const image = card.querySelector('[data-image]');
      const text = card.querySelector('[data-text]');
      const button = card.querySelector('[data-button]');
      const titleSplitter = new SplitText(title, { type: 'lines' });
      const textSplitter = new SplitText(text, { type: 'lines' });

      return { card, title, image, text, button, titleSplitter, textSplitter };
    });
  }

  addTweens() {
    this.createSvgAnimation();
  }

  createSvgAnimation() {
    const moveImagesTimeline = gsap.timeline({
      scrollTrigger: {
        scroller: this.settings.scroller || this.app.customScroll.settings.wrapper,
        trigger: this.holder,
        once: false,
        start: () => `top bottom+=${this.app.sizes.height / 2}`,
        end: () => `bottom bottom+=${this.app.sizes.height}`,
        invalidateOnRefresh: true,
        scrub: 2,
        snap: 1 / this.cards.length,
      },
    });

    for (let i = 0; i < this.cards.length; i++) {
      const { image, titleSplitter, textSplitter, button } = this.cards[i];

      const upScaleImage = gsap.fromTo(
        image,
        {
          scale: 0,
          '--progress': 0,
        },
        {
          scale: 1,
          '--progress': 1,
          motionPath: {
            path: this.pathToFollow,
            align: this.pathToFollow,
            autoRotate: true,
            alignOrigin: [0.5, 0.8],
            start: 0,
            end: 0.4,
          },
          duration: 6,
          ease: 'none',
        }
      );

      const contentTimeline = gsap.timeline();

      const showTitle = gsap.fromTo(
        titleSplitter.lines,
        {
          y: 30,
          opacity: 0,
          filter: 'blur(5px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.15,
          duration: 2,
          ease: 'power2.out',
        }
      );

      const showText = gsap.fromTo(
        textSplitter.lines,
        {
          y: 30,
          opacity: 0,
          filter: 'blur(5px)',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.1,
          duration: 2,
          ease: 'power2.out',
        }
      );

      const showButton = gsap.fromTo(
        button,
        {
          y: 30,
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 2,
          y: 0,
          delay: 0.2,
          ease: 'power2.out',
        }
      );

      const cardTimeline = gsap.timeline();

      contentTimeline.add(showTitle, '<').add(showText, '<').add(showButton, '<');

      cardTimeline.add(upScaleImage, '<').add(contentTimeline, '-=2.1');

      if (i < this.cards.length - 1) {
        const hideContent = gsap.to([titleSplitter.lines, textSplitter.lines, button], {
          opacity: 0,
          filter: 'blur(10px)',
          duration: 2,
          ease: 'power2.inOut',
          stagger: 0.2,
          pointerEvents: 'none',
        });

        const downScaleImage = gsap.fromTo(
          image,
          {
            scale: 1,
            '--progress': 1,
          },
          {
            '--progress': 0,
            scale: 0,
            motionPath: {
              path: this.pathToFollow,
              align: this.pathToFollow,
              autoRotate: true,
              alignOrigin: [0.5, 0.8],
              start: 0.4,
              end: 1,
            },
            duration: 4,
            ease: 'none',
          }
        );

        cardTimeline.add(downScaleImage).add(hideContent, '-=3');
      }

      moveImagesTimeline.add(cardTimeline, i > 0 ? `-=4.2` : 0).addLabel(`card_${i}`);

      gsap.set(image, {
        scale: 0.2,
        motionPath: {
          path: this.pathToFollow,
          align: this.pathToFollow,
          autoRotate: true,
          alignOrigin: [0.5, 0.8],
          start: 0,
        },
      });
    }

    // moveImagesTimeline.play();

    this.animation.add(moveImagesTimeline);
  }
}
