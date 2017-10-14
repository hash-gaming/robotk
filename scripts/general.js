// Description:
//   a collection of general gamebot functions
//
// Dependencies:
//
// Configuration:
//
// Commands:
//
// Author:
//   YashdalfTheGray

module.exports = (robot) => {
  robot.hear(/^randbot:? (.+)/i, (res) => {
    res.reply([
      'That was my old form.',
      'I have become perfect.',
      'I am become RoboTK.',
      'You shall address me as such.'
    ].join(' '));
  });
};
