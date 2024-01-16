// pages/logout/Logout.js
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Logout() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  useEffect(() => {
    dispatch({ type: "LOG_OUT" });
    localStorage.removeItem("user");
    navigate("/");
  }, []);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

export default Logout;
