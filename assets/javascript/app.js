// variables for the topic(HArry Potter)
// tried many different ways to limit the gifs to 10 per page but to no avail

var topics = [
    "Harry Potter",
    "Ron Weasley",
    "Hermione Granger",
    "Lord Voldemort",
    "Sirius Black",
    "Albus Dumbledore",
    "Lupin",
    "Snape",
    "Grindelwald"
];

var btn;
var newTopic = "";
// new topic that will be added via the input field

// function to make new btn's for the topics in the array
var buttonGenerator = function () { // the prior gifs from previous choices are removed from the page for the new ones
    $("#buttonArea").empty();
    // loops through the array and creates buttons for the topics
    for (i = 0; i < topics.length; i ++) { // creates buttons for the topics as well as attributing the
        btn = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-secondary").attr("data", topics[i]);
        // appending the "btn" to the button area on the HTML
        $("#buttonArea").append(btn);
    };
}


// The user clicks on a generated orange button, which generates 10 static, non-animated gif images from the GIPHY API and places them on the page.
$("#buttonArea").on("click", ".btn", function () { // local var is used to find gifs from the array of topics above
    var limit = 10
    var local = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + local + "&limit" + limit + "&api_key=6pPLwlJdUFq6kQfN4hUzNEG9eg5Gm1h0&limit=10";


    // performing an AJAX requestwith the queryURL
    $.ajax({
        url: queryURL, method: "GET"
        // after data comes back from the request
    }).then(function (response) {
        console.log(queryURL);

        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // looping through each result item
        for (var i = 0; i < results.length; i++) { // creating and storing a div tag
            var topicDiv = $("<div>");

            // creating a paragraph tag with the result items rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // displays the topic image on the HTML
            var topicImg = $("<img>");

            // adds the ability to pause the gifs at first until clicked
            topicImg.attr("src", results[i].images.fixed_height_still.url);
            topicImg.attr("Gifstill", results[i].images.fixed_height_still.url);
            // once the gif is clicked then the gif starts to play
			topicImg.attr("Gifanimate", results[i].images.fixed_height.url)
			// attributes that the gifstate will be "still"
            topicImg.attr("Gifstate", "still")
            topicImg.addClass("gif");

            // image is appended to the div
            topicDiv.append(topicImg);
            // rating is appended to the div below the gif
            topicDiv.append(p);
            // by prepending the topic div to the gif area it places the newest gifs at the top
            $("#gifArea").prepend(topicDiv);
        }
    })
})


// When the user clicks one of the still GIPHY images, and it animates. When the user clicks the gif again, it stops playing.
$("#gifArea").on("click", ".gif", function (event) {
    event.preventDefault();

    // gets the current state of the clicked gif
    var state = $(this).attr("Gifstate");

    // according to the current state gifs toggle between animate and still
    if (state === "still") {
        $(this).attr("src", $(this).attr("Gifanimate"));
        $(this).attr("Gifstate", "animate");
    } else {
        $(this).attr("src", $(this).attr("Gifstill"));
        $(this).attr("state", "still");
    }

})




// makes the submit button workoable as well as add the preventDefault method which means if the submit button doesn't show up with anything then to do nothing.
$(".submit").on("click", function (event) {
    event.preventDefault();

    console.log("submit");
    // sets inputted value to newTopic
    newTopic = $("#topic-input").val();
    // new topic is added to the topics array
    topics.push(newTopic);
    console.log(topics);
    // call the function that creates the new button
    buttonGenerator();
});


buttonGenerator();
