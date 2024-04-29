/* eslint-disable no-undef */
/// <reference types="cypress" />
describe('cards game', () => {
  beforeEach(() => {
    cy.viewport(1024, 900);
    cy.visit('http://localhost:8080');
  });

  it('at the start it has 16 cards, all closed', () => {
    cy.get('.game__card')
      .should('be.visible')
      .and('have.length', 16)
      .and('satisfy', (el) => {
        return !el.hasClass('game__card--open');
      });
  });

  it('on card click it opens and stay', () => {
    const randomCardIndex = Math.floor(Math.random() * 16);

    cy.get('.game__card').each((el, index) => {
      if (index === randomCardIndex) {
        cy.wrap(el)
          .click()
          .should('have.class', 'game__card--open')
          .children('p')
          .should('be.visible');
      }
    });
  });

  it('if cards found, they stay and become green', () => {
    let secondPairIndex = '';

    cy.get('.game__card').each((el, index) => {
      cy.then(() => {
        if (index === 0) return;
        if (secondPairIndex) return false;

        cy.get('.game__card').eq('0').click();
        cy.wrap(el).click();

        cy.get('.game__card')
          .eq('0')
          .children('p')
          .then((firstEl) => {
            if (firstEl.text() === el.text()) {
              secondPairIndex = index;

              cy.get('.game__card')
                .eq('')
                .should('have.class', 'game__card--found')
                .and('not.have.class', 'game__card--open');

              cy.get('.game__card')
                .eq(secondPairIndex)
                .should('have.class', 'game__card--found')
                .and('not.have.class', 'game__card--open');
            }
          });

        cy.wait(200);
      });
    });
  });

  it.only('closes unpaired cards when 3 was open', () => {
    let shouldStop = false;

    cy.get('.game__card').each((element, index) => {
      cy.then(() => {
        if (shouldStop) return false;

        cy.get('.game__card').then((el) => {
          if (index >= el.length - 3) {
            shouldStop = true
            throw new Error('number of cards ended');
          }
        });

        const firstEl = cy.get('.game__card').eq(index);
        const secondEl = cy.get('.game__card').eq(index + 1);
        const thirdEl = cy.get('.game__card').eq(index + 2);

        firstEl.click();
        secondEl.click();
        cy.wait(200);

        thirdEl.click();

        firstEl.then((el) => {
          if (!el.hasClass('game__card--found')) shouldStop = true;
        });
      });
    });
  });
});
