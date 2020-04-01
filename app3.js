var projectId = localStorage.getItem("project-id");
console.log(projectId);

function loadData() {
  const request = new XMLHttpRequest();

  request.open(
    "get",
    "https://script.google.com/macros/s/AKfycbzDyg8MWjtAk0RSe6udRXqZiei3TmaNtlMnSnMc5A_UFrCDHa4/exec?v=" +
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
