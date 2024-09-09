import autoBind from 'auto-bind';

export default class Binder {
  constructor() {
    autoBind(this);
  }

  attachEvents() {
    return this;
  }

  onResize() {
    return this;
  }

  onUpdate() {
    return this;
  }

  destroy() {
    return this;
  }
}
