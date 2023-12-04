import React from "react";
import { groupByCity } from "./utils";
import {
  forceSimulation,
  forceX,
  forceY,
  forceCollide,
  scaleLinear,
  min,
  max,
} from "d3";

function AirportBubble(props) {
  const { width, height, routes, selectedAirline } = props;

  let cities;

  if (selectedAirline) {
    let selectedRoutes = routes.filter((a) => a.AirlineID === selectedAirline);
    cities = groupByCity(selectedRoutes);
  } else {
    cities = groupByCity(routes);
  }

  cities = cities.sort((a, b) => a.Count - b.Count);

  let maxRadius = width * 0.15;
  let radiusScale = scaleLinear()
    .range([2, maxRadius])
    .domain([min(cities, (d) => d.Count), max(cities, (d) => d.Count)]);

  let simulation = forceSimulation(cities)
    .force("x", forceX(width / 2).strength(0.05))
    .force("y", forceY(height / 2).strength(0.05))
    .force("collide", forceCollide((d) => radiusScale(d.Count) + 2))
    .stop();

  for (let i = 0; i < 200; ++i) simulation.tick();

  return (
    <g>
      {cities.map((city, idx) => (
        <circle
          key={idx}
          cx={city.x}
          cy={city.y}
          r={radiusScale(city.Count)}
          fill="#2a5599"
          stroke="black"
          strokeWidth="2"
        />
      ))}
      {cities.slice(-5).map((city, idx) => (
        <g key={idx}>
          <circle
            cx={city.x}
            cy={city.y}
            r={radiusScale(city.Count)}
            fill="#ADD8E6"
            stroke="black"
            strokeWidth="2"
          />
          <text
            x={city.x}
            y={city.y}
            dy={-radiusScale(city.Count)}
            style={{
              textAnchor: "middle",
              stroke: "pink",
              strokeWidth: "0.5em",
              fill: "#992a2a",
              fontSize: 16,
              fontFamily: "cursive",
              paintOrder: "stroke",
              strokeLinejoin: "round",
            }}
          >
            {city.City}
          </text>
        </g>
      ))}
    </g>
  );
}

export { AirportBubble };
