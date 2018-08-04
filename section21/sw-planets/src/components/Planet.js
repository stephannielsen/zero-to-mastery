import React, { Component } from "react";
import * as d3 from "d3";

class Planet extends Component {
  componentDidMount() {
    const context = this.setContext();
    this.setBackground(context);
  }

  render() {
    return <div ref="planet" />;
  }

  setContext() {
    return d3
      .select(this.refs.planet)
      .append("svg")
      .attr("height", "300px")
      .attr("width", "300px")
      .attr("id", "d3-arc")
      .append("g")
      .attr("transform", `translate(150, 150)`);
  }
  setBackground(context) {
    return context
      .append("path")
      .datum({ endAngle: this.tau })
      .style("fill", "#e6e6e6")
      .attr("d", this.arc());
  }
  
  tau = Math.PI * 2;

  arc() {
    return d3
      .arc()
      .innerRadius(100)
      .outerRadius(110)
      .startAngle(0);
  }
}

export default Planet;
