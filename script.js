var x = d3.scaleLinear().domain([0, 90]).range([0, 500]);
var y = d3.scaleLinear().domain([60, 0]).range([0, 350]);
var color = d3.scaleLinear().domain([4, 36]).range(["green", "red"]);
var overall = [];
var div, svg;
var formatComma = d3.format(",");
		
async function init() {
	overall = await d3.csv("data/chicago.csv");
	
	div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
	
	set(1);
}

function draw(n) {
	var highlight = 1;
	if (n == 2) highlight = 2;
	if (n == 3) highlight = 58;
	if (n == 4) highlight = 78;
	svg = d3.select(".chart").append("svg")
            .attr("width", 655)
            .attr("height", 410)
            .append("g")
            .attr("transform", "translate(" + 70 + "," + 60 + ")");
	var newArr = overall.slice();
	var highlighted = newArr.splice(highlight - 1, 1);
	newArr.push(highlighted[0]);

	var circles = svg.selectAll("circle").data(newArr).enter().append("circle").attr("cx", function(d){return x(d.PerCapitaIncome/1000);})
	.attr("r", function (d, i) {if (i == overall.length-1) return 15; return 6;}).attr("cy", function(d) {return y(d.NoHighSchoolDiploma);}).style("stroke", function(d, i) {if (i == overall.length-1) return "red"; return "#496d89";}).style("stroke-width", function(d, i) {if (i == overall.length-1) return "4"; return "2";}).style("fill", "white");
	circles.on("mouseover", function(d, x, m) {
			d3.select(this).style("fill", "#fdbfa6");
            div.transition()		
                .duration(20)		
                .style("opacity", .9);		
            div.html("Name: " + d.Name + "<br/>" + "Per Capita Income: $" + formatComma(d.PerCapitaIncome) + "<br />" + "Aged 25+ w/o High School Diploma: " + d.NoHighSchoolDiploma + "%<br/>"  + "Percent Below Poverty: " + d.PercentBelowPoverty + "%<br/>" + "Aged 25+ Unemployed: " + d.Unemployed + "%<br/>")	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {
			d3.select(this).style("fill", "white");			
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });
	

	d3.select(".chart").append("g").attr("transform", "translate(70, 60)").call(d3.axisLeft(y));
	d3.select(".chart").append("g").attr("transform", "translate(70, 410)").call(d3.axisBottom(x));
	d3.select(".chart").append("text").attr("x", 220).attr("y", 440).text("Per Capita Income (in thousand)").style("font-size", "10px");
	d3.select(".chart").append("text").attr("x", 77).attr("y", 405).text("Hover over a circle for details").style("font-size", "7px").style("fill", "#999");
	d3.select(".chart").append("text").attr("x", -220).attr("y", 40).text("Population aged 26+ without high school diploma (%)").style("font-size", "10px").attr("transform", "rotate(-90)").style("text-anchor", "middle");
	//d3.select(".chart").append("text").data(overall[n-1]).text(function(d) {return d.Country;}).attr("x", 0).attr("y", function(d, i) {return i * 35;});
	
	svg.append("text").attr("x", 50).attr("y", 0).text("Education and Wealth in Chicago").style("font-size", "17px");
	
	annotate(n);
}

function annotate(n) {
	if (n == 1) {
		var line = svg.append("path")
					.style("stroke", "lightblue")
					.style("stroke-dasharray", "10,10")
					.attr("d", "M 60 190 L 236 190");
		
		svg.append("text").attr("x", 250).attr("y", 180).text("The poorest community measured by").attr("width", 100).style("font-size", "12px");
		svg.append("text").attr("x", 250).attr("y", 195).text("Per Capita Income is Riverdale.").attr("width", 100).style("font-size", "12px");
		svg.append("text").attr("x", 250).attr("y", 210).text("It is ranked 19 in people aged 25+").attr("width", 100).style("font-size", "12px");
		svg.append("text").attr("x", 250).attr("y", 225).text("without high school diploma.").attr("width", 100).style("font-size", "12px");
	}
	
	if (n == 2) {
		var line = svg.append("path")
					.style("stroke", "lightblue")
					.style("stroke-dasharray", "10,10")
					.attr("d", "M 75 30 L 236 30"); 
		
		svg.append("text").attr("x", 240).attr("y", 20).text("The community where the largest").attr("width", 100).style("font-size", "12px");
		svg.append("text").attr("x", 240).attr("y", 35).text("percentage of population aged 25+").attr("width", 100).style("font-size", "12px");
		svg.append("text").attr("x", 240).attr("y", 50).text("have no school diploma is South").attr("width", 100).style("font-size", "12px");
		svg.append("text").attr("x", 240).attr("y", 65).text("Lawndale. It is the second poorest").attr("width", 100).style("font-size", "12px");
		svg.append("text").attr("x", 240).attr("y", 80).text("comunity by Per Capita Income.").attr("width", 100).style("font-size", "12px");

	}
	
	if (n == 3) {
				var line = svg.append("path")
					.style("stroke", "lightblue")
					.style("stroke-dasharray", "10,10")
					.attr("d", "M 175 237 L 276 237"); 
		
		svg.append("text").attr("x", 280).attr("y", 220).text("This is the Chicago average.").attr("width", 100).style("font-size", "12px");
		svg.append("text").attr("x", 280).attr("y", 235).text("Per capita annual income is $28,202,").attr("width", 100).style("font-size", "12px");
		svg.append("text").attr("x", 280).attr("y", 250).text("and 19.5% of people aged 25+ are").attr("width", 100).style("font-size", "12px");
		svg.append("text").attr("x", 280).attr("y", 265).text("without high school diploma.").attr("width", 100).style("font-size", "12px");
	}
	
	if (n == 4) {
		
		var line = svg.append("path")
					.style("stroke", "lightblue")
					.style("stroke-dasharray", "10,10")
					.attr("d", "M 492 315 L 492 195"); 
		svg.append("text").attr("x", 375).attr("y", 145).text("Finally, the community with the").attr("width", 100).style("font-size", "12px");
		svg.append("text").attr("x", 375).attr("y", 160).text("highest per capita income is").attr("width", 100).style("font-size", "12px");
		svg.append("text").attr("x", 375).attr("y", 175).text("also the best educated community:").attr("width", 100).style("font-size", "12px");
		svg.append("text").attr("x", 375).attr("y", 190).text("Near North Side.").attr("width", 100).style("font-size", "12px");
	}
}
			
function set(n) {
	slide = n;
	d3.select(".chart").html("");
	var i;
	for (i = 1; i <= 4; i++) { 
		d3.select("#btn" + i).attr("class", "");
	}
	
	d3.select("#btn" + n).attr("class", "active");
	
	draw(n);
}

function next() {
	if (slide < 4) {
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
