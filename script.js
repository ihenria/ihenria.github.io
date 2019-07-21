var x = d3.scaleLinear().domain([0, 100]).range([0, 400]);
var slide = 1;

var data2010, data2015, data2010, data2015, data2017;

var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
		
async function init() {
	data2000 = await d3.csv("data/2000.csv");
	data2005 = await d3.csv("data/2005.csv");
	data2010 = await d3.csv("data/2010.csv");
	data2015 = await d3.csv("data/2015.csv");
	data2017 = await d3.csv("data/2017.csv");
	
	var svg = d3.select(".chart").append("svg")
            .attr("width", 500)
            .attr("height", 450)
            .append("g")
            .attr("transform", "translate(" + 50 + "," + 50 + ")");
	svg.selectAll("rect").data(data2000).enter().append("rect").attr("class", "bar").attr("width", function(d){return x(d.Arrivals/1000000);})
	.attr("height", 20).attr("y", function(d, i) {return i * 30;}).attr("fill", function(d){return getColor(d.Region);}).on("mouseover", function(d) {
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div.html("Name: " + d.Country + "<br/>"  + "Arrivals: " + d.Arrivals + "<br/>" + "Region: " + d.Region + "<br/>" + "Income Level: " + d.Income)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });
	
	var items = [], i;
	for (i = 0; i < 10; i++) { 
		items.push(data2000[i].Country);
	}
	var y = d3.scaleOrdinal().domain(items).range([0, 500]);
	
	d3.select(".chart").append("g").attr("transform", "translate(50, 650)").call(d3.axisBottom(x));
	d3.select(".chart").append("g").attr("transform", "translate(0, 0)").call(d3.axisLeft(y));
	
	svg.append("rect").attrs({"cx": 500, "cy": 500, "width": 10, "height": 10}).style("fill", "#4C5270")
	svg.append("rect").attrs({"cx": 500, "cy": 520, "width": 10, "height": 10}).style("fill", "#F652A0")
	svg.append("rect").attrs({"cx": 500, "cy": 540, "width": 10, "height": 10}).style("fill", "#36EEE0")
	svg.append("text").attr("x", 515).attr("y", 500).text("Europe & Central Asia").style("font-size", "15px").attr("alignment-baseline","middle")
	svg.append("text").attr("x", 515).attr("y", 520).text("North America").style("font-size", "15px").attr("alignment-baseline","middle")
	svg.append("text").attr("x", 515).attr("y", 540).text("East Asia & Pacific").style("font-size", "15px").attr("alignment-baseline","middle")
}
			
function set(n) {
	slide = n;
	d3.select(".chart").html("");
	var i;
	for (i = 1; i <= 5; i++) { 
		d3.select("#btn" + i).attr("class", "");
	}
	
	d3.select("#btn" + n).attr("class", "active");
	
	if (n == 1) {
		d3.select(".chart").selectAll("rect").data(data2000).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
	
	if (n == 2) {
		d3.select(".chart").selectAll("rect").data(data2005).enter().append("rect").attr("class", "bar").attr("width", function(d){return x(d.Arrivals);}).attr("height", 20).attr("y", function(d, i) {return i * 30;});
	}
	
	if (n == 3) {
		d3.select(".chart").selectAll("rect").data(data2010).enter().append("rect").attr("class", "bar").attr("width", function(d){return x(d.Arrivals);}).attr("height", 20).attr("y", function(d, i) {return i * 30;});
	}
	
	if (n == 4) {
		d3.select(".chart").selectAll("rect").data(data2015).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
	
	if (n == 5) {
		d3.select(".chart").selectAll("rect").data(data2017).enter().append("rect").attr("width", 19).attr("height", function(d){return d.Arrivals;});
	}
}

function next() {
	if (slide < 5) {
		slide++;
		set(slide);
	}
}

function previous() {
	if (slide > 1) {
		slide--;
		set(slide);
	}
}

function getColor(region) {
	switch (region) {
		case "Europe & Central Asia":
		return "#4C5270";
		case "North America":
		return "#F652A0";
		case "East Asia & Pacific":
		return "#36EEE0";
		case "Latin America & Caribbean":
		return "#BCECE0";
	}
}