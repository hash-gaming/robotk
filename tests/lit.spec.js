const Helper = require('hubot-test-helper');
const co = require('co');
const { expect } = require('chai');

const helper = new Helper('../scripts/');
const responses = require('../i18n/en/responses.json');

describe('robotk lit', () => {
  beforeEach(() => {
    this.room = helper.createRoom();
  });

  afterEach(() => {
    this.room.destroy();
  });

  context('user requires robotk to lit invalid content', () => {
    beforeEach(() =>
      co(
        function* userSay() {
          yield this.room.user.say('alice', '@hubot lit that');
        }.bind(this)
      ));

    it('should fail to lit message due to incorrect syntax', () => {
      expect(this.room.messages.length).to.equal(2);
      expect(this.room.messages[1][1]).to.be.oneOf(responses.lit.failure);
    });
  });

  context('user requires robotk to lit url', () => {
    const url = 'https://hashtaggaming.slack.com/archives/test';

    beforeEach(() =>
      co(
        function* userSay() {
          yield this.room.user.say('alice', `@hubot lit ${url}`);
        }.bind(this)
      ));

    it('should lit message successfully', () => {
      expect(this.room.messages.length).to.equal(2);
      expect(this.room.messages[1][1]).to.be.oneOf(responses.lit.success);
    });
  });
});
