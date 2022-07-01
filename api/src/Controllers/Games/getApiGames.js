const axios = require("axios");

var apiInfo = [];

const getApiGames = async (url) => {
  try {
    if (apiInfo.length <= 100) {
      const apiUrl = await axios.get(url);
      const data2 = await axios.get(apiUrl.data.next);
      const data3 = await axios.get(data2.data.next);
      const data4 = await axios.get(data3.data.next);
      const data5 = await axios.get(data4.data.next);

      const union = data3.data.results.concat(data4.data.results);
      const filtro = apiUrl.data.results.concat(data2.data.results);
      const td = filtro.concat(union);
      const todo = data5.data.results.concat(td);

      apiInfo = todo.map((e) => {
        return {
          id: e.id,
          name: e.name,
          background_image: e.background_image,
          released: e.released,
          rating: e.rating,
          genres: e.genres
            .map((e) => {
              return e.name;
            })
            .join(" "),
          platform: e.platforms.map((e) => e.platform.name),
        };
      });
      return apiInfo;
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = getApiGames;
