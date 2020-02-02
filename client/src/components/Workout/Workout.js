import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../../util/axiosWithAuth";

import Exercise from "../Exercise/Exercise";
import ExerciseForm from "../Exercise/ExerciseForm";
import { Link } from "react-router-dom";

const Workout = ({ match }) => {
  const [workout, setWorkout] = useState();
  const [isEditingName, setIsEditingName] = useState(false);

  const { workoutId } = match.params;

  const getWorkout = async () => {
    const userId = localStorage.getItem("user");
    const res = await axiosWithAuth().get(
      `/users/${userId}/workouts/${workoutId}`
    );

    const workout = res.data;
    setWorkout(workout);
  };

  const updateWorkout = () => {};

  useEffect(() => {
    getWorkout();
  }, []);

  if (workout) {
    return (
      <div>
        <Link to="/dash">Back to dashboard</Link>

        {isEditingName ? (
          <>
            <input
              defaultValue={workout.name}
              style={{
                fontSize: "2em",
                fontWeight: "bold",
                margin: ".67em auto",
                display: "block",
                fontFamily: "Roboto"
              }}
            />
            <button
              onClick={() => {
                setIsEditingName(false);
              }}
            >
              Save
            </button>
          </>
        ) : (
          <h1 onClick={() => setIsEditingName(!isEditingName)}>
            {workout.name}
          </h1>
        )}

        <ExerciseForm getWorkout={getWorkout} workoutId={workoutId} />
        {workout.exercises.length > 0
          ? workout.exercises.map(exercise => (
              <Exercise
                getWorkout={getWorkout}
                key={exercise._id}
                exercise={exercise}
                workoutId={workoutId}
              />
            ))
          : "No exercises for this workout"}
      </div>
    );
  } else {
    return "loading...";
  }
};

export default Workout;
