//use this to initializa firebase
firebase.initializeApp(config);

//this line is used to check if user is authenticated
firebase.auth().onAuthStateChanged(function(user){
  if (user){
    //grabbing user ID
    const userUid = user.uid;
    //creating reference to database based off user's ID
    const databaseRef = firebase.database().ref().child("posts/"+userUid).limitToLast(5);

    var postList = document.getElementById("post");
    var content="";

    //grabbing data from database in a form of a snapshot
    databaseRef.once('value', function(snapshot){
      console.log(snapshot);
      snapshot.forEach(function(childSnapshot){
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val().title;
        var childDataContent = childSnapshot.val().body;

        content = content + "<li>Timestamp: "+childKey+"<ul><li>Title: "+childData+"</li><li>Body: "+childDataContent+"</ul></li>";

      });

      postList.innerHTML = content;
    });
  }else{
    //redirect if user is not logon.
    window.location.replace("/exploration2");
  }
});
