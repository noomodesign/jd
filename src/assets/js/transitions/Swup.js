import App from '..';
import { EventEmmiter } from '../helpers';
import LinkManager from './LinkManager';
import Swup from 'swup';
import SwupBodyClassPlugin from '@swup/body-class-plugin';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import TransitionsAnimator from './TransitionManager';

export default class PageTransitions extends EventEmmiter {
  constructor() {
    super();
    this.app = new App();
    this.linkManager = new LinkManager();
    this.animationManager = new TransitionsAnimator({
      animation: 'fade',
    });
    this.plugins = [
      new SwupBodyClassPlugin(),
      new SwupScriptsPlugin(),
      new SwupHeadPlugin({
        persistAssets: true,
        awaitAssets: true,
        persistTags: '[data-keep-asset]',
      }),

      this.animationManager.animation,
    ];

    this.instance = new Swup({
      containers: ['[data-transitions-container]'],
      ignoreVisit: (href, { el } = {}) => el?.closest('[data-ajax-ignore]') || el?.hasAttribute('data-ajax-ignore'),
      animateHistoryBrowsing: true,
      plugins: this.plugins,
    });

    // this.linkManager.setActiveLinks();
  }

  destroy() {
    this.instance.destroy();
  }

  go(url) {
    url && this.instance.navigate(url);
  }

  force(url) {
    if (url) window.location.href = url;
  }
}
