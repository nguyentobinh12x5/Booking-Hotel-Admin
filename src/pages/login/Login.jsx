import { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [creadentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  console.log(creadentials);
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/auth/login",
        creadentials
      );
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({ type: "LOGIN_FAILURE", padyloadL: "You are not admin" });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <div className="login">
      <div className="lContainer">
        <h3>You can login with this admin account</h3>
        <input
          type="text"
          placeholder="admin@gmail.com"
          id="email"
          onChange={handleChange}
          className="lInput"
        ></input>
        <input
          type="password"
          placeholder="Binhvtx5@"
          id="password"
          onChange={handleChange}
          className="lInput"
        ></input>
        <button className="lButton" onClick={handleClick}>
          Login
        </button>
      </div>
    </div>
  );
};
export default Login;
