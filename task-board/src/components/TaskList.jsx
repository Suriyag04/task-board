import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

function TaskList({ tasks, onEditTask, onDeleteTask, onUpdateStatus }) {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = (updatedTask) => {
    onEditTask(updatedTask);
    setEditingTask(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p> No tasks yet</p>
        <small>Create your first task above</small>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {editingTask && (
        <TaskForm
          editingTask={editingTask}
          onEditTask={handleUpdate}
          onCancelEdit={() => setEditingTask(null)}
        />
      )}
      
      <div className="task-stats">
        <span> Total: {tasks.length} tasks</span>
      </div>
      
      <div className="tasks-grid">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => handleEdit(task)}
            onDelete={() => onDeleteTask(task.id)}
            onStatusChange={(newStatus) => onUpdateStatus(task.id, newStatus)}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;