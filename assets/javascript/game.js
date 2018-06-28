 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCS9MkUV6siDtDlWb9XerVHDcLpnw9VbUg",
    authDomain: "my-first-firebase-ca1b2.firebaseapp.com",
    databaseURL: "https://my-first-firebase-ca1b2.firebaseio.com",
    projectId: "my-first-firebase-ca1b2",
    storageBucket: "my-first-firebase-ca1b2.appspot.com",
    messagingSenderId: "825126827774"
  };
  firebase.initializeApp(config);
//variable to reference the database
var database= firebase.database();

        


        var trainName = "";
        var destination = "";
        var trainTime = "";
        var frequency = "";
        //var nextArrival= "";
        //var minutesAway= "";



     


        $("#submit").on("click", function (event) {
            event.preventDefault();
            trainName= $("#train-name").val().trim();
            destination= $("#destination").val().trim();
            trainTime= $("#train-time").val().trim();
            frequency= $("#frequency").val().trim();

            var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
            //console.log(firstTimeConverted);
            //console.log(moment());
            
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            //console.log("DIFFERENCE IN TIME: " + diffTime);
            var tRemainder = diffTime % frequency;
            //console.log(tRemainder);
            var minutesAway = frequency - tRemainder;
    //console.log("MINUTES TILL TRAIN: " + minutesAway);
    
    var nextTrain = moment().add(minutesAway, "minutes");
    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nextArrival= moment(nextTrain).format("hh:mm");
    //console.log(nextArrival)



            database.ref().push({
                trainName: trainName,
                destination: destination,
                trainTime: trainTime,
                frequency: frequency,
                nextArrival: nextArrival,
                minutesAway: minutesAway

            });

            //$("#display").html(trainName)
            return false;

        });

              database.ref().on("child_added", function(childSnapshot) {
      
      
      
            $('tbody').append("<tr><td>" + childSnapshot.val().trainName + "</td>" + "<td>" + childSnapshot.val().destination + "</td>" + "<td>" + childSnapshot.val().frequency + "</td>" + "<td>" + childSnapshot.val().nextArrival + "</td>" + "<td>" + childSnapshot.val().minutesAway + "</td></tr>");
    
      // Handle the errors

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
        
