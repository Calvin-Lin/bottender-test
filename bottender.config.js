require('dotenv').config();

module.exports = {
  messenger: {
    accessToken: process.env.ACCESS_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN,
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET,
  },
};
