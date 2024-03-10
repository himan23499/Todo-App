import { useEffect, useState } from "react";
import "./DisplayList.css";
// import TaskContext from "./context/TaskContext";
// import TaskDispatch from './context/TaskDispatch';
import useDispatch from "./hooks/DispatchT";
import useTask from "./hooks/Tasks";
function DisplayList({ setProgresscount }) {
  const [uncheckCount, setUncheckcount] = useState(0);
  const [pinnedItemId, setPinnedItemId] = useState(null);
  const [pintext, Setpintext] = useState(null);
  // const tasks = useContext(TaskContext);
  const tasks = useTask();
  // const dispatch = useContext(TaskDispatch);
  const dispatch = useDispatch();
  function handleToggle(e) {
    // console.log(e);

    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");

      const updatedCount = e.target.classList.contains("checked")
        ? uncheckCount + 1
        : uncheckCount - 1;
      setUncheckcount(updatedCount);
      setProgresscount(updatedCount);
    }
  }

  function handleDelete(id) {
    dispatch({ type: "DELETE", payload: id });
    setUncheckcount(uncheckCount - 1);
    setProgresscount(uncheckCount);
  }

  function handleUpClick(id) {
    console.log(id);
    dispatch({ type: "UP", payload: id });
  }

  function handleDownClick(id) {
    dispatch({ type: "DOWN", payload: id });
  }

  function handleDobClick(id, e) {
    // console.log(e);
    if (!pinnedItemId) {
      setPinnedItemId(id);
      Setpintext("Pinned Item");

      dispatch({ type: "pin", payload: id });
    } else {
      setPinnedItemId(null);
    }
  }

  useEffect(() => {
    setProgresscount(uncheckCount);
  }, [tasks.length]);

  return (
    <ul id="list-container">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`unchecked ${pinnedItemId === task.id ? "pin" : ""}`}
          onClick={handleToggle}
          draggable="true"
          onDoubleClick={() => handleDobClick(task.id)}
        >
          {task.text}
          <span class="pinitem">
            {pinnedItemId === task.id ? " (" + pintext + ")" : ""}
          </span>
          <span className="Date">Created At-: {task.time}</span>
          <span className="x" onClick={() => handleDelete(task.id)}>
            X
          </span>
          <span className="up" onClick={() => handleUpClick(task.id)}>
            Up
          </span>
          <span className="down" onClick={() => handleDownClick(task.id)}>
            Down
          </span>
        </li>
      ))}
    </ul>
  );
}

export default DisplayList;
