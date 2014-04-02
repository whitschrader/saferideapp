$( window ).on('load', function() {

    $("body").on("click", ".cancelRide", function(){
      console.log("cancel ride?");
    });

    $("body").on("click", ".startRide", function(){
      console.log("start ride?");
    });

    $("body").on("click", ".completeRide", function(){
      console.log("complete ride?");
    });

  var currentState = 'passenger';
  var userLat;
  var userLong;

  function initRole(){
    $.ajax({
        type: 'get',
        url: '/init_role.json',
        data: { coordinates: { latitude: userLat, longitude: userLong } }
      }).done(function(data){
      console.log(data);
    });
  }

  var map;
  var markers = [];

  function initialize() {

    //set event listener on body to change when anything with an id of 'yes' is clicked
    $("body").on("click", ".yes", function(){
      //current user is driver, status will change to unavailable
      //current ride is confirmed is set to true

      $.ajax({
        type: 'get',
        url: '/confirm_ride.json',
        data: { id: this.id }
      }).done(function(data){
        console.log(data);
        console.log("Confirmed!");
      });

    });

    $("body").on("click", ".no", function(){
      $("div#driver-buttons").empty(); // empties div
    });

    $("body").on("click", ".cancelRide", function(){

      $.ajax({
        type: 'get',
        url: '/cancel_ride.json',
        data: { id: this.id }
      }).done(function(data){
        console.log(data);
        console.log("Canceled!");
      });

    });

    $("body").on("click", ".startRide", function(){
      $.ajax({
        type: 'get',
        url: '/start_ride.json',
        data: { id: this.id }
      }).done(function(data){
        console.log(data);
        console.log("Ride Started!");
      });

    });

    $("body").on("click", ".completeRide", function(){

      $.ajax({
        type: 'get',
        url: '/complete_ride.json',
        data: { id: this.id }
      }).done(function(data){
        console.log(data);
        console.log("Ride Completed!");
      });

    });






    var mapOptions = {
      // center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 14,
    };
    
    map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);



    // Try HTML5 geolocation
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        // define users lat and long and run initRole
        userLat = position.coords.latitude;
        userLong = position.coords.longitude;
        initRole();

        var start_marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Start',
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          draggable:true,
        });

        markers.push(start_marker);

        var end_marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Stop',
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          draggable:true,
        });

        markers.push(end_marker);


  //      var InfoWindow = new google.maps.InfoWindow(InfoWindowOptions);
  //      google.maps.event.addListener(new_marker,'click',function(e){
  //        infoWindow.open(map, marker);
  //      });


  //Grabbing all available drivers positions: this is 'passenger mode'

        var driver;
        var current_pos;
        var driver_marker;
        $.get("/drivers.json").done(function(data){
         
          for(var i=0; i<data.length; i++){
            driver = data[i];
            current_pos = new google.maps.LatLng(driver.current_lat, driver.current_long);
            driver_marker = new google.maps.Marker({
              position: current_pos,
              map: map,
              title: driver.name,
              icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
              draggable:false,
            }); 
            markers.push(driver_marker);
          }
        });



        google.maps.event.addListener(start_marker, 'click', function() { 
      
        }); 

        $("#getRide").click(function() {

          var data = {ride: {
            pickup_long: start_marker.position.A, 
            pickup_lat: start_marker.position.k,
            dropoff_long: end_marker.position.A, 
            dropoff_lat: end_marker.position.k
          }};
          $.ajax({
            type: "post",
            url: "/rides",
            data: data
          }).done(function( response ) {
            console.log(response);
          $("div#status-buttons").append("<button class='cancelRide btn btn-default' id='" + response.id + "'>Cancel Ride</button>");  
          });



          
        });


        //load toggler
        $("#toggleRole").click(function() {
          console.log("toggleRole called");
          toggler();
        });

        $("#switchRole").click(function() {
          clearMarkers();
          $.ajax({
            type: "get",
            url: "/switch_to_driver.json"
          });

          //load all available rides
          $.get("/avail_rides.json").done(function(data){

            console.log(data);

            for(var i=0; i<data.length; i++){
              var ride = data[i];
              var start_coords = new google.maps.LatLng(ride.pickup_lat, ride.pickup_long);
              var ride_marker = new google.maps.Marker({
                position: start_coords,
                map: map,
                title: ride.id.toString(),
                icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
                draggable:false,
              });

              google.maps.event.addListener(ride_marker, 'click', function() {
                console.log(this.title);                
              });


                  // push passengers into the array 'markers' so that we can clear these by calling clearMarkers()
              markers.push(ride_marker); 
            }

          });
        });

      map.setCenter(pos);
      
      }, 

      function() {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }

    console.log('end of initialize function');

  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
      map: map,
      position: new google.maps.LatLng(60, 105),
      content: content
    };

  }

  function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  //clears all the markes from the map
  function clearMarkers() {
    setAllMap(null);
    markers =[];
  }


  // google.maps.event.addDomListener(window, 'load', initialize);  already listening
  initialize();




  //toggles btwn driver and passenger modes

  function toggler(){
    if (currentState === 'passenger') {
      currentState = 'driver';
      enterDriverMode();

      
    } else { 
      currentState = 'passenger';
      enterPassengerMode();    
    }
  }



  function enterDriverMode(){
    clearMarkers();
    $.ajax({
      type: "get",
      url: "/switch_to_driver.json"
    });
    $.get("/avail_rides.json").done(function(data){

      console.log(data);

      for(var i=0; i<data.length; i++){
        var ride = data[i];
        var start_coords = new google.maps.LatLng(ride.pickup_lat, ride.pickup_long);
        var ride_marker = new google.maps.Marker({
          position: start_coords,
          map: map,
          title: ride.id.toString(),
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          draggable:false,
        });

        google.maps.event.addListener(ride_marker, 'click', function() {
          console.log(this.title);
          $("div#driver-buttons").append("<button class='yes' id='" + this.title + "'>Yes</button><button class='no'>No</button>");
          $("div#status-buttons").append("<button class='cancelRide btn btn-default' id='" + this.title + "'>Cancel Ride</button>");
          $("div#status-buttons").append("<button class='startRide btn btn-success' id='" + this.title + "'>Start Ride</button>");
          $("div#status-buttons").append("<button class='completeRide btn btn-premium' id='" + this.title + "'>Complete Ride</button>");
        });
      // push passengers into the array 'markers' so that we can clear these by calling clearMarkers()
        markers.push(ride_marker); 
      }
    }); 
  }

  function enterPassengerMode(){
    clearMarkers();

    var driver;
    var current_pos;
    var driver_marker;

    $.ajax({
      type: "get",
      url: "/switch_to_passenger.json"
    });
       
    $.get("/drivers.json").done(function(data){
     
      for(var i=0; i<data.length; i++){
        driver = data[i];
        current_pos = new google.maps.LatLng(driver.current_lat, driver.current_long);
        driver_marker = new google.maps.Marker({
          position: current_pos,
          map: map,
          title: driver.name,
          icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
          draggable:false,
        }); 
        markers.push(driver_marker);
      }
    });
  }

});

