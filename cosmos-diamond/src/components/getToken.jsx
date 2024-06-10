import { jwtDecode } from "jwt-decode";

export const token = localStorage.getItem('token') && jwtDecode(localStorage.getItem('token'))