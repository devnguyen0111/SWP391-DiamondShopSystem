import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Divider } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import { apiHeader } from "../../components/urlApiHeader";
import { alertSuccess } from "../../hooks/useNotification";

// Định nghĩa schema xác thực
const schema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const url = window.location.href;
  const email = url.slice(url.lastIndexOf("/") + 1, url.length);

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      fetch(`${apiHeader}/Authentication/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          newPassword: values.password,
          confirmNewPassword: values.confirmPassword,
        }),
      }).then(() => {
        setIsLoading(false);
        alertSuccess("Reset Password Successfully, Please Login !");
        navigate('/login');
      });
    } catch (error) {
      setIsLoading(false);
      alertFail("Failed to reset password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email Address *</label>
          <input
            disabled
            type="text"
            value={email}
            style={{ cursor: "not-allowed", opacity: "0.8" }}
          />

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

          <div className="password-container">
            <label>Confirm Password *</label>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <span
              className="password-toggle-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}
          <button type="submit">Reset Password</button>
        </form>
        <p className="back-to-home">
          <Link to="/">Back to Home Page</Link>
        </p>
      </div>
      {isLoading && <LoadingScreen text={"Authorizing..."} />}
    </div>
  );
};

export default ResetPassword;
