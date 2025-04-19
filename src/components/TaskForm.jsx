import React, { useState } from 'react'

const TaskForm = ({addTask}) => {
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [category, setCategory] = useState('General');

    const handleSubmit = (e) =>{
        e.preventDefault();
        //Check if the task is empty or not
        if(task.trim() === ''){
            alert('Please enter a task!');
            return;
        }
        //Check if the task already exists case insensitive
        //Get the existing tasks from local storage
        //Parse the tasks from local storage to an array
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskExists = existingTasks.some(existingTask => existingTask.text.toLowerCase() === task.toLowerCase());
        if(taskExists){
            alert('Task already exists!');
            return;
        }
        //Add the task to the array and update local storage
        addTask({text: task, priority, category, completed: false});
        //Reset the form after submission
        setTask('');
        setPriority('Medium');
        setCategory('General');
    }


  return (
    <form onSubmit={handleSubmit} className='task-form'>
        <div id='inp'>
            <input type="text" value={task}
            placeholder='Enter Your Task'
            onChange={(e) => setTask(e.target.value)}/>
            <span><button type='submit'>Add Task</button></span>
        </div>
        <div id='btns'>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="General">General</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
            </select>
        </div>
    </form>
  )
}

export default TaskForm
