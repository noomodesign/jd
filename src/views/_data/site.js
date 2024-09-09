module.exports = {
  GA: process.env.GA,
  metaTitle: process.env.META_TITLE || 'Jasmina',
  production: process.env.ELEVENTY_PRODUCTION === 'true',
  DEFAULT_LOCALE: process.env.DEFAULT_LOCALE || 'en',
  CMS_DOMAIN: process.env.CMS_DOMAIN,
  PAGINATION_SIZE: parseFloat(process.env.PAGINATION_SIZE),
  BASE_URL: process.env.SITE_DOMAIN,
  YEAR: new Date().getFullYear(),
  pages: {
    home: '/',
    about: '/about/',
    longevity: '/longevity-intelligence/',
    explore: '/explore/',
    contact: '/contact/',
  },
};
