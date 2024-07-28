import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            addTask(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Add a new task" 
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
