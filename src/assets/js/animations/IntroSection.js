import { BREAKPOINTS, bounds } from '../utils';

import Animation from './Animation';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
// import MotionPathHelper from 'gsap/src/MotionPathHelper';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import SplitText from 'gsap/SplitText';
import gsap from 'gsap';

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, SplitText);

export default class IntroSection extends Animation {
  constructor(holder, settings) {
    super(holder, settings);

    // this.settings.repeat = true;
    // this.settings.scrub = true;
    // this.settings.start = () => `top+=${bounds(document.querySelector('.intro-section-block')).height} top`;
    // this.settings.end = 'bottom bottom';
    this.titles = [...this.holder.querySelectorAll('[data-title-part]')];
    this.mainImage = this.holder.querySelector('[data-main-image]');
    this.svgPathStart = this.holder.querySelector('[data-path-first]');
    this.storyCircleIntro = this.holder.querySelector('[data-story-circle="intro"]');
    this.storyCircleGlobal = document.querySelector('[data-story-circle="global"]');
    this.description = this.holder.querySelector('[data-description]');

    this.sequencePart = this.holder.querySelector('[data-part="sequence"]');
    this.connectionSVG = this.sequencePart.querySelector('.connection-path');
    this.connectionSVGPath = this.sequencePart.querySelector('[data-path-continue]');
    this.descriptionSplitter = new SplitText(this.description, {
      split: 'lines',
    });

    this.titles = this.titles.map((title) => {
      const splitter = new SplitText(title, {
        split: 'chars',
      });

      return { title, splitter };
    });
  }

  addTweens() {
    this.app.customScroll.stop();
    // this.animation.yoyo(true);
    // this.animation.repeat(-1);

    this.createIntroAnimation();
    this.createMovingAnimation();
    this.createContentAnimation();

    gsap.set(this.storyCircleGlobal, {
      opacity: 0,
    });
  }

  onComplete() {
    this.app.customScroll.start();
  }

