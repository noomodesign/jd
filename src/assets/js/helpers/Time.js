import EventEmitter from './EventEmmiter';
import autoBind from 'auto-bind';
import gsap from 'gsap';

export default class Time extends EventEmitter {
  constructor() {
    super();
    autoBind(this);

    this.previous = Date.now();
    this.current = this.previous;
    this.elapsed = 0;
    this.delta = 16;
    this.tickValue = 0;

    this.start();
  }

  start() {
    gsap.ticker.add(this.tick);
  }

  tick(time) {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = time;
    this.elapsed = this.current - this.previous;
    this.trigger('tick', [time * 1000]);
  }

  stop() {
    gsap.ticker.remove(this.tick);
  }
}
