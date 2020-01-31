import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../util/axiosWithAuth";

const Dashboard = ({ history }) => {
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const init = async () => {
      const res = await axiosWithAuth().get(`users/${userId}`);
      setUserInfo(res.data);
    };
    init();
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      {userInfo && <h2>Welcome {userInfo.username}</h2>}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          history.push("/");
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
