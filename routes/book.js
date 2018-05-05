
var router = require('express').Router();

var booksMain = require('../utils/books');

// Handling GET Request to /books/page/:page
router.get('/books/page/:page', (req, res, next) => {
  booksMain.main(req, res, next);
});

// Handling GET Request to /books/new
router.get('/books/new', (req, res, next) => {
  res.render('partials/new_book', { title: 'New Book' });
});

// Handling POST Request to /books/new
router.post('/books/new', (req, res, next) => {
  booksMain.new(req, res, next);
});

// Handling GET Request to /books/:id
router.get('/books/:id', (req, res, next) => {
  booksMain.details(req, res, next);
});

// Handling PUT Request to /books/:id
router.put('/books/:id', (req, res, next) => {
  booksMain.update(req, res, next);
});

module.exports = router;
