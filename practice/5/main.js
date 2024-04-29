import Card from "./Card.js";
import AmazingCard from "./AmazingCard.js"

addEventListener("DOMContentLoaded", function () {
    const cardsNumber = 16;
    const game = document.getElementById("game");
    const btn = document.getElementById("new-game-btn");
    const openedCards = [];
    const foundCards = [];

    function newGame() {
        game.innerHTML = '';
        btn.disabled = true;
        foundCards.splice(0, foundCards.length);
        let arr = generatePairedNumbers(cardsNumber);
        arr = shuffle(arr)
        createCards(arr)
    }

    function generatePairedNumbers(couplesNumber) {
        let arr = [...Array(couplesNumber / 2)].map((_, i) => i + 1);
        return arr.concat(arr).sort();
    }

    function shuffle(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }

    function identicallityFound(cards) {
        for (let i = 0; i <= cards.length; i++) {
            const card = cards.pop();
            card.open = false;
            card.success = true;
            foundCards.push(card);
        }
    }

    function hideOpenedCards(cards) {
        for (let i = 0; i <= cards.length; i++) {
            const card = cards.pop();
            card.open = false;
        }
    }

    function createCards(arr) {
        for (const number of arr) {
            const card = new AmazingCard(game, number);

            const checkForWin = () => {
                if (foundCards.length === cardsNumber) {
                    alert('You WIN!')
                    btn.disabled = false;
                }
            }

            card.cardElement.addEventListener("click", function () {
                if (foundCards.includes(card) ||
                    openedCards.includes(card) ||
                    openedCards.length >= 2) return;

                openedCards.push(card);
                card.open = true;

                if (openedCards.length == 2) {
                    openedCards[0].cardNumber === openedCards[1].cardNumber ? identicallityFound(openedCards) : setTimeout(() => hideOpenedCards(openedCards), 250);
                }

                setTimeout(() => checkForWin(), 1);;
            });
        }
    }

    btn.addEventListener('click', function () { newGame() });

    newGame();
});