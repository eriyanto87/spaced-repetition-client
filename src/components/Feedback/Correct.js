import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import Feedback from "./Feedback";

export default class Correct extends Component {
  static contextType = UserContext;
  render() {
    console.log(this.context);
    console.log(this.context.response);
    console.log(this.context.guess);
    return (
      <main>
        <h2>You were correct! :D</h2>
        <p className="DisplayScore">
          Your total score is: {this.context.response.totalScore}
        </p>
        <Feedback />
      </main>
    );
  }
}
