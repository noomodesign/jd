import { Binder } from '../../helpers';
import { detect } from '../../utils';
import gsap from 'gsap';

export default class MenuAnimator extends Binder {
  constructor(holder) {
    super();
    this.holder = holder;
    this.navItems = [...this.holder.querySelectorAll('[data-stagger]')];

    !detect.isLaptop && this.init();
  }

  init() {
    this.animation && this.animation.kill();
    this.animation = gsap.timeline({ paused: true });
    this.animation.fromTo(
      this.navItems,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 1.3,
        stagger: 0.1,
      }
    );
  }

  animateIn() {
    return this.animation.timeScale(1).play(0);
  }

  animateOut() {
    return this.animation.timeScale(2).reverse();
  }

  destroy() {
    gsap.killTweensOf(this.navItems);
    gsap.set(this.navItems, { clearProps: 'all' });
    this.animation && this.animation.kill();
  }
}
