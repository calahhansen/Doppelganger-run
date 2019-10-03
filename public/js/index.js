//let city;
let exampleCityEl;

const taskIds = [];

// document.getElementById('modalbtn').addEventListener('click', function() {
//   document.querySelector('.modalOne').style.display = 'flex';

// });

// document.querySelector('.closebtn').addEventListener('click', function() {
// document.querySelector('.modalOne').style.display = 'none';

function getScript(url, success) {
  var script = document.createElement("script");
  script.src = url;
  var head = document.getElementsByTagName("head")[0],
    done = false;
  // Attach handlers for all browsers
  script.onload = script.onreadystatechange = function() {
    if (
      !done &&
      (!this.readyState ||
        this.readyState === "loaded" ||
        this.readyState === "complete")
    ) {
      done = true;
      success();
      script.onload = script.onreadystatechange = null;
      head.removeChild(script);
    }
  };
  head.appendChild(script);
}

getScript(
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js",
  function() {
    console.log("Yay jQuery is ready");
  }
);

$.getJSON("http://gd.geobytes.com/GetCityDetails?callback=?", function(data) {
  console.log("Everything: " + data.geobytesfqcn);
  console.log("City: " + data.geobytescity);
  console.log("State: " + data.geobytesregion);
  console.log("Country: " + data.geobytescountry);
  console.log("Continent: " + data.geobytesmapreference);
  console.log("Currency Code: " + data.geobytescurrencycode);
  console.log("Latitude: " + data.geobyteslatitude);
  console.log("Longitude: " + data.geobyteslongitude);
  exampleCityEl = data.geobytesfqcn;
});

// Get references to page elements
const exampleTextEl = document.getElementById("example-text");
const exampleDescriptionEl = document.getElementById("example-description");
const exampleCategoryEl = document.getElementById("example-category");
const submitBtnEl = document.getElementById("submit");
const exampleListEl = document.getElementById("example-list");

// The API object contains methods for each kind of request we'll make
const API = {
  updateExample: function(example) {
    return fetch("/api/tasks", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify(example)
    }).then(function(res) {
      console.log(res);
    });
  },

  saveExample: function(example) {
    return fetch("/api/tasks", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(example)
    })
      .then(res => res.json())
      .then(function(task) {
        console.log(task);
        taskIds.push(task.id);
        console.log(taskIds);
      });
  },

  getExamples: function() {
    return fetch("/api/tasks").then(res => res.json());
  },
  deleteExample: function(id) {
    return fetch("/api/tasks/" + id, {
      method: "DELETE"
    }).then(res => res.json);
  }
};

// refreshExamples gets new examples from the db and repopulates the list
const refreshExamples = function() {
  API.getExamples().then(function(data) {
    const exampleEls = data.map(function(example) {
      const aEl = document.createElement("a");
      aEl.innerHTML = example.text;
      aEl.setAttribute("href", "/tasks/" + example.id);

      const liEl = document.createElement("li");
      liEl.classList.add("list-group-item");
      liEl.setAttribute("data-id", example.id);
      liEl.append(aEl);

      const buttonEl = document.createElement("button");
      buttonEl.classList.add("btn", "btn-danger", "float-right", "delete");
      buttonEl.innerHTML = "ｘ";
      buttonEl.addEventListener("click", handleDeleteBtnClick);

      liEl.append(buttonEl);
      location.reload();
      return liEl;
    });

    exampleListEl.innerHTML = "";
    location.reload();
    console.log("test");
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
const handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("handleformsubmit");

  const example = {
    text: exampleTextEl.value.trim(),
    description: exampleDescriptionEl.value.trim(),
    category: exampleCategoryEl.value.trim(),
    city: exampleCityEl
  };
  console.log("posting this stuff");
  console.log(example);
  if (!(example.text && example.description && example.category)) {
    alert("You must enter aa title, description, creator, and category!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  exampleTextEl.value = "";
  exampleDescriptionEl.value = "";
  exampleCategoryEl.value = "";
  exampleCityEl.value = "";
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
const handleDeleteBtnClick = function(event) {
  const idToDelete = event.target.parentElement.getAttribute("data-id");
  debugger;
  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

const handleAcceptBtnClick = function(event) {
  event.preventDefault();
  const idObj = {
    id: this.id
  };
  console.log(idObj);
  refreshExamples();
  API.updateExample(idObj).then(function() {
  });
};

//event listener for accept task button
document.querySelectorAll(".accept").forEach(btn => {
  console.log("making a query");
  btn.addEventListener("click", handleAcceptBtnClick);
});

// Add event listeners to the submit and delete buttons
submitBtnEl.addEventListener("click", handleFormSubmit);

document.querySelectorAll(".delete").forEach(btn => {
  btn.addEventListener("click", handleDeleteBtnClick);
});

document.getElementById("add-task").addEventListener("click", function() {
  document.querySelector(".modalOne").style.display = "flex";
  
});

document.querySelector(".closebtn").addEventListener("click", function() {
  document.querySelector(".modalOne").style.display = "none";
});
