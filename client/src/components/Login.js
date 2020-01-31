import React, { useState } from "react";

const Login = ({ login, history }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const { username, password } = credentials;

  const handleChanges = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await login(credentials);
    history.push("/dash");
  };

  return (
    <div>
      <h1>Login</h1>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
