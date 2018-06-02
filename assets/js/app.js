

var map;
var marker = [];
var images = ["assets/images/perro1.jpg", "assets/images/perro2.jpg"]
var infowindow;


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: new google.maps.LatLng(25.68, -100.32),
        mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('address');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });

    //To add locations to the map
    var locations = [[25.64, -100.32], [25.63, -100.52]];
    for (var i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][0], locations[i][1]),
            map: map,
            title: "I am marker" + i

        });

        addInfowindow(i);

    }



}

function addInfowindow(i) {
    //To add the window
    var infoDiv=$("<div>"); //Main Div
    infoDiv.attr("class","row"); //Add a Row to the picture and content
    infoDiv.attr("id","infoStyle"); // Give style to the infowindow
    var imageDiv=$("<div>"); //Div for appending the image
    imageDiv.attr("class","col s3"); //Width of 4 col to the imageDiv
    var imagesource=$("<img>")
    imagesource.attr("src",images[i]);
    imagesource.attr("class","imagesize");
    contentDiv=$("<div>"); //Content Div to go inside infoDiv
    contentDiv.attr("class","col s6");
    contentDiv.text("Esto es una prueba");
    var spaceDiv=$("<div>");
    spaceDiv.attr("class","col s2")
    imageDiv.append(imagesource);
    infoDiv.append(imageDiv);
    infoDiv.append(spaceDiv);
    infoDiv.append(contentDiv);
        
    var contentString = infoDiv.prop("outerHTML");
    infowindow = new google.maps.InfoWindow()
    
    google.maps.event.addListener(marker,'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(map, this);
    });
}


initMap();

//var imagesource = " <img src= '" + images[i] + "' height='90px' width='90px'>";
//var divString = "<div>Esto es una prueba</div>"
//var contentString = divString.concat(imagesource);
//var contentString = divString.concat(imagesource);