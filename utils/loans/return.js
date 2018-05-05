
const books = require('../../models').books;
const loans = require('../../models').loans;
const patrons = require('../../models').patrons;

const getDate = require('./get_date.js');

module.exports = (req, res, next) => {
  loans.findById(req.params.id, {})
    .then((loan) => {
      if (loan) {
        return loan.update({ returned_on: req.body.returned_on });
      } else {
        res.sendStatus(404);
      }
    }).then(() => {
      res.redirect('/loans/page/1');
    }).catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        loans.findById(req.params.id, { include: [{ model: books }, { model: patrons }] })
          .then((loan) => {
            res.render('partials/return_book', { loan: loan, today: getDate(), title: 'Patron: Return Book', errors: err.errors });
          }).catch(function (err) {
            console.log(err);
            res.sendStatus(500);
            next(err);
          });
      } else {
        throw err;
      }
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
      next(err);
    });
};
