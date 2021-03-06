var initmap = function(){

	console.info('Init Map');

	var markers = [];
	var map = new google.maps.Map(document.getElementById('map-canvas'), {
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	// Create the search box and link it to the UI element.
	var input = /** @type {HTMLInputElement} */(
	  document.getElementById('pac-input'));
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	var searchBox = new google.maps.places.SearchBox(
	/** @type {HTMLInputElement} */(input));

	navigator.geolocation.getCurrentPosition(function(position){
		var defaultBounds = new google.maps.LatLngBounds(
		  new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
		  new google.maps.LatLng(position.coords.latitude + 0.005, position.coords.longitude + 0.005));
		
		map.fitBounds(defaultBounds);

		// [START region_getplaces]
		// Listen for the event fired when the user selects an item from the
		// pick list. Retrieve the matching places for that item.
		google.maps.event.addListener(searchBox, 'places_changed', function() {
			var places = searchBox.getPlaces();

			console.info(places);

			if (places.length == 0) {
			  return;
			}
			for (var i = 0, marker; marker = markers[i]; i++) {
			  marker.setMap(null);
			}

			// For each place, get the icon, place name, and location.
			markers = [];
			var bounds = new google.maps.LatLngBounds();
			for (var i = 0, place; place = places[i]; i++) {
			  var image = {
			    url: place.icon,
			    size: new google.maps.Size(71, 71),
			    origin: new google.maps.Point(0, 0),
			    anchor: new google.maps.Point(17, 34),
			    scaledSize: new google.maps.Size(25, 25)
			  };

			  // Create a marker for each place.
			  var marker = new google.maps.Marker({
			    map: map,
			    icon: image,
			    title: place.name,
			    position: place.geometry.location
			  });

			  markers.push(marker);

			  bounds.extend(place.geometry.location);
			}

			map.fitBounds(bounds);
		});

		var marker = new google.maps.Marker({
		      position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
		      map: map
		});

		var autocomplete = new google.maps.places.AutocompleteService();

		/**
		 *
		 * new google.maps.Marker({
					  position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
					  map: map,
					  title : pred.description
					  //icon: iconBase + 'schools_maps.png'
					});
		 */

		autocomplete.getPlacePredictions({input: jQuery('#pac-input').val()}, function(predictions, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log(predictions);

                var service = new google.maps.places.PlacesService(map);
                var infowindow = new google.maps.InfoWindow();

                jQuery.each(predictions, function(idx, pred){
                	service.getDetails({ placeId : pred.place_id}, function(place, status) {
                		console.info(place, status);
				    if (status == google.maps.places.PlacesServiceStatus.OK) {
				      var marker = new google.maps.Marker({
				        map: map,
				        position: place.geometry.location,
				        title : pred.descriptiom
				      });
				      google.maps.event.addListener(marker, 'click', function() {
				        infowindow.setContent(place.name);
				        infowindow.open(map, this);
				      });
				    }
				  });
                });
            }
        });

		//google.maps.event.trigger(searchBox, 'places_changed');

		// [END region_getplaces]
	});//eo getCurrentPosition()

	// Bias the SearchBox results towards places that are within the bounds of the
	// current map's viewport.
	google.maps.event.addListener(map, 'bounds_changed', function() {
	var bounds = map.getBounds();
	searchBox.setBounds(bounds);
	});
};

app.controller('CareCtrl', function($rootScope, $scope, $http, $interval, SETTINGS, INFO){
	console.info('CareCtrl started @ ' + $rootScope.startTimestamp);

	var mocks = {
		friends : [
			{ name : 'Chan Ying Feng', distance: 5.0, location:'80 Boat Quay', icon:'/img/avatar/YF.jpg', desc:'Daughter' },
			{ name : 'Joyce Chang',    distance: 5.0, location:'40 Hong Kong Street', icon:'/img/avatar/Joy.jpg', desc:'' },
			{ name : 'Chua Aik Boon',  distance: 5.0, location:'36 North Canal Road', icon:'/img/avatar/boss.jpg', desc:'Son' },
			{ name : 'Aitch Chung',    distance: 5.0, location:'383 Jalan Besar', icon:'/img/avatar/aitch.jpg', desc:'' },
			{ name : 'Andy Vu',        distance: 5.0, location:'115 King George’s Avenue', icon:'/img/avatar/Andy.jpg', desc:'' },
			{ name : 'Coco Tsai',      distance: 5.0, location:'3 Seng Poh Road', icon:'/img/avatar/coco.jpg', desc:'' },
			{ name : 'Melissa Tian',   distance: 5.0, location:'6 Kim Tian Road ', icon:'/img/avatar/Mel.jpg', desc:'' },
			{ name : 'Tang Xin Yi',    distance: 5.0, location:'36 Keong Saik Road', icon:'/img/avatar/XY.jpg', desc:'' },
			{ name : 'Ashley Ng',      distance: 5.0, location:'28 Maxwell Road', icon:'/img/avatar/Ash.jpg', desc:'' }
		],
        facilities : [
            { name : 'Jamiyah Senior Care Centre',                   distance: 5.0, location:'', icon:'/img/facilities/image10.jpg', desc:'private' },
            { name : 'Yong-En Care Centre',                distance: 5.0, location:'', icon:'/img/facilities/image9.jpg', desc:'' },
            { name : 'AgeWell Artsz',                    distance: 5.0, location:'', icon:'/img/facilities/image1.jpg', desc:'' },
            { name : 'Assist Care',                      distance: 5.0, location:'', icon:'/img/facilities/image2.jpg', desc:'' },
            { name : 'Handicaps Welfare Association (Whampoa)', distance: 5.0, location:'', icon:'/img/facilities/image3.jpg', desc:'' },
            { name : 'Lotus Eldercare Pte Ltd',             distance: 5.0, location:'', icon:'/img/facilities/image4.jpg', desc:'private' },
            { name : 'MW Medical Pte Ltd',                    distance: 5.0, location:'', icon:'/img/facilities/image5.jpg', desc:'' },
            { name : 'OmniMed Healthcare Holdings',          distance: 5.0, location:'', icon:'/img/facilities/image6.jpg', desc:'' },
            { name : 'Preciouz Kare Pte Ltd',              distance: 5.0, location:'', icon:'/img/facilities/image7.jpg', desc:'private' },
            { name : 'Econ Healthcare Group',       distance: 5.0, location:'', icon:'/img/facilities/image8.jpg', desc:'' },


        ],
		parks : [
			{ name : 'Dhoby Ghaut Green', 		distance: 5.0, location:'', icon:'/img/parks/park1.jpg', desc:'' },
			{ name : 'Gardens by the Bay', 		distance: 5.0, location:'', icon:'/img/parks/park2.jpg', desc:'' },
			{ name : 'Pearl\'s Hill City Park', distance: 5.0, location:'', icon:'/img/parks/park3.jpg', desc:'' },
			{ name : 'Tiong Bahru Park', 		distance: 5.0, location:'', icon:'/img/parks/park4.jpg', desc:'' },
			{ name : 'Clementi Woods Park ', 	distance: 5.0, location:'', icon:'/img/parks/park5.jpg', desc:'' },
			{ name : 'Jurong Central Park ', 	distance: 5.0, location:'', icon:'/img/parks/park6.jpg', desc:'' },
			{ name : 'Jurong Central Park ', 	distance: 5.0, location:'', icon:'/img/parks/park7.jpg', desc:'' },
			{ name : 'Toa Payoh Town Park', 	distance: 5.0, location:'', icon:'/img/parks/park8.jpg', desc:'' },
			{ name : 'Woodlands Town Garden', 	distance: 5.0, location:'', icon:'/img/parks/park9.jpg', desc:'' },
			{ name : 'Pasir Ris Park', 			distance: 5.0, location:'', icon:'/img/parks/park10.jpg', desc:'' }
		],
        hospitals : [
            { name : 'National Heart Centre',            distance: 5.0, location:'', icon:'/img/hospitals/images-1.jpg', desc:'' },
            { name : 'National Neuroscience Institute',     distance: 5.0, location:'', icon:'/img/hospitals/images-2.jpg', desc:'' },
            { name : 'Singapore National Eye Centre',      distance: 5.0, location:'', icon:'/img/hospitals/images-3.jpg', desc:'' },
            { name : 'Raffles Hospital',                distance: 5.0, location:'', icon:'/img/hospitals/images-4.jpg', desc:'' },
            { name : 'Ren Ci Hospital and Medicare Centre',  distance: 5.0, location:'', icon:'/img/hospitals/images-5.jpg', desc:'' },
            { name : 'National University Hospital',       distance: 5.0, location:'', icon:'/img/hospitals/images-6.jpg', desc:'' },
            { name : 'Tan Tock Seng Hospital',               distance: 5.0, location:'', icon:'/img/hospitals/images-7.jpg', desc:'' },
            { name : 'KK Women\'s and Children\'s Hospital', distance: 5.0, location:'', icon:'/img/hospitals/images-8.jpg', desc:'' },
            { name : 'Changi General Hospital',           distance: 5.0, location:'', icon:'/img/hospitals/images-9.jpg', desc:'' },
            { name : 'Saint Andrew\'s Community Hospital',      distance: 5.0, location:'', icon:'/img/hospitals/images-10.jpg', desc:'' }
        ]
	};

	$scope.show_template = '';
	$scope.show_sub = 'hidden';
	$scope.show_main = '';
	$scope.view_cmd = '';
	$scope.main = false;

	$scope.show = function(cmd){
		console.info(cmd);
		$scope.show_main = 'hidden';		
		$scope.show_sub = '';
		$scope.view_cmd = cmd;
		$scope.show_template = '/js/modules/care/' + cmd + '.html';		
		$scope.model = [];
	};

	$scope.onviewload = function(cmd){
		console.info('view loaded...', cmd);

		if(typeof mocks[cmd] === 'undefined' && $scope.view_cmd !== 'map'){
			return;
		}

		if($scope.view_cmd === 'map'){
			console.info('init maps...');
			initmap();
		}

		jQuery.each(mocks[cmd], function(idx, value){
			value.distance = Math.round10( ( Math.random() * 10 ) + value.distance, -1 );
		});

		mocks[cmd].sort(function(a, b){
			if(a.distance > b.distance){
				return 1;
			}

			if(a.distance > b.distance){
				return -1;
			}

			return 0;
		});

		$scope.model = mocks[cmd];
	};

	$scope.show_map = function(msp){
		$scope.show_main = 'hidden';		
		$scope.show_sub = '';
		$scope.view_cmd = 'map';
		$scope.show_template = '/js/modules/care/map.html';		
		$scope.model = 'parks';
	};

});