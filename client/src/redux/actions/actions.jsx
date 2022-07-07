import axios from "axios";

export function getGames() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/videogames")
      .then((res) => {
        return dispatch({
          type: "GET_ALL_GAMES",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function getGenres() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/genres")
      .then((res) => {
        return dispatch({
          type: "GET_ALL_GENRES",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function getName(name) {
  return {
    type: "GET_NAME",
    payload: name,
  };
}

export function getDetail(id) {
  return function (dispatch) {
    console.log("aca act", id);
    axios
      .get("http://localhost:3001/" + id)
      .then((res) => {
        return dispatch({
          type: "GET_DETAILS",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function postGame(payload) {
  return async function () {
    const create = await axios.post("http://localhost:3001/videogame", payload);
    return create;
  };
}

export function cleanFilters(payload) {
  return {
    type: "CLEAN_FILTERS",
    payload: payload,
  };
}

export function resState() {
  return {
    type: "RES_STATE",
  };
}

export function handlerOrder(payload) {
  return {
    type: "HANDLER_NAME",
    payload: payload,
  };
}

export function handleFilter(payload) {
  return {
    type: "HANDLE_FILTERS",
    payload: payload,
  };
}

export const handlerRating = (payload) => {
  return {
    type: "HANDLER_RATING",
    payload: payload,
  };
};

export const handlerGenres = (payload) => {
  // este payload representa el valor de input, es decir el valor de nuestro select
  return {
    type: "HANDLER_GENRES",
    payload: payload,
  };
};
