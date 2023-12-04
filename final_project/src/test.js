import React from "react";
import ReactDOM from "react-dom";
import { csv, json } from "d3";
import { groupByAirline, groupByAirport } from "./utils";
import "./styles.css";
import { ClubMap } from "./uefaClubMap";
import { BarChart } from "./barChart";
import { AirportBubble } from "./airportBubble";
import { topWinningClubs, topGoalScorers, coachByTeam } from "./utils";
const allTimeRankingByClub =
  "https://gist.githubusercontent.com/mhendy25/971de005f98140e41d6e1d50ab24eac5/raw/058a9fa78e96fa2e54368a166f9ea804dc8b3dc5/gistfile1.txt";

function useBarChartData(csvPath) {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvPath)
      .then((data) => {
        console.log("my data", data);
        data.forEach((d) => {
          d.Titles = +d.Titles;
        });
        setData(data);
      })
      .catch((err) => {
        console.log("catched error", err);
      });
  }, []);
  return dataAll;
}
const barChartData = useBarChartData(allTimeRankingByClub);
console.log("inside test", barChartData);
