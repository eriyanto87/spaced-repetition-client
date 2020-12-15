import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import Correct from "../../components/Feedback/Correct";
import Incorrect from "../../components/Feedback/Incorrect";
import API from "../../config";
import "./Learn.css";

class Learn extends Component {
  static contextType = UserContext;

  state = {
    clicked: false,
    answer: null,
  };

  async componentDidMount() {
    try {
      const response = await fetch(`${API.API_ENDPOINT}/language/head`, {
        headers: {
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      });
      const json = await response.json();
      this.context.setNextWord(json);
      console.log(json);
    } catch (e) {
      this.setState({ error: e });
    }
  }

  async submitForm(e) {
    e.preventDefault();
    const guessWord = e.target.guess.value.toLowerCase().trim();
    console.log(guessWord);
    this.context.setGuess(guessWord);
    //do POST!
    try {
      const response = await fetch(`${API.API_ENDPOINT}/language/guess`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({ guess: guessWord }),
      });
      const json = await response.json();
      this.context.setResponse(json);
      this.context.nextWord(json.nextWord);
      console.log(this.context);
      console.log(json);
    } catch (e) {
      this.setState({ error: e });
    }

    // const { history } = this.props;

    if (this.context.response.isCorrect) {
      this.setState({
        answer: "correct",
      });
    } else {
      this.setState({
        answer: "incorrect",
      });
    }
    // this.setState({
    //   clicked: true,
    // });
  }

  render() {
    console.log(this.context);
    console.log(this.context.nextWord);
    console.log(this.context.response);
    const { history } = this.props;
    console.log(history);

    return (
      <main className="box">
        <form onSubmit={(e) => this.submitForm(e, this.context)}>
          {this.state.answer == null && <h2>Translate the word:</h2>}
          {this.state.answer === "correct" && <h2>You were correct! :D</h2>}
          {this.state.answer === "incorrect" && (
            <h2>Good try, but not quite right :(</h2>
          )}
          <span>
            {this.context.nextWord ? this.context.nextWord.nextWord : null}
          </span>
          <p>
            Your total score is:{" "}
            {this.context.nextWord ? this.context.nextWord.totalScore : null}
          </p>
          <fieldset>
            <label htmlFor="learn-guess-input">
              What's the translation for this word?
            </label>
            <p>
              <input
                name="guess"
                id="learn-guess-input"
                type="text"
                required
              ></input>
            </p>
            {this.state.answer == null && (
              <button type="submit">Submit your answer</button>
            )}
            {this.state.answer === "correct" && (
              <button onClick={this.getNextWord}>
                <a href="/learn">Try another word!</a>
              </button>
            )}
            {this.state.answer === "incorrect" && (
              <button onClick={this.getNextWord}>
                <a href="/learn">Try another word!</a>
              </button>
            )}
          </fieldset>
        </form>
        <p>
          Correct Answers:{" "}
          {this.context.nextWord
            ? this.context.nextWord.wordCorrectCount
            : null}
        </p>
        <p>
          Incorrect Answers:{" "}
          {this.context.nextWord
            ? this.context.nextWord.wordIncorrectCount
            : null}
        </p>
        <p>{this.context.feedback}</p>
        {this.state.answer === "correct" && <Correct />}
        {this.state.answer === "incorrect" && <Incorrect />}
      </main>
    );
  }
}

export default withRouter(Learn);
