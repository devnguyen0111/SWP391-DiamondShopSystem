import React, { useEffect, useState } from "react";
import "./Login.css";
import {
  GoogleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// Định nghĩa schema xác thực
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [account, setAccount] = useState(null)
  
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const  onSubmit =  (data) => {
    // let token = await axios.post("https://localhost:7262/api/Authentication/login",{
    //   headers:{
    //     "Content-type": "application/json; charset=UTF-8",
    //   }
    // })
    fetch("https://localhost:7262/api/Authentication/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        
        
        localStorage.setItem('token', json.token)
        setAccount(jwtDecode(json.token))
        console.log(jwtDecode(json.token));

  })
}
    
    // Logic xử lý đăng nhập
    if(account){
      fetch(`https://localhost:7262/api/Authentication/customers/1`, {
        method: 'POST',
        body: JSON.stringify({
          id: account.UserID,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      })
      .then(res => res.json())
      .then(data =>{
        console.log(data)
        console.log(localStorage.getItem("token"));
        navigate("/")
      })
    }
     
    
    
    
  
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Sign in to Cosmos Diamonds</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email Address *</label>
          <input
            type="text"
            placeholder="Email Address"
            {...register("email")}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}

          <div className="password-container">
            <label>Password *</label>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
            />
            <span
              className="password-toggle-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            </span>
          </div>
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}

          <div className="remember-forgot">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit">Sign In</button>
          <Divider orientation="center" style={{ borderColor: "grey" }}>
            <span id="sign-up">or Sign up with</span>
          </Divider>
          <button className="google-login">
            <GoogleOutlined /> Sign In with Google
          </button>
        </form>
        <p className="signup">
          <span>Don't have an account?</span> <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
