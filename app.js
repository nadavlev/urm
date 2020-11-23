var cors = require("cors")
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aceRouter = require('./routes/ase');

var app = express();

//TODO: user cors only when in debug mode
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/ase', aceRouter);
app.use('/api/ase/users', usersRouter);
app.use('**', indexRouter);

module.exports = app;
