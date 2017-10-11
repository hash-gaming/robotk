// Description:
//   a collection of general gamebot functions
//
// Dependencies:
//
// Configuration:
//
// Commands:
// lit
//
// Author:
//   mikestephens/harasho

module.exports = function (robot) {
    robot.hear(/lit (.*)/i, (res) => {
        // Do shit here
        if (res.match[1].includes('https://hashtaggaming.slack.com/archives/')) {
            res.send('I gotchu fam');
            robot.messageRoom('lit', res.match[1]);
        }
        else {
            res.send("The fuck you talking 'bout fam?");
        }
    });
};
