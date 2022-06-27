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
        game2: payload,
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
    default:
      return state;
  }
}
