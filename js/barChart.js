/** Class implementing the shiftChart. */
var margin = 50;
var width = 1000;
var height = 450;

class BarChart {

  constructor() {
    this.stateData = [];
    this.xScale;
    this.yScale;
    self.stateData
  }


  update(stateData) {
    this.stateData = stateData.sort(function(a, b) {
      return b.coeff - a.coeff;
    });
  }

  drawBarChart(stateData) {
    this.update(stateData);
    d3.selectAll(".bar").remove();

    var svg = d3.select("#barChart")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(0,70)");

    this.xScale = d3.scaleBand().range([0, width - margin]).padding(0.4);
    this.yScale = d3.scaleLinear().range([height - margin, 0]);

    var self = this;
    this.xScale.domain(self.stateData.map(function(d, i) {
      return i;
    }));
    this.yScale.domain([0, d3.max(self.stateData, function(d) {
      return d.coeff;
    })]);

    svg.select("#xAxis")
      .attr("transform", "translate(60," + (height - margin) + ")")
      .call(d3.axisBottom(self.xScale).tickFormat(function(d, i) {
          return self.stateData[i].id;
        }));


        svg.select("#xAxis").selectAll("text")
        .style("transform", "rotate(270deg) translate(-35px,-15px)");

        svg.select("#yAxis")
        .attr("transform", "translate(60,0)")
        .call(d3.axisLeft(self.yScale).tickFormat(function(d) {
          return d;
        }).ticks(10))
        .append("text")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("value");

        svg.selectAll("#bars")
        .selectAll("rect")
        .data(self.stateData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) {
          return self.xScale(i);
        });

        d3.selectAll("rect.bar")
        .attr("y", function(d) {
          return self.yScale(d.coeff);
        })
        .attr("width", self.xScale.bandwidth())
        .attr("height", function(d) {
          return height - self.yScale(d.coeff);
        })
        .attr("transform", "translate(60,-50)");


        d3.selectAll("rect")
        .on('click', function(d) {
          updateInfoPanel(d.id);
          $.fn.fullpage.moveTo(3, 0);
        })
        .on("mouseover", function(d) {
          d3.select("#bar_tooltip").transition().duration(200).style("opacity", .9);
          d3.select("#bar_tooltip")
            .html(self.toolTip(d))
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
          d3.select("#tooltip").transition().duration(500).style("opacity", 0)
        });
      }

    toolTip(d) {
      return "<h4>" + d.region_name + "</h4><table>" +
        "<tr><td>Suitability coefficient </td><td>" +
        d.coeff.toFixed(3) +
        "</td></tr>" +
        "</table>";
    }
  }
