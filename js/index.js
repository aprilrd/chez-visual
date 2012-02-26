$(document).ready(function () {
	var s = d3.min(data, function (d) {return d.Start;});
	var e = d3.max(data, function (d) {return d.End;});
	var h = data.length + 1;
	var barHeight = 20;
	
	var years = [];
	var x =  d3.scale.linear()
		.domain([0, d3.max(data, function (d) {return d.End-d.Start+1;})])
        .range(["0px", "710px"]);
	
	$("div#chart")
		.height(barHeight*data.length+20)
		.width(840);
	var svg = d3.select("div#chart svg");
	
	//Add bars
	var selection = svg.selectAll("rect")
		.data(data);
	selection.enter().append("rect")		
		.attr("x", function (d,i) { return 10*(d.Start-s+1)+130;})
		.attr("y", function (d,i) { return i*barHeight+20;})
		.attr("width", function(d) { return x(d.End-d.Start+1);})
		.attr("height", barHeight-1)
		.attr("fill", "steelblue");
		
	var chart = svg.append("g").attr("transform", "translate(10,15)");
	
	selection.append("title")
		.text(function(d) { return ( d.Name +", " + d.Start + "-" + d.End); });
		
	//Add y labels
	chart.selectAll("text")
	  .data(data)
		.enter()
		.append("svg:text")
		.attr("x", 125)
		.attr("y", function(d, i) {return barHeight * (i+1)})
		.text(function(d) { return d.Name})
		.attr("text-anchor", "end")
		.attr("fill", "black");
	
	//Add x ticks
	chart.selectAll("line")
		.data(x.ticks(10))
	  .enter().append("line")
	    .attr("x1", function (d,i) { return (parseInt(x(d).substring(0,x(d).length-2))+130 + 'px');})
		.attr("x2", function (d,i) { return (parseInt(x(d).substring(0,x(d).length-2))+130 + 'px');})
		.attr("y1", 0)
		.attr("y1", barHeight*data.length+20)
		.style("stroke", "#CCC");
	
	chart.selectAll(".rule")
		.data(x.ticks(10))
	  .enter().append("text")
	    .attr("class", "rule")
		.attr("x", function (d,i) { return (parseInt(x(d).substring(0,x(d).length-2))+130 + 'px');})
		.attr("y", 0)
		.attr("dy", -3)
		.attr("text-anchor", "middle")
		.text(function (d) { return parseInt(d)+parseInt(s);}); //Add labels
		
	//Add year=1971 line
	chart.append("line")
		.attr("x1", 130)
		.attr("x2", 130)
		.attr("y1", 0)
		.attr("y2", barHeight*data.length+10)
		.style("stroke", "#000");
});