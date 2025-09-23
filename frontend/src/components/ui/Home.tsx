import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Todo from "./Todo.tsx";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // loading state to prevent flash
  const [todoList, setTodoList] = useState<string[]>([]);
  const [todoIdList, setTodoIdList] = useState<string[]>([]);
  const [editedTime, setEditedTime] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  // Auth + fetch todos in proper sequence
  useEffect(() => {
    // 1️⃣ Check user authentication
    fetch("https://commitlist-backend.onrender.com/auth/user", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "success") {
          setIsLoggedIn(true);

          // 2️⃣ Fetch todos only after auth success
          fetch("https://commitlist-backend.onrender.com/todo/read", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.msg === "success") {
                const userData = res.data;
                setTodoList(userData.map((d: any) => d.todoContent));
                setTodoIdList(userData.map((d: any) => d._id));
                setEditedTime(userData.map((d: any) => d.editedTime));
                setIsChecked(userData.map((d: any) => d.isChecked));
              } else if (res.msg === "logged out") {
                navigate("/signin");
              }
            })
            .catch((err) => console.log(err));
        } else {
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/signin");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // Render loading screen while auth check is in progress
  if (loading) return <div>Loading...</div>;

  // Main Home Page JSX
  return (
    <div className="bg-black min-h-screen w-screen flex flex-col items-center">
      {/* Header */}
      <div className="w-full h-10 bg-gray-800 border-b-1 border-gray-600 flex flex-row-reverse">
        <button
          className="mr-5 text-gray-400 cursor-pointer hover:scale-[1.05] duration-300 hover:text-gray-200"
          onClick={() => {
            fetch("https://commitlist-backend.onrender.com/auth/signout", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            })
              .then((res) => res.json())
              .then(() => navigate("/signin"))
              .catch((err) => console.log(err));
          }}
        >
          <i className="fa-solid fa-right-from-bracket"></i>&nbsp; Sign out
        </button>
      </div>

      {/* Title */}
      <h1 className="text-green-400 font-bold text-4xl mt-20">CommitList</h1>

      {/* Input */}
      <span className="bg-gray-500 p-1 rounded pb-0 mt-5">
        <textarea
          className="bg-gray-800 rounded h-9 w-70 sm:w-150 md:w-180 outline-none text-white p-1 pl-2"
          placeholder="Create your task"
          autoFocus
          ref={inputRef}
        ></textarea>
      </span>
      <button
        className="bg-green-500 w-70 sm:w-150 md:w-180 mt-2 rounded h-8 font-bold text-[1.2rem] cursor-pointer hover:bg-green-600 duration-300"
        onClick={() => {
          if (!inputRef.current || inputRef.current.value.trim() === "") {
            toast.warn("Can't create empty task!");
            return;
          }
          const now = new Date();
          const dateTime =
            now.getDate() +
            "/" +
            (now.getMonth() + 1) +
            "/" +
            now.getFullYear() +
            ", " +
            now.getHours() +
            ":" +
            now.getMinutes();

          fetch("https://commitlist-backend.onrender.com/todo/create", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              todoContent: inputRef.current.value,
              editedTime: dateTime,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.msg === "success") {
                setTodoIdList([res.id, ...todoIdList]);
                setTodoList([inputRef.current.value, ...todoList]);
                setEditedTime([dateTime, ...editedTime]);
                setIsChecked([false, ...isChecked]);
                inputRef.current.value = "";
              } else if (res.msg === "logged out") {
                navigate("/signin");
              }
            })
            .catch((err) => console.log(err));
        }}
      >
        <i className="fa-solid fa-plus"></i> Add Task
      </button>

      {/* Todo List */}
      <div className="w-70 sm:w-150 md:w-180 h-fit mt-3 rounded p-2 bg-gray-600 flex flex-col gap-2">
        {todoList.map((item, index) => (
          <Todo
            id={todoIdList[index]}
            todoContent={item}
            key={todoIdList[index]}
            editedTime={editedTime[index]}
            isChecked={isChecked[index]}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
