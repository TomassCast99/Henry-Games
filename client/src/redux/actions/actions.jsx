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
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/videogames?name=` + name)
      .then((res) => {
        return dispatch({
          type: "GET_NAME",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function getDetail(id) {
  return function (dispatch) {
    console.log("aca act", id);
    axios
      .get("http://localhost:3001/videogames/" + id)
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
