let questionnaire = new Questionnaire();

let barChart = new BarChart();

let map = new Map();


//load the data corresponding to all the election years
//pass this data and instances of all the charts that update on year selection to yearChart's constructor
d3.json("data/all_stat.json", function(allData) {
  d3.json("data/us_map_data.json", function(usa) {
    map.drawMap(usa);
  });
});
