import React, { useContext, useEffect, useState } from "react";
import { postEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import { FcLike } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { FcDislike } from "react-icons/fc";
import Login from "./Login";
import { FaHeart, FaComment, FaPaperPlane, FaBookmark } from "react-icons/fa";
import { postContext } from "../context/Context";
import { FaRegHeart } from "react-icons/fa";
import { addPost } from "../slice/postSlice";


const { FETCHPOST_API, LIKEPOST_API, UNLIKEPOST_API, COMMENT_API } = postEndpoints;

const Feed = () => {
  const [posts, setPosts] = useState([]);
  // const { getPosts2} = useContext(postContext)
  const userState = useSelector((state) => state.user)
  const user = userState?.user;
  const token = localStorage.getItem("token")


  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await apiConnector("GET", FETCHPOST_API);
        const shuffledPosts = response.data.sort(() => Math.random() - 0.5);
        setPosts(shuffledPosts);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };
    getPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await apiConnector('PUT',
        `${LIKEPOST_API}/${postId}`,
        user._id,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }

      );
      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
      // const updatedPost = posts.map((post) => {
      //   // post._id === postId ? { ...post, likes: response.data.likes } : post
      //   post._id === response.data._id ? response.data : post
      // })

      // console.log(updatedPost)
      // setPosts(updatedPost)
    } catch (err) {
      console.error("Failed to toggle like", err);
    }

  }
  const handleUnLike = async (postId) => {
    try {
      const response = await apiConnector('PUT',
        `${UNLIKEPOST_API}/${postId}`,
        user._id,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }

      );
      const updatedPost = response.data;
      console.log(updatedPost)
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
      console.log(posts)
      // const updatedPost = posts.map((post) => {
      //   // post._id === postId ? { ...post, likes: response.data.likes } : post
      //   post._id === response.data._id ? response.data : post
      // })
      // console.log(updatedPost)
      // setPosts(updatedPost)
    } catch (err) {
      console.error("Failed to toggle like", err);
    }
  }

  const handleAddComment = async (postId, commentText) => {
    if (!commentText.trim()) return;

    try {
      const data = new FormData();
      data.append("userId", user._id)
      data.append("comment", commentText)
      data.append("userName", user.userName)
      const response = await apiConnector("POST", `${COMMENT_API}/${postId}`, data,{
        "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
      });

      const updatedComments = response.data;

      // Update the specific post's comments in the state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, comments: updatedComments } : post
        )
      );
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };



  return (
    <>
      {user && user._id ? (
        <div className="bg-gray-50 mt-12">
          <div className="container max-w-2xl py-4 mx-auto">
            {posts.map((post, index) => (
              <div
                key={index}
                className="mb-8 bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <div className="flex items-center p-4">
                  <img
                    src={post.userId.profilePicture ? post.userId.profilePicture : post.image}
                    alt="User avatar"
                    className="w-10 h-10 mr-3 rounded-full"
                  />
                  <span className="font-semibold">{
                    post.userId.userName
                    // console.log(post)
                  }</span>
                </div>
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full border-t border-b border-gray-300"
                />
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex space-x-4">
                    <div>
                      {post.likes.includes(user._id) ? <FaHeart className="w-6 h-6 cursor-pointer" color="red"
                        onClick={() => handleUnLike(post._id)}
                      />
                        :
                        <FaRegHeart className="w-6 h-6 cursor-pointer"
                          onClick={() => handleLike(post._id)}
                        />}
                    </div>

                    {/* <FaComment className="w-6 h-6 cursor-pointer hover:text-gray-800" /> */}
                    <div className="p-4 space-y-4 border-t">
                      <div className="space-y-2">
                        {post.comments.map((comment, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-semibold">{comment.userId.username}:</span> {comment.text}
                          </div>
                        ))}
                      </div>
                      {/* Add Comment */}
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          className="w-full border rounded-md p-2 text-sm"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              // handleAddComment(post._id, e.target.value);
                              e.target.value = "";
                            }
                          }}
                        />
                        <button
                          className="text-blue-500 font-medium"
                          onClick={(e) => {
                            const input = e.target.previousSibling;
                            // handleAddComment(post._id, input.value);
                            input.value = "";
                          }}
                        >
                          Post
                        </button>
                      </div>
                    </div>



                    {/* <FaPaperPlane className="w-6 h-6 cursor-pointer hover:text-gray-800" /> */}
                  </div>

                  <FaBookmark className="w-6 h-6 cursor-pointer hover:text-gray-800" />
                </div>
                <div className="px-4 py-2">
                  <p>
                    <span className="font-semibold"></span> {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Login />
      )}

    </>
  );
};

export default Feed;

/*

<div className="bg-gray-50">
      <div className="container max-w-2xl py-4 mx-auto">
        {posts.map((post) => (
          <div
            key={post.id}
            className="mb-8 bg-white border border-gray-300 rounded-md shadow-sm"
          >
          //  Header
            <div className="flex items-center p-4">
              <img
                src={post.image}
                alt="User avatar"
                className="w-10 h-10 mr-3 rounded-full"
              />
              <span className="font-semibold">abc</span>
            </div>
            //  Post Image 
            <img
              src={post.image}
              alt="Post"
              className="w-full border-t border-b border-gray-300"
            />
          //  Actions
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex space-x-4">
                <FaHeart className="w-6 h-6 cursor-pointer hover:text-red-500" />
                <FaComment className="w-6 h-6 cursor-pointer hover:text-gray-800" />
                <FaPaperPlane className="w-6 h-6 cursor-pointer hover:text-gray-800" />
              </div>
              <FaBookmark className="w-6 h-6 cursor-pointer hover:text-gray-800" />
            </div>
            //  Caption 
            <div className="px-4 py-2">
              <p>
                <span className="font-semibold">abc</span> {post.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

*/
