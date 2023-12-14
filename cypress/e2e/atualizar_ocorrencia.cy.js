describe('Atualização de Ocorrência', () => {
  it('Deve atualizar a primeira ocorrência da lista com sucesso', () => {
      // Visitar a página de atualização
      cy.visit('http://localhost:3000/atualizar.html');

      // Clicar no botão de atualizar da primeira ocorrência listada
      cy.get('.ocorrencia button').first().click();

      // Modificar os campos do formulário
      cy.get('#titulo').clear().type('Titulo Atualizado 2');
      cy.get('#tipo').select('roubo');
      cy.get('#data').clear().type('2023-12-12');
      cy.get('#hora').clear().type('15:00');

      // Submeter o formulário de atualização
      cy.get('#formAtualizarOcorrencia').submit();

      // Verificar se a mensagem de sucesso é exibida
      cy.on('window:alert', (str) => {
          expect(str).to.equal('Ocorrencia atualizada com sucesso!');
      });

      // Verificar se a página foi redirecionada após a atualização
      cy.url().should('include', 'http://localhost:3000/atualizar.html');
  });
});
