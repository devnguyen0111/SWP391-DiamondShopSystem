import { Input } from "antd";
import Title from "antd/es/skeleton/Title";
import React, { useEffect, useState } from "react";

import "./PinCode.scss";
import { json, useNavigate } from "react-router-dom";
import { apiHeader } from "../urlApiHeader";

function PinCode() {
  let account = JSON.parse(sessionStorage.getItem("account"));
  let email = account.email;
  let emailAPI = email.replace("@", "%40");
  const [pin, setPin] = useState("");
  const nav = useNavigate()

  useEffect(() => {
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
      .then((pin) => {
        setPin(pin);
      });
  }, []);
  const onChange = (text) => {
    console.log("onChange:", text);
    console.log(pin);
    console.log(text);
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
      }).then(res => res.json())
      .then(data =>{
        localStorage.setItem('account', JSON.stringify(data));
        sessionStorage.clear();
        nav('/login')
      })
    }
  };
  const sharedProps = {
    onChange,
  };
  return (
    <div className="pin">
      <h1 className="pin__title">Enter Pin Code</h1>
      <div className="">We send it to:</div>
      <div className="pin__email">{email}</div>
      <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
    </div>
  );
}

export default PinCode;
