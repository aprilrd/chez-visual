$(document).ready(function () {
	
	var links = new Array();
	var i, j;
	for (i=0; i<alldata.nodes.length; i++) {
		if (typeof alldata.nodes[i].pend == 'number' && typeof alldata.nodes[i].pstart == 'number') {
			for (j=i+1; j<alldata.nodes.length; j++) {
				if (typeof alldata.nodes[j].pend == 'number' && typeof alldata.nodes[j].pstart == 'number') {
					if (!(alldata.nodes[i].pend <= alldata.nodes[j].pstart)&&(alldata.nodes[i].pstart <= alldata.nodes[j].pend)) {
						links.push({"target":i, "source":j, "value":Math.min(alldata.nodes[i].pend-alldata.nodes[j].pstart,alldata.nodes[i].pend-alldata.nodes[i].pstart)});
					}
				}
			}
		}
	}
	alldata.links = links;
	console.log(alldata);
	
	var w = 940,
    	h = 500,
    	radius = 1,
    	root,
	    json,
	    link,
	    linkedByIndex = {},
	    node,
	    labels = [],
	    selectedLabelIndex = null;
	
	var color = d3.scale.category20();
	
	var force = d3.layout.force()
       .charge(-500)
       .theta(1)
       .linkDistance(200)
       .gravity(0.05)
       .size([w, h]);
		    
	var vis = d3.select("div #chart").append("svg:svg")
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
         .style("fill", function(d) { return color(d.group); })
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
        
    /*node.on("mouseover", mouseover)
    	.on("mouseout", mouseout);*/
         
    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
 
      node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    });
    
        	
    function mouseover(d, i) {
    	d3.select(this)
    		.transition()
    			.ease("linear")
    			.duration(200)
    			.attr("r", 2 * nodesize);
    }
    
    function mouseout(d, i) {
    	d3.select(this)
    		.transition()
    			.ease("linear")
    			.duration(200)
    			.attr("r", nodesize);
    }
    
    function nodesize(d) {
    	if (typeof d.pend == 'number' && typeof d.pstart == 'number') {
    		return Math.max(d.pend-d.pstart, 5);
    	} else {
    		return 5;
    	} 
    }
});