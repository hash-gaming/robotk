// Description:
//   Pugme is the most important thing in life
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   randbot pug me - Receive a pug
//   randbot pug bomb N - get N pugs (max 10)

module.exports = function (robot) {
  robot.respond(/pug me/i, (msg) => {
    msg.http('http://pugme.herokuapp.com/random').get()((err, res, body) => {
      msg.send(JSON.parse(body).pug);
    });
  });
  robot.respond(/pug bomb( (\d+))?/i, (msg) => {
    console.log(msg.match[2]);
    const count = parseInt(msg.match[2], 10) > 10 ? 10 : parseInt(msg.match[2], 10) || 5;

    return msg.http(`http://pugme.herokuapp.com/bomb?count=${count}`).get()((err, res, body) => {
      JSON.parse(body).pugs.forEach(p => msg.send(p));
    });
  });
};
