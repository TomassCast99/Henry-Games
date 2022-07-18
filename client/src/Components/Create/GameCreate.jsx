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
    released: "",
    genres: [],
    platform: [],
    background_image: "",
    createdDB: false,
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
      input.released.length &&
      input.genres.length &&
      input.platform.length
    ) {
      let crear = {
        name: input.name,
        description: input.description,
        rating: input.rating,
        released: input.released,
        background_image: input.background_image,
        genres: input.genres.join(", "),
        platforms: input.platform,
      };

      dispatch(postGame(crear));
      setLoading(false);
      setResponse(true);

      setTimeout(() => setResponse(false), 4000);
      setInput({
        name: "",
        description: "",
        rating: "",
        released: "",
        genres: [],
        platform: [],
        background_image: "",
        createdDB: false,
      });
    } else {
      setErr(true);
      setLoading(false);
      setTimeout(() => setErr(false), 4000);
    }
  }
  function handelChange(e) {
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
    if (!input.platform.includes(e.target.value)) {
      setInput({
        ...input,
        platform: [...input.platform, e.target.value],
      });
    }
  }

  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      genres: input.genres.filter((temp) => temp !== e.target.value),
    });
  }

  function deletePlat(e) {
    e.preventDefault();
    setInput({
      ...input,
      platform: input.platform.filter((plat) => plat !== e.target.value),
    });
  }

  return (
    <div key="form" className="formPerfil">
      <div key="up" className="up-things">
        <Link to="/home">
          <button key="up1" className="boton">
            Home
          </button>
        </Link>
      </div>
      <div key="up45">
        <h1 key="up2" className="titleForm">
          Create Game
        </h1>
      </div>

      <form key="form4" className="form" onSubmit={resState}>
        <div>
          <label key="name" className="title5">
            Name:
          </label>
          <input
            key="name2"
            type="text"
            name="name"
            placeholder="Game name"
            value={input.name}
            onChange={(e) => handelChange(e)}
          />

          <strong>{errors.name}</strong>
        </div>
        <div>
          <label key="rating" className="title5">
            Rating:
          </label>
          <input
            type="number"
            name="rating"
            key="rating2"
            placeholder="Rating"
            value={input.rating}
            onChange={(e) => handelChange(e)}
            min="1"
            max="5"
          />

          <strong>{errors.rating}</strong>
        </div>

        <div>
          <label key="released" className="title5">
            Released:
          </label>
          <input
            type="number"
            name="released"
            key="released2"
            placeholder="Released"
            value={input.released}
            onChange={(e) => handelChange(e)}
          />

          <strong>{errors.released}</strong>
        </div>

        <div>
          <label key="image" name="background_image" className="title5">
            Image:
          </label>
          <input
            key="image2"
            name="background_image"
            value={input.background_image}
            placeholder="URL"
            onChange={(e) => handelChange(e)}
          ></input>
        </div>
        <div>
          <label key="genres" className="title5" value="Genres" name="Genres">
            {" "}
            Genres:{" "}
          </label>
          <select
            key="genres2"
            className="boton6"
            onChange={(e) => handleSelectGenres(e)}
          >
            {allGenres &&
              allGenres
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
          </select>

          <div className="choosed">
            {!input.genres.length ? (
              <strong>{errors.genres}</strong>
            ) : (
              input.genres.map((nombre, i) => {
                return (
                  <div key={i} className="card98">
                    <button
                      onClick={handleDelete}
                      value={nombre}
                      className="cross"
                      key="botonX"
                    >
                      X
                    </button>
                    <span key="video" className="videoName">
                      {nombre}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div>
          <label
            key="platforms"
            className="title5"
            value="Platforms"
            name="Platforms"
          >
            {" "}
            Platforms:{" "}
          </label>
          <select
            key="platforms2"
            className="boton6"
            onChange={(e) => handleSelectPlat(e)}
          >
            {platformss
              .sort((a, b) => (a[0] > b[0] ? 1 : -1))
              .map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
          </select>

          <div className="choosed">
            {!input.platform.length ? (
              <strong>{errors.platform}</strong>
            ) : (
              input.platform.map((nombre, i) => {
                return (
                  <div key={i} className="card98">
                    <button
                      key="botonX2"
                      onClick={deletePlat}
                      value={nombre}
                      className="cross"
                    >
                      X
                    </button>
                    <span key="video56" className="videoName">
                      {nombre}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div key="description3" className="description">
          <label key="description" className="title5">
            Description:
          </label>
          <textarea
            key="description2"
            type="text"
            name="description"
            placeholder="Description"
            value={input.description}
            onChange={(e) => handelChange(e)}
            style={{ width: "100%", height: "100%" }}
            wrap="soft"
            autoFocus
          />

          <strong>{errors.description}</strong>
        </div>
        <div>
          <button
            key="submit"
            className="btn-createGame"
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
            setTimeout={() => 4000}
          />
        )}
      </form>
    </div>
  );
}
