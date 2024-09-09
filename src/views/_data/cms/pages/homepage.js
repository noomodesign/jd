const { cmsFetch } = require('../../_helpers');

const response = async () => {
  // const result = await cmsFetch('homepage?populate=deep')

  // return result.data.attributes

  return {title: 'test'}
};

module.exports = response();
