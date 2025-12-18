class Deck {
    cards = [];
    suites = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
    numbers = ["A",2,3,4,5,6,7,8,9,10,'J','Q','K'];

    constructor(){
        this.initCards();
        this.shuffleDeck();
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
    number = "";
    suit = "";
    url = 0;

    constructor(number, suit) {
        this.number = number;
        this.suit = suit;
        this.url += 1;
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

}

function gameRound() {
    var myDeck = new Deck();
    var player1 = new Player('Player 1');
    var player2 = new Player('Player 2');
    player1.addToHand(myDeck);
    player1.addToHand(myDeck);
    player1.addToHand(myDeck);
    player2.addToHand(myDeck);
    player2.addToHand(myDeck);
    player2.addToHand(myDeck);
}

function onButton() {
    document.getElementById("match-summary").innerHTML = "It works!!!";
}

document.addEventListener("DOMContentLoaded", function() {
    var button = document.querySelector(".shuffle-button");
    button.addEventListener("click", onButton);
});