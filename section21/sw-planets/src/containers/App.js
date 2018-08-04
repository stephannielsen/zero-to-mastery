import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import ErrorBoundary from "../components/ErrorBoundary";
import { requestPlanets } from "../actions";
import "particles.js";
import Universe from "../components/Universe";

const mapStateToProps = state => {
  return {
    planets: state.requestPlanets.planets,
    isPending: state.requestPlanets.isPending,
    error: state.requestPlanets.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestPlanets: () => dispatch(requestPlanets())
  };
};

class App extends Component {
  componentDidMount() {
    this.props.onRequestPlanets();
    window.particlesJS.load(
      "particles-js",
      "./particlesjs-config.json",
      function() {
        console.log("callback - particles.js config loaded");
      }
    );
  }

  render() {
    const { planets, isPending } = this.props;
    if (isPending) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <ErrorBoundary>
          <Universe planets={planets} />
        </ErrorBoundary>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
