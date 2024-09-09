import { Binder } from '../helpers';
import { Location } from 'swup';

export default class LinkManager extends Binder {
  constructor(settings = {}) {
    super();

    this.settings = {
      ...{
        selector: ', .footer a[href]:not([target="_blank"])',
        activeClass: 'is-active',
      },
      ...settings,
    };
  }

  get links() {
    const headerLinks = [...document.querySelectorAll('[data-header] .nav-item__inner[href]:not([target="_blank"])')];
    const footerLinks = [...document.querySelectorAll('.footer a[href]:not([target="_blank"])')];

    return [...headerLinks, ...footerLinks];
  }

  filterLinksOut() {
    const currentLocation = Location.fromUrl(window.location);
    const filteredLinks = this.links;

    return filteredLinks.filter((link) => {
      const { pathname } = Location.fromUrl(link.href);
      const splittedPath = currentLocation.pathname.split('/').filter((p) => p.length > 1);
      const included = splittedPath.some((path) => pathname.includes(path));
      const same = pathname === currentLocation.pathname;

      return included || same;
    });
  }

  setActiveLinks() {
    if (document.body.classList.contains('popup-style-page')) return;

    const newLinks = this.filterLinksOut();

    for (const link of this.links) {
      link.classList.remove(this.settings.activeClass);
      link.parentNode.classList.remove(this.settings.activeClass);
    }

    for (const link of newLinks) {
      link.classList.add(this.settings.activeClass);
      link.parentNode.classList.add(this.settings.activeClass);
    }
  }
}
