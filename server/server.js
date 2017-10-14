'use strict';
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mcache = require('memory-cache');
const path = require('path');
const commandController = require('./command/commandController');
const mongoose = require('mongoose');

const app = express();
const mongoURI = process.env.DATABASE_URL;

mongoose.connect(mongoURI, { useMongoClient: true });

app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.url.match(/.js$|.html$|.css$|.woff|.woff2|.tff$/)) {
    res.sendFile(path.join(__dirname + '/..' + req.url));
  } else {
    if (req.url !== '/') {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.type('json');
    }
    next();
  }
});

const cache = (duration) => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedBody = mcache.get(key);

    if (cachedBody) {
      res.send(cachedBody);
      return;
    }
    res.sendResponse = res.end;
    res.end = (body) => {
      mcache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  };
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../index.html'));
});

app.get('/find', cache(10), commandController.findCommand);

app.get('/commands', cache(10), commandController.findAll);

app.post('/command', commandController.addCommand);

app.listen(3000);

module.exports = app;
