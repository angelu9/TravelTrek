
var firebaseConfig = {
    apiKey: "AIzaSyBps3TF6o-I5N6-YJ4ov3RyoIQ9P5CTMyo",
    authDomain: "traveltrek-19d5c.firebaseapp.com",
    databaseURL: "https://traveltrek-19d5c.firebaseio.com",
    projectId: "traveltrek-19d5c",
    storageBucket: "traveltrek-19d5c.appspot.com",
    messagingSenderId: "733740279725",
    appId: "1:733740279725:web:bd30a7ff820d05ec"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var clickCounter = 0;

window.onload = function () {

    $("#navBar").hide();
    $("#recentSearch").hide();

}
//Functions
//================================================================================================================

//Displays Trending Searches on the screen
function displayTrending(response) {
    results = response.items;
    for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var displayDiv = $("<div>").attr("class", "trend");

        // Creating a paragraph tag with the result item's rating
        var link = $("<a>").attr("href", results[i].formattedUrl).text("URL " + results[i].displayLink);
        var title = $("<h3>").text(results[i].title);
        var snip = $("<p>").text(results[i].snippet);

        // Appending the paragraph and image tag 

        displayDiv.append(title);
        displayDiv.append(snip);
        displayDiv.append(link);

        $("#result").append(displayDiv);
    }
}

//Displays Images Searches on the screen
function displayImages(response) {

    var results = response.hits;
    if (response.total === 0) {
        $("#result").text("Sorry Not Results Found")
    } else {

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var displayDiv = $("<div>").attr("class", "display");

            // Creating a paragraph tag with the result item's rating
            var caption = $("<a>").attr("href", results[i].pageURL).text("Photo Information").attr("class", "caption").attr("target", "blank")

            // Creating and storing an image tag
            var resultImage = $("<img>").attr("class", "images").width(400).height(200);
            // Setting the src attribute of the image to a property pulled off the result item
            resultImage.attr("src", results[i].webformatURL);


            // Appending the paragraph and image tag 
            displayDiv.append(resultImage);
            displayDiv.append(caption);


            $("#result").append(displayDiv);


        }
    }
}

//Displays Videos Searches on the screen
function displayVideos(response) {
    var results = response.hits;

    //Check if there are no results in search
    if (response.total === 0) {
        $("#result").text("Sorry Not Results Found")
    } else {

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var displayDiv = $("<div>");

            // Creating and storing an image tag
            var resultVideo = $("<iframe>").attr("class", "videos");
            // Setting the src attribute of the image to a property pulled off the result item
            resultVideo.attr("src", results[i].videos.small.url);

            // Appending the paragraph and image tag 
            displayDiv.append(resultVideo);

            $("#result").append(displayDiv);
            // $("#search").val("");

        }
    }
}

//Displays Places Searches on the screen
function displayPlaces(response) {

    var places = response.results
    //Check if there are no results in search
    if (response.status === "ZERO_RESULTS") {

        $("#result").text("Sorry Not Results Found")
    } else {


        var tableDisplay = $("<table>").attr("id", "displayTable");
        var trHeader = $("<tr>").attr("id", "trHeader");
        var nameCol = $("<th>").text("Name").attr("id", "name");
        var ratingCol = $("<th>").text("Rating").attr("id", "rating");
        var typeCol = $("<th>").text("Type").attr("id", "type");
        var addressCol = $("<th>").text("Address").attr("id", "address");
        trHeader.append(nameCol, ratingCol, typeCol, addressCol);
        tableDisplay.append(trHeader);
        // displayDiv.append(tableDisplay);
        $("#result").append(tableDisplay)


        for (var i = 0; i < places.length; i++) {

            // Creating and storing a div tag

            var tBody = $("#displayTable");
            var tRow = $("<tr>");
            // Creating a paragraph tag with the result item's rating
            var name = $("<td>").text(places[i].name);


            var rating = $("<td>").text(places[i].rating);
            var type = $("<td>").text(places[i].types[0] + " " + places[i].types[1]);
            var address = $("<td>").text(places[i].vicinity);


            tRow.append(name, rating, type, address);

            // $("#result").append(displayDiv);
            tBody.append(tRow);
            $("#result").append(tableDisplay)

        }

    }
}

