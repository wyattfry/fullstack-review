const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

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
//                        what is this first argument?

// let save = (/* TODO */) => {
let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  for (var i = 0; i < repos.length; i++) {
    saveOneRepo(repos[i]);
  }
}

let saveOneRepo = (repo) => {
    Repo.find({id: repo.id}, (err, res) => {

      if (err) {
        console.log('DB save error', err);
      } else if (res.length > 0) {
        console.log('res.length', res.length);
        console.log(`Repo "${repo.name}" already in database.`);
      } else {
        let repoToSave = new Repo(repo);
        repoToSave.save((err, repoToSave) => {
          //                  what is this 2nd arg?
          if (err) {
            console.log('Repo could not be saved.');
          }
        });
      }
    });
}

let find = (cb) => {
  let result = Repo.find({}, (err, res) => {
    cb(err, res);
  });
}

module.exports.save = save;
module.exports.find = find;