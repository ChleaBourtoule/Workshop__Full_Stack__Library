import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./books.css";

const Books = () => {
  const [books, setBooks] = useState("");
  const [title, setTitle] = useState("");
  let link = "";

  if (title) {
    link = `http://localhost:3000/api/books?title=${title}`;
  } else {
    link = `http://localhost:3000/api/books`;
  }

  useEffect(() => {
    axios
      .get(link)
      .then((result) => result.data)
      .then((data) => setBooks(data))
      .catch((error) => console.log(error));
  }, [title, link]);
  console.log(books);
  console.log(title);
  return (
    <div className="books-container">
      <h1>Books</h1>
      <input
        type="text"
        placeholder="Title of the book..."
        name="Book Title"
        id=""
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={() => setTitle("")}>All Books</button>
      <div className="books">
        {books &&
          books.map((book) => (
            <h3>
              <Link
                to={`/books/${book.quote}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {book.name}
              </Link>
            </h3>
          ))}
      </div>
    </div>
  );
};

export default Books;
