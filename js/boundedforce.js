$(document).ready(function () {	
	$("#slider").slider({min:1972,
						 max:2012,
						 value:1972,
						 slide: function( event, ui ) {
							$("#year").val(ui.value);
							force.resume();
							//node.style("fill", function(d) { return colorcheck(d);});
						}
						});
	$("#year").val($("#slider").slider("value"));
	$("#year").change(function () {
		$("#slider").val($("#year").val());
	});
	
	var w = 940,
    	h = $(document).innerHeight()-$("footer").outerHeight()-$("div .navbar").outerHeight()-160;
    $("div #chart1").css("max-height", h+50);
    $("div #chart2").css("max-height", h+50);
	
	var color = d3.scale.category20();
	
	var force = d3.layout.force()
       .charge(-500)
       .theta(1)
       .linkDistance(500)
       .gravity(0.05)
       .size([w, h]);

	var vis = d3.select("div #chart1").append("svg:svg")
	    .attr("width", w)
	    .attr("height", h);
	    
	//add box
	vis.append("rect")
		.attr("x", w/4)
		.attr("y", h/4)
		.attr("width", w/2)
		.attr("height", h/2)
		.style("fill-opacity", "0")
		.style("stroke", "#333");

	force
        .nodes(alldata.nodes)
        //.links(alldata.links)
        .start();
        
	/*var link = vis.selectAll("line.link")
        .data(alldata.links)
      .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return Math.log(d.value); })
        .style("stroke", "#ddd");*/
        
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
        .style("color", "black");
        
    /*node.on("mouseover", mouseover)
    	.on("mouseout", mouseout);*/
         
    force.on("tick", tick);
    
    function tick() {
      node.attr("cx", function(d, i) { 
      		var r = this.r.animVal.value;
      		if (timecheck(d)) { //condition to be in
      			//d.x = d.x + (d.x <= w/4)*(Math.max(d.x, w/4)-d.x) + (d.x >= w/4*3) * (Math.min(d.x, w/4*3)-d.x);
      			d.x = d.x + (d.x <= (w/4+r))*(Math.max(d.x, (w/4+r))-d.x) + (d.x >= (w/4*3-r)) * (Math.min(d.x, (w/4*3-r))-d.x);
      		} else {
      			if (((d.x<=(w*3/4+r)) && (d.x>=(w/4-r)))&&((d.y<=(h*3/4+r)) && (d.y>=(h/4-r)))) { //if in the box
      				if (Math.min(Math.abs(d.x-(w*3/4+r)), Math.abs(d.x-(w/4-r))) < Math.min(Math.abs(d.y-(h*3/4+r)), Math.abs(d.y-(h/4-r)))) {
      					if (Math.abs(d.x-(w*3/4+r)) < Math.abs(d.x-(w/4-r))) {
      						d.x = w*3/4+r;
      					} else {
      						d.x = w/4-r;
      					}
      				}
      			}
      		}
      		return d.x; 
      	})	
        .attr("cy", function(d, i) {
      		var r = this.r.animVal.value;
        	if (timecheck(d)) { //condition to be in
        		d.y = d.y + (d.y <= (h/4+r))*(Math.max(d.y, (h/4+r))-d.y) + (d.y >= (h*3/4-r)) * (Math.min(d.y, (h*3/4-r))-d.y);
        	} else {
        		if (((d.x<=(w*3/4+r)) && (d.x>=(w/4-r)))&&((d.y<=(h*3/4+r)) && (d.y>=(h/4-r)))) { //if in the box
      				if (Math.min(Math.abs(d.x-(w*3/4+r)), Math.abs(d.x-(w/4-r))) > Math.min(Math.abs(d.y-(h*3/4+r)), Math.abs(d.y-(h/4-r)))) {
      					if (Math.abs(d.y-(h*3/4+r)) < Math.abs(d.y-(h/4-r))) {
      						d.y = h*3/4+r;
      					} else {
      						d.y = h/4-r;
      					}
      				}
      			}
        	}
        	return d.y; 
        });
        
        /*link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });*/
    }
    
    function colorcheck(d) {
    	if (timecheck(d)) {
    		return "red";
    	} else {
    		return "#ccc";
    	}
    }
    
    function timecheck (d) {
    	var year = $("#slider").slider("value"); 
    	if (d.pstart <= year && year <= d.pend) {
    		return true;
    	} 
    	return false;
    }
       	
    function mouseover(d, i) {
    	var connected = [d.index];
    	    	
		node.style("fill", function(datum) {
			//console.log(connected.indexOf(datum.index));
			if (connected.indexOf(datum.index) == -1) {
				return "#ccc";
			} else {
				return "steelblue";
			}			
		});
    }
    
    function mouseout(d, i) {
    	node.style("fill", "steelblue");
    }
    
    function nodesize(d) {
    	if (typeof d.pend == 'number' && typeof d.pstart == 'number') {
    		return Math.max(d.pend-d.pstart, 10);
    	} else {
    		return 10;
    	} 
    }
});