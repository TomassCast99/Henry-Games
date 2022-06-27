import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ id, genres, name, background_image, rating }) {
  // genres = genres?.map((genres) =>
  //   genres === "Massively Multiplayer" ? "MMO" : genres
  // ); ver para cambiar el nombre despues
  return (
    <div className="contenedor">
      <div className="nombre">
        <Link className="por" to={`/videogame/${id}`}>
          <h3 className="uno">{name}</h3>
        </Link>
      </div>
      <div>
        <img src={background_image} alt={name} width="200px" height="200px" />
      </div>
      <div>
        <p>{rating}</p>
      </div>
      <div>
        <h4>Genres: {genres}</h4>
      </div>
    </div>
  );
}
