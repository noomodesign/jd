import { detect } from './detect';

export { detect };

export const HTML = document.documentElement;
export const BODY = document.body;

export const BREAKPOINTS = {
  xs: 450,
  phone: 600,
  tablet: 768,
  desktop: 1024,
  laptop: 1280,
  xl: 1366,
  widescreen: 1440,
  fhd: 1920,
};

export const breakpoint = (point, desktopFirst = false) => {
  if (desktopFirst) {
    return window.innerWidth < point;
  }

  return window.innerWidth >= point;
};

export const isBreakpoint = {
  xs: breakpoint(BREAKPOINTS.xs, true),
  phone: breakpoint(BREAKPOINTS.phone, true),
  tablet: breakpoint(BREAKPOINTS.tablet),
  desktop: breakpoint(BREAKPOINTS.desktop),
  laptop: breakpoint(BREAKPOINTS.laptop),
  xl: breakpoint(BREAKPOINTS.xl),
  widescreen: breakpoint(BREAKPOINTS.widescreen),
  fhd: breakpoint(BREAKPOINTS.fhd),
};

export const bounds = (el) => {
  const bounds = el.getBoundingClientRect();

  return {
    bottom: bounds.bottom,
    left: bounds.left,
    height: bounds.height,
    right: bounds.right,
    top: bounds.top,
    width: bounds.width,
    x: bounds.x,
    y: bounds.y,
    centerX: bounds.left - bounds.width / 2,
    centerY: bounds.top - bounds.height / 2,
  };
};
export const PAGES = {
  home: '/',
  account: '/account/',
  accountCreate: '/account/create/',
  accountVerify: '/account/verify/',
  accountSignin: '/account/signin/',
  accountSettings: '/account/settings/',
  accountForgotPassword: '/account/forgot-password/',
  accountResetPassword: '/account/reset-password/',
  accountOrderDetails: '/account/order-details/',
  cart: '/cart/',
  typefaces: '/typefaces/',
  trialFonts: '/trial-fonts/',
  trialFontsDownload: '/trial-fonts/download/',
  custom: '/custom-projects/',
  licenseAgreement: '/license-agreement/',
  contact: '/contact/',
  checkout: '/checkout/',
  checkoutCancel: '/checkout/cancel/',
  orderConfirmation: '/order-confirmation/',
  orderDownload: '/shared-fonts/download/',
};

const SCROLL_API = '.CS';
export const SCROLL = {
  namespace: SCROLL_API,
  update: `update${SCROLL_API}`,
};

export const NAV = {
  active: 'NAV.ACTIVE',
  innactive: 'NAV.INNACTIVE',
};

export const getMousePos = (event) => {
  let e = event;
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return { x: posx, y: posy };
};

export const MathUtils = {
  lerp: (a, b, n) => (1 - n) * a + n * b,
  distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
  map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
  getRandomNumber: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
};

export const easeOutSine = (t, b, c, d) => c * Math.sin((t / d) * (Math.PI / 2)) + b;

export const easeOutQuad = (t, b, c, d) => {
  t /= d;
  return -c * t * (t - 2) + b;
};

export const formatNumberToZero = (num) => {
  if (num < 10) return `0${num}`;
  return num;
};

export const isDebugActive = () => window.location.hash === '#debug' || process.env.DEBUG;

export const serializableToDeepMap = (obj) => {
  const map = new Map();
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      map.set(key, serializableToDeepMap(obj[key]));
    } else {
      map.set(key, obj[key]);
    }
  });
  return map;
};

export const retrieveDeepMap = (key) => {
  const serializedMap = localStorage.getItem(key);
  if (serializedMap) {
    const obj = JSON.parse(serializedMap);
    return serializableToDeepMap(obj);
  }
  return new Map();
};

export const deepMapToSerializable = (map) => {
  const obj = {};
  map.forEach((value, key) => {
    if (value instanceof Map) {
      obj[key] = deepMapToSerializable(value);
    } else {
      obj[key] = value;
    }
  });
  return obj;
};

export const serializeMap = (map) => {
  return JSON.stringify(deepMapToSerializable(map));
};

export const storeDeepMap = (map, key) => {
  const serializedMap = serializeMap(map);
  localStorage.setItem(key, serializedMap);
  return serializedMap;
};

export const mergeMaps = (map1, map2) => {
  // Create a new map to hold the merged result
  const mergedMap = new Map(map1);

  // Iterate over the second map and add its entries to the merged map
  for (const [key, value] of map2) {
    mergedMap.set(key, value);
  }

  return mergedMap;
};

export const objectToMap = (obj) => {
  const map = new Map();

  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      map.set(key, objectToMap(value));
    } else if (Array.isArray(value)) {
      map.set(
        key,
        value.map((item) => (item && typeof item === 'object' ? objectToMap(item) : item))
      );
    } else {
      map.set(key, value);
    }
  }

  return map;
};

export const loadHtml2Canvas = () => {
  return new Promise((resolve, reject) => {
    if (window.html2canvas) {
      resolve(window.html2canvas);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.min.js';
    script.onload = () => resolve(window.html2canvas);
    script.onerror = () => reject(new Error('Failed to load html2canvas'));
    document.head.appendChild(script);
  });
};

export const loadJsPDF = () => {
  return new Promise((resolve, reject) => {
    if (window.jsPDF) {
      resolve(window.jsPDF);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = () => resolve(window.jspdf.jsPDF);
    script.onerror = () => reject(new Error('Failed to load jsPDF'));
    document.head.appendChild(script);
  });
};

export const formatUnixTimestamp = (unixTimestamp) => {
  // Convert Unix timestamp to milliseconds
  const milliseconds = unixTimestamp * 1000;

  // Create a new Date object
  const dateObject = new Date(milliseconds);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Format the date object to a readable string
  const formattedDate = dateObject.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: userTimeZone,
    timeZoneName: 'short',
  });

  return formattedDate;
};

export const ev = (eventName, data, target = document) => {
  const e = new CustomEvent(eventName, { detail: data });
  target.dispatchEvent(e);
};
