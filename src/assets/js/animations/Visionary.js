import { SCROLL, bounds } from '../utils';

import Animation from './Animation';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import SplitText from 'gsap/SplitText';
import gsap from 'gsap';

gsap.registerPlugin(MotionPathPlugin);

export default class Visionary extends Animation {
  constructor(holder, settings) {
    super(holder, settings);

    this.settings.repeat = true;
    this.settings.scrub = true;
    this.settings.start = 'top bottom';
    this.settings.end = 'bottom bottom';
    this.svgElement = this.holder.querySelector('[data-svg]');
    this.chainedContent = this.holder.querySelector('[data-animation="chained-content"]');
    this.shortDescription = this.holder.querySelector('[data-short-description]');
    this.book = this.holder.querySelector('[data-book]');
    this.horizontalPart = this.holder.querySelector('[data-horizontal-part]');
    this.phraseElement = this.holder.querySelector('[data-phrase]');
    this.pathToDraw = this.holder.querySelector('[data-path-to-draw]');
    this.hoverMoveItems = [...this.holder.querySelectorAll('[data-hover-move-item]')];
    this.svgPathForChars = this.holder.querySelector('[data-path-for-chars]');
  }

  addTweens() {
    this.createSvgAnimation();
    this.createContentAnimation();
  }

  attachEvents() {
    super.attachEvents();

    this.app.customScroll.on(SCROLL.update, this.moveHoverBlocks);
  }

  moveHoverBlocks(e) {
    const { direction, velocity } = e;
    const normalizedVelocity = gsap.utils.normalize(0, 60, Math.abs(velocity));
    const clampedVelocity = gsap.utils.clamp(0, 0.5, normalizedVelocity);

    for (let i = 0; i < this.hoverMoveItems.length; i++) {
      const element = this.hoverMoveItems[i];

      const move = i % 2 ? -40 : 40;

      gsap.set(element, { x: move * direction * clampedVelocity });
    }
  }

  createContentAnimation() {
    const contentAnimation = gsap.timeline({
      paused: true,
      scrollTrigger: {
        scroller: this.settings.scroller || this.app.customScroll.settings.wrapper,
        trigger: this.horizontalPart,
        once: false,
        start: 'top top',
        end: () => `+=${this.app.sizes.height}`,
        invalidateOnRefresh: true,
        scrub: true,
      },
    });

    const shortDescriptionSplitter = new SplitText(this.shortDescription, {
      split: 'lines',
    });

    const showShortDescription = gsap.fromTo(
      shortDescriptionSplitter.lines,
      {
        opacity: 0,
        y: 100,
        filter: 'blur(5px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
      }
    );

    const phraseChars = [...this.phraseElement.querySelectorAll('span')].reverse();

    const phraseTimeline = gsap.timeline({
      paused: true,
      scrollTrigger: {
        scroller: this.settings.scroller || this.app.customScroll.settings.wrapper,
        trigger: this.horizontalPart,
        once: false,
        start: () => `top center-=200`,
        // end: () => `+=${this.app.sizes.height * 1.5}`,
        end: () => `bottom-=${this.app.sizes.height * 0.75} bottom`,
        invalidateOnRefresh: true,
        scrub: true,
      },
    });

    const animateChar = gsap.to(phraseChars, {
      motionPath: {
        path: this.svgPathForChars,
        align: this.svgPathForChars,
        autoRotate: true,
        alignOrigin: [1, 0.9],
        start: 0,
        end: (i) => 1 - 0.012 * i,
      },
      duration: 2,
      stagger: (i) => 0.025 * i,
      ease: 'power3.out',
    });

    phraseTimeline.add(animateChar, `<`);
    contentAnimation.add(showShortDescription).add(phraseTimeline, '<');
    this.animation.add(contentAnimation, 0);
  }

  createSvgAnimation() {
    const svgTimelineVertical = gsap.timeline({
      paused: true,
      scrollTrigger: {
        scroller: this.settings.scroller || this.app.customScroll.settings.wrapper,

        trigger: this.chainedContent,
        once: false,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        scrub: true,
      },
    });

    const svgTimelineHorizontal = gsap.timeline({
      paused: true,
      scrollTrigger: {
        scroller: this.settings.scroller || this.app.customScroll.settings.wrapper,
        trigger: this.horizontalPart,
        once: false,
        start: 'top top',
        end: () => `bottom+=${bounds(this.book).width / 2} bottom`,
        invalidateOnRefresh: true,
        scrub: true,
      },
    });

    const drawPathTimeline = gsap.timeline({
      paused: true,
      scrollTrigger: {
        scroller: this.settings.scroller || this.app.customScroll.settings.wrapper,

        trigger: this.chainedContent,
        once: false,
        start: () => `top-=${this.app.sizes.height / 4} bottom`,
        end: () => `+=${this.app.sizes.height}`,
        invalidateOnRefresh: true,
        scrub: true,
      },
    });

    const drawPath = gsap.fromTo(
      this.pathToDraw,
      {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: 0.7,
        ease: 'power3.in',
      }
    );

    const moveVertically = gsap.fromTo(
      this.svgElement,
      {
        yPercent: () => {
          const { height: chainedContentHeight } = bounds(this.chainedContent);
          const { height: svgHeight } = bounds(this.svgElement);

          return -(chainedContentHeight / svgHeight) * 100;
        },
      },
      {
        yPercent: () => {
          const { height } = bounds(this.svgElement);
          const testBounds = bounds(this.holder.querySelector('[data-center-test]'));
          return -((testBounds.centerY - testBounds.height * 0.5) / height) * 100;
        },
        ease: 'none',
        duration: 1,
      }
    );

    const moveHorizontally = gsap.fromTo(
      this.svgElement,
      {
        xPercent: 0,
      },
      {
        xPercent: () => {
          const { left, width } = bounds(this.svgElement);
          const { width: bookWidth } = bounds(this.book);
          const bookWidthDiff = bookWidth + (this.app.sizes.width - bookWidth);

          return -((width + bookWidthDiff + left - this.app.sizes.width) / width) * 100;
        },
        ease: 'none',
        duration: 1,
      }
    );

    svgTimelineVertical.add(moveVertically);
    svgTimelineHorizontal.add(moveHorizontally);
    drawPathTimeline.add(drawPath);

    this.animation.add(drawPathTimeline).add(svgTimelineVertical, '<').add(svgTimelineHorizontal);
  }

  destroy() {
    super.destroy();
    this.app.customScroll.off(SCROLL.update);
  }
}
