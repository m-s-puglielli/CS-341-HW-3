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
 * @param {int}      quantity
 * @param {string}   topping
 * @param {string}   notes
 * @param {function} callback
 */
function submit_order(quantity, topping, notes, callback)
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
	console.log("submit_order: notes = " + notes);
	let query = `select count(*) from ORDERS`;
	dbms.dbquery(query,
	function(err, result)
	{
		console.log("First Query's callback");
		if (err != false)
		{
			console.log("ERROR: neworders.js | submit_order() - Error connecting to database with dbquery() with error code: " + err);
		}
		else if (result === null)
		{
			console.log("ERROR: neworders.js | submit_order() - param: 'result' is null");
		}
		else
		{
			const id = results[0]["COUNT(*)"];
			let query = `insert into ORDERS (ORDERID, MONTH, DAY, QUANTITY, TOPPING, NOTES) values (${id}, 'September', 27, ${quantity}, '${topping}', '${notes}')`;
			dbms.dbquery(query,
			function(err, result)
			{
				console.log("Nested Query's callback")
				if (err != false)
				{
					console.log("ERROR: neworders.js | submit_order() - Error connecting to database with dbquery() with error code: " + err);
				}
				else if (result === null)
				{
					console.log("ERROR: neworders.js | submit_order() - param: 'result' is null");
				}
				else
				{
					console.log("submit_order: result =");
					console.log(result);
				}
			});
		}
	});
}

/**
 * This is the post function's call to send the data to the client
 */
router.post('/', function(req, res)
{
	const quantity = req.body.quantity;
	const topping  = req.body.topping;
	const notes    = req.body.notes;
	submit_order(parseInt(quantity, 10), topping, notes,
	function()
	{
		console.log("submit_orders was successful")
	});
	res.send();
	console.log("\n\n\n");
});

module.exports = router;
