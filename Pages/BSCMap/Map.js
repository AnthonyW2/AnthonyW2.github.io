      var DeviceLongitude = 145.363500;
      var DeviceLatitude = -38.031000;
      function updatePosition(position) {
        //x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
        DeviceLongitude = position.coords.longitude;
        DeviceLatitude = position.coords.latitude;
      }
      function getLocation(){
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(updatePosition);
        }else{
          //x.innerHTML = "Geolocation is not supported by this browser.";
          DeviceLongitude = 145.363500;
          DeviceLatitude = -38.031000;
          alert("Geolocation Failure. Please contact Anthony Wilson for help.\nIt is possible that you have location service turned off.");
        }
      }
      getLocation();
      
      var CenterLongitude = 145.363500;
      var CenterLatitude = -38.031000;
      
      var mymap = L.map('mapid').setView([CenterLatitude, CenterLongitude], 17);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiYW50aG9ueS13LXByb2dyYW1taW5nIiwiYSI6ImNqd2ZuaGY4YTE3amM0YW91ZHB1ZHZ5NGUifQ.hBTnWAx0ulkkWihsysRrCw'
      }).addTo(mymap);
      var marker = L.marker([DeviceLatitude, DeviceLongitude]).addTo(mymap);
      marker.bindPopup("<b>You are here</b><br>Longitude: "+DeviceLongitude+", Latitude: "+DeviceLatitude).openPopup();
      
      function panMap(Lat, Lng){
        mymap.panTo(new L.LatLng(Lat, Lng));
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
        marker.setLatLng(newLatLng);
        
        document.getElementById("LatLng").innerHTML = "Latitude: "+DeviceLatitude+", Longitude: "+DeviceLongitude;
        
        if(doLoop){
          frameCount += 1;
          setTimeout(draw,Math.ceil(MSPT));
        }
      }
      
      draw();
