import { cardsArray } from "./cardsArray.js";
import Card from "./card.js";

export default class Cards {
  constructor(element, feedback, tries) {
    this.cards = [];
    this.currentVisible = [];
    this.element = element;
    this.feedback = feedback;
    this.found = [];
    this.triesElement = tries;
    this.tries = 0;
  }
  load(countOfMatches = 2) {
    // load the cards based on the count match
    for (let i = 0; i < cardsArray.length; i++) {
      const currentCard = cardsArray[i];
      for (let j = 0; j < countOfMatches; j++) {
        const { value, back, visible } = currentCard;
        const card = new Card(value, back, visible, `${value}_${i}_${j}`);
        this.cards.push(card);
      }
    }
    this.cards = this.shuffle(this.cards);
    this.cards.forEach(card => {
      this.addElements(card, card.id);
    });
  }
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }
  static createElement(type, classes = [], id, textContent) {
    const element = document.createElement(type);
    if (id) {
      element.id = `${id}`;
    }

    if (textContent) {
      element.textContent = textContent;
    }

    classes.forEach((c) => {
      element.classList.add(c);
    });
    return element;
  }
  addElements(card, index) {
    //turn this into utility
    const parent = Cards.createElement("section", ["card"], card.id);
    const front = Cards.createElement("div", ["front"], null, card.value);
    const back = Cards.createElement("div", ["back"], null, card.back);
    front.style.display = "none";

    parent.addEventListener("click", (event) => {
      if (card.visible || this.currentVisible.length == 2) return;
      this.handle(card, front, back);
    });

    parent.appendChild(front);
    parent.appendChild(back);

    card.element = parent;
    this.element.appendChild(parent);
  }
  handle(card) {
    if (this.currentVisible.length < 2) {
      this.currentVisible.push(card);
      card.visible = !card.visible;
      this.updateVisibility(card);
    }

    if (this.currentVisible.length == 2) {
      this.checkPair();
    }
  }
  cardsMatch(cardOne, cardTwo) {
    this.found.push(cardOne);
    this.found.push(cardTwo);
    this.updateFeedback('Cards match. Great job!');
    setTimeout(() => {
      this.checkWinner();
      this.currentVisible = [];
      this.updateFeedback('');
    }, 800);
  }
  updateFeedback(text) {
    this.feedback.textContent = text;
  }
  updateTries() {
    this.triesElement.textContent = this.tries;
  }
  cardsDoNotMatch(cardOne, cardTwo) {
    cardOne.visible = !cardOne.visible;
    cardTwo.visible = !cardTwo.visible;
    this.updateFeedback('Cards DO NOT match 😭');
    setTimeout(() => {
      this.updateVisibility(cardOne);
      this.updateVisibility(cardTwo);
      this.currentVisible = [];
      this.updateFeedback('');
    }, 800);
  }
  checkPair() {
    const [cardOne, cardTwo] = this.currentVisible;
    this.tries += 1;
    this.updateTries();
    if (cardOne.value == cardTwo.value) {
      this.cardsMatch(cardOne, cardTwo);
    } else {
      this.cardsDoNotMatch(cardOne, cardTwo);
    }
  }
  checkWinner() {
    if (this.found.length == cardsArray.length * 2) {
      console.log("Winner");
    }
  }
  updateVisibility(card) {
    const front = card.element.querySelector('.front');
    const back = card.element.querySelector('.back');
    if (card.visible) {
      front.style.display = "block";
      back.style.display = "none";
    } else {
      back.style.display = "block";
      front.style.display = "none";
    }
  }
}
