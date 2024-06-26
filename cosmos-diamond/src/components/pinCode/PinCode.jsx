import { Input } from "antd";
import Title from "antd/es/skeleton/Title";
import React, { useEffect, useState } from "react";

import "./PinCode.scss";
import { json, useNavigate } from "react-router-dom";
import { apiHeader } from "../urlApiHeader";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";

function PinCode() {
  let account = JSON.parse(sessionStorage.getItem("account"));
  let email = account.email;
  let emailAPI = email.replace("@", "%40");

  const [pin, setPin] = useState("");
  const [count, setCount] = useState(60);
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  //fetch pin function
  const fetchPin = () => {
    fetch(`${apiHeader}/Email/send/PIN?email=${emailAPI}`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPin(data);
      });
  };

  useEffect(() => {
    fetchPin();
  }, []);

  //count down
  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  //pin compare
  const onChange = (text) => {
    if (text.length === 6 && text == pin) {
      fetch(`${apiHeader}/Authentication/register`, {
        method: "POST",
        body: JSON.stringify({
          email: account.email,
          firstname: account.firstName,
          lastname: account.lastName,
          phonenumber: account.tel,
          password: account.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("account", JSON.stringify(data));
          sessionStorage.clear();
          nav("/login");
        });
    } else if (text.length === 6 && text !== pin) {
      setMessage("Pin is invalid");
    }
  };
  const sharedProps = {
    onChange,
  };
  return (
    <div className="pin">
      <div className="pin__wrapper">
        <p className="pin__back" onClick={()=>nav("/login")}><ArrowLeftOutlined /> Back</p>
        <h1 className="pin__title">Enter Pin Code</h1>
        <div className="">We send it to:</div>
        <div className="pin__email">{email}</div>
        {count > 0 ? (
          <Input.OTP
            autoFocus={true}
            formatter={(str) => str.toUpperCase()}
            {...sharedProps}
          />
        ) : (
          <Input.OTP disabled />
        )}
        {count > 0 ? (
          <p>PIN is expired in: {count}</p>
        ) : (
          <p>Your PIN has expired</p>
        )}
        <div
          className="pin__btn"
          onClick={() => {
            setCount(60);
            fetchPin();
          }}
        >
          <ReloadOutlined /> Resend
        </div>
      </div>
    </div>
  );
}

export default PinCode;
