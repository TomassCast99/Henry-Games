const initialState = {
  games: [],
  games2: [],
  genres: [],
  detail: {},
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_ALL_GAMES":
      return {
        ...state,
        games: payload,
        games2: payload,
      };

    case "GET_ALL_GENRES":
      return {
        ...state,
        genres: payload,
      };

    case "GET_NAME":
      let nombres =
        payload === ""
          ? state.games2
          : state.games2.filter((e) =>
              e.name.toLowerCase().includes(payload.toLowerCase())
            );
      return {
        ...state,
        games: nombres,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: payload,
      };

    case "CLEAN_FILTERS":
      return {
        ...state,
        games2: state.games,
      };

    case "RES_STATE":
      return {
        ...state,
        detail: [],
      };

    case "HANDLER_NAME":
      let sortAlf;
      if (payload === "asc") {
        sortAlf = state.games.sort((a, b) => {
          if (a.name.charAt(0) > b.name.charAt(0)) {
            return 1;
          }
          if (a.name.charAt(0) < b.name.charAt(0)) {
            return -1;
          }
          return 0;
        });
      } else if (payload === "desc") {
        sortAlf = state.games.sort((a, b) => {
          if (a.name.charAt(0) > b.name.charAt(0)) {
            return -1;
          }
          if (a.name.charAt(0) < b.name.charAt(0)) {
            return 1;
          }
          return 0;
        });
      } else {
        sortAlf = state.games;
      }
      return {
        ...state,
        games: sortAlf,
      };

    case "HANDLE_FILTERS":
      let games2 = state.games2;
      const { origin } = payload;

      if (origin === "apiGames") {
        games2 = games2.filter((videogame) => !videogame.createdDB);
      }
      if (origin === "dbGames") {
        games2 = games2.filter((videogame) => videogame.createdDB);
      }

      return {
        ...state,
        games: games2,
      };

    case "HANDLER_RATING":
      let rating =
        payload === "desc"
          ? state.games.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.games.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        games: rating,
      };

    case "HANDLER_GENRES":
      let generos =
        payload === "all"
          ? state.games2
          : state.games2.filter((e) => e.genres.includes(payload));
      return {
        ...state,
        games: generos,
      };

    default:
      return state;
  }
}
