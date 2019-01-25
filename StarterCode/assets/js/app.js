// INSTRUCTIONS
//You need to create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.

//Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. 
//You'll code this graphic in the app.js file of your homework directory—make sure you pull in the data from data.csv by using the 
//d3.csv function. Your scatter plot should ultimately appear like the image at the top of this section.


//Include state abbreviations in the circles.
//Create and situate your axes and labels to the left and bottom of the chart.

//I'm doing Healthcare (y) vs. Poverty(x)
//x = "poverty" 
//y = "healthcare"


//1. Need to create a 'canvas' for the D3 graph to go on: 
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select scatterplot (class in index.html), append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth)
  .attr("class", "chart");

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

//2. Load data into chart area
//Get csv data
d3.csv("data.csv", function(error, Data) {
  if (error) throw error;

  console.log(Data);

  // Cast the hours value to a number for each piece of Data
  Data.forEach(function(d) {
    d.healthcare = +d.healthcare;
  });

  // Configure a band scale for the x axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(Data.map(d => d.poverty))
    .range([0, chartWidth])
    .padding(0.1);

  // Create a linear scale for the y axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(Data, d => d.healthcare)])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup.selectAll(".bar")
    .data(Data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.healthcare));

});


