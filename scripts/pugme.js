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
//   randbot pug bomb N - get N pugs (max 20)

module.exports = function (robot) {
  robot.respond(/pug me/i, msg => msg.http('http://pugme.herokuapp.com/random').get()((err, res, body) => msg.send(JSON.parse(body).pug)));
  robot.respond(/pug bomb( (\d+))?/i, (msg) => {
    let count;
    if (parseInt(msg.match[2]) > 20) {
      count = 20;
    }
    else {
      count = msg.match[2] || 5;
    }
    return msg.http(`http://pugme.herokuapp.com/bomb?count=${count}`).get()((err, res, body) => {
      let i,
        len,
        pug,
        ref,
        results;
      ref = JSON.parse(body).pugs;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        pug = ref[i];
        results.push(msg.send(pug));
      }
      return results;
    });
  });
  return robot.respond(/how many pugs are there/i, msg => msg.http('http://pugme.herokuapp.com/count').get()((err, res, body) => msg.send(`There are ${JSON.parse(body).pug_count} pugs.`)));
};
