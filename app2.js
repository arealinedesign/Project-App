var fullName = localStorage.getItem("full-name");
var userId = localStorage.getItem("id-name");
var projectList = [];

function load() {
  if (fullName == null || userId == null) {
    document.getElementById("app").style.display = "none";
    document.getElementById("warning").style.display = "block";
  } else {
    document.getElementById("full-name-tag").textContent =
      "Welcome back, " + fullName;
    document.getElementById("user-id-tag").textContent = "(" + userId + ")";
    document.getElementById("warning").style.display = "none";
    window.document.title = userId;
  }

  document.getElementById("next-body").classList.add("overflow");
  document.getElementById("trans").classList.add("transition-slide-in");

  setTimeout(() => {
    document.getElementById("next-body").classList.remove("overflow");
  }, 500);
}

function loadData(response) {
  const request = new XMLHttpRequest();
  var showInfo;

  if (response == "projects") {
    showInfo = response;
    request.open(
      "get",
      "https://script.google.com/macros/s/AKfycbw7feQxDUk22Roq8SxppiN8UOq16Lg0ylUd0x3ZNa4fkqwy6eVP/exec?v=" +
        showInfo
    );
  } else if (response == "profile") {
    showInfo = userId;
    request.open(
      "get",
      "https://script.google.com/macros/s/AKfycbw7feQxDUk22Roq8SxppiN8UOq16Lg0ylUd0x3ZNa4fkqwy6eVP/exec?v=" +
        showInfo
    );
  }

  request.onload = () => {
    try {
      const json = JSON.parse(request.responseText);
      populateData(json, response);
    } catch (error) {}
  };

  request.send();
}

function populateData(json, response) {
  if (response == "projects") {
    buildArray(json.proinfo);
  } else if (response == "profile") {
    showUserProfile(json.info);
  }
}

function buildArray(data) {
  if (projectList.length == 0) {
    projectList = data;
  }

  var table = document.getElementById("project-table-body");
  document.querySelector(".project-table").style.display = "block";
  document.getElementById("loading").style.display = "none";
  document.querySelector(".loading-div").style.display = "none";
  table.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    var row = `<tr data-id=${data[i].proid}>
                        <td>${i + 1}</td>
                        <td>${data[i].companyname}</td>
                        <td>${data[i].startingdate}</td>
                        <td>${data[i].projectname}</td>
                        <td>${data[i].contname}</td>
                        <td>${data[i].eastimatedamt}/=</td>
                        <td>${data[i].workordr}/=</td>
                   </tr>`;
    table.innerHTML += row;
  }
  var trs = document.querySelectorAll("tr[data-id]");
  console.log(trs);
  trs.forEach(row => {
    row.addEventListener("click", () => {
      localStorage.setItem("project-id", row.dataset.id);
      window.document.location = "./openproject.html";
    });
  });
  console.log("Table loaded succesfully");
}

function searchTable(value, data) {
  var filterData = [];

  for (var i = 0; i < data.length; i++) {
    value = value.toLowerCase();

    var name = data[i].projectname.toLowerCase();

    if (name.includes(value)) {
      filterData.push(data[i]);
    }
  }

  return filterData;
}

const showProjects = document.getElementById("show-projects");
const showProfile = document.getElementById("show-profile");
const logout = document.getElementById("logout");
const home = document.getElementById("home");
const newProject = document.getElementById("new-project");

const searchForProject = document.getElementById("project-search-input");

searchForProject.addEventListener("keyup", () => {
  var value = searchForProject.value;
  var data = searchTable(value, projectList);
  buildArray(data);
});

function showUserProfile(data) {
  document.querySelector(".profile").style.display = "flex";
  var profile = document.getElementById("profile-show");
  document.getElementById("loading").style.display = "none";
  document.querySelector(".loading-div").style.display = "none";
  profile.innerHTML = "";
  var informationDiv = `<h2>Full Name: ${data[0].name}</h2>
                       <h2>ID Name: ${data[0].id}</h2>
                       <h2>Birthday: ${data[0].bday}</h2>
                       <h2>Post: ${data[0].post}</h2>`;

  profile.innerHTML = informationDiv;
}

function loadNewProjectQueryIframe() {
  document
    .getElementById("newproject-iframe")
    .classList.add("transition-fade-in");
  document.getElementById("newproject-iframe").style.display = "block";
}

showProjects.addEventListener("click", () => {
  document.getElementById("newproject-iframe").style.display = "none";
  document.getElementById("loading").style.display = "block";
  document.querySelector(".loading-div").style.display = "block";
  document.querySelector(".project-table").style.display = "none";
  document.querySelector(".profile").style.display = "none";
  loadData("projects");
});

showProfile.addEventListener("click", () => {
  document.getElementById("newproject-iframe").style.display = "none";
  document.getElementById("loading").style.display = "block";
  document.querySelector(".loading-div").style.display = "block";
  document.querySelector(".project-table").style.display = "none";
  document.querySelector(".profile").style.display = "none";
  loadData("profile");
});

logout.addEventListener("click", () => {
  document.getElementById("next-body").classList.add("overflow");
  document.getElementById("trans").classList.remove("transition-slide-in");
  document.getElementById("trans").classList.add("transition-slide-out");
  setTimeout(() => {
    localStorage.clear();
    window.document.location = "./index.html";
  }, 500);
});

home.addEventListener("click", () => {
  document.getElementById("newproject-iframe").style.display = "none";
  document.getElementById("loading").style.display = "none";
  document.querySelector(".loading-div").style.display = "none";
  document.querySelector(".project-table").style.display = "none";
  document.querySelector(".profile").style.display = "none";
});

newProject.addEventListener("click", () => {
  document.getElementById("loading").style.display = "none";
  document.querySelector(".loading-div").style.display = "none";
  document.querySelector(".project-table").style.display = "none";
  document.querySelector(".profile").style.display = "none";
  projectList = [];
  loadNewProjectQueryIframe();
});

load();
