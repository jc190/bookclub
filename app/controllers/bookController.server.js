'use strict';

var https = require('https');
var Books = require('../models/books.js');
var configAuth = require('../config/auth.js');

function bookController () {
  this.addBook = function (req, res, next) {

    // Sanitize user input
    var sanitizedInput = check('bookTitle').exists().escape();
    var url = 'https://www.googleapis.com/books/v1/volumes?key='
      + configAuth.googleBooksAuth.key
      + '&q=' + sanitizedInput;

    // Look up book on Google Books api
    https.get(url, function (res) {
      console.log(res.statusCode);
      res.on('data', function (d) {
        console.log(d);
      })
    })
    // Books.findOne({ idsn: })
  }
}
