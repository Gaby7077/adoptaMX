
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
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref("/pets").on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var owner = childSnapshot.val().owener;
    var celular = childSnapshot.val().celular;
    var email = childSnapshot.val().email;
    var ciudad = childSnapshot.val().city;
    var fotoperro = childSnapshot.val().photo;
    var raza = childSnapshot.val().raza;
    var descripcion = childSnapshot.val().descripcion;
    var nombreperro=childSnapshot.val().namepet;
  
    // Employee Info
    console.log(owner);
    console.log(celular);
    console.log(email);
    console.log(ciudad);
    console.log(fotoperro);
    console.log(raza);
    console.log(descripcion);


    // $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
    // empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
 

    var i= '<div class="col s12 m6 l3"> <div style="height:300px; width:300px;"class="card medium"> <div class="card-image waves-effect waves-block waves-light"> <img style="heigth:300px, width:300px;"class="activator" src="'+fotoperro+'"> </div><div class="card-content"> <span class="card-title activator grey-text text-darken-4">'+nombreperro+ '<i class="material-icons right">more_vert</i> </span> </div> <div class="card-reveal"> <span class="card-title grey-text text-darken-4">'+nombreperro+'<i class="material-icons right">close</i> </span> <p> Dueño: '+owner+'</p><p> Celular: '+celular+'<a href="https://api.whatsapp.com/send?phone=52'+celular+'&text=hola,%20quisiera%20información%20del%20perrito,%20'+nombreperro+'%20que%20estás%20dando%20en%20adopcion?"> <img style="width:40px; height:40px;"border="0" alt="Enviar Whatsapp" src="assets/images/whatsapp.png" width="100" height="100"></a></p><p> Email: '+email+'</p><p> Raza: '+raza+'</p><p>'+descripcion+'</p> </div> </div> </div>'

    $("#fotos").append(i);



// <div class="row " id="fotos">
            // <div class="col s12 m6 l3">
            //     <div class="card">
            //         <div class="card-image waves-effect waves-block waves-light">
            //             <img class="activator" src="assets/images/otis.jpg">
            //         </div>
            //         <div class="card-content">
            //             <span class="card-title activator grey-text text-darken-4">Otis
            //                 <i class="material-icons right">more_vert</i>
            //             </span>

            //         </div>
            //         <div class="card-reveal">
            //             <span class="card-title grey-text text-darken-4">Tobias
            //                 <i class="material-icons right">close</i>
            //             </span>
            //             <p>Here is some more information about this product that is only revealed once clicked on.</p>
            //         </div>
            //     </div>
     


    
    // Prettify the employee start
    // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);
  
    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);
  
    // Add each train's data into the table
    // $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
    // empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case 
