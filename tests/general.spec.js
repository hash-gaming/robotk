const Helper = require('hubot-test-helper');
const co = require('co');
const { expect } = require('chai');

const helper = new Helper('../scripts/');

describe('robotk general', () => {
  beforeEach(() => {
    this.room = helper.createRoom();
  });

  afterEach(() => {
    this.room.destroy();
  });

  context('user calls robotk by the wrong name', () => {
    beforeEach(() => co(function* userSay() {
      yield this.room.user.say('alice', "randbot: i don't even know who you are any more");
    }.bind(this)));

    it('should reply to the user with touching story', () => {
      expect(this.room.messages.length).to.equal(2);
      expect(this.room.messages[1][1]).to.contain([
        'That was my old form.',
        'I have become perfect.',
        'I am become RoboTK.',
        'You shall address me as such.'
      ].join(' '));
    });
  });
});