  createIntroAnimation() {
    this.titleAnimation = gsap.timeline();

    for (let i = 0; i < this.titles.length; i++) {
      const { splitter: titleSplitter, title } = this.titles[i];

      const moveTitle = gsap.fromTo(
        title,
        {
          xPercent: i % 2 ? -100 : 100,
        },
        {
          xPercent: 0,
          duration: 3,
          ease: 'power3.out',
        }
      );

      const titleStagger = 1.5 / titleSplitter.chars.length;

      const showChars = gsap.fromTo(
        titleSplitter.chars,
        {
          opacity: 0,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          duration: 2.8,
          stagger: i % 2 ? -titleStagger : titleStagger,
        }
      );

      this.titleAnimation.add(moveTitle, '<').add(showChars, '<');
    }

    const showImage = gsap.fromTo(
      this.mainImage,
      {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 1.2,
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 3.2,
        ease: 'power3.out',
        onComplete: () => {
          gsap.set(this.storyCircleGlobal, { opacity: 1 });
        },
      }
    );

    const showDescription = gsap.fromTo(
      this.descriptionSplitter.lines,
      {
        opacity: 0,
        xPercent: 50,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        ease: 'power2.out',
        duration: 2,
        xPercent: 0,
        stagger: 1.2 / this.descriptionSplitter.lines.length,
      }
    );

    const showCircle = gsap.fromTo(
      this.storyCircleIntro,
      {
        scale: 0,
        opacity: 1,
        zIndex: 3,
      },
      {
        zIndex: 3,
        scale: 0.2,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      }
    );

    const setInitialCirclePosition = gsap.to(this.storyCircleIntro, {
      motionPath: {
        path: this.svgPathStart,
        align: this.svgPathStart,
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      transformOrigin: '50% 50%',
      duration: 2.6,
      delay: 0.6,
      ease: 'power2.in',
    });

    const changeCircleColor = gsap.fromTo(
      this.storyCircleIntro,
      {
        '--c': '#FFFFFF',
      },
      {
        '--c': '#E7EFFB',
        duration: 2.5,
        ease: 'power2.in',
      }
    );

    const drawLastPath = gsap.fromTo(
      this.connectionSVGPath,
      {
        drawSVG: '0%',
      },
      {
        drawSVG: '100%',
        duration: 1.2,
        ease: 'power3.in',
        onStart: () => {
          this.connectionSVG.classList.remove('opacity-0');
        },
      }
    );

    this.animation
      .add(showImage)
      .add(this.titleAnimation, '<')
      .add(showDescription, '-=3.5')
      .add(setInitialCirclePosition, '-=3.5')
      .add(showCircle, '<')
      .add(changeCircleColor, '<')
      .add(drawLastPath, '-=1.5');

    gsap.set(this.storyCircleIntro, {
      z: 2,
      scale: 0,
    });

    for (const item of this.titles) {
      item.title.classList.remove('opacity-0');
    }

    this.description.classList.remove('opacity-0');
  }

  createMovingAnimation() {
    const circleColors = [
      '#B07AF2', // engineer
      '#C89FFA', // investor
      '#C89FFA', // scientist
      '#DBBEFF', // author
      '#E6E6E1', // athlete
      '#E7EFFB', // entrepreneur
    ];

    // Moving throught second path
    this.moveCircleAnimation = gsap.timeline({
      paused: true,
      scrollTrigger: {
        scroller: this.settings.scroller || this.app.customScroll.settings.wrapper,
        trigger: this.sequencePart,
        invalidateOnRefresh: true,
        start: () => `top-=${bounds(document.querySelector('.intro-section-block')).height} top`,
        end: 'bottom top-=100',
        scrub: true,
        once: false,
      },
    });

    const scaleCircle = gsap.fromTo(
      this.storyCircleGlobal,
      {
        scale: 0.3,
      },
      {
        scale: 1,
        ease: 'power2.in',
        duration: 1.5,
      }
    );

    const changeColorUnderText = gsap.fromTo(
      this.storyCircleGlobal,
      {
        '--c': '#B07AF2',
        filter: 'blur(0px)',
      },
      {
        '--c': '#211651',
        ease: 'power2.in',
        filter: 'blur(3px)',
        duration: 0.7,
      }
    );

    const changeColorAfterText = gsap.fromTo(
      this.storyCircleGlobal,
      {
        '--c': '#211651',
        filter: 'blur(3px)',
      },
      {
        '--c': '#B07AF2',
        ease: 'none',
        filter: 'blur(0px)',
        duration: 0.4,
      }
    );

    const afterColorChange = gsap.to(this.storyCircleGlobal, {
      duration: 2,
      onUpdate: () => {
        const progress = afterColorChange.progress();
        const interpolatedColor = gsap.utils.interpolate(circleColors, progress);
        this.storyCircleGlobal.style.setProperty('--c', interpolatedColor);
      },
    });

    const moveCircleAlongPath = gsap.to(this.storyCircleGlobal, {
      motionPath: {
        path: this.connectionSVGPath,
        align: this.connectionSVGPath,
        alignOrigin: [0.5, 0.5],
        // autoRotate: true,
      },
      transformOrigin: '50% 50%',
      duration: 5,
      ease: 'none',
    });

    this.moveCircleAnimation.add(scaleCircle, '<').add(changeColorUnderText, '<').add(changeColorAfterText, '-=0.5').add(afterColorChange).add(moveCircleAlongPath, 0);

    gsap.set(this.storyCircleGlobal, {
      scale: 0.2,
      motionPath: {
        path: this.connectionSVGPath,
        align: this.connectionSVGPath,
        alignOrigin: [0.5, 0.5],
        // autoRotate: true,
        start: 0,
      },
    });
  }

  createContentAnimation() {
    this.contentBlock = this.holder.querySelector('[data-sticky-content]');
    this.contentTitles = [...this.holder.querySelectorAll('[data-content-title]')];
    this.contentDescriptions = [...this.holder.querySelectorAll('[data-content-description]')];

    this.contentItems = this.contentTitles.map((title, index) => {
      const description = this.contentDescriptions[index];
      const descriptionSplitter = new SplitText(description.firstChild, {
        type: 'lines',
        lineThreshold: 0.5,
        preserveWhitespace: true,
      });

      return { title, description, descriptionSplitter };
    });

    this.contentAnimation = gsap.timeline({
      paused: true,
      scrollTrigger: {
        snap: {
          snapTo: 'labelsDirectional',
          duration: 1.3,
          delay: 0,
          ease: 'power.inOut',
        },
        scroller: this.settings.scroller || this.app.customScroll.settings.wrapper,
        trigger: this.contentBlock,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        once: false,
      },
    });

    for (let i = 0; i < this.contentItems.length; i++) {
      const { title, descriptionSplitter } = this.contentItems[i];

      const higlightTitle = gsap.fromTo(
        title,
        {
          opacity: 0.5,
        },
        {
          opacity: 1,
          duration: 1,
          ease: 'power3.inOut',
        }
      );

      const hideTitle = gsap.to(
        title,

        {
          opacity: 0.5,
          duration: 1,
          ease: 'power3.inOut',
        }
      );

      const showDescription = gsap.fromTo(
        descriptionSplitter.lines,
        {
          y: 30,
          opacity: 0,
          filter: 'blur(5px)',
          pointerEvents: 'none',
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.1,
          pointerEvents: 'all',
          ease: 'power2',
        }
      );

      const hideDescription = gsap.to(descriptionSplitter.lines, {
        opacity: 0,
        duration: 0.5,
        pointerEvents: 'none',
      });

      if (i > 0) {
        this.contentAnimation.add(higlightTitle, '<').add(['shownDescription', showDescription], '<');
      }

      if (i < this.contentItems.length - 1) {
        this.contentAnimation.add(hideDescription).add(hideTitle, '<');
      }
    }

    // console.log(this.contentItems);
  }
}
