const minify = require('html-minifier').minify;
const inspect = require('util').inspect;
const moment = require('moment-timezone');
const markdownIt = require('markdown-it');
const cheerio = require('cheerio');
const fs = require('fs');
const Eleventy = require('eleventy-plugin-svg-sprite');

moment.tz.setDefault(process.env.TIMEZONE);

const md = new markdownIt({
  html: true,
});

const splitText = (text, className) => {
  if (!text) return '';
  const splitted = text.split('');
  const formatted = splitted.map((c, i) => `<span style='--i: ${i}' class="${className ? className : ''}">${c}</span>`);
  const str = formatted.join();
  return {
    count: splitted.length,
    text: str.replace(/,/g, ''),
  };
};

const debugCode = (content) => {
  return `<pre style="font-size: 1.2rem;background-color: #eaa; padding: 1rem; width: 100%; margin: 3rem 0; font-weight: 400;">${inspect(content)}</pre>`;
};

/** Given a scss string, compile it to CSS, minify the result, and return the final CSS as a string. */
const minifyString = (data) => {
  const res = minify(data, {
    collapseWhitespace: true,
  });
  return res;
};

const localizeDate = function (date, format = 'D MMM. YYYY') {
  // locale = locale ? locale : process.env.DEFAULT_LOCALE;
  // moment.locale(locale);

  return moment(date, true).format(format);
};

const normalizeUrl = (pathname) => {
  const url = new URL(pathname, process.env.SITE_DOMAIN);
  const normalizedUrl = url.pathname.replace(/\/+/g, '/');

  return `${normalizedUrl}/`;
};

const getPermalink = (slug, type, hash) => {
  let isHomepage = slug === 'homepage' || slug === 'home';
  let url = isHomepage ? '/' : slug;

  if (type && hash) {
    return normalizeUrl(`${slug}${type}/`);
  }

  if (type === 'season') {
    return `/seasons/${slug}`;
  }

  return normalizeUrl(url);
};

const calculatePagination = (currentPage, totalPages, amountToShow = 4) => {
  const numbers = [];

  if (currentPage < amountToShow - 1) {
    if (totalPages < amountToShow) {
      numbers.push(1);
    } else {
      for (let i = 1; i <= amountToShow; i++) {
        numbers.push(i);
      }
    }
  } else {
    if (currentPage >= totalPages - (amountToShow - 1)) {
      for (let i = totalPages - (amountToShow - 1); i <= totalPages; i++) {
        numbers.push(i);
      }
    } else {
      for (let i = currentPage; i <= currentPage + (amountToShow - 1); i++) {
        numbers.push(i);
      }
    }
  }

  return numbers;
};

const markdown = (content, replacement) => {
  if (!replacement) return md.render(content);
  const res = md.render(content);
  let replacedContent = res;
  for (const replace of replacement) {
    replacedContent = replacedContent.replace(replace[0], replace[1]);
  }
  return replacedContent;
};

const formatBR = (data, selector) => {
  if (!data) return data;
  const child = data.replace(/\n/g, '<br>');
  if (!selector) return child;
  return `<${selector}>${child}</${selector}>`;
};

const count = (value) => {
  if (value < 10) return `0${value}`;
  return `${value}`;
};

const countSection = (value) => {
  return `${value}:`;
};

const offsetText = async (content, outputPath) => {
  if (outputPath && outputPath.endsWith('.html')) {
    const $ = cheerio.load(content);
    const offsetTextElements = $('[data-offset-text]');
    offsetTextElements.each((index, element) => {
      const text = $(element).attr('data-offset-text');
      const first = $(element).children().first();
      first.html(`<span class="offset-label">${text}</span>${first.html()}`);
    });

    const updatedContent = $.html();
    return updatedContent;
  }

  return content;
};

const getYear = (date = Date.now(), format = 'YYYY') => {
  return localizeDate(date, format);
};

const changeIcons = async (content, outputPath) => {
  if (outputPath && outputPath.endsWith('.html')) {
    content = content.replace(/\[year_now]/g, `${getYear()}`);
    content = content.replace(
      /\[icon 1]/g,
      `<i class="svg-icon svg-icon--1"><svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5799 11.815H23.1799V29.625H20.1119V16.677C19.3059 17.509 17.9279 17.821 16.4979 17.821C16.2379 17.821 15.9779 17.795 15.7439 17.769V15.065C18.6039 15.065 20.1639 14.077 20.5799 11.815Z" fill="currentColor"/><circle cx="20.5" cy="20.5" r="18.5" stroke="currentColor" stroke-width="4"/></svg></i>`
    );
    content = content.replace(
      /\[icon 2]/g,
      `<i class="svg-icon svg-icon--2"><svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.6959 26.9729H26.3279V29.6249H13.8999C14.1339 25.2569 16.2659 23.1249 19.2039 21.2789C21.1799 20.0309 23.1039 19.0429 23.1039 16.7809C23.1039 15.1429 22.2979 14.0769 20.5819 14.0769C18.1119 14.0769 17.7479 16.0789 17.7739 17.6909L14.5499 17.1969C14.5239 14.4409 16.1099 11.5029 20.6859 11.5029C24.0919 11.5029 26.3019 13.4789 26.3019 16.8589C26.3019 19.9529 24.3519 21.4609 21.6739 23.1249C19.7239 24.3209 18.1379 25.2829 17.6959 26.9729Z" fill="currentColor"/><circle cx="20.5" cy="20.5" r="18.5" stroke="currentColor" stroke-width="4"/></svg></i>`
    );

    const $ = cheerio.load(content);
    const offsetTextElements = $('[data-offset-text]');
    offsetTextElements.each((index, element) => {
      const text = $(element).attr('data-offset-text');
      const first = $(element).children().first();
      first.html(`<span class="offset-label">${text}</span>${first.html()}`);
    });

    const updatedContent = $.html();
    return updatedContent;
  }

  return content;

  // return transformedValue;
};

