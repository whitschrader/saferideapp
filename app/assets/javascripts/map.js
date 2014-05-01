
function hideDiv(idString) {
  document.getElementById(idString).style.display = "none";
}

function showDiv(idString) {
  document.getElementById(idString).style.display = "inline-block";
}

$( window ).on('load', function() {

  var buttonWidth = window.innerWidth * 0.92;
  $('.buttons').css({'left': window.innerWidth * 0.04, 'bottom': window.innerWidth * 0.04, 'width': buttonWidth + 5});
  $('#getRide').css({'width': buttonWidth});


  var currentState = 'passenger';
  var userLat;
  var userLong;
  var allowMarkerClick = true;

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

        showDiv("start_ride_div");
        showDiv("cancel_div");
        hideDiv("confirmation_div");
        hideDiv("switch_role_div");
      });

    });

    $("body").on("click", ".no", function(){
      allowMarkerClick = true;
      showDiv("switch_role_div");
      hideDiv("confirmation_div");
    });

    $("body").on("click", ".cancelRide", function(){
      allowMarkerClick = true;
      showDiv("switch_role_div");
      hideDiv("start_ride_div");
      hideDiv("cancel_div");
      if (currentState === "passenger") showDiv("get_ride_div");

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

        showDiv("complete_ride_div");
        hideDiv("cancel_div");
        hideDiv("start_ride_div");
      });

    });

    $("body").on("click", ".completeRide", function(){
      allowMarkerClick = true;
      $.ajax({
        type: 'get',
        url: '/complete_ride.json',
        data: { id: this.id }
      }).done(function(data){
        console.log(data);
        console.log("Ride Completed!");
        hideDiv("confirmation_div");
        showDiv("switch_role_div");
        hideDiv("complete_ride_div");
      });

    });

    var mapOptions = {
      // center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 14,
      panControl: false,
      zoomControl: false,
      mapTypeControl: false
    };
    
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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
          icon: 'http://i.imgur.com/Xsok9VP.png', // green start
          draggable:true,
        });

        markers.push(start_marker);

        var end_marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Stop',
          icon: 'http://i.imgur.com/b44NfKk.png', // red end
          draggable:true,
        });

        markers.push(end_marker);

        // Grab all available drivers positions from passenger mode

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
              icon: 'http://i.imgur.com/QEZXgNM.png', // driver black-white
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
            hideDiv("switch_role_div");
            hideDiv("get_ride_div");
            showDiv("cancel_div");
            $("div#cancel_div").empty();
            $("div#cancel_div").append("<button class='cancelRide btn btn-default' id='" + response.id + "'>Cancel Ride</button>");
            $('.cancelRide').css({'width': buttonWidth});
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
                icon: 'http://i.imgur.com/QEZXgNM.png', // driver black-white
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
      hideDiv("get_ride_div");
      currentState = 'driver';
      enterDriverMode();

      
    } else { 
      showDiv("get_ride_div");
      currentState = 'passenger';
      enterPassengerMode();    
    }
  }



  function enterDriverMode(){
    clearMarkers();
    allowMarkerClick = true;
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
          icon: 'http://i.imgur.com/Qnsckzm.png', // ride black-green
          draggable:false,
        });

        // creating logic that prevents user (as driver) from selecting multiple rides

        google.maps.event.addListener(ride_marker, 'click', function() {
          if (allowMarkerClick === true){
            allowMarkerClick = false;

            // empty the divs first as to ensure that there is only one button in the div at a time
            
            $("div#confirmation_div").empty();
            $("div#cancel_div").empty();
            $("div#start_ride_div").empty();
            $("div#complete_ride_div").empty();

            // append buttons for the latest marker that was clicked

            $("div#confirmation_div").append("<button class='yes btn btn-success' id='" + this.title + "'>Confirm</button><button class='no btn btn-danger'>Back</button>");
            $("div#cancel_div").append("<button class='cancelRide btn btn-default' id='" + this.title + "'>Cancel Ride</button>");
            $("div#start_ride_div").append("<button class='startRide btn btn-success' id='" + this.title + "'>Start Ride</button>");
            $("div#complete_ride_div").append("<button class='completeRide btn btn-danger' id='" + this.title + "'>Complete Ride</button>");

            $('.yes').css({'width': buttonWidth / 2});
            $('.no').css({'width': buttonWidth / 2});
            $('.cancelRide').css({'width': buttonWidth / 2, 'border-top-right-radius': 0, 'border-bottom-right-radius': 0});
            $('.startRide').css({'width': buttonWidth / 2});
            $('.completeRide').css({'width': buttonWidth});

            hideDiv("switch_role_div");
            hideDiv("start_ride_div");
            hideDiv("complete_ride_div");
            hideDiv("cancel_div");
            showDiv("confirmation_div");
          }
          console.log(this.title);
          
        });
        // push passengers into the array 'markers' so that we can clear these by calling clearMarkers()
        markers.push(ride_marker); 
      }
    }); 
  }

  function enterPassengerMode(){
    clearMarkers();
    
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
          icon: 'http://i.imgur.com/Xsok9VP.png', // green start
          draggable:true,
        });

        markers.push(start_marker);

        var end_marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Stop',
          icon: 'http://i.imgur.com/b44NfKk.png', // red end
          draggable:true,
        });

        markers.push(end_marker);

      });
    }

    var driver;
    var driver_current_pos;
    var driver_marker;

    $.ajax({
      type: "get",
      url: "/switch_to_passenger.json"
    });
       
    $.get("/drivers.json").done(function(data){
     
      for(var i=0; i<data.length; i++){
        driver = data[i];
        driver_current_pos = new google.maps.LatLng(driver.current_lat, driver.current_long);
        driver_marker = new google.maps.Marker({
          position: driver_current_pos,
          map: map,
          title: driver.name,
          icon: 'http://i.imgur.com/QEZXgNM.png', // driver black-white
          draggable:false,
        }); 
        markers.push(driver_marker);
      }
    });
  }

});

