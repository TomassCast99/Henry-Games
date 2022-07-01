const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      released: {
        type: DataTypes.DATEONLY,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      background_image: {
        type: DataTypes.STRING,
      },
      platforms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdDB: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
