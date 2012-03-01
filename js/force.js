$(document).ready(function () {
	var links = new Array();
	var i, j;
	var length = alldata.nodes.length;
	for (i=0; i<length; i++) {
		if (typeof alldata.nodes[i].pend == 'number' && typeof alldata.nodes[i].pstart == 'number') {
			for (j=i+1; j<length; j++) {
				if (typeof alldata.nodes[j].pend == 'number' && typeof alldata.nodes[j].pstart == 'number') {
					if (!(alldata.nodes[i].pend <= alldata.nodes[j].pstart)&&(alldata.nodes[i].pstart <= alldata.nodes[j].pend)) {
						links.push({"target":i, "source":j, "value":Math.min(Math.abs(alldata.nodes[i].pend-alldata.nodes[j].pstart),Math.abs(alldata.nodes[i].pend-alldata.nodes[i].pstart))});
					}
				}
			}
		}
	}
	alldata.links = links;
	
	var w = 940,
    	h = 500;
	
	var color = d3.scale.category20();
	
	var force = d3.layout.force()
       .charge(-1000)
       .theta(1)
       .linkDistance(200)
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
        .style("stroke", "#ccc");
        
    var node = vis.selectAll("text.node")
	     .data(alldata.nodes)
	   .enter().append("svg:text")
	     .attr("class", "node")
	     .attr("x", function(d) { return d.x; })
      	 .attr("y", function(d) { return d.y; })
      	 .attr("font-size", nodesize)
         .text(function(d) { return d.name; })
	     .style("fill", "black")
         .call(force.drag);
    
    node.append("svg:title")
        .text(function(d) {return d.name;});
        
    node.on("mouseover", mouseover)
    	.on("mouseout", mouseout);
         
    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
 
      node.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
    });
    
        	
    function mouseover(d, i) {
    	var connected = [d.index];
    	console.log(d);
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
			console.log(connected.indexOf(datum.index));
			if (connected.indexOf(datum.index) == -1) {
				return "#ccc";
			} else {
				return "black";
			}			
		});
    }
    
    function mouseout(d, i) {
    	link.style("stroke-opacity", 1);
    	node.style("fill", "black");
    }
    
    function nodesize(d) {
    	if (typeof d.pend == 'number' && typeof d.pstart == 'number') {
    		return Math.max(d.pend-d.pstart, 10);
    	} else {
    		return 10;
    	} 
    }
});