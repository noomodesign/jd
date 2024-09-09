const { cmsFetch } = require('../_helpers');

const response = async () => {
  // const result = await cmsFetch('global-info?populate=deep')

  // return result.data.attributes

  return {title: 'globalInfo'}
};

module.exports = response();
