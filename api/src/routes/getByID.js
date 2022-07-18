const router = require("express").Router();
const { YOUR_API_KEY } = process.env;
const axios = require("axios");

const { Videogame, Genre } = require("../db");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const dbGames = await Videogame.findOne({
      where: { id: id },
      include: {
        model: Genre,
        attribute: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (dbGames) {
      dbGames.platforms = dbGames.platforms.split(",");
      return res.json(dbGames);
    } else {
      const allGamesId = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`
      );
      const superData = allGamesId.data;
      const gameId = {
        id: superData.id,
        name: superData.name,
        background_image: superData.background_image,
        released: superData.released,
        rating: superData.rating,
        genres: superData.genres
          .map((e) => {
            return e.name;
          })
          .join(" "),
        platform: superData.platforms.map((e) => e.platform.name),
        description: superData.description_raw,
      };
      res.send(gameId);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
