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
					li.dataset.id = todo.id; // Store the ID in the list item

						  // Create a button for marking as completed
						  if (!todo.completed) {
						    const completeButton = document.createElement("button");
						    completeButton.textContent = "Mark as Completed";
						    completeButton.addEventListener("click", () => markAsCompleted(todo.id));
						    li.appendChild(completeButton);
						  }

                    todoList.appendChild(li);
                });
            })
            .catch(error => console.error("Error fetching todos:", error));
    }

	// Function to mark a todo as completed
	function markAsCompleted(id) {
	  fetch(`${baseUrl}/todos?id=${id}`, {
	    method: "PUT",
	    headers: {
	      "Content-Type": "application/x-www-form-urlencoded",
	    }
	  })
	  .then(response => response.json())
	  .then(data => {
	    console.log(data.message);
	    fetchTodos(); // Refresh the list of todos
	  })
	  .catch(error => console.error("Error updating todo:", error));
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