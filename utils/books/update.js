
const books = require('../../models').books;
const loans = require('../../models').loans;
const patrons = require('../../models').patrons;

module.exports = (req, res, next) => {
  books.findById(req.params.id)
    .then((book) => {
      if (book) {
        return book.update(req.body);
      } else {
        res.sendStatus(404);
      }
    }).then((book) => {
      res.redirect('/books/' + book.id);
    }).catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        books.findAll({ include: [{ model: loans, include: [{ model: patrons }] }], where: { id: req.params.id } })
          .then((book) => {
            if (book) {

              let bookObject = {};
              let loanArray = [];
              let getLoans = JSON.parse(JSON.stringify(book));

              bookObject = {
                id: getLoans[0].id,
                title: getLoans[0].title,
                author: getLoans[0].author,
                genre: getLoans[0].genre,
                first_published: getLoans[0].first_published
              };

              for (let i = 0; i < getLoans.length; i++) {
                if (getLoans[i].loan === null) {
                  loanArray = [];
                } else {
                  loanArray.push(getLoans[i].loan);
                }
              }

              res.render('partials/book_details', { book: bookObject, loans: loanArray, title: book.title, errors: err.errors });

            } else {
              res.sendStatus(404);
            }

          }).catch((err) => {
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
