class Deck {
    cards = [];
    suites = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
    numbers = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];

    constructor(){
        this.initCards();
        this.shuffleDeck();
        Card.amountMade = 0;
    }
  
    initCards(){
      for(var suit of this.suites){
        for(var number of this.numbers){
          var card = new Card(number, suit);
          this.cards.push(card);;
        }
      }
    }

    //Fisher Yates Algorithm
    shuffleDeck() {
        for (var card = this.cards.length - 1; card >= 0; card--) {
            var randNum = Math.floor(Math.random() * (card + 1));
            var temp = this.cards[card];
            this.cards[card] = this.cards[randNum];
            this.cards[randNum] = temp;
        }
    }
  
    draw(){
        var cardToReturn = "";
        cardToReturn = this.cards.pop();
        return cardToReturn;
    }
}

class Card {
    number = 0;
    suit = "";
    url = 0; //creates deck of cards with corresponding image file name
    static amountMade = 0; //tracks the number of cards made to map to image name

    constructor(number, suit) {
        this.number = number;
        this.suit = suit;
        Card.amountMade += 1;
        this.url = Card.amountMade;
    }

    recalculateFaceCard() {
        switch (this.number) {
            case 'J':
            case 'Q':
            case 'K':
                return 10;
            case 'A':
                return 1;
            default:
                return this.number;
    }
  }
}

class Player { 
  name = "";
  hand = [];
  constructor(name){
    this.name = name;
  }
  
  addToHand(deck){
    if(!deck || !deck.cards || !deck.cards.length) return;
    
    var card = deck.draw();
    this.hand.push(card);
  }

  getTotalInHand() {
    var total = 0;
    for(var card of this.hand) {
        var num = card.recalculateFaceCard();
        total += num;
    }
    return total;
  }

}

function initGame(player1, player2) {
    var myDeck = new Deck();
    player1.addToHand(myDeck);
    player1.addToHand(myDeck);
    player1.addToHand(myDeck);
    player2.addToHand(myDeck);
    player2.addToHand(myDeck);
    player2.addToHand(myDeck);
}

function updateCardUI(player, htmlId) {
    for(var i = 1; i <= 3; i++) {
        var num = player.hand[i - 1].url; //retrieves corresponding url of card in players hand
        var imgTag = document.getElementById(htmlId + i);
        imgTag.setAttribute('src', 'images/card/' + num + '.png');
    }
}

function onButton() {
    var player1 = new Player('Player 1');
    var player2 = new Player('Player 2');
    initGame(player1, player2);
    updateCardUI(player1, "player1-card");
    updateCardUI(player2, "player2-card");

    var p1Total = player1.getTotalInHand();
    var p2Total = player2.getTotalInHand();
    var summary = `${player1.name} has a total score of ${p1Total}. ${player2.name} has a total score of ${p2Total}. `;
    if (p1Total > p2Total) {
        summary += `${player1.name} wins!`;
    }
    else if (p1Total < p2Total) {
        summary += `${player2.name} wins!`;
    }
    else {
        summary += `It's a tie!`;
    }
    document.getElementById("match-summary").innerHTML = summary;
}

var button = document.querySelector(".shuffle-button");
button.addEventListener("click", onButton);