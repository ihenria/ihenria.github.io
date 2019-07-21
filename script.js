var x = d3.scaleLinear().domain([0, 100]).range([0, 400]);
var slide = 1;
var overall = [];

var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
		
async function init() {
	var data2000 = await d3.csv("data/2000.csv");
	var data2005 = await d3.csv("data/2005.csv");
	var data2010 = await d3.csv("data/2010.csv");
	var data2015 = await d3.csv("data/2015.csv");
	var data2017 = await d3.csv("data/2017.csv");
	
	overall.push(data2000);
	overall.push(data2005);
	overall.push(data2010);
	overall.push(data2015);
	overall.push(data2017);
	draw(1);
}

function draw(n) {
	var svg = d3.select(".chart").append("svg")
            .attr("width", 500)
            .attr("height", 350)
            .append("g")
            .attr("transform", "translate(" + 70 + "," + 50 + ")");
	svg.selectAll("rect").data(overall[n-1]).enter().append("rect").attr("class", "bar").attr("width", function(d){return x(d.Arrivals/1000000);})
	.attr("height", 25).attr("y", function(d, i) {return i * 35;}).attr("fill", function(d){return getColor(d.Region);}).on("mouseover", function(d) {
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
	
	d3.select(".chart").append("g").attr("transform", "translate(70, 400)").call(d3.axisBottom(x));
	d3.select(".chart").append("text").attr("x", 150).attr("y", 420).text("Units in millions");
	d3.select(".chart").append("text").data(overall[n-1]).text(function(d) {return d.Country;}).attr("x", 0).attr("y", function(d, i) {return i * 35;});
	
	svg.append("rect").attr("x", 300).attr("y", 250).attr("width", 10).attr("height", 10).style("fill", "#4C5270")
	svg.append("rect").attr("x", 300).attr("y", 270).attr("width", 10).attr("height", 10).style("fill", "#F652A0")
	svg.append("rect").attr("x", 300).attr("y", 290).attr("width", 10).attr("height", 10).style("fill", "#36EEE0")
	svg.append("rect").attr("x", 300).attr("y", 310).attr("width", 10).attr("height", 10).style("fill", "#BCECE0")
	svg.append("text").attr("x", 315).attr("y", 270).text("Europe & Central Asia").style("font-size", "15px");
	svg.append("text").attr("x", 315).attr("y", 290).text("North America").style("font-size", "15px");
	svg.append("text").attr("x", 315).attr("y", 310).text("East Asia & Pacific").style("font-size", "15px");
	svg.append("text").attr("x", 315).attr("y", 330).text("Latin America & Caribbean").style("font-size", "15px");
}
			
function set(n) {
	slide = n;
	d3.select(".chart").html("");
	var i;
	for (i = 1; i <= 5; i++) { 
		d3.select("#btn" + i).attr("class", "");
	}
	
	d3.select("#btn" + n).attr("class", "active");
	
	draw(n);
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