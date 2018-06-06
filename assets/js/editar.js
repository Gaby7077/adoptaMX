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




                    $("#nombre").text(displayName);
                    $("#correo").text(email);
                    $("#calle").text(calle);
                    $("#colonia").text(colonia);
                    $("#municipio").text(municipio);
                    $("#estado").text(estado);
                    $("#telefono").text(phoneNumber);
                    $("#cp").text(cp);


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
                    $(".guardar").on("click", function () {
                        var nuevonombre = $("#nombre").val();
                        var nuevocorreo = $("#correo").val();
                        var nuevacalle = $("#calle").val();
                        var nuevacolonia = $("#colonia").val();
                        var nuevomunicipio = $("#municipio").val();
                        var nuevoestado = $("#estado").val();
                        var nuevotelefono = $("#telefono").val();
                        var nuevocp = $("#cp").val();

                        console.log(nuevonombre);

                        firebase.database().ref().child("usuarios").child(uid).update({
                            displayName: nuevonombre,
                            email: nuevocorreo,
                            address: {
                                calle: nuevacalle,
                                colonia: nuevacolonia,
                                municipio: nuevomunicipio,
                                estado: nuevoestado,
                                cp: nuevocp
                            },
                            phoneNumber: nuevotelefono,
                            photoURL: " "

                        });
                        window.location.href = 'profile.html';

                    });

                    $(".subefoto").on("change", function (e) {

                        var ref = firebase.storage().ref();
                        var file = $('.subefoto').get(0).files[0];
                        var name=uid;
                        var task = ref.child("/usarios/"+name).put(file);
                        //var url= ref.child("/usarios/"+name).downloadURL;


                    });




                } else {

                    window.location.href = 'login.html';

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
    $(".logout").on("click", function () {
        firebase.auth().signOut()

    });
});
