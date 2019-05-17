var topics = ["Batman", "Superman", "Hulk", "Wolverine"]
var counter = 0;

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

function searchGiphy(index) {
    var hero = topics[index];
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        hero + "&api_key=2iT8zLjvo55YojtFlWZXXbod6roKGRAi&limit=10";

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
    console.log(response);
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
        var heroDiv = $("<div>");
        var p = $('<p>');
            p.html(results[i].rating);
        var heroImage = $('<img id=giphy' + counter + '>' );
            heroImage.attr("src", results[i].images.fixed_height_still.url);
            heroDiv.append(p);
            heroDiv.append(heroImage);

        $('#giphy-here').prepend(heroDiv);
        counter++;
    }

    });
}