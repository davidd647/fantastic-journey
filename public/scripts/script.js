"use strict";

// Testing
var app = {};

app.apikey = "gpxshpia0phmqulm4aj65b7z";
app.userLocation = "Toronto";

app.init = function () {
	app.getData();
};

app.getData = function () {
	$.ajax({
		url: 'https://openapi.etsy.com/v2/listings/active.js',
		dataType: 'jsonp',
		data: {
			api_key: app.apikey,
			keywords: "ceramic",
			location: app.userLocation,
			includes: 'Images:1'
		},
		success: function success(data) {
			console.log(data, 'success');
			var x = 0;
			for (x in data.results) {
<<<<<<< HEAD
				$('div.cards').append('<img src="' + data.results[x].Images[0].url_570xN + '" alt="' + data.results[x].title + '">').append('<h3>' + data.results[x].title + '</h3>').append('<p class="description">' + data.results[x].description + ' </p>');
=======

				var cardImg = $('<img>').attr('src', data.results[x].Images[0].url_570xN);
				var cardTitle = $('<h3>').text(data.results[x].title);
				var cardDescription = $('<p>').text(data.results[x].description);

				//Concatenate all the HTML elements
				var cardDiv = $('<div>').addClass('card card' + x).append(cardImg, cardTitle, cardDescription);

				//Post them on the page
				$('.cards').append(cardDiv);
>>>>>>> c02973e2d2f47138550ac2dd6ad305a36c031f1e
			}
		},
		error: function error(data) {
			console.log(data, 'error');
		}
	});
};

$(function () {
	app.init();
});