
const books = require('../../models').books;
const loans = require('../../models').loans;
const patrons = require('../../models').patrons;

const getDate = require('./get_date.js');

module.exports = (req, res, next) => {
  loans.findById(req.params.id, { include: [{ model: books }, { model: patrons }] })
    .then((loan) => {
      res.render('partials/return_book', { loan: loan, today: getDate(), title: 'Patron: Return Book' });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
      next(err);
    });
};
