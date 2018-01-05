module.exports = function verifyIncomingWebhook(req, res, next) {
  const verificationToken = process.env.SLACK_VERIFICATION_TOKEN;

  if (req.body.token === verificationToken) {
    next();
  }
  else {
    res.sendStatus(403);
  }
};
