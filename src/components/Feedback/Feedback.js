import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import { withRouter } from "react-router-dom";

export default class Feedback extends Component {
  static contextType = UserContext;

  render() {
    return (
      <div>
        {/* <p className="DisplayScore">
          Your total score is: {this.context.response.totalScore}
        </p> */}
        <p className="DisplayFeedback">
          The correct translaton for {this.context.nextWord.nextWord} was{" "}
          {this.context.response.answer} and you chose {this.context.guess}
        </p>
        <p>
          Word Correct Count:{" "}
          {this.context.response
            ? this.context.response.wordCorrectCount
            : null}
        </p>
        <p>
          Word Incorrect Count:{" "}
          {this.context.response
            ? this.context.response.wordIncorrectCount
            : null}
        </p>
        <button onClick={this.getNextWord}>
          <a href="/learn">Try another word!</a>
        </button>
      </div>
    );
  }
}
