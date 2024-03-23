import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarMenu from "../Sidebar/SidebarMenu";
import SideBar from "../Sidebar/SideBar";
import { MdWidthFull } from "react-icons/md";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    /*axios.get("http://localhost:3000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });*/
    localStorage.removeItem("valid");
    navigate("/");
  };
  return (
    <div className="p-0 m-0 bg-secondary bg-gradient bg-opacity-10">
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
