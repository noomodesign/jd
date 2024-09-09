import Animation from './Animation';

export default class Scale extends Animation {
  constructor(holder, settings) {
    super(holder, settings);

    this.requiredAnimationType = this.settings.type || this.getAttribute('data-animation') || 'scaleRight';

    this.settings.variants = {
      scaleLeft: {
        axis: 'scaleX',
        transformOrigin: '100% 50%',
      },
      scaleRight: {
        axis: 'scaleX',
        transformOrigin: '0% 50%',
      },
      scaleUp: {
        axis: 'scaleY',
        transformOrigin: '50% 100%',
      },
      scaleDown: {
        axis: 'scaleY',
        transformOrigin: '50% 0%',
      },
      scale: {
        axis: 'scale',
      },
    };

    this.animationValues = this.settings.variants[this.requiredAnimationType];
  }

  addTweens() {
    this.animation.fromTo(
      this.holder,
      {
        [this.animationValues.axis]: this.settings.from,
        transformOrigin: this.animationValues.transformOrigin,
      },
      {
        [this.animationValues.axis]: this.settings.to,
        duration: this.settings.duration,
        ease: this.settings.ease,
      }
    );
  }
}
