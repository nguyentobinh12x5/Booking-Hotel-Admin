import "./editRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Base_URL from "../../hooks/Base_URL";
const EditRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { data } = useFetch(`http://localhost:8800/room/${id}`);
  const { title, price, maxPeople, roomNumbers, desc } = data;
  let roomNumbersArray;
  if (roomNumbers) {
    roomNumbersArray = roomNumbers.map((room) => room.number);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const price = form.price.value;
    const maxPeople = form.maxPeople.value;
    const desc = form.desc.value;
    const rooms = form.roomNumbers.value;
    const roomNumbers = rooms.split(",").map((room) => ({
      number: room.trim(),
    }));
    try {
      const updateRoom = {
        title,
        price,
        maxPeople,
        desc,
        roomNumbers,
      };
      await axios.patch(`${Base_URL}/room/update/${id}`, updateRoom);
      navigate("/room");
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
          <h1>Edit Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Title</label>
                <input
                  defaultValue={title}
                  id="title"
                  type="text"
                  name="title"
                  required
                />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  defaultValue={price}
                  id="price"
                  type="number"
                  name="price"
                  required
                />
              </div>
              <div className="formInput">
                <label>Max People</label>
                <input
                  defaultValue={maxPeople}
                  id="maxPeople"
                  type="number"
                  name="maxPeople"
                  required
                />
              </div>
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  placeholder="give comma between two rooms"
                  required
                  defaultValue={roomNumbersArray}
                  id="roomNumbers"
                  name="roomNumbers"
                ></textarea>
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  defaultValue={desc}
                  id="desc"
                  type="text"
                  name="desc"
                  required
                />
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
