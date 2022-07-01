const router = require("express").Router();

const allGames = require("../Controllers/Games/allGames");
const getByName = require("../Controllers/Games/getByName");

const { YOUR_API_KEY } = process.env;

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const byName = await getByName(name);
      res.json([byName]);
    } else {
      const allGam = await allGames();
      res.json(allGam);
    }
  } catch (error) {
    res.status(400).json({ msg: "No se encontro el juego solicitado" });
  }
});

module.exports = router;
