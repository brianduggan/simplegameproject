//////// SET JQUERY DOM VARIABLES ////////
var $playerScore = $('#player-score'),
    $playerCards = $('#player-cards'),
    $dealerScore = $('#dealer-score'),
    $dealerCards = $('#dealer-cards'),
    $hit = $('#hit'),
    $stand = $('#stand'),
    $dealComp = $('#deal-computer'),
    $result = $('#result'),
    $submit = $('#submit');

/////// SET DECK //////// , color: "black"
var deck = [
  {name: "2♠", value: 2, color: "black" }, {name: "3♠", value: 3, color: "black" },
  {name: "4♠", value: 4, color: "black" }, {name: "5♠", value: 5, color: "black" },
  {name: "6♠", value: 6, color: "black" }, {name: "7♠", value: 7, color: "black" },
  {name: "8♠", value: 8, color: "black" }, {name: "9♠", value: 9, color: "black" },
  {name: "10♠", value: 10, color: "black" }, {name: "J♠", value: 10, color: "black" },
  {name: "Q♠", value: 10, color: "black" }, {name: "K♠", value: 10, color: "black" },
  {name: "A♠", value: 11, altValue: 1, color: "black"},
  {name: "2♣", value: 2, color: "black" }, {name: "3♣", value: 3, color: "black" },
  {name: "4♣", value: 4, color: "black" }, {name: "5♣", value: 5, color: "black" },
  {name: "6♣", value: 6, color: "black" }, {name: "7♣", value: 7, color: "black" },
  {name: "8♣", value: 8, color: "black" }, {name: "9♣", value: 9, color: "black" },
  {name: "10♣", value: 10, color: "black" }, {name: "J♣", value: 10, color: "black" },
  {name: "Q♣", value: 10, color: "black" }, {name: "K♣", value: 10, color: "black" },
  {name: "A♣", value: 11, altValue: 1, color: "black"},
  {name: "2♥", value: 2, color: "red" }, {name: "3♥", value: 3, color: "red" },
  {name: "4♥", value: 4, color: "red" }, {name: "5♥", value: 5, color: "red" },
  {name: "6♥", value: 6, color: "red" }, {name: "7♥", value: 7, color: "red" },
  {name: "8♥", value: 8, color: "red" }, {name: "9♥", value: 9, color: "red" },
  {name: "10♥", value: 10, color: "red" }, {name: "J♥", value: 10, color: "red" },
  {name: "Q♥", value: 10, color: "red" }, {name: "K♥", value: 10, color: "red" },
  {name: "A♥", value: 11, color: "red", altValue: 1},
  {name: "2♦", value: 2, color: "red" }, {name: "3♦", value: 3, color: "red" },
  {name: "4♦", value: 4, color: "red" }, {name: "5♦", value: 5, color: "red" },
  {name: "6♦", value: 6, color: "red" }, {name: "7♦", value: 7, color: "red" },
  {name: "8♦", value: 8, color: "red" }, {name: "9♦", value: 9, color: "red" },
  {name: "10♦", value: 10, color: "red" }, {name: "J♦", value: 10, color: "red" },
  {name: "Q♦", value: 10, color: "red" }, {name: "K♦", value: 10, color: "red" },
  {name: "A♦", value: 11, altValue: 1, color: "red"}
];

//////// HIDE BUTTONS AT START ////////
$hit.hide();
$stand.hide();
$dealComp.hide();
$submit.hide();

//////// DRAW RANDOM CARD ////////

function drawCard(){
  Array.prototype.randsplice = function(){
      var ri = Math.floor(Math.random() * this.length);
      var rs = this.splice(ri, 1);
      return rs;
  };
  Array.prototype.randval = function(){
      var ri = Math.floor(Math.random() * this.length);
      var val = this[ri];
      return val;
  };
  var resultArr = deck.randsplice(); // returns a single item array, so grab it in the next step
  var result = resultArr[0];
  return result;
} //////// END DRAW CARD ////////

//////// CONTAINS AN ACE? ////////
function containsAce(hand){
  var aceCount = 0;
  for (var i = 0; i < hand.length; i++) {
    if (hand[i].value === 11){
      aceCount += 1;
    } // end if
  } // end for

  return aceCount;
}
//////// END CONTAINS ACE ////////

//////// CREATE BLACKJACK GAME MODEL ////////
function Blackjack (){
  this.dealer1 = drawCard();
  this.dealer2 = drawCard();
  this.player1 = drawCard();
  this.player2 = drawCard();
  this.gameState = [[this.player1, this.player2],[this.dealer1,this.dealer2]];
  this.stand = false;
} //////// END GAME CONSTRUCTOR ////////

Blackjack.prototype.playerTotal = function(){
  var playerhand = this.gameState[0];
  var handTotal = 0;
  var aces = containsAce(playerhand);

  for (var n = 0; n < playerhand.length; n++){
    handTotal += playerhand[n].value;
  }
  if (handTotal > 21 && aces > 0) {
    handTotal = ( (handTotal - (aces*11) ) + aces);
    return handTotal;
  } else {
    return handTotal;
  }

};

