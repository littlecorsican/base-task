import { useRef, useEffect, useState, useContext } from "react";
import { GlobalContext } from "../App";

export default function NotAllowed() {


    return (
        <div className="text-center">
            <h2>Not Allowed</h2>
            <img src="/images/notallowed.jpg" className="m-auto" />
            <h4>The page you are looking for is off limits to you</h4>
        </div>
    );
};
