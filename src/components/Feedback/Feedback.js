import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import "./Feedback.css";

export default class Feedback extends Component {
  static contextType = UserContext;

  render() {
    return (
      <>
        <button>
          <a className="try" href="/learn">
            Try another word!
          </a>
        </button>
        <div className="DisplayFeedback">
          <p>
            The correct translation for {this.context.nextWord.nextWord} was{" "}
            {this.context.response.answer} and you chose {this.context.guess}!
          </p>
        </div>
      </>
    );
  }
}
