// $(document).ready(function() {

// **conect api == my key is "b94d8811046274c419745e122971bc95"
var APIkey = "b94d8811046274c419745e122971bc95";
var userCitySearches = [];
//If items exist in local storage display them on on screen
userCitySearches = localStorage.getItem("userInputStorage");
// console.log(userCitySearches);

userCitySearches = JSON.parse(userCitySearches) || []; // look into this a little more
showSearchHistory();

// var userInput;


//********** */



// **Querying the weather api for the selected city, the ?app_id parameter is required, but can equal anything

function displayWeatherInfo(cityName) {

    //this is the query to the 5 day forecast

    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + //see this later
        cityName + "&units=imperial&appid=" + APIkey; // see this later

    //this is the query to the current day forecast
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName + "&units=imperial&APPID=" + APIkey;

    //** call the weather API */
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // **Printing OBJECT USE AS REFERENCE
        // console.log(response);

        ////***** UVINDEX *****///
        //need the latitude and logintude to get the uvIndex
        var cityLat = "lat=" + response.coord.lat;
        var cityLon = "lon=" + response.coord.lon;

        var uvIndexQueryURL =
            "https://api.openweathermap.org/data/2.5/uvi?" +
            "&APPID=" + APIkey + "&" + cityLat + "&" + cityLon;
        //call the UV index api
        $.ajax({
            url: uvIndexQueryURL,
            method: "GET"
        }).then(function(UVresponse) {
            $("#uvIndex").text("UV Index: " + UVresponse.value);
        });
        //************* */


        // var data = response;
        var cityName = response.name;

        var date = response.dt; //this is in the incorrect format unix Time
        console.log(date)

        var icon = response.weather[0].icon;
        // console.log(icon) // 

        var dayTemp = "Temperature: " + response.main.temp + " ℉";
        var humidity = "Humidity: " + response.main.humidity + " %";
        var windSpeed = "Wind Speed " + response.wind.speed + " MPH";

        //added this because searches were adding to each other 
        $("#cityName").empty();
        $("#date").empty();
        $("#weatherIcon").empty(); //****still ned to add the weather icon
        $("#temperature").empty();
        $("#humidity").empty();
        $("#windSpeed").empty();

        //APPEND TO HTML
        $("#cityName").append(cityName);
        $("#weatherIcon").append(icon + " *this needs to be an icon*"); //****need to add weather icon
        $("#date").append(date);
        $("#temperature").append(dayTemp)
        $("#humidity").append(humidity);
        $("#windSpeed").append(windSpeed);
    });

    // Ajax dump of forecastQueryURL for 5 day forecast

    $.ajax({
        url: forecastQueryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        displayWeatherForecast(response);

    })
}

//Call for the 5-Day Forecast
// function displayForecastInfo(cityName) {

// var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + //see this later
//     cityName + "&units=imperial&appid=" + APIkey; // see this later

// $.ajax({
//     url: forecastQueryURL,
//     method: "GET"
// }).then(function(response) {
//     console.log(response);

// })


function displayWeatherForecast(response) {
    //day 1
    var dateP1 = $("<p>").text(response.list[3].dt_txt); //this is a random time need current time
    // console.log(dateP1)
    var weatherIcon1 = response.list[3].weather[0].icon; // this pulls the icon key
    // console.log(weatherIcon1)
    // var weatherIconImg1 = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon1 + "@2x.png");
    // console.log(weatherIconImg1) // still figuring this out




}




//MAKE A LIST OF PREVIOUS PREVIOUSLY SEARCHED CITIES
function addSearchHistory() {
    //make a button for search history
    var SearchHistoryButton = $("<button>");
    //add a bootstrap class for button styling
    SearchHistoryButton.addClass("search list-group-item list-group-item-action");
    //add an attribute called previous-city-names and populate it with the userInput
    SearchHistoryButton.attr("data-name", userInput);
    //display the userInput text on the button
    SearchHistoryButton.text(userInput);
    //create an id of previousCityList and add the button to the top of the list
    $(".previousCityList").prepend(SearchHistoryButton);
}

//Display the user search history on the screen
function showSearchHistory() {
    console.log(userCitySearches)
        // loop through all of the search results that have been added to local storage
    for (var i = 0; i < userCitySearches.length; i++) {
        //let the button 
        var button = $("<button>");
        // add styling to the button
        button.addClass("search list-group-item list-group-item-action");
        //set the text of the button to the latest userInput[i] in the 
        //userCitySearches array that is being added to in local storage.
        button.text(userCitySearches[i]);

        $(".previousCityList").prepend(button);
    }

}



$(".btn-success").on("click", function(event) {
    // **Preventing the button from trying to submit the form
    event.preventDefault();
    // **Storing the artist name
    userInput = $("#citySearch").val().trim();

    // Set users search query into local storage
    if ((userInput === null) || (userInput === "")) {
        console.log("No previous user history.");
        return;
    } else {
        //else push user input into the userCitySearches arry we created at the top (local storage).
        userCitySearches.push(userInput);
        //set userInputStorage as the storage file on local storage and convert that input to a string
        localStorage.setItem("userInputStorage", JSON.stringify(userCitySearches));
        //display the weather info for the user's input
        displayWeatherInfo(userInput);

        /// show the previous search history
        addSearchHistory();



    }

});



// });