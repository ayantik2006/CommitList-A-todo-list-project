import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Todo from "./Todo.tsx";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [todoIdList, setTodoIdList] = useState([]);
  const [editedTime, setEditedTime] = useState([]);
  const [isChecked, setisChecked] = useState([]);
  const inputRef = useRef(null);
  useEffect(() => {
    fetch("https://commitlist-backend.onrender.com/auth/user", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "success") {
          setIsLoggedIn(true);
        } else if (res.msg === "failure") {
          navigate("/signin");
        }
      });
  }, []);
  if (isLoggedIn)
    useEffect(() => {
    fetch("https://commitlist-backend.onrender.com/todo/read", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "logged out") {
          navigate("/signin");
        } else if (res.msg === "success") {
          const userData = res.data;
          let todoList2 = [];
          let todoIdList2 = [];
          let editedTime2 = [];
          let isChecked2 = [];
          for (const data of userData) {
            todoList2.push(data.todoContent);
            todoIdList2.push(data._id);
            editedTime2.push(data.editedTime);
            isChecked2.push(data.isChecked);
          }
          setTodoList(todoList2);
          setTodoIdList(todoIdList2);
          setEditedTime(editedTime2);
          setisChecked(isChecked2);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
    return (
      <div className="bg-black min-h-screen w-screen flex flex-col items-center">
        <div className="w-full h-10 bg-gray-800 border-b-1 border-gray-600 flex flex-row-reverse ">
          <button
            className="mr-5 text-gray-400 cursor-pointer hover:scale-[1.05] duration-300 hover:text-gray-200"
            onClick={() => {
              fetch("http://localhost:8080/auth/signout", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
              })
              .then((res)=>res.json())
              .then((res)=>{
                navigate("/signin");
              })
              .catch((err)=>{console.log(err)})
            }}
          >
            <i className="fa-solid fa-right-from-bracket "></i>
            &nbsp; Sign out
          </button>
        </div>
        <h1 className="text-green-400 font-bold text-4xl mt-20">CommitList</h1>
        <span className="bg-gray-500 p-1 rounded pb-0 mt-5">
          <textarea
            className="bg-gray-800 rounded h-9 w-70 sm:w-150 md:w-180 outline-none text-white p-1 pl-2"
            placeholder="Create your task"
            autoFocus
            ref={inputRef}
          ></textarea>
        </span>
        <button
          className="bg-green-500 w-70 sm:w-150 md:w-180 mt-2 rounded h-8 font-bold text-[1.2rem] cursor-pointer hover:bg-green-600 duration-300 "
          onClick={() => {
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
                  setisChecked([false, ...isChecked]);
                  inputRef.current.value = "";
                } else if (res.msg === "logged out") {
                  console.log(res.msg);
                  navigate("/signin");
                } else if (res.msg === "empty") {
                  toast.warn("Can't create empty task!");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <i className="fa-solid fa-plus"></i>
          Add Task
        </button>

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
