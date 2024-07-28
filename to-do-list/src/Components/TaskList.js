import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, editTask, deleteTask , toggleCompleteTask}) => {
    return (
        <div>
            {tasks.map((task) => (
                <Task 
                    key={task.id} 
                    task={task} 
                    editTask={editTask} 
                    deleteTask={deleteTask} 
                    toggleCompleteTask={toggleCompleteTask} 
                />
            ))}
        </div>
    );
};

export default TaskList;