//starts Ajax Call
function tredingAjaxCall(url) {
    $.ajax({
        method: "GET",
        url: url,
    }).then(function (response) {
        displayTrending(response);
    });
}
//starts Ajax Call
function imagesAjaxCall(url) {
    $.ajax({
        method: "GET",
        url: url,
    }).then(function (response) {
        displayImages(response);
    });
}
//starts Ajax Call
function videosAjaxCall(url) {
    $.ajax({
        method: "GET",
        url: url,
    }).then(function (response) {
        displayVideos(response);
    });
}
//starts Ajax Call
function placesAjaxCall(url) {
    $.ajax({
        method: "GET",
        url: url,
    }).then(function (response) {
        displayPlaces(response);
    });
}

function hideNav() {

    $("#jumbo").hide()
    $("#navBar").show();
}

function pushData() {
    $("#clickCounter").empty();
    clickCounter++;

      database.ref("clicks").set({
        clickCount: clickCounter
    });
    
}
function getSearches(search) {
    console.log(search)
    database.ref().push({
        searchTerm: search,
    })
}
//Shows number of searches
database.ref("clicks").on("value", function(snapshot){
    clickCounter = snapshot.val().clickCount;
    var display = $("<p>").text("Total Searches: "+snapshot.val().clickCount);
    $("#clickCounter").append(display);

});

