'use client';

import React, { useEffect, useState } from 'react';
import apiClient from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import handleLogout from '@/app/components/Logout';
import 'react-toastify/dist/ReactToastify.css';

interface Task {
  _id: string;
  title: string;
}

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.info('Please log in first.');
      router.push('/login');
    } 
  }, []);

//   const fetchTasks = async () => {
//     try {
//       const res = await apiClient.get('/tasks/me');
//       setTasks(res.data);
//     } catch (err) {
//       toast.error('Failed to fetch tasks.');
//     }
//   };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      const res = await apiClient.post('/tasks', { title: newTaskTitle });
      setTasks([...tasks, res.data]);
      setNewTaskTitle('');
      toast.success('Task added!');
    } catch (err) {
      toast.error('Failed to add task.');
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task._id);
    setEditedTitle(task.title);
  };

  const handleSaveClick = async (taskId: string) => {
    try {
      await apiClient.put(`/tasks/${taskId}`, { title: editedTitle });
      setTasks(tasks.map(task => task._id === taskId ? { ...task, title: editedTitle } : task));
      toast.success('Task updated!');
      setEditingTaskId(null);
    } catch (err) {
      toast.error('Failed to update task.');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await apiClient.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      toast.success('Task deleted!');
    } catch (err) {
      toast.error('Failed to delete task.');
    }
  };

  const logoutUser = async () => {
   await handleLogout();
  toast.info('Redirecting to login page...');
  setTimeout(() => {
    router.push('/login');
  }, 2500); // 2.5 seconds delay

  };

  return (
    <div className="min-h-screen p-8 bg-purple-50">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">Task Manager</h2>

        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter new task..."
            className="flex-grow px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            Add Task
          </button>
        </form>

        <div>
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between items-center bg-purple-100 p-4 mb-3 rounded-md shadow-sm"
            >
              {editingTaskId === task._id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="flex-grow px-2 py-1 border border-purple-400 rounded mr-2"
                />
              ) : (
                <p className="flex-grow">{task.title}</p>
              )}

              {editingTaskId === task._id ? (
                <button
                  onClick={() => handleSaveClick(task._id)}
                  className="ml-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(task)}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => deleteTask(task._id)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={logoutUser}
            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition duration-300"
          >
            Log out
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default TasksPage;
