firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user){
  if (user){
    const userUid = user.uid;
    const databaseRef = firebase.database().ref().child("posts/"+userUid).limitToLast(5);

    var postList = document.getElementById("post");
    var content="";

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
    window.location.replace("/exploration2");
  }
});
