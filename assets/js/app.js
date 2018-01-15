// Array for category
var arr = ["paella","sangria","tapas","arroz negre"];
// Create buttons
function renderButtons(){
  // Prevents repeated buttons by deleting them everytime function callled
  $('#buttons-appear-here').empty();
  for (var i = 0; i <arr.length; i++){
    var buttons = $('<button>');
    // If I have time to style buttons
    buttons.addClass("buttons");
    // Adds attribute to pass search onto ajax call
    buttons.attr("data-person",arr[i]);
    // Adds text in form
    buttons.text(arr[i]);
    $('#buttons-appear-here').append(buttons);
    }
}
// Add "data-person" class to divs
// Event listener for all button elements
$("button").on("click", function() {

  var person = $(this).attr("data-person");

  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  person + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  // After the data comes back from the API
  .done(function(response) {
    // Storing an array of results in the results variable
    var results = response.data;

    // Looping over every result item
    for (var j = 0; j < results.length; j++) {

      // Only taking action if the photo has an appropriate rating
      if (results[j].rating !== "r" && results[j].rating !== "pg-13") {
        // Creating a div with the class "item"
        var gifDiv = $("<div class='item'>");

        // Storing the result item's rating
        var rating = results[j].rating;

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + rating);

        // Creating an image tag
        var personImage = $("<img>");

        // Giving the image tag an src attribute of a proprty pulled off the
        // result item
        personImage.attr("src", results[j].images.fixed_height.url);

        // Appending the paragraph and personImage we created to the "gifDiv" div we created
        gifDiv.append(p);
        gifDiv.append(personImage);

        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
        $("#gifs-appear-here").prepend(gifDiv);
      }
    }
  });
});
