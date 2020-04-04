function loadData(u, p) {
  const request = new XMLHttpRequest();

  request.open(
    "get",
    "https://script.google.com/macros/s/AKfycbzDyg8MWjtAk0RSe6udRXqZiei3TmaNtlMnSnMc5A_UFrCDHa4/exec"
  );

  request.onload = () => {
    try {
      const json = JSON.parse(request.responseText);
      populateData(json, u, p);
    } catch (error) {
      console.warn(error);
    }
  };

  request.send();
}

function populateData(json, userid, password) {
  var userWithPass = false;
  var userFound = false;
  var fullName = "";
  var id = "";
  var propic = '';

  for (var i = 0; i < json.user.length; i++) {
    if (json.user[i].id === userid) {
      if (json.user[i].pass === password) {
        userFound = true;
        userWithPass = true;
        fullName = json.user[i].name;
        id = json.user[i].id;
        propic = json.user[i].propic;
        break;
      } else {
        document.getElementById("loading").style.display = "none";
        document.querySelector(".warning-user").style.display = "block";
        document.querySelector(".war").textContent = "Incorrect Password";
      }
      userFound = true;
    }
  }

  if (userFound === false) {
    document.getElementById("loading").style.display = "none";
    document.querySelector(".warning-user").style.display = "block";
    document.querySelector(".war").textContent = "No User Found";
  } else {
    if (userWithPass === true) {
      document.getElementById("trans").classList.remove("transition-slide-in");
      document.getElementById("trans").classList.add("transition-slide-out");
      document.getElementById("login-body").classList.add("overflow");
      var isLogged = document.getElementById("keep").checked;
      localStorage.setItem("full-name", fullName);
      localStorage.setItem("id-name", id);
      localStorage.setItem("pro-pic",propic);
      localStorage.setItem("keep-log",isLogged);
      setTimeout(() => {
        window.document.location = "./next.html";
      }, 500);
    }
  }
}

const button = document.getElementById("btn");

button.addEventListener("click", () => {
  document.querySelector(".war").textContent = "";
  document.getElementById("loading").style.display = "block";
  var userid = document.getElementById("user-name");
  var password = document.getElementById("password");

  loadData(userid.value, password.value);

  //localStorage.setItem("uname", uname);
  //window.document.location = "./next.html";
});

document.getElementById("login-body").classList.add("overflow");
document.getElementById("trans").classList.add("transition-slide-in");

setTimeout(() => {
  document.getElementById("login-body").classList.remove("overflow");
}, 500);


var fname = localStorage.getItem("full-name");
var idname = localStorage.getItem("id-name");
var propic = localStorage.getItem("pro-pic");
var isLogged = localStorage.getItem("keep-log");


if(fname == null && idname == null && propic == null){

}else{

  if(isLogged=="true"){
    window.document.location = "./next.html";
  }

}
