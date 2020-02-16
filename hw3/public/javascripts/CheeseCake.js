/*
Maximilian Puglielli
02/10/2020 @ 11:55pm
CS-341-B Spring-2020
Homework #4
*/

/*
When the user clicks the order button:
	if the word 'vegan' in any case is mentioned:
		send an alert() saying disclaiming that cheesecake contains dairy
	otherwise:
		delete the textarea and button elements,
		and add an element saying "Thany You! Your order has been placed"
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
		var order_textarea_element = document.getElementById("order_textarea");
		var order_button_element   = document.getElementById("order_button");
		order_textarea_element.parentNode.removeChild(order_textarea_element);
		order_button_element  .parentNode.removeChild(order_button_element);

		var parent = document.getElementById("order_form");
		var new_element = document.createElement("p");
		new_element.setAttribute('id', "order_response");
		new_element.innerHTML = "Thank you! Your order has been placed";
		parent.appendChild(new_element);
	}
}

/*
When the user clicks on the button,
	toggle between hiding and showing the dropdown content
*/
function dropdown_click()
{
	document.getElementById("months").classList.toggle("show");
}

/*
After the DOM has rendered, define the following listeners
*/
$(document).ready(function()
{
	$("#months > a").click(function()
	{
		$("#month_button").text($(this).text().slice(0,3));
		$.post('http://localhost:3000/orders', function(json_data)
		{
			console.log("flag");
			const quantity_list = document.getElementById("quantity_list");
			quantity_list.innerHTML = "";
			const list = JSON.parse(json_data);
			list.forEach(function(obj)
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
