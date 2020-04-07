var projectId = localStorage.getItem("project-id");
console.log(projectId);

var x = projectId.replace("&","%26");

const infoList = document.getElementById("info-list");
const projectName = document.getElementById("project-name");
const loading = document.querySelector(".loading-div-pr");
const heading = document.querySelector(".heading");
heading.style.display = "none";

function loadData() {
  const request = new XMLHttpRequest();

  request.open(
    "get",
    "https://script.google.com/macros/s/AKfycbzDyg8MWjtAk0RSe6udRXqZiei3TmaNtlMnSnMc5A_UFrCDHa4/exec?v=" +
      x
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
  window.document.title = data[0].projectname+" | ALD PROJECT";
  buildHtml(data[0]);
}

function buildHtml(data){

  loading.style.display = "none";
  heading.style.display = "block";
  document.querySelector(".hidden").style.display = "block";
  
  projectName.textContent ="#" + data.ser +" " + data.projectname;

  var list = `
                  <li>Date: ${data.startingdate}</li>
                  <li>Company Name: ${data.companyname}</li>
                  <li>Branch Name: ${data.branchname}</li>
                  <li>Eastimated Amount: ${data.eastimatedamt} /=</li>
                  <li>Work Order Amount: ${data.workordr} /=</li>
                  <li>Project ID Name: ${data.proid}</li>
                  <li>Projects Survey Date: ${data.psd}</li>
                  <li>1st Submission Date: ${data.fsd}</li>
                  <li>Approved Drawing No: ${data.apn}</li>
                  <li>Work Order Date: ${data.wod}</li>
                  <li>Contactor Name: ${data.contname}</li>
                  <li>Work Complitation Date: ${data.wcd}</li>
              `;

  infoList.innerHTML += list;

}

loadData();
