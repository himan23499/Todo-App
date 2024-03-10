import { useContext } from "react";
import TaskContext from "../context/TaskContext";
function useTask() {
  return useContext(TaskContext);
}
export default useTask;
