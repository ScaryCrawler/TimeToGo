/** Class implementing the shiftChart. */
class Map {

  constructor() {
    this.infoPanel = new InfoPanel();
    this.stateData = [];
    let min = 0;
    let max = 7000000;
    let range = ["green", "red"]
    this.colorScale = d3.scaleLinear()
      .domain([min, max])
      .range(range);
  };


  update(stateData) {

  }

  /**
   * @param map_data the json data with the shape of all states
   */
  drawMap(mapData, stateData) {
    self = this;
    let mapsvg = d3.select("#statesvg")
      .attr("width", "1000")
      .attr("height", "700");
    this.stateData = stateData;
    mapsvg.selectAll(".state")
      .data(mapData)
      .enter()
      .append("path")
      .attr("class", "state")
      .attr("d", function(d) {
        return d.d;
      })
      .style("fill", function(d) {
        let state = getStateInfoById(d.id, stateData);
        return self.colorScale(state.population)
      })
      .on("mouseover", function(d) {
        d3.select("#tooltip").transition().duration(200).style("opacity", .9);

        d3.select("#tooltip")
          .html(self.toolTip(d.n))
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        d3.select("#tooltip").transition().duration(500).style("opacity", 0)
      })
      .on('click', function(d) {
        self.infoPanel.updateInfo(getStateInfoById(d.id, stateData));
      });
  }

  toolTip(n, d) {
    return "<h4>" + n + "</h4><table>" +
      "<tr><td>Suitability coefficient</td><td>" + "" + "</td></tr>" +
      "</table>";
  }
}
