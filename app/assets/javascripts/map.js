
function initialize() {
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

      // var infowindow = new google.maps.InfoWindow({
      //   map: map,
      //   position: pos,
      //   content: 'Location found using HTML5.'
      // });

      // var control = document.createElement('div'); 

      // google.maps.event.addDomListener(control, 'click', function() {...}); 
      // control.index = 1;   
      //   map.controls[google.maps.ControlPosition.TOP_RIGHT].push(control);  

      var start_marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Start',
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        draggable:true,
      });

      var end_marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Stop',
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        draggable:true,
      });

      var InfoWindowOptions = {
        content: 'Test!'
      };

//      var InfoWindow = new google.maps.InfoWindow(InfoWindowOptions);
//      google.maps.event.addListener(new_marker,'click',function(e){
//        infoWindow.open(map, marker);
//      });


//Grabbing all drivers positions

      $.get("/drivers.json").done(function(data){
       
       for(var i=0; i<data.length; i++){
          var driver = data[i];
     
          var current_pos = new google.maps.LatLng(driver.current_lat, driver.current_long);
          var driver_marker = new google.maps.Marker({
            position: current_pos,
            map: map,
            title: driver.name,
            icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
            draggable:false,
          }); 
        }
      });
      

      $.get("/passengers.json").done(function(data){
       
       for(var i=0; i<data.length; i++){
          var passenger = data[i];
     
          var current_pos = new google.maps.LatLng(passenger.current_lat, passenger.current_long);
          var driver_marker = new google.maps.Marker({
            position: current_pos,
            map: map,
            title: passenger.name,
            icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
            draggable:false,
          }); 
        }
      });


      google.maps.event.addListener(start_marker, 'click', function() { 
       alert("I am marker " + start_marker.title); 
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
          alert( ("Requesting Drivers"));
        });

        alert(JSON.stringify(data));
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

google.maps.event.addDomListener(window, 'load', initialize);



