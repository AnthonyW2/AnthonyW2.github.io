//This code is made and owned by Anthony Wilson (awilsonprogramming@gmail.com) and is for public use by Berwick Secondary College Interactive School Map
function contributions(){
  alert("Designed and programmed by Anthony Wilson\nHosted on GitHub\nLibrary supplied by LeafletJS\nMap supplied and hosted by Mapbox");
}

var DeviceLongitude = 145.363500;
var DeviceLatitude = -38.031000;
function updatePosition(position) {
  DeviceLongitude = position.coords.longitude;
  DeviceLatitude = position.coords.latitude;
}
function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(updatePosition);
  }else{
    DeviceLongitude = 145.363500;
    DeviceLatitude = -38.031000;
    alert("Geolocation Failure. Please contact Anthony Wilson for help.\nIt is possible that you have location service turned off.");
  }
}
getLocation();

var CenterLongitude = 145.363500;
var CenterLatitude = -38.031000;

//https://anthony-wilson-programming.github.io/Pages/BSCMap/BasicLogo256.png
//http://{s}.somedomain.com/blabla/{z}/{x}/{y}.png

var SchoolMap = L.map('mapid').setView([CenterLatitude, CenterLongitude], 17);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //minZoom: 16,
  //maxZoom: 20,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiYW50aG9ueS13LXByb2dyYW1taW5nIiwiYSI6ImNqd2ZuaGY4YTE3amM0YW91ZHB1ZHZ5NGUifQ.hBTnWAx0ulkkWihsysRrCw'
}).addTo(SchoolMap);
//var imageUrl = 'https://anthony-wilson-programming.github.io/Pages/BSCMap/BasicLogo256.png'
var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg'
//var imageBounds = [[145.363500, -38.031000], [145.353500, -38.021000]];
var imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
var DeviceMarker = L.marker([DeviceLatitude, DeviceLongitude]).addTo(SchoolMap);
//var NewMarker = L.marker([40,712216, -74.22655]).addTo(SchoolMap);
var NewMarker = L.marker([40,712216,-74.22655]).addTo(SchoolMap);
//DeviceMarker.bindPopup("<b>You are here</b>").openPopup();
NewMarker.bindPopup("<b>You aren't here</b>").openPopup();
L.imageOverlay(imageUrl, imageBounds).addTo(SchoolMap);

function panMap(Lat, Lng){
  SchoolMap.panTo(new L.LatLng(Lat, Lng));
}
function zoomMap(newZoom){
  SchoolMap.setZoom(newZoom);
}

var frameCount = 0;
var doLoop = true;
var frameRate = 60;
var MSPT = 1000/frameRate;

function loop(){doLoop = true;}
function noLoop(){doLoop = false;}

function draw(){
  frameRate = 10;
  MSPT = 1000/frameRate;
  
  getLocation();
  var newLatLng = new L.LatLng(DeviceLatitude, DeviceLongitude);
  DeviceMarker.setLatLng(newLatLng);
  
  document.getElementById("LatLng").innerHTML = "Latitude: "+DeviceLatitude+", Longitude: "+DeviceLongitude;
  
  if(doLoop){
    frameCount += 1;
    setTimeout(draw,Math.ceil(MSPT));
  }
}

draw();
