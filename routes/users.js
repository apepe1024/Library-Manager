var router = require('express').Router();

// Handling GET Request to /
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
