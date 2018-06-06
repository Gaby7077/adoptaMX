var imageurl = "";
var useruid = "";

$(document).ready(function () {

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
    var uid;
    var db = firebase.database();
    initApp = function () {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                uid = user.uid;
               db.ref('/usuarios/').child(uid).once("value", function (snapshot) {
                if (snapshot.exists()) {
                    console.log("existepo");
                    console.log(snapshot);
                    var displayName = snapshot.val().displayName;
                    var email = snapshot.val().email;
                    var emailVerified = snapshot.val().emailVerified;
                    var photoURL = snapshot.val().photoURL;
                    var uid = snapshot.val().uid;
                    var phoneNumber = snapshot.val().phoneNumber;
                    var providerData = snapshot.val().providerData;
                    var calle = snapshot.val().address.calle;
                    var colonia = snapshot.val().address.colonia;
                    var cp = snapshot.val().address.cp;
                    var estado = snapshot.val().address.estado;
                    var municipio = snapshot.val().address.municipio;}
                $("#nombre").val(displayName);
                $("#celular").val(phoneNumber);
                $("#labelcelular").addClass("active");
                $("#nombre").addClass("validate valid");
                $("#labelnombre").addClass("active");
                $("#email").val(email);
                $("#email").addClass("validate valid");
                $("#labelemail").addClass("active");});

            } else {
                // User is signed out.
                console.log("-- User Signed Out --");
                window.location.href = 'login.html';
                //document.getElementById('sign-in-status').textContent = 'Signed out';
                //document.getElementById('sign-in').textContent = 'Sign in';
                //document.getElementById('account-details').textContent = 'null';
            }
        }, function (error) {
            console.log(error);
        });
    };

    window.addEventListener('load', function () {
        initApp()
    });


    // code to upload picture
    
        var fileUpload = document.getElementById("pet_image");
        fileUpload.addEventListener('change', function (evt) {
            console.log("subir imagen")
            var firstFile = evt.target.files[0] // upload the first file only
            var storageRef = firebase.storage().ref('photos/myPictureName ' + useruid + firstFile.name)
            var uploadTask = storageRef.put(firstFile)
            uploadTask.on("state_changed", function (snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(percentage)
                if (percentage == 100) {
                    console.log("ya estoy al 100")
                    storageRef.getDownloadURL().then(function (url) {
                        console.log("Esta es la imagen " + url);
                        imageurl = url;
                        $("#add-pet").removeClass("disabled");
                    })
                }

            })
        })
    

    // variables

    var nameuser = "";
    var celular = "";
    var email = "";
    var namepet = "";
    var raza = "";
    var edad = "";
    var algomas = "";
    var street = "";
    var number = "";
    var city = "";
    var postalcode = "";
    var state = "";
    var country = "";
    var latitude = "";
    var longitude = "";







    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    ////////////// DATABASE NEW PET FORM/////////////////////////
    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////


    $("#add-pet").on("click", function (event) {
        // prevent page from refreshing when form tries to submit itself
        event.preventDefault();

        console.log("Esta es la imagen dentro del click " + imageurl)




        nameuser = $("#nombre").val().trim();
        //var apellido = $("#apellido").val().trim();
        celular = $("#celular").val().trim();
        email = $("#email").val().trim();
        namepet = $("#nombremascota").val().trim();
        raza = $("#raza").val().trim();
        edad = $("#edad").val().trim();
        algomas = $("#algomas").val().trim();
        street = $("#route").val().trim();
        number = $("#street_number").val().trim();
        city = $("#locality").val().trim();
        postalcode = $("#postal_code").val().trim();
        state = $("#administrative_area_level_1").val().trim();
        country = $("#country").val().trim();
   


        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + street + number + "," + postalcode + city + state + "&key=AIzaSyD_vNu93PxnSwg-fnUBnWk_03HuqwqC7Cc"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            latitude = response.results[0].geometry.location.lat;
            longitude = response.results[0].geometry.location.lng;
            console.log("Latitud " + latitude + "   Longitud " + longitude);

            console.log("sigue database" + useruid);



            firebase.database().ref().child("pets").child(namepet + " " + nameuser).set({
                namepet: namepet,
                raza: raza,
                edad: edad,
                photo: imageurl,
                lat: latitude,
                lng: longitude,
                street: street,
                number: number,
                city: city,
                postalcode: postalcode,
                state: state,
                country: country,
                owener: nameuser,
                celular: celular,
                email: email,
                uid: useruid,
                descripcion: algomas,
            }); //del database
            window.location.href = 'map.html';

        }); //de AJAX



       

    }) //Del click




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
        { types: ['geocode'] });

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
        navigator.geolocation.getCurrentPosition(function (position) {
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

$("#postal_code").on("input", function (event) {
    event.preventDefault();
    var street = $("#route").val().trim();
    var number = $("#street_number").val().trim();
    var city = $("#locality").val().trim();
    var postalcode = $("#postal_code").val().trim();
    var state = $("#administrative_area_level_1").val().trim();
    var country = $("#country").val().trim();

    if (postalcode.length == 5) {
        console.log(street + number + postalcode + city + state + country);
        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + street + number + "," + postalcode + city + state + "&key=AIzaSyD_vNu93PxnSwg-fnUBnWk_03HuqwqC7Cc"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        });
    }



});

