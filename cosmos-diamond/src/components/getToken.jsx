import { jwtDecode } from "jwt-decode";

export const token = localStorage.getItem('token') && jwtDecode(localStorage.getItem('token'))


export const getToken = ()=>{
    let token = localStorage.getItem('token')
    return token ? jwtDecode(token) : null;
}