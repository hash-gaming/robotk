const request = require('request-promise');
const _ = require('lodash');

async function createGroup(token, name) {
  return request({
    url: 'https://slack.com/api/groups.create',
    method: 'POST',
    form: { token, name },
    json: true
  });
}

async function archiveGroup(token, channel) {
  return request({
    url: 'https://slack.com/api/groups.archive',
    method: 'POST',
    form: { token, channel },
    json: true
  });
}

async function unarchiveGroup(token, channel) {
  return request({
    url: 'https://slack.com/api/groups.unarchive',
    method: 'POST',
    form: { token, channel },
    json: true
  });
}

async function describeGroup(token, channel) {
  return request({
    url: 'https://slack.com/api/groups.info',
    method: 'POST',
    form: { token, channel },
    json: true
  });
}

async function listGroups(token) {
  return request({
    url: 'https://slack.com/api/groups.list',
    method: 'POST',
    form: { token },
    json: true
  });
}

async function inviteUser(token, channel, user) {
  return request({
    url: 'https://slack.com/api/groups.invite',
    method: 'POST',
    form: { token, channel, user },
    json: true
  });
}

async function describeUser(token, user) {
  return request({
    url: 'https://slack.com/api/users.info',
    method: 'GET',
    qs: { token, user },
    json: true
  });
}

async function kickUser(token, channel, user) {
  return request({
    url: 'https://slack.com/api/groups.kick',
    method: 'POST',
    form: { token, channel, user },
    json: true
  });
}

async function leaveChannel(token, channel) {
  return request({
    url: 'https://slack.com/api/groups.leave',
    method: 'POST',
    form: { token, channel },
    json: true
  });
}

async function setPurpose(token, channel, purpose) {
  return request({
    url: 'https://slack.com/api/chat.postMessage',
    method: 'POST',
    form: { token, channel, purpose },
    json: true
  });
}

async function postMessage(token, channel, text, options) {
  return request({
    url: 'https://slack.com/api/chat.postMessage',
    method: 'POST',
    form: {
      token,
      channel,
      text,
      ...options
    },
    json: true
  });
}

async function createOrUnarchiveGroup(token, channelName, fudgeFactor) {
  const isNameTakenError = e => !e.ok && e.error === 'name_taken';

  const createResponse = await createGroup(token, channelName);
  const channelList = await listGroups(token);
  const channel = channelList.groups.filter(g => g.name === channelName)[0];

  if (isNameTakenError(createResponse)) {
    // the channel apparently exists but slack has decided to not
    // return it in the list of groups because slack is great
    if (!channel && _.isNil(fudgeFactor)) {
      throw new Error('SLACK_IS_DUMB');
    } else if (!channel && !_.isNil(fudgeFactor)) {
      const fudgedChannelName = `${channelName}${fudgeFactor}`;

      const response = await createGroup(token, fudgedChannelName);
      const groupList = await listGroups(token);
      const fudgedChannel = groupList.groups.filter(
        g => g.name === fudgedChannelName
      )[0];

      if (isNameTakenError(response)) {
        await unarchiveGroup(token, fudgedChannel.id);
      }

      return fudgedChannel;
    }

    const response = await unarchiveGroup(token, channel.id);
    console.log(response);
  }

  if (process.env.DEBUG === 'true') {
    console.log(channel);
  }

  return channel;
}

async function isUserAdmin(token, userId) {
  const { user } = await describeUser(token, userId);
  return user.is_admin || user.is_owner;
}

function parseUsername(userString) {
  // userString is either @username or <@U23423HKJH|username>
  if (/<@(\S*)\|(\S*)>/.test(userString)) {
    const matches = /<@(\S*)\|(\S*)>/.exec(userString);
    return {
      userName: matches[2],
      userId: matches[1]
    };
    // eslint-disable-next-line no-else-return
  } else if (/@(\S*)/.test(userString)) {
    return { userName: userString.replace('@', '') };
  }
  return {};
}

function parseCommand(command) {
  const [userString, fudgeFactor] = command.split(' ');
  return { fudgeFactor, ...parseUsername(userString) };
}

module.exports = {
  createGroup,
  archiveGroup,
  unarchiveGroup,
  describeGroup,
  listGroups,
  inviteUser,
  describeUser,
  kickUser,
  leaveChannel,
  setPurpose,
  postMessage,
  createOrUnarchiveGroup,
  isUserAdmin,
  parseUsername,
  parseCommand
};
