import React from "react";
import Set from "./Set";

const Exercise = ({ exercise }) => {
  return (
    <div>
      <h3>{exercise.name}</h3>
      {exercise.sets.map(set => (
        <Set key={set._id} set={set} />
      ))}
    </div>
  );
};

export default Exercise;
