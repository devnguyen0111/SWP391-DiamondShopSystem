import React, { useState } from 'react';
import './Login.css';
import { GoogleOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Divider } from 'antd';

// Định nghĩa schema xác thực
const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Logic xử lý đăng nhập
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
            {...register('email')} 
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}

          <div className="password-container">
          <label>Password *</label>
            <input 
              type={passwordVisible ? 'text' : 'password'} 
              placeholder="Password" 
              {...register('password')} 
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
          <Divider orientation='center' style={{borderColor:"grey"}}><span id='sign-up'>or Sign up with</span></Divider>
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
