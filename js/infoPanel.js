/** Class implementing the infoPanel view. */
class InfoPanel {
  /**
   * Creates a infoPanel Object
   */
  constructor() {}

  /**
   * Update the info panel to show info about the currently selected state
   * @param stateInfo the currently selected state data
   */
  updateInfo(stateInfo) {

    d3.selectAll(".text_label").remove();

    d3.select("#mapTitle")
      .property('innerHTML', stateInfo.region_name);

    d3.select("#population")
      .append("text")
      .attr('class', 'text_label')
      .text(stateInfo.population);

    d3.select("#income")
      .append("text")
      .attr('class', 'text_label')
      .text(stateInfo.median_income);

    d3.select("#age")
      .append("text")
      .attr('class', 'text_label')
      .text(stateInfo.median_age);

    let religion = Object.keys(stateInfo.religion);
    for (let k = 0; k < religion.length; k++) {
      d3.select("#religions")
        .append("div")
        .append("text")
        .attr('class', 'text_label')
        .text(religion[k] + ": " + stateInfo.religion[religion[k]] + "%")
    }

    let crime = Object.keys(stateInfo.crime);
    for (let k = 0; k < crime.length; k++) {
      d3.select("#crime")
        .append("div")
        .append("text")
        .attr('class', 'text_label')
        .text(crime[k] + ": " + stateInfo.crime[crime[k]])
    }

    let race = Object.keys(stateInfo.races);
    for (let k = 0; k < race.length; k++) {
      d3.select("#races")
        .append("div")
        .append("text")
        .attr('class', 'text_label')
        .text(race[k] + ": " + stateInfo.races[race[k]] + "%")
    }

    let weather = Object.keys(stateInfo.weather);
    for (let k = 0; k < weather.length; k++) {
      d3.select("#weather")
        .append("div")
        .append("text")
        .attr('class', 'text_label')
        .text(weather[k] + ": " + stateInfo.weather[weather[k]] )
    }
  }
}
