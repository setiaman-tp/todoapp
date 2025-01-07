import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Todo;

@javax.servlet.annotation.WebServlet("/todos")
public class TodoServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8322381856154392754L;
	private final TodoService todoService = new TodoService();

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json");

		String title = request.getParameter("title");
		Todo newTodo = todoService.createTodo(title);

		PrintWriter out = response.getWriter();
		out.println("{\"id\":" + newTodo.getId() + ", \"title\":\"" + newTodo.getTitle() + "\",  \"completed\":"
				+ newTodo.getCompleted() + "}");
		out.flush();
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json");

		List<Todo> todos = todoService.getAllTodos();

		PrintWriter out = response.getWriter();
		out.println("[");

		for (int i = 0; i < todos.size(); i++) {
			Todo todo = todos.get(i);
			out.println("{\"id\":" + todo.getId() + ", \"title\":\"" + todo.getTitle() + "\",  \"completed\":"
					+ todo.getCompleted() + "}");

			if (i < todos.size() - 1) {
				out.print(",");
			}
			out.println();
		}

		out.println("]");
		out.flush();
	}
}