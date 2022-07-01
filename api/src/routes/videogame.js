const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  let { name, description, rating, background_image, platforms, genres } =
    req.body;

  try {
    if (!name || !description || !genres || !platforms) {
      return res.status(400).send("Faltan parametros");
    }
    const findVideogame = await Videogame.findAll({ where: { name: name } });
    if (findVideogame.length != 0) {
      return res.send("El nombre ya esta en uso");
    }

    let genreGame = await Genre.findAll({
      where: { name: genres },
    });
    if (genreGame.length === 0) {
      return res.send("se debe ingresar un genero valido");
    }

    let id = Math.floor(Math.random() * 1234567);

    let createGame = await Videogame.create({
      id: id,
      name,
      description,
      rating,
      background_image,
      platforms: platforms.toString(),
    });
    if (createGame) console.log(createGame);

    createGame.addGenre(genreGame);

    res.send("El jueguito fue creado con exito");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
