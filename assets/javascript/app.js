$(document).ready(function () {
    console.log("ready!");


$("#trendingButton").on("click", function (event) {
    event.preventDefault();
    $("#result").empty();

    var searchInput = $("#search").val();
    var googleKey = "AIzaSyBRlj_omJsZWTgEIXq9yLePCL_HNfIfdkk"
    var googleSearch = "https://www.googleapis.com/customsearch/v1?key=" + googleKey + "&cx=015376139325119918930:8q0hmzh1doi&q=" + searchInput
    var replace = googleSearch.replace(" ", "%20");
    console.log(replace)
    //Ajax call to get data
    $.ajax({
        method: "GET",
        url: replace,

    }).then(function (response) {
        console.log(response)
        console.log(response.items)
        results = response.items;
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var displayDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var link = $("<a>").attr("href", results[i].formattedUrl).text("URL " + results[i].displayLink);
            var title = $("<h3>").text(results[i].title);
            var snip = $("<p>").text(results[i].snippet);

            // Appending the paragraph and image tag 

            displayDiv.append(title);
            displayDiv.append(snip);
            displayDiv.append(link);

            $("#result").prepend(displayDiv);

            //         
        }

    })
});


//API USED pixabay free images by thousands of users online
//This API allow the user so find photos by local or turist in high def unlike random pictues.

$("#imageButton").on("click", function (event) {
    event.preventDefault();
    $("#result").empty();

    var imgKey = "13124707-0417aa5bfcc30fe6d133d9572"
    var imageSearch = $("#search").val();
    var queryImageURL = "https://pixabay.com/api/?key=" + imgKey + "&q=" + imageSearch + "&image_type=photo"
    console.log(imageSearch)
    console.log(queryImageURL)
    $.ajax({
        method: "GET",
        url: queryImageURL,

    }).then(function (response) {
        console.log(response)
        var results = response.hits;
        console.log(results)
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var displayDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var downloads = $("<p>").text("downloads: " + results[i].views);
            var link = $("<a>").attr("href", results[i].pageURL).text("URL " + results[i].pageURL);



            // Creating and storing an image tag
            var resultImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            resultImage.attr("src", results[i].webformatURL);

            // Appending the paragraph and image tag 
            displayDiv.append(resultImage);
            displayDiv.append(downloads);
            displayDiv.append(link);


            $("#result").prepend(displayDiv);


        }

    });
});


//API USED pixabay free videos by thousands of users online
$("#videoButton").on("click", function (event) {
    event.preventDefault();
    $("#result").empty();

    var vidKey = "13124707-0417aa5bfcc30fe6d133d9572"
    var videoSearch = $("#search").val();
    var queryImageURL = "https://pixabay.com/api/videos/?key=" + vidKey + "&q=" + videoSearch
    console.log(videoSearch)
    console.log(queryImageURL)
    $.ajax({
        method: "GET",
        url: queryImageURL,

    }).then(function (response) {
        console.log(response)
        var results = response.hits;
        console.log(results)
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var displayDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var downloads = $("<p>").text("downloads: " + results[i].views);

            // Creating and storing an image tag
            var resultVideo = $("<iframe>");
            // Setting the src attribute of the image to a property pulled off the result item
            resultVideo.attr("src", results[i].videos.small.url);

            // Appending the paragraph and image tag 
            displayDiv.append(downloads);
            displayDiv.append(resultVideo);

            $("#result").prepend(displayDiv);
            // $("#search").val("");

        }

    });
});

// Using the Google API Places and the Geolocation API to find places 5 miles radius from the user

$("#placesButton").on("click", function (event) {
    event.preventDefault();
    $("#result").empty();
    getLocation()
    //stores latitute and longitude from the local storage
    var latitude = localStorage.getItem("latitude");
    var longitude = localStorage.getItem("longitude");

    console.log(latitude)
    console.log(longitude)

    var places = $("#search").val();
    var googleKey = "AIzaSyBRlj_omJsZWTgEIXq9yLePCL_HNfIfdkk"
    var google = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=8000&keyword=" + places + "&key=" + googleKey;


    var replace = google.replace(" ", "%20");
    console.log(replace)

    $.ajax({
        method: "GET",
        url: replace,

    }).then(function (response) {
        console.log(response)
        console.log(response.results)
        var places = response.results

        for (var i = 0; i < places.length; i++) {

            // Creating and storing a div tag
            var displayDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var name = $("<h3>").text("Name: " + places[i].name);

            //displays if the location is open or closed.
            if (places[i].opening_hours.open_now) {
                var open = $("<p>").text("Open Now");
            } else {
                var open = $("<p>").text("Closed Now");
            }
            var rating = $("<p>").text("Rating: " + places[i].rating);
            var type = $("<p>").text("Type: " + places[i].types[0] + " " + places[i].types[1]);
            var address = $("<p>").text("Adress: " + places[i].vicinity);



            // Appending the paragraph and image tag 
            displayDiv.append(name);
            displayDiv.append(open);
            displayDiv.append(rating);
            displayDiv.append(type);
            displayDiv.append(address);

            $("#result").prepend(displayDiv);


        }
    });

});


//Getlocation function to find user's Geo Location then store in the browser local storage
//This will allow the app to show user locations within the user's radius.

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    }
}
function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;


    localStorage.clear();

    // Store all content into localStorage
    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude", lon);
}

});