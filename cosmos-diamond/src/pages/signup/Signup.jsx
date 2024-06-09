import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Signup.css";
import {
  GoogleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Divider } from "antd";

// Định nghĩa schema xác thực
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  tel: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
});

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const nav = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  const onSubmit = (data) => {
    console.log(data);
    sessionStorage.setItem('account', JSON.stringify(data));
    nav('/pincode')
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Sign up to Cosmos Diamonds</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <label>Email Address *</label>
            <input
              type="text"
              placeholder="Email Address"
              {...register("email")}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="wrapper-input-name">
            <div className="input-container name">
              <label>First Name </label>
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="error-message">{errors.firstName.message}</p>
              )}
            </div>

            <div className="input-container name">
              <label>Last Name </label>
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="error-message">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="input-container">
            <label>Phone Number *</label>
            <input
              type="text"
              placeholder="Phone Number"
              {...register("tel")}
            />
            {errors.tel && (
              <p className="error-message">{errors.tel.message}</p>
            )}
          </div>

          <div className="input-container">
            <label>Password *</label>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <button type="submit">Sign Up</button>
          <Divider orientation="center" style={{ borderColor: "grey" }}>
            <span id="sign-up">or Sign in with</span>
          </Divider>
          <button className="google-login">
            <GoogleOutlined /> Sign In with Google
          </button>
        </form>
        <p className="back-to-home">
          <Link to="/">Back to Home Page</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
