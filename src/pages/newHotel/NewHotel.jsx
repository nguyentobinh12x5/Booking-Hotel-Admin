import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
const NewHotel = ({ inputs, title }) => {
  const [files, setFiles] = useState("");
  const [infor, setInfor] = useState({});
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const { data, loading } = useFetch(`http://localhost:8800/room`);
  const handleChange = (e) => {
    setInfor((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("cloud_name", "dteef5ei8");
          data.append("upload_preset", "booking-application");
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dteef5ei8/image/upload",
            data
          );
          const { url } = res.data;
          return url;
        })
      );
      const newHotel = {
        ...infor,
        rooms,
        photos: list,
      };
      await axios.post("http://localhost:8800/hotel", newHotel);
      navigate("/hotel");
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
                files
                  ? URL.createObjectURL(files[0])
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
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false} defaultValue>
                    No
                  </option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" onChange={handleSelect} multiple>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option value={room._id} key={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
