//Botones Menu//


//boton izquierda inicializador
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
        direction: 'left'
    });
});

//tooltip
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, options);
});



//Funcionalidad del Mapa
// Program variables
var map;
var marker = [];
var infowindow;
var currentLat;
var currentLng;


var config = {
    apiKey: "AIzaSyC8wpnAhlZtsN2XbywIK2QlWnq7JmM0pQY",
    authDomain: "muestradb.firebaseapp.com",
    databaseURL: "https://muestradb.firebaseio.com",
    projectId: "muestradb",
    storageBucket: "muestradb.appspot.com",
    messagingSenderId: "1071920552380"
};
firebase.initializeApp(config);

var dataRef = firebase.database();



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    currentLat = position.coords.latitude;
    currentLng = position.coords.longitude;

    initMap();

}

getLocation();


function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: new google.maps.LatLng(currentLat, currentLng),
        mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('address');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(input);

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

    //To add locations to the map from the databse in Firebase
    dataRef.ref("/pets").on("child_added", function (childSnapshot) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(childSnapshot.val().lat, childSnapshot.val().lng),
            map: map,
            animation: google.maps.Animation.DROP,
            title: "Tu nuevo amigo"

        });

        // Gather the variable from the firebase databse
        var petName = childSnapshot.val().namepet;
        var petRaza = childSnapshot.val().raza;
        var petAge = childSnapshot.val().edad;
        var petImage = childSnapshot.val().photo;
        var email = childSnapshot.val().email;
        var petOwner = childSnapshot.val().owener;

        // Send the info the infowindow

        addInfowindow(petName, petRaza, petAge, petImage, email,petOwner);


    })

    //para obtener la direccion
    var options = {
        componentRestrictions: { country: 'mx' }
    };
    var entrada = document.getElementById("direccion");
    var automatico = new google.maps.places.Autocomplete(entrada, options);


}

function addInfowindow(petName, petRaza, petAge, petImage, email,petOwner) {
    //To add the window
    var containerDiv = $("<div>") // Main Div
    containerDiv.attr("id", "iw-container");
    var infoDiv = $("<div>"); //Body Div
    var titleDiv = $("<div>");

    titleDiv.text(petName);




    containerDiv.append(titleDiv);
    containerDiv.append(infoDiv);

    titleDiv.attr("class", "row iw-title center-align");
    infoDiv.attr("class", "row valign-wrapper center-align"); //Add a Row to the picture and content
    infoDiv.attr("id", "infoStyle"); // Give style to the infowindow
    var imageDiv = $("<div>"); //Div for appending the image
    imageDiv.attr("class", "col s3"); //Width of 4 col to the imageDiv
    var imagesource = $("<img>")
    imagesource.attr("src", petImage);
    imagesource.attr("class", "imagesize");
    contentDiv = $("<div>"); //Content Div to go inside infoDiv
    contentDiv.attr("class", "col s6");
    var firstRowcontent = $("<div>");
    var secondRowcontent = $("<div>");
    var thirdRowcontent = $("<div>");
    var fourthRowcontent = $("<a>");
    fourthRowcontent.attr("class", "waves-effect waves-light btn light-blue lighten-1");
    var emailSign = $("<i>");
    emailSign.addClass("material-icons center");
    emailSign.text("email");
    fourthRowcontent.attr("petname", petName);
    fourthRowcontent.attr("ownerEmail", email);
    fourthRowcontent.attr("ownerName",petOwner)
    fourthRowcontent.append(emailSign);
    fourthRowcontent.attr("id", "email-button");
    var buttonEmail = $("")
    firstRowcontent.text("Mis datos son: ")
    secondRowcontent.text("Edad: " + petAge);
    thirdRowcontent.text("Raza: " + petRaza)
    contentDiv.append(firstRowcontent);
    contentDiv.append(secondRowcontent);
    contentDiv.append(thirdRowcontent);
    contentDiv.append(fourthRowcontent);
    var spaceDiv = $("<div>");
    spaceDiv.attr("class", "col s3")
    imageDiv.append(imagesource);
    infoDiv.append(imageDiv);
    infoDiv.append(spaceDiv);
    infoDiv.append(contentDiv);



    var contentString = containerDiv.prop("outerHTML");
    infowindow = new google.maps.InfoWindow()

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(contentString);
        infowindow.open(map, this);
    });
}





// Send email asking for info

$('#element').click(function () {
    $(location).attr('href', 'mailto:?subject='
        + encodeURIComponent("This is my subject")
        + "&body="
        + encodeURIComponent("This is my body")
    );
});


$(document).on("click", "#email-button", function () {
    console.log($(this).attr("petname"));
    var newPetname = $(this).attr("petname");
    var ownerEmail = $(this).attr("ownerEmail");
    var owner=$(this).attr("ownerName");
    console.log($(this).attr("ownerEmail"));
    $(location).attr('href', 'mailto:' + ownerEmail + '?subject='
        + encodeURIComponent("Quisiera adoptar tu perro")
        + "&body="
        + encodeURIComponent("Hola " + owner + " estoy interesado en " + newPetname + " me puedes mandar mas informacion.")
    );


})