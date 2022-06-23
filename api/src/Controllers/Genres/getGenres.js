const axios = require("axios");
const { Genre } = require("../../db");
const { YOUR_API_KEY } = process.env;

module.exports = {
  async getAllGenres(req, res) {
    try {
      let genres = await Genre.findAll({ attributes: ["name"] });
      if (!genres.length) {
        let url = `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`;
        genres = await axios.get(url);
        genres = genres.data.results.map((result) => ({
          name: result.name,
        }));
        await Genre.bulkCreate(genres);
      }
      res.json(genres);
    } catch (error) {
      console.log(error);
    }
  },
};
