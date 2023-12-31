import "./editHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const EditHotel = () => {
  const [files, setFiles] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { data } = useFetch(`http://localhost:8800/hotel/find/${id}`);
  const {
    name,
    title,
    type,
    city,
    address,
    distance,
    desc,
    rating,
    cheapestPrice,
    featured,
  } = data;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const title = form.title.value;
    const type = form.type.value;
    const city = form.city.value;
    const address = form.address.value;
    const distance = form.distance.value;
    const desc = form.desc.value;
    const rating = form.rating.value;
    const cheapestPrice = form.cheapestPrice.value;
    const featured = form.featured.value;
    let photos;
    try {
      if (files) {
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
        photos = list;
      }
      const updateHotel = {
        name,
        title,
        type,
        city,
        address,
        distance,
        desc,
        rating,
        cheapestPrice,
        featured,
        ...(photos && { photos }),
      };
      await axios.patch(
        `http://localhost:8800/hotel/update/${id}`,
        updateHotel
      );
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
          <h1>Edit Hotel</h1>
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
              <div className="formInput">
                <label>Name</label>
                <input
                  defaultValue={name}
                  id="name"
                  type="text"
                  name="name"
                  required
                />
              </div>
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
                <label>type</label>
                <input
                  defaultValue={type}
                  id="type"
                  type="text"
                  name="type"
                  required
                />
              </div>
              <div className="formInput">
                <label>City</label>
                <input
                  defaultValue={city}
                  id="city"
                  type="text"
                  name="city"
                  required
                />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input
                  defaultValue={address}
                  id="address"
                  type="text"
                  name="address"
                  required
                />
              </div>
              <div className="formInput">
                <label>Distance</label>
                <input
                  defaultValue={distance}
                  id="distance"
                  type="number"
                  name="distance"
                  required
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <textarea
                  defaultValue={desc}
                  id="desc"
                  type="text"
                  name="desc"
                  required
                />
              </div>
              <div className="formInput">
                <label>Rating</label>
                <input
                  defaultValue={rating}
                  id="rating"
                  type="number"
                  name="rating"
                  required
                />
              </div>
              <div className="formInput">
                <label>Cheapest Price</label>
                <input
                  defaultValue={cheapestPrice}
                  id="cheapestPrice"
                  type="text"
                  name="cheapestPrice"
                  required
                />
              </div>
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" defaultValue={featured}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHotel;
