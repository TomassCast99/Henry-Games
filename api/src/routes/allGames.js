const router = require("express").Router();

const allGames = require("../Controllers/Games/allGames");
const getByName = require("../Controllers/Games/getByName");

const { YOUR_API_KEY } = process.env;

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const n = name.toLowerCase();
      const byName = await getByName(n);
      res.json([byName]);
    } else {
      const allGam = await allGames();
      res.json(allGam);
    }
  } catch (error) {
    res.status(400).json({ msg: "No se encontro el juego solicitado" });
  }
});
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   try {
//     const allGamesId = await axios.get(
//       `https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`
//     );
//     console.log(allGamesId);
//     if (id) {
//       const filterId = allGamesId.filter((e) => e.id == id);
//       if (filterId) {
//         res.json(filterId);
//       } else res.status(404).send("No se encontro el id");
//     }
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

module.exports = router;
