const { development } = require('../config/config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(development.database, development.username, development.password, {
  host: development.host,
  dialect: development.dialect
});

// Verificar a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

module.exports = sequelize;
