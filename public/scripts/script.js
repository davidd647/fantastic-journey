"use strict";

// Testing
var app = {};

app.apikey = "gpxshpia0phmqulm4aj65b7z";
app.userLocation = "Toronto";

app.init = function () {
	// app.getData(); //we want to wait for user input first
};

app.displayCard = function (x, data) {
	var cardImg = $('<figure>').css('background-image', 'url(' + data.results[x].Images[0].url_570xN + ')');
	var cardUrl = data.results[x].url;
	var cardTitle = $('<h3>').html("<a href=" + cardUrl + ">" + data.results[x].title + "</a>");

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
<<<<<<< HEAD
			includes: "Images:1, Shop(shop_name)"
=======
			includes: 'Images:1',
			limit: 100
>>>>>>> 4ff007f541900792f0b9ece410f4bc877c9e5d13
		},
		success: function success(data) {
			app.data = data;
			console.log("This global variable is assigned as: ", app.data);
			$('.cards').empty();
			console.log("Location entered: ", userLocation);
			console.log("Data from Etsy: ", data);
<<<<<<< HEAD

			//Display the first 25 results
			for (var x = 0; x < 25; x++) {
				app.displayCard(x, data);
=======
			var x = 0;
			for (x in data.results) {

				var cardImg = $('<figure>').css('background-image', 'url(' + data.results[x].Images[0].url_570xN + ')');
				var cardUrl = data.results[x].url;
				var cardTitle = $('<figcaption>').html('<a href=' + cardUrl + '> <div class="wrapper"> <h3>' + data.results[x].Shop.shop_name + '</h3>' + '<p>' + data.results[x].title + '</p> </div> </a>');

				//Concatenate all the HTML elements
				var cardDiv = $('<article>').addClass('card card' + x).append(cardImg, cardTitle);

				//Post them on the page
				$('.cards').append(cardDiv);
>>>>>>> ebca4520001436648befa9dadd3ab95424d888b8
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
});

$('.more_cards').on('click', function () {
	//Display next 10 results
	if (app.mostRecentlyCalledElement < 100) {
		for (var x = app.mostRecentlyCalledElement; x < app.mostRecentlyCalledElement + 10; x++) {
			app.displayCard(x, app.data);
			if (x >= 99) {
				app.mostRecentlyCalledElement = 100;
			}
		}
		app.mostRecentlyCalledElement += 10;
	} else {
		$('more_cards').append("There are no more items...");
	}
});

$(function () {
	app.init();

	// function smoothScroll(){
	// 	$('a[href^="#"]').on('click',function (e) {
	//     e.preventDefault();

	//     var target = this.hash;
	//     var $target = $(target);

	//     $('html, body').stop().animate({
	//         'scrollTop': $target.offset().top
	//     }, 1000, 'swing', function () {
	//         window.location.hash = target;
	//     });
	// 	});
	// };
});