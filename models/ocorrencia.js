const { DataTypes } = require('sequelize');
const sequelize = require('../database/server');

const Ocorrencia = sequelize.define('Ocorrencia', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    localizacao: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false
    }
});

module.exports = Ocorrencia;
