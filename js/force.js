$(document).ready(function () {	
	var w = 940,
    	h = $(document).innerHeight()-$("footer").outerHeight()-$("div .navbar").outerHeight()-160;
    $("div #chart1").css("max-height", h+50);
    $("div #chart2").css("max-height", h+50);
	
	var color = d3.scale.category20();
	
	var force = d3.layout.force()
       .charge(-500)
       .theta(1)
       .linkDistance(200)
       .gravity(0.05)
       .size([w, h]);

	var vis = d3.select("div #chart1").append("svg:svg")
	    .attr("width", w)
	    .attr("height", h);

	force
        .nodes(alldata.nodes)
        .links(alldata.links)
        .start();
        
	var link = vis.selectAll("line.link")
        .data(alldata.links)
      .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return Math.log(d.value); })
        .style("stroke", "black");
        
    var node = vis.selectAll("circle.node")
	     .data(alldata.nodes)
	   .enter().append("circle")
	     .attr("class", "node")
	     .attr("r", nodesize)
         .style("fill", "steelblue")
         .call(force.drag);
    
    node.append("svg:title")
        .text(function(d) {return d.name;});
         
    node.append("svg:text")
        .attr("class", "nodetext")
        .attr("x", 300)
        .attr("y", 300)
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) { return d.name; })
        .style("color", "green");
        
    node.on("mouseover", mouseover)
    	.on("mouseout", mouseout);
         
    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
 
      node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    });
	
	var force2 = d3.layout.force()
       .charge(-1000)
       .theta(1)
       .linkDistance(200)
       .size([w, h]);
		    
	var vis2 = d3.select("div #chart2").append("svg:svg")
	    .attr("width", w)
	    .attr("height", h);
	    
	force2
        .nodes(alldata.nodes)
        .links(alldata.links)
        .start();
        
	var link2 = vis2.selectAll("line.link")
        .data(alldata.links)
      .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return Math.log(d.value); })
        .style("stroke", "#ccc");
        
    var node2 = vis2.selectAll("text.node")
	     .data(alldata.nodes)
	   .enter().append("svg:text")
	     .attr("class", "node")
	     .attr("x", function(d) { return d.x; })
      	 .attr("y", function(d) { return d.y; })
      	 .attr("font-size", nodesize)
         .text(function(d) { return d.name; })
	     .style("fill", "black")
         .call(force2.drag);
    
    node2.append("svg:title")
        .text(function(d) {return d.name;});
        
    node2.on("mouseover", mouseover2)
    	.on("mouseout", mouseout2);
         
    force2.on("tick", function() {
      link2.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
 
      node2.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
    });
    
        	
    function mouseover(d, i) {
    	var connected = [d.index];
    	link.style("stroke-opacity", function(datum) {
    		//console.log(datum);
    		if (datum.source.index == d.index) {
    			connected.push(datum.target.index);
    			return 1;
    		} else if (datum.target.index == d.index) {
    			connected.push(datum.source.index);
    			return 1;
    		}
    		return 0.1;
    	});
    	
		node.style("fill", function(datum) {
			//console.log(connected.indexOf(datum.index));
			if (connected.indexOf(datum.index) == -1) {
				return "#ccc";
			} else {
				return "steelblue";
			}			
		});
    }
    
    function mouseover2(d, i) {
    	var connected = [d.index];
    	link2.style("stroke-opacity", function(datum) {
    		//console.log(datum);
    		if (datum.source.index == d.index) {
    			connected.push(datum.target.index);
    			return 1;
    		} else if (datum.target.index == d.index) {
    			connected.push(datum.source.index);
    			return 1;
    		}
    		return 0.1;
    	});
    	
		node2.style("fill", function(datum) {
			//console.log(connected.indexOf(datum.index));
			if (connected.indexOf(datum.index) == -1) {
				return "#ccc";
			} else {
				return "black";
			}			
		});
    }
    
    function mouseout(d, i) {
    	link.style("stroke-opacity", 1);
    	node.style("fill", "steelblue");
    }
    
    function mouseout2(d, i) {
    	link2.style("stroke-opacity", 1);
    	node2.style("fill", "black");
    }
    
    function nodesize(d) {
    	if (typeof d.pend == 'number' && typeof d.pstart == 'number') {
    		return Math.max(d.pend-d.pstart, 10);
    	} else {
    		return 10;
    	} 
    }
});