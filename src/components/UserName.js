import React from 'react'
import { apiConnector } from '../services/apiConnector'
import { authEndpoints } from '../services/apis'

const {FINDUSER_API} = authEndpoints

export default async function UserName({userId}){
    const response = await apiConnector('GET', FINDUSER_API, userId);
    const userName = response.data.userName;
    return <span className="font-semibold">{userName}</span>;

}