Blackjack.prototype.computerTotal = function(){
  var playerhand = this.gameState[1];
  var handTotal = 0;
  var aces = containsAce(playerhand);

  for (var n = 0; n < playerhand.length; n++){
    handTotal += playerhand[n].value;
  }
  if (handTotal > 21 && aces > 0) {
    handTotal = ( (handTotal - (aces*11) ) + aces);
    return handTotal;
  } else {
    return handTotal;
  }

};

Blackjack.prototype.render = function(){

  // $playerCards.empty();

  for (var i = 0; i < this.gameState[0].length; i++){
    var $span;
    $span = $('<span>').css("color", this.gameState[0][i].color);
    $span.append(this.gameState[0][i].name);
    $playerCards.append($span);
  }

  $playerScore.append("Player has " + this.playerTotal());
  $dealerScore.append("Computer has the " + this.gameState[1][1].name);

};

Blackjack.prototype.renderHit = function (card) {
  $playerScore.empty();
  var $span;
  $span = $('<span>').css("color", card.color);
  $span.append(card.name);
  $playerCards.append($span);

  var score = ("Player has " + this.playerTotal());
  $playerScore.append(score);
};

Blackjack.prototype.renderDealer = function (){
  var $span1 = $('<span>').text("XX");
  $dealerCards.append($span1.delay(6000));

  var $span2;
  $span2 = $('<span>').css("color", this.gameState[1][1].color);
  $span2.append(this.gameState[1][1].name);
  $dealerCards.append($span2.delay(10000));

};

Blackjack.prototype.renderFirst = function (){
  var card = this.gameState[1][0];
  if (card.suit === "♥" || card.suit === "♦"){
    $dealerCards.children().eq(0).text(card.name).css("color", "red");
  } else {
    $dealerCards.children().eq(0).text(card.name).css("color", "black");
  }
};


$(document).ready(function(){
  var game = new Blackjack();

  $('#start').on('click', function(){
    $('#start').hide();
    game.render();
    game.renderDealer();
    $hit.show();
    $stand.show();

  });

  $hit.on('click', function (){
    $hit.show();

    var playerHit = drawCard();
    game.gameState[0].push(playerHit);
    game.renderHit(playerHit);

    if (game.playerTotal() > 21){
      game.stand = true;
      $hit.hide();
      $stand.hide();
      $dealComp.show();
      $result.text("PLAYER BUSTS... GAME OVER!");
      $dealComp.hide();
      $submit.show();
      $submit.on('click', function(){     //reloads page to play again;
        location.reload();
      });
    }
  });

  $stand.on('click', function(){
    $hit.hide();
    $stand.hide();
    $dealComp.show();
  });

  $dealComp.on('click', function(){
    var dealerHand = game.gameState[1];
    $dealerScore.hide();
    game.renderFirst(); //FLIPS OVER DEALER'S FIRST CARD

    var dTotal = game.computerTotal();
    var counter = 1;
    if (dTotal >= 17){
      $dealerScore.text("Dealer has " + dTotal).fadeIn(5000);
    }
    while (dTotal < 17){
      var computerHit = drawCard();                                 //need to add colors!!!!
      var $span = $('<span>').text(computerHit.name).css("color",computerHit.color).fadeIn(4000*counter);
      $dealerCards.append($span);
      game.gameState[1].push(computerHit);
      dTotal = game.computerTotal();
      $dealerScore.text("Dealer has " + dTotal).fadeIn(5000*counter)
      counter +=1
    }

    // $dealerScore.text("Dealer has " + game.computerTotal()).fadeIn(10000);

    /// I COULD DISPLAY THE SCORE AFTER EACH HIT...

    ////// I COULD ADD THE CSS COLOR AS A VALUE OF THE CARD OBJECTS!!!!!!!!!!!!!!!!!

    $result.hide();
    if (game.computerTotal() > 21){
      $result.text("Dealer Busts!!! Player Wins!!!").fadeIn(12000);
    } else if (game.computerTotal() === 21 && game.playerTotal() === 21){
      $result.text("Push!!! Both players have Blackjack").fadeIn(12000);
    } else if (game.playerTotal() === 21){
      $result.text("Player has Blackjack!!!").fadeIn(12000);
    } else if (game.computerTotal() > game.playerTotal()){
      $result.text("Dealer Wins!").fadeIn(12000);
    } else if (game.playerTotal() > game.computerTotal()){
      $result.text("Player Wins!").fadeIn(12000);
    } else if (game.computerTotal() === game.playerTotal()){
      $result.text("Dealer Wins!").fadeIn(12000);
    }
    $dealComp.hide();

    $submit.show();
    $submit.on('click', function(){     //reloads page to play again;
      location.reload();
    });
  });

});


// Blackjack.prototype.hit = function (){
//   $hit.show();
//   $hit.hide();
//   var playerHit = drawCard();
//   this.gameState[0].push(playerHit);
//   this.render();
//   if (this.playerTotal() > 21){
//     this.stand = true;
//     $hit.hide();
//     $stand.hide();
//   };
// };
//
// Blackjack.prototype.playerStand = function (){
//   this.stand = true;
//   $hit.hide();
//   $stand.hide();
// };
