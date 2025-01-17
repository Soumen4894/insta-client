import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading:false,
    error:null 
};

const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        setPosts:(state, action)=>{
            state.posts = action.payload;
        },
        addPost:(state, action)=>{
            state.posts.push(action.payload);
        },
        deletePost:(state, action)=>{
            state.posts = state.posts.filter(post => post.id !== action.payload)
        },
        stareLoading:(state)=>{
            state.loading = true;
        },
        endLoading: (state)=>{
            state.loading = false;
        },
        setError:(state, action)=>{
            state.posts = action.payload
        }
    }
})
export const {
    setPosts,
    addPost,
    deletePost,
    stareLoading,
    endLoading,setError
} = postSlice.actions;

export default postSlice.reducer;