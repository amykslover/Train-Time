
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC9CKyfiwZyZXVeQgQ-GoTufzljJuDYQjA",
    authDomain: "codingbootcamp-6a8d8.firebaseapp.com",
    databaseURL: "https://codingbootcamp-6a8d8.firebaseio.com",
    projectId: "codingbootcamp-6a8d8",
    storageBucket: "codingbootcamp-6a8d8.appspot.com",
    messagingSenderId: "601031791714"
  };

  firebase.initializeApp(config);

	// Create a variable to reference the database.
	var database = firebase.database();


  
  // Initial Values
  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";
  var persistData = true;

//--------------------------------------//
//Form validation rules


$("#submit").on("click", function() {
    // Prevent the page from refreshing
    event.preventDefault();
      
    trainName = $("#trainname").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firsttrain").val().trim();
    frequency = $("#frequency").val().trim();


        //Add new data to firebase database
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

      //Set the input fields back to their 'blank' state so a user can enter new information
      $("#trainname").val('');
      $("#destination").val('');
      $("#firsttrain").val('');
      $("#frequency").val('');

    //Get inputs from the UI form and assign them to variables
});
//---------------------RETRIEVE DATA FROM FIREBASE---------------------------------------------

database.ref().once('value').then(function(snapshot){
  var snapArray = Object.values(snapshot.val());
  console.log(snapArray);
  appender(snapArray)
});


function appender(snap){
  for (var i = 0; i < snap.length; i++) {
      var tableRow = $('<tr>');
    
      var momentArray = momentTime(snap[i].firstTrain,snap[i].frequency);
      console.log(momentArray);

      var tableData1 = $('<td>').text(snap[i].trainName);
      var tableData2 = $('<td>').text(snap[i].destination);
      var tableData3 = $('<td class="textCenter">').text(snap[i].frequency);
      var tableData4 = $('<td>').text(momentArray[0]);
      var tableData5 = $('<td class="textCenter">').text(momentArray[1])


      console.log("Snap! :", snap[i])

      tableRow.append(tableData1);
      tableRow.append(tableData2);
      tableRow.append(tableData3);
      tableRow.append(tableData4);
      tableRow.append(tableData5);

      $('#train-schedule').append(tableRow);
    }

};


function momentTime(firstT,tFreq) {
    // Time is 3:30 AM
    var firstTime = firstT;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFreq;
    // console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFreq - tRemainder;
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    return [nextTrain, tMinutesTillTrain];

};
      
      // Handle the errors
    // }, 

    // function(errorObject) {
    // console.log("Errors handled: " + errorObject.code);





  // // -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
  // // connectionsRef references a specific location in our database.
  // // All of our connections will be stored in this directory.
  // var connectionsRef = database.ref("/connections");

  // // '.info/connected' is a special location provided by Firebase that is updated every time
  // // the client's connection state changes.
  // // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
  // var connectedRef = database.ref(".info/connected");

