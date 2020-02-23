/**
 * Maximilian Puglielli
 * 02/17/2020 @ 11:55pm
 * CS-341-B Spring-2020
 * Homework #5
 */

var express = require('express');
var router  = express.Router();

// Import the database javascript file
var dbms    = require('./dbms');



/**
 *
 * @param {int} quantity
 * @param {string} topping
 * @param {function} callback
 */
function submit_order(quantity, topping)
{
	console.log("submit_order: quantity = " + quantity);
	console.log("submit_order: topping = "  + topping);
	const query = `select QUANTITY from ORDERS where MONTH=\'${month}\' and TOPPING=\'${topping}\'`;
	const query = ;
	dbms.dbquery(query,
	function(err, result)
	{
		console.log("callback function after dbquery");
		if (err != false)
		{
			console.log("ERROR: orders.js | order() - Error connecting to database with dbquery() with error code: " + err);
		}
		else if (result === null)
		{
			console.log("ERROR: orders.js | order() - param: 'result' is null");
		}
		else
		{
			;
		}
	});
}

/**
 * This function querys the database, and pulls the number of orders for a given month and topping
 *
 * @param {string} month
 * @param {string} topping
 * @param {function} callback
 */
function order(month, topping, callback)
{
	console.log("order: month = " + month);
	let quantity = 0;
	const query = `select QUANTITY from ORDERS where MONTH=\'${month}\' and TOPPING=\'${topping}\'`;
	console.log("order: query = " + query);
	dbms.dbquery(query,
	function(err, result)
	{
		console.log("callback function after dbquery");
		if (err != false)
		{
			console.log("ERROR: orders.js | order() - Error connecting to database with dbquery() with error code: " + err);
		}
		else if (result === null)
		{
			console.log("ERROR: orders.js | order() - param: 'result' is null");
		}
		else
		{
			result.forEach(
			function(obj)
			{
				console.log("order: obj =");
				console.log(obj);
				console.log("order: obj.QUANTITY = " + obj.QUANTITY);
				quantity += obj.QUANTITY;
			});
			console.log("quantity = " + quantity);
		}
		callback(quantity);
	});
}

/**
 * This function calls order() three times, once for each topping, for a given month
 *
 * @param {string} month
 * @param {function} callback
 */
function count_orders(month, callback)
{
	console.log("count_orders: month = " + month);
	let rtn = [];
	order(month, "plain",
	function(num_plain)
	{
		console.log("count_orders: num_plain = " + num_plain);
		rtn.push({ topping: "plain", quantity: num_plain });
		order(month, "chocolate",
		function(num_chocolate)
		{
			console.log("count_orders: num_chocolate = " + num_chocolate);
			rtn.push({ topping: "chocolate", quantity: num_chocolate });
			order(month, "cherry",
			function(num_cherry)
			{
				console.log("count_orders: num_cherry = " + num_cherry);
				rtn.push({ topping: "cherry", quantity: num_cherry });
				console.log("count_orders: rtn =")
				console.log(rtn);
				callback(rtn);
			});
		});
	});
}

// /**
//  * This is the post function-call to retrieve data from the client
//  */
// router.post('/', function(req, res)
// {
// });

/**
 * This is the post function's call to send the data to the client
 */
router.post('/', function(req, res)
{
	if (req.query.type === "ask")
	{
		console.log("router.post: type = " + req.query.type);
		console.log("router.post: month = " + req.query.month);
		count_orders(req.query.month,
		function(data)
		{
			console.log("router.post: data =");
			console.log(data);
			res.send(data);
		});
		console.log("\n\n\n");
	}
	else if (req.query.type === "order")
	{
		console.log("router.post: type = " + req.query.type);
		console.log("router.post: quantity = " + req.query.quantity + " topping = " + req.query.topping);
		submit_order(parseInt(req.query.quantity, 10), req.query.topping);
		console.log("\n\n\n");
	}
});

module.exports = router;
