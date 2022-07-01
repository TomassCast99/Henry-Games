import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGames, getName } from "../../redux/actions/actions";
import "./Search.css";

export default function Search() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  function handleInputChange(e) {
    dispatch(getName(e));
  }

  return (
    <div>
      <div className="group">
        <input
          onChange={(e) => {
            setName(e.target.value);
            handleInputChange(e.target.value);
          }}
          type="text"
          placeholder="Search"
          className="input"
          value={name}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
      </div>
    </div>
  );
}
