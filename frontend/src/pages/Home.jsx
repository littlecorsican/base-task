import { useRef, useEffect, useState, useContext } from "react";
import '../css/home.css';

export default function Home() {

  return (
    <div className="background-space text-center pt-[30vh] min-h-screen text-white">
        <h2>Inventory Management System</h2>

        <div className="mt-[10vh] flex flex-row justify-evenly">
            <a href="/login" className="btn">Login</a>
            <a href="/login" className="btn">Register</a>
        </div>

    </div>  
  );
};
