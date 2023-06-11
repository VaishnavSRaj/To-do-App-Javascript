const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const date = document.getElementById("date");
const todosContainer = document.querySelector(".todo-container");
const addbtn = document.querySelector("#add-btn");
const msg = document.getElementById("alert");

function addTask() {
  if (inputBox.value.trim() === "") {
    msg.innerText = "Oops! Looks like you forgot to enter a task";
  } else {
    msg.innerText = "";
    const li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    li.classList.add("task");

    const span = document.createElement("span");

    // Create the edit logo
    const editButton = document.createElement("button");
    editButton.id = "edit-button";
    const editImage = document.createElement("img");
    editImage.src = "images/edit.svg";
    editButton.appendChild(editImage);
    span.appendChild(editButton);

    // Create the delete logo
    const deleteButton = document.createElement("button");
    deleteButton.id = "delete-button";
    const deleteImage = document.createElement("img");
    deleteImage.src = "images/delete.svg";
    deleteButton.appendChild(deleteImage);
    span.appendChild(deleteButton);
    li.appendChild(span);

    deleteButton.addEventListener("click", () => {
      const parent = span.parentElement;
      console.log(parent);
      parent.parentElement.removeChild(parent);
      editButton.disabled = true; // Disable the edit button
      editButton.classList.add("disabled"); // Add the "disabled" class
      saveData();
    });

    editButton.addEventListener("click", () => {
      inputBox.value = li.innerText;
      const parent = span.parentElement;
      parent.parentElement.removeChild(parent);
      saveData();
    });
  }
  inputBox.value = "";
  saveData();
}

//Enter to add todo list
inputBox.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    addTask();
  }
});

//check todo list and disable edit button
listContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName === "LI") {
    target.classList.toggle("checked");
    const editButton = target.querySelector("#edit-button");
    editButton.disabled = !editButton.disabled;
    editButton.style.cursor = target.classList.contains("checked")
      ? "not-allowed"
      : "pointer";
    saveData();
  } else {
    return;
  }
});

//saving data to local-storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

showData();

//displaying data from local-storage
function showData() {
  listContainer.innerHTML = localStorage.getItem("data");

  const editButtons = document.querySelectorAll("#edit-button");
  const deleteButtons = document.querySelectorAll("#delete-button");

  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", handleEdit);
  });

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", handleDelete);
  });
}

function handleEdit() {
  console.log("edit button clicked");
  const li = this.parentElement.parentElement;
  inputBox.value = li.innerText;
  li.remove();
  saveData();
}

function handleDelete() {
  console.log("delete button clicked");
  const li = this.parentElement.parentElement;
  li.remove();
  saveData();
}

// Display-date

const today = new Date();
day = today.getDay();
year = today.getFullYear();

const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
date.innerHTML = `It's ${week[day]}, ${year}`;
