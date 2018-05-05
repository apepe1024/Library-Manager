
const books = require('../../models').books;
const loans = require('../../models').loans;
const patrons = require('../../models').patrons;

module.exports = (req, res, next) => {
  patrons.findById(req.params.id, {})
    .then((patron) => {
      if (patron) {
        return patron.update(req.body);
      } else {
        res.sendStatus(404);
      }
    }).then((patron) => {
      res.redirect('/patrons/' + patron.id);
    }).catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        loans.findAll({ include: [{ model: books }, { model: patrons, where: { id: req.params.id } }] })
          .then((results) => {
            if (results) {
              let patronObject = {};
              let getLoans = JSON.parse(JSON.stringify(results));

              patronObject = {
                id: getLoans[0].patron.id,
                first_name: getLoans[0].patron.first_name,
                last_name: getLoans[0].patron.last_name,
                address: getLoans[0].patron.address,
                email: getLoans[0].patron.email,
                library_id: getLoans[0].patron.library_id,
                zip_code: getLoans[0].patron.zip_code
              };

              res.render('partials/patron_details', {
                patron: patronObject,
                results: results,
                title: getLoans[0].patron.first_name + ' ' + getLoans[0].patron.last_name,
                errors: err.errors
              });
            }
          }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
            next(err);
          });
      }
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
      next(err);
    });
};
