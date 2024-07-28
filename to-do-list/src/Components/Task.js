import React, { useState } from 'react';
import './Task.css';

const Task = ({ task, editTask, deleteTask, toggleCompleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(task.text);


    const handleEdit = () => {
        
        editTask(task.id, value);
        setIsEditing(false);
    };

    return (
        <div className={`task ${task.completed ? 'completed' : ''}`}>
            {isEditing ?(
                <>
                    <input 
                        type="text" 
                        value={value}
                        onChange={(e) => setValue(e.target.value)} 
                    />
                    <div className="task-actions">
                        <button onClick={handleEdit} className="edit-btn">Save</button>
                    </div>
                </>
            ) : (
                <>
                    <span onClick={() => toggleCompleteTask(task.id)}>{task.text}</span>
                    <div className="task-actions">
                        <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
                        <button onClick={() => deleteTask(task.id)} className="delete-btn">Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Task;
