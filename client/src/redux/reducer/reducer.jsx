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
      return {
        ...state,
        games2: payload,
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
        sortAlf = state.games2.sort((a, b) => {
          if (a.name.charAt(0) > b.name.charAt(0)) {
            return 1;
          }
          if (a.name.charAt(0) < b.name.charAt(0)) {
            return -1;
          }
          return 0;
        });
      } else if (payload === "desc") {
        sortAlf = state.games2.sort((a, b) => {
          if (a.name.charAt(0) > b.name.charAt(0)) {
            return -1;
          }
          if (a.name.charAt(0) < b.name.charAt(0)) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        games: sortAlf,
      };

    default:
      return state;
  }
}
