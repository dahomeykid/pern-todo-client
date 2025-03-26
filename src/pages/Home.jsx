import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    axios.get(`${API_URL}/todos`)
    .then((res) => setTodos(res.data))
    .catch(() => setError("Failed to load tasks."));
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const text = formData.get("text").trim();
    
    if (!text || text.length < 3) {
      setError("Task must be at least 3 characters long.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/todos", { text });
      setTodos([...todos, res.data]);
      e.target.reset(); // Reset form
      setError(""); // Clear errors after success
    } catch {
      setError("Failed to add task.");
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(`${API_URL}/todos/${id}`, { completed: !completed });
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !completed } : todo)));
    } catch {
      setError("Failed to update task.");
    }
  };

  const deleteTodo = async (id) => {
    try {
    await axios.delete(`${API_URL}/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
    } catch {
      setError("Failed to delete task.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-5 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          name="text"
          className="border p-2 w-full rounded"
          placeholder="Add a task..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center p-2 border-b">
            <span
              className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
              onClick={() => toggleComplete(todo.id, todo.completed)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
