import { useRef, useEffect, useState, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";
import '../css/layout.css';

export default function Layout({  }) {

  const navigate = useNavigate();
  const global_context = useContext(GlobalContext)

  const navItem = [
    {
      title: "Home",
      url: "/",
      icon: "",
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: "",
      },
    {
      title: "Containers",
      url: "/container",
      icon: "",
    },
    {
        title: "Inventory",
        url: "/inventory",
        icon: "",
    },
  ]

  const logout=()=>{
    global_context.setUser(null)
    localStorage.removeItem("user_credentials")
    navigate("/login")
  }


  return (
    <div className="">
        <nav className="nav_bar">
          {/* <div className="nav_item">
            User <img src="" />
          </div> */}
          {
            navItem.map((value)=>{
              return <a href={value.url} key={value.url} className="m-auto">
                <div className="nav_item">
                  <div className=""><img src={value.img} /></div>
                  <div className="">{value.title}</div>
                </div>
              </a>
            })
          }
          <div className="m-auto">
            {global_context.user !== null && <button className="nav_item" onClick={logout}>Logout</button>}
            {global_context.user === null && <button className="nav_item"><a href="/register">Register</a></button>}
            {global_context.user === null && <button className="nav_item"><a href="/login">Login</a></button>}
          </div>
        </nav>
        <div className="w-full">
          <Outlet />
        </div>
    </div>
  );
};
