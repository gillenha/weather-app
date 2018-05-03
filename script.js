$(document).ready(function() {
	//store variables
  var url = "https://api.darksky.net/forecast/2eed4251422ee75f33471b468532f963/"
  var lat;
  var long;
  $icon = $("#icon");
  $temp = $("#temp");
  $desc = $("#desc");
  $wind = $("#wind");
  $forecast = $("#forecast"); 

  function getLocation() {
    var location = navigator.geolocation.getCurrentPosition(showLocation);
  }

  function showLocation(pos) {
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    weather(lat, long);
  }

  getLocation();

  function weather(lat, long) {
  	url = url + lat + "," + long;

  	// call the Dark Sky info in a jsonp object using ajax (use single quote strings)
  	$.ajax({
  		type: 'GET', //use a GET request to read data
  		url: url,
  		dataType: 'jsonp',
  		success: function(response) {
  			//store current conditions in variables and call them with jQuery
  			var tempInFar = Math.round(response.currently.temperature);
  			var desc = response.currently.summary;
  			var wind = Math.round(response.currently.windSpeed);

  			$("#temp").html(tempInFar + "&deg;");
  			$("#desc").html(desc);
  			$("#wind").html(wind + " mph");

  			//get them skycons
  			var skycons = new Skycons({"color": "black"});
  			var icon = response.currently.icon;
  			skycons.add("icon1", icon);
  			skycons.play();

  			//change between F and C
  			var units = response.flags.units; 

  			$(document).on("click", ".btn", function() {
  				if (units === "us") {
  					$temp.html("");
  					var celsius = Math.round((tempInFar - 32) / 1.8);
  					$("#temp").html(celsius + "&deg;");
  					units = "si";
  				} else {
  					$temp.html("");
  					$("#temp").html(tempInFar + "&deg;");
  					units = "us";
  				}
  			});
  		}
  	});
  }
});