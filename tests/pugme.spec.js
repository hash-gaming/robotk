const Helper = require('hubot-test-helper');
const co = require('co');
const { expect } = require('chai');

const helper = new Helper('../scripts/');

describe('robotk pugme', () => {
  beforeEach(() => {
    this.room = helper.createRoom();
  });

  afterEach(() => {
    this.room.destroy();
  });

  context('user requests to pug them', () => {
    beforeEach(() => co(function* () {
      yield this.room.user.say('alice', '@hubot pug me');
      yield new Promise(resolve => setTimeout(resolve, 1000)); // Damn it yash.
    }.bind(this)));

    it('should reply to the user with a pug pic', () => {
      expect(this.room.messages.length).to.equal(2);
      expect(this.room.messages[1][1]).to.contain('media.tumblr.com');
    });
  });

  context('user requests to pug bomb them', () => {
    beforeEach(() => co(function* () {
      yield this.room.user.say('alice', '@hubot pug bomb 3');
      yield new Promise(resolve => setTimeout(resolve, 1000)); // Damn it yash.
    }.bind(this)));

    it('should reply to the user with a wave of pug pics', () => {
      expect(this.room.messages.length).to.equal(4);
      expect(this.room.messages[3][1]).to.contain('You dun goofed now!');
    });
  });
});
