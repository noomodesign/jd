import App from '..';
import { ScaleFade } from './Animations';
import SwupJsPlugin from '@swup/js-plugin';

export default class TransitionsAnimator {
  constructor(settings) {
    this.app = new App();
    this.container = document.querySelector('[data-transitions-container]');
    this.settings = {
      ...{ animation: 'fade' },
      ...settings,
    };

    this.animationInstance = this.getAnimationInstance();

    this.animation = new SwupJsPlugin([
      {
        from: '(.*)', // matches any route
        to: '(.*)', // matches any route
        out: this.animationInstance.out,
        in: this.animationInstance.in,
      },
    ]);
  }

  getAnimationInstance() {
    return new ScaleFade();
  }
}
