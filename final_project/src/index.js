import React from "react";
import ReactDOM from "react-dom";
import { csv, json } from "d3";
import { groupByAirline, groupByAirport } from "./utils";
import "./styles.css";
import { ClubMap } from "./uefaClubMap";
import { BarChart } from "./barChart";
import { PlayerBubble } from "./playerBubble";
import { topWinningClubs, topGoalScorers, coachByTeam } from "./utils";

// The csv file with the club rankings in the competition (uses fifa country codes)
// const csvUrl =
  // "https://gist.githubusercontent.com/danysigha/f3e5054ce147833a899178553eb2d883/raw/f27858668ec440a9e85745a6b827b3ebd8fd6185/alltimerankingbyclub.csv";

// The geojson of the map of Europe
const mapUrl =
  "https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson";

// The mapping between fifa country codes and the country names
const codesUrl =
  "https://gist.githubusercontent.com/danysigha/774a124bc279c56ed4323802dafd6445/raw/200692a0c0941e3c8086fb94e9a3436f131cd337/fifa_codes.csv";

// logos of european clubs - csv of file name (club name) --> logo path mappings
const logosUrl =
  "https://gist.githubusercontent.com/danysigha/94022b90211d99126d5b3cf3eabe3278/raw/c09de7f7db821aef4bc73fdec584be150c03c7c3/clublogos.csv";


// The csv file with the club rankings in the competition (uses fifa country codes)
// add the routes of each gist file
const allTimeRankingByClub =
  "https://gist.githubusercontent.com/mhendy25/971de005f98140e41d6e1d50ab24eac5/raw/058a9fa78e96fa2e54368a166f9ea804dc8b3dc5/gistfile1.txt";

const playerGoalTotals =
  "https://gist.githubusercontent.com/mhendy25/47cefff9bc9de9fbc71671f96a359705/raw/427769f5d7482273bb90f732f60fb4d1280424ea/gistfile1.txt";

const coaches =
  "https://gist.githubusercontent.com/mhendy25/10eb594ac5c11792a3bd3f49a452aec9/raw/40d416fd5776c25680528cdcaa77fa5374560e85/gistfile1.txt";

// function useBarChartData(csvPath) {
//   const [dataAll, setData] = React.useState(null);
//   React.useEffect(() => {
//     csv(csvPath).then((data) => {
//       // console.log('my data', data)
//       data.forEach((d) => {
//         d.Titles = +d.Titles;
//       });
//       setData(data);
//     });
//   }, []);
//   return dataAll;
// }

function usePlayerGoalsData(csvPath) {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvPath).then((data) => {
      // console.log('my data', data)
      data.forEach((d) => {
        d.Goals = +d.Goals;
      });
      setData(data);
    });
  }, []);
  return dataAll;
}

function useCoachesData(csvPath) {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvPath).then((data) => {
      // console.log('my data', data)
      data.forEach((d) => {
        d.Appearance = +d.Appearance;
      });
      setData(data);
    });
  }, []);
  return dataAll;
}

// table with the clubs and their ranking in Champions League
function useRankingsData(csvPath) {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvPath).then((data) => {
      data.forEach((d) => {
        d.Titles = +d.Titles;
        d.Pts = +d.Pts;
        d.Position = +d.Position;
        d.Win = +d.Win;
        d.Draw = +d.Draw;
        d.Loss = +d.Loss;
        d.Played = +d.Played;
        d.Participated = +d.Participated;
      });
      setData(data);
    });
  }, []);
  return dataAll;
}

// the table with Fifa code to country name mappings
function useFifaData(csvPath) {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvPath).then((data) => {
      setData(data);
    });
  }, []);
  return dataAll;
}

// the funciton to display the map of Europe
function useMap(jsonPath) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    json(jsonPath).then((geoJsonData) => {
      setData(geoJsonData);
    });
  }, []);
  return data;
}

// function to read the club name --> logo path mappings
function useClubLogos(csvPath) {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvPath).then((data) => {
      setData(data);
    });
  }, []);
  return dataAll;
}

