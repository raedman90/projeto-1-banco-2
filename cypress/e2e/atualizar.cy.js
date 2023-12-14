describe('Listagem de Ocorr�ncias', () => {
  it('Deve exibir as ocorr�ncias corretamente', () => {
      cy.visit('http://localhost:3000/atualizar.html'); // URL

      // Verificando se as ocorr�ncias s�o exibidas
      cy.get('.ocorrencia').should('have.length.at.least', 1);
  });
});
