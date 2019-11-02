var deckId = "";
var cardsLeft = 0;
var currentCard = "";
var score = 0;

$(document).ready(function() {
  $("#new-deck-clicker").click(function() {
    $.ajax({
      dataType: "json",
      url: "https://deckofcardsapi.com/api/deck/new/",
      success: function(results) {
        deckId = results["deck_id"];
        cardsLeft = 52;
        $("h1").text("New deck opened!");
      },
      error: function(xhr,status,error) {
      console.log(error);
    }
    });
  });


    $("#draw-card-clicker").click(function() {
      $.ajax({
        dataType: "json",
        url: "https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1",
        success: function(results) {
          cardsLeft--;
          let cardValue = results["cards"][0]["value"];
          currentCard = cardValue + " " + results["cards"][0]["suit"];
          if (cardValue === "KING") {
            score += 13;
          }
          else if (cardValue === "QUEEN") {
            score += 12;
          }
          else if (cardValue === "JACK") {
            score += 11;
          }
          else if (cardValue === "ACE") {
            score += 1;
          }
          else {
            score += parseInt(cardValue, 10);
          }
          $("h1").text(currentCard + ": Current score is " + score);
          $("<li>")
          .html('<img src="' + results["cards"][0]["image"] + '"/>')
          .appendTo($("#card-img"))
          .attr("class", "col-sm-1");
        },
        error: function(xhr,status,error) {
        console.log(error);
      }
      });
    });

    $("#shuffle-clicker").click(function() {
      $.ajax({
        dataType: "json",
        url: "https://deckofcardsapi.com/api/deck/" + deckId + "/shuffle/",
        success: function(results) {
          console.log("CLICK");
          $("h1").text("Deck is shuffled!");
        },
        error: function(xhr,status,error) {
        console.log(error);
      }
      });
    });

    $("#score-fact-clicker").click(function() {
      $.ajax({
        dataType: "text",
        url: "http://numbersapi.com/" + score + "/trivia",
        success: function(results) {
          $("h1").text(results);
        },
        error: function(xhr,status,error) {
        console.log(error);
      }
      })
    })
  });
