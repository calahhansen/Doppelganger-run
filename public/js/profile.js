// Get the modal
const modal = document.getElementById("updateProfileModal");

// Get the button that opens the modal
const btn = document.getElementById("updateBtn");

// Get the <span> element that closes the modal
const span = document.querySelector(".close");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// };

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};


const handleDeleteBtnClick = function(event) {
  const idToDelete = event.target.parentElement.getAttribute("data-id");
  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
    location.reload();
  });
};

document.querySelectorAll(".delete").forEach(btn => {
  btn.addEventListener("click", handleDeleteBtnClick);
});

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

      return liEl;
    });

    exampleListEl.innerHTML = "";
    location.reload();
  });
};

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