function addTask() {
    var taskInput = document.getElementById("taskInput");
    var singleTask = taskInput.value;
    if (singleTask !== "") {
      var taskList = document.createElement("li");
      taskList.innerHTML = singleTask;
      taskList.addEventListener("click", function() {
        var parent = taskList.parentNode.id;
        if (parent === "allList") {
          CompleteOrUncomplete(taskList);
        } else if (parent === "completedList") {
          EditOrDelete(taskList);
        } else if (parent === "pendingList") {
          EditOrDelete(taskList);
        }
      });
      document.getElementById("allList").appendChild(taskList);
      taskInput.value = "";
    }
  }
  
  function CompleteOrUncomplete(taskList) {
    var completeButton = document.createElement("button");
    completeButton.innerHTML = "Complete";
    completeButton.addEventListener("click", function(event) {
      event.stopPropagation();
      completeTask(taskList);
    });
  
    var uncompleteButton = document.createElement("button");
    uncompleteButton.innerHTML = "Uncomplete";
    uncompleteButton.addEventListener("click", function(event) {
      event.stopPropagation();
      uncompleteTask(taskList);
    });
  
    var buttonsDiv = document.createElement("div");
    buttonsDiv.appendChild(completeButton);
    buttonsDiv.appendChild(uncompleteButton);
  
    taskList.appendChild(buttonsDiv);
  }
  
  function completeTask(taskList) {
    taskList.removeChild(taskList.lastChild); // Remove the buttons
    taskList.removeEventListener("click", CompleteOrUncomplete);
    document.getElementById("completedList").appendChild(taskList);
    taskList.addEventListener("click", function() {
      EditOrDelete(taskList);
    });
  }
  
  function uncompleteTask(taskList) {
    taskList.removeChild(taskList.lastChild); // Remove the buttons
    taskList.removeEventListener("click", CompleteOrUncomplete);
    document.getElementById("pendingList").appendChild(taskList);
    taskList.addEventListener("click", function() {
      EditOrDelete(taskList);
    });
  }
  

  function EditOrDelete(taskList) {
    if (taskList.parentNode.id === "completedList" || taskList.parentNode.id === "pendingList") {
      if (taskList.lastChild.tagName === "DIV") {
        return; // Buttons already exist, do not add again
      }
  
      var editButton = document.createElement("button");
      editButton.innerHTML = "Edit";
      editButton.addEventListener("click", function(event) {
        event.stopPropagation();
        editTask(taskList);
      });
  
      var deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", function(event) {
        event.stopPropagation();
        deleteTask(taskList);
      });
  
      var buttonsDiv = document.createElement("div");
      buttonsDiv.appendChild(editButton);
      buttonsDiv.appendChild(deleteButton);
  
      taskList.appendChild(buttonsDiv);
    } else {
      return; // Do not show buttons in the "All Tasks" list
    }
  }
  
  function editTask(taskList) {
    var taskInput = document.getElementById("taskInput");
    taskInput.value = taskList.firstChild.textContent; // Set the task name as the input value
    deleteTask(taskList);
  }
  
  function deleteTask(taskList) {
    taskList.parentNode.removeChild(taskList);
  }