import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  GoogleOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Divider } from "antd";
import {
  alertFail,
  alertSuccess,
  alertSuccessSignUp,
} from "../../hooks/useNotification";
import { apiHeader } from "./../../components/urlApiHeader";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";

// Định nghĩa schema xác thực
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});


const ForgotPasswordEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //send email function
  const sendEmail = (email) => {
    
    fetch(`https://localhost:7262/api/Email/send/resetPasswordLink`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        url: `http://localhost:5173/reset-password/${email}`,
      }),
    })
      .then((res) => {
        setIsLoading(false)
        if (res.status === 200) {
          return res.text();
        }
      })
      .then((res) => {
        alertSuccess(res);
      });
  };
  //onsubmit
  const onSubmit = (data) => {
    setIsLoading(true);
    let email = data.email.replace("@", "%40");

    fetch(`${apiHeader}/Authentication/checkMail?mail=${email}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 400) {
          sendEmail(data.email);
        } else {
          setIsLoading(false);
          alertFail("Email address is not registered.", "Please try again");
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 style={{ marginBottom: "0px" }}>Forgot Password ?</h2>
        <h1
          style={{
            marginBottom: "10px",
            fontSize: "0.8em",
            fontWeight: "600",
            color: "#858181",
          }}
        >
          No worries, we'll send you reset instructions.
        </h1>
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

          <button type="submit">Send Email</button>
        </form>
        <p className="back-to-home">
          <Link to="/">Back to Home Page</Link>
        </p>
      </div>
      {isLoading && <LoadingScreen text={"Sending email..."} />}
    </div>
  );
};

export default ForgotPasswordEmail;
