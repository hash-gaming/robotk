// Description:
//   a helpful tool for posting #lit comments
//
// Dependencies:
//
// Configuration:
//
// Commands:
//   hubot lit <message_link> - Immortalizes a message in #lit... fam
//   hubot lit - Immortalizes a shared message in #lit... fam
//
// Author:
//   mikestephens/harasho

const _ = require('lodash');

const hasAttachments = rawMessage => _.get(rawMessage, 'attachments.length', 0) > 0;

// TODO: make this a configurable value
// Just for the time being, let's keep these separate.
const channel = 'lit';
const failureMessage = "The fuck you talking 'bout fam?";
const successMessage = 'I gotchu fam';
const validURL = 'https://hashtaggaming.slack.com/archives/';

module.exports = (robot) => {
  robot.respond(/lit\s?(.*)?/i, (res) => {
    let param = res.match[1];

    if (hasAttachments(res.message.rawMessage)) {
      param = res.message.rawMessage.attachments[0].from_url;
    }

    if (param !== undefined && param.includes(validURL)) {
      res.send(successMessage);
      robot.messageRoom(channel, param);
    }
    else {
      res.send(failureMessage);
    }
  });
};
