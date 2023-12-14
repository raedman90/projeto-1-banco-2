describe('Atualização de Ocorrência', () => {
  it('Deve redirecionar para a página de atualização ao clicar em atualizar', () => {
      cy.visit('http://localhost:3000/atualizar.html'); // URL

      // Clicando no botão de atualização da primeira ocorrência
      cy.get('.ocorrencia button').first().click();

      // Verificando se o redirecionamento ocorreu com o ID correto na URL
      cy.url().should('include', '/ajustar.html?id=');
  });
});
