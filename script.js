apikey = "gpxshpia0phmqulm4aj65b7z";
userLocation = "Toronto";

// $.ajax({
//     url: 'https://openapi.etsy.com/v2/listings/active?api_key=gpxshpia0phmqulm4aj65b7z' + apikey,
//     dataType: 'json',
//     method:'GET',
//     params{

//     }
// }).then(function(res) {

// });
// $.getJSON();
// $.ajax({
// 	url:'https://openapi.etsy.com/v2/listings/active',
// 	data: {api_key: 'gpxshpia0phmqulm4aj65b7z'},
// 	dataType: 'jsonp',
// 	method: 'GET'
// }).then(function(res){
// 	console.log(res);
// })



// $.getJSON();
// https://openapi.etsy.com/v2/listings/active.js
// http://openapi.etsy.com/v2/shops/:shop_id/listings/active?method=GET&api_key=:api_key&fields=title,url&limit=100&includes=MainImage
//https://openapi.etsy.com/v2/listings/active?&api_key=myapikey&keywords=israel+&limit=25&offset=0&sort_on=created&sort_order=down&category=Vintage/toy
$.ajax({
	url: 'https://openapi.etsy.com/v2/listings/active.js',
	data: {
		api_key: apikey,
		keywords: "ceramic",
		location: userLocation
		// category: "children"
		// latitude(10.0, 10.0)
	},
	dataType: 'jsonp',
	success: function(data){
	    console.log(data,'success');
	    for(x in data.results){
	        $('ul')
	            .append('<li>'+data.results[x].title+'</li>');
	    }
	},
	error: function(data){
	    console.log(data,'error');        
	}
});