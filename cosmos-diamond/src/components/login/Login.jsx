import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Divider } from "antd";
import { GoogleOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/counterSlice";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { auth, provider } from "../../config/firebase";
import api from "../../config/axios";
import { jwtDecode } from "jwt-decode";

// Định nghĩa schema xác thực
const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleLoginGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const token = await user.getIdToken();

            // // Lưu token và thông tin người dùng vào localStorage
            // localStorage.setItem("token", token);
            // localStorage.setItem("accountId", user.uid);

            // // Cập nhật trạng thái đăng nhập bằng redux
            // dispatch(login({ token, uid: user.uid, displayName: user.displayName }));

            // Điều hướng đến trang chủ hoặc trang phù hợp
            navigate("/");
        } catch (error) {
            console.error("Error during Google sign-in:", error);
        }
    };

    const onSubmit = async (value) => {
        try {
          setIsLoading(true)
          const response = await api.post("/api/Authentication/login", value);
          localStorage.setItem("token", response.data.token);
          const user = jwtDecode(response.data.token);
          const responseUser = await api.get(`/api/Customer/${user.UserID}`);

          console.log("Login: ", responseUser);
          setIsLoading(false)
          //redux
          dispatch(login(user));
          if (user.Role === "customer") {
            navigate("/");
          }
          if (user.Role === "admin") {
            navigate("/dashboard/admin");
          }
          if (user.Role === "salestaff") {
            navigate("/dashboard/salestaff");
          }
          if (user.Role === "manager") {
            navigate("/dashboard/manager");
          }
        } catch (e) {
          setIsLoading(false)
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
                    <input type="text" placeholder="Email Address" {...register("email")} />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}

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
                    {errors.password && <p className="error-message">{errors.password.message}</p>}

                    <div className="remember-forgot">
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit">Sign In</button>
                    <Divider orientation="center" style={{ borderColor: "grey" }}>
                        <span id="sign-up">or Sign in with</span>
                    </Divider>
                    <button type="button" className="google-login" onClick={handleLoginGoogle}>
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
