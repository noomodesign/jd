import Animation from './Animation';
import { SCROLL } from '../utils';
import gsap from 'gsap';

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,

      defaults: { ease: 'none' },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    widths = [],
    xPercents = [],
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px')));
      xPercents[i] = snap((parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 + gsap.getProperty(el, 'xPercent'));
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], 'scaleX') +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        rotate: 0,
        duration: distanceToLoop / pixelsPerSecond,
        transition: 'none',
      },
      0
    ).fromTo(
      item,
      {
        xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
        rotate: 0,
      },
      {
        rotate: 0,
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false,
      },
      distanceToLoop / pixelsPerSecond
    );
  }

  tl.progress(1, false).progress(0, false); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

export default class Marquee extends Animation {
  constructor(holder, settings) {
    super(holder, settings);

    this.scrollVelocity = 0;

    this.settings.toggleActions = 'play pause play pause';
    this.settings.repeat = true;
    this.settings.ease = 'none';
  }

  attachEvents() {
    super.attachEvents();
    this.app.customScroll.on(SCROLL.update, this.onScrollUpdate);
  }

  onScrollUpdate(data) {
    const { velocity } = data;
    const normalizedVelocity = gsap.utils.mapRange(-20, 20, -3, 3, velocity);
    this.scrollVelocity = Math.abs(normalizedVelocity);
  }

  update() {
    if (!this.animation) return;
    this.animation.timeScale(1 + this.scrollVelocity);
  }

  addTweens() {
    this.boxes = [...this.holder.querySelectorAll(this.settings.selector || '[data-marquee]')];

    this.loop = horizontalLoop(this.boxes, {
      delay: this.settings.delay,
      speed: gsap.utils.mapRange(375, 1440, 0.5, 1.4, this.app.sizes.width),
      repeat: -1,
    });

    this.animation.add(this.loop);
  }
}
