import App from '../..';
import { Binder } from '../../helpers';

export default class Base extends Binder {
  constructor() {
    super();
    this.app = new App();
  }

  out() {
    return this;
  }

  in() {
    return this;
  }
}
