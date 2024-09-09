import Animation from './Animation';
import SplitText from 'gsap/SplitText';
import gsap from 'gsap';

gsap.registerPlugin(SplitText);
export default class Split extends Animation {
  constructor(holder, settings) {
    super(holder, settings);
    this.pluginSettings = {};

    this.settings.animationType = this.getAttribute('data-animation-type') || 'default';

    this.settings.pluginSettings = {
      linesClass: 'line ++',
      charsClass: 'char',
      wordsClass: 'word',
      type: this.getAttribute('data-split') || 'lines',
    };
    this.animationTypes = {
      fade: {
        start: {
          opacity: this.settings.from,
        },
        end: {
          opacity: this.settings.to,
          ease: this.settings.ease,
          duration: this.settings.duration,
          delay: this.settings.delay,
          stagger: {
            each: this.settings.interval,
            from: this.settings.staggerDirection,
          },
        },
      },
      custom: {
        start: {
          'will-change': 'opacity, transform',
          opacity: 0,
          rotationX: -90,
          yPercent: 50,
        },
        end: {
          ease: 'power2.out',
          opacity: 1,
          rotationX: 0,
          yPercent: 0,
          stagger: {
            each: this.settings.interval,
            from: 0,
          },
        },
      },
      reverse: {
        start: {
          yPercent: -120,
        },
        end: {
          yPercent: 0,
          ease: this.settings.ease,
          clearProps: 'transform, opacity',
          duration: this.settings.duration,
          delay: this.settings.delay,
          stagger: {
            each: this.settings.interval,
            from: this.settings.staggerDirection,
          },
        },
      },
      default: {
        start: {
          yPercent: 120,
          opacity: 0,
          filter: 'blur(10px)',
        },
        end: {
          filter: 'blur(0px)',
          opacity: 1,
          yPercent: 0,
          ease: this.settings.ease,
          clearProps: 'transform, opacity, filter',
          duration: this.settings.duration,
          delay: this.settings.delay,
          stagger: {
            each: this.settings.interval,
            from: this.settings.staggerDirection,
          },
        },
      },
    };

    this.splitter = new SplitText(this.holder, this.settings.pluginSettings);

    // this.createNestedLines();

    this.animationType = this.animationTypes[this.settings.animationType];

    const { start } = this.animationType;
    switch (this.settings.pluginSettings.type) {
      case 'words':
      case 'words, lines':
        gsap.set(this.splitter.words, start);
        break;
      case 'lines, chars':
      case 'chars, lines':
      case 'chars':
      case 'words, chars':
      case 'chars, words':
        gsap.set(this.splitter.chars, start);
        break;
      default:
        gsap.set(this.splitter.lines, start);
        break;
    }
  }

  createNestedLines() {
    const lines = this.splitter.lines;
    const chars = this.splitter.chars;
    const words = this.splitter.words;

    if (this.settings.pluginSettings.type.includes('lines')) {
      this.createWrappersAround(lines, 'block');
    }

    if (this.settings.pluginSettings.type.includes('words')) {
      this.createWrappersAround(words, 'inline-block');
    }

    if (this.settings.pluginSettings.type.includes('chars')) {
      this.createWrappersAround(chars, 'inline-block');
    }
  }

  createWrappersAround(elements, display = 'inline-block') {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const lineWrapper = document.createElement('div');
      lineWrapper.style = `position:relative;vertical-align:top;display:${display};`;
      lineWrapper.classList.add('line-w');
      element.parentElement.insertBefore(lineWrapper, element);
      lineWrapper.appendChild(element);
    }
  }

  addTweens() {
    const { start, end } = this.animationType;

    switch (this.settings.pluginSettings.type) {
      case 'words':
      case 'words, lines':
        this.animation.fromTo(this.splitter.words, start, end);
        break;
      case 'chars':
      case 'lines, chars':
      case 'chars, lines':
      case 'words, chars':
      case 'chars, words':
        this.animation.fromTo(this.splitter.chars, start, end);
        break;
      default:
        this.animation.fromTo(this.splitter.lines, start, end);
        break;
    }
  }

  // onComplete() {
  //   super.onComplete();
  //   if (!this.shouldNotReset) this.destroy();
  // }

  destroy() {
    super.destroy();
    this.splitter.revert();
  }

  get shouldNotReset() {
    return this.holder.hasAttribute('data-no-reset');
  }

  get shouldNotFade() {
    return this.holder.hasAttribute('data-no-fade');
  }
}
