/** Class implementing the shiftChart. */
class Map {

  constructor() {
    this.infoPanel = new InfoPanel();
    this.stateData = [];

    let range = ["#f3a6be", "#da1452"]
    this.colorScale = d3.scaleLinear().range(range);
  };


  update() {
    let colorParam = d3.select('input[name="colorParam"]:checked').property("value");
    let info = self.stateData
    self.colorScale.domain([d3.min(info, function(d) {
      return d[colorParam];
    }), d3.max(info, function(d) {
      return d[colorParam];
    })])
    d3.selectAll(".state")
      .style("fill", function(d) {
        let state = getStateInfoById(d.id, info);
        return self.colorScale(state[colorParam])
      })
  }

  /**
   * @param mapData the json data with the shape of all states
   * @param stateData the json statistic data
   */
  drawMap(mapData, stateData) {
    self = this;

    let colorParam = d3.select('input[name="colorParam"]:checked').property("value");
    this.colorScale.domain([d3.min(stateData, function(d) {
        return d[colorParam];
      }),
      d3.max(stateData, function(d) {
        return d[colorParam];
      })
    ])

    d3.selectAll("input[type = 'radio']").on("change", self.update);
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
        return self.colorScale(state[colorParam])
      })
      .on("mouseover", function(d) {
        d3.select("#tooltip").transition().duration(200).style("opacity", .9);

        d3.select("#tooltip")
          .html(self.toolTip(d))
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

  toolTip(d) {
    return "<h4>" + d.n + "</h4><table>" +
      "<tr><td>Suitability coefficient </td><td>" +
      getStateInfoById(d.id, self.stateData).coeff.toFixed(3) +
      "</td></tr>" +
      "</table>";
  }
}
