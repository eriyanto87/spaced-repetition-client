import React from "react";
// import TokenService from "../../services/token-service";
// import UserContext from "../../contexts/UserContext";
// import API from "../../config";
import "./ListOfWords.css";

export default function ListOfWords(props) {
  const words = props.words;
  return (
    <>
      {words.map((word, i) => (
        <li key={i} className="words">
          <h4 className="bold">{word.original}</h4>
          <p>
            correct answer count: <span>{word.correct_count}</span>
          </p>
          <p>
            incorrect answer count: <span>{word.incorrect_count}</span>
          </p>
        </li>
      ))}
    </>
  );
}
