"use strict";

// Testing
var app = {};

app.apikey = "gpxshpia0phmqulm4aj65b7z";
app.userLocation = "Toronto";

app.init = function () {
	// app.getData(); //we want to wait for user input first
};

app.getData = function (userLocation) {
	$.ajax({
		url: 'https://openapi.etsy.com/v2/listings/active.js',
		dataType: 'jsonp',
		data: {
			api_key: app.apikey,
			keywords: "ceramic",
			location: userLocation,
			includes: 'Images:1'
		},
		success: function success(data) {
			$('.cards').empty();
			console.log("Location entered: ", userLocation);
			console.log("Data from Etsy: ", data);
			var x = 0;
			for (x in data.results) {
				var cardImg = $('<img>').attr('src', data.results[x].Images[0].url_570xN);
				var cardUrl = data.results[x].url;
				var cardTitle = $('<h3>').html("<a href=" + cardUrl + ">" + data.results[x].title + "</a>");
				// var cardDescription = $('<p>').text(data.results[x].description);

				//Concatenate all the HTML elements
				var cardDiv = $('<div>').addClass('card card' + x).append(cardImg, cardTitle);

				//Post them on the page
				$('.cards').append(cardDiv);
			}
		},
		error: function error(data) {
			console.log(data, 'error');
		}
	});
};

$('.search').on('click', function (e) {
	e.preventDefault(); //keep screen from refreshing when user clicks submit

	var locationInput = $('input').val();
	app.getData(locationInput);
});

$(function () {
	app.init();
});