/**
 * Maximilian Puglielli
 * 02/17/2020 @ 11:55pm
 * CS-341-B Spring-2020
 * Homework #5
 */

/*
 * When the user clicks the order button:
 *     if the word 'vegan' in any case is mentioned:
 *         send an alert() saying disclaiming that cheesecake contains dairy
 *     otherwise:
 *         delete the textarea and button elements,
 *         and add an element saying "Thany You! Your order has been placed"
 */
function order_click()
{
	var text = $.trim($("#order_textarea").val());
	text = text.toLowerCase();
	if (text.includes("vegan"))
	{
		alert("WARNING: Cheesecake contains dairy!");
	}
	else
	{
		const order_textarea_element = document.getElementById("order_textarea");
		const order_button_element   = document.getElementById("order_button");
		order_textarea_element.parentNode.removeChild(order_textarea_element);
		order_button_element  .parentNode.removeChild(order_button_element);

		const parent = document.getElementById("order_form");
		const new_element = document.createElement("p");
		new_element.setAttribute('id', "order_response");
		new_element.innerHTML = "Thank you! Your order has been placed";
		parent.appendChild(new_element);
	}
}

/**
 * When the user clicks on the button,
 *     toggle between hiding and showing the dropdown content
 */
function dropdown_click()
{
	document.getElementById("months").classList.toggle("show");
}

/**
 * After the DOM has rendered, define the following listeners
 */
$(document).ready(function()
{
	$("#order_button").click(function()
	{
		const quantity = document.getElementById("quantity_selector").value;
		let topping;
		topping = document.getElementById("plain").checked ? "plain" : topping;
		topping = document.getElementById("chocolate").checked ? "chocolate" : topping;
		topping = document.getElementById("cherry").checked ? "cherry" : topping;

		$.post('/neworders?type=order&quantity=' + quantity + '&topping=' + topping,
		function()
		{
			console.log("SUCCESS");
		});
	});

	$("#months > a").click(function()
	{
		let str = $(this).text().slice(0,3);
		$("#month_button").text(str);
		str = str.toUpperCase();
		$.post('/orders?type=ask&month=' + str, null,
		function(data)
		{
			const quantity_list = document.getElementById("quantity_list");
			quantity_list.innerHTML = "";
			data.forEach(function(obj)
			{
				let str = obj.quantity + " " + obj.topping;
				let li = document.createElement("li");
				li.appendChild(document.createTextNode(str));
				quantity_list.appendChild(li);
			});
		});
	});

	// Close the dropdown if the user clicks outside of it
	window.onclick = function(event)
	{
		if (! event.target.matches('.dropbtn'))
		{
			var dropdowns = document.getElementsByClassName("dropdown-content");
			for (let i = 0; i < dropdowns.length; i++)
			{
				var openDropdown = dropdowns[i];
				if (openDropdown.classList.contains('show'))
				{
					openDropdown.classList.remove('show');
				}
			}
		}
	}
});
