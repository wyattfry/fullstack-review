const gh = require('../helpers/github.js');
const express = require('express');
const db = require('../database');
let app = express();

// added the following 2 lines
const parser = require('body-parser');
// const morgan = require('morgan');

app.use(express.static(__dirname + '/../client/dist'));

// added these 3 middlewares
// app.use(parser.json());
// app.use(parser.urlencoded({ extended: false }));
app.use(parser.urlencoded()); // allows POST body to be parsed
// app.use(morgan);


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  gh.getReposByUsername(req.body.username, (err, res, body) => {
    // saveToDatabase(body);
    console.log('body', JSON.parse(body));
    console.log('err', err);
    db.save(JSON.parse(body));
  });
  // req.body.username
  res.end();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  
  // console.log('received GET request at /repos');
  res.end();
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

