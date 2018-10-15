// This function literally has to look like this
// even though we're not using res and next for all
// the error handling through express 3.12 to resolve
// properly. Thanks hubot 👌

module.exports = (err, req) => {
  // eslint-disable-line no-unused-vars
  // intercept the error that's happening and log it
  if (process.env.DEBUG === 'true') {
    console.log(`There was an error while ${req.method} ${req.originalUrl}`);
    console.log(JSON.stringify(req.body, null, 2));
  }
};
