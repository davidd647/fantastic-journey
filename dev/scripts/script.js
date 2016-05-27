// Testing
var app = {};

app.apikey = "gpxshpia0phmqulm4aj65b7z";
app.userLocation = "Toronto";

app.init = function(){
	// app.getData(); //we want to wait for user input first

	// When user submits their location, a loading page will show up briefly until the results are revealed!
}

app.displayMoreCards = function(userLocation){
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
		success: function(data){
			app.data = data;
			console.log("This global variable is assigned as: ",app.data);
			// $('.cards').empty();
			console.log("Location entered: ", userLocation);
			console.log("Data from Etsy: ", data);

			//Display the first 25 results
			for (var x in data.results){
				app.displayCard(x, data);
			}

			app.mostRecentlyCalledElement += 9;
		},
		error: function(data){
			console.log(data,'error');
		}
	});
}

app.displayCard = function(x, data){
	var cardImg = $('<figure>').css('background-image','url('+data.results[x].Images[0].url_570xN+')');

	var cardUrl = data.results[x].url;
	
	var cardTitle = $('<figcaption>').html('<div class="wrapper"> <h3><a href="' + data.results[x].Shop.url + '">' + data.results[x].Shop.shop_name + '</a></h3>' + '<p>' + data.results[x].title + '</p> <a href=' + cardUrl + '><button class="viewItem">View Item</button></a> </div>');

	$('.search').on('click', function(){
		$('.loading').addClass('showMe');
	});
};

app.getData = function(userLocation){
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
		success: function(data){
			$('.cards').empty();
			console.log("Location entered: ", userLocation);
			console.log("Data from Etsy: ", data);

			// when results are loaded, loading page will disappear

			// setTimeout(function() {
			// 	$('body').addClass('loaded');
			// });

			var x = 0;
			for(x in data.results){

				var cardImg = $('<figure>').css('background-image','url('+data.results[x].Images[0].url_570xN+')');
				var cardUrl = data.results[x].url;
				var cardTitle = $('<figcaption>').html("<a href=" + cardUrl + ">" + data.results[x].title +"</a>");

				//Concatenate all the HTML elements
				var cardDiv = $('<article>').addClass('card card'+x).append(cardImg, cardTitle);

				//Post them on the page
				$('.cards').append(cardDiv);

				//Display the first 25 results
				for (var x in data.results){
					app.displayCard(x, data);
				}
			}
		},
		error: function(data){
			console.log(data,'error');
		}
	});
};

$('.search').on('click', function(e){
	e.preventDefault(); //keep screen from refreshing when user clicks submit

	var locationInput = $('input').val();
	app.getData(locationInput);
	$('.more_cards').show();
});

$('.more_cards').on('click',function(){
	var locationInput = $('input').val();
	app.displayMoreCards(locationInput);
});

$(function(){
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



//Track where the user is on the screen

//Start actually paying attention after they've submitted a location

//When they're at the bottom


