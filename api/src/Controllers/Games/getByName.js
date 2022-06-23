const axios = require("axios");
const { Videogame, Op, Genre } = require("../../db");
const { YOUR_API_KEY } = process.env;

const getByName = async (name) => {
  try {
    const nameDb = Videogame.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: {
        model: Genre,
        as: "genres",
        attributes: ["name"],
      },
    });
    if (nameDb.legth) {
      return nameDb;
    }
    const nameVideogame = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`
    );
    let gameName = [];
    if (nameVideogame.data) {
      let r = nameVideogame.data.results;
      console.log("acaacca", r);
      gameName = r.map((v) => ({
        name: v.name,
        id: v.id,
        released: v.released,
        background_image: v.background_image,
        genres: v.genres.map((genre) => genre.name),
        rating: v.rating,
      }));
      return gameName;
    }
    let results = [...nameDb, ...gameName];

    return results;
  } catch (error) {
    console.log("hola3" + error);
    return { msg: "No se encontro" };
  }
};
module.exports = getByName;

// const axios = require("axios");
// const { Pokemon, Op, Type } = require("../../db");

// const getByName = async (name) => {
//   try {
//     const nombreDb = await Pokemon.findOne({
//       where: { name: { [Op.iLike]: `%${name}%` } },
//       include: { model: Type, attributes: ["name"], through: { type: [] } },
//     });
//     if (nombreDb) {
//       return nombreDb;
//     }
//     const namePokemon = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon/${name}`
//     );

//     if (namePokemon.data) {
//       const r = namePokemon.data;
//       const pokeName = {
//         name: name,
//         id: r.id,
//         img: r.sprites.other.home.front_default,
//         hp: r.stats[0].base_stat,
//         strength: r.stats[1].base_stat,
//         defense: r.stats[2].base_stat,
//         speed: r.stats[5].base_stat,
//         height: r.height,
//         weight: r.weight,
//         type: r.types.map((el) => el.type.name),
//       };
//       return pokeName;
//     }
//   } catch (error) {
//     console.log("hola3" + error);
//     return { msg: "No se encontro" };
//   }
// };
// module.exports = getByName;
