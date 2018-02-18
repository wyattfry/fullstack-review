//
// Complete the getReposByUsername function in helpers/github.js.
// In this function, you'll use the npm request module to fetch a
// user's Github repositories from the Github API.
//

const request = require('request');
// lookup request documentation (alterative API caller)
const config = require('../config.js') || GITHUB_API_KEY;

let getReposByUsername = (username, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, res, body) => {
    cb(err, res, body);
  });

}

module.exports.getReposByUsername = getReposByUsername;