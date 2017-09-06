'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);
mongoose.connect(`mongodb://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@ds139619.mlab.com:39619/book_club`);
mongoose.Promise = global.Promise;


// Set up pug template engine
app.set('views', './views');
app.set('view engine', 'pug');

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Pretty print html from express
app.locals.pretty = true;

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
