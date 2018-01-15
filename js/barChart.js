/** Class implementing the shiftChart. */
class BarChart {

  constructor() {
      this.stateData = [];
  }


  update(stateData) {
      let info = self.stateData;
  }

  drawBarChart(stateData) {
      this.stateData = stateData;

      var svg = d3.select("#barChartSvg")
            .attr("width", "1000")
            .attr("height", "700"),
          margin = {top: 20, right: 20, bottom: 150, left: 40},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom;

      var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]);

      var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain(stateData.map(function(d) { return d.region_name; }));
      y.domain([0, d3.max(stateData, function(d) { return parseInt(d.population); })]);

      g.append("g")
          .attr("class", "axis axis--x bar_labels")
          // .attr("class", "bar_labels")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      g.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y).ticks(10, ".0s"))
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Population");

      g.selectAll(".bar")
          .data(stateData)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.region_name); })
          .attr("y", function(d) { return parseInt(y(d.population)); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - parseInt(y(d.population)); });
  }
}
