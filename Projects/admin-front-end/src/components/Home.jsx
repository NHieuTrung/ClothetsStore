import React, { Component } from "react";

class Home extends Component {
  state = {};
  UNSAFE_componentWillMount() {
    if (localStorage.getItem("authenticatedTokenAdmin") === null) {
      window.location.href = "/login";
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
