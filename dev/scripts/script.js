// Testing
var app = {};

app.apikey = "gpxshpia0phmqulm4aj65b7z";
app.userLocation = "Toronto";

app.init = function(){
	app.getData();
};

app.getData = function(){
		$.ajax({
		url: 'https://openapi.etsy.com/v2/listings/active.js',
		dataType: 'jsonp',
		data: {
			api_key: app.apikey,
			keywords: "ceramic",
			location: app.userLocation,
			includes: 'Images:1'
		},
		success: function(data){
			console.log(data,'success');
			var x = 0;
			for(x in data.results){

				var cardImg = $('<figure>').css('background-image','url('+data.results[x].Images[0].url_570xN+')');
				var cardTitle = $('<h3>').text(data.results[x].title);
				var cardDescription = $('<p>').text(data.results[x].description);

				//Concatenate all the HTML elements
				var cardDiv = $('<article>').addClass('card card'+x).append(cardImg, cardTitle, cardDescription);

				//Post them on the page
				$('.cards').append(cardDiv);
			}
		},
		error: function(data){
			console.log(data,'error');
		}
	});
};

$(function(){
	app.init();
});