window.onload = () => {
    // Fetch users and populate the dropdown
    fetch("http://localhost:8083/api/users")
      .then((res) => res.json())
      .then((users) => {
        let dropdown = document.getElementById("userDropdown");
        users.forEach((user) => {
          let option = document.createElement("option");
          option.text = user.username;
          option.value = user.id;
          dropdown.add(option);
        });
      });
  };
  
  // Function to fetch tasks for the selected user
  function getTasks() {
    let userId = document.getElementById("userDropdown").value;
    let tasksContainer = document.getElementById("tasksContainer");
  
    // Fetch tasks for the selected user
    fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
      .then((res) => res.json())
      .then((tasks) => {
        // Display tasks in tasksContainer
        tasksContainer.innerHTML = "<h2>User Tasks</h2>";
        tasks.forEach((task) => {
          let taskElement = document.createElement("p");
          taskElement.textContent = task.description;
          tasksContainer.appendChild(taskElement);
        });
      });
  }