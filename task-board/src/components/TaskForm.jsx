import React, { useState } from 'react';

function TaskForm({ onAddTask, editingTask, onEditTask, onCancelEdit }) {
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [status, setStatus] = useState(editingTask?.status || 'todo');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (title.length < 3) {
      setError('Title must be at least 3 characters');
      return;
    }
    
    const taskData = { title: title.trim(), description, status };
    
    if (editingTask) {
      onEditTask({ ...editingTask, ...taskData });
      onCancelEdit();
    } else {
      onAddTask(taskData);
    }
    
    // Reset form
    setTitle('');
    setDescription('');
    setStatus('todo');
    setError('');
  };

  return (
    <div className="task-form-card">
      <h2>{editingTask ? '✏️ Edit Task' : '➕ Create Task'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="todo">To Do</option>
            <option value="in-progress"> In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          {editingTask && (
            <button type="button" onClick={onCancelEdit} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;