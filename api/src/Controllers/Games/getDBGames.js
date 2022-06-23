const { Genre, Videogame } = require("../../db");

const getInfoDB = async () => {
  const dbData = await Videogame.findAll({
    include: {
      model: Genre,
      attribute: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return dbData;
};

module.exports = getInfoDB;
