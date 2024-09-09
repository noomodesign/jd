import { Binder } from '../helpers';
import gsap from 'gsap';

export default class HoverVisionary extends Binder {
  constructor(holder) {
    super();
    this.holder = holder;
    this.settings = {
      activeClass: 'show-circle',
    };
    this.contentBlock = this.holder.querySelector('[data-hover-block-content]');
    this.contentBlockTextHolder = this.contentBlock.firstChild;
    this.hoverItems = [...this.holder.querySelectorAll('[data-hover-item]')];

    this.attachEvents();
  }

  attachEvents() {
    this.holder.addEventListener('mousemove', this.selectHoverItem);
    this.holder.addEventListener('mouseleave', this.hideContentBlock);
    this.holder.addEventListener('mouseenter', this.showContentBlock);
  }

  selectHoverItem(e) {
    const { target } = e;

    if (!this.isValidTarget(target) || this.activeTarget === target) return;

    this.activeTarget = target;

    const content = this.getTargetContent(target);

    gsap.set(this.contentBlockTextHolder, {
      opacity: 0,
    });

    this.contentBlockTextHolder.innerText = content;

    gsap.killTweensOf(this.contentBlockTextHolder);

    gsap.to(this.contentBlockTextHolder, {
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
    });
  }

  hideContentBlock() {
    if (!this.isActive) return;
    this.holder.classList.remove(this.settings.activeClass);
  }

  showContentBlock() {
    if (this.isActive) return;
    this.holder.classList.add(this.settings.activeClass);
  }

  isValidTarget(target) {
    return target.hasAttribute('data-hover-item');
  }

  getTargetContent(target) {
    return target.getAttribute('data-hover-item');
  }

  destroy() {
    this.holder.removeEventListener('mousemove', this.selectHoverItem);
    this.holder.removeEventListener('mouseleave', this.hideContentBlock);
    this.holder.removeEventListener('mouseenter', this.showContentBlock);
  }

  get isActive() {
    return this.holder.classList.contains(this.settings.activeClass);
  }
}
