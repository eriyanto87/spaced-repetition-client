import React, { Component } from "react";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import ListOfWords from "../ListOfWords/ListOfWords";
import Loading from "../Loading/Loading";
import API from "../../config";

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
    } catch (error) {
      this.context.setError(error);
    }
  }

  render() {
    return (
      <div>
        <h1>You are learning</h1>
        <h3>{this.context.language}</h3>
        <p> Total Correct: {this.context.totalScore} </p>
        <button>Click me to start practicing</button>
        <h1>Words to Practice</h1>
        <section>
          {this.context.words ? (
            <ListOfWords words={this.context.words} />
          ) : (
            <Loading />
          )}
        </section>
      </div>
    );
  }
}
