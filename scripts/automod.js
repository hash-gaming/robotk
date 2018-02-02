require('dotenv').config();

const wrap = require('../support/wrapAsync');
const {
  verifyIncomingWebhook,
  isAdminCheck,
  discuss,
  kickEveryone
} = require('../middleware');

module.exports = (robot) => {
  robot.router.post('/automod/discuss', verifyIncomingWebhook, wrap(isAdminCheck), wrap(discuss));
  robot.router.post('/automod/kick_everyone', verifyIncomingWebhook, wrap(isAdminCheck), wrap(kickEveryone));
};
