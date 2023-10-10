module.exports = (sequelize, DataTypes) => {
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
  
    return Ocorrencia;
  };
  