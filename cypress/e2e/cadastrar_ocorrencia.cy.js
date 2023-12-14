describe('Cadastro de Ocorrência', () => {
  it('Deve cadastrar uma nova ocorrência com sucesso', () => {
      cy.visit('http://localhost:3000/cadastrar.html'); // URL para cadastrar ocorrencias

      // Preenchendo os campos visíveis do formulário
      cy.get('#titulo').type('Ocorrência Teste Cypress');
      cy.get('#tipo').select('assalto');
      cy.get('#data').type('2023-12-12');
      cy.get('#hora').type('15:00');

      // Clicando no botão 'Cadastrar'
      cy.get('button[type="submit"]').click();

      // Verificar se a mensagem de sucesso é exibida
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Ocorrencia cadastrada com sucesso!');
      });
  });
});
