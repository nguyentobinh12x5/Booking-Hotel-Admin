import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useLocation } from "react-router-dom";
const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data } = useFetch(`http://localhost:8800/${path}`);
  useEffect(() => {
    setList(data);
  }, [data]);
  const checkHotelIntransaction = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/transaction/hotel/${id}`
      );
      if (res.data.length > 0) {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    if (path === "hotel") {
      const confirmDelete = window.confirm("Are you sure to do this.");
      if (confirmDelete) {
        const isInTransaction = await checkHotelIntransaction(id);
        if (isInTransaction) {
          alert("This hotel is in a transaction and cannot be deleted");
        } else {
          try {
            await axios.delete(`http://localhost:8800/${path}/${id}`);
            setList(data.filter((item) => item._id !== id));
          } catch (err) {
            console.log(err);
          }
        }
      }
    } else if (path === "room") {
      const confirmDelete = window.confirm("Are you sure to do this.");
      if (confirmDelete) {
        try {
          await axios.delete(`http://localhost:8800/${path}/${id}`);
          setList(data.filter((item) => item._id !== id));
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      try {
        await axios.delete(`http://localhost:8800/${path}/${id}`);
        setList(data.filter((item) => item._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {path === "user" && (
              <Link to="/user/test" style={{ textDecoration: "none" }}>
                <div className="viewButton">View</div>
              </Link>
            )}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
            <Link
              to={`/${path}/edit/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
