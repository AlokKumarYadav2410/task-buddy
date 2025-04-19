// import './App.css'
import './Style.css'
import { useEffect, useState } from 'react';
import ProgressTracker from './components/ProgressTracker'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {

  const [tasks, setTasks] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Flag for initial load

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log('Retrieved tasks from localStorage:', savedTasks);
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false); // Skip saving on the first render
      return;
    }
    console.log('Saving tasks to localStorage:', tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks, isInitialLoad]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  }

  const updateTask = (index, updatedTask) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  }
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    // what is this line doing? explain
    // It filters the tasks array and removes the task at the specified index.
    // The underscore (_) is used as a placeholder for the first argument (the task itself)
    // since we don't need it in this case. The second argument (i) is the index of the current task in the array.
    // The filter function returns a new array that contains all tasks except the one at the specified index.

  }

  const clearTask = () => {
    setTasks([]);
    localStorage.removeItem('tasks');
    // This line clears the tasks from local storage
    // when the clearTask function is called.
    // It ensures that the tasks are removed from both the state and local storage.
    // This is useful for maintaining data consistency
    // and preventing any stale data from being displayed.
    // It is a good practice to clear local storage
    // when the user clears all tasks in the application.
  }
  const date = new Date();
  const currentDate = date.toLocaleDateString();

  return (
    <div className='App'>
      <header>
        <h1 className='title'>Task<span>Buddy</span></h1>
        <p className='tagline'>Your friendly task manager  {currentDate}</p>
      </header>
      <TaskForm addTask={addTask} />
      <TaskList tasks = {tasks} updateTask = {updateTask} deleteTask = {deleteTask} />
      <ProgressTracker tasks = {tasks}/>
      {tasks.length > 0 && (
        <button onClick={clearTask} className='clear-btn'>Clear All Tasks</button>
      )}
      {/* This button clears all tasks when clicked */}
      {/* It only appears when there are tasks present */}
      {/* The button is styled to match the rest of the app */}
      {/* The button is functional and will clear all tasks when clicked */}
      {/* It is a good practice to have a clear all tasks button for user convenience */}
      {/* It helps in managing tasks efficiently */}
      {/* It is a common feature in task management applications */}
      
      <div className='footer' style={{marginTop: '20px'}}>
      <footer>
        <p>Made with ❤️ by Alok Kumar Yadav</p>
        <p>© 2025 Task Buddy. All rights reserved.</p>
      </footer>
      </div>
    </div>
  )
}

export default App
