const BASEURL = "http://localhost:8000/api";
//Auth Endpoints

export const authEndpoints = {
    LOGIN_API: BASEURL + "/auth/login",
    REGISTER_API: BASEURL + "/auth/register",
    FINDUSER_API: BASEURL + "/auth"
}

export const postEndpoints = {
    FETCHPOST_API: BASEURL + "/posts",
    CREATEPOST_API: BASEURL + "/posts",
    LIKEPOST_API:BASEURL + "/posts/like",
    UNLIKEPOST_API:BASEURL + "/posts/unlike",
    COMMENT_API: BASEURL + "/posts/comment"

}