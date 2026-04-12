import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const API = "http://34.227.60.15:5000/api/tasks";

  // GET tasks
  const getTasks = async () => {
    try {
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
    }
  };

  // ADD task
  const addTask = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(API, { text });
      setText("");
      await getTasks(); // ✅ wait for refresh
    } catch (err) {
      console.error("Error adding task:", err.message);
    }
  };

  // DELETE task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      await getTasks(); // ✅ refresh after delete
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Task Manager</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task"
        style={{ padding: "8px", marginRight: "10px" }}
      />

      <button onClick={addTask}>Add</button>

      <ul style={{ listStyle: "none", marginTop: "20px" }}>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (
            <li key={task._id} style={{ marginBottom: "10px" }}>
              {task.text}
              <button
                onClick={() => deleteTask(task._id)}
                style={{ marginLeft: "10px" }}
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
