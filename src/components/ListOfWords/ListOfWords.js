import React from "react";
// import TokenService from "../../services/token-service";
// import UserContext from "../../contexts/UserContext";
// import API from "../../config";
import "./ListOfWords.css";

export default function ListOfWords(props) {
  console.log(props);
  console.log(props.words[0]);
  const words = props.words;
  return (
    <div>
      {words.map((word, i) => (
        <div key={i} className="words">
          <h3>{word.original}</h3>
          <p className="bold">
            Correct Count: <span>{word.correct_count}</span>
          </p>
          <p className="bold">
            Incorrect Count: <span>{word.incorrect_count}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
