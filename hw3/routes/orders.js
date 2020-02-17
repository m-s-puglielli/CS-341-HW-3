/*
Maximilian Puglielli
02/17/2020 @ 11:55pm
CS-341-B Spring-2020
Homework #5
*/

var express = require('express');
var router  = express.Router();
//var dbquery = require("./dbms.js");


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


//const quantities = dbquery.dbquery("select QUANTITY from ORDERS where MONTH='", "");

//const data_obj_lit = ;

//const data_json = JSON.stringify(data_obj_lit);

router.post('/', function(req, res, next)
{
	console.log("Testing");
	const str = req.body.text;
	console.log(`String = ${str}`);
//	res.json(data_json);
	res.send(data_obj_lit);
});

module.exports = router;
