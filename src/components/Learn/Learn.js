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
    answer: null,
    correct: "",
    incorrect: "",
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
      this.context.setTotalScore(json.totalScore);
      this.setState({
        correct: json.wordCorrectCount,
        incorrect: json.wordIncorrectCount,
      });
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
      // this.context.setTotalScore(json.totalScore);
      console.log(this.context);
      console.log(json);
    } catch (e) {
      this.setState({ error: e });
    }

    this.context.setTotalScore(this.context.response.totalScore);
    // this.setState({
    //   correct: this.context.nextWord.wordCorrectCount++,
    //   incorrect: this.context.response.wordIncorrectCount,
    // });

    if (this.context.response.isCorrect) {
      this.setState({
        answer: "correct",
        correct: this.state.correct + 1,
      });
    } else {
      this.setState({
        answer: "incorrect",
        incorrect: this.state.incorrect + 1,
      });
    }
  }

  render() {
    console.log(this.context);
    console.log(this.context.nextWord);
    console.log(this.context.response);
    console.log(this.context.totalScore);
    const tscore = this.context.totalScore;

    return (
      <main className="box">
        <form onSubmit={(e) => this.submitForm(e, this.context)}>
          {this.state.answer == null && <h2>Translate the word:</h2>}
          {this.state.answer === "correct" && (
            <h2 className="feedback">You were correct! :D</h2>
          )}
          {this.state.answer === "incorrect" && (
            <h2 className="feedback">Good try, but not quite right :(</h2>
          )}
          <span>
            {this.context.nextWord ? this.context.nextWord.nextWord : null}
          </span>
          {this.state.answer == null && <p>Your total score is: {tscore}</p>}
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
              <button>
                <a href="/learn">Try another word!</a>
              </button>
            )}
            {this.state.answer === "incorrect" && (
              <button>
                <a href="/learn">Try another word!</a>
              </button>
            )}
          </fieldset>
        </form>
        <p>Correct Answers: {this.state.correct}</p>
        <p>Incorrect Answers: {this.state.incorrect}</p>
        <p>{this.context.feedback}</p>
        {this.state.answer === "correct" && <Correct />}
        {this.state.answer === "incorrect" && <Incorrect />}
      </main>
    );
  }
}

export default withRouter(Learn);
