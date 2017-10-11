// Description:
//   a helpful tool for posting #lit comments
//
// Dependencies:
//
// Configuration:
//
// Commands:
// randbot lit <message_link> - Immortalizes a message in #lit... fam
//
// Author:
//   mikestephens/harasho

module.exports = function (robot) {
  robot.respond(/lit (.*)/i, (res) => {
    // TODO: make this a configurable value
    if (res.match[1].includes('https://hashtaggaming.slack.com/archives/')) {
      res.send('I gotchu fam');
      robot.messageRoom('lit', res.match[1]);
    }
    else {
      res.send("The fuck you talking 'bout fam?");
    }
  });
};
