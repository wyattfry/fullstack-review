const gh = require('../helpers/github.js');
const express = require('express');
const db = require('../database');
let app = express();
let sampleData = require('./../sampleData.js');

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
    db.save(JSON.parse(body));
  });
  res.end();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  
  // Write a GET /repos endpoint that retrieves the top 25 repos 
  // stored in your database, sorted by the criteria you decided
  // on earlier.
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

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

