import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ id, genres, name, background_image, rating }) {
  // genres = genres?.map((genres) =>
  //   genres === "Massively Multiplayer" ? "MMO" : genres
  // ); ver para cambiar el nombre despues
  return (
    <div className="card">
      <div className="card-details">
        <div className="img-game">
          <img src={background_image} alt={name} height="150px" width="150px" />
        </div>
        <h3 className="text-title">{name}</h3>
        <p className="text-body">{rating}</p>
        <p className="text-body">Genres: {genres}</p>
      </div>
      <Link className="por" to={`/videogame/${id}`}>
        <button className="card-button">More info</button>
      </Link>
    </div>
  );
}
