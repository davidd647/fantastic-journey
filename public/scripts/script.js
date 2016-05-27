"use strict";

// Testing
var app = {};

app.apikey = "gpxshpia0phmqulm4aj65b7z";
app.userLocation = "Toronto";

app.init = function () {
	// app.getData(); //we want to wait for user input first

	// When user submits their location, a loading page will show up briefly until the results are revealed!

	// $('.search').on('click', function(){
	// 	$('.loading').addClass('showMe');
	// });

	// setTimeout(function() {
	// 	$('body').addClass('loaded');
	// });
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

				var cardImg = $('<figure>').css('background-image', 'url(' + data.results[x].Images[0].url_570xN + ')');
				var cardUrl = data.results[x].url;
				var cardTitle = $('<figcaption>').html("<a href=" + cardUrl + ">" + data.results[x].title + "</a>");

				//Concatenate all the HTML elements
				var cardDiv = $('<article>').addClass('card card' + x).append(cardImg, cardTitle);

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