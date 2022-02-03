import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./authors.css";

const Authors = () => {
  const [authors, setAuthors] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/authors`)
      .then((result) => result.data)
      .then((data) => setAuthors(data))
      .catch((error) => console.log(error));
  }, []);
  console.log(authors);
  return (
    <div className="authors-container">
      <h1>Authors</h1>
      <div className="authors">
        {authors &&
          authors.map((author) => (
            <h3>
              <Link
                to={`/authors/${author.id_author}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {author.name}
              </Link>
            </h3>
          ))}
      </div>
    </div>
  );
};

export default Authors;
