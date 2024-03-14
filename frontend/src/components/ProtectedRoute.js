import React, { useContext} from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { GlobalContext } from "../App";
import { request } from '../utils/helpers'
import {pathPermissions} from '../enums/pathPermission'

const ProtectedRoute = ({
    redirectPath = '/login',
    children,
  }) => {

    const global_context = useContext(GlobalContext)
    const credentials = JSON.parse(localStorage.getItem('user_credentials'))

    // check if user have the permission
    const location = useLocation()
    const pathname = location.pathname
    if (pathPermissions.hasOwnProperty(pathname)) { // check only if pathPermissions has the pathname
      const allowed = credentials?.permissions.find((value)=>{
        return value?.permission?.name === pathPermissions[pathname]
      })
      if (!allowed) {
        document.location.href = "/notAllowed"
        return
      }
      
    }

    // retrieve access token in localStorage and use it to verify if legit
    if (credentials) {
      request(`/api/user/verify`, "POST", { access_token: credentials?.access_token })
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
