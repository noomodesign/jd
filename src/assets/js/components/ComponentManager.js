import { HoverVisionary, ScrollTo } from './';

import { Binder } from '../helpers';

export default class ComponentManager extends Binder {
  constructor() {
    super();

    this.components = [];

    this.componentsLibrary = [
      {
        selector: '[data-component="hover-visionary"]',
        Instance: HoverVisionary,
      },
      {
        selector: '[data-scroll-to]',
        Instance: ScrollTo,
      },
    ];

    this.init();
  }

  init() {
    for (const componentSettings of this.componentsLibrary) {
      const { selector, Instance } = componentSettings;
      const elements = [...document.querySelectorAll(selector)];

      elements.forEach((element) => {
        const component = new Instance(element);

        this.components.push(component);
      });
    }
  }

  update(time) {
    for (const component of this.components) {
      component?.onUpdate(time);
    }
  }

  onResize() {
    for (const component of this.components) {
      component?.onResize();
    }
  }

  destroy() {
    this.components.forEach((instance) => instance.destroy());
    this.components = [];
  }
}
