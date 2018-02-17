const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  owner: String,
  html_url: String,
  description: String,
  fork: Boolean,
  updated_at: Date,
  stargazers_count: Number,
  forks_count: Number,
});

// models are classes with which documents (rows) are constructed.
let Repo = mongoose.model('Repo', repoSchema);
//                        what is this first argument?

// let save = (/* TODO */) => {
let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let repoToSave = new Repo();
  repoToSave.save((err, repoToSave) => {
    //                  what is this 2nd arg?
    if (err) {
      console.log('Repo could not be saved.');
    }
  });
}

module.exports.save = save;