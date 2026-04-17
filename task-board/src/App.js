import React, { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import './App.css';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');

  // Add new task
  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  // Edit existing task
  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  // Delete task
  const deleteTask = (taskId) => {
    if (window.confirm('Delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  // Update status only
  const updateStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Filter logic
  const getFilteredTasks = () => {
    if (filter === 'all') return tasks;
    return tasks.filter(task => task.status === filter);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Task Board</h1>
        <p>Manage your daily tasks</p>
      </header>

      <div className="container">
        <TaskForm onAddTask={addTask} />
        
        <FilterButtons 
          currentFilter={filter} 
          onFilterChange={setFilter} 
        />
        
        <TaskList 
          tasks={getFilteredTasks()}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
          onUpdateStatus={updateStatus}
        />
      </div>
    </div>
  );
}

export default App;