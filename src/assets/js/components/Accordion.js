import { BREAKPOINTS, breakpoint } from '../utils';

import App from '..';
import { Binder } from '../helpers';
import gsap from 'gsap';

export default class Accordion extends Binder {
  constructor(holder, settings) {
    super();
    this.holder = holder;

    this.app = new App();
    this.settings = {
      activeClass: 'is-active',
      hasActiveItemClass: 'has-active-item',
      accordion: true,
      setInitialState: true,
      event: 'click',
      DOM: {
        item: '[data-accordion-item]',
        opener: '[data-accordion-opener]',
        content: '[data-accordion-content]',
      },
      animation: {
        duration: 0.35,
        ease: 'power3.inOut',
      },
      ...settings,
    };
    this.previousTarget = {};
    this.activeTarget = {};

    if (!this.holder) return;

    this.init();
  }

  init() {
    this.items = [...this.holder.querySelectorAll(this.settings.DOM.item)];

    this.setInitialState();
    this.attachEvents();
  }

  get animation() {
    // if (breakpoint(BREAKPOINTS.tablet)) {
    //   return {
    //     autoAlpha: 0,
    //     ...this.settings.animation,
    //   };
    // }

    return {
      ...this.settings.animation,
      height: 0,
    };
  }

  setInitialState() {
    this.items.forEach((item) => {
      const content = item.querySelector(this.settings.DOM.content);
      const trigger = item.querySelector(this.settings.DOM.opener);

      gsap.set(content, this.animation);

      if (this.isActive(item) && this.settings.setInitialState) {
        this.setActiveItem({
          content,
          trigger,
          item,
        });
        gsap.set(content, { clearProps: 'all' });
      }
    });
  }

  attachEvents() {
    if (this.settings.event === 'hover') {
      this.items.forEach((item) => {
        item.addEventListener('mouseenter', this.onHover);
        // item.addEventListener('mouseleave', this.onClick);
      });
    } else {
      this.items.forEach((item) => item.addEventListener('click', this.onClick));
    }
  }

  onHover(event) {
    const { target } = event;
    const trigger = target.closest(this.settings.DOM.opener) || target;
    const parent = target.closest(this.settings.DOM.item);
    const content = parent.querySelector(this.settings.DOM.content);

    if (trigger && !this.isActive(parent)) {
      this.setActiveItem({
        content,
        trigger,
        item: parent,
      });

      this.open();
    }
  }

  onClick(event) {
    const { target } = event;
    const trigger = target.closest(this.settings.DOM.opener) || target;
    const parent = target.closest(this.settings.DOM.item);
    const content = parent.querySelector(this.settings.DOM.content);

    if (target.closest('[data-accordion-content]')) return;

    if (trigger) {
      this.setActiveItem({
        content,
        trigger,
        item: parent,
      });

      this.animate();
    }
  }

  setActiveItem(props) {
    this.previousTarget = this.activeTarget;
    this.activeTarget = props;
  }

  animate() {
    this.isActive() ? this.close() : this.open();
  }

  open() {
    if (this.settings.accordion && this.previousTarget.item) this.close();

    const { content, item } = this.activeTarget;

    // if (breakpoint(BREAKPOINTS.tablet)) {
    //   gsap.to(content, {
    //     ...this.animation,
    //     autoAlpha: 1,
    //   });
    // } else {
    // }
    gsap.to(content, {
      ...this.animation,
      height: content.scrollHeight,
      onComplete: () => {
        gsap.set(content, {
          height: 'auto',
        });
      },
    });

    item.classList.add(this.settings.activeClass);
    this.holder.classList.add(this.settings.hasActiveItemClass);
  }

  close() {
    if (!this.previousTarget) return;

    const { content, item } = this.previousTarget;

    content && gsap.to(content, this.animation);
    item && item.classList.remove(this.settings.activeClass);
    this.holder.classList.remove(this.settings.hasActiveItemClass);
  }

  isActive(node) {
    const { item } = this.activeTarget;

    if (node) {
      return node.classList.contains(this.settings.activeClass);
    }

    return item.classList.contains(this.settings.activeClass);
  }

  destroy() {
    if (this.settings.event === 'hover') {
      this.items.forEach((item) => {
        item.removeEventListener('mouseenter', this.onHover);
        // item.removeEventListener('mouseleave', this.onClick);
      });
    } else {
      this.items.forEach((item) => item.removeEventListener('click', this.onClick));
    }
  }
}
