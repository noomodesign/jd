import Animation from './Animation';
import gsap from 'gsap';

export default class BallFall extends Animation {
  constructor(holder, settings) {
    super(holder, settings);

    this.settings.repeat = true;
    this.settings.start = 'top center';
    this.settings.end = '+=100%';
    this.settings.toggleActions = 'play none play reset';
    this.ball = this.holder.querySelector('[data-story-circle="footer"]');
    this.wavesContainer = this.holder.querySelector('[data-waves]');
  }

  createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('wave');
    this.wavesContainer.appendChild(circle);

    const tl = gsap.timeline();

    const enlarge = gsap.fromTo(
      circle,
      {
        scale: 0.4,
        opacity: 0.7,
        filter: 'blur(0px)',
        rotateX: 40,
        y: '-15svh',
        z: 0,
      },
      {
        filter: 'blur(3px)',
        scale: 18,
        rotateX: 0,
        z: '-40svh',
        y: '100svh',
        duration: 3,
        opacity: 0.4,
        ease: 'power.out',
      }
    );

    const fadeOut = gsap.fromTo(
      circle,
      {
        opacity: 0.5,
      },
      {
        duration: 1.5,
        opacity: 0,
        ease: 'power.out',
        onComplete: () => {
          circle.remove();
          tl.kill();
        },
      }
    );

    tl.add(enlarge).add(fadeOut, '-=2');
  }

  animateWaves() {
    gsap.delayedCall(0.7, this.createCircle);
    gsap.delayedCall(1.4, this.createCircle);
    gsap.delayedCall(1.8, this.createCircle);
    gsap.delayedCall(2, this.createCircle);
  }

  addTweens() {
    const animateBall = gsap.fromTo(
      this.ball,
      {
        y: '-100svh',
        scale: 1.6,
      },
      {
        scale: 1,
        y: 0,
        ease: 'bounce.out',
        duration: 2,
        onStart: () => {
          this.animateWaves();
          this.holder.classList.remove('can-animate');
        },
        onComplete: () => {
          this.holder.classList.add('can-animate');
        },
      }
    );

    this.animation.add(animateBall);
  }
}
