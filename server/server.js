'use strict';
require('dotenv').config();

const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const commandController = require('./command/commandController');
const mongoose = require('mongoose');

var mcache = require('memory-cache');
var path = require('path');

const mongoURI = process.env.DATABASE_URL;
mongoose.connect(mongoURI, { useMongoClient: true });

app.use(function(req, res, next) {
  if (req.url.match(/.js$|.html$|.css$|.woff|.woff2|.tff$/)) {
      res.sendFile(path.join(__dirname + '/..' + req.url));
  }
  else {
      if (req.url !== '/') {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          res.type('json');
      }
      next();
  }
});

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key);

    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.end
      res.end = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next();
    }
  }
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/find', cache(10), commandController.findCommand);

app.get('/commands', cache(10), commandController.findAll);

app.post('/command', commandController.addCommand);

app.listen(3000);

module.exports = app;
