
const overdueBooks = require('./overdue.js');
const checkedOutBooks = require('./checked_out.js');
const allBooks = require('./all_books.js');

module.exports = (req, res, next) => {
  if (req.query.filter === 'overdue') {
    overdueBooks(req, res, next);
  } else if (req.query.filter === 'checked_out') {
    checkedOutBooks(req, res, next);
  } else {
    allBooks(req, res, next);
  }
};
