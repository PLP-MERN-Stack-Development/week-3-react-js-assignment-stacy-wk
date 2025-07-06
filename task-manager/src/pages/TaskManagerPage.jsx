import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import useLocalStorage from '../utils/useLocalStorage'; 
import { useTheme } from '../context/ThemeContext'; 

const TaskManagerPage = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []); 
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto my-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Task Manager</h2>

        <form onSubmit={addTask} className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button type="submit" variant="primary">Add Task</Button>
        </form>

        <div className="flex justify-center space-x-2 mb-4">
          <Button
            variant={filter === 'all' ? 'primary' : 'secondary'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'primary' : 'secondary'}
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'secondary'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
        </div>

        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500 mt-4 dark:text-gray-400">No tasks found for this filter.</p>
        )}

        <ul>
          {filteredTasks.map(task => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}
            >
              <span className="flex-grow cursor-pointer" onClick={() => toggleComplete(task.id)}>
                {task.text}
              </span>
              <Button variant="danger" onClick={() => deleteTask(task.id)} className="ml-4">
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default TaskManagerPage;