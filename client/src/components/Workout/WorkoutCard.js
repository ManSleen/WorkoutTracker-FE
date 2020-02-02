import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../../util/axiosWithAuth";

const WorkoutCard = ({ workout, deleteWorkout, updateWorkout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [workoutInfo, setWorkoutInfo] = useState({});

  useEffect(() => {
    setWorkoutInfo({
      name: workout.name,
      duration: workout.duration,
      date: workout.date
    });
  }, []);

  const handleChanges = e => {
    setWorkoutInfo({ ...workoutInfo, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ margin: "15px 0" }}>
      {isEditing ? (
        <div style={{ display: "inline" }}>
          <input
            name="name"
            onChange={handleChanges}
            value={workoutInfo.name}
            style={{ display: "inline" }}
          />
          <input
            name="duration"
            onChange={handleChanges}
            value={workoutInfo.duration}
            type="number"
            style={{ display: "inline", marginLeft: "25px" }}
          />
          <input
            name="date"
            onChange={handleChanges}
            value={workoutInfo.date}
            type="date"
            style={{ display: "inline", marginLeft: "25px" }}
          />
        </div>
      ) : (
        <Link key={workout._id} to={`/workout/${workout._id}`}>
          <div style={{ display: "inline" }}>
            <h3 style={{ display: "inline" }}>{workout.name}</h3>
            <h4 style={{ display: "inline", marginLeft: "25px" }}>
              {workout.duration} mins
            </h4>
            <h4 style={{ display: "inline", marginLeft: "25px" }}>
              {workout.date.substr(0, 10)}
            </h4>
          </div>
        </Link>
      )}

      <span>
        {isEditing ? (
          <button
            onClick={() => {
              setIsEditing(false);
              updateWorkout(workoutInfo, workout._id);
            }}
          >
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}

        <button onClick={() => deleteWorkout(workout._id)}>Delete</button>
      </span>
    </div>
  );
};

export default WorkoutCard;
