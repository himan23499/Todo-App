import TaskDispatch from "../context/TaskDispatch";
import { useContext } from "react";

function useDispatch() {
  return useContext(TaskDispatch);
}
export default useDispatch;
