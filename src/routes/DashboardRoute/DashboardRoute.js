import React, { Component } from "react";
import "./DashboardRoute.css";
import Dashboard from "../../components/Dashboard/Dashboard";

class DashboardRoute extends Component {
  render() {
    return (
      <section>
        <Dashboard />
      </section>
    );
  }
}

export default DashboardRoute;
