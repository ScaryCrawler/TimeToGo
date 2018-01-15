let questionnaire = new Questionnaire();

let barChart = new BarChart();

let map = new Map();

let allStateData;


//load the data corresponding to all the sates
//pass this data and instances of map and barcharct
d3.json("data/all_stat.json", function(allData) {
  allStateData = allData;

  normalizeData(allStateData)
  calculateSuitabilityCoeffForAllStales(allStateData, questionnaire)

  d3.json("data/us_map_data.json", function(usa) {
    map.drawMap(usa, allStateData);
    barChart.drawBarChart(allStateData);
  });
});



function showResultBasedOnQuestionnaire() {
  questionnaire.update();
  calculateSuitabilityCoeffForAllStales(allStateData, questionnaire)
  barChart.drawBarChart(allStateData);
  var bestState = (allStateData.sort(function(a, b) { return b.coeff - a.coeff; }))[0];
  map.infoPanel.updateInfo(getStateInfoById(bestState.id, allStateData));
}


function updateInfoPanel(stateId){
  map.infoPanel.updateInfo(getStateInfoById(stateId, allStateData));
}
