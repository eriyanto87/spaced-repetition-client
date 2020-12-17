import React, { Component } from "react";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import ListOfWords from "../ListOfWords/ListOfWords";
import Loading from "../Loading/Loading";
import API from "../../config";
import "./Dashboard.css";

export default class Dashboard extends Component {
  static contextType = UserContext;

  async componentDidMount() {
    try {
      const response = await fetch(`${API.API_ENDPOINT}/language`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      });
      const json = await response.json();
      this.context.setLanguage(json.language.name);
      this.context.setWords(json.words);
      this.context.setTotalScore(json.language.total_score);
      document.getElementById("learn").focus();
    } catch (error) {
      this.context.setError(error);
    }
  }

  render() {
    return (
      <section>
        <h1>You are learning</h1>
        <h2>{this.context.language}</h2>
        <a id="learn" className="learn" href="/learn">
          Start practicing
        </a>
        <h3>Words to practice</h3>
        <section className="makeitnice">
          {this.context.words ? (
            <ListOfWords words={this.context.words} />
          ) : (
            <Loading />
          )}
        </section>
        <p>
          {this.context.totalScore
            ? `Total correct answers: ${this.context.totalScore}`
            : null}
        </p>
      </section>
    );
  }
}
