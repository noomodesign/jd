export const detect = {
  uA: navigator.userAgent.toLowerCase(),

  get isLaptop() {
    return window.innerWidth >= 1280;
  },

  get isIOS() {
    return /iphone|ipad|ipod/i.test(this.uA);
  },

  get isIphone() {
    return !this.isWindowsMobile && /iphone/i.test(this.uA) && this.isIOS;
  },

  get isPhone() {
    return this.isMobileAndroid || (this.isIOS && !this.isIpad && !this.isLatestIpad) || this.isWindowsMobile;
  },

  get isTablet() {
    return this.isTabletAndroid || this.isIpad || this.isLatestIpad;
  },

  get isSafari() {
    return !!this.uA.match(/version\/[\d\.]+.*safari/);
  },

  get isIE() {
    return /*@cc_on!@*/ false || !!document.documentMode;
  },

  get isTouch() {
    return 'ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch);
  },

  update() {
    Object.assign(this, {
      uA: navigator.userAgent.toLowerCase(),
    });
  },
};
