/*
Maximilian Puglielli
02/17/2020 @ 11:55pm
CS-341-B Spring-2020
Homework #5
*/

var express = require('express');
var router  = express.Router();
var dbquery = require("./dbms.js");

/*
const data_obj_lit =
[
	{
		topping:  "cherry",
		quantity: 2
	},
	{
		topping:  "plain",
		quantity: 6
	},
	{
		topping:  "chocolate",
		quantity: 3
	}
];
*/

const data_obj_lit = dbquery.dbquery();

const data_json = JSON.stringify(data_obj_lit);

router.post('/', function(req, res, next)
{
	res.json(data_json);
});

module.exports = router;
