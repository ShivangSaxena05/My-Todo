import React from "react";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


function addtodo() {
  let divv1 = document.getElementById("svg").classList;
  let divv = document.getElementById("input").classList;
  if (divv.contains("hidden") || divv1.contains("hidden")) {
    divv.replace("hidden", "block");
    divv1.replace("hidden", "block");
  }
}
function hideinput() {
  let divv1 = document.getElementById("svg").classList;
  let divv = document.getElementById("input").classList;
  divv1.add("hidden");
  divv.add("hidden");
}
function App() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("Todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("Todos")) 
      setTodos(todos)
    }
  }, [])
  


  const savetodos = () =>{
    localStorage.setItem("Todos", JSON.stringify(Todos))
    console.log(Todos)
  }
  
  const Toggle = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e,id) => {
    let t = Todos.filter(i=>i.id === id)
    setTodo(t[0].Todo);
    let newTodos = Todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    savetodos()
  };
  
  
  
  const handleDel = (e, id) => {
    let newTodos = Todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
    savetodos()
  };



  const handleAdd = () => {
    setTodos([...Todos, { id: uuidv4(), Todo, isCompleted: false }]);
    setTodo("");
    savetodos()
  };



  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleclick = ()=>{
    handleAdd()
    hideinput()
  }


  const handleCheck = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetodos()
  };
  return (
    <>
      <Navbar />
      <div className="md:cont font-bold bg-blue-200 rounded-xl p-10 md:w-1/2 mx-auto my-6 min-h-[80vh]">
        <h1 className="md:text-2xl text-xl mb-4">My-Todos : Manage Your Todos Here</h1>
        <div className="addtodo">
          <div className="flex items-center gap-2">
            <button
              className="bg-blue-100 mb-2 p-1 border-2 border-blue-400 rounded-xl px-2"
              onClick={addtodo}
            >
              Add Todo
            </button>

            <span
              onClick={handleclick}
              id="svg"
              className="hidden cursor-pointer"
            >
              <svg
                className="w-5 h-8"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="122.88px"
                height="122.879px"
                viewBox="0 0 122.88 122.879"
                enable-background="new 0 0 122.88 122.879"
                xml:space="preserve"
              >
                <g>
                  <path
                    fill="#FF4141"
                    d="M61.44,0c16.96,0,32.328,6.882,43.453,17.986c11.104,11.125,17.986,26.494,17.986,43.453 c0,16.961-6.883,32.328-17.986,43.453C93.769,115.998,78.4,122.879,61.44,122.879c-16.96,0-32.329-6.881-43.454-17.986 C6.882,93.768,0,78.4,0,61.439C0,44.48,6.882,29.111,17.986,17.986C29.112,6.882,44.48,0,61.44,0L61.44,0z M73.452,39.152 c2.75-2.792,7.221-2.805,9.986-0.026c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.077,12.25 c2.728,2.77,2.689,7.256-0.081,10.021c-2.772,2.766-7.229,2.758-9.954-0.012L61.445,71.541L49.428,83.729 c-2.75,2.793-7.22,2.805-9.985,0.025c-2.763-2.775-2.776-7.291-0.026-10.082L51.48,61.435l-12.078-12.25 c-2.726-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.954,0.013L61.435,51.34L73.452,39.152L73.452,39.152z M96.899,25.98C87.826,16.907,75.29,11.296,61.44,11.296c-13.851,0-26.387,5.611-35.46,14.685 c-9.073,9.073-14.684,21.609-14.684,35.459s5.611,26.387,14.684,35.459c9.073,9.074,21.609,14.686,35.46,14.686 c13.85,0,26.386-5.611,35.459-14.686c9.073-9.072,14.684-21.609,14.684-35.459S105.973,35.054,96.899,25.98L96.899,25.98z"
                  />
                </g>
              </svg>
            </span>
          </div>
          <div id="input" className="mb-4 gap-3 hidden flex">
            <input
              onChange={handleChange}
              value={Todo}
              className="border w-1/2 border-black"
              type="text"
            />
            <button
              onClick={handleAdd}
              disabled={Todo.length<=3}
              className="bg-sky-300 border disabled:bg-violet-100 hover:bg-sky-500 cursor-pointer rounded-lg px-2 border-black"
            >
              Save
            </button>
          </div>
        </div>
        <h1 className="text-lg mb-2">Your To-Dos</h1>
        <input onChange={Toggle} type="checkbox" checked={showFinished}/> <label>Show Finished Todos</label>
        <div className="todos w-full p-2">
          {Todos.length===0 && <div>No Todo To Display</div>}
          {Todos.map((item) => {
            return (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className="todo my-5 flex items-center justify-between bg-sky-200 rounded-xl p-2"
              >
                <div className="flex gap-5">
                <input
                  name={item.id}
                  onChange={handleCheck}
                  type="checkbox"
                  checked={item.isCompleted}
                  id=""
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.Todo}
                </div>
                </div>
                <div className="buttons flex gap-5">
                  <button
                    onClick={(e)=>{handleEdit(e, item.id), addtodo()}}
                    className="bg-sky-300 border h-9 w-9 flex items-center justify-center hover:bg-sky-500 cursor-pointer rounded-lg border-black"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDel(e, item.id);
                    }}
                    className="bg-sky-300 flex items-center justify-center border h-9 w-9 hover:bg-sky-500 cursor-pointer rounded-xl border-black"
                  >
                    <MdDeleteForever/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
