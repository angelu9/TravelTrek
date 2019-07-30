// $("#submit").on("click", function (event) {
        //     $("#result").empty();

        //     //API USED Contextualwebsearch

        //     var key = "b14dbd97f0mshf7537a54edf57f0p1465bcjsnbd9981adabe8"
        //     var host = "contextualwebsearch-websearch-v1.p.rapidapi.com"
        //     var search = $("#search").val();
        //     var queryURL = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?autoCorrect=true&pageNumber=1&pageSize=10&q=" + search + "&safeSearch=false";
        //     var topSearches = $("<p>").text("Top Searches for " + search + " are:");
        //     console.log(host);
        //     console.log(key);
        //     $.ajax({
        //         method: "GET",
        //         url: queryURL,
        //         headers: {
        //             "X-RapidAPI-Key": key,
        //             "X-RapidAPI-Host": host
        //         },

        //     }).then(function (response) {
        //         console.log(queryURL);
        //         console.log(response.value)
        //         var results = response.value;
        //         // Looping through each result item
        //         for (var i = 0; i < results.length; i++) {

        //             // Creating and storing a div tag
        //             var displayDiv = $("<div>");

        //             // Creating a paragraph tag with the result item's rating
        //             var source = $("<p>").text("Source: " + results[i].provider.name);
        //             var title = $("<p>").text("Title: " + results[i].body);
        //             var link = $("<a>").attr("href", results[i].url).text("URL " + results[i].url);

        //             displayDiv.append(source);
        //             displayDiv.append(title);
        //             displayDiv.append(link);


        //             $("#result").prepend(displayDiv);
        //             // $("#search").val("");

        //         }
        //     });

        //     //Top Searches AutoComplete API USED Contextualwebsearch
        //     var queryAuto = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/spelling/AutoComplete?text=" + search

        //     $.ajax({
        //         method: "GET",
        //         url: queryAuto,
        //         headers: {
        //             "X-RapidAPI-Key": key,
        //             "X-RapidAPI-Host": host
        //         },

        //     }).then(function (response) {
        //         console.log(queryAuto);
        //         console.log(response)


        //         // Looping through each result item
        //         for (var i = 0; i < response.length; i++) {

        //             // Creating and storing a div tag
        //             var displayDiv = $("<div>");

        //             // Creating a paragraph tag with the result item's rating

        //             var result= $("<p>").text(response[i]);


        //             displayDiv.append(topSearches);
        //             displayDiv.append(result);



        //             $("#result").prepend(displayDiv);
        //             // $("#search").val("");
        //         }

        //     });
        // });


