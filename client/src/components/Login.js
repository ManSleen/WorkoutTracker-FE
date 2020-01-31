import React from "react";

const Login = () => {
  return (
    <div>
      <h1>Login Form</h1>
      <form>
        <input type="text" name="username" placeholder="Username" />
        <br />
        <input type="password" name="password" placeholder="Password" />

        <br />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
