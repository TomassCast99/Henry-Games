import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, resState } from "../../redux/actions/actions";
import Loader from "../Loader/Loader";
//import "./Details.css";

export default function Detail() {
  const { id } = useParams();
  const gameDetail = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  console.log(gameDetail);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(resState());
    };
  }, [dispatch, id]);

  return (
    <div>
      {Object.keys(gameDetail).length > 0 ? (
        <main className="paginado2">
          <div>
            <Link to="/home">
              <button className="botonDetails" onClick={resState}>
                Home
              </button>
            </Link>
          </div>
          <div>
            <img
              className="imagen"
              src={gameDetail.background_image}
              alt={gameDetail.name}
              width="300px"
              height="250px"
            />
          </div>

          <div className="cardDetalle">
            <div>
              <h1>{gameDetail.name}</h1>
            </div>
            <div className="base3">
              <h4>Genres:</h4>
              <p>{gameDetail.genres}</p>
            </div>
            <div className="base3">
              <h4>Rating:</h4>
              <p>{gameDetail.rating}</p>
            </div>
            <div className="base3">
              <h4>Released:</h4>
              <p>{gameDetail.released}</p>
            </div>
            <div className="base3">
              <h4>Platforms:</h4>
              <ul>{gameDetail.platform.map((e) => e + "-")}</ul>
            </div>
            <div className="base3">
              <h4>Description:</h4>
              <p>{gameDetail.description}</p>
            </div>
          </div>
        </main>
      ) : (
        <Loader />
      )}
    </div>
  );
}
