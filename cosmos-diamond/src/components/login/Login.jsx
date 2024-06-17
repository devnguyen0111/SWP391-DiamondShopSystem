import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import {
  GoogleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { apiHeader } from "../urlApiHeader";
import { alertFail } from "../../hooks/useNotification";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/counterSlice";

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
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  const dispatch = useDispatch();

  const onSubmit = async (value) => {
    try {
      const response = await api.post("/api/Authentication/login", value);
      localStorage.setItem("token", response.data.token);
      const user = jwtDecode(response.data.token);
      const responseUser = await api.get(`/api/Customer/${user.UserID}`);
      console.log("Login: ", responseUser);
      //redux
      dispatch(login(user));
      if (user.Role === "customer") {
        navigate("/");
      }
      if (user.Role === "admin") {
        navigate("/dashboard");
      }
      // if (user.Role === "salestaff") {
      //   navigate("/dashboard");
      // }
      if (user.Role === "manager") {
        navigate("/dashboard/manager");
      }
    } catch (e) {
      console.log(e);
      alertFail(e.response.data, "Please Try Again");
    }
  };

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
          <span>Don't have an account?</span> <Link to="/sign-up">Sign Up</Link>
        </p>
        <p className="back-to-home">
          <Link to="/">Back to Home Page</Link>
        </p>
      </div>
      {isLoading && <LoadingScreen text={"Authorizing..."} />}
    </div>
  );
};

export default Login;

  // const onSubmit = (data) => {
  //   // let token = await axios.post("https://localhost:7262/api/Authentication/login",{
  //   //   headers:{
  //   //     "Content-type": "application/json; charset=UTF-8",
  //   //   }
  //   // })
  //   setIsLoading(true);
  //   fetch(`${apiHeader}/Authentication/login`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: data.email,
  //       password: data.password,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {

  //       localStorage.setItem("token", json.token);
  //       setAccount(jwtDecode(json.token));

  //     })
  //     .catch(error =>{
  //       setIsLoading(false)
  //       console.log(error.message);
  //     })
  // };

  // // // Logic xử lý đăng nhập
  // if (account && account.Role === 'customer') {
  //   fetch(`${apiHeader}/Customer/${account.UserID}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setIsLoading(false);
  //       console.log(data);
  //       localStorage.setItem("customer", JSON.stringify(data));
  //       navigate("/");
  //     });
  // }
