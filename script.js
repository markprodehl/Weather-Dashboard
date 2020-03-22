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
        console.log(response);

        for (var i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.includes("12")) {
                console.log(response.list[i])
            }
        }

        // //day 1
        // var dateP1 = $("<p>").text(response.list[3].dt_txt); //this is a random time need current time
        // // console.log(dateP1)
        // var weatherIcon1 = response.list[3].weather[0].icon; // this pulls the icon key
        // // console.log(weatherIcon1)
        // var weatherIconImg1 = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon1 + "@2x.png");
        // console.log(weatherIconImg1) // still figuring tis

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