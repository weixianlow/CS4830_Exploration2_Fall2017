firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user){
  if (user){
    const userUid = user.uid;

    const databaseRef = firebase.database().ref().child("posts/"+userUid);

    var titleField = document.getElementById("Title");
    var bodyField = document.getElementById("Body");

    var uploadBtn = document.getElementById("uploadBtn");

    uploadBtn.addEventListener("click", function(){
      var d = new Date();
      var date = d.getFullYear().toString()+d.getMonth().toString()+d.getDate().toString()+"-"+d.getHours()+":"+d.getMinutes();
      var titleFieldContent = document.getElementById("title").value;
      var bodyFieldContent = document.getElementById("Body").value;

      const databaseUpload = databaseRef.child(date);

      databaseUpload.update({
        title: titleFieldContent,
        body: bodyFieldContent
      });



      console.log("Uploaded to server");

      databaseRef.on("value", function(snap){
        alert("Your post has been uploaded.");
        window.location.replace("/exploration2/home.html");
      });


    });


  }else{
    window.location.replace("/exploration2");
  }
});
