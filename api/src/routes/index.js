const { Router } = require("express");
const genres = require("./genres");
const postVid = require("./videogame");
const allGames = require("./allGames");
const getByID = require("./getByID");

const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogame", postVid);
router.use("/genres", genres);
router.use("/videogames", allGames);
router.get("/:id", getByID);

module.exports = router;
