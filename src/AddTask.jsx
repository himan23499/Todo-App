import { useState, useRef, useContext } from "react";
import "./AddTask.css";
import TaskDispatch from './context/TaskDispatch';
function AddTask({ setProgresscount }) {
  const [addtask, setAddTask] = useState(null);
  const iref = useRef(null);
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const time = `${hours}:${minutes}:${seconds}`;
  const dispatch = useContext(TaskDispatch);
  function handleChange(e) {
    e.stopPropagation();
    e.preventDefault();
    setAddTask(e.target.value);
  }
  function handleClick(e) {
    if (addtask !== null) {
      dispatch({
        type: "ADD",
        payload: {
          id: Math.floor(Math.random() * 100) + 1,
          text: addtask,
          completed: false,
          time: time,
        },
      });
      setAddTask(null);
      if (iref.current) {
        iref.current.value = null;
      }
    } else {
      alert("Please Write any Task Before Clicking Add Task Button");
    }
  }
  return (
    <div className="row">
      <input
        type="text"
        id="input-box"
        onChange={handleChange}
        placeholder="Add your text"
        ref={iref}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
}
export default AddTask;
