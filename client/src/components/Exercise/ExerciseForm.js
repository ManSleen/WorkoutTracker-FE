import React, { useState } from "react";
import { axiosWithAuth } from "../../util/axiosWithAuth";

const ExerciseForm = ({ workoutId, getWorkout }) => {
  const [exercise, setExercise] = useState({
    name: ""
  });

  const handleChanges = e => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const addExercise = async exercise => {
    try {
      const userId = localStorage.getItem("user");
      await axiosWithAuth().post(
        `/users/${userId}/workouts/${workoutId}/exercises`,
        exercise
      );
      setExercise({ name: "" });
      getWorkout();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addExercise(exercise);
  };

  const { name } = exercise;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Exercise Name"
          name="name"
          value={name}
          onChange={handleChanges}
        />

        <button type="submit">Add Exercise</button>
      </form>
    </div>
  );
};

export default ExerciseForm;
