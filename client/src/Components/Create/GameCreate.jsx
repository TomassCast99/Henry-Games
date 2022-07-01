import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenres,
  resState,
  postGame,
  getGames,
} from "../../redux/actions/actions";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { validation } from "../Validations/Validations";

import "./GameCreate.css";

export default function GameCreate() {
  const dispatch = useDispatch();
  const allGenres = useSelector((e) => e.genres);
  const allGames = useSelector((e) => e.games);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  let platformss = [
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo",
    "PS Vita",
    "PSP",
    "Wii",
    "Game Boy",
    "Atari",
    "SEGA",
    "PS5",
    "PS4",
    "PS3",
    "PS2",
    "PS1",
  ];

  const [input, setInput] = useState({
    name: "",
    description: "",
    rating: "",
    genres: [],
    platforms: [],
    image: "",
    createdInBd: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getGenres());
    dispatch(resState(resState));
    dispatch(getGames());
  }, [dispatch]);

  function handleSubmit(e) {
    let regexName = /^[A-Z][a-z]{4,10}$/;
    console.log(input);
    const a = allGames.filter((b) => b.name === input.name);
    if (a.length > 0) {
      return alert("There is already a game with that name, try another");
    }
    if (
      input.name.length &&
      regexName.test(input.name) &&
      input.description.length &&
      input.rating.length &&
      input.genres.length &&
      input.platforms.length
    ) {
      let crear = {
        name: input.name,
        description: input.description,
        rating: input.rating,
        image: input.image,
        genres: input.genres.join(", "),
        platforms: input.platforms.join(", "),
      };

      dispatch(postGame(crear));
      setLoading(false);
      setResponse(true);

      setTimeout(() => setResponse(false), 3000);
      window.location.replace("");
    } else {
      setErr(true);
      setLoading(false);
      setTimeout(() => setErr(false), 3000);
    }
  }
  function handelChange(e) {
    console.log(e.target.name);
    console.log(input);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectGenres(e) {
    if (!input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
  }
  function handleSelectPlat(e) {
    if (!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      genres: input.genres.filter((temp) => temp !== e.target.value),
      platforms: input.platforms.filter((plat) => plat !== e.target.value),
    });
  }

  return (
    <div className="formPerfil">
      <div className="up-things">
        <Link to="/home">
          <button className="boton">Home</button>
        </Link>
      </div>
      <div>
        <h1 className="titleForm">Create Game</h1>
      </div>

      <div className="form" onSubmit={resState}>
        <div>
          <label className="title5">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Game name"
            value={input.name}
            onChange={(e) => handelChange(e)}
            required
          />

          <strong>{errors.name}</strong>
        </div>
        <div>
          <label className="title5">Rating:</label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={input.rating}
            onChange={(e) => handelChange(e)}
            min="1"
            max="5"
            required
          />

          <strong>{errors.rating}</strong>
        </div>
        <div>
          <label className="title5">Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={input.description}
            onChange={(e) => handelChange(e)}
            required
          />

          <strong>{errors.description}</strong>
        </div>
        <div>
          <label name="image" className="title5">
            Image:
          </label>
          <input
            name="image"
            value={input.image}
            placeholder="URL"
            onChange={(e) => handelChange(e)}
            required
          ></input>
        </div>
        <div>
          <label className="title5" value="Genres" name="Genres">
            {" "}
            Genres:{" "}
          </label>
          <select className="boton6" onChange={(e) => handleSelectGenres(e)}>
            {allGenres &&
              allGenres
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
          </select>

          {!input.genres.length ? (
            <strong>{errors.genres}</strong>
          ) : (
            input.genres.map((nombre, i) => {
              return (
                <div key={i} className="concatFiltro">
                  <button onClick={handleDelete} value={nombre}>
                    X
                  </button>
                  <span>{nombre}</span>
                </div>
              );
            })
          )}
        </div>

        <div>
          <label className="title5" value="Platforms" name="Platforms">
            {" "}
            Platforms:{" "}
          </label>
          <select className="boton6" onChange={(e) => handleSelectPlat(e)}>
            {platformss
              .sort((a, b) => (a[0] > b[0] ? 1 : -1))
              .map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
          </select>

          {!input.platforms.length ? (
            <strong>{errors.platforms}</strong>
          ) : (
            input.platforms.map((nombre, i) => {
              return (
                <div key={i} className="concatFiltro">
                  <button onClick={handleDelete} value={nombre}>
                    X
                  </button>
                  <span>{nombre}</span>
                </div>
              );
            })
          )}
        </div>
        <div>
          <button
            className="boton6"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            {" "}
            Create game
          </button>
        </div>
        {loading && <Loader />}
        {response && (
          <Message msg="The game was successfully created" bgColor="#198754" />
        )}
        {err && (
          <Message
            msg="You have to complete all the fields"
            bgColor="#FF0000"
          />
        )}
      </div>
    </div>
  );
}
