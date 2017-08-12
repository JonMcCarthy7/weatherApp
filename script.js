$(document).ready(function(){


  $.getJSON("http://ip-api.com/json", function(data){
    var lat = data.lat;
    var long = data.lon;


      var api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a9851a64cb9ff8ebeb57d5dd6af42a87`;

      $.getJSON(api, function(data){
        var weatherType =  data.weather[0].description;
        var kTemp = data.main.temp;
        var windSpeed = data.wind.speed;
        var city = data.name;
        var tempSwap = true;
        var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";



        fTemp = (kTemp*(9/5)-459.67).toFixed(2);
        var cTemp = (kTemp-273).toFixed(2);

        $('#city').html(city);
        $('#weatherType').html(weatherType);
        $('#fTemp').html(fTemp + " &#8457;");
        $('#icon').attr('src', icon);

        $('#fTemp').click(function(){
            if(tempSwap===false){
              $('#fTemp').html(fTemp + " &#8457;");
              tempSwap=true;
            } else  {
              $('#fTemp').html(cTemp + " &#8451;");
              tempSwap=false;
            }
        });

        windSpeed = (2.237*(windSpeed)).toFixed(1);
        $('#windSpeed').html(windSpeed + " mph")
      });

  });
});
