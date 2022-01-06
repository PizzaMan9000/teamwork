var firebaseConfig = {
  apiKey: "AIzaSyCzlBjFMT4KtLmsRr3r8Q9a0I-L6Mpf0BQ",
  authDomain: "teamwork-bd9a7.firebaseapp.com",
  databaseURL: "https://teamwork-bd9a7-default-rtdb.firebaseio.com",
  projectId: "teamwork-bd9a7",
  storageBucket: "teamwork-bd9a7.appspot.com",
  messagingSenderId: "53158557502",
  appId: "1:53158557502:web:131aa36b2266e1c65f9e6f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("username");
password = localStorage.getItem("password");

document.getElementById("welcome").innerHTML = "Welcome " + username + "!";

function createRoom() {
  roomName = document.getElementById("room").value;

  localStorage.setItem("roomName", roomName);

  firebase.database().ref("/").child(roomName).update({
    purpose: "adding room"
  });

  document.getElementById("room").value = "";
  window.location = "chat.html";
}

function getData() {
  document.getElementById("theRooms").style.display = "block";

  firebase.database().ref("/").on('value', function(snapshot) {
    document.getElementById("theRooms").innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
          childKey  = childSnapshot.key;
          Room_names = childKey;

          console.log("roomname = " + Room_names);
          row = "<div class = 'room_name' id = '" + Room_names + "' onclick = 'redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
          document.getElementById("theRooms").innerHTML += row;
});

});
}

function redirectToRoomName(name) {
  console.log(name);

  localStorage.setItem("room_name", name);

  window.location = "chat.html";
}

