/*
Maximilian Puglielli
02/03/2020 @ 11:55pm
CS-341-B Spring-2020
Homework #3
*/

const sum = require("../public/javascripts/sum.js");
test("adds 1 + 2 to equal 3", () =>
{
    expect(sum(1, 2)).toBe(3);
})
