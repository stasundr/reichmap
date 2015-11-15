#!/usr/bin/env node
'use strict';

// dependencies and config
var express = require('express');
var morgan = require('morgan');
var multer = require('multer');
var bodyParser = require('body-parser');
var config = require('./config');

// express app set up
var app = express();
var upload = multer({ dest: 'uploads/' });
var anno = undefined;
var data = undefined;
var drawList = [];

app.set('view engine', 'ejs');
app.disable('etag'); // stackoverflow.com/questions/18811286/nodejs-express-cache-and-304-status-code
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '5mb' }));
app.listen(config.port, console.log('reichmap is running on port ' + config.port));

// routes
require('./lib/routes')(app, upload, anno, data, drawList);