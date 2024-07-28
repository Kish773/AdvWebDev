import React, { useState } from 'react';
import TaskList from './Components/TaskList';
import TaskForm from './Components/TaskForm';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (text) => {
        setTasks([...tasks, { id: uuidv4(), text }]);
    };

    const editTask = (id, newText) => {
        const newTasks = tasks.map((task) => 
            task.id === id ? { ...task, text: newText } : task
        );
        setTasks(newTasks);
    };

    const deleteTask = (id) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    };


    const toggleCompleteTask = (id) => {
        const newTasks = tasks.map((task) => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    return (
        <div className="app">
            <h1>To-Do List</h1>
            <TaskForm addTask={addTask} />
            <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} toggleCompleteTask={toggleCompleteTask} />
        </div>
    );
};

export default App;
