import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const AuthorDetails = () => {
  let { id } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/authors/${id}`)
      .then((res) => res.data)
      .then((data) => setDetails(data))
      .catch((error) => {
        console.log(error);
      });
    console.log("Appel API");
  }, [id]);
  return (
    <div>
      <h1>
        {details.firstname} {details.name}
      </h1>
      <div>
        <h3>Nationality</h3>
        <p>{details.nationality}</p>
      </div>
      <div>
        <h3>Birthdate</h3>
        <p>{details.birthdate}</p>
      </div>
    </div>
  );
};

export default AuthorDetails;
