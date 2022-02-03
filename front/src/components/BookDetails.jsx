import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const BookDetails = () => {
  let { quote } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/books/${quote}`)
      .then((res) => res.data)
      .then((data) => setDetails(data))
      .catch((error) => {
        console.log(error);
      });
    console.log("Appel API");
  }, [quote]);
  console.log(details);
  return (
    <div>
      <div>
        <h1>{details.title}</h1>
        <h2>
          {details.author_firstname} {details.author_name}
        </h2>
      </div>

      <div>
        <h3>Quote :</h3>
        <p>{details.quote}</p>
      </div>
      <div>
        <h3>Pages Number :</h3>
        <p>{details.pages}</p>
      </div>
      <div>
        <h3>Year of Publication :</h3>
        <p>{details.date}</p>
      </div>
      <div>
        <h3>Format :</h3>
        <p>{details.format ? "paper back edition" : "softback edition"}</p>
      </div>
      <div>
        <h3>Publishing House :</h3>
        <p>{details.house}</p>
      </div>
    </div>
  );
};

export default BookDetails;