const getTiktokEmbed = (content) => {
  const $ = cheerio.load(content);

  $('script').remove();
  // $('section').remove();

  return $.html();
};

const htmlSerializer = {
  hyperlink: ({ node, ...rest }) => {
    const target = node.data.target ? `target="${node.data.target}" rel="noopener"` : '';
    const url = linkResolver(node.data);
    return `<a ${target} href="${url}">${formatBR(rest)}</a>`;
  },
  label: ({ node, ...rest }) => {
    return `<span class="${node.data.label}">${formatBR(rest)}</span>`;
  },
  embed: ({ node }) => {
    const width = node.oembed.width;
    const height = node.oembed.height;
    const aspect = parseFloat(width / height).toFixed(2);
    return `<div data-oembed="${node.oembed.embed_url}"
      data-oembed-type="${node.oembed.type}"
      data-oembed-provider="${node.oembed.provider_name}">
      ${node.oembed.html.replace(/width="\d+"/, `style="--aspect: ${aspect}" class="w-full aspect-video"`).replace(/height="\d+"/, '')}
    </div>`;
  },
  span: ({ text }) => (text ? text : ''),
  heading1: (data) => formatBR(data, 'h1'),
  heading2: (data) => formatBR(data, 'h2'),
  heading3: (data) => formatBR(data, 'h3'),
  heading4: (data) => formatBR(data, 'h4'),
  heading5: (data) => formatBR(data, 'h5'),
  heading6: (data) => formatBR(data, 'h6'),
  paragraph: (data) => formatBR(data, 'p'),
  preformatted: ({ node }) => `<pre>${JSON.stringify(node.text)}</pre>`,
  strong: ({ children }) => `<strong>${children}</strong>`,
  em: (data) => formatBR(data, 'em'),
  listItem: (data) => formatBR(data, 'li'),
  oListItem: (data) => formatBR(data, 'li'),
  list: ({ children }) => `<ul>${children}</ul>`,
  oList: ({ children }) => `<ol>${children}</ol>`,
  image: ({ node }) => {
    const linkUrl = node.linkTo ? linkResolver(node.linkTo) : null;
    const linkTarget = node.linkTo && node.linkTo.target ? `target="${node.linkTo.target}" rel="noopener"` : '';
    const wrapperClassList = [node.label || '', 'block-img'];
    const img = `<img src="${node.url}" alt="${node.alt ? node.alt : ''}" copyright="${node.copyright ? node.copyright : ''}" />`;

    return `
        <p class="${wrapperClassList.join(' ')}">
          ${linkUrl ? `<a ${linkTarget} href="${linkUrl}">${img}</a>` : img}
        </p>
      `;
  },
};

const getPathWithDomain = (url) => {
  return new URL(url, process.env.SITE_DOMAIN).href;
};

const getFileContent = (url) => {
  const css = `./dist${url}`;
  if (fs.existsSync(css)) {
    const cssContent = fs.readFileSync(css, 'utf-8');
    return cssContent;
  }
};

const getPostsByCategory = (posts, category) => {
  if (!category) return posts;

  const filteredData = posts.filter((post) => {
    const postCategory = post.attributes.category.data;

    return postCategory.attributes.title === category;
  });

  return filteredData;
};

const truncate = function truncate(str, n = 120) {
  return str.length > n ? str.slice(0, n - 1) + '&hellip;' : str;
};

const getLatestByCategories = (categories, posts, amountToShow = 3, excludeAll = false) => {
  const all = [];
  const result = categories.map((category) => {
    const { slug } = category.attributes;
    const postsByCategory = posts.filter((post) => {
      const { category: postCategory } = post.attributes;

      return postCategory.data.attributes.slug === slug;
    });

    const totalPosts = postsByCategory.length;

    const slicesPosts = amountToShow > totalPosts ? postsByCategory : postsByCategory.slice(0, amountToShow);

    all.push(...slicesPosts);

    return {
      category: category.attributes,
      posts: slicesPosts,
    };
  });

  if (excludeAll) return result;

  return [
    {
      category: {
        slug: 'all',
        title: 'All',
      },
      posts: all,
    },
    ...result,
  ];
};

const getUploadsPath = (upload) => {
  return new URL(upload, process.env.STRAPI_DOMAIN).href;
};

const isVideo = (asset) => {
  const videoFormats = ['.mp4', '.webm', '.ogg', '.avi', '.mkv', '.flv', '.mov'];

  return videoFormats.some((format) => asset.endsWith(format));
};

module.exports = {
  isVideo,
  count,
  countSection,
  calculatePagination,
  splitText,
  debugCode,
  minifyString,
  getPathWithDomain,
  localizeDate,
  getFileContent,
  htmlSerializer,
  getPermalink,
  formatBR,
  markdown,
  changeIcons,
  getPostsByCategory,
  getTiktokEmbed,
  getLatestByCategories,
  truncate,
  offsetText,
  getYear,
  getUploadsPath,
};
