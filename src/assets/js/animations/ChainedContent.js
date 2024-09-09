import Animation from './Animation';
import SplitText from 'gsap/SplitText';
import gsap from 'gsap';

export default class ChainedContent extends Animation {
  constructor(holder, settings) {
    super(holder, settings);

    this.settings.repeat = true;
    this.settings.scrub = true;
    this.settings.start = 'top top';
    this.settings.end = 'bottom bottom';

    this.counter = this.holder.querySelector('[data-counter]');
    this.images = [...this.holder.querySelectorAll('[data-image]')];
    this.contentItems = [...this.holder.querySelectorAll('[data-content-description]')];
    this.contentItems = [...this.contentItems].map((el) => {
      const splitter = new SplitText(el.firstChild, {
        type: 'lines',
        lineThreshold: 0.5,
      });

      return {
        splitter,
        description: el,
      };
    });
  }

  addTweens() {
    this.createTitleAnimations();
    this.createImagesAnimation();
    this.createCounterAnimation();
  }

  createCounterAnimation() {
    const numbers = [...this.counter.querySelectorAll('[data-count]')];
    const moveNumbers = gsap.fromTo(
      numbers,
      {
        yPercent: 0,
      },
      {
        yPercent: (numbers.length - 1) * -100,
        ease: 'none',
        duration: this.animation.duration(),
      }
    );

    this.animation.add(moveNumbers, 0);
  }

  createImagesAnimation() {
    this.moveImagesAnimation = gsap.timeline();

    for (let i = 0; i < this.images.length; i++) {
      const image = this.images[i];

      const showImage = gsap.fromTo(
        image,
        { xPercent: -90 * i },
        {
          xPercent: -3 * i,
          duration: 2.2 * i,
          ease: 'none',
        }
      );

      this.moveImagesAnimation.add(showImage, 0);

      if (i < this.images.length - 1) {
        const hideImage = gsap.fromTo(
          image,
          { '--opacity': 0 },
          {
            '--opacity': 0.5,
            duration: 0.6,
            delay: 1,
            ease: 'none',
          }
        );
        this.moveImagesAnimation.add(hideImage);
      }
    }

    this.animation.add(this.moveImagesAnimation, 0);
  }

  createTitleAnimations() {
    for (let i = 0; i < this.contentItems.length; i++) {
      const { splitter } = this.contentItems[i];

      if (i > 0) {
        const showTitle = gsap.fromTo(
          splitter.lines,
          {
            y: 30,
            opacity: 0,
            filter: 'blur(5px)',
          },
          {
            filter: 'blur(0px)',
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: 'none',
          }
        );

        this.animation.add(showTitle, '<').addLabel(`title_${i}`);
      }

      if (i < this.contentItems.length - 1) {
        const hideTitle = gsap.fromTo(
          splitter.lines,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            delay: 1,
            duration: 0.5,
          }
        );
        this.animation.add(hideTitle);
      }

      if (i > 0) {
        gsap.set(splitter.lines, { y: 30, opacity: 0, filter: 'blur(5px)' });
      }
    }
  }

  destroy() {
    super.destroy();
    this.moveImagesAnimation?.kill();
  }
}
