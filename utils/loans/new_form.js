
const books = require('../../models').books;
const patrons = require('../../models').patrons;
const getDate = require('./get_date.js');

module.exports = (req, res, next) => {

  let today = new Date();
  let addAWeek = new Date();

  addAWeek.setDate(today.getDate() + 7);

  books.findAll({ attributes: ['id', 'title'], order: ['title'] })
    .then((books) => {
      patrons.findAll({ attributes: ['id', 'first_name', 'last_name'], order: ['last_name'] })
        .then((patrons) => {
          res.render('partials/new_loan', { books: books, patrons: patrons, today: getDate(), due: getDate(addAWeek), title: 'New Loan' });
        }).catch((err) => {
          console.log(err);
          res.sendStatus(500);
          next(err);
        });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
      next(err);
    });
};
