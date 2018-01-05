const { isUserAdmin } = require('../support/slack');

module.exports = async function isAdminCheck(req, res, next) {
  const token = process.env.SLACK_API_TOKEN;

  if (await isUserAdmin(token, req.body.user_id)) {
    next();
  }
  else {
    res.send('This command is only available to owners and admins.');
  }
};
