import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import Feedback from "./Feedback";

export default class Incorrect extends Component {
  static contextType = UserContext;
  render() {
    console.log(this.context.nextWord);
    return (
      <>
        <div className="DisplayScore">
          <p>Your total score is: {this.context.response.totalScore}</p>
        </div>
        <Feedback />
      </>
    );
  }
}
