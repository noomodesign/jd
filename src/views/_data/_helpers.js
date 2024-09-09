const EleventyFetch = require('@11ty/eleventy-fetch');

const cmsFetch = async (
  endpoint,
  options = {
    fetchOptions: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_ACCESS_TOKEN}`,
      },
    },
    duration: process.env.ELEVENTY_PRODUCTION ? '10d' : '0s',
    type: 'json',
    method: 'POST',
  }
) => {
  const URL = `${process.env.STRAPI_DOMAIN}/api/${endpoint}`;
  const res = await EleventyFetch(URL, options);

  return res;
};

module.exports = { cmsFetch };
