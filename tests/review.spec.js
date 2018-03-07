const Helper = require('hubot-test-helper');
const co = require('co');
const nock = require('nock');
const {
  expect
} = require('chai');

const helper = new Helper('../scripts/');

const response = [{
  name: 'test',
  rating: 100,
  summary: 'splendid',
  cover: {
    url: 'http://example.com/img.png'
  },
  url: 'http://example.com/'
}];

describe('robotk review', () => {
  beforeEach(() => {
    nock('https://api-endpoint.igdb.com')
    .get('/games/?limit=5&offset=0&order=rating:desc&search=test&fields=name,rating,cover,summary,url')
    .reply(200, response);

    this.room = helper.createRoom();
  });

  afterEach(() => {
    this.room.destroy();
  });

  context('user requires robotk to review a game', () => {
    beforeEach(() => co(function* userSay() {
      yield this.room.user.say('alice', '@hubot review test');
      yield new Promise(resolve => setTimeout(resolve, 1000));
    }.bind(this)));

    it('should compose review message successfully', () => {
      const game = response[0];

      expect(this.room.messages.length).to.equal(2);
      expect(this.room.messages[1][1]).to.equal(`*${game.name}* with the rating of ${Math.round(game.rating) / 10}\n${game.summary}\n\nCover: ${game.cover.url}\nURL: ${game.url}`); // eslint-disable-line max-len
    });
  });
});
