// Description:
//   a helpful tool for obtaining Game Reviews via IGDB API.
//
// Dependencies:
//   "igdb-api-node": "3.1.3"
//
// Configuration:
//   IGDB_API_KEY - Token to auth the API in order to make calls.
//
// Commands:
//   hubot review <game> - Download some basic information about given game.
//
// Author:
//   hash-gaming

const _ = require('lodash');
const igdb = require('igdb-api-node').default;

const client = igdb();

module.exports = (robot) => {
  robot.respond(/review\s?(.*)?/i, (res) => {
    const param = res.match[1];

    client.games({
      limit: 5,
      offset: 0,
      order: 'rating:desc',
      search: param
    }, [
      'name',
      'rating',
      'cover',
      'summary',
      'url'
    ])
    .then((response) => {
      _.forEach(response.body, game => res.send(`*${game.name}* with the rating of ${Math.round(game.rating) / 10}\n${game.summary}\n\nCover: ${game.cover.url}\nURL: ${game.url}`));
    })
    .catch((err) => {
      res.send('OMG, I just had a brain fart... Someone hug me :(');
      console.log(err);
    });
  });
};
