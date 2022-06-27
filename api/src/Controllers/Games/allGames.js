const getApiGames = require("./getApiGames");
const getInfoDB = require("./getDBGames");
const { YOUR_API_KEY } = process.env;

const allGames = async () => {
  try {
    const api = await getApiGames(
      `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
    );
    const dbInfo = await getInfoDB();
    const allInfo = api.concat(dbInfo);
    return allInfo;
  } catch (error) {
    console.log(error);
  }
};

module.exports = allGames;
