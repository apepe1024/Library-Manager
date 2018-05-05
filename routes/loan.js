
const router = require('express').Router();

const loansMain = require('../utils/loans');

// Handling GET Request to /loans/page/:page
router.get('/loans/page/:page', (req, res, next) => {
  loansMain.main(req, res, next);
});

// Handling GET Request to /loans/new
router.get('/loans/new', (req, res, next) => {
  loansMain.new_form(req, res, next);
});

// Handling POST Request to /loans/new
router.post('/loans/new', (req, res, next) => {
  loansMain.new(req, res, next);
});

// Handling GET Request to /loans/:id/return
router.get('/loans/:id/return', (req, res, next) => {
  loansMain.return_form(req, res, next);
});

// Handling PUT Request to /loans/:id/return
router.put('/loans/:id/return', (req, res, next) => {
  loansMain.return(req, res, next);
});

module.exports = router;
