import React from "react";

const Set = ({ set }) => {
  const { number, weight, reps, completed } = set;
  return (
    <div>
      <span># {number}</span>
      <span>Weight: {weight}</span>
      <span>Reps: {reps}</span>
      <span>{completed ? "completed" : "not completed"}</span>
    </div>
  );
};

export default Set;
