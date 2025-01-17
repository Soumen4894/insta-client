import React, { useState } from "react";
// import { createPost } from "../services/apiConnector";
import { useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { postEndpoints } from "../services/apis";

const { CREATEPOST_API } = postEndpoints

const Upload = () => {

  const userState = useSelector((state) => state.user)
  const user = userState?.user;

  const [formData, setFormData] = useState({ description: "", image: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    const Id = user._id;
    data.append("description", formData.description);
    data.append("image", formData.image);
    data.append("userId", Id)
    // console.log(formData.description)
    console.log(formData.image);
    // console.log(Id);
    // console.log(data)
    const token = localStorage.getItem("token")
    // const token = JSON.parse(localStorage.getItem("token"))
    console.log(token);

    try {
      await apiConnector("POST", CREATEPOST_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });
      alert("Post uploaded successfully");
    } catch (error) {
      console.error("Failed to upload post", error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     placeholder="description"
    //     value={formData.description}
    //     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
    //     required
    //   />
    //   <input
    //     type="file"
    //     accept="image/*"
    //     onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
    //     required
    //   />
    //   <button type="submit">Upload</button>
    // </form>

    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="mb-4 text-xl font-bold text-center text-gray-700">Create a New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Caption</label>
            <textarea
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              rows="3"
              placeholder="Write a caption..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            ></textarea>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Upload Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;

/*
<div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="mb-4 text-xl font-bold text-center text-gray-700">Create a New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Caption</label>
            <textarea
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              rows="3"
              placeholder="Write a caption..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            ></textarea>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Upload Post
          </button>
        </form>
      </div>
    </div>
*/