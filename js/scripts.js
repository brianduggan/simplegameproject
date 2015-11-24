// GAME STATE & LOGIC

// DISPLAY

// INTERACTION
var $playerScore = $('#player-score'),
    $playerCards = $('#player-cards'),
    $dealerScore = $('#dealer-score'),
    $dealerCards = $('#dealer-cards'),
    $hit = $('#hit'),
    $stand = $('#stand'),
    $dealComp = $('#deal-computer'),
    $result = $('#result');


// var deck = ["2♠","3♠","4♠","5♠","6♠","7♠","8♠","9♠","J♠","Q♠","K♠","A♠",
//         "2♣","3♣","4♣","5♣","6♣","7♣","8♣","9♣","J♣","Q♣","K♣","A♣",
//         "2♥","3♥","4♥","5♥","6♥","7♥","8♥","9♥","J♥","Q♥","K♥","A♥",
//         "2♦","3♦","4♦","5♦","6♦","7♦","8♦","9♦","J♦","Q♦","K♦","A♦"];

var deck = [
  {name: "2♠", value: 2, suit: "♠" }, {name: "3♠", value: 3, suit: "♠" },
  {name: "4♠", value: 4, suit: "♠" }, {name: "5♠", value: 5, suit: "♠" },
  {name: "6♠", value: 6, suit: "♠" }, {name: "7♠", value: 7, suit: "♠" },
  {name: "8♠", value: 8, suit: "♠" }, {name: "9♠", value: 9, suit: "♠" },
  {name: "10♠", value: 10, suit: "♠" }, {name: "J♠", value: 10, suit: "♠" },
  {name: "Q♠", value: 10, suit: "♠" }, {name: "K♠", value: 10, suit: "♠" },
  {name: "A♠", value: 11, suit: "♠", altValue: 1},
  {name: "2♣", value: 2, suit: "♣" }, {name: "3♣", value: 3, suit: "♣" },
  {name: "4♣", value: 4, suit: "♣" }, {name: "5♣", value: 5, suit: "♣" },
  {name: "6♣", value: 6, suit: "♣" }, {name: "7♣", value: 7, suit: "♣" },
  {name: "8♣", value: 8, suit: "♣" }, {name: "9♣", value: 9, suit: "♣" },
  {name: "10♣", value: 10, suit: "♣" }, {name: "J♣", value: 10, suit: "♣" },
  {name: "Q♣", value: 10, suit: "♣" }, {name: "K♣", value: 10, suit: "♣" },
  {name: "A♣", value: 11, suit: "♣", altValue: 1},
  {name: "2♥", value: 2, suit: "♥" }, {name: "3♥", value: 3, suit: "♥" },
  {name: "4♥", value: 4, suit: "♥" }, {name: "5♥", value: 5, suit: "♥" },
  {name: "6♥", value: 6, suit: "♥" }, {name: "7♥", value: 7, suit: "♥" },
  {name: "8♥", value: 8, suit: "♥" }, {name: "9♥", value: 9, suit: "♥" },
  {name: "10♥", value: 10, suit: "♥" }, {name: "J♥", value: 10, suit: "♥" },
  {name: "Q♥", value: 10, suit: "♥" }, {name: "K♥", value: 10, suit: "♥" },
  {name: "A♥", value: 11, suit: "♥", altValue: 1},
  {name: "2♦", value: 2, suit: "♦" }, {name: "3♦", value: 3, suit: "♦" },
  {name: "4♦", value: 4, suit: "♦" }, {name: "5♦", value: 5, suit: "♦" },
  {name: "6♦", value: 6, suit: "♦" }, {name: "7♦", value: 7, suit: "♦" },
  {name: "8♦", value: 8, suit: "♦" }, {name: "9♦", value: 9, suit: "♦" },
  {name: "10♦", value: 10, suit: "♦" }, {name: "J♦", value: 10, suit: "♦" },
  {name: "Q♦", value: 10, suit: "♦" }, {name: "K♦", value: 10, suit: "♦" },
  {name: "A♦", value: 11, suit: "♦", altValue: 1}
];


$hit.hide();
$stand.hide();
$dealComp.hide();

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

// //////// PARSING FUNCTIONS ////////
// function parseCard(card){
//   if (typeof card === 'string'){
//     var cardNum = card.substring(0,1);
//     return cardNum;
//   }
// }
//
// function parseSymbol(card){
//   var cardSym = card.substring(1,2);
//   return cardSym;
// }
// //////// END PARSING FUNCTIONS ////////

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
  this.handTotal = 0;
}

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

  $playerCards.empty();

  $playerScore.empty();
  $dealerScore.empty();

  for (var i = 0; i < this.gameState[0].length; i++){
    var $span;

    if (this.gameState[0][i].suit === "♥" || (this.gameState[0][i].suit) === "♦"){
      $span = $('<span>').css("color", "red");
      $span.append(this.gameState[0][i].name);
      $playerCards.append($span);
    } else {
      $span = $('<span>').css("color", "black");
      $span.append(this.gameState[0][i].name);
      $playerCards.append($span);
    } // end if
  } // end for

  for (var n = 0; i < this.gameState[1].length; n++){
    var $span;
    if (this.gameState[1][n].value === "X"){
      $span = $('<span>').text(" X ");
      $dealerCards.append($span);
  } else if (this.gameState[1][n].suit === "♥" ||  this.gameState[1][n].suit === "♦"){
      $span = $('<span>').css("color", "red");
      $span.append(this.gameState[1][n]);
      $dealerCards.append($span);
    } else {
      $span = $('<span>').css("color", "black");
      $span.append(this.gameState[1][i]);
      $dealerCards.append($span);
    } // end if
  } // end for

  $playerScore.append("Player has " + this.playerTotal());
  $dealerScore.append("Computer has the " + this.gameState[1][1].name);

};

// Blackjack.prototype.addEventListeners = function(){
//   var scope = this;
//   $hit.on('click', scope.hit);
//   $stand.on('click', scope.playerStand);
//
// };




$(document).ready(function(){
  var game = new Blackjack();
  $('#start').on('click', function(){
    $('#start').hide();
    game.render();
    $hit.show();
    $stand.show();
  });

  $hit.on('click', function (){
    $hit.show();

    var playerHit = drawCard();
    game.gameState[0].push(playerHit);
    game.render();
    if (game.playerTotal() > 21){
      game.stand = true;
      $hit.hide();
      $stand.hide();
      $dealComp.show();
    };
  });

  $stand.on('click', function(){
    game.stand = true;
    $hit.hide();
    $stand.hide();
    $dealComp.show();
  });

  $dealComp.on('click', function(){
    var dealerHand = game.gameState[1];
    var counter = game.computerTotal()
    while (counter < 17){
      console.log(counter);
      var computerHit = drawCard();
      game.gameState[1].push(computerHit);

      counter = game.computerTotal();
      console.log(counter);
    }
    $result.text("Dealer has " + game.computerTotal());

  })

});


///BE ABLE TO HIT UNTIL BUST OR STAND WHICH WILL SET STAND == TRUE
/// THEN .... IT WILL BE COMPUTERS TURN WHEN STAND == TRUE


// CREATE INDIVIDUAL BLACKJACK GAME
// var game = new Blackjack();
// game();
