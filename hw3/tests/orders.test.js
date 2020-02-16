/*
Maximilian Puglielli
02/10/2020 @ 11:55pm
CS-341-B Spring-2020
Homework #4
*/

const app = require("../app");
const http = require("http");
var serverVal;

beforeAll(() =>
{
	serverVal = app.listen(3000);
});

const orders = require("../routes/orders.js");
test("checks if orders.js posts a valid json object", done =>
{
	const options = {
		hostname: "localhost",
		port: "3000",
		path: "/orders",
		method: "POST"
	};

	var bodyChunks = [];
	http.get(options, function(result)
	{
		result.on("data", function(chunk)
		{
			bodyChunks.push(chunk);
		}).on("end", function()
		{
			let body = Buffer.concat(bodyChunks);
			try
			{
				JSON.parse(body);
				done();
			}
			catch (e)
			{
				done(e);
			}
		});
	});
});

afterAll(() =>
{
	serverVal.close();
});
