window.onload = async () => {
    const userIdInput = document.getElementById("userid");
    const categoryInput = document.getElementById("category");
    const priorityInput = document.getElementById("priority");
    const descriptionInput = document.getElementById("description");
    const deadlineInput = document.getElementById("deadline");
    const createForm = document.getElementById("create-form");

    try {
        // Fetch user and category data to populate the dropdowns
        const [userData, categoryData] = await Promise.all([
            fetch("http://localhost:8083/api/users").then(res => res.json()),
            fetch("http://localhost:8083/api/categories").then(res => res.json())
        ]);

        // Populate user dropdown
        userData.forEach(user => {
            const option = document.createElement("option");
            option.value = user.id;
            option.textContent = user.username;
            userIdInput.appendChild(option);
        });

        // Populate category dropdown
        categoryData.forEach(category => {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            categoryInput.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching user or category data:", error.message);
    }

    createForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = {
            userid: userIdInput.value,
            category: categoryInput.value,
            priority: priorityInput.value,
            description: descriptionInput.value,
            deadline: deadlineInput.value,
            completed: false
        };

        try {
            const response = await fetch("http://localhost:8083/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Failed to create new ToDoTask: ${errorText}`);
                return;
            }

            const newToDoTask = await response.json();
            console.log("New ToDoTask created:", newToDoTask);

            // Optionally, redirect to a success page or update the UI
        } catch (error) {
            console.error("Error creating new ToDoTask:", error.message);
        }
    });
};