async function init() {
	const overall = await d3.csv("data/overall.csv");
	const data2000 = await d3.csv("data/2000.csv");
	const data2005 = await d3.csv("data/2005.csv");
	const data2010 = await d3.csv("data/2010.csv");
	const data2015 = await d3.csv("data/2015.csv");
	const data2017 = await d3.csv("data/2017.csv");
	console.log(data2000);
	
	d3.select(".chart").selectAll("rect").data(data2000).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
}

function set(n) {
	d3.select(".chart").html = "";
	if (n == 1) {
		d3.select(".chart").selectAll("rect").data(data2000).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
	
	if (n == 2) {
		d3.select(".chart").selectAll("rect").data(data2000).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
	
	if (n == 3) {
		d3.select(".chart").selectAll("rect").data(data2005).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
	
	if (n == 4) {
		d3.select(".chart").selectAll("rect").data(data2010).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
	
	if (n == 5) {
		d3.select(".chart").selectAll("rect").data(data2015).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
	
	if (n == 6) {
		d3.select(".chart").selectAll("rect").data(data2017).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
}