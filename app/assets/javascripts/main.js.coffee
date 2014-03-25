
app = angular.module('MapTemplate', ['ui.map','ui.event'])

app.controller "MainCtrl", @MainCtrl = ['$scope', ($scope) ->

  #https://developers.google.com/maps/documentation/javascript/basics
  google.maps.visualRefresh = true

  $scope.mapOptions =
    zoom: 13
    center: new google.maps.LatLng(37.775, -122.418)
    disableDefaultUI: true
    mapTypeId: google.maps.MapTypeId.ROADMAP
    streetViewControl: true
    streetViewControlOptions:
      position: google.maps.ControlPosition.RIGHT_TOP
    zoomControl:true
    zoomControlOptions:
      position:  google.maps.ControlPosition.RIGHT_TOP
      style: google.maps.ZoomControlStyle.SMALL

  # Get ref to some services that you might use
  $scope.directionsService = new google.maps.DirectionsService()
  $scope.directionsDisplay = new google.maps.DirectionsRenderer()

  $scope.geo = navigator.geolocation

  $('#map_canvas').height $(window).height()

  $scope.onMapIdle = ->
    console.log 'Map loaded.'
    $scope.directionsDisplay.setMap($scope.map)
    $scope.dropMarkerAtCurrentPosition()

  $scope.dropMarkerAtCurrentPosition = ->
    $scope.geo.getCurrentPosition (position) ->
      $scope.setMarker position.coords.latitude, position.coords.longitude

  # plots  marker
  $scope.setMarker = (lat, lon) ->
    marker = new google.maps.Marker(
      map: $scope.map
      position: new google.maps.LatLng(lat, lon)
      animation: google.maps.Animation.NONE
      draggable: true
    )
]




