const isAdminCheck = require('./isAdmin');
const verifyIncomingWebhook = require('./verifyWebhook');
const discuss = require('./discuss');
const kickEveryone = require('./kickEveryone');
const logWhenError = require('./logWhenError');

module.exports = {
  isAdminCheck,
  verifyIncomingWebhook,
  discuss,
  kickEveryone,
  logWhenError
};
