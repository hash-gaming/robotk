const {
  describeGroup,
  createOrUnarchiveGroup,
  inviteUser,
  setPurpose,
  postMessage,
  parseUsername
} = require('../support/slack');
const { automod } = require('../support/strings');

// this async function doesn't have a try/catch, which you would need otherwise
// because we use the wrap function to forward errors to the client.
module.exports = async function discuss(req, res) {
  const { userName } = parseUsername(req.body.text);
  if (!userName) {
    res.send('You didn\'t give me a user, try the command again with an `@user`.');
    return;
  }
  const channelName = `discuss_${userName}`;
  const { SLACK_API_TOKEN } = process.env;

  const describeResponse = await describeGroup(SLACK_API_TOKEN, req.body.channel_id);

  if (!describeResponse.ok && describeResponse.error === 'channel_not_found') {
    res.send('This is a public channel, just invite yo!');
  }
  else {
    const discussionGroup = await createOrUnarchiveGroup(SLACK_API_TOKEN, channelName);

    describeResponse.group.members.map(m => inviteUser(SLACK_API_TOKEN, discussionGroup.id, m));
    res.send([
      'Creating private group to discuss.',
      'Psst. Copy and paste this message into the discussion.',
      '```',
      automod.pollMessage.replace(/#{MEMBER_NAME}/g, userName),
      '```'
    ].join('\n'));

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
};
