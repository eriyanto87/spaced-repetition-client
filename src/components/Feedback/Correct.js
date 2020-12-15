import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import Feedback from "./Feedback";

export default class Correct extends Component {
  static contextType = UserContext;

  state = {
    total: this.context.response.totalScore,
  };

  render() {
    console.log(this.context);
    console.log(this.context.response);
    console.log(this.context.guess);
    return (
      <>
        <div className="DisplayScore">
          <p>Your total score is: {this.state.total}</p>
        </div>
        <Feedback />
      </>
    );
  }
}
