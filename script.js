var m = moment();

var currentDay = document.getElementById("date");
currentDay.append(m.format("dddd, MMMM Do YYYY"));

// **conect api == my key is "b94d8811046274c419745e122971bc95"
var APIkey = "b94d8811046274c419745e122971bc95";
var citySearches = [];
// userCitySearches = localStorage.getItem


//********** */


// **alert("hello");
// **Querying the weather api for the selected city, the ?app_id parameter is required, but can equal anything

function displayWeatherInfo(cityName) {
    var queryURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityName + "&units=imperial&APPID=" + APIkey;

    //** call the weather API */
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // **Printing the entire object to console
        console.log(response);

        var data = response;
        // console.log(data)    
        // for (var i = 0; i < recordNum; i++) {

        //DECARIGN MY VARIABLES
        var cityName = response.city.name; //need to append somewhere
        // var date = $("<p>").text(response.list[0].dt_txt);
        var icon = $("<p>").text(response.list[0].weather[0].icon); // need to find out how to display this
        var temp = $("<p>").text("Temperature: " + response.list[0].main.temp);
        var humidity = $("<p>").text("Humidity: " + response.list[0].main.humidity);
        var windSpeed = $("<p>").text("Wind Speed: " + response.list[0].wind.speed);
        //var uvIndex = $("<p>").text NEED TO FIND OUT HOW TO RETRIEVE THIS 

        //APPEND TO HTML
        $("#cityName").append(cityName);
        // $("#date").append(date);








        // var searchT = $("<div>");
        // var h2 = $("<h2>").text(data[i].headline.main);
        // var p = $("<p>").text(data[i].abstract);
        // //**(the .attr assigns href that turns 'data[i].web_url' into a link() - (the .text displays the text held at that location)
        // var link = $("<a>").attr("href", data[i].web_url).text(data[i].web_url);
        // //**create a start year variable
        // var startYear = $("<p>").text("Date published: " + data[i].pub_date);
        // var author = $("<p>").text("Writen by " + data[i].byline.original)


        //     //**create a end year variable


        //     //**this puts h2, p, and link into the searchT we created 
        //     searchT.append(h2);
        //     searchT.append(p);
        //     searchT.append(link);
        //     searchT.append(startYear);
        //     searchT.append(author);
        //     //**this pus the searchT dive we created inside the div with id=topArticles
        //     $("#topArticles").append(searchT);
        // }
        //**parent div container
        //**get search value
        //**create search value element to hold that value
        //**append search value element 
        //**get number of records
        //**create records value element to hold that value
        //**get start year
        //**create
        //**get end year
        //**create
        //**eventlistener button to search
        //**eventlistener clear results
        // * **Incorporate various "optional parameters" (hard code these in initially).
        // *** Take note of various "bugs" that appear with certain searches.
    });
}
$(".btn-success").on("click", function(event) {
    // **Preventing the button from trying to submit the form
    event.preventDefault();
    // **Storing the artist name
    userInput = $("#citySearch").val().trim();
    // **Running the searchBandsInTown function(passing in the artist as an argument)
    displayWeatherInfo(userInput);
});