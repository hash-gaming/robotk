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
//   hubot pug me - Receive a pug
//   hubot pug bomb N - get N pugs (max 10)

const request = require('request-promise');

module.exports = robot => {
  robot.respond(/pug me/i, async msg => {
    try {
      const response = await request({
        url: 'http://pugme.herokuapp.com/random',
        json: true
      });
      msg.send(response.pug);
    } catch (err) {
      msg.send('You dun goofed now!');
    }
  });

  robot.respond(/pug bomb( (\d+))?/i, async msg => {
    const count =
      parseInt(msg.match[2], 10) > 10 ? 10 : parseInt(msg.match[2], 10) || 5;

    try {
      const response = await request({
        url: `http://pugme.herokuapp.com/bomb?count=${count}`
      });
      response.pugs.forEach(p => msg.send(p));
    } catch (err) {
      [...Array(count).keys()]
        .map(() => 'You dun goofed now!')
        .forEach(m => msg.send(m));
    }
  });
};
