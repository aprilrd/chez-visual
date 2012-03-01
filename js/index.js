$(document).ready(function () {	
	var s = d3.min(data, function (d) {return d.pstart;});
	var e = d3.max(data, function (d) {return d.pend;});
	var h = data.length + 1;
	var barHeight = 20;
	var startLine = 130;
	
	var startPos = d3.scale.linear()
		.domain([1971, 2012])
        .range(["140", "755"]);
	var endPos = d3.scale.linear()
		.domain([1, 42])
        .range(["15", "630"]);
	
	$("div#chart")
		.height(barHeight*data.length+20)
		.width(800);
	var svg = d3.select("div#chart")
		.append("svg:svg");	
		
	//Add y axis
	var yrule = svg.selectAll("g.y")
		.data(data)
		.enter()
		.append("g")
		.attr("class","y");

	yrule.append("text")
	    .attr("x", 133)
	    .attr("y", function(d, i) {return barHeight * (i+1)+15})
	    .attr("text-anchor", "end")
	    .text(function(d) { return d.name});
	
	//Add bars
	var selection = svg.selectAll("rect")
		.data(data);
	selection.enter().append("rect")		
		.attr("x", function (d,i) { return startPos(d.pstart)})
		.attr("y", function (d,i) { return i*barHeight+20;})
		.attr("width", function(d) { return endPos(d.pend-d.pstart+1)})
		.attr("height", barHeight-1)
		.attr("fill", "steelblue");
		
	var chart = svg.append("g").attr("transform", "translate(10,15)");
	
	selection.append("title")
		.text(function(d) { return ( d.name +", " + d.pstart + "-" + d.pend); });
		
	//Add y labels
	/*
	chart.selectAll("text")
	  .data(data)
		.enter()
		.append("svg:text")
		.attr("x", 125)
		.attr("y", function(d, i) {return barHeight * (i+1)})
		.text(function(d) { return d.name})
		.attr("text-anchor", "end")
		.attr("fill", "black");
	*/
	//Add x ticks
	chart.selectAll("line")
		.data(startPos.ticks(10))
	  .enter().append("line")
	    .attr("x1", function (d,i) { return startPos(d);})
		.attr("x2", function (d,i) { return startPos(d);})
		.attr("y1", 0)
		.attr("y1", barHeight*data.length+20)
		.style("stroke", "#CCC");
	
	chart.selectAll(".rule")
		.data(startPos.ticks(10))
	  .enter().append("text")
	    .attr("class", "rule")
		.attr("x", function (d,i) { return startPos(d);})
		.attr("y", 0)
		.attr("dy", -3)
		.attr("text-anchor", "middle")
		.text(function (d) { return d;}); //Add labels
		
	//Add year=1971 line
	chart.append("line")
		.attr("x1", startLine)
		.attr("x2", startLine)
		.attr("y1", 0)
		.attr("y2", barHeight*data.length+10)
		.style("stroke", "#000");
});