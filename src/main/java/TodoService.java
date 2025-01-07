import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

import model.Todo;

public class TodoService {
	private final List<Todo> todoList = new ArrayList<>();
	private final AtomicInteger idCounter = new AtomicInteger(1);

	public Todo createTodo(String title) {
		Todo newTodo = new Todo(idCounter.getAndIncrement(), title);
		todoList.add(newTodo);
		return newTodo;
	}

	public List<Todo> getAllTodos() {
		return todoList;
	}

	public Optional<Todo> getTodoById(int id) {
		return todoList.stream().filter(todo -> todo.getId() == id).findFirst();
	}
}