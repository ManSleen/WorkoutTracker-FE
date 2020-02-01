import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const WorkoutForm = () => {
  const [workout, setWorkout] = useState({
    name: "",
    duration: 0,
    date: Date.now()
  });

  const { userInfo, addWorkout } = useContext(UserContext);

  const handleChanges = e => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("submitted!");
    await addWorkout(workout, userInfo._id);
  };

  const { name, duration, date } = workout;
  console.log("userInfo: ", userInfo);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="name">Name</label>
        <input
          type="text"
          placeholder="Workout Name"
          name="name"
          value={name}
          onChange={handleChanges}
        />
        <label for="duration">Workout Duration</label>
        <input
          type="number"
          placeholder="Duration"
          name="duration"
          value={duration}
          onChange={handleChanges}
        />
        <label for="date">Date</label>
        <input
          type="date"
          placeholder="Duration"
          name="date"
          value={date}
          onChange={handleChanges}
        />
        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
};

export default WorkoutForm;
