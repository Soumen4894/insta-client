import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCog } from "react-icons/fa";
import { apiConnector } from "../services/apiConnector";
import { postEndpoints } from "../services/apis";
import SettingsDropdown from "./SettingsDropdown";
import { setUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from 'react-icons/vsc';


const {FETCHPOST_API} = postEndpoints
// import { postContext } from "../context/Context";


const Profile = () => {
  //   const user = JSON.parse(localStorage.getItem("users"));
  // const {user} = useSelector((state)=>state.user.user)
  const userState = useSelector((state) => state.user); // Get the user slice
  const user = userState?.user;
  // const posts = useSelector((state) => state.post.posts)
  const [posts, setPosts] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await apiConnector("GET", FETCHPOST_API);
                setPosts(response.data);
            } catch (error) {
                console.error("Failed to fetch posts", error);
            }
        };
    getPosts(); 
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center mt-12">
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={user.profilePictuer ? user.profilePictuer : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">{user.userName}</h2>
            {/* <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">{user.name}</h2> */}
            <div className="flex space-x-6 mt-2 justify-center md:justify-start">
              <div>
                <span className="font-bold text-gray-800">{posts.length}</span> posts
              </div>
              <div>
                <span className="font-bold text-gray-800">{user.followers.length ? user.followers : 0}</span> followers
              </div>
              <div>
                <span className="font-bold text-gray-800">{user.following.length ? user.following : 0}</span> following
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 text-center md:text-left">{user.name}</h3>
            <p className="mt-2 text-gray-600 text-center md:text-left">hope</p>
          </div>
          <button onClick={()=>{
            localStorage.removeItem("token");
            // dispatch(setUser(null));
            navigate("/login")
          }}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 absolute top-20 right-20 transform -translate-y-4 w-12"
            aria-label="Settings"
          >
            {/* <FaCog className="text-gray-600 text-xl" /> */}
            <VscSignOut className="text-lg" color="black"/>
            {/* <span>Logout</span> */}
          </button>
          {/* <SettingsDropdown/> */}
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-24">
          {posts.map((post, index) => (
            <div key={index} className="overflow-hidden rounded-md h-32 w-32">
              <img
                src={post.image}
                alt={`Post ${index + 1}`}
                className="object-cover w-full h-full cursor-pointer hover:opacity-75"
              />
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Profile;

/*

 <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        // Profile Header
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={user.profilePictuer ? user.profilePictuer : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.userName}</h2>
            <div className="flex space-x-6 mt-2">
              <div>
                <span className="font-bold text-gray-800">5</span> posts
              </div>
              <div>
                <span className="font-bold text-gray-800">{user.followers}</span> followers
              </div>
              <div>
                <span className="font-bold text-gray-800">{user.following}</span> following
              </div>
            </div>
            <p className="mt-2 text-gray-600">Hope</p>
          </div>
        </div>

        //  Gallery Section 
        <div className="grid grid-cols-3 gap-2">
          {posts.map((post, index) => (
            <div key={index} className="overflow-hidden rounded-md">
              <img
                src={post.image}
                alt={`Post ${index + 1}`}
                className="object-cover w-full h-full cursor-pointer hover:opacity-75"
              />
            </div>
          ))}
        </div>
      </div>
    </div>

*/