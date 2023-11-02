import { useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import Quiz from './Quiz'
import 'react-toastify/dist/ReactToastify.css';
function Home() {
  const navigate = useNavigate();   
  const [name,setName] = useState("");
  const isNameEntered = name.trim() !== "";
  let handleChange=(e)=>{
    setName(e.target.value);
  }

  const handleSubmit = () =>{
    if(isNameEntered==""){
        toast.warn("Enter Player Name")
    }else{
        navigate("/quiz", { state: { name } });
    }
  }

//   if(isNameEntered==""){
//     alert("Enter Name to Play Game")
//   }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Player Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="PlayerName"
              name='name'
              onChange={handleChange}
              value={name}
            />
          </div>

          <div className="flex justify-center items-center">
            <button  onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"type="button">Play
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
