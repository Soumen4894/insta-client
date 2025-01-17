import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { authEndpoints } from "../services/apis";

const { REGISTER_API } = authEndpoints;

const Register = () => {
  const [formData, setFormData] = useState({email: "", name: "", userName: "",  password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const { email, name,  userName, password } = formData
      const response = await apiConnector("POST", REGISTER_API, {
        email, name, userName,  password
      });
      console.log("Registration successful:", response);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-6">
        {/* //  Logo */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
          alt="Instagram logo"
          className="w-40"
        />
        {/* //  Signup Form */}
        <div className="w-full max-w-xs p-4 bg-white border border-gray-300 rounded-md">
          <h2 className="mb-4 text-lg font-bold text-center text-gray-700">
            Sign up to see photos and videos from your friends.
          </h2>
          {/* <button
            className="flex items-center justify-center w-full px-4 py-2 mb-4 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Log in with Facebook
          </button> */}
          <div className="flex items-center mb-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            {/* <span className="px-4 text-xs text-gray-500">OR</span> */}
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={formData.userName}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              {loading ? "loading..." : "Sign Up"}
            </button>
          </form>
          <div className="flex items-center mb-4 mt-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        </div>

        
        {/* //  Login Redirect */}
        <div className="w-full max-w-xs p-4 text-sm text-center bg-white border border-gray-300 rounded-md">
          Have an account? <Link to="/login" className="font-bold text-blue-500 hover:underline">Log in</Link>
        </div>
      </div>
    </div>

  );
};

export default Register;