import Card from "./Card.js";

export default class AmazingCard extends Card {
    set cardNumber(value) {
        const cardsImgArray = [
            './img/img1.jpg',
            './img/img2.jpg',
            './img/img3.jpg',
            './img/img4.jpg',
            './img/img5.jpg',
            './img/img6.jpg',
            './img/img7.jpg',
            './img/img8.jpg',
        ]

        const img = document.createElement('img');
        img.classList.add('card__img')
        this._cardNumber = cardsImgArray[value-1];
        img.src = this._cardNumber;
        if(this.cardElement) this.cardElement.querySelector('.card__paragraph').append(img);
    }

    get cardNumber() {
        return this._cardNumber;
    }
}