const router = require("express").Router();
const { YOUR_API_KEY } = process.env;
const axios = require("axios");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
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
    console.log(gameId);
    res.send(gameId);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

module.exports = router;
