data = [55000, 48000, 27000, 66000, 90000];
const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500;
const MARGINS = {
	left: 50,
	right: 50,
	top: 50,
	bottom: 50
}
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

const FRAME1 = d3.select("#plot")
					.append("svg")
						.attr("height", FRAME_HEIGHT)
						.attr("width", FRAME_WIDTH)
						.attr("class", "frame");

const MAX_X = d3.max(data, (d) => { return d; }); 

// Now, define scale functions that maps our data values 
// (domain) to pixel values (range)
const X_SCALE = d3.scaleLinear() // linear scale because we have 
                              // linear data 
                  .domain([0, (MAX_X + 10000)]) // add some padding  
                  .range([0, VIS_WIDTH]); 

FRAME1.selectAll("points")
	.data(data)
	.enter()
	.append("circle")
		.attr("cx", (d) => { return (X_SCALE(d) + MARGINS.left); }) 
      	.attr("cy", MARGINS.top) 
      	.attr("r", 10)
      	.attr("class", "point");

FRAME1.append("g")
	.attr("transform","translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top + ")"))
	.call(d3.axisBottom(X_SCALE).ticks(4))
		.attr("font-size", '20px');