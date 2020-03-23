// $(document).ready(function() {

// **conect api == my key is "b94d8811046274c419745e122971bc95"
var APIkey = "b94d8811046274c419745e122971bc95";
//If items exist in local storage display them on on screen
var userCitySearches = JSON.parse(localStorage.getItem("userInputStorage")) || [];
// console.log(userCitySearches);

showSearchHistory();
$("#searchCity").on("click", newCitySearch);
// var userInput;


//********** */

//Call for the 5-Day Forecast
function getForecastAPI(cityName) {

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + //see this later
        cityName + "&units=imperial&appid=" + APIkey; // see this later

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log({ response, msg: "getForecastAPI" });

        // for (var i = 0; i < response.list.length; i++) {
        //     if (response.list[i].dt_txt.includes("12")) {
        //         console.log(response.list[i])

        //     }
        // }

        // //day 1
        // var dateP1 = $("<p>").text(response.list[3].dt_txt); //this is a random time need current time
        // // console.log(dateP1)
        // var weatherIcon1 = response.list[3].weather[0].icon; // this pulls the icon key
        // // console.log(weatherIcon1)
        // var weatherIconImg1 = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon1 + "@2x.png");
        // console.log(weatherIconImg1) // still figuring tis
        //day 1
        var dateP1 = $("<p>").text(response.list[3].dt_txt);
        var weatherIcon1 = response.list[3].weather[0].icon;
        var weatherIconImg1 = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon1 + "@2x.png");
        var temperatureP1 = $("<p>").text("Temp: " + response.list[3].main.temp + " ℉");
        var humidityP1 = $("<p>").text("Humidity: " + response.list[3].main.humidity + "%");
        $(".forecastDate1").empty();
        $(".weatherIcon1").empty();
        $(".tempForecast1").empty();
        $(".humidityForecast1").empty();

        $(".forecastDate1").append(dateP1);
        $(".weatherIcon1").append(weatherIconImg1);
        $(".tempForecast1").append(temperatureP1);
        $(".humidityForecast1").append(humidityP1);

        var weatherIconToday = response.list[3].weather[0].icon;
        var weatherIconTodayImage = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIconToday + "@2x.png");
        $("#weatherIcon").empty();
        $("#weatherIcon").append(weatherIconTodayImage);
        //day 2
        var dateP2 = $("<p>").text(response.list[11].dt_txt);
        var weatherIcon2 = response.list[11].weather[0].icon;
        var weatherIconImg2 = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon2 + "@2x.png");
        var temperatureP2 = $("<p>").text("Temp: " + response.list[11].main.temp + " ℉");
        var humidityP2 = $("<p>").text("Humidity: " + response.list[11].main.humidity + "%");
        $(".forecastDate2").empty();
        $(".weatherIcon2").empty();
        $(".tempForecast2").empty();
        $(".humidityForecast2").empty();

        $(".forecastDate2").append(dateP2);
        $(".weatherIcon2").append(weatherIconImg2);
        $(".tempForecast2").append(temperatureP2);
        $(".humidityForecast2").append(humidityP2);
        //day 3
        var dateP3 = $("<p>").text(response.list[19].dt_txt);
        var weatherIcon3 = response.list[19].weather[0].icon;
        var weatherIconImg3 = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon3 + "@2x.png");
        var temperatureP3 = $("<p>").text("Temp: " + response.list[19].main.temp + " ℉");
        var humidityP3 = $("<p>").text("Humidity: " + response.list[19].main.humidity + "%");
        $(".forecastDate3").empty();
        $(".weatherIcon3").empty();
        $(".tempForecast3").empty();
        $(".humidityForecast3").empty();

        $(".forecastDate3").append(dateP3);
        $(".weatherIcon3").append(weatherIconImg3);
        $(".tempForecast3").append(temperatureP3);
        $(".humidityForecast3").append(humidityP3);
        //day 4
        var dateP4 = $("<p>").text(response.list[27].dt_txt);
        var weatherIcon4 = response.list[27].weather[0].icon;
        var weatherIconImg4 = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon4 + "@2x.png");
        var temperatureP4 = $("<p>").text("Temp: " + response.list[27].main.temp + " ℉");
        var humidityP4 = $("<p>").text("Humidity: " + response.list[27].main.humidity + "%");
        $(".forecastDate4").empty();
        $(".weatherIcon4").empty();
        $(".tempForecast4").empty();
        $(".humidityForecast4").empty();

        $(".forecastDate4").append(dateP4);
        $(".weatherIcon4").append(weatherIconImg4);
        $(".tempForecast4").append(temperatureP4);
        $(".humidityForecast4").append(humidityP4);
        //day 5
        var dateP5 = $("<p>").text(response.list[35].dt_txt);
        var weatherIcon5 = response.list[35].weather[0].icon;
        var weatherIconImg5 = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon5 + "@2x.png");
        var temperatureP5 = $("<p>").text("Temp: " + response.list[35].main.temp + " ℉");
        var humidityP5 = $("<p>").text("Humidity: " + response.list[35].main.humidity + "%");
        $(".forecastDate5").empty();
        $(".weatherIcon5").empty();
        $(".tempForecast5").empty();
        $(".humidityForecast5").empty();

        $(".forecastDate5").append(dateP5);
        $(".weatherIcon5").append(weatherIconImg5);
        $(".tempForecast5").append(temperatureP5);
        $(".humidityForecast5").append(humidityP5);



    })
}


