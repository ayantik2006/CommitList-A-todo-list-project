import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [showPass1, setShowPass1] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center items-center">
      <form
        className="flex flex-col justify-center items-center"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          fetch("https://commitlist-backend.onrender.com/auth/signin", {
            method: "POST",
            credentials:"include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.get("email"),
              password: data.get("password")
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if(res.msg==="failure"){
                toast.error("Incorrect credentials!");
              }
              else if(res.msg==="success"){
                navigate("/home");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {/* main box */}
        <h1 className="text-white text-3xl font-bold">
          Sign in to your account
        </h1>
        <p className="text-gray-500 relative top-[1rem]">
          Enter your email below to create your account
        </p>
        <span className="relative top-[2rem]">
          <i className="fa-solid fa-envelope text-gray-500 z-10 relative left-[3.8%]"></i>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-80 h-9 border-1 border-gray-500 rounded-md relative left-[-3.5%] text-white pl-7 bg-gray-950"
            required
            autoFocus
          />
        </span>
        <span className="relative top-[2rem]">
          <i className="fa-solid fa-lock text-gray-500 z-10 relative left-[6%] top-[20%]"></i>
          <input
            type={showPass1 ? "text" : "password"}
            placeholder="Password"
            name="password"
            className="w-80 h-9 border-1 border-gray-500 rounded-md relative left-[-0.5%] text-white pl-7 top-2 bg-gray-950 pr-8"
            required
          />
          <button
            type="button"
            className="text-gray-500 relative left-[-8%] top-[0.4rem] hover:cursor-pointer"
            onClick={() => {
              setShowPass1(!showPass1);
            }}
          >
            <i
              className={`fa-solid ${showPass1 ? "fa-eye" : "fa-eye-slash"}`}
            ></i>
          </button>
        </span>
        <button
          className="text-white relative top-[4rem] bg-green-700 w-80 h-9 rounded-lg text-[1.2rem] font-semibold hover:bg-green-800 hover:cursor-pointer duration-300"
          type="submit"
        >
          Sign in
        </button>
      </form>
      <p className="text-gray-500 relative top-20">
        New to CommitList?
        <a
          className="text-gray-400 cursor-pointer"
          onClick={() => {
            navigate("/signup");
          }}
        >
          {" "}
          Sign up
        </a>
      </p>
    </div>
  );
}

export default Signin;
