import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import "./App.css";
import Landing from "./Components/Landing/Landing";
import Home from "../src/Components/Home/Home";
//import CreateDog from "./components/Create/CreateDog.jsx";
import Details from "./Components/Details/Details";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/videogame" element={<CreateGame />} /> */}
          <Route path="/videogame/:id" element={<Details />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
