async function init() {
	const overall = await d3.csv("data/overall.csv");
	const data2000 = await d3.csv("data/2000.csv");
	const data2005 = await d3.csv("data/2005.csv");
	const data2010 = await d3.csv("data/2010.csv");
	const data2015 = await d3.csv("data/2015.csv");
	const data2017 = await d3.csv("data/2017.csv");
	console.log(data1995);
}