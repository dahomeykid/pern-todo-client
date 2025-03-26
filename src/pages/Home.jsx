import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/todos`).then((res) => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    if (text.trim()) {
      const res = await axios.post(`${API_URL}/todos`, { text });
      setTodos([...todos, res.data]);
      setText("");
    }
  };

  const toggleComplete = async (id, completed) => {
    await axios.put(`${API_URL}/todos/${id}`, { completed: !completed });
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !completed } : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-5 rounded-lg shadow-md">
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 w-full rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </div>
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
