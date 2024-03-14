import React, { useContext} from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { base } from '../constants'
import { GlobalContext } from "../App";
import { request } from '../utils/helpers'

const ProtectedRoute = ({
    redirectPath = '/login',
    children,
  }) => {

    // retrieve access token in localStorage and use it to verify if legit
    const global_context = useContext(GlobalContext)
    const credentials = localStorage.getItem('user_credentials')
    if (credentials) {
      const credentials_JSON = JSON.parse(credentials)
      request(`/api/user/verify`, "POST", { access_token: credentials_JSON?.access_token })
        .then((result)=>{
          if (!result.success) {
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
