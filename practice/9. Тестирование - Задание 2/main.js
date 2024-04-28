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
      for(let i = 0; i <= cards.length; i++) {
        card = cards.pop();
        card.classList.remove('game__card--open');
        card.classList.add('game__card--found');
        foundCards.push(card);
      }
    }
  
    function hideOpenedCards(cards) {
      for(let i = 0; i <= cards.length; i++) {
        card = cards.pop();
        card.classList.remove('game__card--open');
      }
    }
  
    function createCards(arr) {
      for (number of arr) {
        const card = document.createElement("div");
        const cardText = document.createElement("p");
  
        card.classList.add("game__card");
        card.id = `card-${number}`;
  
        cardText.classList.add('card__paragraph');
        cardText.textContent = number;
  
        card.append(cardText)
  
        const checkForWin = () => {
          if(foundCards.length === cardsNumber) {
            alert('You WIN!')
            btn.disabled = false;
          }
        }
  
        card.addEventListener("click", function () {
          if(foundCards.includes(card) ||
            openedCards.includes(card) ||
            openedCards.length >= 2) return;
  
          openedCards.push(card);
          card.classList.add('game__card--open');
  
          if(openedCards.length == 2) {
            openedCards[0].textContent === openedCards[1].textContent ? identicallityFound(openedCards) : setTimeout(() => hideOpenedCards(openedCards), 250);
          }
  
          setTimeout(() => checkForWin(), 1);;
        });
  
        game.append(card);
      }
    }
  
    btn.addEventListener('click', function() { newGame() });
  
    newGame();
  });