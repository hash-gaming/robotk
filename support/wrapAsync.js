const { logWhenError } = require('../middleware');

module.exports = fn => (...args) => fn(...args).catch((e) => {
  // args looks like [req, res, next]
  logWhenError(e, ...args);
  return args[2](e);
});
