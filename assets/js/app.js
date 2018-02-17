$(document).ready(function(){
  // Array for category
  var arr = ["paella","sangria","tapas","arroz"];
  // Create buttons
  function renderButtons() {
    // Prevents repeated buttons by deleting them everytime function callled
    $('#buttons-appear-here').empty();
    for (var i = 0; i <arr.length; i++){
      var buttons = $('<button>');
      // If I have time to style buttons
      buttons.addClass("buttons");
      // Adds attribute to pass search onto ajax call
      buttons.attr("data-giphy",arr[i]);
      // Adds text in form
      buttons.text(arr[i]);
      $('#buttons-appear-here').append(buttons);
    }



    // Event listener for all button elements
    $(document).on("click", ".buttons", function() {
        $("#gifs-appear-here").empty();

      var giphy = $(this).attr("data-giphy");

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      giphy + "&api_key=dc6zaTOxFJmzC&limit=10";

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

        console.log('RESULTS :: ', results[0])
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
            var giphyImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            // Need to add multiple srcs to account for multiple states for last onclick
            giphyImage.attr("src",results[j].images.fixed_height.url);
            giphyImage.attr("data-still",results[j].images.fixed_height_still.url);
            giphyImage.attr("data-animate",results[j].images.fixed_height.url);
            giphyImage.attr("data-state", "animate");
            giphyImage.addClass("gif");
            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(giphyImage);
            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
          // Selecting Class of image this function sets data-state attribute to still or animate
          $(".gif").on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var element = $(this)
            console.log(element);
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value


            // attribute gets reassigned on click
            if (state === "still") {
              console.log("state ",state);
              console.log(element);

              $(this).attr("src", $(this).attr("data-still"));

              $(this).attr("data-state", "animate");

              console.log("first thing ", $(this).attr("src", $(this).attr("data-animate")));

              // console.log("second thing ",$(this).attr("data-state", "animate"));


            } else if(state ==='animate') {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
              console.log("else statment");
            }
            else{
              alert("an error occurred...");
            }
          });
      });
    });
  }
  // Function for adding the buttons based on search form
  $('#add-button').on("click",function(event){
    // Prevents form from submitting itself-user is allowed to press enter
    event.preventDefault();
    var button = $('#button-input').val().trim();
    // Push into the array from the form
    arr.push(button);
    // Call renderButtons function
    renderButtons();
    console.log(`test ${this}`);
  });

  renderButtons();
});
