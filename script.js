class Deck {
    cards = [];
    suites = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    numbers = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];

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
    url = undefined;

    constructor(number, suit) {
        this.number = number;
        this.suit = suit;
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

//ask chatGPT why the neccessity of all the this keywords in javascript vs java
//ask why am I still confused and how do i overcome being stuck in the java mindset
//even tho the topics are the same
//ask for a general guideline of how to proceed from here using the DOM API

//implement function that runs a game of the deck of cards and connects to UI

var myDeck = new Deck();

var player1 = new Player('Player 1');
var player2 = new Player('Player 2');

player1.addToHand(myDeck);
player1.addToHand(myDeck);
player1.addToHand(myDeck);
console.log(player1.hand);