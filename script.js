var x = d3.scaleLinear().domain([0, 100000000]).range([0, 300]);

var data2010, data2015, data2010, data2015, data2017, overall;
			
async function init() {
	overall = await d3.csv("data/overall.csv");
	data2000 = await d3.csv("data/2000.csv");
	data2005 = await d3.csv("data/2005.csv");
	data2010 = await d3.csv("data/2010.csv");
	data2015 = await d3.csv("data/2015.csv");
	data2017 = await d3.csv("data/2017.csv");
	
	var svg = d3.select(".chart").append("svg")
            .attr("width", 400)
            .attr("height", 600)
            .append("g")
            .attr("transform", "translate(" + 50 + "," + 50 + ")");
	svg.selectAll("rect").data(data2000).enter().append("rect").attr("class", "bar").attr("width", function(d){return x(d.Arrivals);})
	.attr("height", 20).attr("y", function(d, i) {return i * 30;});
}
			
function set(n) {
	d3.select(".chart").html = "";
	d3.select("#btn" + n).attr("class", "active");
	if (n == 1) {
		d3.select(".chart").selectAll("rect").data(data2000).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
	
	if (n == 2) {
		d3.select(".chart").selectAll("rect").data(data2000).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
	
	if (n == 3) {
		d3.select(".chart").selectAll("rect").data(data2005).enter().append("rect").attr("class", "bar").attr("width", function(d){return x(d.Arrivals);}).attr("height", 20).attr("y", function(d, i) {return i * 30;});
	}
	
	if (n == 4) {
		d3.select(".chart").selectAll("rect").data(data2010).enter().append("rect").attr("class", "bar").attr("width", function(d){return x(d.Arrivals);}).attr("height", 20).attr("y", function(d, i) {return i * 30;});
	}
	
	if (n == 5) {
		d3.select(".chart").selectAll("rect").data(data2015).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
	
	if (n == 6) {
		d3.select(".chart").selectAll("rect").data(data2017).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
}