const inputbox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let task_edit_el; // Declare task_edit_el outside of the addtask() function

function addtask() {
  if (inputbox.value === '') {
    alert("Write Something bruhh!!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputbox.value;
    listContainer.appendChild(li);
    task_edit_el = document.createElement('button'); // Assign the button to the global task_edit_el
    task_edit_el.classList.add('edit');
    task_edit_el.innerText = 'Edit';
    li.appendChild(task_edit_el);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputbox.value = '';
  saveData();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showlist() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showlist();

// Move the event listener for the edit button outside of the addtask() function
listContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit')) {
    const taskListItem = e.target.parentElement;
    const taskText = taskListItem.firstChild.textContent.trim(); // Retrieve the task text content
    if (e.target.innerText.toLowerCase() === "edit") {
      e.target.innerText = "Save";
      let inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.value = taskText;
      taskListItem.replaceChild(inputField, taskListItem.firstChild); // Replace the task text with the input field
    } else {
      e.target.innerText = "Edit";
      const editedTaskText = taskListItem.firstChild.value;
      taskListItem.firstChild.replaceWith(document.createTextNode(editedTaskText)); // Replace the input field with the edited task text
      saveData(); // Save the tasks to localStorage after editing
    }
  }
});




