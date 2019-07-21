var x = d3.scaleLinear().domain([0, 100000000]).range([0, 300]);

var data2010, data2015, data2010, data2015, data2017, overall;
var svg = d3.select(".chart");
			
async function init() {
	overall = await d3.csv("data/overall.csv");
	data2000 = await d3.csv("data/2000.csv");
	data2005 = await d3.csv("data/2005.csv");
	data2010 = await d3.csv("data/2010.csv");
	data2015 = await d3.csv("data/2015.csv");
	data2017 = await d3.csv("data/2017.csv");
	
	svg.selectAll("rect").data(data2000).enter().append("rect").attr("class", "bar").attr("width", function(d){return x(d.Arrivals);})
	.attr("height", 20).attr("y", function(d, i) {return i * 30;});
}
			
function set(n) {
	d3.select(".chart").html = "";
	if (n == 1) {
		svg.selectAll("rect").data(data2000).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
	
	if (n == 2) {
		svg.selectAll("rect").data(data2000).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
	
	if (n == 3) {
		svg.selectAll("rect").data(data2005).enter().append("rect").attr("class", "bar").attr("width", function(d){return x(d.Arrivals);}).attr("height", 20).attr("y", function(d, i) {return i * 30;});
	}
	
	if (n == 4) {
		svg.selectAll("rect").data(data2010).enter().append("rect").attr("class", "bar").attr("width", function(d){return x(d.Arrivals);}).attr("height", 20).attr("y", function(d, i) {return i * 30;});
	}
	
	if (n == 5) {
		svg.selectAll("rect").data(data2015).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
	
	if (n == 6) {
		svg.selectAll("rect").data(data2017).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
}