database.ref().limitToLast(5).on("child_added", function (snap) {
    var item = snap.val();
    var result = item.searchTerm;
    var display = $("<p>").text(result);
    $("#recentSearch").prepend(display);
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



//==========================================================================================================
$("#trendingButton").on("click", function (event) {
    event.preventDefault();
    

    $("#result").empty();
    // Number of times the page has been researched
    var searchInput = $("#search").val();
    if (searchInput === "") {
        var error = $("<h1>").text("Please enter a search term").attr("id", "error");
        $("#result").append(error)

    } else {
        $("#search2").val(searchInput);
        var googleKey = "AIzaSyBRlj_omJsZWTgEIXq9yLePCL_HNfIfdkk"
        var googleSearch = "https://www.googleapis.com/customsearch/v1?key=" + googleKey + "&cx=015376139325119918930:8q0hmzh1doi&q=" + searchInput
        var replace = googleSearch.replace(" ", "%20");
        tredingAjaxCall(replace);
        hideNav();
        getSearches(searchInput);
        pushData();
        $("#recentSearch").show();
    }
});

//===============================================================================================================
//API USED pixabay free images by thousands of users online
//This API allow the user so find photos by local or turist in high def unlike random pictues.

$("#imageButton").on("click", function (event) {
    event.preventDefault();
    $("#result").empty();
    // Number of times the page has been researched


    var imgKey = "13124707-0417aa5bfcc30fe6d133d9572"
    var imageSearch = $("#search").val();
    if (imageSearch === "") {
        var error = $("<h1>").text("Please enter a search term").attr("id", "error");
        $("#result").append(error)

    } else {

        $("#search2").val(imageSearch);
        var queryImageURL = "https://pixabay.com/api/?key=" + imgKey + "&q=" + imageSearch + "&image_type=photo"
        imagesAjaxCall(queryImageURL);
        hideNav();
        getSearches(imageSearch);
        pushData();
        $("#recentSearch").show();
     
    }
});


//===================================================================================================================
//API USED pixabay free videos by thousands of users online
$("#videoButton").on("click", function (event) {
    event.preventDefault();
    $("#result").empty();
    // Number of times the page has been researched
    

    var vidKey = "13124707-0417aa5bfcc30fe6d133d9572"
    var videoSearch = $("#search").val();
    if (videoSearch === "") {
        var error = $("<h1>").text("Please enter a search term").attr("id", "error");
        $("#result").append(error)

    } else {
        $("#search2").val(videoSearch);
        var queryVideoURL = "https://pixabay.com/api/videos/?key=" + vidKey + "&q=" + videoSearch;
        videosAjaxCall(queryVideoURL);
        hideNav();
        getSearches(videoSearch);
        pushData();
        $("#recentSearch").show();
    }
});


//====================================================================================================================
// Using the Google API Places and the Geolocation API to find places 5 miles radius from the user

$("#placesButton").on("click", function (event) {
    event.preventDefault();
    $("#result").empty();
    // Number of times the page has been researched
    getLocation()

    //stores latitute and longitude from the local storage
    var latitude = localStorage.getItem("latitude");
    var longitude = localStorage.getItem("longitude");
    var places = $("#search").val();
    if (places === "") {
        var error = $("<h1>").text("Please enter a search term").attr("id", "error");
        $("#result").append(error)

    } else {
        $("#search2").val(places);
        var googleKey = "AIzaSyBRlj_omJsZWTgEIXq9yLePCL_HNfIfdkk"
        var google = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=8000&keyword=" + places + "&key=" + googleKey;

        var replace = google.replace(" ", "%20");
        placesAjaxCall(replace);
        hideNav();
        getSearches(places);
        pushData();
        $("#recentSearch").show();
    }
});




//NAV MENU CODE  HAD TO CALL THE API'S AGAIN IN ORDER TO NO CONFLICT WITH THE FIRST SET OF BUTTONS AND SEARCH BAR
//====================================================================================================================

//====================================================================================================================
$("#trendingButton2").on("click", function (event) {

    event.preventDefault();
    $("#result").empty();
    // Number of times the page has been researched
  

    var searchInput = $("#search2").val();
    var googleKey = "AIzaSyBRlj_omJsZWTgEIXq9yLePCL_HNfIfdkk"
    var googleSearch = "https://www.googleapis.com/customsearch/v1?key=" + googleKey + "&cx=015376139325119918930:8q0hmzh1doi&q=" + searchInput
    var replace = googleSearch.replace(" ", "%20");
    tredingAjaxCall(replace);
    pushData();
    getSearches(searchInput);
});

//===============================================================================================================
//API USED pixabay free images by thousands of users online
//This API allow the user so find photos by local or turist in high def unlike random pictues.

$("#imageButton2").on("click", function (event) {
    event.preventDefault();
    $("#result").empty();
    // Number of times the page has been researched
    // pushData()

    var imgKey = "13124707-0417aa5bfcc30fe6d133d9572"
    var imageSearch = $("#search2").val();
    var queryImageURL = "https://pixabay.com/api/?key=" + imgKey + "&q=" + imageSearch + "&image_type=photo"
    imagesAjaxCall(queryImageURL);
    pushData();
    getSearches(imageSearch);
});


//===================================================================================================================
//API USED pixabay free videos by thousands of users online
$("#videoButton2").on("click", function (event) {
    event.preventDefault();
    $("#result").empty();
    // Number of times the page has been researched
   
    var vidKey = "13124707-0417aa5bfcc30fe6d133d9572"
    var videoSearch = $("#search2").val();
    var queryVideoURL = "https://pixabay.com/api/videos/?key=" + vidKey + "&q=" + videoSearch
    videosAjaxCall(queryVideoURL);
    pushData();
    getSearches(videoSearch);
});


//====================================================================================================================
// Using the Google API Places and the Geolocation API to find places 5 miles radius from the user

$("#placesButton2").on("click", function (event) {
    event.preventDefault();
    $("#result").empty();
    // Number of times the page has been researched
    
    getLocation()

    //stores latitute and longitude from the local storage
    var latitude = localStorage.getItem("latitude");
    var longitude = localStorage.getItem("longitude");



    var places = $("#search2").val();
    var googleKey = "AIzaSyBRlj_omJsZWTgEIXq9yLePCL_HNfIfdkk"
    var google = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=8000&keyword=" + places + "&key=" + googleKey;


    var replace = google.replace(" ", "%20");
    placesAjaxCall(replace);
    pushData();
    getSearches(places);
});
