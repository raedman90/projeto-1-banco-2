describe('Validação de Campos do Formulário de Cadastro de Ocorrências', () => {
  it('Deve mostrar alertas de erro quando campos obrigatórios estão vazios', () => {
      cy.visit('http://localhost:3000/cadastrar.html'); // URL
  
      // Deixando todos os campos vazios e tentando submeter o formulário
      cy.get('#formOcorrencia').submit();

      // Interceptando e verificando o alerta
      cy.on('window:alert', (alertText) => {
          expect(alertText).to.contains('O titulo e obrigatorio');
          expect(alertText).to.contains('A data e obrigatoria');
          expect(alertText).to.contains('A hora e obrigatoria');
      });
  });
});
