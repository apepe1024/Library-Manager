
const patrons = require('../../models').patrons;

module.exports = (req, res, next) => {

  const pagingLimit = 10;
  const page = req.params.page;

  patrons.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit, order: ['last_name'] })
    .then((patrons) => {
      res.render('partials/patrons', { count: patrons.count, patrons: patrons.rows, title: 'Patrons' });
    }).catch(function (err) {
      console.log(err);
      res.sendStatus(500);
      next(err);
    });
};
