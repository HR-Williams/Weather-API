import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function kelvinToFahr(kelvin) {
  return ((kelvin - 273.15) * 9/5 + 32).toFixed(1);
};

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();
    

   function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
      // const temp = kelvinToFahr(`${response.main.temp}`);
      // $('.inFahr').text(`The temperature is Fahrenheit is ${temp}`);
      $('.inFahr').text(`The temperature is Fahrenheit is ${kelvinToFahr(response.main.temp)}`);
      $('.showFeel').text(`The temperature feels like ${response.main.feels_like} degrees.`);
    }
  });
});