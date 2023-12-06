// import React from "react";
import React, { useState } from 'react';

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
import Tooltip from './Tooltip'; // Adjust the path accordingly





function updateRadiusScale(maxGoals, maxRadius) {
  // Check if maxGoals is a valid number
  let isValidNumber = !isNaN(maxGoals) && isFinite(maxGoals);

  // Set a default value if maxGoals is not a valid number
  let defaultMaxGoals = 140;

  // Create or update the linear scale
  let updatedRadiusScale = scaleLinear()
    .range([2, maxRadius])
    .domain([10, isValidNumber ? maxGoals : defaultMaxGoals]);

  return updatedRadiusScale;
}


function PlayerBubble(props) {
  const { width, height, players, selectedPointClub, setSelectedPointClub } = props;
  // let currentTeam
  // console.log(maxGoals);
  // if(selectedPointClub){
  //     currentTeam = selectedPointClub.club;
  //     console.log('current team', currentTeam)
  // }

  // console.log(players);


  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' });

  const handleMouseOver = (event, player) => {
    // console.log('Mouse over:', player);
    const { clientX, clientY } = event;
    const content = `Player: ${player.Player}, Goals: ${player.Goals}`;
    setTooltip({ show: true, x: clientX, y: clientY, content });
  };

const handleMouseOut = () => {
  setTooltip({ ...tooltip, show: false });
};
  

  let maxGoals = Math.max(...players.map(player => player["Goals"]));

  // console.log('number of goals', maxGoals);

  if (selectedPointClub){
    console.log('current club', selectedPointClub);
  }
  
  // console.log('max goals', maxGoals);

  let maxRadius = width * 0.15;

  // let radiusScale = scaleLinear().range([2, maxRadius]).domain([10, maxGoals ? maxGoals : 140]);
    let radiusScale = updateRadiusScale(maxGoals, maxRadius);


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

      <g key={idx}>
          <circle
            key={idx}
            cx={player.x}
            cy={player.y}
            r={radiusScale(player.Goals)}
            fill="#2a5599"
            stroke="black"
            onMouseOver={(event) => handleMouseOver(event, player)}
            onMouseOut={handleMouseOut}
          />
      </g>
      ))}

      {tooltip.show && (
        <Tooltip x={tooltip.x} y={tooltip.y} content={tooltip.content} />
      )}


      {players.slice(-5).map((player, idx) => (
        <g key={idx}>
          <circle
            cx={player.x}
            cy={player.y}
            r={radiusScale(player.Goals)}
            fill="#ADD8E6"
            stroke="black"
            strokeWidth="2"
            onMouseOver={(event) => handleMouseOver(event, player)}
            onMouseOut={handleMouseOut}
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

      {tooltip.show && (
        <Tooltip x={tooltip.x} y={tooltip.y} content={tooltip.content} />
      )}
    </g>
  );
}

export { PlayerBubble };
