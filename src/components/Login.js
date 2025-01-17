import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/apiConnector";
import { setUser } from "../slice/userSlice";
import { useDispatch } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { authEndpoints } from "../services/apis";
// import { Link } from "react-router-dom";

const {LOGIN_API} = authEndpoints

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // console.log(formData)
        const {email, password} = formData
        // console.log(email, password)
        const response = await apiConnector("POST", LOGIN_API, {
          email,password
        });
        const userData = response.data.user;
        
        // console.log(response.data.user.userName)
        dispatch(setUser(userData))
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user))
      
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-6">
        {/* // Logo */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
          alt="Instagram logo"
          className="w-40"
        />
        {/* // Login Form  */}
        <div className="w-full max-w-xs p-4 bg-white border border-gray-300 rounded-md">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Log In
            </button>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          {/* <button
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-blue-500 border border-transparent rounded-md hover:underline"
          >
            Log in with Facebook
          </button> */}
          {/* <a
            href="#"
            className="block mt-2 text-xs text-center text-blue-500 hover:underline"
          >
            Forgot password?
          </a> */}
        </div>
        {/* //  Sign Up Section  */}
        <div className="w-full max-w-xs p-4 text-sm text-center bg-white border border-gray-300 rounded-md">
          Don&apos;t have an account? <Link to="/register" className="font-bold text-blue-500 hover:underline">Sign up</Link>
        </div>
      </div>
    </div>

  );
};

export default Login;