function login() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    window.location = "homepage.html";
}

