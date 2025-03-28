import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/tasks', { title, description });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/api/tasks/${editingTaskId}`, { title, description });
      setTitle('');
      setDescription('');
      setEditingTaskId(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axiosInstance.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <form onSubmit={editingTaskId ? handleUpdateTask : handleAddTask} className="mb-4">
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="w-full p-2 mb-2 border rounded" 
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="w-full p-2 mb-2 border rounded" 
        ></textarea>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          {editingTaskId ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task._id} className="p-4 border mb-2 rounded flex justify-between">
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEditTask(task)} className="bg-blue-500 text-white p-2 rounded">Edit</button>
              <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskDashboard;