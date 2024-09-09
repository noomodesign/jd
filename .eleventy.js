const svgSprite = require('eleventy-plugin-svg-sprite');
// const { EleventyI18nPlugin } = require('@11ty/eleventy');
const { cache } = require('eleventy-plugin-workbox');
const { icons } = require('eleventy-plugin-pwa-icons');
const directoryOutputPlugin = require('@11ty/eleventy-plugin-directory-output');
const fs = require('fs');
// const path = require('path');
const {
  count,
  countSection,
  formatBR,
  getPermalink,
  splitText,
  debugCode,
  minifyString,
  localizeDate,
  getFileContent,
  getPathWithDomain,
  markdown,
  calculatePagination,
  getPostsByCategory,
  getTiktokEmbed,
  getLatestByCategories,
  changeIcons,
  truncate,
  offsetText,
  getYear,
  getUploadsPath,
  isVideo,
} = require('./.eleventy.utils.js');

const config = function (eleventyConfig) {
  require('dotenv').config();

  eleventyConfig.setServerOptions({
    liveReload: true,
    domDiff: true,
    port: 8081,
    showAllHosts: true,
    // https: {
    //   key: './dev.local.key',
    //   cert: './dev.local.crt',
    // },
    encoding: 'utf-8',
    showVersion: true,
  });


  eleventyConfig.setQuietMode(false);
  eleventyConfig.setUseGitIgnore(true);
  eleventyConfig.addPlugin(directoryOutputPlugin);
  eleventyConfig.addPlugin(cache, {
    generateSWOptions: {
      globDirectory: 'dist',
      globPatterns: ['**/*.{css,js,png,jpg,gif,svg,woff2,json}', '!*.html'],
    },
  });
  eleventyConfig.addPlugin(icons, {
    icons: {
      pathToRawImage: './src/assets/pwa/icon.png',
    },
    manifest: {
      pathToManifest: './src/assets/pwa/manifest.json',
    },
    generatorOptions: {
      iconOnly: true,
      noSandbox: true,
      padding: 0,
    },
  });
  eleventyConfig.addPlugin(svgSprite, {
    path: './src/assets/sprites',
    globalClasses: 'svgi',
  });

  eleventyConfig.addLayoutAlias('main', '_layouts/main.pug');
  eleventyConfig.addWatchTarget('**/src/assets/**/*');
  eleventyConfig.addWatchTarget('**/src/**/*');
  eleventyConfig.addWatchTarget('./tailwind.config.js');

  // if (fs.existsSync(path.resolve(__dirname, 'backend'))) {
  //   eleventyConfig.addWatchTarget('backend/**/*');
  // }

  // if (fs.existsSync(path.resolve(__dirname, 'wordpress'))) {
  //   eleventyConfig.addWatchTarget('wordpress/wp-content/themes/**/*.php');
  // }

  // eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/static': 'assets/static' });
  eleventyConfig.addPassthroughCopy({ './_redirects': '/_redirects' });
  eleventyConfig.addPassthroughCopy({ './robots.txt': '/robots.txt' });

  eleventyConfig.addFilter('minify', minifyString);
  eleventyConfig.addFilter('date', localizeDate);
  eleventyConfig.addFilter('count', count);
  eleventyConfig.addFilter('countSection', countSection);
  eleventyConfig.addFilter('formatBR', formatBR);
  eleventyConfig.addFilter('getPermalink', getPermalink);
  eleventyConfig.addFilter('markdown', markdown);
  eleventyConfig.addFilter('getFileContent', getFileContent);
  eleventyConfig.addFilter('getPathWithDomain', getPathWithDomain);
  eleventyConfig.addFilter('getPostsByCategory', getPostsByCategory);
  eleventyConfig.addFilter('calculatePagination', calculatePagination);
  eleventyConfig.addFilter('getTiktokEmbed', getTiktokEmbed);
  eleventyConfig.addFilter('getLatestByCategories', getLatestByCategories);
  eleventyConfig.addFilter('truncate', truncate);
  eleventyConfig.addFilter('price', (value) => `$${value}`);
  eleventyConfig.addFilter('getUploadsPath', getUploadsPath);
  eleventyConfig.addFilter('getYear', getYear);
  eleventyConfig.addFilter('isVideo', isVideo);

  eleventyConfig.addTransform('changeIcons', changeIcons);
  eleventyConfig.addShortcode('splitText', splitText);
  eleventyConfig.addShortcode('debug', debugCode);

  eleventyConfig.addShortcode('icon', (name, classes = '') => {
    if (!name) {
      throw new Error('[eleventy-plugin-svg-sprite] name of SVG must be specified');
    }
    const nameAttr = name;
    const classesAttr = `svgi ${classes}`.trim();

    return `<svg class="${classesAttr}"><use xlink:href="#svg-${nameAttr}"></use></svg>`;
  });

  eleventyConfig.ignores.add('**/pwa/**/*');
  eleventyConfig.ignores.add('**/_data/_strapi/*.*');

  global.filters = eleventyConfig.javascriptFunctions;
  eleventyConfig.setPugOptions({
    globals: ['filters'],
  });

  return {
    templateFormats: ['md', 'njk', 'pug', 'html'],
    dir: {
      input: 'src/views',
      output: 'dist',
      layouts: '_layouts',
      global: '_global',
      partials: '_partials',
    },
  };
};

module.exports = config;
