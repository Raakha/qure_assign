const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const detailsTable = document.getElementById("details-table");

const nameBlock = document.getElementById("name-block");
const ageBlock = document.getElementById("age-block");
const vaccineBlock = document.getElementById("vaccinated-block");

const loadingElement = document.getElementById("loading");

// API URL
// const SEARCH_API_URL = '<SEARCH_URL_HERE>';
const SEARCH_API_URL = "https://ec2-3-85-237-81.compute-1.amazonaws.com:8000/search";
const MOCK_SEARCH_URL = "https://jsonplaceholder.typicode.com/users/1";

// Hiding the table initially
hideTable();

function hideTable() {
  detailsTable.setAttribute("hidden", true);
  detailsTable.style.display = "none";
}

function showTable() {
  if (detailsTable.hasAttribute("hidden")) {
    detailsTable.removeAttribute("hidden");
  }

  detailsTable.style.display = "table";
}

function activateLoader() {
  loadingElement.setAttribute("hidden", "false");
  loadingElement.style.display = "inline";
}

function deactivateLoader() {
  loadingElement.setAttribute("hidden", "true");
  loadingElement.style.display = "none";
}

function searchPeople() {
  const searchQuery = searchBar.value.trim().toLowerCase();

  if (searchQuery.length <= 0) {
    alert("Please search for a valid name!!");
    return;
  }

  if (searchQuery.length > 0) {
    // Use this below line when the server is available
    const embededURL = `${SEARCH_API_URL}?user=${searchQuery}`;

    activateLoader();

    fetch(embededURL)
      .then((response) => response.json())
      .then((result) => {
        deactivateLoader();
        console.log("Result: ", result);

        if (detailsTable.hasAttribute("hidden")) {
          showTable();
        }

        if (result.status === "success") {
          nameBlock.innerText = result.user.name;
          ageBlock.innerText = result.user.age;
          vaccineBlock.innerText = result.user.vaccinated;
        }

        if(result.status == "not found")
        {
          alert("User Not Found")
        }
      })
      .catch((err) => {
        deactivateLoader();
        console.log("Error: " + err.message);
      });
  }
}
