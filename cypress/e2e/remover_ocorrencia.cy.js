describe('Remover de Ocorrencia', () => {
  it('Deve remover uma ocorrencia com sucesso', () => {
      cy.visit('http://localhost:3000/remover.html'); // Substitua pela URL correta

      // Interceptando chamadas de 'confirm'
      cy.on('window:confirm', () => true);

      // Aqui estamos assumindo que o primeiro botão de 'Remover' na lista será clicado
      cy.get('.ocorrencia button').first().click();

      // Verificar se a mensagem de sucesso é exibida
      cy.on('window:alert', (str) => {
          expect(str).to.equal('Ocorrencia removida com sucesso!');
      });
  });
});