// the function to display the points on the map
function UefaClubs() {
  const [selectedPointClub, setSelectedPointClub] = React.useState(null);
  const [barHeader, setBarHeader] = React.useState(null)
  // console.log(selectedPointClub);
  const map_height = 900;
  // const barChartData = useBarChartData(allTimeRankingByClub);
  const playerGoalsData = usePlayerGoalsData(playerGoalTotals);
  const coachesData = useCoachesData(coaches);
  const rankings = useRankingsData(allTimeRankingByClub);
  const fifa_codes = useFifaData(codesUrl);
  const clubLogos = useClubLogos(logosUrl);
  const map = useMap(mapUrl);

  // if (!map || !rankings || !barChartData || !playerGoalsData || !coachesData) {
  if (!map || !rankings || !playerGoalsData || !coachesData) {

    return <pre>Loading...</pre>;
  }

  let winningClubs = topWinningClubs(rankings);
  // console.log("winning club", winningClubs);
  let topPlayers = topGoalScorers(playerGoalsData, selectedPointClub); 
  // object with player details per club - print it

  // console.log("top players", topPlayers);
  // console.log("selected point before filter", selectedPointClub);
  // console.log("filtered coaches", filteredCoaches);

  let filteredCoaches = coachByTeam(coachesData, selectedPointClub);

  let barsData;
  if (!selectedPointClub) {
    barsData = winningClubs;
  } else {
    barsData = filteredCoaches;
  }
  // Group clubs by the "Country" attribute
  const groupedArray = rankings.reduce((acc, member) => {
    const { Country, ...rest } = member;

    // IMPORTANT – the number of clubs to display on map (should make a slider for this)
    // tooltip feature is still missing
    if (member.Position <= 100) {
      // Check if the country key already exists in the accumulator
      if (!acc[Country]) {
        // If not, create a new key with an array containing the current member
        acc[Country] = [rest];
      } else {
        // If yes, push the current member to the existing array
        acc[Country].push(rest);
      }
    }
    return acc;
  }, {});

  // Convert the grouped data into an array of key-value pairs
  // the keys are Fifa country codes
  const groupedClubs = Object.entries(groupedArray);
  // console.log(groupedClubs);

  // map fifa codes to country names
  const code_country_map = fifa_codes.reduce((acc, member) => {
    const { FIFA, CLDR_display_name } = member;

    // Check if the country key already exists in the accumulator
    if (!acc[FIFA]) {
      if (FIFA == "ENG,NIR,SCO,WAL") {
        acc["ENG"] = "United Kingdom";
        acc["SCO"] = "United Kingdom";
        acc["NIR"] = "Ireland";
        acc["WAL"] = "Wales";
        acc["CZE"] = "Czech Republic";
      } else {
        acc[FIFA] = CLDR_display_name;
      }
      // If not, create a new key with an array containing the current member
    }
    return acc;
  }, {});

  // new object with country names as keys and array of club names as values
  const newGroupedClubs = {};

  for (const [index, [clubFifaCode, clubs]] of Object.entries(groupedClubs)) {
    if (code_country_map[clubFifaCode]) {
      const countryKey = code_country_map[clubFifaCode];

      if (newGroupedClubs[countryKey]) {
        // Country key already exists, push clubs
        clubs.forEach((e) => {
          newGroupedClubs[countryKey].push(e["Club"]);
        });
      } else {
        // Create a new array for the country key
        newGroupedClubs[countryKey] = clubs.map((e) => e["Club"]);
      }
    }
  }
  // console.log(newGroupedClubs);

  // need to add a header indicating that the map is Europe

  const barchart_width = 350;
  const barchart_height = 400;
  const barchart_margin = { top: 10, bottom: 50, left: 130, right: 10 };
  const barchart_inner_width =
    barchart_width - barchart_margin.left - barchart_margin.right;
  const barchart_inner_height =
    barchart_height - barchart_margin.top - barchart_margin.bottom;

  const hub_width = window.innerWidth / 2;
  const hub_height = map_height / 1.5;

  let barHeaderContent;
  if(selectedPointClub){
    barHeaderContent = `Coaches for ${selectedPointClub}`
  }
  else{
    barHeaderContent = 'Top Winning Clubs'
  }

  let bubbleHeaderContent;
  if(selectedPointClub){
    bubbleHeaderContent = `Top Scorers for ${selectedPointClub}`
  }
  else{
    bubbleHeaderContent = 'Top Scorers'
  } 

  return (
    <div>
      <h1>UEFA CHAMPIONS LEAGUE – a visual narrative</h1>

      <div className={"mainView"}>

        
        <div className="full-width-container">

          <h1 className="title">A map of Europe</h1>
          <svg id={"map"} height={map_height} width={window.innerWidth / 2}>
            
            <ClubMap
              width={window.innerWidth / 2}
              height={map_height}
              map={map}
              clubs={newGroupedClubs}
              logos={clubLogos}
              selectedPointClub={selectedPointClub}
              setSelectedPointClub={setSelectedPointClub}
              barHeader = {barHeader}
              setBarHeader = {setBarHeader}
            />
          </svg>
        </div>

        <div>

          <h1 id="dynamic_title" className="title">{barHeaderContent}</h1>

          
          
          <div>
          
          <svg
            id={"view2"}
            height={ (map_height / 2) - 48}
            width={window.innerWidth / 2}
          >
            <BarChart
              offsetX={barchart_margin.left}
              offsetY={barchart_margin.top}
              height={barchart_inner_height}
              width={barchart_inner_width}
              data={barsData}
              selectedPointClub={selectedPointClub}
              setSelectedPointClub={setSelectedPointClub}
            />
          </svg>

          <h1 className="title">{bubbleHeaderContent}</h1>
        </div>


        <div>
            <svg
                id={"view1"}
                height={ (map_height / 2) + 47}
                width={window.innerWidth / 2}
                style={{
                  position: "absolute",
                  left: window.innerWidth / 2 + 10,
                  top: map_height / 2 + 90,
            }}>
              
                <svg id={"bubble"} width={hub_width} height={hub_height}>
                      <PlayerBubble
                        width={hub_width}
                        height={hub_height}
                        countries={map}
                        players={topPlayers}
                        selectedPointClub = {selectedPointClub}
                        setSelectedPointClub = {setSelectedPointClub}
                      />
                </svg>

            </svg>
        </div>

        

        </div>

        
      </div>
      <p> Reference dataset: <a href="https://www.kaggle.com/datasets/basharalkuwaiti/champions-league-era-stats/data">
        Champions League era stats</a> 
      </p>
      <p>Notes:
          <li> The locations of the logos are only indicative of the clubs' home countries, not their offices, statdium, or city</li>
          <li> Only Champions league data for seasons started on or after 1992 and ended before or in 2022 is presented</li>
          <li> Click on any logo to get club specific data</li>
      </p>
    </div>
  );
}

ReactDOM.render(<UefaClubs />, document.getElementById("root"));
