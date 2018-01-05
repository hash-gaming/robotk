require('dotenv').config();

const {
  describeGroup,
  inviteUser,
  kickUser,
  leaveChannel,
  archiveGroup,
  setPurpose,
  postMessage,
  createOrUnarchiveGroup
} = require('../support/slack');

const wrap = require('../support/wrapAsync');
const { verifyIncomingWebhook, isAdminCheck } = require('../middleware');
const { automod } = require('../support/strings');

module.exports = (robot) => {
  // this async function doesn't have a try/catch, which you would need otherwise
  // because we use the wrap function to forward errors to the client.
  robot.router.post('/automod/discuss', verifyIncomingWebhook, wrap(isAdminCheck), wrap(async (req, res) => {
    const userName = req.body.text.replace('@', '');
    const channelName = `discuss_${userName}`;
    const { SLACK_API_TOKEN } = process.env;

    const describeResponse = await describeGroup(SLACK_API_TOKEN, req.body.channel_id);

    if (!describeResponse.ok && describeResponse.error === 'channel_not_found') {
      res.send('This is a public channel, just invite yo!');
    }
    else {
      const discussionGroup = await createOrUnarchiveGroup(SLACK_API_TOKEN, channelName);

      describeResponse.group.members.map(m => inviteUser(SLACK_API_TOKEN, discussionGroup.id, m));
      res.send('Creating private group to discuss.');

      await setPurpose(
        SLACK_API_TOKEN,
        discussionGroup.id,
        automod.discussionChannelPurpose.replace(/#{MEMBER_NAME}/g, userName)
      );

      await postMessage(
        SLACK_API_TOKEN,
        discussionGroup.id,
        automod.discussionChannelPurpose.replace(/#{MEMBER_NAME}/g, userName)
      );
    }
  }));

  robot.router.post('/automod/kick_everyone', verifyIncomingWebhook, wrap(isAdminCheck), wrap(async (req, res) => {
    res.send('Kicking everyone and closing the channel...');

    const { SLACK_API_TOKEN } = process.env;
    const { group } = await describeGroup(SLACK_API_TOKEN, req.body.channel_id);

    await Promise.all(
      group.members
      .filter(m => m !== req.body.user_id)
      .map(m => kickUser(SLACK_API_TOKEN, group.id, m))
    );

    await leaveChannel(SLACK_API_TOKEN, group.id);
    await archiveGroup(SLACK_API_TOKEN, group.id);
  }));
};
