#!/usr/bin/env node
'use strict';

// dependencies and config
let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let config = require('./config');

// express app set up
let app = express();

app.set('view engine', 'ejs');
app.disable('etag'); // stackoverflow.com/questions/18811286/nodejs-express-cache-and-304-status-code
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '5mb' }));
app.listen(config.port, console.log('reichmap is running on port ' + config.port));

// routes
require('./lib/routes')(app);