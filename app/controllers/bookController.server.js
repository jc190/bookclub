'use strict';

var https = require('https');
var Books = require('../models/books.js');
var Users = require('../models/users.js');
var { matchedData } = require('express-validator/filter');
var { escape } = require('validator');

function BookController () {
  this.addBook = function (req, res, next) {
    // Sanitize user input
    var sanitizedInput = escape(matchedData(req).bookTitle);
    var url = 'https://www.googleapis.com/books/v1/volumes?key='
      + process.env.GOOGLE_BOOKS_KEY
      + '&q=' + sanitizedInput;
    // Encode URI
    url = encodeURI(url);
    // Look up book on Google Books api
    https.get(url, function (response) {
      var data = [];
      response.setEncoding('utf8');
      response.on('data', function (chunk) {
        data.push(chunk);
      });
      response.on('end', function () {
        var parsedData = JSON.parse(data.join(''));
        if (parsedData.error) { return next() };
        var book = parsedData.items[0];
        Books.findOne({ idsn: book.id }).exec(function(err, bookInfo) {
          if (err) { throw err };
          if (!bookInfo) {
            // add book to book collection
            var newBook = new Books({
              idsn: book.id,
              title: book.volumeInfo.title,
              author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown',
              thumbnail: book.volumeInfo.imageLinks.thumbnail
            });
            newBook.save(function(err, book) {
              if (err) { throw err };
              // saved!
              addBookToUser(req.user._id, book, next);
            });
          } else {
            // add book to user's collection
            addBookToUser(req.user._id, bookInfo, next);
          }
        });
      });
    });
  }
}

function addBookToUser (userId, book, cb) {
  Users.findOne({ _id: userId }).exec(function (err, user) {
    if (err) { throw err }
    user.books.push({ info: book._id });
    user.save(function (err) {
      if (err) { throw err };
      cb();
    });
  });
}

module.exports = BookController;
