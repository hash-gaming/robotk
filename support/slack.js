const request = require('request-promise');

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
    method: 'POST',
    form: { token, user },
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

async function createOrUnarchiveGroup(token, channelName) {
  const createResponse = await createGroup(token, channelName);
  const channelList = await listGroups(token);
  const channel = channelList.groups.filter(g => g.name === channelName)[0];

  if (!createResponse.ok && createResponse.error === 'name_taken') {
    await unarchiveGroup(token, channel.id);
  }

  return channel;
}

async function isUserAdmin(token, userId) {
  const { user } = await describeUser(token, userId);
  return user.is_admin || user.is_owner;
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
  isUserAdmin
};
