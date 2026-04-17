import React from 'react';

function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  const getStatusColor = () => {
    switch(task.status) {
      case 'todo': return 'status-todo';
      case 'in-progress': return 'status-progress';
      case 'done': return 'status-done';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-card ${getStatusColor()}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-actions">
          <button onClick={onEdit} className="icon-btn" title="Edit">✏️
          </button>
          <button onClick={onDelete} className="icon-btn" title="Delete">🗑️
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-footer">
        <select 
          value={task.status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="status-select"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        
        <span className="task-date">
          {formatDate(task.createdAt)}
        </span>
      </div>
    </div>
  );
}

export default TaskItem;