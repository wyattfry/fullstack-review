const gh = require('../helpers/github.js');
const express = require('express');
const db = require('../database');
let app = express();
let sampleData = require('./../sampleData.js');
const parser = require('body-parser');
app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.urlencoded()); // allows POST body to be parsed

app.post('/repos', function (req, res) {
  gh.getReposByUsername(req.body.username, (err, res, body) => {
    db.save(JSON.parse(body), res.end, res.end);
  });
  // res.end(); // triggers the f() in the ajax request's 'success'
});

app.get('/repos', function (req, res) {
  db.find((err, result) => {
    if (err) {
      console.log('err', err);
      res.status(404);
      res.end();
    } else {
      res.status(200).json(result);
      res.end();
    }
  });
});
let port = process.env.PORT || 1128;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

