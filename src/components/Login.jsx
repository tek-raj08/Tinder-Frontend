import React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleLogin = () => {
    setIsLogin((prev) => !prev);
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          emailID: email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(response?.data?.user));
      // console.log("User: ", response?.data?.user)

      alert("Login successfull.");
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
      console.error(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailID: email, password },
        { withCredentials: true }
      );

      dispatch(addUser(response?.data?.user));
      alert("Signup successfull.")
      return navigate("/profile")
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.")
      console.error("Failed to Signup.", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-300 card-lg shadow-lg">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl my-5">
            {isLogin ? " Login" : "Signup"}
          </h2>
          <form
            className="w-full"
            onSubmit={isLogin ? handleLogin : handleSignup}
          >
            {!isLogin && (
              <>
                <legend className="fieldset-legend ">First Name: </legend>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="input focus:outline-none border border-gray-200"
                  placeholder="Enter First Name"
                />
                <legend className="fieldset-legend ">Last Name: </legend>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="input focus:outline-none border border-gray-200"
                  placeholder="Enter Last Name"
                />{" "}
              </>
            )}
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
                type={showPassword ? "text" : "password"}
                className="input outline-none border-none focus:outline-none"
                placeholder="Password"
              />
              <div onClick={togglePassword} className="me-2">
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
            <p className="text-red-600 my-2 text-center">{error}</p>
            <div className="justify-center card-actions mt-3.5">
              <button className="btn btn-primary">
                {isLogin ? "Login" : "Signup"}
              </button>
            </div>
          </form>
          <p
            className="flex flex-col justify-center items-center cursor-pointer"
            onClick={() => setIsLogin((value) => !value)}
          >
            {isLogin ? "New User? Signup Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
