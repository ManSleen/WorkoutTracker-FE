import React, { useState } from "react";
import { axiosWithAuth } from "../../util/axiosWithAuth";

const SetForm = ({ exercise, workoutId, getWorkout }) => {
  const handleChanges = e => {
    setSetInfo({ ...setInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(setInfo);
    const userId = localStorage.getItem("user");
    try {
      await axiosWithAuth().post(
        `/users/${userId}/workouts/${workoutId}/exercises/${exercise._id}/sets`,
        setInfo
      );
      getWorkout();
    } catch (error) {
      console.log(error);
    }
  };

  const [setInfo, setSetInfo] = useState({
    number: 0,
    weight: 0,
    reps: 0,
    completed: false
  });

  const { number, weight, reps } = setInfo;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Number</label>
        <input
          type="number"
          placeholder="Set Number"
          name="number"
          value={number}
          onChange={handleChanges}
        />
        <br />
        <label htmlFor="name">Weight (lbs.)</label>
        <input
          type="number"
          placeholder="Weight (lbs)"
          name="weight"
          value={weight}
          onChange={handleChanges}
        />
        <br />
        <label htmlFor="name">Reps</label>
        <input
          type="number"
          placeholder="Reps"
          name="reps"
          value={reps}
          onChange={handleChanges}
        />
        <br />
        <button type="submit">Add Set</button>
      </form>
    </div>
  );
};

export default SetForm;
