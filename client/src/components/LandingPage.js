import React from "react";
import { Route, Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <Link to="/register">Register</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
};

export default LandingPage;
