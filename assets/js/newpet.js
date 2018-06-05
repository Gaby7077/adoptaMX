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
        var database = firebase.database();
                initApp = function() {
                  firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                     // User is signed in.
              var displayName = user.displayName;
              var email = user.email;
              var emailVerified = user.emailVerified;
              var photoURL = user.photoURL;
              var uid = "prueba" //user.uid;
              var phoneNumber = user.phoneNumber;
              var providerData = user.providerData;

              $("#nombre").val(displayName);
              $("#nombre").addClass("validate valid");
              $("#labelnombre").addClass("active");
              $("#email").val(email);
              $("#email").addClass("validate valid");
              $("#labelemail").addClass("active");

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
   // var apellido = $("#apellido").val().trim();
    var celular = $("#celular").val().trim();
    var email = $("#email").val().trim();
    var namepet = $("#nombremascota").val().trim();
    var raza = $("#raza").val().trim();
    var edad = $("#edad").val().trim();
    var algomas = $("#algomas").val().trim();
    var street = $("#route").val().trim();
    var number = $("#street_number").val().trim();
    var city = $("#locality").val().trim();
    var postalcode = $("#postal_code").val().trim();
    var state = $("#administrative_area_level_1").val().trim();
    var country = $("#country").val().trim();

    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+ street + number +","+ postalcode + city + state +"&key=AIzaSyD_vNu93PxnSwg-fnUBnWk_03HuqwqC7Cc"
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var latitude = response.results[0].geometry.location.lat;
        var longitude = response.results[0].geometry.location.lng;
        console.log("Latitud "+latitude+ "   Longitud "+longitude);


//////////////////
// CODIGO PARA SUBIR FOTO
var file = $("#pet_image").val();
var storageRef = firebase.storage().ref();
console.log(namepet + storageRef)

// Create the file metadata
var metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);

  });
});

firebase.database().ref().child("pets").child(namepet).set({
    namepet : namepet,
    raza : raza,
    edad : edad,
    photo : downloadURL,
    lat : latitude,
    lng : longitude,
    street : street,
    number : number,
    city : city,
    postalcode : postalcode,
    state : state,
    country : country,
    owener : nameuser,
    celular : celular,
    email : email
});




////////////////
    
      });



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

$("#postal_code").on("input", function(event) {
    event.preventDefault();
    var street = $("#route").val().trim();
    var number = $("#street_number").val().trim();
    var city = $("#locality").val().trim();
    var postalcode = $("#postal_code").val().trim();
    var state = $("#administrative_area_level_1").val().trim();
    var country = $("#country").val().trim();

    if (postalcode.length==5){
        console.log(street+number+postalcode+city+state+country);
        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+ street + number +","+ postalcode + city + state +"&key=AIzaSyD_vNu93PxnSwg-fnUBnWk_03HuqwqC7Cc"
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);
          });
    }



});

