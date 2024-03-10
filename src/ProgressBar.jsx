import React from "react";
import "./ProgressBar.css";

function ProgressBar({ progress }) {
  const progressValue = progress;

  return (
    <div className="progress">
      <div className="range__label">Tasks Completed</div>
      <div className="range" style={{ "--p": progressValue }}></div>
    </div>
  );
}

export default ProgressBar;
