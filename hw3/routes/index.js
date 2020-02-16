var express = require('express');
var router = express.Router();

let a = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  a = 1;
});

console.log(a);

module.exports = router;
