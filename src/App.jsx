import AddTask from "./AddTask";
import "./App.css";
import { useState, useEffect, useReducer, useContext } from "react";
import DisplayList from "./DisplayList";
import ProgressBar from "./ProgressBar";
import TaskContext from "./context/TaskContext";
import TaskDispatch from "./context/TaskDispatch";

export default function App() {
  // const [tasks, setTasks] = useState([]);
  function taskReducer(tasks, action) {
    switch (action.type) {
      case "ADD":
        return [...tasks, action.payload];
      case "DELETE":
        return tasks.filter((task) => task.id !== action.payload);
      case "UP":
        const taskIndex = tasks.findIndex((task) => task.id === action.payload);
        console.log("App", taskIndex);
        const newTask = [...tasks];
        if (taskIndex > 0) {
          [newTask[taskIndex], newTask[taskIndex - 1]] = [
            newTask[taskIndex - 1],
            newTask[taskIndex],
          ];
        }
        return newTask;
      case "DOWN":
        const taskIndexs = tasks.findIndex(
          (task) => task.id === action.payload,
        );

        console.log("App", taskIndexs);
        const newTasks = [...tasks];
        if (taskIndexs < tasks.length - 1) {
          [newTasks[taskIndexs], newTasks[taskIndexs + 1]] = [
            newTasks[taskIndexs + 1],
            newTasks[taskIndexs],
          ];
        }
        return newTasks;
      case "pin":
        const taskIndex1 = tasks.findIndex(
          (task) => task.id === action.payload,
        );

        console.log("App", taskIndex1);
        const newTask1 = [...tasks];

        [newTask1[taskIndex1], newTask1[0]] = [
          newTask1[0],
          newTask1[taskIndex1],
        ];
        return newTask1;
      default:
        return tasks;
    }
  }

  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [progress, setProgress] = useState(0);
  const taskContext = useContext(TaskContext);
  // const [id,setId] = useState(0);

  // function addTask(task) {
  //   dispatch({type:'ADD',payload:
  //       {
  //         id: Math.floor(Math.random() * 100) + 1,
  //         text: task,
  //         completed: false,
  //         time: time,
  //       }
  //     });
  // console.log("Task", task);
  // setTasks();
  // if(!progress == 0){
  // setProgress(progress - (1/tasks.length*100) );
  // }
  // }
  // function UpTask(id) {

  //     // setTasks(newTask);

  //     dispatch({type:'UP',payload:id});

  // }
  // function DownTask(id) {

  //     // setTasks(newTask);
  //     dispatch({type:'DOWN',payload:id});
  //   }

  function setProgresscount(count) {
    if (count == 0) {
      setProgress(0);
    } else {
      setProgress(Math.round((count / tasks.length) * 100));
      console.log(progress);
    }
  }
  // function pin(id) {

  //   setTasks(newTask);

  // }
  useEffect(() => {
    console.log(progress);
  }, [progress, tasks]);
  // function DeleteTask(id) {
  //   dispatch({type:'DELETE',payload:id});
  //   // const copyTask = tasks.filter((task) => task.id !== id);
  //   // setTasks(copyTask);
  // }
  // console.log();
  return (
    <TaskContext.Provider value={tasks}>
      <TaskDispatch.Provider value={dispatch}>
        <div className="container">
          <ProgressBar progress={progress}></ProgressBar>
          <div className="todo-app">
            <p>Completed Items : {tasks.length}</p>
            <h2>
              To-Do List
              <img src="../icon.png" />
            </h2>
            <AddTask setProgresscount={setProgresscount}></AddTask>
            <DisplayList setProgresscount={setProgresscount}></DisplayList>
          </div>
        </div>
      </TaskDispatch.Provider>
    </TaskContext.Provider>
  );
}
