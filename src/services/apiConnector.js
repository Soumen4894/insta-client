import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:8000/api',
//     headers: {
//         "Content-Type": "application/json",
//     },
//  });

// export const login = (data) => API.post('/auth/login', data);
// export const register = (data) => API.post('/auth/register', data);
// export const fetchPosts = () => API.get('/posts');
// export const createPost = (data) => API.post('/posts', data);

export const apiInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params)=>{
    return apiInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}