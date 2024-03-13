import { useRef, useEffect, useState, createContext, useContext  } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Container from "./pages/Container";
import Admin from "./pages/Admin";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import { Oval } from "react-loader-spinner";
import { boolean } from "zod";
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

export const GlobalContext = createContext({
  loading: false,
  setLoading: () => {},
  toast: (text)=> {},
  user: null,
  setUser: (user)=> {},
});

export default function App() {

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(localStorage.getItem('user_credentials'))

  useEffect(()=>{
    const user = localStorage.getItem('user_credentials')
    console.log("user111", user)
    setUser(user)
  },[localStorage.getItem('user_credentials')])

  return (
    <BrowserRouter>
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass="justify-center z-50 m-auto fixed w-full h-full items-center"
        visible={loading}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
      <GlobalContext.Provider value={{
        loading,
        setLoading,
        toast,
        user,
        setUser,
      }}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                <ProtectedRoute redirectPath="/login">
                  <Home />
                </ProtectedRoute>}  />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Registration />} />
              <Route path="dashboard" element={
                <ProtectedRoute redirectPath="/login">
                  <Dashboard />
                </ProtectedRoute>} 
              />
              <Route path="container" element={
                <ProtectedRoute redirectPath="/login">
                  <Container />
                </ProtectedRoute>} 
              />
              <Route path="inventory" element={
                <ProtectedRoute redirectPath="/login">
                  <Inventory />
                </ProtectedRoute>} 
              />
              <Route path="container/:id" element={
                <ProtectedRoute redirectPath="/login">
                  <Container />
                </ProtectedRoute>} 
              />
              <Route path="inventory/:id" element={
                <ProtectedRoute redirectPath="/login">
                  <Inventory />
                </ProtectedRoute>} 
              />
              <Route path="admin" element={
                <ProtectedRoute redirectPath="/login">
                  <Admin />
                </ProtectedRoute>} 
              />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
          <ToastContainer />
        </QueryClientProvider>
      </GlobalContext.Provider>
    </BrowserRouter>
    
  );
};
