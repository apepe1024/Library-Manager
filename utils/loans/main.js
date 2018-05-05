
const overdue = require('./overdue.js');
const checkedOut = require('./checked_out.js');
const allLoans = require('./all_loans.js');

module.exports = (req, res, next) => {

  if (req.query.filter === 'overdue') {
    overdue(req, res, next);
  } else if (req.query.filter === 'checked_out') {
    checkedOut(req, res, next);
  } else {
    allLoans(req, res, next);
  }
};
