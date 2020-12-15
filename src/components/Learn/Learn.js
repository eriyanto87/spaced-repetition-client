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

    const { history } = this.props;

    if (this.context.response.isCorrect) {
      return history.push("/correct");
    } else {
      return history.push("/incorrect");
    }
    this.setState({
      clicked: true,
    });
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
          <h2>Translate the word:</h2>
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
            <button type="submit">Submit your answer</button>
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
        <p className="DisplayScore">hello</p>
        <p className="DisplayFeedback">Test</p>
      </main>
    );
  }
}

export default withRouter(Learn);
