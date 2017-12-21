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

// TODO: make this a configurable value
// Just for the time being, let's keep these separate.
const channel = 'lit';
const failureMessage = "The fuck you talking 'bout fam?";
const successMessage = 'I gotchu fam';
const validURL = 'https://hashtaggaming.slack.com/archives/';

module.exports = (robot) => {
  robot.respond(/lit (.*)/i, (res) => {
    const param = res.match[1];

    if (param.includes(validURL)) {
      res.send(successMessage);
      robot.messageRoom(channel, param);
    }
    else {
      res.send(failureMessage);
    }
  });
};
