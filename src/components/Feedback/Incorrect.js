import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import Feedback from "./Feedback";

export default class Incorrect extends Component {
  static contextType = UserContext;
  render() {
    console.log(this.context.nextWord);
    return (
      <>
        <h2>Good try, but not quite right :(</h2>
        <p className="DisplayScore">
          Your total score is: {this.context.response.totalScore}
        </p>
        <Feedback />
      </>
    );
  }
}
