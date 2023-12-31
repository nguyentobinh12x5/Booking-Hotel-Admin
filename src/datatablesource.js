export const userColumns = [
  { field: "_id", headerName: "ID", width: 300 },
  {
    field: "user",
    headerName: "User",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              params.row.img ||
              "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
            }
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "isAdmin",
    headerName: "Role",
    width: 100,
    renderCell: (params) => {
      return <div>{params.row.isAdmin ? "Admin" : "Customer"}</div>;
    },
  },
];
export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 200 },
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];
export const roomColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 300,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
export const transactionColumns = [
  { field: "_id", headerName: "ID", width: 100 },
  {
    field: "fullname",
    headerName: "Fullname",
    width: 150,
  },
  {
    field: "HotelId",
    headerName: "Name",
    width: 250,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.hotelId?.name}`}>
          {params.row.hotelId?.name}
        </div>
      );
    },
  },
  {
    field: "room",
    headerName: "Room",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.room}`}>
          {params.row.room?.map((room) => room.number).join(", ")}
        </div>
      );
    },
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
    renderCell: (params) => {
      return `${new Date(params.row.dateStart).toLocaleDateString(
        "vi-VN"
      )} - ${new Date(params.row.dateEnd).toLocaleDateString("vi-VN")}`;
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "payment",
    headerName: "Payment Method",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
