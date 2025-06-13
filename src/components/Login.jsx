import React from "react";
import { useState } from "react";
import { Eye,  EyeOff } from "lucide-react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";



const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("tek@gmail.com");
  const [password, setPassword] = useState("Tek@1234");

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    try{
      const response = await axios.post(`${BASE_URL}/login`, {
        emailID: email,
        password
      },
      {
        withCredentials: true
      }
    )

    dispatch(addUser(response.data.user))
    alert("Login successfull.")
    navigate("/")
    


    }catch(err){
      console.error(err)
      console.log("Failed to submit form.")
    }

  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-300 card-lg shadow-lg">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl my-5">Login</h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <legend className="fieldset-legend ">Email ID: </legend>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="input focus:outline-none border border-gray-200"
              placeholder="Enter Email ID"
            />
            <legend className="fieldset-legend ">Password: </legend>
            <div className="flex justify-between items-center border border-gray-200 rounded">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : 'password'}
                className="input outline-none border-none focus:outline-none"
                placeholder="Password"
              />
              <div onClick={togglePassword} className="me-2">
              {showPassword ? <Eye/> : <EyeOff/>}

              </div>
            </div>
            <div className="justify-end card-actions mt-3.5">
            <button className="btn btn-primary">login</button>
          </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
