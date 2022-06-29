import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, resState, postGame } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import { useEffect } from "react";
//import "./CreateDog.css";
import { validation } from "../Validations/Validations";

export default function GameCreate() {
  const dispatch = useDispatch();
  const getGenres = useSelector((e) => e.genres);
  const [button, setButton] = useState(true);

  const [input, setInput] = useState({
    name: "",
    description: "",
    rating: "",
    image: "",
    platforms: "",
    genres: [],
    createdInBd: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getGenres());
    dispatch(resState(resState));
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    let crear = {
      name: input.name,
      description: `${input.description}`,
      rating: `${input.rating}`,
      image: input.image,
      platforms: `${input.platforms}`,
      genres: input.genres.join(", "),
    };
    console.log(crear.genres);

    dispatch(postGame(crear));
    setInput({
      name: "",
      description: "",
      rating: "",
      image: "",
      platforms: "",
      genres: [],
      createdInBd: false,
    });
    alert("Game successfully create");
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
  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      genres: input.genres.filter((temp) => temp !== e.target.value),
    });
  }

  if (Object.keys(errors).length) {
    //te devuelve un array con las keys del objeto,entonces ahi pregunto si ese array tiene length (hay algo en el objeto) -> entonces hay errores -> deshabilita el boton
    setButton(false);
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
            placeholder="Name"
            value={input.name}
            onChange={(e) => handelChange(e)}
          />

          <strong>{errors.name}</strong>
        </div>
        <div>
          <label className="title5">Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Type here"
            value={input.description}
            onChange={(e) => handelChange(e)}
          />

          <strong>{errors.description}</strong>
        </div>
        <div>
          <label className="title5">Rating:</label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={input.rating}
            onChange={(e) => handelChange(e)}
          />

          <strong>{errors.rating}</strong>
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
          ></input>
        </div>
        <div>
          <label className="title5" value="genres" name="genres">
            {" "}
            Genres:{" "}
          </label>
          <select className="boton6" onChange={(e) => handleSelectGenres(e)}>
            <option>Genres</option>
            {getGenres &&
              getGenres
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
          </select>

          {input.genres.map((nombre, i) => {
            return (
              <div key={i} className="concatFiltro">
                <button
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    borderRadius: "50%",
                  }}
                  onClick={handleDelete}
                  value={nombre}
                >
                  X
                </button>
                <span>{nombre}</span>
              </div>
            );
          })}
        </div>

        <div>
          <label className="title5">Platforms:</label>
          <input
            type="text"
            name="platforms"
            placeholder="Platforms"
            value={input.platforms}
            onChange={(e) => handelChange(e)}
          />

          <strong>{errors.platforms}</strong>
        </div>

        <div>
          <button
            className="boton6"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            {" "}
            Create new Dog
          </button>
        </div>
      </div>
    </div>
  );
}
