import React, { useState } from "react";

const Register = ({ register, history }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    bio: ""
  });

  const { username, password, bio } = credentials;

  const handleChanges = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await register(credentials);
    history.push("/login");
  };

  return (
    <div>
      <h1>Sign Up Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleChanges}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChanges}
        />
        <br />
        <textarea
          name="bio"
          placeholder="Bio"
          value={bio}
          onChange={handleChanges}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
