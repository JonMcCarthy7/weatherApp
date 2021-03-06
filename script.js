$(document).ready(function(){

  // $.getJSON("http://ip-api.com/json", function(data){
  //   var lat = data.lat;
  //   var long = data.lon;
  //
  //     var api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a9851a64cb9ff8ebeb57d5dd6af42a87`;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      var long = position.coords.longitude;
      var lat = position.coords.latitude;

          var api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a9851a64cb9ff8ebeb57d5dd6af42a87`;


      $.getJSON(api, function(data){
        var weatherType =  titleCase(data.weather[0].description);
        var kTemp = data.main.temp;
        var windSpeed = data.wind.speed;
        var city = data.name;
        var tempSwap = true;
        var dir = degreesToDirection(data.wind.deg);
        var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

        function titleCase(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function degreesToDirection(degrees){
            var range = 360/16;
            var low = 360 - range/2;
            var high = (low + range) % 360;
            var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
            for( i in angles ) {
        	if(degrees >= low && degrees < high){
        	    return angles[i];
          }
        	low = (low + range) % 360;
        	high = (high + range) % 360;
          }
          return "N";
        }

        fTemp = (kTemp*(9/5)-459.67).toFixed(0);
        var cTemp = (kTemp-273).toFixed(0);

        $('#city').html(city);
        $('#weatherType').html(weatherType);
        $('#fTemp').html(fTemp + "&#8457;");
        $('#icon').attr('src', icon);
        $('#fTemp').click(function(){
            if(tempSwap===false){
              $('#fTemp').html(fTemp + "&#8457;");
              tempSwap=true;
            } else  {
              $('#fTemp').html(cTemp + "&#8451;");
              tempSwap=false;
            }
          });


        windSpeed = (2.237*(windSpeed)).toFixed(1);
        $('#windSpeed').html(windSpeed + "mph " + dir)
});
});
}
});
