import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRoom = ({ inputs, title }) => {
  const [infor, setInfor] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const { data, loading } = useFetch(`http://localhost:8800/hotel`);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfor((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  console.log(rooms);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({
      number: room.trim(),
    }));
    const newRoom = {
      ...infor,
      roomNumbers: roomNumbers,
    };
    try {
      await axios.post(`http://localhost:8800/room/${hotelId}`, newRoom);
      navigate("/room");
    } catch (err) {
      console.log(err);
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
          <div className="right">
            <form onSubmit={handleSubmit}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  placeholder="give comma between two rooms"
                  onChange={(e) => setRooms(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                  required
                >
                  <option value="">Select Hotel</option>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option value={hotel._id} key={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
              <div className="formInput">
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
