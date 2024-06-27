import error404 from "../images/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif";
import styled from "./index.module.css";
import { useNavigate } from "react-router-dom";
import {ApiOutlined} from "@ant-design/icons";

const NotFound = (props) => {
  const { notFoundBox, text } = styled;
  const navigateTo = useNavigate();
  const toHomeClick = () => {
    navigateTo("/");
  };
  return (
    <div className={notFoundBox}>
      <div className={text}>
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
          {props.h1Text}
        </h1>
        <div>
          <ApiOutlined className='text-primary'/>啊哦～页面消失了哦～
        </div>
        <p>不如去首页瞧一瞧</p>
        <p>
          <button onClick={toHomeClick} type="link" className='btn btn-link'>
            点这里哦～
          </button>
        </p>
      </div>
      <img src={error404} alt="" />
    </div>
  );
};
export default NotFound;
