var projectId = localStorage.getItem("project-id");
console.log(projectId);

function loadData() {
  const request = new XMLHttpRequest();

  request.open(
    "get",
    "https://script.google.com/macros/s/AKfycbw7feQxDUk22Roq8SxppiN8UOq16Lg0ylUd0x3ZNa4fkqwy6eVP/exec?v=" +
      projectId
  );

  request.onload = () => {
    try {
      const json = JSON.parse(request.responseText);
      populateData(json.proinfo);
    } catch (error) {
      console.warn(error);
    }
  };

  request.send();
}

function populateData(data) {
  console.log(data);
  window.document.title = data[0].projectname;
}

loadData();
