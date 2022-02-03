import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./publishingHouses.css";

const PublishingHouses = () => {
  const [houses, setHouses] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/publishing_houses`)
      .then((result) => result.data)
      .then((data) => setHouses(data))
      .catch((error) => console.log(error));
  }, []);
  console.log(houses);
  return (
    <div className="houses-container">
      <h1>Publishing Houses</h1>
      <div className="houses">
        {houses && houses.map((house) => <h3>{house.name}</h3>)}
      </div>
    </div>
  );
};

export default PublishingHouses;
