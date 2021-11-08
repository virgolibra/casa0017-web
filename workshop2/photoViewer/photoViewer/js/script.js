var map;
var markerArray = [];
var dataArray = [];
var infowindow = new google.maps.InfoWindow({maxWidth: 300});

$(document).ready(function() {

    function initialize() {
        
        // Task 3.4 - Make the map look pretty
        // var mapOptions = {
        // 	center: new google.maps.LatLng(51.514756, -0.104345),
        // 	zoom: 14			
        // };

        
        var mapOptions = {
            center: {lat: 51.514756, lng: -0.104345},
            zoom: 14,
            maxZoom:18,
            styles: darkMap

        };
        
        // Task 3.2 - Write the map into our DIV element
        map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        getData(map.getCenter().lat(), map.getCenter().lng());
        google.maps.event.addListener(map, 'dragend', function() {
            var bounds = map.getBounds();
            console.log("SW: " + bounds.getSouthWest() + " NE: " + bounds.getNorthEast());
            console.log("Center: " + map.getCenter().lat() + ", " +  map.getCenter().lng());
            getData(map.getCenter().lat(), map.getCenter().lng());
        });
    }

    function getData(lat, lng){
        var lat = lat.toFixed(2); 
        var lng = lng.toFixed(3);

        console.log("Getting Data: " + lat + ", " + lng );

        setAllMap(null);
        markerArray = [];

        // Task 4.1 - Edit this variable so that it points to our API Look at http://dev.spatialdatacapture.org:8870 for the values you need
        var radius = 100;
        var url = "http://dev.spatialdatacapture.org:8870/data" + "/" + lat + "/" + lng + "/" + radius;
        
        console.log(url);
        
        
        
        $.getJSON( url , function( data ) {
            
            // Task 4.2 -- Add a loop  Make sure you end it as well.  -- Don't uncomment this line
                

               $.each(data, function(k,v){
    // k will represent the key of the array [0,1,2,3], and v the value
                console.log(v);
                var latLng = new google.maps.LatLng(v.lat, v.lon);
                        
                        dataArray.push(latLng);
                        
                        var marker = new google.maps.Marker({
                              position: latLng, 
                              customInfo: v.pid,		
                            icon: "./img/icon.png" 		
                          });

                        google.maps.event.addListener(marker, 'click', function(content) {
                            return function(){
                                infowindow.setContent("");
                                
                                map.setCenter(new google.maps.LatLng(v.coords.y, v.coords.x));
                                $.getJSON("http://dev.spatialdatacapture.org:8870/data/photoDescription/"+this.customInfo, function( data ) {
                                    var dateTaken = new XDate((data[0].date_uploaded * 1000)).toString("MMM d, yyyy HH:mm:ss");
                                    var content = "<b>Photo ID: </b>"+v.pid+"<br/> <br/><b>Description:</b><br/> "+data[0].description.replaceAll("+", " ")+" <br/> <br/><b>Date Taken: </b> "+dateTaken+" <br/><b>Camera: </b> "+data[0].device.replaceAll("+", " ")+"<br/><b>Location:</b> "+ v.coords.y + ", " + v.coords.x +" <br/><br/> <b>Photo</b> <br/><br/> <img src='"+data[0].download_url+"' width='300px' alt='Description'>";
                                    infowindow.setContent(content);
                                });
                
                                infowindow.open(map,this);
                            }
                        }(""));

                        markerArray.push(marker);

                });
            
                    
            // -----------------------------------


            // Task 4.3 -- Write the number of rows returned into a element.
            var photoSelected = data.length;
            $("#photoNum").html(photoSelected);
              
              setAllMap(map);
        });
    }

    // Task 3.1 - Start the map using a function
    google.maps.event.addDomListener(window, 'load', initialize());

    // Task 6 --  Make the markers display on map load.

});

//  ******************* FUNCTIONS TO USE FOR THE MAP YOU DON"T NEED TO EDIT ANYTHING BELOW THIS LINE **************************************************

function createMarkers(){
    var marker = new google.maps.Marker({
          position: latLng 				
      });
}

function setAllMap(map) {
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(map);
    }
}

function clearMarkers() {
    setAllMarkers(null);
}

String.prototype.replaceAll = function(str1, str2, ignore) {
    return decodeURIComponent( this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2) );
} 
