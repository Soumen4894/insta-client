import React, { createContext, useState } from 'react'
import { apiConnector } from '../services/apiConnector';
import { postEndpoints } from '../services/apis';
import { addPost } from '../slice/postSlice';
import { useDispatch } from 'react-redux';

const { FETCHPOST_API} = postEndpoints;

export const postContext = createContext();

export const Context = (props) => {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const getPosts2 = async () => {
        try {
            const response = await apiConnector("GET", FETCHPOST_API);
            setPosts(response.data);
            // console.log(response.data)
            dispatch(addPost(response.data))
        } catch (error) {
            console.error("Failed to fetch posts", error);
        }
    };
    // console.log(posts[1]._id)

return (
    <postContext.Provider value={{posts, getPosts2}}>
        {props.children}
    </postContext.Provider>
)
}

