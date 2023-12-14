describe('Carregamento do Mapa', () => {
  it('Deve carregar o Google Maps', () => {
      cy.visit('http://localhost:3000/'); // URL
      cy.get('#map').should('be.visible');
  });
});
