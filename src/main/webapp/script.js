document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todoForm");
    const todoList = document.getElementById("todoList");
	
	const baseUrl = `http://localhost:8082/todoapp`;

    // Function to fetch and display todos
    function fetchTodos() {
        fetch(`${baseUrl}/todos`)
            .then(response => response.json())
            .then(data => {
                todoList.innerHTML = ""; // Clear the list
                data.forEach(todo => {
                    const li = document.createElement("li");
                    li.textContent = `${todo.title} - [${todo.completed ? "Completed" : "Pending"}]`;

                    todoList.appendChild(li);
                });
            })
            .catch(error => console.error("Error fetching todos:", error));
    }

    // Event listener for form submission
    todoForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        const title = document.getElementById("title").value;

        // POST request to create a new todo
        fetch(`${baseUrl}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `title=${encodeURIComponent(title)}`
        })
        .then(response => response.json())
        .then(data => {
            console.log("Todo added:", data);
            fetchTodos(); // Refresh the list of todos
            todoForm.reset(); // Clear the form fields
        })
        .catch(error => console.error("Error adding todo:", error));
    });

    // Initial fetch of todos when the page loads
    fetchTodos();
});