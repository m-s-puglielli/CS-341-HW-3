/*
Maximilian Puglielli
02/10/2020 @ 11:55pm
CS-341-B Spring-2020
Homework #4
*/

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next)
{
	res.send('respond with a resource');
});

module.exports = router;
