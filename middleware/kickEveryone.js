const {
  describeGroup,
  kickUser,
  leaveChannel,
  archiveGroup
} = require('../support/slack');

module.exports = async function discuss(req, res) {
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
};
