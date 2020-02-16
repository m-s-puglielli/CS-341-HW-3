var express = require('express');
var router = express.Router();

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

const data_json = JSON.stringify(data_obj_lit);

router.post('/', function(req, res, next)
{
	res.json(data_json);
});

module.exports = router;
