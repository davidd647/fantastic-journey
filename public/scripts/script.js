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
			for (x in data.results) {
				$('div.cards').append('<p class="description">' + data.results[x].title + '</p>');
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