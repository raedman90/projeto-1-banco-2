const mongoose = require('mongoose');
const Redis = require('ioredis'); // Importe o pacote ioredis
const dotenv = require('dotenv'); // Importe o pacote dotenv para carregar variáveis de ambiente

// Carregue as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração do Redis
const redis = new Redis({
  host: process.env.REDIS_HOST, // Use a variável de ambiente REDIS_HOST
  port: process.env.REDIS_PORT, // Use a variável de ambiente REDIS_PORT
  password: process.env.REDIS_PASSWORD, // Use a variável de ambiente REDIS_PASSWORD
});

// Função para conectar ao MongoDB
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log('Conectado ao MongoDB Atlas');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB Atlas:', error);
    process.exit(1);
  }
};

// Função para conectar ao Redis
const connectRedis = async () => {
  try {
    await redis.ping();
    console.log('Conectado ao Redis');
  } catch (error) {
    console.error('Erro ao conectar ao Redis:', error);
    process.exit(1);
  }
};

// Função para iniciar todas as conexões
const connectDB = async () => {
  await connectMongoDB();
  await connectRedis();
};

module.exports = {
  connectDB,
  redis // Exporte a instância
};
