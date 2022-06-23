const { Router } = require("express");
const { getAllGenres } = require("../Controllers/Genres/getGenres");

const genres = Router();

genres.get("/", getAllGenres);

module.exports = genres;
