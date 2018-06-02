$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC8wpnAhlZtsN2XbywIK2QlWnq7JmM0pQY",
        authDomain: "muestradb.firebaseapp.com",
        databaseURL: "https://muestradb.firebaseio.com",
        projectId: "muestradb",
        storageBucket: "muestradb.appspot.com",
        messagingSenderId: "1071920552380"
        };
        firebase.initializeApp(config);
                initApp = function() {
                  firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                    

                    } else {
                      // User is signed out.
                      console.log("-- User Signed Out --");
                      window.location.href='login.html';
                      //document.getElementById('sign-in-status').textContent = 'Signed out';
                      //document.getElementById('sign-in').textContent = 'Sign in';
                      //document.getElementById('account-details').textContent = 'null';
                    }
                  }, function(error) {
                    console.log(error);
                  });
                };

                window.addEventListener('load', function() {
                    initApp()
                  });









/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
////////////// DATABASE NEW PET FORM/////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


  $("#add-pet").on("click", function(event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    var nameuser = $("#nombre").val().trim();
    var apellido = $("#apellido").val().trim();
    var celular = $("#celular").val().trim();
    var email = $("#email").val().trim();
    var namepet = $("#nombremascota").val().trim();
    var raza = $("#raza").val().trim();
    var email = $("#edad").val().trim();
    var email = $("#algomas").val().trim();
    var street = $("#route").val().trim();
    var number = $("#street_number").val().trim();
    var colonia = $("#locality").val().trim();
    var postalcode = $("#postal_code").val().trim();
    var city = $("#administrative_area_level_1").val().trim();
    var country = $("#country").val().trim();

    console.log(name);
  }) 




})

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
////////////// GOOGLE API ADDRESS FORM //////////////////////
//////////////// NEW PET FORM ///////////////////////////////
/////////////////////////////////////////////////////////////
// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
    }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
    });
    }
}



