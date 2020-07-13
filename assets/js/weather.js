var cityInputEl = document.getElementById('cityInput');
var cityFormEl = document.getElementById('city-form')
var currentWeatherEl = document.getElementById('current-weather')
var forecastLabelEl = document.getElementById('forecast-label')
var forecastWeatherEl = document.getElementById('forecast')
var today = moment().format("MM/DD/YYYY")



var getCurrentWeather = function(city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=a39ef6ecc7e9e0847da514b5eeb819bb"
    //var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=a39ef6ecc7e9e0847da514b5eeb819bb&lat=" + lat + "&lon=" + lon
    
    fetch(apiURL)
        .then(function(response) {
            if (response.ok) {
                response.json().then(async(data) => {
                    var lat = data.coord.lat
                    var lon = data.coord.lon
                    let response = await fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=a39ef6ecc7e9e0847da514b5eeb819bb")
                    let uv = await response.json()
                    let uvIndex = await uv.value
                    displayCurrentWeather(data, city, uvIndex);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect")
        })
};

var getForecastWeather = function(city) {
    var apiURLtwo = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&units=imperial&appid=a39ef6ecc7e9e0847da514b5eeb819bb"
    fetch(apiURLtwo)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    //console.log(data)
                    displayForecastWeather(data, city)                    
                });
            } else {
            alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect")
        })
}

var citySubmitHandler = function(event) {
    event.preventDefault();
    //console.log(event);
    var cityInput = cityInputEl.value.trim();
    if (cityInput) {
        getCurrentWeather(cityInput);
        cityInputEl.value = "";
        getForecastWeather(cityInput);
    } else {
        alert("Please enter a City")
    }
}

var displayCurrentWeather = function(weather, searchTerm, uv) {
    //console.log(weather);
    //console.log(searchTerm);
    if (weather.weather.description === null) {
        currentWeatherEl.textContent = "Weather not available.";
        return;
    }
    currentWeatherEl.textContent = ""
    //var cityName = weather.name
    var currentCityEl = document.createElement("div")
    //currentCityEl.classList = ""
    currentCityEl.textContent = weather.name + " " + today
    var currentTempEl = document.createElement("div")
    currentTempEl.textContent = "Temperature: " + weather.main.temp + "° F"
    var currentHumidity = document.createElement("div")
    currentHumidity.textContent = "Humidity: " + weather.main.humidity + " %"
    var windSpeedEl = document.createElement("div")
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH"
    var uvIndex = document.createElement("div")
    uvIndex.textContent = "UV Index: " + uv
    //console.log(uv);
    currentWeatherEl.appendChild(currentCityEl)
    currentWeatherEl.appendChild(currentTempEl)
    currentWeatherEl.appendChild(currentHumidity)
    currentWeatherEl.appendChild(windSpeedEl)
    currentWeatherEl.appendChild(uvIndex)
}

var displayForecastWeather = function(forecast, searchTerm) {
    if (forecast.length === 0) {
        forecastWeatherEl.textContent = "Forecast not available.";
        return;
    } 
    else {
        forecastLabelEl.textContent = "5-Day Forecast:"
        
        for (var i = 0; i < forecast.list.length; i++) {
            var forecastDate = moment(forecast.list[i].dt).format("MM/DD/YYYY")
            console.log(forecast.list[i].dt)
            var eachForecast = document.createElement("div")
            //eachForecast.classList=""
            eachForecast.setAttribute("id", forecast[i])
            var eachForecastDate = document.createElement("div")
            eachForecastDate.textContent = forecastDate

            eachForecast.appendChild(eachForecastDate)
            forecastWeatherEl.appendChild(eachForecast)

        }
    }
}

// getCurrentWeather("nashville", "tn");
cityFormEl.addEventListener("submit", citySubmitHandler);