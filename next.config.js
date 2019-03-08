require('dotenv').config();

module.exports = {
  publicRuntimeConfig: {
    SOUNDCLOUD_CLIENT_ID: process.env.SOUNDCLOUD_CLIENT_ID,
    INSTAGRAM_USER_ID: process.env.INSTAGRAM_USER_ID,
    INSTAGRAM_TOKEN: process.env.INSTAGRAM_TOKEN,
  },
};
