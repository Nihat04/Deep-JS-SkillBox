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
      if (index === 0 || secondPairIndex) return;

      cy.get('.game__card').eq('0').click();
      cy.wrap(el).click();

      cy.get('.game__card')
        .eq('0')
        .children('p')
        .then((pureEl) => {
          if (pureEl.text() === el.text()) {
            secondPairIndex = el.text();
          }
        });

      cy.wait(200);
    });

    cy.get('.game__card')
      .eq('0')
      .should('have.class', 'game__card--found')
      .and('not.have.class', 'game__card--open');

    cy.get('.game__card')
      .eq(secondPairIndex)
      .should('have.class', 'game__card--found')
      .and('not.have.class', 'game__card--open');
  });
});
