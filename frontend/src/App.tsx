import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/ui/Signup";
import Signin from "./components/ui/Signin";
import Home from "./components/ui/Home";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    fetch("https://commitlist-backend.onrender.com/auth/user", {
      method: "POST",
      credentials:"include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "success") {
          navigate("/home");
          setIsLoggedIn(true);
        } else if (res.msg === "failure") {
          console.log("logged out");
          navigate("/signin");
        }
      });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Signin />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
      <ToastContainer position="bottom-center" autoClose={3000} closeButton={false} theme="dark"/>
    </>
  );
}

export default App;
