$(document).ready(function(){

  var long;
  var lat;
  var fTemp;
  var cTemp;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
            long = position.coords.longitude
            lat = position.coords.latitude
            $('#data').html("lat: " + lat + "<br>long: " + long);


      var api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a9851a64cb9ff8ebeb57d5dd6af42a87`;

      $.getJSON(api, function(data){
        var weatherType =  data.weather[0].description;
         kTemp = data.main.temp;
        var windSpeed = data.wind.speed;
        var city = data.name;
        var tempSwap = true;

        fTemp = (kTemp*(9/5)-459.67).toFixed(2);
        cTemp = (kTemp-273).toFixed(2);

        $('#city').html(city)
        $('#weatherType').html(weatherType)
        $('#fTemp').html(fTemp)

        $('#fTemp').click(function(){
            if(tempSwap===false){
              $('#fTemp').html(cTemp);
              tempSwap=true;
            } else  {
              $('#fTemp').html(fTemp);
              tempSwap=false;
            }
        });







        $('#windSpeed').html(windSpeed)
      });
    });
  }


});
