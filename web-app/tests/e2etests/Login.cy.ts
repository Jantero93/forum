/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Write admin to Email input', () => {
    const username = 'admin';
    cy.get('input[name="Email"]')
      .focus()
      .type(username)

      .should('have.value', username);
  });

  it('Write admin to Password input', () => {
    const password = 'root';
    cy.get('input[name="Password"]')
      .focus()
      .type(password)
      .should('have.length.of', password);
  });
});

// Empty export sp that build will success
export {};
