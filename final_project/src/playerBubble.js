// import React from "react";
import React, { useState } from 'react';
import PlayerCircle from './PlayerCircle';  // Adjust the path accordingly


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

function findGoat(goats, goat){ 
  
  let player = goats.find( (p) =>
              p["name"].includes(
                goat.Player
                  .replace(/-/g, " ")
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
              ) ||
              goat.Player
                .replace(/-/g, " ")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .includes(p["name"])
            );

  return player.Player;
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
  // const [tooltip, setTooltip] = useState(null);


  const handleMouseOver = (event, player) => {
    console.log('Mouse over:', player);
    const { clientX, clientY } = event;
    const content = `Player: ${player.Player}, Goals: ${player.Goals}`;
    setTooltip({ show: true, x: (window.innerWidth/2) + player.x, y:  (window.innerHeight/2)+player.y, content });
  };

const handleMouseOut = () => {
  setTooltip({ ...tooltip, show: false });
};
  

  let maxGoals = Math.max(...players.map(player => player["Goals"]));

  // console.log('number of goals', maxGoals);

  // if (selectedPointClub){
  //   console.log('current club', selectedPointClub);
  // }
  
  // console.log('max goals', maxGoals);

  let maxRadius = width * 0.15;

  // const GOATS = [
  //   {
  //     "name": "Lionel Messi",
  //     "image": "https://en.wikipedia.org/wiki/Lionel_Messi#/media/File:Lionel_Messi_20180626_(cropped).jpg"
  //   },
  //   {
  //     "name": "Ronaldo",
  //     "image": "https://en.wikipedia.org/wiki/Cristiano_Ronaldo#/media/File:Cristiano_Ronaldo_2018.jpg"
  //   },
  //   {
  //     "name": "Thomas Müller",
  //     "image": "https://commons.wikimedia.org/wiki/Category:Thomas_M%C3%BCller#/media/File:2019147201815_2019-05-27_Fussball_1.FC_Kaiserslautern_vs_FC_Bayern_M%C3%BCnchen_-_Sven_-_1D_X_MK_II_-_2718_-_B70I1018_(cropped).jpg"
  //   },
  //   {
  //     "name": "Raúl González",
  //     "image": "https://en.wikipedia.org/wiki/Ra%C3%BAl_(footballer)#/media/File:Raul_2011-08-03-2_(cropped).jpg"
  //   },
  //   {
  //     "name": "Alessandro Del Piero",
  //     "image": "https://en.wikipedia.org/wiki/Alessandro_Del_Piero#/media/File:Alessandro_Del_Piero_in_2014.jpg"
  //   }
  // ]
  
  
  
  

  

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
      // define the x and y holders here
      let tmpx, tmpy;
  return (
    <g>
      {players.map((player, idx) => (
      // assign their values herer
      
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
      {/* {players.forEach((player)=>{
        setTooltip({})
      })} */}


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
            clipPath={`url(#clip-${player.x}-${player.y})`}
          />

            
{/* 
              <clipPath id={`clip-${player.x}-${player.y}`}>
                  <circle cx={player.x} cy={player.y} r={radiusScale(player.Goals)} />
                </clipPath>
                <image
                  x={player.x - radiusScale(player.Goals)}
                  y={player.y - radiusScale(player.Goals)}
                  width={radiusScale(player.Goals) * 2}
                  height={radiusScale(player.Goals) * 2}
                  href={GOATS[player.Player].image}
                  clipPath={`url(#clip-${player.x}-${player.y})`}
                  preserveAspectRatio="none"
                /> */}
          
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
