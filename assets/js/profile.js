var config = {
    apiKey: "AIzaSyC8wpnAhlZtsN2XbywIK2QlWnq7JmM0pQY",
    authDomain: "muestradb.firebaseapp.com",
    databaseURL: "https://muestradb.firebaseio.com",
    projectId: "muestradb",
    storageBucket: "muestradb.appspot.com",
    messagingSenderId: "1071920552380"
};
firebase.initializeApp(config);

//USER UID PARA USARSE MAS ADELANTE
var uid;
var db = firebase.database();
console.log(db);

initApp = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            uid = user.uid;
            console.log(uid);
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
                    var municipio = snapshot.val().address.municipio;

                    $("#nombre").text("Nombre: " + displayName);
                    $("#correo").text("Correo: " + email);
                    $("#telefono").text("Telefono: "+phoneNumber);
                    $("#direccion").text("Dirección: "+calle+", "+ colonia+" ,"+ municipio+" ,"+ estado);


                    user.getIdToken().then(function (accessToken) {
                        console.log("-- User Signed In --");
                        console.log("Account Info");
                        console.log({
                            displayName: displayName,
                            email: email,
                            emailVerified: emailVerified,
                            phoneNumber: phoneNumber,
                            photoURL: photoURL,
                            uid: uid,
                            accessToken: accessToken,
                            providerData: providerData
                        });




                    });


                } else {

                    var displayName = user.displayName;
                    var email = user.email;
                    var emailVerified = user.emailVerified;
                    var photoURL = user.photoURL;
                    var uid = user.uid;
                    var phoneNumber = user.phoneNumber;
                    var providerData = user.providerData;

                    $("#nombre").text("Nombre: " + displayName);
                    $("#correo").text("Correo: " + email);
                    $("#direccion").text("Dirección: ");
                    $("#telefono").text("Telefono: ");


                    user.getIdToken().then(function (accessToken) {
                        console.log("-- User Signed In --");
                        console.log("Account Info");
                        console.log({
                            displayName: displayName,
                            email: email,
                            emailVerified: emailVerified,
                            phoneNumber: phoneNumber,
                            photoURL: photoURL,
                            uid: uid,
                            accessToken: accessToken,
                            providerData: providerData
                        });
                        firebase.database().ref().child("usuarios").child(uid).set({
                            displayName: displayName,
                            email: email,
                            emailVerified: emailVerified,
                            address:{
                                calle:" ",
                                colonia:" ",
                                municipio:" ",
                                estado:" ",
                                cp:" "
                            },
                            phoneNumber: " ",
                            photoURL: " ",
                            uid: uid,
                            accessToken: accessToken,
                            providerData: providerData

                        });

                        firebase.database().ref().child("pets").child(uid).set({
                            displayName: displayName,
                            email: email

                        });



                    });

                }

            });




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
    $(".logout").on("click",function(){
        firebase.auth().signOut()
        
        
  .then(function() {
    
    // Sign-out successful.
  })
  .catch(function(error) {
   
    // An error happened
  });

});


$(".editar").on("click",function(){
    window.location.href = 'editar.html';

});
});
