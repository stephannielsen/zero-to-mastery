import React from "react";
import BubbleChart from "@weknow/react-bubble-chart-d3";

const Universe = ({ planets }) => {
  const bubbleClick = label => {
    console.log("Custom bubble click func");
  };
  return (
    <BubbleChart
      graph= {{
      zoom: 0.6,
      offsetX: 0.05,
      offsetY: 0.01,
    }}
      width={1000}
      height={800}
      showLegend={false}
      legendPercentage={0}
      fontFamily="Arial"
      data={
        planets
          .map(planet => ({ label: planet.name, value: planet.diameter }))
      }
      bubbleClickFunc={bubbleClick}
    />
  );
};

export default Universe;
