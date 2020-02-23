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
	/*
	1st query:
		`select count(*) from ORDERS`
		`id = results[0]["count(*)"] or "COUNT(*)"
	2nd query:
		`insert into ORDERS (ORDERID, MONTH, DAY, QUANTITY, TOPPING, NOTES) values (${id}, '${month}', ${day}, ${quantity}, '${topping}', '${notes}')`
	*/
	console.log("submit_order: quantity = " + quantity);
	console.log("submit_order: topping = "  + topping);
	const query = `select QUANTITY from ORDERS where MONTH=\'${month}\' and TOPPING=\'${topping}\'`;
	const query = `insert into ORDERS (ORDERID, MONTH, DAY, QUANTITY, TOPPING, NOTES) values (${62}, "Sep", 27, 2, "cherry", "I WANTED CHEESECAKE FOR MY BIRTHDAY")`
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
 * This is the post function's call to send the data to the client
 */
router.post('/', function(req, res)
{
	const body = req.body;
	const quantity = body.quantity;
	const topping = body.topping;
	const notes = body.notes;
	submit_order(parseInt(req.query.quantity, 10), req.query.topping);
	console.log("\n\n\n");
});

module.exports = router;
