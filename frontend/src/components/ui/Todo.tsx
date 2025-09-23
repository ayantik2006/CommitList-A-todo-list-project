import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Todo({ id, todoContent, editedTime, isChecked }) {
  const [checked, setChecked] = useState(isChecked);
  const [time,setTime]=useState(editedTime)
  const navigate = useNavigate();
  const pRef = useRef(null);
  return (
    <div className="w-66 sm:w-146 md:w-176 h-fit bg-gray-300 rounded p-2">
      <div className="flex justify-between">
        <p className="text-gray-500 text-[0.9rem] font-semibold">
          Last Edited:{time}
        </p>
        <div className="text-[0.9rem] flex gap-3">
          <button className="text-gray-500 cursor-pointer">
            <i
              className="fa-solid fa-pen-to-square"
              onClick={(e) => {
                const style = e.target.parentNode.style;
                if (e.target.classList.contains("fa-pen-to-square")) {
                  e.target.classList.remove("fa-pen-to-square");
                  e.target.classList.add("fa-floppy-disk");
                  e.target.parentNode.style.color = "green";
                  pRef.current.contentEditable = true;
                  pRef.current.focus();
                  pRef.current.style.outline = "none";
                  pRef.current.style.backgroundColor = "white";
                  const range = document.createRange();
                  const selection = window.getSelection();
                  range.selectNodeContents(pRef.current);
                  range.collapse(false);
                  selection.removeAllRanges();
                  selection.addRange(range);
                } else if (e.target.classList.contains("fa-floppy-disk")) {
                  e.target.classList.remove("fa-floppy-disk");
                  e.target.classList.add("fa-pen-to-square");
                  e.target.parentNode.style = style;
                  pRef.current.contentEditable = false;
                  pRef.current.style.backgroundColor = "#d1d5dc";
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
                  fetch("http://localhost:8080/todo/update-content", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      id: id,
                      todoContent: pRef.current.innerText,
                      editedTime: dateTime,
                    }),
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      if (res.msg === "logged out") {
                        navigate("/signin");
                      }
                      else{
                        setTime(res.editedTime);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }}
            ></i>
          </button>
          <button className="text-gray-500 cursor-pointer hover:text-red-900 duration-300">
            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                if (e.target.classList.contains("fa-trash")) {
                  const style = e.target.parentNode.style;
                  e.target.classList.remove("fa-trash");
                  e.target.classList.add("fa-check");
                  e.target.parentNode.style.color = "#82181a";
                  setTimeout(() => {
                    e.target.classList.remove("fa-check");
                    e.target.classList.add("fa-trash");
                    e.target.parentNode.style = style;
                  }, 4000);
                } else if (e.target.classList.contains("fa-check")) {
                  e.target.parentNode.parentNode.parentNode.parentNode.remove();
                  fetch("http://localhost:8080/todo/delete", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      id: id,
                    }),
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      if (res.msg === "logged out") {
                        navigate("/signin");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }}
            ></i>
          </button>
        </div>
      </div>
      <div
        className={`text-[1.08rem] ${checked ? "line-through" : ""} ${
          checked ? "text-gray-500" : ""
        } flex`}
      >
        <input
          type="checkbox"
          className="mr-2 scale-130 accent-green-600 cursor-pointer"
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            fetch("http://localhost:8080/todo/update-checked", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isChecked: e.target.checked, id: id }),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.msg === "logged out") {
                  navigate("/signin");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        />
        <p ref={pRef} className="text-[1.1rem]">
          {todoContent}
        </p>
      </div>
    </div>
  );
}

export default Todo;
