// Testing
var app = {};

app.apikey = "gpxshpia0phmqulm4aj65b7z";
app.userLocation = "Toronto";
app.returnedInfo = false;

app.init = function(){
	// app.getData(); //we want to wait for user input first
};

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

app.parseShopName = function(storeNameNoSpaces){
	// console.log("storeNameNoSpaces: ", storeNameNoSpaces);
	
	var storeNameArray = storeNameNoSpaces.match(/[A-Z][a-z]+/g);
	var storeNameWithSpaces = "";
	var x=0;
	
	for (x in storeNameArray){
		storeNameWithSpaces += storeNameArray[x] + " ";
	}
	if (storeNameWithSpaces === ""){
		storeNameWithSpaces = storeNameNoSpaces;
	}

	return storeNameWithSpaces;
}

app.displayCard = function(x, data){
	var cardImg = $('<figure>').css('background-image','url('+data.results[x].Images[0].url_570xN+')');
	var cardUrl = data.results[x].url;
	var parsedShopName = app.parseShopName(data.results[x].Shop.shop_name);
	var cardTitle = $('<figcaption>').html('<div class="wrapper"> <h3><a href="' + data.results[x].Shop.url + '">' + parsedShopName + '</a></h3>' + '<p>' + data.results[x].title + '</p> <a href=' + cardUrl + '><button class="viewItem">View Item</button></a> </div>');

	//Concatenate all the HTML elements
	var cardDiv = $('<div>').addClass('card card'+x).append(cardImg, cardTitle);

	//Post them on the page
	$('.cards').append(cardDiv);
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
			app.data = data;
			app.returnedInfo = true;
			console.log("This global variable is assigned as: ",app.data);
			$('.cards').empty();
			console.log("Location entered: ", userLocation);
			console.log("Data from Etsy: ", data);


			//Display the first 25 results
			for (var x in data.results){
				app.displayCard(x, data);
			}
			app.mostRecentlyCalledElement = 25;
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
	$('.loading-swayze').show();
});

$('.more_cards').on('click',function(){
	var locationInput = $('input').val();
	app.displayMoreCards(locationInput);
});

$(function(){
	$('input[type="submit"]').on('submit', function(){
		$.smoothScroll({
			scrollTarget: '#ceramic'
		});
	});

	app.init();
});

//Infinite scroll
$(window).scroll(function(){
	if ((app.returnedInfo) && ($(window).scrollTop() + $(window).height() == $(document).height())){
		console.log("We're at the bottom!");

		var locationInput = $('input').val();
		app.displayMoreCards(locationInput);

	}
});
