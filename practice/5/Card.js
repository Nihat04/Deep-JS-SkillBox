export default class Card {
    constructor(container, cardNumber) {
        this.container = container;
        this.cardElement = this.createElement();
        this.cardNumber = cardNumber;
        return this
    }

    createElement() {
        const card = document.createElement("div");
        const cardText = document.createElement("div");
  
        card.classList.add("game__card");
  
        cardText.classList.add('card__paragraph');
        this.cardNumber;
  
        card.append(cardText)
  
        this.container.append(card);
        return card
    }

    set cardNumber(value) {
        this._cardNumber = value;
        this.cardElement.querySelector('.card__paragraph').textContent = this._cardNumber;
    }
    get cardNumber() {
        return this._cardNumber;
    }

    set open(value) {
        if(value) {
            this.cardElement.classList.add('game__card--open');
        } else {
            this.cardElement.classList.remove('game__card--open');
        }
    }
    get open() {
        return this.cardElement.classList.contains('game__card--open');
    }

    set success(value) {
        if(value) {
            this.cardElement.classList.add('game__card--found');
        } else {
            this.cardElement.classList.remove('game__card--found');
        }
    }
    get success() {
        return this.cardElement.classList.contains('game__card--found');
    }

}