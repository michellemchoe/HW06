var charactersOnBoard = ["captain kirk", "spock", "leonard mccoy", "uhura", "sulu", "chekov"];

renderButtons();

$("#addCharacterButton").click(function (event) {
    event.preventDefault();

    var newCharacter = $("#userCharacter").val().trim();
    for (var i = 0; i < charactersOnBoard.length; i++) {
        if ((newCharacter === "") || (newCharacter.toLowerCase() === charactersOnBoard[i])) {
            $("#userCharacter").val("");
            return;
        }
    }

    charactersOnBoard.push(newCharacter);
    $("#userCharacter").val("");

    renderButtons();
});

$(document).on("click", ".characterGif", function () {
    var gifState = $(this).attr("gifStatus");
    console.log(gifState);
    if (gifState === "still") {
        $(this).attr("src", $(this).attr("srcAnimated"));
        $(this).attr("gifStatus", "animated");
    } else {
        $(this).attr("src", $(this).attr("srcStill"));
        $(this).attr("gifStatus", "still");
    }
});

$(document).on("click", ".characterButton", function () {
    var currCharacter = $(this).attr('id');
    console.log(this);
    console.log(currCharacter);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currCharacter + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<div>").text("Rating: " + rating.toUpperCase());
                p.addClass("gifRating")

                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height_still.url);
                personImage.attr("srcAnimated", results[i].images.fixed_height.url);
                personImage.attr("srcStill", results[i].images.fixed_height_still.url);
                personImage.attr("gifStatus", "still");
                personImage.addClass("characterGif");

                gifDiv.prepend(p);
                gifDiv.prepend(personImage);

                $("#displayCharacters").prepend(gifDiv);
            }
        });
});

function renderButtons() {
    $("#characterButtonList").empty();
    for (var i = 0; i < charactersOnBoard.length; i++) {
        var a = $("<button>");
        a.addClass("button characterButton is-medium");
        a.attr('id', charactersOnBoard[i]);
        a.text(charactersOnBoard[i].toLowerCase());
        $("#characterButtonList").append(a);
        $("#characterButtonList").append("<br>")
        console.log(charactersOnBoard[i]);
    }
}
