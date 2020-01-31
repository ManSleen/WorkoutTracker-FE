import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));

  return (
    <div>
      <Route
        {...rest}
        render={props => {
          if (isLoggedIn) {
            return <Component {...props} {...rest} />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/", state: { from: props.location } }}
              />
            );
          }
        }}
      />
    </div>
  );
};

export default ProtectedRoute;
