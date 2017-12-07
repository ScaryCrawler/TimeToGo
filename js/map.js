/** Class implementing the shiftChart. */
class Map {

  constructor() {

  };


  update() {

  }

  /**
   * @param data the json data with the shape of all states
   */
  drawMap(data) {
    self = this;
      let mapsvg = d3.select("#statesvg")
          .attr("width", "1000")
          .attr("height", "700");

      mapsvg.selectAll(".state")
      .data(data)
      .enter()
      .append("path")
      .attr("class", "state")
      .attr("d", function(d) {
        return d.d;
      })
      .style("fill", function(d, i) {
        return d3.interpolate("#ffffcc", "#800026")(Math.round(100 * Math.random()) / 100);
      })
      .on("mouseover", function(d) {
        d3.select("#tooltip").transition().duration(200).style("opacity", .9);

        d3.select("#tooltip").html(self.toolTip(data[d.id])
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        d3.select("#tooltip").transition().duration(500).style("opacity", 0)
      });
  }

  toolTip(d) { /* function to create html content string in tooltip div. */
    return "<h4>123</h4>"
  }
}
