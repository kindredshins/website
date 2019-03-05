require('dotenv').config();

module.exports = {
  publicRuntimeConfig: {
    soundCloudClientId: process.env.SOUNDCLOUD_CLIENT_ID,
    soundCloudUserId: process.env.SOUNDCLOUD_USER_ID,
  },
};
