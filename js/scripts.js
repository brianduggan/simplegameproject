console.log("...loaded");

// ♠  ♣  ♥  ♦

var $playerScore = $('#player-score'),
    $computerScore = $('#computer-score'),
    $playerCards = $('#player-cards'),
    $computerCards = $('#computer-cards'),
    $hit = $('#hit'),
    $stay = $('#stay'),
    $result = $('#result'),
    playerTotal,
    computerTotal,
    deck = ["2♠","3♠","4♠","5♠","6♠","7♠","8♠","9♠","J♠","Q♠","K♠","A♠",
            "2♣","3♣","4♣","5♣","6♣","7♣","8♣","9♣","J♣","Q♣","K♣","A♣",
            "2♥","3♥","4♥","5♥","6♥","7♥","8♥","9♥","J♥","Q♥","K♥","A♥",
            "2♦","3♦","4♦","5♦","6♦","7♦","8♦","9♦","J♦","Q♦","K♦","A♦"];

$hit.hide();
$stay.hide();

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

//////// PARSING FUNCTIONS ////////
function parseCard(card){
  var cardNum = card.substring(0,1);
  return cardNum;
}

function parseSymbol(card){
  var cardSym = card.substring(1,2);
  return cardSym;
}
//////// END PARSING FUNCTIONS ////////

//////// CONTAINS AN ACE? ////////
function containsAce(hand){
  var aceCount = 0;
  for (var i = 0; i < hand.length; i++) {
    if (parseCard(hand[i]) === "A"){
      aceCount += 1;
    } // end if
  } // end for

  return aceCount;
}
//////// END CONTAINS ACE ////////

//////// DISPLAY HAND FUNCTION ////////
function displayHand(cards, player){
  var cardArray = cards;
  var currentPlayer = player;
  var divAppend;

  if (typeof cardArray === 'string'){
    cardArray = []
    cardArray.push(cards)
  }
  if (currentPlayer === "player"){
    divAppend = $playerCards;
  } else {
    divAppend = $computerCards;
  }
  for (var i = 0; i < cardArray.length; i++){
    var $span;
    if (cardArray[i] === "X"){
      $span = $('<span>').text(" X ");
      divAppend.append($span);
    } else if (parseSymbol(cardArray[i]) === "♥" || parseSymbol(cardArray[i]) === "♦"){
      $span = $('<span>').css("color", "red");
      $span.append(cardArray[i]);
      divAppend.append($span);
    } else {
      $span = $('<span>').css("color", "black");
      $span.append(cardArray[i]);
      divAppend.append($span);
    } // end if
  } // end for

} //////// END DISPLAY HAND FUNCTION ////////

//////// DISPLAY SCORE FUNCTION ////////
function displayScore(total, player){

  if (player === "player"){
    $playerScore.text("Player has " + total);
  } else {
    $computerScore.text("Computer has " + total);
  }


} //////// END DISPLAY SCORE FUNCTION ////////

//////// FIND HAND TOTALS ////////
function handTotal(hand){
  var handArray = hand;
  var handTotal = 0;
  var aces = containsAce(hand);

  for (var i = 0; i < hand.length; i++) {
    if (parseCard(hand[i]) === "A"){
      hand[i] = 11;
    } else if (parseCard(hand[i]) === "K"|| parseCard(hand[i]) === "Q" || parseCard(hand[i]) === "J"){
      hand[i] = 10;
    } else {
      hand[i] = parseInt(hand[i]);
    } // end if
  } // end for

  for (var n = 0; n <handArray.length; n++){
    handTotal += handArray[n];
  }

  if (handTotal > 21 && aces > 0) {
    handTotal = ( (handTotal - (aces*11) ) + aces);
  }

  return handTotal;

} //////// END HAND TOTAL FUNCTION ////////


function roundOne(){
  var computer1 = drawCard(),
      computer2 = drawCard(),
      player1 = drawCard(),
      player2 = drawCard(),
      computerHand = [computer1, computer2],
      playerHand = [player1, player2];
  computerTotal = handTotal(computerHand);
  playerTotal = handTotal(playerHand);

  displayHand([player1, player2], "player");
  displayHand(["X", computer2], "dealer");
  console.log("The Computer draws " + computer1 + " and " + computer2);
  console.log("The Player draws " + player1 + " and " + player2);

  displayScore(computerTotal, "computer");
  displayScore(playerTotal, "player")
  return[ [player1,player2], playerTotal, [computer1,computer2], computerTotal ];
} ///// END START GAME FUNCTION /////

function playerBust(total){
  var player = total;
  console.log(player);
  if (player > 21) {
    console.log("hello!");
    $result.text("Player Busts!!!");
    return total;
  } else if (player === 21){
    $result.text("Blackjack");
  } else {
    $hit.show();
    $stay.show();
    return total;
  }
};


//////// SHOULD PLAYER HIT OR STAND ////////

function playerMove(array){
  var oldPlayerHand = array[0];
  var player = array[1];

  if (player > 20){
    $hit.hide();
    $stay.hide();
    return [oldPlayerHand];
  } else if (player < 21){
    $hit.show();
    $stay.show();
    $hit.on('click',function (){
      var newCard = drawCard();
      displayHand(newCard, "player");
      oldPlayerHand.push(newCard);
      player = handTotal(oldPlayerHand);
      displayScore(player,"player");
      $hit.hide();
      $stay.hide();
    });

    $stay.on('click',function (){
      $hit.hide();
      $stay.hide();
      return [oldPlayerHand];
    });
  }

} //////// END PLAYER HIT STAND FUNCTION ///////



//////// SHOULD DEALER STAND ////////
function dealerStand (array){
  var dealer = handTotal(array[1]);
  if (dealer > 21) {
    return "Bust";
  } else if (dealer === 21){
    return "Blackjack";
  } else if (dealer < 21 && dealer > 16){
    return "Stand";
  } else {
    return "Hit";
  } // end if
} //////// END DEALER STAND FUNCTION ////////


///////////////////////////
// function testWin (array){
//   var dealerHand = array[1];
//   var playerHand = array[0];
//   var output = 0;
//
//   if (dealerHand === playerHand && dealerHand === 21) {
//         console.log("Two Blackjacks! Push!");
//         return "Push"
//   }  else if (playerHand === 21){
//         console.log("You Win!");
//         return "Player"
//   }  else if (dealerHand === 21){
//         console.log("Blackjack! Dealer Wins!");
//         return "Computer"
//   } else if (dealerHand > 16 && playerHand > dealerHand){
//         console.log("You Win!");
//   } else if (dealerHand > 16){
//         console.log("Dealer Stands");
//   } else {
//         console.log("Dealer Hits!");
//   }
//
//   //pseudo-code--- set console.logs to dealerOutput, then insert DealerOutput into DOM visually
//   //               then...
//
//
// }

/*

Idea... until player total is over 20 show hit and stand... press stand and hide hit, stand

while player < 20 ||¥


other idea, set span equal to player total, do a while loop on $.text() === of it


*/


function startGame(){

  var firstRound = roundOne();
  console.log(playerTotal);
  var playerStart = playerMove(firstRound);

}


 // DISABLE FOR TESTING PURPOSES
$('#start').on('click', function(e){
  e.preventDefault();
  startGame();
  $('#start').hide();
});
