import React from "react";

const Register = () => {
  return (
    <div>
      <h1>Sign Up Form</h1>
      <form>
        <input type="text" name="username" placeholder="Username" />
        <br />
        <input type="password" name="password" placeholder="Password" />
        <br />
        <textarea name="bio" placeholder="Bio" />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
