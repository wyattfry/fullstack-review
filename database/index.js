const mongoose = require('mongoose');
const Promise = require('bluebird');
var dbURI = 'mongodb://localhost/fetcher';
mongoose.connect(dbURI);

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {type: Number, index: true},
  name: String,
  owner: {login: String},
  html_url: String,
  description: String,
  fork: Boolean,
  updated_at: Date,
  stargazers_count: Number,
  forks_count: Number
});

// models are classes with which documents (rows) are constructed.
let Repo = mongoose.model('Repo', repoSchema);
let dbWrites = [];

let save = (repos, resolve, reject) => {
  for (var i = 0; i < repos.length; i++) {
    dbWrites.push(saveOneRepo(repos[i]));
  }
  Promise.all(dbWrites).then(resolve, reject);
}

let saveOneRepo = (repo) => {
  Repo.find({id: repo.id}, (err, res) => {
    if (err) {
      console.log('DB save error', err);
    } else if (res.length > 0) {
      console.log(`Repo "${repo.name}" already in database.`);
    } else {
      let repoToSave = new Repo(repo);
      repoToSave.save((err, response) => {
        return new Promise((resolve, reject) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
    }
  });
}

let find = (cb) => {
  Repo.find().sort('-stargazers_count').limit(25).exec(cb);
}

module.exports.save = save;
module.exports.find = find;