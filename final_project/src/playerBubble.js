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

function PlayerBubble(props) {
  const { width, height, players } = props;

  // let cities;

  // if (selectedAirline) {
  //   let selectedRoutes = routes.filter((a) => a.AirlineID === selectedAirline);
  //   cities = groupByCity(selectedRoutes);
  // } else {
  //   cities = groupByCity(routes);
  // }

  // cities = cities.sort((a, b) => a.Count - b.Count);

  let maxRadius = width * 0.15;
  let radiusScale = scaleLinear().range([2, maxRadius]).domain([10, 140]);

  let simulation = forceSimulation(players)
    .force("x", forceX(width / 2).strength(0.05))
    .force("y", forceY(height / 2).strength(0.05))
    .force(
      "collide",
      forceCollide((d) => radiusScale(d.Goals) + 2)
    )
    .stop();

  for (let i = 0; i < 200; ++i) simulation.tick();

  return (
    <g>
      {players.map((player, idx) => (
        <circle
          key={idx}
          cx={player.x}
          cy={player.y}
          r={radiusScale(player.Goals)}
          fill="#2a5599"
          stroke="black"
          strokeWidth="2"
        />
      ))}
      {players.slice(-5).map((player, idx) => (
        <g key={idx}>
          <circle
            cx={player.x}
            cy={player.y}
            r={radiusScale(player.Goals)}
            fill="#ADD8E6"
            stroke="black"
            strokeWidth="2"
          />
          <text
            x={player.x}
            y={player.y}
            dy={-radiusScale(player.Goals)}
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
            {/* {player.Player} */}
            {player.Goals}
          </text>
        </g>
      ))}
    </g>
  );
}

export { PlayerBubble };
