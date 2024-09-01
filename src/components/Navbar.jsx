import React from "react";

const Navbar =()=>{
    return(
        <nav className="flex justify-between bg-sky-800 text-white p-3 px-10 ">
            <div className="myTask">
                <h1 className="font-bold text-2xl">MyTasks</h1>
            </div>
            <ul className="flex text-lg gap-3 md:gap-10">
                <li className="cursor-pointer hover:font-bold transition-all transition-duration-75">Home</li>
                <li className="cursor-pointer hover:font-bold transition-all transition-duration-75">Your Tasks</li>
            </ul>
        </nav>
    )
}
export default Navbar