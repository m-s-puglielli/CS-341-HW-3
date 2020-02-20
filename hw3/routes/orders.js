/*
Maximilian Puglielli
02/17/2020 @ 11:55pm
CS-341-B Spring-2020
Homework #5
*/

var express = require('express');
var router  = express.Router();
var dbquery = require('./dbms');

/*
const data =
[
	{
		topping:  "plain",
		quantity: 6
	},
	{
		topping:  "chocolate",
		quantity: 3
	},
	{
		topping:  "cherry",
		quantity: 2
	}
];
*/

function order(month, topping, callback)
{
	let quantity = 0;
	dbquery("select QUANTITY from ORDERS where MONTH='" + month + "' and TOPPING='" + topping + "';",
	function(err, result)
	{
		if (err != false)
		{
			console.log("ERROR: orders.js | order() - Error connecting to database with dbquery() with error code: " + err);
			return;
		}
		else if (result === null)
		{
			console.log("ERROR: orders.js | order() - param: 'result' is null");
			return;
		}
		else
		{
			result.forEach(function(num)
			{
				quantity += num;
			});
		}
		callback(quantity);
	});
	return quantity;
}

function count_orders(month)
{
	const num_plain     = order(month, "plain");
	const num_chocolate = order(month, "chocolate");
	const num_cherry    = order(month, "cherry");
	rtn =
	[
		{
			topping: "plain",
			quantity: num_plain
		},
		{
			topping: "chocolate",
			quantity: num_chocolate
		},
		{
			topping: "cherry",
			quantity: num_cherry
		}
	];
	return rtn;
}

router.post('/', function(req, res, next)
{
	const data = count_orders(req.query.month);
	res.send(data);
});

module.exports = router;
