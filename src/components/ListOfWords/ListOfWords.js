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
    <>
      {words.map((word, i) => (
        <li key={i} className="words">
          <h4>{word.original}</h4>
          <p className="bold">
            correct answer count: <span>{word.correct_count}</span>
          </p>
          <p className="bold">
            incorrect answer count: <span>{word.incorrect_count}</span>
          </p>
        </li>
      ))}
    </>
  );
}
