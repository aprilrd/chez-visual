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