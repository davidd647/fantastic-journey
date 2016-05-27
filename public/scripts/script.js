"use strict";

// Testing
var app = {};

app.apikey = "gpxshpia0phmqulm4aj65b7z";
app.userLocation = "Toronto";
app.returnedInfo = false;

app.init = function () {
	// app.getData(); //we want to wait for user input first
};

app.displayMoreCards = function (userLocation) {
	$.ajax({
		url: 'https://openapi.etsy.com/v2/listings/active.js',
		dataType: 'jsonp',
		data: {
			api_key: app.apikey,
			keywords: "ceramic",
			location: userLocation,
			includes: "Images:1, Shop(shop_name), Shop(url)",
			limit: 9,
			offset: app.mostRecentlyCalledElement
		},
		success: function success(data) {
			app.data = data;
			console.log("This global variable is assigned as: ", app.data);
			// $('.cards').empty();
			console.log("Location entered: ", userLocation);
			console.log("Data from Etsy: ", data);

			//Display the first 25 results
			for (var x in data.results) {
				app.displayCard(x, data);
			}

			app.mostRecentlyCalledElement += 9;
		},
		error: function error(data) {
			console.log(data, 'error');
		}
	});
};

app.displayCard = function (x, data) {
	var cardImg = $('<figure>').css('background-image', 'url(' + data.results[x].Images[0].url_570xN + ')');
	var cardUrl = data.results[x].url;
	var cardTitle = $('<figcaption>').html('<div class="wrapper"> <h3><a href="' + data.results[x].Shop.url + '">' + data.results[x].Shop.shop_name + '</a></h3>' + '<p>' + data.results[x].title + '</p> <a href=' + cardUrl + '><button class="viewItem">View Item</button></a> </div>');

	//Concatenate all the HTML elements
	var cardDiv = $('<div>').addClass('card card' + x).append(cardImg, cardTitle);

	//Post them on the page
	$('.cards').append(cardDiv);
};

app.getData = function (userLocation) {
	$.ajax({
		url: 'https://openapi.etsy.com/v2/listings/active.js',
		dataType: 'jsonp',
		data: {
			api_key: app.apikey,
			keywords: "ceramic",
			location: userLocation,
			includes: "Images:1, Shop(shop_name), Shop(url)",
			limit: 21
		},
		success: function success(data) {
			app.data = data;
			app.returnedInfo = true;
			console.log("This global variable is assigned as: ", app.data);
			$('.cards').empty();
			console.log("Location entered: ", userLocation);
			console.log("Data from Etsy: ", data);

			//Display the first 25 results
			for (var x in data.results) {
				app.displayCard(x, data);
			}

			app.mostRecentlyCalledElement = 25;
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
	$('.loading-swayze').addClass('showMe');
});

$('.more_cards').on('click', function () {
	var locationInput = $('input').val();
	app.displayMoreCards(locationInput);
});

$(function () {
	$('.search').on('click', function() {
		$.smoothScroll({
			scrollTarget: '#ceramic'
		});
	});

	app.init();
});

//Infinite scroll
$(window).scroll(function () {
	if (app.returnedInfo && $(window).scrollTop() + $(window).height() == $(document).height()) {
		console.log("We're at the bottom!");
		var locationInput = $('input').val();
		app.displayMoreCards(locationInput);
	}
});