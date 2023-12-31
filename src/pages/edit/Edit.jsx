import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const Edit = ({ title }) => {
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { data } = useFetch(`http://localhost:8800/user/${id}`);
  const { username, email, phoneNumber, fullname } = data;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const fullname = form.fullname.value;
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;
    const password = form.password.value;
    let img;
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("cloud_name", "dteef5ei8");
        formData.append("upload_preset", "booking-application");
        try {
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dteef5ei8/image/upload",
            formData
          );
          img = res.data.url;
        } catch (err) {
          console.log(err);
        }
      }
      const updateUser = {
        username,
        fullname,
        email,
        phoneNumber,
        ...(password && { password }),
        ...(img && { img }),
      };
      await axios.patch(`http://localhost:8800/user/update/${id}`, updateUser);
      navigate("/user");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Username</label>
                <input
                  defaultValue={username}
                  id="username"
                  type="text"
                  name="username"
                  required
                />
              </div>
              <div className="formInput">
                <label>Full Name</label>
                <input
                  defaultValue={fullname}
                  id="fullname"
                  type="text"
                  name="fullname"
                  required
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  defaultValue={email}
                  id="email"
                  type="email"
                  name="email"
                  required
                />
              </div>
              <div className="formInput">
                <label>Phone Number</label>
                <input
                  defaultValue={phoneNumber}
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  required
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input id="password" type="password" name="password" />
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
