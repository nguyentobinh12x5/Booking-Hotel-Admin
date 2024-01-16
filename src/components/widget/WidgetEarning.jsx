import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import useFetch from "../../hooks/useFetch";
const WidgetEarning = () => {
  const { data } = useFetch("http://localhost:8800/transaction");
  const amount = data.reduce((acc, item) => acc + item.price, 0);
  //data
  //temporary
  const diff = 20;

  return (
    <div className="widget">
      <div className="left">
        <span className="title">Earning</span>
        <span className="counter">$ {amount}</span>
        <span className="link">View net earnings</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        <MonetizationOnOutlinedIcon
          className="icon"
          style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
        />
      </div>
    </div>
  );
};

export default WidgetEarning;
