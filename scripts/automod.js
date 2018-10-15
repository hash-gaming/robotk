// Description:
//   a helpful tool to make the bot do all the dirty work for you.
//
// Dependencies:
//
// Configuration:
//
// Commands:
//
// Author:
//   hash-gaming

require('dotenv').config();

const wrap = require('../support/wrapAsync');
const {
  verifyIncomingWebhook,
  isAdminCheck,
  discuss,
  kickEveryone,
  logWhenError
} = require('../middleware');

module.exports = robot => {
  robot.router.all('*', logWhenError);
  robot.router.post(
    '/automod/discuss',
    verifyIncomingWebhook,
    wrap(isAdminCheck),
    wrap(discuss)
  );
  robot.router.post(
    '/automod/kick_everyone',
    verifyIncomingWebhook,
    wrap(isAdminCheck),
    wrap(kickEveryone)
  );
};
