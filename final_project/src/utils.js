function groupByAirline(data) {
  //Iterate over each route, producing a dictionary where the keys is are the ailines ids and the values are the information of the airline.
  let result = data.reduce((result, d) => {
    let currentData = result[d.AirlineID] || {
      AirlineID: d.AirlineID,
      AirlineName: d.AirlineName,
      Count: 0,
    };
    currentData.Count += 1; //Increment the count (number of routes) of ariline.
    result[d.AirlineID] = currentData; //Save the updated information in the dictionary using the airline id as key.
    return result;
  }, {});

  //We use this to convert the dictionary produced by the code above, into a list, that will make it easier to create the visualization.
  result = Object.keys(result).map((key) => result[key]);
  result = result.sort((a, b) => b.Count - a.Count); //Sort the data in descending order of count.
  return result;
}

function groupByAirport(data) {
  //We use reduce to transform a list into a object where each key points to an aiport. This way makes it easy to check if is the first time we are seeing the airport.
  let result = data.reduce((result, d) => {
    //The || sign in the line below means that in case the first option is anything that Javascript consider false (this insclude undefined, null and 0), the second option will be used. Here if result[d.DestAirportID] is false, it means that this is the first time we are seeing the airport, so we will create a new one (second part after ||)

    let currentDest = result[d.DestAirportID] || {
      AirportID: d.DestAirportID,
      Airport: d.DestAirport,
      Latitude: +d.DestLatitude,
      Longitude: +d.DestLongitude,
      City: d.DestCity,
      Country: d.DestCountry,
      Count: 0,
    };
    currentDest.Count += 1;
    result[d.DestAirportID] = currentDest;

    //After doing for the destination airport, we also update the airport the airplane is departing from.
    let currentSource = result[d.SourceAirportID] || {
      AirportID: d.SourceAirportID,
      Airport: d.SourceAirport,
      Latitude: +d.SourceLatitude,
      Longitude: +d.SourceLongitude,
      City: d.SourceCity,
      Country: d.SourceCountry,
      Count: 0,
    };
    currentSource.Count += 1;
    result[d.SourceAirportID] = currentSource;
    return result;
  }, {});

  //We map the keys to the actual airports, this is an way to transform the object we got in the previous step into a list.
  result = Object.keys(result).map((key) => result[key]);
  return result;
}

function groupByCity(data) {
  let result = data.reduce((result, d) => {
    // For destination city
    let currentDest = result[d.DestCity] || {
      AirportID: d.DestAirportID,
      Airport: d.DestAirport,
      City: d.DestCity,
      Count: 0,
      Country: d.DestCountry,
      Latitude: +d.DestLatitude,
      Longitude: +d.DestLongitude,
    };
    currentDest.Count += 1;
    result[d.DestCity] = currentDest;

    // For source city
    let currentSource = result[d.SourceCity] || {
      AirportID: d.SourceAirportID,
      Airport: d.SourceAirport,
      City: d.SourceCity,
      Count: 0,
      Country: d.SourceCountry,
      Latitude: +d.SourceLatitude,
      Longitude: +d.SourceLongitude,
    };
    currentSource.Count += 1;
    result[d.SourceCity] = currentSource;

    return result;
  }, {});

  result = Object.keys(result).map((key) => result[key]);
  // result = result.sort((a, b) => b.Count - a.Count);

  return result;
}

function topWinningClubs(data) {
  let result = data.reduce((acc, d) => {
    let currentClub = acc.find((c) => c.Club === d.Club);

    if (!currentClub) {
      currentClub = {
        Club: d.Club,
        TitlesCount: d.Titles,
      };
      acc.push(currentClub);
    } else {
      currentClub.TitlesCount += 1;
    }

    return acc;
  }, []);

  // Sort the result array by TitlesCount in descending order
  result.sort((a, b) => b.TitlesCount - a.TitlesCount);

  // Return the top 10 clubs with logos
  const top10Clubs = result.slice(0, 10);

  // Add the club logos
  const logos = [
    "https://i.hizliresim.com/hla0km5.png",
    "https://seeklogo.com/images/A/AC_MILAN-logo-87399104D2-seeklogo.com.png",
    "https://i.imgur.com/HBGtgKF.png",
    "https://i.imgur.com/dw7HNJm.png",
    "https://i.imgur.com/2JgQCRN.png",
    "https://i.imgur.com/mJpWo8O.png",
    "https://i.imgur.com/8GIC8HB.png",
    "https://i.imgur.com/q9yp4KB.png",
    "https://i.imgur.com/XiUGXBE.png",
    "https://i.imgur.com/R8kLMcg.png",
  ];

  // Add ClubLogoUrl property to each club
  top10Clubs.forEach((club, index) => {
    club.ClubLogoUrl = logos[index];
  });

  return top10Clubs;
}

function topGoalScorers(data, club) {
  console.log("data inside top goal scorers", data);
  if (club) {
    data = data.filter((row) => row.Club === club);
  }
  console.log("data inside top goal scorers after filter", data);

  let result = data.reduce((acc, d) => {
    let currentPlayer = acc.find((c) => c.Player === d.Player);

    if (!currentPlayer) {
      currentPlayer = {
        Player: d.Player,
        Goals: d.Goals,
      };
      acc.push(currentPlayer);
    } else {
      // currentClub.TitlesCount += 1;
      console.log("inside else statement ");
    }

    return acc;
  }, []);
  console.log("club inside topgoalscorers", club);

  console.log("result after top goal scorers", result);
  // Sort the result array by TitlesCount in descending order
  result.sort((a, b) => a.Goals - b.Goals);

  return result;
}

function coachByTeam(data, club) {
  const coaches = data.filter((row) => row.Club === club); // need to make sure club names match across the coaches and teams tables
  const result = coaches.map((row) => ({
    Coach: row.Coach,
    Appearance: row.Appearance,
  }));
  result.sort((a, b) => b.Appearance - a.Appearance);
  return result;
}

export {
  groupByAirline,
  groupByAirport,
  groupByCity,
  topWinningClubs,
  topGoalScorers,
  coachByTeam,
};
