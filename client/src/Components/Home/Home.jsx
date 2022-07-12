import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Paginated from "../Paginado/Paginated";
import "./Home.css";

import { useSelector, useDispatch } from "react-redux";

import {
  getGames,
  handlerOrder,
  handleFilter,
  handlerRating,
  handlerGenres,
} from "../../redux/actions/actions";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";

export default function Home() {
  const dispatch = useDispatch();
  const useGames = useSelector((state) => {
    return state.games;
  });
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const [range, setRange] = useState({ first: 0, last: 15 });

  const [act, setAct] = useState("");
  const [genres, setGenres] = useState("All");
  const [origin, setOrigin] = useState("All");

  const [charge, setCharge] = useState(false); //para cuando busca por un genero que no tiene juego entre los 100 traidos

  const [currentGames, setCurrentGames] = useState(
    useGames?.slice(range.first, range.last)
  );
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentGames(useGames?.slice(range.first, range.last));
  }, [useGames, range.first, range.last]);

  useEffect(() => {
    setCharge(true);
    setTimeout(() => {
      setCharge(false);
    }, 10000);
    dispatch(getGames());
  }, []);

  useEffect(() => {
    setRange({
      first: (currentPage - 1) * gamesPerPage,
      last: currentPage * gamesPerPage,
    });
  }, [currentPage, gamesPerPage]);

  function handleClickOrder(e) {
    e.preventDefault();
    dispatch(handlerOrder(name));
    setCurrentPage(1);
    setCurrentGames(useGames?.slice(range.first, range.last));
    setAct(`${name}`);
  }

  function handleClick(e) {
    setGenres("All Games");
    setRating("all");
    setOrigin("All");
    dispatch(getGames());
  }

  function handleClickFilter(e) {
    e.preventDefault();
    dispatch(handleFilter({ origin }));
  }

  function HandleFilterByRating(e) {
    e.preventDefault();
    dispatch(handlerRating(rating));
    setCurrentPage(1);
    setCurrentGames(useGames?.slice(range.first, range.last));
    setAct(`${e.target.value}`);
  }

  function HandleFilterByGenres(e) {
    e.preventDefault();
    dispatch(handlerGenres(genres));
    setCurrentPage(1);
    setCurrentGames(useGames?.slice(range.first, range.last));
    setAct(`${e.target.value}`);
  }

  return (
    <div>
      <div className="home-container">
        <Navbar setCurrentPage={setCurrentPage} />
        <div className="div-buttons">
          {" "}
          <button
            className="home-btn"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Reload Games
          </button>
        </div>
        <div className="div-filt">
          <div>
            <select
              className="name-filt"
              onChange={(e) => setName(e.target.value)}
            >
              <option key="asc" className="nav-links" value="asc">
                A-Z
              </option>
              <option key="desc" className="nav-links" value="desc">
                Z-A
              </option>
            </select>

            <button onClick={handleClickOrder} className="btn-filtros">
              Order
            </button>
          </div>

          <div>
            <select
              className="name-filt"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              <option key="All" className="nav-links" value="All">
                All
              </option>
              <option key="apiGames" className="nav-links" value="apiGames">
                Games
              </option>
              <option key="dbGames" className="nav-links" value="dbGames">
                Created Games
              </option>
            </select>
            <button
              onClick={(e) => handleClickFilter(e)}
              className="btn-filtros"
            >
              Filter
            </button>
          </div>

          <div className="box">
            <select
              value={rating}
              className="name-filt"
              onChange={(e) => {
                setRating(e.target.value);
              }}
            >
              <option key="all" value="all">
                All
              </option>
              <option key="asc" value="asc">
                High Rating
              </option>
              <option key="desc" value="desc">
                Low Rating
              </option>
            </select>
            <button
              onClick={(e) => {
                HandleFilterByRating(e);
              }}
              className="btn-filtros"
            >
              Order
            </button>
          </div>

          <div className="box">
            <select
              value={genres}
              className="name-filt"
              onChange={(e) => {
                setGenres(e.target.value);
              }}
            >
              <option key="all" value="all">
                All Games
              </option>
              <option key="rpg" value="RPG">
                RPG
              </option>
              <option key="shooter" value="Shooter">
                Shooter
              </option>
              <option key="casual" value="Casual">
                Casual
              </option>
              <option key="racing" value="Racing">
                Racing
              </option>
              <option key="strategy" value="Strategy">
                Strategy
              </option>
              <option key="puzzle" value="Puzzle">
                Puzzle
              </option>
              <option key="sports" value="Sports">
                Sports
              </option>
              <option key="action" value="Action">
                Action
              </option>
              <option key="arcade" value="Arcade">
                Arcade
              </option>
              <option key="fighting" value="Fighting">
                Fighting
              </option>
              <option key="adventure" value="Adventure">
                Adventure
              </option>
              <option key="platformer" value="Platformer">
                Platformer
              </option>
              <option key="family" value="Family">
                Family
              </option>
              <option key="simulation" value="Simulation">
                Simulation
              </option>
              <option key="mmo" value="Massively Multiplayer">
                Massively Multiplayer
              </option>
              <option value="Board Games">Board Games</option>
              <option value="Card">Card</option>
              <option value="Educational">Educational</option>
            </select>
            <button
              onClick={(e) => {
                HandleFilterByGenres(e);
              }}
              className="btn-filtros"
            >
              Filter
            </button>
          </div>
        </div>
        <Paginated
          gamesPerPage={gamesPerPage}
          useGames={useGames.length}
          paginated={paginado}
        />

        <div className="card-game">
          {charge ? (
            <div>
              <Loader />
            </div>
          ) : currentGames.length ? (
            currentGames.map((d) => {
              return (
                <Card
                  key={d.id}
                  id={d.id}
                  name={d.name}
                  background_image={d.background_image}
                  genres={d.genres}
                  rating={d.rating}
                />
              );
            })
          ) : (
            <div className="div-not-found">
              <h4>Ups! Game not found</h4>
              <h5>Try creating a new game</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
