import './css/normalize.css';
import './css/style.css';

function newGame() {
  game.innerHTML = '';
  btn.disabled = true;
  foundCards.splice(0, foundCards.length);
  let arr = generatePairedNumbers(cardsNumber);
  // arr = shuffle(arr);
  createCards(arr);
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
    card.classList.remove('game__card--open');
    card.classList.add('game__card--found');
    foundCards.push(card);
  }
}

function hideOpenedCards(cards) {
  for (let i = 0; i <= cards.length; i++) {
    const card = cards.pop();
    card.classList.remove('game__card--open');
  }
}

function createCards(arr) {
  for (const number of arr) {
    const card = document.createElement('div');
    const cardText = document.createElement('p');

    card.classList.add('game__card');

    cardText.classList.add('card__paragraph');
    cardText.textContent = number;

    card.append(cardText);

    const checkForWin = () => {
      if (foundCards.length === cardsNumber) {
        alert('You WIN!');
        btn.disabled = false;
      }
    };

    card.addEventListener('click', function () {
      if (
        foundCards.includes(card) ||
        openedCards.includes(card) ||
        openedCards.length >= 2
      )
        return;

      openedCards.push(card);
      card.classList.add('game__card--open');

      if (openedCards.length == 2) {
        openedCards[0].textContent === openedCards[1].textContent
          ? identicallityFound(openedCards)
          : setTimeout(() => hideOpenedCards(openedCards), 250);
      }

      setTimeout(() => checkForWin(), 1);
    });

    game.append(card);
  }
}

const cardsNumber = 16;

const main = document.createElement('main');
const game = document.createElement('div');
const btn = document.createElement('button');

const openedCards = [];
const foundCards = [];

btn.textContent = 'Сыграть ещё раз';

main.classList.add('main');
game.classList.add('game');
btn.classList.add('new-game-btn');

btn.addEventListener('click', function () {
  newGame();
});

document.body.appendChild(main);
main.appendChild(game);
main.appendChild(btn);

newGame();
