# Projeto 1 - Banco de Dados 2

Este projeto é uma aplicação web para registro e visualização de ocorrências policiais, incluindo informações como título, tipo, data, hora e localização geográfica. O projeto foi desenvolvido como parte da disciplina de Banco de Dados 2.

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize
- Cors
- Dotenv
- Nodemon
- PostgreSQL com PostGIS
- Google Maps JavaScript API

## Configuração do Ambiente

```bash
git clone https://github.com/raedman90/projeto-1-banco-2.git
cd projeto-1-banco-2
npm install

- Crie o arquivo .env e preencha com as informações.
DB_HOST =
DB_USER =
DB_PASS
DB_DATABASE =
API_PORT =

- Utilize o comando abaixo para criar a tabela Ocorrencias no seu banco de dados PostGIS.
npx sequelize-cli db:migrate

npm start
