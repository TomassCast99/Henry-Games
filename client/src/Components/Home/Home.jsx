import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Paginated from "../Paginado/Paginated";
import "./Home.css";

import { useSelector, useDispatch } from "react-redux";

import {
  getGames,
  cleanFilters,
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
    dispatch(getGames());
  }, [dispatch]);

  useEffect(() => {
    setRange({
      first: (currentPage - 1) * gamesPerPage,
      last: currentPage * gamesPerPage,
    });
  }, [currentPage, gamesPerPage]);

  const handleCleanFilters = (e) => {
    e.preventDefault();
    dispatch(cleanFilters());
  };

  function handleClickOrder(e) {
    e.preventDefault();
    dispatch(handlerOrder(name));
    setCurrentPage(1);
    setCurrentGames(useGames?.slice(range.first, range.last));
    setAct(`${name}`);
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getGames());
  }

  function handleClickFilter(e) {
    e.preventDefault();
    dispatch(handleFilter({ genres, origin }));
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
      <Navbar />
      <div className="home-container">
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
          <Paginated
            gamesPerPage={gamesPerPage}
            useGames={useGames.length}
            paginated={paginado}
          />
          <button
            className="nav-links"
            onClick={handleCleanFilters}
            value="all"
          >
            Clean Filters
          </button>
        </div>
        <div className="div-filt">
          <div className="name-filt">
            <select onChange={(e) => setName(e.target.value)}>
              <option className="nav-links" value="asc">
                A-Z
              </option>
              <option className="nav-links" value="desc">
                Z-A
              </option>
            </select>

            <button onClick={handleClickOrder} className="sort">
              Alphabetical Order
            </button>
          </div>

          <div>
            <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
              <option className="nav-links" value="All">
                All
              </option>
              <option className="nav-links" value="apiGames">
                Games
              </option>
              <option className="nav-links" value="dbGames">
                Created Games
              </option>
            </select>
            <button onClick={(e) => handleClickFilter(e)}>Filter</button>
          </div>

          <div className="box">
            <select
              className="bot"
              onChange={(e) => {
                setRating(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="asc">High Rating</option>
              <option value="desc">Low Rating</option>
            </select>
            <button
              onClick={(e) => {
                HandleFilterByRating(e);
              }}
            >
              Filter
            </button>
          </div>

          <div className="box">
            <select
              className="bot"
              onChange={(e) => {
                setGenres(e.target.value);
              }}
            >
              <option value="all">All Games</option>
              <option value="RPG">RPG</option>
              <option value="Shooter">Shooter</option>
              <option value="Casual">Casual</option>
              <option value="Racing">Racing</option>
              <option value="Strategy">Strategy</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Sports">Sports</option>
              <option value="Action">Action</option>
              <option value="Arcade">Arcade</option>
              <option value="Fighting">Fighting</option>
              <option value="Adventure">Adventure</option>
              <option value="Platformer">Platformer</option>
              <option value="Family">Family</option>
              <option value="Simulation">Simulation</option>
              <option value="Massively Multiplayer">
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
            >
              Filter
            </button>
          </div>
        </div>

        <div className="card-game">
          {!currentGames.length ? (
            <div>
              <Loader />
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
