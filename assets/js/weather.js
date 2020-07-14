var cityInputEl = document.getElementById('cityInput');
var cityFormEl = document.getElementById('city-form')
var currentWeatherEl = document.getElementById('current-weather')
var forecastLabelEl = document.getElementById('forecast-label')
var forecastWeatherEl = document.getElementById('forecast')
var pastCities = document.getElementById('past-city')
var today = moment().format("MM/DD/YYYY")

var cities = []

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
    var apiURLtwo = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=a39ef6ecc7e9e0847da514b5eeb819bb"
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
    cities.push(cityInput)
    //console.log(cities)
    if (cityInput) {
        getCurrentWeather(cityInput);
        cityInputEl.value = "";
        getForecastWeather(cityInput);
        savecities();
        savedCitiesBtn();        
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
    currentCityEl.textContent = weather.name + " (" + today +")"
    var currentIcon = document.createElement("img")
    currentIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png")
    var currentTempEl = document.createElement("div")
    currentTempEl.textContent = "Temperature: " + weather.main.temp + "° F"
    var currentHumidity = document.createElement("div")
    currentHumidity.textContent = "Humidity: " + weather.main.humidity + " %"
    var windSpeedEl = document.createElement("div")
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH"
    var uvIndex = document.createElement("div")
    uvIndex.textContent = "UV Index: " + uv
    //console.log(uv);
    currentCityEl.appendChild(currentIcon)
    currentWeatherEl.appendChild(currentCityEl)
    currentWeatherEl.appendChild(currentTempEl)
    currentWeatherEl.appendChild(currentHumidity)
    currentWeatherEl.appendChild(windSpeedEl)
    currentWeatherEl.appendChild(uvIndex)
}

var displayForecastWeather = function(forecast, searchTerm) {
    var forecastArray = [
        {
            day: moment(forecast.list[7].dt * 1000).format("MM/DD/YYYY"),
            icon: forecast.list[7].weather[0].icon,
            temp: forecast.list[7].main.temp,
            humid: forecast.list[7].main.humidity,
        },
        {
            day: moment(forecast.list[8].dt * 1000).format("MM/DD/YYYY"),
            icon: forecast.list[15].weather[0].icon,
            temp: forecast.list[15].main.temp,
            humid: forecast.list[15].main.humidity,
        },
        {
            day: moment(forecast.list[23].dt * 1000).format("MM/DD/YYYY"),
            icon: forecast.list[23].weather[0].icon,
            temp: forecast.list[23].main.temp,
            humid: forecast.list[23].main.humidity,
        },
        {
            day: moment(forecast.list[31].dt * 1000).format("MM/DD/YYYY"),
            icon: forecast.list[31].weather[0].icon,
            temp: forecast.list[31].main.temp,
            humid: forecast.list[31].main.humidity,
        },
        {
            day: moment(forecast.list[39].dt * 1000).format("MM/DD/YYYY"),
            icon: forecast.list[39].weather[0].icon,
            temp: forecast.list[39].main.temp,
            humid: forecast.list[39].main.humidity,
        },
        
    ]

    //console.log(forecastArray)

    if (forecast.length === 0) {
        forecastWeatherEl.textContent = "Forecast not available.";
        return;
    } 
    else {
        forecastWeatherEl.textContent = ""
        forecastLabelEl.textContent = "5-Day Forecast:"
        for (var i = 0; i < forecastArray.length; i++) {
            //var forecastDate = forecastArray.day
            //console.log(forecast.list[i].dt)
            var eachForecast = document.createElement("div")
            eachForecast.classList="card text-white bg-primary p-1"
            eachForecast.setAttribute("id", forecastArray[i])
            var eachForecastDate = document.createElement("p")
            eachForecastDate.classList="card-title"
            eachForecastDate.textContent = forecastArray[i].day
            var eachIcon = document.createElement("img")
            eachIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastArray[i].icon + ".png")
            var eachTemp = document.createElement("p")
            eachTemp.textContent = "Temp: " + forecastArray[i].temp + "° F"
            eachTemp.classList="card-text"
            var eachHumidity = document.createElement("p")
            eachHumidity.textContent = "Humidity: " + forecastArray[i].humid + " %"
            eachHumidity.classList="card-text"
            
            eachForecast.appendChild(eachForecastDate)
            eachForecast.appendChild(eachIcon)
            eachForecast.appendChild(eachTemp)
            eachForecast.appendChild(eachHumidity)
            forecastWeatherEl.appendChild(eachForecast)

        }
    }
}

var savedCitiesBtn = function() {
    pastCities.textContent = ""
    prevCities = localStorage.getItem("prevCities")
    prevCities = JSON.parse(prevCities)
    for (var i = 0; i < prevCities.length; i++) {
        var prevCitiesBtn = document.createElement("btn")
        prevCitiesBtn.setAttribute("id", prevCities[i])
        prevCitiesBtn.setAttribute("type", "button")
        prevCitiesBtn.classList = "btn btn-outline-secondary btn-block"
        prevCitiesBtn.textContent = prevCities[i]
        pastCities.appendChild(prevCitiesBtn)
    }
}

var savecities = function() {
    localStorage.setItem("prevCities", JSON.stringify(cities));
};

var savedCitiesBtnHandler = function() {
    //event.preventDefault();
    //console.log(event);
    var cityInput = event.target.getAttribute("id");
    //console.log(cities)
    if (cityInput) {
        getCurrentWeather(cityInput);
        //cityInputEl.value = "";
        getForecastWeather(cityInput);
    }
}


// getCurrentWeather("nashville", "tn");
cityFormEl.addEventListener("submit", citySubmitHandler);
pastCities.addEventListener("click", savedCitiesBtnHandler);
savedCitiesBtn();
