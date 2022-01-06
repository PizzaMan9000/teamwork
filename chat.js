var firebaseConfig = {
    apiKey: "AIzaSyCzlBjFMT4KtLmsRr3r8Q9a0I-L6Mpf0BQ",
    authDomain: "teamwork-bd9a7.firebaseapp.com",
    databaseURL: "https://teamwork-bd9a7-default-rtdb.firebaseio.com",
    projectId: "teamwork-bd9a7",
    storageBucket: "teamwork-bd9a7.appspot.com",
    messagingSenderId: "53158557502",
    appId: "1:53158557502:web:131aa36b2266e1c65f9e6f"
};

counter = 0;
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

room_name = localStorage.getItem("roomName");
document.getElementById("room_name").innerHTML = room_name;

username = localStorage.getItem("username");

function logout() {
    window.location = "login.html";

    localStorage.removeItem("room_name");
    localStorage.removeItem("username");
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;

    console.log(firebase_message_id);
    console.log(message_data);

    name = message_data["name"];
    message = message_data["message"];
    happyface = message_data["happyface"];

    name_tag = "<h4>" + name + ": </h4>";
    message_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
    button_tag = "<button class = 'btn btn-warning' value = " + happyface + "id = " + firebase_message_id + "onclick ='updateHappy(this.id) >";
    button_span = "😀" + happyface + "</button><hr>";
    
    row = name_tag + message_tag + button_tag + button_span;

    document.getElementById("output").innerHTML += row;
} });  }); }
getData();

function send() {
    msg = document.getElementById("msg").value;

    firebase.database().ref(room_name).push({
          name: username,
          message: msg,
          happyface: 0
    });

    document.getElementById("msg").value = "";
}

function updateLike(message_id) {
    console.log("Button has been clicked, button name-" + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updatedLikes = Number(likes) + 1;

    console.log(updatedLikes);
    firebase.database().ref(room_name).child(message_id).update({
          like: updatedLikes
    });
    document.getElementById(button_id).innerHTML = "😀" + updatedLikes;
}