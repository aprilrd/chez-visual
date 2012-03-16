$(document).ready(function () {
	shared = new Object();
	shared.setDialog = setDialog;
	shared.setMap = setMap;
	
	function setDialog(d, i) {
		$('#modal-title').text(d.name +", who has worked from " + d.pstart + " to " + d.pend);
		console.log(alldata.nodes[alldata.lookup[d.name]]);
		var desc = "";
		var alldatum = alldata.nodes[alldata.lookup[d.name]];
		
		//Creating map	
		//setMap(d, i);
		$('#chef_modal').modal('show'); //show modal
	}
	
	function setMap (d, i) {
		var alldatum = alldata.nodes[alldata.lookup[d.name]];
		var current = alldatum.current;
		var i;
		var geocoder = new google.maps.Geocoder();
		var myOptions = {
	          center: new google.maps.LatLng(37.8798723107172, -122.269244855449), //Chez-Panisse
	          disableDefaultUI: true,
	          zoom: 5,
	          mapTypeId: google.maps.MapTypeId.ROADMAP
	        };
	    var map = new google.maps.Map(document.getElementById("map"), myOptions);
	    google.maps.event.trigger(map, "resize");
	    
		for (i = 0; i < current.length; i++) {
			var name = current[i].business;
			var latlng;
			geocoder.geocode({address:current[i].address}, function (data) {
				console.log(data);
				latlng = data[0].geometry.location;
				new google.maps.Marker({position: latlng, map: map,title:name});
			});
			map.setCenter(latlng);
		}
		
		google.maps.event.trigger(map, "resize");
	}
});