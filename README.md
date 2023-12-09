# Overview

Visualizations serve as powerful tools for conveying intricate data in a clear and accessible manner, and their utility is particularly evident in the context of football, a globally adored sport with billions of fans. The UEFA Champions League, as the pinnacle of football competition, harbors a trove of information, both contemporary and historical, that are effectively communicated in our visual representations as follows:

- Addressing the burgeoning demand for accessible information and comparative analysis, a proposed multilayer visualization of UEFA Champions League data aims to facilitate easy comparison of teams and players. This approach simplifies the comprehension of trends, patterns, and key insights, ensuring understanding of the competition's and each team's history.

- By visually depicting UEFA Champions League data, one can explore historical trends and milestones, telling stories about a team's performance tracing the evolution of a player's career in the tournament. This storytelling element enhances audience engagement, captivating fans by providing a visually enriched journey through the tournament's rich history.

The two layers of the visualization are displayed below and further exaplained in the ![Visualization] section below.
ß

- First General View
  ![First General View](general-view.png)
- Second Team-Specific View (Filering by Real Madrid)
  ![Second Team-Specific View](team-specific-view.png)

# Run Locally

To run this project on your local machine, follow these steps:

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

# Description of the data set and processing:

We visualize a dataset composed of different tables about UEFA teams, countries, players, goals, and
coaches from 1992 to 2022 (34 seasons). The dataset contains data about the most performant 277
players, 39 coaches and 530 different European teams originating from 54 different countries. The tables
we utilize to derive our insights include AllTimeRankingByCountry.csv, CoachesAppearDetails.csv,
TopGoalScorer.csv, PlayerGoalDetails.csv from this [publicly available dataset on Kaggle](https://www.kaggle.com/datasets/basharalkuwaiti/champions-league-era-stats?select=TopGoalScorer.csv). The records in the tables have different numbers of attributes including but not limited to (Coach, Club, Season, Appearance, Titles,
Country, Win, Draw, Loss, Participated). The datatypes used varies depending on the view, but we focus on the number of goals
(quantitative), coach names (categorical), countries (categorical), club names (categorical) and player
names (categorical). With regards to data processing, we use JavaScript and D3 on the fly to change the string datatype to integers for numerical attributes. For club logos, we scrap the data online, store it, and map it to its respective club as in `file_name_mapping_script.py`. In addition, we obtain the boarder information of Europe in JSON format, with a large number of coordinates that govern the borders of each country. Although extensive data preprocessing has been done to ensure the map, countries, and clubs are coherent with UEFA official data, one limitation of the map is that the location of clubs within countries doesn't represent the official office location. Rather, club points were randomly sampled from our preprocessed database and kept within the countries boarder through the help of force-directed graphs.

# Goals & Tasks

Throughout the visualization, we intend to:

- Provide a general overview about the competition, such as qualifying teams from each country, top winning teams, and historical top goals scorers.
- Provide a filter method to investigate team-specific data, such as managers and team-specific top goal scorers.

# Visualization

The three components are:

- Geomap:<br>
  It represents the coordinates and boarders of each country, along with its randomly-placed teams.
- Barcharts:
  - First Visualization:
    The barchart shows the top-10 winning teams.
  - Second Visualization:
    The barchart illustrates managers for that team, ranked by the number of participation.
- Bubble Chart:<br>
  It shows a dynamic force-directed graph using the number of scored goals as the magnitude.

# Reflection

The core idea of our visualization hasn't changed, although some details have been implemented. First, we spent a significant amount of time gathering and preprocessing the data, including the Kaggle tabels, European geomap, and team logos. Then, we implementend and insured that Europe's boarders are coherent and teams lie within their respective countries. After that, the barcharts and bubble charts were implemented separtely and then integrated in the visualization. Finally, we test the visualization and included final additions like tooltips and labels. One main change from our proposal is we didn't include players' faces in the bubble chart graph. This is because, during implementation, we didn't find it visually appealing and some teams have very small bubbles, which makes it impossible to even recognize the player. However, we did include a tooltip over every player, identifying their names and the number of goals. Another limitation is that we scraped team logos for most Western European leagues, but we plan to add more leagues as an extension of this project.
