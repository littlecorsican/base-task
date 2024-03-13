import React, { PropsWithChildren , useContext} from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { base } from '../constants'
import { GlobalContext } from "../App";

const ProtectedRoute = ({
    redirectPath = '/login',
    children,
  }) => {

    const global_context = useContext(GlobalContext)
    const credentials = localStorage.getItem('user_credentials')
    if (credentials) {
      const credentials_JSON = JSON.parse(credentials)
      console.log("access_token", credentials_JSON?.access_token)
      fetch(`${base}/api/user/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: credentials_JSON?.access_token }),
      }).then((response)=>{
        return response.json()
      }).then((response)=>{
        console.log("response", response)
        if (response.success === 0) {
          global_context.setUser(null)
          localStorage.removeItem("user_credentials")
          document.location.href = "/login"
        }
      }).catch((err)=> {
        console.log("err", err)
        global_context.setUser(null)
        localStorage.removeItem("user_credentials")
        document.location.href = "/login"
      })
    } else {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
};

export default ProtectedRoute