function getWeatherAPI(cityName) {
    //this is the query to the current day forecast
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName + "&units=imperial&APPID=" + APIkey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        // var data = response;
        var cityName = response.name;

        // var date = response.dt; //this is in the incorrect format unix Time
        // console.log(date)

        var icon = response.weather[0].icon;
        // console.log(icon) // 

        // var dayTemp = "Temperature: " + response.main.temp + " ℉";
        var humidity = "Humidity: " + response.main.humidity + " %";
        var windSpeed = "Wind Speed " + response.wind.speed + " MPH";

        //added this because searches were adding to each other 
        // $("#cityName").empty();
        // $("#date").empty();
        // $("#weatherIcon").empty(); //****still ned to add the weather icon
        // $("#temperature").empty();
        // $("#humidity").empty();
        // $("#windSpeed").empty();

        //APPEND TO HTML
        $("#cityName").text(cityName);
        $("#weatherIcon").text(icon + " *this needs to be an icon*"); //****need to add weather icon
        $("#date").text(response.dt);
        $("#temperature").text(response.main.temp)
        $("#humidity").text(humidity);
        $("#windSpeed").text(windSpeed);

        var cityLat = "lat=" + response.coord.lat;
        var cityLon = "lon=" + response.coord.lon;
        getUVIAPI(cityLat, cityLon)

    })
}


function getUVIAPI(lat, lon) {
    var queryURL =
        "https://api.openweathermap.org/data/2.5/uvi?" +
        "&APPID=" + APIkey + "&" + lat + "&" + lon;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#uvIndex").text("UV Index: " + response.value);
    })

}




//Display the user search history on the screen
function showSearchHistory() {
    $(".previousSearchList").empty()
        // loop through all of the search results that have been added to local storage
    for (var i = 0; i < userCitySearches.length; i++) {
        //let the button 
        var button = $("<button>");
        // add styling to the button
        button.addClass("search list-group-item list-group-item-action");
        // <button data-city='Houston' />
        button.data("city", userCitySearches[i])
        button.on("click", handleClick)
            //set the text of the button to the latest userInput[i] in the 
            //userCitySearches array that is being added to in local storage.
        button.text(userCitySearches[i]);

        $(".previousSearchList").prepend(button);
    }

}

function newCitySearch(event) {

    // **Preventing the button from trying to submit the form
    event.preventDefault();
    // **Converting input to standardized format
    // lowercase the whole string
    // convert first letter to Upper
    var raw_city = $("#citySearch").val().trim().toLowerCase();
    var userInput = ""
    for (var i = 0; i < raw_city.length; i++) {
        if (i === 0) {
            userInput += raw_city[i].toUpperCase()
        } else {
            userInput += raw_city[i]
        }
    }

    $("#citySearch").val('')

    // Set users search query into local storage
    if ((userInput === null) || (userInput === "")) {
        console.log("No previous user history.");
        return;
    } else {
        //else push user input into the userCitySearches arry we created at the top (local storage).
        if (!userCitySearches.includes(userInput)) {
            userCitySearches.push(userInput);
        }
        showSearchHistory();
        //set userInputStorage as the storage file on local storage and convert that input to a string
        localStorage.setItem("userInputStorage", JSON.stringify(userCitySearches));
        //display the weather info for the user's input
        getWeatherAPI(userInput);
        getForecastAPI(userInput);

        /// show the previous search history
        //  addSearchHistory();



    }
}

function handleClick() {
    var city = $(this).data("city")
    getWeatherAPI(city);
    getForecastAPI(city);
}