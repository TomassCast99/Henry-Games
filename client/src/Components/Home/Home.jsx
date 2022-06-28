import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import Paginated from "../Paginado/Paginated";
import "./Home.css";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getGames,
  cleanFilters,
  handlerOrder,
} from "../../redux/actions/actions";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";

export default function Home() {
  const dispatch = useDispatch();
  const useGames = useSelector((state) => {
    return state.games2;
  });
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const [range, setRange] = useState({ first: 0, last: 15 });

  const [act, setAct] = useState("");

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
    setAct(`${name}`);
  }

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <Paginated
          gamesPerPage={gamesPerPage}
          useGames={useGames.length}
          paginated={paginado}
        />

        <button className="nav-links" onClick={handleCleanFilters} value="all">
          Clean Filters
        </button>

        <div className="name-filt">
          <select onChange={(e) => setName(e.target.value)}>
            <option className="nav-links" value="asc">
              A-Z
            </option>
            <option className="nav-links" value="desc">
              Z-A
            </option>
          </select>

          <button onClick={handleClickOrder}>Alphabetical Order</button>
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
