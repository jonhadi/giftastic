var topics = ["Batman", "Superman", "Hulk", "Wolverine"]
var arrayPlayPause = [];

renderButtons();

function renderButtons() {
    $('#buttons-view').empty();
    for (var i = 0; i < topics.length; i++) {   
        $('#buttons-view').append("<button onclick='searchGiphy(" + i + ");'>" 
            + topics[i] + "</button>");
    }
}

//add buttons function
$("#add-superhero").on("click", function(event) {
    event.preventDefault();
    topics.push($('#new-hero').val());
    $("#new-hero").val("");
    renderButtons();
});

//printing gif cards
function searchGiphy(index) {
    var apiKey = "2iT8zLjvo55YojtFlWZXXbod6roKGRAi";
    var gifsSpawned = 10;
    var hero = topics[index];
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        hero + "&api_key=" + apiKey + "&limit=" + gifsSpawned;

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response);
    var results = response.data;

    //empty gifs and array of images
    $('#giphy-here').empty();
    arrayPlayPause = [];

    for (var i = 0; i < results.length; i++) {
        // save paused and play images
        arrayPlayPause[i] = {
            pause : results[i].images.fixed_height_still.url,
            play : results[i].images.fixed_height.url
        }


        var heroDiv = $("<div class='giphy-card'>");
        var title = $('<p>');
            title.html("Title: " + results[i].title);
            heroDiv.append(title);
        var heroImage = $("<img class='giphy-img' id='giphy" + i + "' gif-index=" + i + " setting=pause>" );
            heroImage.attr("src", arrayPlayPause[i].pause);
            heroDiv.append(heroImage);
        var rating = $('<p>');
            rating.html("Rating: " + results[i].rating);
            heroDiv.append(rating);
        $('#giphy-here').prepend(heroDiv);

    }
    });
}

//listening for clicks on generated IDs
$(document.body).on("click", ".giphy-img", function() {
    console.log(this.id);
    var index = $(this).attr("gif-index");
    var currentSetting = $(this).attr("setting");
    if (currentSetting === "pause") {
        $('#'+this.id).attr("src", arrayPlayPause[index].play);
        $('#'+this.id).attr("setting", "play");
    } else {
        $('#'+this.id).attr("src", arrayPlayPause[index].pause);
        $('#'+this.id).attr("setting", "pause");
    }
});