import React from "react";
import "./Paginated.css";

export default function Paginated({ gamesPerPage, useGames, paginated }) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(useGames / gamesPerPage) - 1; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div className="paginated">
      <ul>
        {pageNumbers.length > 1 &&
          pageNumbers.map((number) => {
            return (
              <li key={number} onClick={() => paginated(number)}>
                {number}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
